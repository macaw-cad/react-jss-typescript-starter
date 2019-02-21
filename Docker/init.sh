#!/bin/bash
set -e

echo "Starting SSH ..."
service ssh start

echo "Start the Node Express web server managed by pm2"
pm2-runtime index.js