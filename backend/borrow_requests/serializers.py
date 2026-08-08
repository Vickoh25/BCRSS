from rest_framework import serializers
from .models import BorrowRequest
from users.serializers import UserSerializer
from resources.serializers import ResourceSerializer

class BorrowRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    resource = ResourceSerializer(read_only=True)
    owner_name = serializers.CharField(source='resource.owner.username', read_only=True)
    
    class Meta:
        model = BorrowRequest
        fields = [
            'id', 'resource', 'requester', 'owner_name',
            'start_date', 'return_date', 'status', 'message', 
            'reminder_sent', 'is_disputed', 'dispute_message', 
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'requester']


class BorrowRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowRequest
        fields = ['id', 'resource', 'start_date', 'return_date', 'message']
    
    def validate(self, data):
        start_date = data.get('start_date')
        return_date = data.get('return_date')
        resource = data.get('resource')
        
        if start_date and return_date and start_date > return_date:
            raise serializers.ValidationError("Return date must be after start date.")
        
        # Check for overlapping approved requests
        overlapping = BorrowRequest.objects.filter(
            resource=resource,
            status='Approved',
            start_date__lte=return_date,
            return_date__gte=start_date
        )
        if overlapping.exists():
            raise serializers.ValidationError("This item is already booked for the selected dates.")
        return data
