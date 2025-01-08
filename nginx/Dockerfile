FROM nginx:alpine

# Copy the custom nginx.conf and the startup script into the container
COPY nginx.conf /etc/nginx/nginx.conf
COPY start_nginx.sh /start_nginx.sh

# Make the script executable
RUN chmod +x /start_nginx.sh

# Set environment variables (Heroku will pass these at runtime)
ENV FRONTEND_URL=${FRONTEND_URL}
ENV BACKEND_URL=${BACKEND_URL}

# Run the startup script to replace placeholders and start nginx
CMD ["/start_nginx.sh"]
