"""
URL configuration for bcrss_config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from resources.views import ResourceViewSet
from jobs.views import JobOpportunityViewSet
from borrow_requests.views import BorrowRequestViewSet
from reviews.views import ReviewViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'jobs', JobOpportunityViewSet, basename='job')
router.register(r'borrow-requests', BorrowRequestViewSet, basename='borrow-request')
router.register(r'reviews', ReviewViewSet, basename='review')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
