#!/bin/bash

# Debugging: Print environment variables
echo "PORT: $PORT"
echo "FRONTEND_URL: $HEROKU_APP_CLIENT_URL"
echo "BACKEND_URL: $HEROKU_APP_BACKEND_URL"

# Substitute variables in nginx.conf
envsubst '${PORT} ${FRONTEND_URL} ${BACKEND_URL}' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf

# Start Nginx
exec nginx -g "daemon off;"