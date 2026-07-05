from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'location', 'contact', 'avatar_color', 'bio', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class UserDetailSerializer(UserSerializer):
    resources_count = serializers.SerializerMethodField()
    jobs_count = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()
    
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['resources_count', 'jobs_count', 'reviews_count']
    
    def get_resources_count(self, obj):
        return obj.resources.count()
    
    def get_jobs_count(self, obj):
        return obj.job_postings.count()
    
    def get_reviews_count(self, obj):
        return obj.reviews_received.count()
