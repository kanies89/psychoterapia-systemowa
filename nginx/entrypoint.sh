#!/bin/bash

# Debugging: Print environment variables
echo "PORT: $PORT"
echo "HEROKU_APP_CLIENT_URL: $HEROKU_APP_CLIENT_URL"
echo "HEROKU_APP_BACKEND_URL: $HEROKU_APP_BACKEND_URL"

# Substitute variables in nginx.conf
envsubst '${PORT} ${HEROKU_APP_CLIENT_URL} ${HEROKU_APP_BACKEND_URL}' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf

# Start Nginx
nginx -g "daemon off;"
