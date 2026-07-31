from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from .serializers import UserSerializer, UserDetailSerializer

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
