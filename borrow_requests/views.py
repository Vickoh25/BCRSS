from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
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
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return BorrowRequestCreateSerializer
        return BorrowRequestSerializer
    
    def perform_create(self, serializer):
        item = serializer.validated_data.get('item')
        serializer.save(requester=self.request.user, owner=item.owner)
    
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
        if borrow_request.owner != request.user:
            return Response({'detail': 'Only the owner can approve'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request.status = 'Approved'
        borrow_request.save()
        
        # Mark item as borrowed
        borrow_request.item.status = 'Borrowed'
        borrow_request.item.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        """Decline a borrow request"""
        borrow_request = self.get_object()
        if borrow_request.owner != request.user:
            return Response({'detail': 'Only the owner can decline'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request.status = 'Declined'
        borrow_request.save()
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_returned(self, request, pk=None):
        """Mark item as returned"""
        borrow_request = self.get_object()
        if borrow_request.owner != request.user:
            return Response({'detail': 'Only the owner can mark as returned'}, status=status.HTTP_403_FORBIDDEN)
        
        borrow_request.status = 'Returned'
        borrow_request.save()
        
        # Mark item as available
        borrow_request.item.status = 'Available'
        borrow_request.item.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
