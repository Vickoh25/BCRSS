"""
Test-specific settings.

Import everything from the main settings, then override values that
break the Django test client (which always speaks plain HTTP).

Usage:
    DJANGO_SETTINGS_MODULE=bcrss_config.test_settings python manage.py test
"""

from bcrss_config.settings import *  # noqa: F401,F403

# The test client always uses HTTP, so SSL redirect causes every
# request to return 301 Moved Permanently.
SECURE_SSL_REDIRECT = False

# Don't require HTTPS cookies during testing.
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Relax HSTS so the test client isn't rejected.
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False
