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
        fields = [
            'id', 'item', 'requester', 'owner',
            'start_date', 'end_date', 'status', 'message', 
            'reminder_sent', 'is_disputed', 'dispute_message', 
            'request_date', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'status', 'request_date', 'created_at', 'updated_at', 'requester', 'owner']


class BorrowRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowRequest
        fields = ['id', 'item', 'requester', 'owner', 'start_date', 'end_date', 'message']
        read_only_fields = ['id', 'request_date', 'created_at', 'updated_at']  # Removed requester and owner
    
    def validate(self, data):
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        item = data.get('item')
        
        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError("End date must be after start date.")
        
        # Check for overlapping approved requests
        overlapping = BorrowRequest.objects.filter(
            item=item,
            status='Approved',
            start_date__lte=end_date,
            end_date__gte=start_date
        )
        if overlapping.exists():
            raise serializers.ValidationError("This item is already booked for the selected dates.")
        return data
