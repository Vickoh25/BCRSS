from rest_framework import serializers
from .models import BorrowRequest
from users.serializers import UserSerializer
from resources.serializers import ResourceSerializer

class BorrowRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    item = ResourceSerializer(read_only=True)
    
    class Meta:
        model = BorrowRequest
        fields = ['id', 'item', 'requester', 'owner', 'start_date', 'end_date', 'status', 'message', 'request_date', 'created_at', 'updated_at']
        read_only_fields = ['id', 'request_date', 'created_at', 'updated_at']

class BorrowRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowRequest
        fields = ['id', 'item', 'start_date', 'end_date', 'message']
