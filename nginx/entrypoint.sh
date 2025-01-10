#!/bin/sh
echo "Starting entrypoint script"
echo "HEROKU_APP_CLIENT_URL: $FRONTEND_URL"
echo "HEROKU_APP_BACKEND_URL: $BACKEND_URL"
echo "PORT: $PORT"

# Replace variables and start Nginx
envsubst '${PORT} ${FRONTEND_URL} ${BACKEND_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec nginx -g "daemon off;"
