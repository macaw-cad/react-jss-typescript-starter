#!/usr/bin/env node
"use strict";

const fs = require('fs');
const path = require('path');
const prog = require('caporal');
const D2UConverter = require('@dpwolfe/dos2unix').dos2unix; // original version has bug
const { execFile, execFileSync } = require('child_process');
const ngrok = require('ngrok');

const packageJsonPath = path.resolve(__dirname, '../package.json');
const scjssJsonconfigPath = path.resolve(__dirname, '../scjssconfig.json');

if (!fs.existsSync(packageJsonPath)) {
    console.error(`File ${packageJsonPath} is missing`);
}
if (!fs.existsSync(scjssJsonconfigPath)) {
    console.error(`File ${scjssJsonconfigPath} is missing`);
}

const packageJsonConfig = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const scjssconfigJsonConfig = JSON.parse(fs.readFileSync(scjssJsonconfigPath, 'utf8'));

const apiKey = scjssconfigJsonConfig.sitecore.apiKey;
const layoutServiceHost = scjssconfigJsonConfig.sitecore.layoutServiceHost;

prog
  .version('1.0.0')
  .description('Helper for Docker related actions')
  .help('Commands for building and running Docker images on the developer machine.')

  .command('build', 'Build the Docker image locally')
  .action(function (args, options, logger) {
    const dockerDir = path.resolve(__dirname, '../Docker');
    // DEPRICATED: files now converted to unix format in Dockerfile during build
    // logger.info(`Directory with Docker configuration files to convert from Windows to Linux format: ${dockerDir}`);
    // const d2u = new D2UConverter({ glob: { cwd: dockerDir } })
    //   .on('error', function (err) {
    //     logger.error(err);
    //   })
    //   .on('end', function (stats) {
    //     logger.info(stats);
    //   });
    //     // Linux is not really happy with files in DOS format, make sure they are in unix format
    //   d2u.process(['init.sh', 'sshd_config', 'nginx.config', 'process.yml']);
    logger.info(`Creating Docker image for app '${packageJsonConfig.name}'`);
    const docker = execFile(
      'docker',
      [
        'build',
        '-f', 'Dockerfile',
        '-t', `${packageJsonConfig.name}:latest`,
        '..'
      ],
      { cwd: path.resolve(__dirname, '../Docker') }
    );

    docker.stdout.on('data', (data) => {
      logger.info(data.toString());
    });

    docker.stderr.on('data', (data) => {
      logger.error(data.toString());
    });

    docker.on('close', (code) => {
      if (code !== 0) {
        logger.error(`docker process exited with code ${code}`);
      }
    });
  })

  .command('run', 'Run the locally generated Docker image')
  .option('--port <portnumber>', 'Number of the port to run on', prog.INT, 8888)
  .option('--disconnected', 'Run disconnected (data from local data folder)', prog.BOOL, false)
  .option('--debug', 'Show debugging information', prog.BOOL, false)
  .action(function (args, options, logger) {
    const appName = packageJsonConfig.name;
    const imageName = `${appName}:latest`;
    logger.info(`Running Docker image '${imageName}'`);

    // ngrok http -host-header=<layoutServiceHost> 80
    (async function () {
      let url;
      if (options.disconnected) {
        url = 'http://localhost:3042';
        logger.info('Running disconnected');
      } else {
        url = await ngrok.connect({
          proto: 'http',
          addr: 80,
          host_header: layoutServiceHost.replace('http://','').replace('https://','')
        });
        logger.info('Running connected');

        logger.info(`Ngrok url: ${url} exposing the internal url ${layoutServiceHost} for consumption by locally running Docker container`);
      }

      // docker ps -a -q  --filter name=<simplifiedImageName>
      const simplifiedImageName = imageName.replace(':', '-');
      let dockerId = execFileSync('docker', ['ps', '-a', '-q', '--filter', `name=${simplifiedImageName}`]);
      if (dockerId != '') {
        dockerId = ('' + dockerId).trim(); // can contain newline
        logger.info(`Kill currently running Docker container ${simplifiedImageName} with id '${dockerId}'`);
        try {
          execFileSync('docker', ['stop', dockerId]);
        } catch (error) {
          logger.error(`Error while killing Docker container with id ${dockerId}: ${error}`);
        }
      }

      const docker = execFile(
        'docker',
        [
          'run',
          '--rm',
          '-i',
          '-e', `NODE_ENV=production`,
          '-e', `REACT_APP_NAME=${appName}`,
          '-e', `REACT_APP_APPINSIGHTS_KEY=${packageJsonConfig.azureAppInsightsKey}`,
          '-e', `REACT_APP_BUILDVERSION=LocalDockerBuild`,
          '-e', `REACT_APP_ENVIRONMENT=LocalMachine`,
          '-e', `REACT_APP_ENVIRONMENTCONNECTIONS=${(options.disconnected? 'ScConnected' : 'ScDisconnected')}`,
          '-e', `REACT_APP_ADDITIONALSETTINGS=,ignore:0`,
          '-e', `REACT_APP_SITECORE_JSS_APP_NAME=${appName}`,
          `-e`, `REACT_APP_SITECORE_API_KEY=${apiKey}`,
          '-e', `REACT_APP_SITECORE_API_HOST=${url}`,
          `-e`, `REACT_APP_SITECORE_DEFAULT_LANGUAGE=en`,
          `-e`, `REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES=`,
          `-e`, `REACT_APP_SITECORE_ENABLE_DEBUG=${(options.debug? 'true' : 'false')}`,
          `-e`, `REACT_APP_SITECORE_CONNECTED=${(options.disconnected? 'false' : 'true')}`,
          `-p`, `${options.port}:3001`,
          `--name`, simplifiedImageName,
          imageName
        ],
        { cwd: path.resolve(__dirname, '../Docker') }
      );

      docker.stdout.on('data', (data) => {
        let dataString = data.toString();
        if (dataString.includes('server listening on port 3001!')) {
          const message = `* Access site running in Docker container on http://localhost:${options.port} *`;
          const newText = '*'.repeat(message.length) + '\n' + message + '\n' + '*'.repeat(message.length) + '\n';
          dataString += newText;
        }
        logger.info(dataString);
      });

      docker.stderr.on('data', (data) => {
        logger.error(data.toString());
      });

      docker.on('close', (code) => {
        if (code !== 0) {
          logger.error(`docker process exited with code ${code}`);
        }
      });
    })();
  })

  .command('shell', 'Get command to open a shell on the locally running Docker image')
  .action(function (args, options, logger) {
    const appName = packageJsonConfig.name;
    const imageName = `${appName}:latest`;
    logger.info(`Determining command to open interactive shell on Docker image '${imageName}'`);
    const simplifiedImageName = imageName.replace(':', '-');

    // docker ps -a -q  --filter "name=<simplifiedImageName>
    let dockerId = execFileSync('docker', ['ps', '-a', '-q', '--filter', `name=${simplifiedImageName}`]);
    if (dockerId != '') {
      dockerId = ('' + dockerId).trim(); // can contain newline
      logger.info(`To open interactive shell on running Docker container ${imageName} with id '${dockerId}' execute the following command: docker exec -it ${dockerId} sh`);
    } else {
      logger.info(`Docker container ${imageName} is not running.`)
    }
  });

prog.parse(process.argv);