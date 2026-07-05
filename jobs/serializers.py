from rest_framework import serializers
from .models import JobOpportunity
from users.serializers import UserSerializer

class JobOpportunitySerializer(serializers.ModelSerializer):
    posted_by = UserSerializer(read_only=True)
    
    class Meta:
        model = JobOpportunity
        fields = ['id', 'title', 'category', 'status', 'description', 'location', 'rate', 'duration', 'posted_by', 'posted_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'posted_date', 'created_at', 'updated_at']

class JobOpportunityCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpportunity
        fields = ['id', 'title', 'category', 'status', 'description', 'location', 'rate', 'duration']
