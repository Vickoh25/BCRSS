#!/bin/sh

echo "=============================="
echo "Starting BCRSS Backend"
echo "=============================="

echo "Running migrations..."
for attempt in 1 2 3 4 5; do
    if python manage.py migrate --noinput; then
        echo "Migrations succeeded (attempt $attempt)"
        break
    fi
    echo "Migration attempt $attempt failed, retrying in 5s..."
    sleep 5
    if [ "$attempt" = "5" ]; then
        echo "All migration attempts failed — continuing anyway"
    fi
done

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn bcrss_config.wsgi:application \
    --bind 0.0.0.0:${PORT:-8000} \
    --workers 3