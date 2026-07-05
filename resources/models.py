from django.db import models
from users.models import User

class Resource(models.Model):
    CATEGORY_CHOICES = (
        ('farm tools', 'Farm Tools'),
        ('textbooks', 'Textbooks'),
        ('household items', 'Household Items'),
    )
    
    CONDITION_CHOICES = (
        ('Excellent', 'Excellent'),
        ('Good', 'Good'),
        ('Fair', 'Fair'),
    )
    
    LENDING_TYPE_CHOICES = (
        ('Borrowing', 'Borrowing'),
        ('Donation', 'Donation'),
    )
    
    STATUS_CHOICES = (
        ('Available', 'Available'),
        ('Borrowed', 'Borrowed'),
    )
    
    IMAGE_CODE_CHOICES = (
        ('sprayer', 'Sprayer'),
        ('lantern', 'Lantern'),
        ('biology', 'Biology'),
        ('plough', 'Plough'),
        ('computing', 'Computing'),
        ('wheelbarrow', 'Wheelbarrow'),
        ('generic', 'Generic'),
    )
    
    id = models.CharField(max_length=50, primary_key=True, unique=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    description = models.TextField()
    lending_type = models.CharField(max_length=20, choices=LENDING_TYPE_CHOICES)
    location = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='resources')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    image_code = models.CharField(max_length=20, choices=IMAGE_CODE_CHOICES, default='generic')
    listed_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'resources'
        verbose_name = 'Resource'
        verbose_name_plural = 'Resources'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.status})"
