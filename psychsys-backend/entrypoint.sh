#!/bin/bash
python manage.py makemigrations appointment
python manage.py makemigrations appointment_reminder
python manage.py migrate
python manage.py create_superuser_if_not_exist
python manage.py setup_test_data
python manage.py collectstatic --no-input
exec "$@"
