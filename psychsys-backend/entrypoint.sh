#!/bin/bash
python manage.py migrate
python manage.py create_superuser_if_not_exist
exec "$@"
