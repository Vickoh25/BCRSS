#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    # Auto-use test settings when running tests in production mode
    # (test_settings disables SECURE_SSL_REDIRECT, HSTS, etc. so the
    # Django test client works over plain HTTP.)
    if 'test' in sys.argv and os.environ.get('DJANGO_SETTINGS_MODULE', 'bcrss_config.settings') == 'bcrss_config.settings':
        os.environ['DJANGO_SETTINGS_MODULE'] = 'bcrss_config.test_settings'
    else:
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bcrss_config.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
