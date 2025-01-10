#!/bin/bash
python manage.py migrate
python manage.py createsuperuser_if_not_exists
exec "$@"
