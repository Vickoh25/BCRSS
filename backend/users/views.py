from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from django.http import HttpResponse
from .serializers import UserSerializer, UserDetailSerializer
from .reports import generate_pdf_report

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        """Allow unauthenticated list access"""
        if self.action == 'list':
            return [AllowAny()]
        return super().get_permissions()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserDetailSerializer
        return UserSerializer

    def _is_role_admin(self, user):
        return user.is_authenticated and user.is_admin()

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        if user != request.user and not self._is_role_admin(request.user):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()
        if user != request.user and not self._is_role_admin(request.user):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if not self._is_role_admin(request.user):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user profile"""
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def admin_list(self, request):
        """Admin endpoint to list all users"""
        if not self._is_role_admin(request.user):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def promote_to_admin(self, request, pk=None):
        """Promote a user to admin"""
        if not self._is_role_admin(request.user):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        user = self.get_object()
        user.role = 'Admin'
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def demote_to_member(self, request, pk=None):
        """Demote an admin to member"""
        if not self._is_role_admin(request.user):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        user = self.get_object()
        user.role = 'Member'
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_analytics(self, request):
        """Admin endpoint for resource utilization reports"""
        if not self._is_role_admin(request.user):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        
        from resources.models import Resource
        from jobs.models import JobOpportunity
        from borrow_requests.models import BorrowRequest
        from django.db.models import Count
        
        # Resource stats
        total_resources = Resource.objects.count()
        available_resources = Resource.objects.filter(status='Available').count()
        borrowed_resources = Resource.objects.filter(status='Borrowed').count()
        resources_by_category = Resource.objects.values('category').annotate(count=Count('id'))
        
        # Job stats
        total_jobs = JobOpportunity.objects.count()
        open_jobs = JobOpportunity.objects.filter(status='Open').count()
        filled_jobs = JobOpportunity.objects.filter(status='Filled').count()
        
        # Borrowing stats
        total_requests = BorrowRequest.objects.count()
        approved_requests = BorrowRequest.objects.filter(status='Approved').count()
        returned_requests = BorrowRequest.objects.filter(status='Returned').count()
        disputed_requests = BorrowRequest.objects.filter(is_disputed=True).count()
        
        # User stats
        total_users = User.objects.count()
        admins = User.objects.filter(role='Admin').count()
        
        return Response({
            'resources': {
                'total': total_resources,
                'available': available_resources,
                'borrowed': borrowed_resources,
                'by_category': list(resources_by_category)
            },
            'jobs': {
                'total': total_jobs,
                'open': open_jobs,
                'filled': filled_jobs
            },
            'requests': {
                'total': total_requests,
                'approved': approved_requests,
                'returned': returned_requests,
                'disputed': disputed_requests
            },
            'users': {
                'total': total_users,
                'admins': admins
            }
        })

    @action(detail=False, methods=['get'])
    def download_report(self, request):
        """Generate and download a PDF report"""
        from resources.models import Resource
        from jobs.models import JobOpportunity
        from borrow_requests.models import BorrowRequest
        
        user = request.user
        data = {}
        
        if user.role == 'Admin':
            # Admin gets everything
            data['resources'] = Resource.objects.all().select_related('owner')
            data['jobs'] = JobOpportunity.objects.all()
            data['requests'] = BorrowRequest.objects.all().select_related('requester', 'owner', 'item')
            filename = f"BCRSS_Community_Report_{datetime.now().strftime('%Y%m%d')}.pdf"
        else:
            # Member gets only their own listings and requests they are involved in
            data['resources'] = Resource.objects.filter(owner=user)
            data['jobs'] = JobOpportunity.objects.filter(posted_by=user)
            # Requests involving the user as either requester or owner
            from django.db.models import Q
            data['requests'] = BorrowRequest.objects.filter(Q(requester=user) | Q(owner=user)).select_related('requester', 'owner', 'item')
            filename = f"BCRSS_Personal_Report_{user.username}_{datetime.now().strftime('%Y%m%d')}.pdf"
            
        from datetime import datetime
        pdf_buffer = generate_pdf_report(user, data)
        
        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return response
