from rest_framework import serializers
from .models import Review
from users.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    target_user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'reviewer', 'target_user', 'reviewer_role', 'date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'date', 'created_at', 'updated_at']

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'rating', 'comment', 'target_user', 'reviewer_role']
