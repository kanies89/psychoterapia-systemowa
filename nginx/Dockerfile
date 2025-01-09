FROM nginx:alpine

# Set the working directory
WORKDIR /app

# Copy the custom Nginx configuration and template into the container
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Install dos2unix for line-ending conversion (optional, remove if not needed)
RUN apk add --no-cache dos2unix

# Optional: Add a health check (ensure Nginx is running)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD curl -f http://localhost:$PORT/ || exit 1

# Set the entrypoint to the script
ENTRYPOINT ["/entrypoint.sh"]

## Ensure environment variables are applied at runtime and start Nginx
#CMD /bin/sh -c "envsubst '\$PORT \$HEROKU_APP_CLIENT_URL \$HEROKU_APP_BACKEND_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
