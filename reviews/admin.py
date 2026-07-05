from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('reviewer', 'target_user', 'rating', 'reviewer_role', 'created_at')
    list_filter = ('rating', 'reviewer_role', 'created_at')
    search_fields = ('reviewer__username', 'target_user__username', 'comment')
    readonly_fields = ('created_at', 'updated_at', 'date')
