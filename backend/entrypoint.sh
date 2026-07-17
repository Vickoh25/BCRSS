#!/bin/sh

echo "=============================="
echo "Starting BCRSS Backend"
echo "=============================="

if [ "$USE_MYSQL" = "True" ]; then
    echo "Waiting for MySQL..."

    until nc -z "$DB_HOST" "$DB_PORT"; do
        echo "MySQL unavailable - sleeping..."
        sleep 2
    done

    echo "MySQL Connected."
fi

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."

exec gunicorn bcrss_config.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3