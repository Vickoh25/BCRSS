from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from .models import User


class UserPublicSerializer(serializers.ModelSerializer):
    """Public-facing serializer — hides email, contact, and other PII."""
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'role', 'location', 'avatar_color', 'bio']


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
    
    @extend_schema_field(int)
    def get_resources_count(self, obj) -> int:
        return obj.resources.count()

    @extend_schema_field(int)
    def get_jobs_count(self, obj) -> int:
        return obj.job_postings.count()

    @extend_schema_field(int)
    def get_reviews_count(self, obj) -> int:
        return obj.reviews_received.count()
