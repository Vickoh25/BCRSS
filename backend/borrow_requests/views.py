from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import BorrowRequest
from resources.models import Resource
from .serializers import BorrowRequestSerializer, BorrowRequestCreateSerializer

class BorrowRequestViewSet(viewsets.ModelViewSet):
    queryset = BorrowRequest.objects.all()
    serializer_class = BorrowRequestSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status', 'item']
    ordering_fields = ['created_at', 'start_date']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_admin():
            return BorrowRequest.objects.all()
        return BorrowRequest.objects.filter(Q(requester=user) | Q(owner=user))
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return BorrowRequestCreateSerializer
        return BorrowRequestSerializer
    
    def perform_create(self, serializer):
        item = serializer.validated_data.get('item')
        serializer.save(requester=self.request.user, owner=item.owner)

    def update(self, request, *args, **kwargs):
        borrow_request = self.get_object()
        if borrow_request.requester != request.user and not request.user.is_admin():
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        borrow_request = self.get_object()
        if borrow_request.requester != request.user and not request.user.is_admin():
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        borrow_request = self.get_object()
        if borrow_request.requester != request.user and borrow_request.owner != request.user and not request.user.is_admin():
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def my_requests(self, request):
        """Get current user's borrow requests (as requester)"""
        requests = BorrowRequest.objects.filter(requester=request.user)
        serializer = BorrowRequestSerializer(requests, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def received_requests(self, request):
        """Get borrow requests received by current user (as owner)"""
        requests = BorrowRequest.objects.filter(owner=request.user)
        serializer = BorrowRequestSerializer(requests, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Approve a borrow request"""
        borrow_request = self.get_object()
        if borrow_request.owner != request.user and not request.user.is_admin():
            return Response({'detail': 'Only the owner can approve'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request.status = 'Approved'
        borrow_request.save()
        
        # Mark item as borrowed
        borrow_request.item.status = 'Borrowed'
        borrow_request.item.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def send_reminder(self, request, pk=None):
        """Send a return reminder to the requester"""
        borrow_request = self.get_object()
        if borrow_request.owner != request.user and not request.user.is_admin():
            return Response({'detail': 'Only the owner can send reminders'}, status=status.HTTP_403_FORBIDDEN)
        
        if borrow_request.status != 'Approved':
            return Response({'detail': 'Can only send reminders for approved requests'}, status=status.HTTP_400_BAD_REQUEST)
        
        borrow_request.reminder_sent = True
        borrow_request.save()
        
        # In a real app, this would trigger an email/notification
        return Response({'detail': 'Reminder sent successfully', 'reminder_sent': True})
    
    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        """Decline a borrow request"""
        borrow_request = self.get_object()
        if borrow_request.owner != request.user and not request.user.is_admin():
            return Response({'detail': 'Only the owner can decline'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request.status = 'Declined'
        borrow_request.save()
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def raise_dispute(self, request, pk=None):
        """Raise a dispute for a borrow request"""
        borrow_request = self.get_object()
        if borrow_request.requester != request.user and borrow_request.owner != request.user and not request.user.is_admin():
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request.is_disputed = True
        borrow_request.dispute_message = request.data.get('message', 'No reason provided')
        borrow_request.save()
        return Response({'detail': 'Dispute raised successfully'})

    @action(detail=True, methods=['post'])
    def resolve_dispute(self, request, pk=None):
        """Resolve a dispute (Admin only)"""
        if not request.user.is_admin():
            return Response({'detail': 'Only admins can resolve disputes'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request = self.get_object()
        borrow_request.is_disputed = False
        borrow_request.status = request.data.get('status', borrow_request.status)
        borrow_request.save()
        return Response({'detail': 'Dispute resolved successfully'})
    
    @action(detail=True, methods=['post'])
    def mark_returned(self, request, pk=None):
        """Mark item as returned"""
        borrow_request = self.get_object()
        if borrow_request.owner != request.user and not request.user.is_admin():
            return Response({'detail': 'Only the owner can mark as returned'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request.status = 'Returned'
        borrow_request.save()
        
        # Mark item as available
        borrow_request.item.status = 'Available'
        borrow_request.item.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
