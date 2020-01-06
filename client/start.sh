#!/bin/sh
ENVFILE="./.env"
if test -f "$ENVFILE"; then
    echo "Found $ENVFILE file"
else
  echo "SERVER_URL=$SERVER_URL" >> .env
  echo "SOCKET_URL=$SOCKET_URL" >> .env
fi
