#!/bin/bash

echo '======================'
echo 'Running restart_server'
echo '======================'

npx pm2 start /home/ubuntu/build/src/app.js