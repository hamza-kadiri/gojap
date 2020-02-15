#!/bin/sh

# This script is a hacky way to use a .env
# file on our CI server, by filling it with 
# some environment variables.

# This was a fast way to get env vars to build
# during the react-scripts build script.

ENVFILE="./.env"
if test -f "$ENVFILE"; then
    echo "Found $ENVFILE file"
else
  echo "SERVER_URL=$SERVER_URL" >> .env
  echo "SOCKET_URL=$SOCKET_URL" >> .env
fi
