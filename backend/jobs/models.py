from django.db import models
from users.models import User

class JobOpportunity(models.Model):
    CATEGORY_CHOICES = (
        ('Skilled Trade', 'Skilled Trade'),
        ('Farm Work', 'Farm Work'),
        ('Tutoring', 'Tutoring'),
        ('Casual Labor', 'Casual Labor'),
    )
    
    STATUS_CHOICES = (
        ('Open', 'Open'),
        ('Filled', 'Filled'),
    )
    
    id = models.CharField(max_length=50, primary_key=True, unique=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Open')
    description = models.TextField()
    location = models.CharField(max_length=255)
    rate = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=255, blank=True, null=True)
    requirements = models.JSONField(default=list, blank=True)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='job_postings')
    posted_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'jobs'
        verbose_name = 'Job Opportunity'
        verbose_name_plural = 'Job Opportunities'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.status})"
