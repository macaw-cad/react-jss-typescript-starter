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

  .command('prepare', 'Prepare for building the Docker image (convert config files to unix format)')
  .action(function (args, options, logger) {
    const d2u = new D2UConverter({ glob: { cwd: path.resolve(__dirname, '../Docker') } })
      .on('error', function (err) {
        logger.error(err);
      })
      .on('end', function (stats) {
        logger.info(stats);
        // Linux is not really happy with files in DOS format, make sure they are in unix format
        d2u.process(['init.sh', 'sshd_config', 'nginx.config', 'process.yml']);
      })
  })

  .command('build', 'Build the Docker image locally')
  .action(function (args, options, logger) {
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
  .option('--simulate', 'Run as if in Docker image', prog.BOOL, false)
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
        logger.info(`Ngrok url: ${url} exposing the internal url ${layoutServiceHost} for consumption by locally running Docker container`);
      }

      // docker ps -a -q  --filter ancestor=<image-name>
      let dockerId = execFileSync('docker', ['ps', '-a', '-q', '--filter', `ancestor=${imageName}`]);
      if (dockerId != '') {
        dockerId = ('' + dockerId).trim(); // can contain newline
        logger.info(`Kill currently running Docker container ${imageName} with id '${dockerId}'`);
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
          '-e', `REACT_APP_SITECORE_JSS_APP_NAME=${appName}`,
          `-e`, `REACT_APP_SITECORE_API_KEY=${apiKey}`,
          '-e', `REACT_APP_SITECORE_API_HOST=${url}`,
          `-e`, `REACT_APP_SITECORE_DEFAULT_LANGUAGE=en`,
          `-e`, `REACT_APP_SITECORE_PATH_REWRITE_EXCLUDE_ROUTES=`,
          `-e`, `REACT_APP_SITECORE_ENABLE_DEBUG=${(options.debug? 'true' : 'false')}`,
          `-e`, `REACT_APP_SITECORE_CONNECTED=${(options.disconnected? 'true' : 'false')}`,
          `-p`, `${options.port}:3001`,
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

  .command('shell', 'Open a shell on the locally running Docker image')
  .action(function (args, options, logger) {
    const appName = packageJsonConfig.name;
    const imageName = `${appName}:latest`;
    logger.info(`Open interactive shell on Docker image '${imageName}'`);

    // docker ps -a -q  --filter ancestor=<image-name>
    let dockerId = execFileSync('docker', ['ps', '-a', '-q', '--filter', `ancestor=${imageName}`]);
    if (dockerId != '') {
      dockerId = ('' + dockerId).trim(); // can contain newline
      logger.info(`Open interactive shell on running Docker container ${imageName} with id '${dockerId}'`);
      try {
        console.log(`Command: docker exec -it ${dockerId} /bin/sh`);
        // execFileSync('docker', ['exec', '-it', dockerId, '/bin/sh']);
      } catch (error) {
        logger.error(`Error while opening interactive shell on Docker container with id ${dockerId}: ${error}`);
      }
    }
  });

prog.parse(process.argv);