from rest_framework import serializers
from .models import Resource
from users.serializers import UserSerializer

class ResourceSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = Resource
        fields = ['id', 'title', 'category', 'condition', 'description', 'lending_type', 'location', 'owner', 'status', 'image_code', 'image_url', 'listed_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'listed_date', 'created_at', 'updated_at']

class ResourceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'category', 'condition', 'description', 'lending_type', 'location', 'status', 'image_code', 'image_url']
