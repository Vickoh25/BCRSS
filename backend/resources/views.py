from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceSerializer, ResourceCreateSerializer

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        """Allow unauthenticated list and retrieve access"""
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'condition', 'lending_type']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ResourceCreateSerializer
        return ResourceSerializer
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_resources(self, request):
        """Get current user's resources"""
        resources = Resource.objects.filter(owner=request.user)
        serializer = ResourceSerializer(resources, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_borrowed(self, request, pk=None):
        """Mark resource as borrowed"""
        resource = self.get_object()
        resource.status = 'Borrowed'
        resource.save()
        serializer = ResourceSerializer(resource)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_available(self, request, pk=None):
        """Mark resource as available"""
        resource = self.get_object()
        resource.status = 'Available'
        resource.save()
        serializer = ResourceSerializer(resource)
        return Response(serializer.data)
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_resource(self, request, pk=None):
        """Delete resource (only by owner or admin)"""
        resource = self.get_object()
        if resource.owner != request.user and not request.user.is_admin():
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        resource.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
