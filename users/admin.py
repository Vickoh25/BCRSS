from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'role', 'location', 'created_at')
    list_filter = ('role', 'created_at')
    search_fields = ('username', 'email', 'location')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('role', 'location', 'contact', 'avatar_color', 'bio')}),
    )
