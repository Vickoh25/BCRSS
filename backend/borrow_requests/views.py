from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import BorrowRequest
from .serializers import BorrowRequestSerializer

class BorrowRequestViewSet(viewsets.ModelViewSet):
    queryset = BorrowRequest.objects.all()
    serializer_class = BorrowRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Users can only see their own requests"""
        if self.request.user.is_authenticated:
            return BorrowRequest.objects.filter(
                requester=self.request.user
            ) | BorrowRequest.objects.filter(
                resource__owner=self.request.user
            )
        return BorrowRequest.objects.none()

    @action(detail=False, methods=['get'])
    def my_requests(self, request):
        """Get current user's borrow requests (as requester)"""
        requests = BorrowRequest.objects.filter(requester=request.user)
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def received_requests(self, request):
        """Get borrow requests received by current user (as owner)"""
        requests = BorrowRequest.objects.filter(resource__owner=request.user)
        serializer = self.get_serializer(requests, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        """Create a new borrow request"""
        # Auto-assign the requester
        request.data['requester'] = request.user.id
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        """Only allow deletion by the requester"""
        instance = self.get_object()
        if instance.requester != request.user:
            return Response(
                {'detail': 'You can only delete your own requests.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)
