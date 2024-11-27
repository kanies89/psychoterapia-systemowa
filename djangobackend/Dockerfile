# Django app Dockerfile
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY djangobackend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django app
COPY . .

# Expose the port
EXPOSE 8000

# Start the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
