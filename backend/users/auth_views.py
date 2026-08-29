from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from drf_spectacular.utils import extend_schema, inline_serializer
from rest_framework import serializers as drf_serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from .models import User
from .serializers import UserSerializer, UserDetailSerializer
from .auth_serializers import (
    UserRegisterSerializer,
    UserLoginSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
    UserProfileUpdateSerializer,
    PasswordResetSerializer,
    PasswordResetConfirmSerializer,
)
from .email_service import send_welcome_email, send_password_reset_email


class AuthRateThrottle(AnonRateThrottle):
    rate = '10/minute'


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom JWT token obtain view with user data"""
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]
    throttle_classes = [AuthRateThrottle]


class AuthViewSet(viewsets.ViewSet):
    """Authentication endpoints"""

    @extend_schema(
        summary='Register a new user',
        tags=['Auth'],
        request=UserRegisterSerializer,
        responses={201: inline_serializer('RegisterResponse', {
            'message': drf_serializers.CharField(),
            'user': UserSerializer(),
            'tokens': inline_serializer('TokenPair', {
                'access': drf_serializers.CharField(),
                'refresh': drf_serializers.CharField(),
            }),
        })},
    )
    @action(detail=False, methods=['post'], permission_classes=[AllowAny], throttle_classes=[AuthRateThrottle])
    def register(self, request):
        """Register a new user"""
        import logging
        _log = logging.getLogger(__name__)

        serializer = UserRegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = serializer.save()
        except Exception as exc:
            _log.error('register.save failed: %s', exc, exc_info=True)
            return Response(
                {'detail': f'Registration failed on the server: {exc}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            refresh = RefreshToken.for_user(user)
        except Exception as exc:
            _log.error('register.token failed: %s', exc, exc_info=True)
            # User was created but token generation failed — still return success
            # so the user can log in normally.
            return Response({
                'message': 'User registered successfully',
                'user': UserSerializer(user).data,
                'tokens': None,
                'warning': 'Account created but login token could not be generated. Please log in.',
            }, status=status.HTTP_201_CREATED)

        try:
            send_welcome_email(user)
        except Exception:
            pass  # Email failure should not break registration

        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)

    @extend_schema(
        summary='Login and obtain JWT tokens',
        tags=['Auth'],
        request=UserLoginSerializer,
        responses={200: inline_serializer('LoginResponse', {
            'message': drf_serializers.CharField(),
            'user': inline_serializer('LoginUser', {
                'id': drf_serializers.IntegerField(),
                'username': drf_serializers.CharField(),
                'email': drf_serializers.EmailField(),
                'role': drf_serializers.CharField(),
                'first_name': drf_serializers.CharField(allow_blank=True),
                'last_name': drf_serializers.CharField(allow_blank=True),
                'location': drf_serializers.CharField(allow_blank=True, allow_null=True),
                'contact': drf_serializers.CharField(allow_blank=True, allow_null=True),
                'avatar_color': drf_serializers.CharField(),
                'bio': drf_serializers.CharField(allow_blank=True, allow_null=True),
            }),
            'tokens': inline_serializer('TokenPair2', {
                'access': drf_serializers.CharField(),
                'refresh': drf_serializers.CharField(),
            }),
        })},
    )
    @action(detail=False, methods=['post'], permission_classes=[AllowAny], throttle_classes=[AuthRateThrottle])
    def login(self, request):
        """Login user and return JWT tokens"""
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'location': user.location,
                    'contact': user.contact,
                    'avatar_color': user.avatar_color,
                    'bio': user.bio,
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        summary='Logout (blacklist refresh token)',
        tags=['Auth'],
        request=inline_serializer('LogoutRequest', {
            'refresh': drf_serializers.CharField(),
        }),
        responses={200: inline_serializer('LogoutResponse', {
            'message': drf_serializers.CharField(),
        })},
    )
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        """Logout user (invalidate refresh token)"""
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        summary='Get current user profile',
        tags=['Auth'],
        responses={200: UserDetailSerializer},
    )
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Get current user profile"""
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)
    
    @extend_schema(
        summary='Change password',
        tags=['Auth'],
        request=ChangePasswordSerializer,
        responses={200: inline_serializer('ChangePasswordResponse', {
            'message': drf_serializers.CharField(),
        })},
    )
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def change_password(self, request):
        """Change user password"""
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        summary='Update user profile',
        tags=['Auth'],
        request=UserProfileUpdateSerializer,
        responses={200: inline_serializer('ProfileUpdateResponse', {
            'message': drf_serializers.CharField(),
            'user': UserDetailSerializer(),
        })},
    )
    @action(detail=False, methods=['put', 'patch'], permission_classes=[IsAuthenticated])
    def update_profile(self, request):
        """Update user profile"""
        serializer = UserProfileUpdateSerializer(
            request.user,
            data=request.data,
            partial=True,
            context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully',
                'user': UserDetailSerializer(request.user).data
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
        summary='Refresh JWT access token',
        tags=['Auth'],
        request=inline_serializer('RefreshRequest', {
            'refresh': drf_serializers.CharField(),
        }),
        responses={200: inline_serializer('RefreshResponse', {
            'access': drf_serializers.CharField(),
        })},
    )
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def refresh_token(self, request):
        """Refresh JWT access token"""
        try:
            refresh_token = request.data.get('refresh')
            if not refresh_token:
                return Response(
                    {'error': 'Refresh token is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            refresh = RefreshToken(refresh_token)
            return Response({
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary='Request password reset email',
        tags=['Auth'],
        request=PasswordResetSerializer,
        responses={200: inline_serializer('PasswordResetResponse', {
            'message': drf_serializers.CharField(),
        })},
    )
    @action(detail=False, methods=['post'], permission_classes=[AllowAny], throttle_classes=[AuthRateThrottle])
    def password_reset(self, request):
        """Request a password reset email. Includes uidb64 in the reset URL for secure confirmation."""
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                send_password_reset_email(user, token, uid)
            except User.DoesNotExist:
                pass  # Silently succeed to prevent email enumeration
            return Response(
                {'message': 'If an account exists with that email, a reset link has been sent.'},
                status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
        summary='Confirm password reset',
        tags=['Auth'],
        request=inline_serializer('PasswordResetConfirmRequest', {
            'uidb64': drf_serializers.CharField(),
            'token': drf_serializers.CharField(),
            'new_password': drf_serializers.CharField(),
            'new_password_confirm': drf_serializers.CharField(),
        }),
        responses={200: inline_serializer('PasswordResetConfirmResponse', {
            'message': drf_serializers.CharField(),
        })},
    )
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def password_reset_confirm(self, request):
        """Confirm a password reset with uidb64, token, and new password.

        The uidb64 identifies the user securely (no user_id in request body)."""
        uidb64 = request.data.get('uidb64')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        new_password_confirm = request.data.get('new_password_confirm')

        if not all([uidb64, token, new_password, new_password_confirm]):
            return Response(
                {'error': 'uidb64, token, new_password, and new_password_confirm are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if new_password != new_password_confirm:
            return Response(
                {'error': 'Passwords do not match'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(new_password) < 8:
            return Response(
                {'error': 'Password must be at least 8 characters'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {'error': 'Invalid reset link'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {'error': 'Invalid or expired token'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)

