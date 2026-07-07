from django.db import models
from users.models import User
from resources.models import Resource

class BorrowRequest(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Declined', 'Declined'),
        ('Returned', 'Returned'),
    )
    
    id = models.CharField(max_length=50, primary_key=True, unique=True)
    item = models.ForeignKey(Resource, on_delete=models.CASCADE, related_name='borrow_requests')
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrow_requests_made')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrow_requests_received')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    message = models.TextField(blank=True, null=True)
    request_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'borrow_requests'
        verbose_name = 'Borrow Request'
        verbose_name_plural = 'Borrow Requests'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.requester.username} - {self.item.title} ({self.status})"
