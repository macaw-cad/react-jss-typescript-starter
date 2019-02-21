#!/usr/bin/env node
"use strict";

const fs = require('fs');
const path = require('path');
const prog = require('caporal');
const D2UConverter = require('@dpwolfe/dos2unix').dos2unix; // original version has bug
const readJson = require('read-package-json');
const { execFile, execFileSync } = require('child_process');
const ngrok = require('ngrok');

const scjssconfigPath = path.resolve(__dirname, '../scjssconfig.json');
if (!fs.existsSync(scjssconfigPath)) {
  console.error(`File ${scjssconfigPath} is missing`);
}
const scjssconfig = JSON.parse(fs.readFileSync(scjssconfigPath, 'utf8'));
const apiKey = scjssconfig.sitecore.apiKey;
const layoutServiceHost = scjssconfig.sitecore.layoutServiceHost;

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
    const packageJsonPath = path.resolve(__dirname, '../package.json');
    readJson(packageJsonPath, logger.error, false, function (err, data) {
      if (err) {
        logger.error(`There was an error reading the package.json file from ${packageJsonPath}`);
        return;
      }

      logger.info(`Creating Docker image for app '${data.config.appName}'`);
      const docker = execFile(
        'docker',
        [
          'build',
          '-f', 'Dockerfile',
          '-t', `${data.config.appName}:latest`,
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
    });
  })

  .command('run', 'Run the locally generated Docker image')
  .option('--port <portnumber>', 'Number of the port to run on', prog.INT, 8888)
  .option('--debug', 'Show debugging information', prog.BOOL, false)
  .action(function (args, options, logger) {
    const packageJsonPath = path.resolve(__dirname, '../package.json');

    readJson(packageJsonPath, logger.error, false, function (err, data) {
      if (err) {
        logger.error(`There was an error reading the package.json file from ${packageJsonPath}`);
        return;
      }

      const appName = data.config.appName;
      const imageName = `${appName}:latest`;
      logger.info(`Running Docker image '${imageName}'`);

      // ngrok http -host-header=<layoutServiceHost> 80
      (async function () {
        const url = await ngrok.connect({
          proto: 'http',
          addr: 80,
          host_header: layoutServiceHost.replace('http://','').replace('https://','')
        });
        logger.info(`Ngrok url: ${url} exposing the internal url ${layoutServiceHost} for consumption by Docker container`);

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
            '-e', `SITECORE_JSS_APP_NAME=${appName}`,
            '-e', `SITECORE_API_HOST=${url}`,
            '-e', `SITECORE_LAYOUT_SERVICE_ROUTE=${url}/sitecore/api/layout/render/jss`,
            `-e`, `SITECORE_API_KEY=${apiKey}`,
            `-e`, `SITECORE_PATH_REWRITE_EXCLUDE_ROUTES=`,
            `-e`, `SITECORE_ENABLE_DEBUG=${(options.debug? 'true' : 'false')}`,
            `-p`, `${options.port}:3000`,
            imageName
          ],
          { cwd: path.resolve(__dirname, '../Docker') }
        );

        docker.stdout.on('data', (data) => {
          let dataString = data.toString();
          if (dataString.includes('server listening on port 3000!')) {
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
    });
  });

prog.parse(process.argv);