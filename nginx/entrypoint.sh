#!/bin/sh
echo "Starting entrypoint script"
echo "HEROKU_APP_CLIENT_URL: $HEROKU_APP_CLIENT_URL"
echo "HEROKU_APP_BACKEND_URL: $HEROKU_APP_BACKEND_URL"
echo "PORT: $PORT"

# Replace variables and start Nginx
envsubst '${PORT} ${HEROKU_APP_CLIENT_URL} ${HEROKU_APP_BACKEND_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec nginx -g "daemon off;"
