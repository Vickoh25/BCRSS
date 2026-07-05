from django.db import models
from users.models import User

class Review(models.Model):
    ROLE_CHOICES = (
        ('Lender', 'Lender'),
        ('Borrower', 'Borrower'),
        ('Employer', 'Employer'),
        ('Worker', 'Worker'),
    )
    
    id = models.CharField(max_length=50, primary_key=True, unique=True)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField()
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_given')
    target_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_received')
    reviewer_role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'reviews'
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        ordering = ['-created_at']
        unique_together = ('reviewer', 'target_user')

    def __str__(self):
        return f"{self.reviewer.username} -> {self.target_user.username} ({self.rating} stars)"
