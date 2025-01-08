# Base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy application files into the container
COPY . .

# Install system dependencies (if needed)
# RUN apt-get update && apt-get install -y gcc libpq-dev && apt-get clean

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install the local package
WORKDIR /app/serwersms-python-api-master
RUN python setup.py install

# Return to the main working directory
WORKDIR /app

# Expose the port (optional, depending on your setup)
EXPOSE 8000

# Command to start the application
CMD ["gunicorn", "backend.wsgi:application"]
