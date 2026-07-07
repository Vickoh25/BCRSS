from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import JobOpportunity
from .serializers import JobOpportunitySerializer, JobOpportunityCreateSerializer

class JobOpportunityViewSet(viewsets.ModelViewSet):
    queryset = JobOpportunity.objects.all()
    serializer_class = JobOpportunitySerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        """Allow unauthenticated list and retrieve access"""
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return JobOpportunityCreateSerializer
        return JobOpportunitySerializer
    
    def perform_create(self, serializer):
        serializer.save(posted_by=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_jobs(self, request):
        """Get current user's job postings"""
        jobs = JobOpportunity.objects.filter(posted_by=request.user)
        serializer = JobOpportunitySerializer(jobs, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_filled(self, request, pk=None):
        """Mark job as filled"""
        job = self.get_object()
        job.status = 'Filled'
        job.save()
        serializer = JobOpportunitySerializer(job)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_open(self, request, pk=None):
        """Mark job as open"""
        job = self.get_object()
        job.status = 'Open'
        job.save()
        serializer = JobOpportunitySerializer(job)
        return Response(serializer.data)
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_job(self, request, pk=None):
        """Delete job (only by poster or admin)"""
        job = self.get_object()
        if job.posted_by != request.user and not request.user.is_admin():
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
