from django.contrib import admin
from .models import BorrowRequest

@admin.register(BorrowRequest)
class BorrowRequestAdmin(admin.ModelAdmin):
    list_display = ('requester', 'item', 'status', 'start_date', 'end_date', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('requester__username', 'item__title')
    readonly_fields = ('created_at', 'updated_at', 'request_date')
