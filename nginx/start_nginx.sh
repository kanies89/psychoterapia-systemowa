#!/bin/sh

# Ensure required environment variables are set
if [ -z "$PORT" ] || [ -z "$FRONTEND_URL" ] || [ -z "$BACKEND_URL" ]; then
  echo "Error: One or more required environment variables (PORT, FRONTEND_URL, BACKEND_URL) are not set."
  exit 1
fi

# Substitute environment variables in the Nginx configuration template
envsubst '${PORT} ${FRONTEND_URL} ${BACKEND_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx
nginx -g 'daemon off;'
