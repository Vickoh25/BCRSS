"""
Custom exception handlers for BCRSS.
Ensures CORS headers are present on ALL responses, including 500 errors
that bypass the CorsMiddleware (e.g. unhandled exceptions).
"""

from django.http import JsonResponse
from django.conf import settings
from rest_framework.views import exception_handler as drf_exception_handler


def _get_cors_origins():
    """Return the configured CORS origins list."""
    return getattr(settings, 'CORS_ALLOWED_ORIGINS', [])


def _inject_cors_headers(request, response):
    """Manually add CORS headers to a response if missing."""
    origin = request.META.get('HTTP_ORIGIN', '')
    if not origin:
        return response

    allowed = _get_cors_origins()
    allow_all = getattr(settings, 'CORS_ALLOW_ALL_ORIGINS', False)

    if allow_all or origin in allowed:
        response['Access-Control-Allow-Origin'] = origin
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        response['Access-Control-Allow-Credentials'] = 'true'
        response['Access-Control-Max-Age'] = '86400'
    return response


def custom_exception_handler(exc, context):
    """
    DRF custom exception handler.
    Falls back to the default handler, then ensures CORS headers are present.
    """
    response = drf_exception_handler(exc, context)
    if response is None:
        # Unhandled exception — build a 500 response manually
        response = JsonResponse(
            {'detail': 'Internal server error'},
            status=500,
        )
    # Ensure CORS headers are on every error response
    request = context.get('request')
    if request:
        _inject_cors_headers(request, response)
    return response


def custom_500_handler(request, exception=None):
    """
    Custom 500 error handler that returns JSON with CORS headers.
    This catches unhandled exceptions that bypass the DRF exception handler.
    """
    response = JsonResponse(
        {'detail': 'Internal server error'},
        status=500,
    )
    _inject_cors_headers(request, response)
    return response


def custom_404_handler(request, exception=None):
    """
    Custom 404 error handler that returns JSON with CORS headers.
    """
    response = JsonResponse(
        {'detail': 'Not found'},
        status=404,
    )
    _inject_cors_headers(request, response)
    return response
