# Example Dockerfile for Django backend
FROM python:3.10-slim

WORKDIR /app
COPY . .

RUN pip install -r requirements.txt

CMD ["gunicorn", "django_website.wsgi:application", "--bind", "0.0.0.0:8000"]
