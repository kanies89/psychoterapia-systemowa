#!/bin/bash
set -e  # Exit on any error
echo "Starting migrations..."
python manage.py makemigrations appointment
python manage.py makemigrations appointment_reminder
python manage.py migrate

echo "Creating superuser..."
python manage.py create_superuser_if_not_exist

echo "Setting up test data..."
python manage.py setup_test_data || echo "Failed to run setup_test_data"

echo "Collecting static files..."
python manage.py collectstatic --no-input

exec "$@"
