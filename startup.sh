#!/bin/sh
source ./.env

# TODO: Check if the script is running on docker container or outside.
echo "Installing bash..."
apk add bash

if [ $ENV = "prod" ]; then
  echo "------------ PRODUCTION MODE ------------"
  cd core
    yarn install
    yarn start
  cd ..
else
  echo "------------ DEVELOPMENT MODE ------------"
  echo "Not implemented yet!"
fi
