from django.contrib import admin
from .models import JobOpportunity

@admin.register(JobOpportunity)
class JobOpportunityAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'posted_by', 'status', 'created_at')
    list_filter = ('category', 'status', 'created_at')
    search_fields = ('title', 'description', 'posted_by__username')
    readonly_fields = ('created_at', 'updated_at', 'posted_date')
