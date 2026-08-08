from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import BorrowRequest
from .serializers import BorrowRequestSerializer, BorrowRequestCreateSerializer
from resources.models import Resource


class BorrowRequestViewSet(viewsets.ModelViewSet):
    """ViewSet for managing borrow requests"""
    queryset = BorrowRequest.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        """Use different serializer for create"""
        if self.action == 'create':
            return BorrowRequestCreateSerializer
        return BorrowRequestSerializer
    
    def get_queryset(self):
        """Filter requests based on user role"""
        user = self.request.user
        if not user.is_authenticated:
            return BorrowRequest.objects.none()
        
        # Users see requests they made OR requests where they are the owner
        return BorrowRequest.objects.filter(
            requester=user
        ) | BorrowRequest.objects.filter(
            owner=user
        )
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_requests(self, request):
        """Get current user's borrow requests (as requester)"""
        try:
            my_reqs = BorrowRequest.objects.filter(requester=request.user).order_by('-created_at')
            serializer = BorrowRequestSerializer(my_reqs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def received_requests(self, request):
        """Get borrow requests received by current user (as owner)"""
        try:
            rec_reqs = BorrowRequest.objects.filter(
                owner=request.user
            ).order_by('-created_at')
            serializer = BorrowRequestSerializer(rec_reqs, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def create(self, request, *args, **kwargs):
        """Create a new borrow request - auto-assign requester and owner"""
        try:
            data = request.data.copy()
            data['requester'] = request.user.id
            
            # Get the item and set owner from the resource
            item_id = data.get('item')
            if item_id:
                try:
                    item = Resource.objects.get(id=item_id)
                    data['owner'] = item.owner.id
                except Resource.DoesNotExist:
                    return Response(
                        {'error': 'Resource not found'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {'error': 'item field is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            # Return with full BorrowRequestSerializer
            instance = serializer.instance
            full_serializer = BorrowRequestSerializer(instance)
            return Response(full_serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def destroy(self, request, *args, **kwargs):
        """Only allow deletion by requester"""
        instance = self.get_object()
        if instance.requester != request.user:
            return Response(
                {'detail': 'You can only delete your own requests.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)
