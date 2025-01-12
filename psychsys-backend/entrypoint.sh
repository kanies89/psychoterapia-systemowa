#!/bin/bash
python manage.py migrate
find /app -name create_superuser_if_not_exists.py
python manage.py create_superuser_if_not_exists
exec "$@"
