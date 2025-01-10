FROM nginx:alpine

# Set the working directory
WORKDIR /app

# Copy the custom Nginx configuration and templates into the container
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Copy the entrypoint script and application files
COPY entrypoint.sh /entrypoint.sh
COPY favicon.ico /usr/share/nginx/html/favicon.ico
COPY . .

# Fix potential Windows line-ending issues and make entrypoint executable
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

# Optional: Add a health check (ensure Nginx is running)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD curl -f http://localhost:$PORT/ || exit 1

# Expose the default port (optional for Heroku; Heroku handles this dynamically)
EXPOSE $PORT

# Set the entrypoint to the script
ENTRYPOINT ["/entrypoint.sh"]
