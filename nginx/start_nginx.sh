#!/bin/bash

# Replace placeholders in nginx.conf with Heroku environment variables
sed -i "s|{{FRONTEND_URL}}|$FRONTEND_URL|g" /etc/nginx/nginx.conf
sed -i "s|{{BACKEND_URL}}|$BACKEND_URL|g" /etc/nginx/nginx.conf

export PORT=${PORT:-5000} # Default to 5000 if PORT is not set

# Start Nginx
nginx -g "daemon off;"
