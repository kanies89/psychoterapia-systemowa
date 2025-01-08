FROM nginx:alpine

# Set the working directory
WORKDIR /app

# Copy the custom nginx.conf and the startup script into the container
COPY nginx.conf /etc/nginx/nginx.conf
COPY start_nginx.sh /start_nginx.sh

# Convert script to Unix line endings (if required) and make it executable
RUN dos2unix /start_nginx.sh && chmod +x /start_nginx.sh

# Set environment variables (Heroku will pass these at runtime)
ENV FRONTEND_URL=${FRONTEND_URL}
ENV BACKEND_URL=${BACKEND_URL}

# Debugging step: List files to verify
RUN ls -l / && ls -l /etc/nginx

# Run the startup script to replace placeholders and start nginx
CMD ["sh", "/start_nginx.sh"]
