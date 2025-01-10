# Base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy application files into the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install the local package
WORKDIR /app/serwersms-python-api-master
RUN python setup.py install

# Return to the main working directory
WORKDIR /app

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port (optional, depending on your setup)
EXPOSE $PORT

# Entrypoint to run migrations and create superuser if needed
ENTRYPOINT ["/entrypoint.sh"]

# Command to start the application
CMD ["gunicorn", "backend.wsgi:application"]
