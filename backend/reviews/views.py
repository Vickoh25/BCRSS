from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Review
from .serializers import ReviewSerializer, ReviewCreateSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['rating', 'reviewer_role', 'target_user']
    ordering_fields = ['created_at', 'rating']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ReviewCreateSerializer
        return ReviewSerializer
    
    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)
    
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
        """Get average rating for a user"""
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'detail': 'user_id parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        reviews = Review.objects.filter(target_user_id=user_id)
        if not reviews.exists():
            return Response({'average_rating': 0, 'count': 0})
        
        avg_rating = sum(r.rating for r in reviews) / len(reviews)
        return Response({
            'average_rating': round(avg_rating, 2),
            'count': len(reviews)
        })
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_review(self, request, pk=None):
        """Delete review (only by reviewer or admin)"""
        review = self.get_object()
        if review.reviewer != request.user and not request.user.is_admin():
            return Response({'detail': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
