#!/bin/sh

echo "Waiting for MySQL..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
    echo "Waiting..."
    sleep 2
done

echo "Database ready."

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec gunicorn bcrss_config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3