import cloudinary
import cloudinary.uploader
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceSerializer, ResourceCreateSerializer

# Configure Cloudinary from Django settings
if settings.CLOUDINARY_CLOUD_NAME:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
    )

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

    def _can_manage(self, request, resource):
        return resource.owner == request.user or request.user.is_admin()

    def update(self, request, *args, **kwargs):
        resource = self.get_object()
        if not self._can_manage(request, resource):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        resource = self.get_object()
        if not self._can_manage(request, resource):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        resource = self.get_object()
        if not self._can_manage(request, resource):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    
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
        if not self._can_manage(request, resource):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        resource.status = 'Borrowed'
        resource.save()
        serializer = ResourceSerializer(resource)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def mark_available(self, request, pk=None):
        """Mark resource as available"""
        resource = self.get_object()
        if not self._can_manage(request, resource):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        resource.status = 'Available'
        resource.save()
        serializer = ResourceSerializer(resource)
        return Response(serializer.data)
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_resource(self, request, pk=None):
        """Delete resource (only by owner or admin)"""
        resource = self.get_object()
        if not self._can_manage(request, resource):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        resource.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_image(self, request):
        """Upload an image to Cloudinary and return the URL."""
        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'detail': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)

        if not settings.CLOUDINARY_CLOUD_NAME:
            return Response({'detail': 'Cloudinary is not configured.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        try:
            result = cloudinary.uploader.upload(
                image_file,
                folder='bcrss/resources',
                resource_type='image',
                transformation=[{'width': 800, 'height': 800, 'crop': 'limit', 'quality': 'auto'}],
            )
            return Response({'image_url': result.get('secure_url', result.get('url', ''))})
        except Exception as e:
            return Response({'detail': f'Image upload failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_image_for_resource(self, request, pk=None):
        """Upload an image for a specific resource and save the URL."""
        resource = self.get_object()
        if not self._can_manage(request, resource):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

        image_file = request.FILES.get('image')
        if not image_file:
            return Response({'detail': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)

        if not settings.CLOUDINARY_CLOUD_NAME:
            return Response({'detail': 'Cloudinary is not configured.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        try:
            result = cloudinary.uploader.upload(
                image_file,
                folder='bcrss/resources',
                resource_type='image',
                transformation=[{'width': 800, 'height': 800, 'crop': 'limit', 'quality': 'auto'}],
            )
            resource.image_url = result.get('secure_url', result.get('url', ''))
            resource.save(update_fields=['image_url', 'updated_at'])
            serializer = ResourceSerializer(resource)
            return Response(serializer.data)
        except Exception as e:
            return Response({'detail': f'Image upload failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
