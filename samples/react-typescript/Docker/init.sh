#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

echo "Start the Node Express web server and Node Express Sitecore disconnected mode proxy server managed by pm2"
pm2-runtime /app/process.yml