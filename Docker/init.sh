#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

echo "Start the Node Express web server managed by pm2"
pm2-runtime build.server/index.js

echo "Start the Node Express disconnected mode proxy server"
pm2-runtime server.disconnectedproxy/disconnected-mode-proxy.js