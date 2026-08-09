from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import uuid
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
        """Create a new borrow request - auto-assign requester, owner, and id"""
        try:
            import uuid
            import time
        
            data = request.data.copy()
        
            # Generate a unique ID - use both uuid and timestamp for guarantee
            try:
                unique_id = f"req-{uuid.uuid4().hex[:12]}-{int(time.time() * 1000) % 10000}"
            except:
                # Fallback if uuid fails
                unique_id = f"req-{int(time.time() * 1000000)}"
        
            data['id'] = unique_id
            data['requester'] = request.user.id
        
            # Get the item and set owner
            item_id = data.get('item')
            if not item_id:
                return Response(
                    {'error': 'item field is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
            try:
                item = Resource.objects.get(id=item_id)
                if not item.owner:
                    return Response(
                        {'error': 'Resource has no owner'}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
                if item.owner == request.user:
                    return Response(
                        {'error': 'You cannot borrow your own item'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                data['owner'] = item.owner.id
            except Resource.DoesNotExist:
                return Response(
                    {'error': f'Resource {item_id} not found'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
        
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        
            instance = serializer.instance
            full_serializer = BorrowRequestSerializer(instance)
            return Response(full_serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            import traceback
            print(f"ERROR in create: {str(e)}")
            print(traceback.format_exc())
            return Response(
                {'error': f"Failed to create request: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def approve(self, request, pk=None):
        """Approve a borrow request (only owner can approve)"""
        borrow_request = self.get_object()
        
        if borrow_request.owner != request.user:
            return Response(
                {'error': 'Only the owner can approve this request'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if borrow_request.status != 'Pending':
            return Response(
                {'error': f'Cannot approve a {borrow_request.status} request'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        borrow_request.status = 'Approved'
        borrow_request.save()

        item = borrow_request.item
        item.status = 'Borrowed'
        item.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def decline(self, request, pk=None):
        """Decline a borrow request (only owner can decline)"""
        borrow_request = self.get_object()
        
        if borrow_request.owner != request.user:
            return Response(
                {'error': 'Only the owner can decline this request'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if borrow_request.status != 'Pending':
            return Response(
                {'error': f'Cannot decline a {borrow_request.status} request'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        borrow_request.status = 'Declined'
        borrow_request.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def mark_returned(self, request, pk=None):
        """Mark an approved borrow request as returned"""
        borrow_request = self.get_object()
        
        if borrow_request.requester != request.user and borrow_request.owner != request.user:
            return Response(
                {'error': 'Only the requester or owner can mark this as returned'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if borrow_request.status != 'Approved':
            return Response(
                {'error': f'Cannot mark a {borrow_request.status} request as returned'},
                status=status.HTTP_400_BAD_REQUEST
            )

        borrow_request.status = 'Returned'
        borrow_request.save()
        
        item = borrow_request.item
        item.status = 'Available'
        item.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def send_reminder(self, request, pk=None):
        """Send a reminder to the borrower (owner only)"""
        borrow_request = self.get_object()

        if borrow_request.owner != request.user:
            return Response(
                {'error': 'Only the owner can send a reminder'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if borrow_request.status != 'Approved':
            return Response(
                {'error': 'Reminders can only be sent for approved requests'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        borrow_request.reminder_sent = True
        borrow_request.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def raise_dispute(self, request, pk=None):
        """Raise a dispute on a borrow request"""
        borrow_request = self.get_object()
        
        if borrow_request.requester != request.user and borrow_request.owner != request.user:
            return Response(
                {'error': 'Only the requester or owner can raise a dispute'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        message = request.data.get('message', '').strip()
        if not message:
            return Response(
                {'error': 'A dispute message is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        borrow_request.is_disputed = True
        borrow_request.dispute_message = message
        borrow_request.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def resolve_dispute(self, request, pk=None):
        """Resolve a dispute (admin only)"""
        if getattr(request.user, 'role', None) != 'Admin':
            return Response(
                {'error': 'Only admins can resolve disputes'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        borrow_request = self.get_object()
        
        if not borrow_request.is_disputed:
            return Response(
                {'error': 'This request has no active dispute'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        new_status = request.data.get('status', 'Returned')
        if new_status not in dict(BorrowRequest.STATUS_CHOICES):
            return Response(
                {'error': f'Invalid status: {new_status}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        borrow_request.is_disputed = False
        borrow_request.dispute_message = None
        borrow_request.status = new_status
        borrow_request.save()
        
        if new_status == 'Returned':
            item = borrow_request.item
            item.status = 'Available'
            item.save()
        
        serializer = BorrowRequestSerializer(borrow_request)
        return Response(serializer.data)
        
    def destroy(self, request, *args, **kwargs):
        """Only allow deletion by requester"""
        instance = self.get_object()
        if instance.requester != request.user:
            return Response(
                {'detail': 'You can only delete your own requests.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)
