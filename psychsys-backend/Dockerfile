# Example Dockerfile for Django backend
FROM python:3.10-slim

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

# Expose the port Heroku expects
EXPOSE 8000

CMD gunicorn backend.wsgi:application

