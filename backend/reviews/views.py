from rest_framework import viewsets, status, filters, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db import IntegrityError
from .models import Review
from .serializers import ReviewSerializer, ReviewCreateSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['rating', 'reviewer_role', 'target_user', 'resource']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ReviewCreateSerializer
        return ReviewSerializer
    
    def perform_create(self, serializer):
        try:
            serializer.save(reviewer=self.request.user)
        except IntegrityError:
            raise serializers.ValidationError({'detail': 'You have already reviewed this user.'})

    def _can_manage(self, request, review):
        return review.reviewer == request.user or request.user.is_admin()

    def update(self, request, *args, **kwargs):
        review = self.get_object()
        if not self._can_manage(request, review):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        review = self.get_object()
        if not self._can_manage(request, review):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        review = self.get_object()
        if not self._can_manage(request, review):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'])
    def my_reviews(self, request):
        """Get reviews given by current user"""
        reviews = Review.objects.filter(reviewer=request.user)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def received_reviews(self, request):
        """Get reviews received by current user"""
        reviews = Review.objects.filter(target_user=request.user)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def user_rating(self, request):
        """Get average rating for a user, optionally scoped to a resource"""
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'detail': 'user_id parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        reviews = Review.objects.filter(target_user_id=user_id)
        resource_id = request.query_params.get('resource_id')
        if resource_id:
            reviews = reviews.filter(resource_id=resource_id)
        
        if not reviews.exists():
            return Response({'average_rating': 0, 'count': 0})
        
        avg_rating = sum(r.rating for r in reviews) / len(reviews)
        return Response({
            'average_rating': round(avg_rating, 2),
            'count': len(reviews)
        })
    
    @action(detail=False, methods=['get'])
    def resource_reviews(self, request):
        """Get all borrower reviews for a specific resource"""
        resource_id = request.query_params.get('resource_id')
        if not resource_id:
            return Response({'detail': 'resource_id parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        reviews = Review.objects.filter(resource_id=resource_id).order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_review(self, request, pk=None):
        """Delete review (only by reviewer or admin)"""
        review = self.get_object()
        if not self._can_manage(request, review):
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
