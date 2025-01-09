#!/bin/bash

# Replace placeholders in nginx.conf with Heroku environment variables
sed -i "s|{{FRONTEND_URL}}|$FRONTEND_URL|g" /etc/nginx/nginx.conf
sed -i "s|{{BACKEND_URL}}|$BACKEND_URL|g" /etc/nginx/nginx.conf

# Substitute the $PORT variable into the nginx.conf
envsubst '${PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx
nginx -g "daemon off;"
