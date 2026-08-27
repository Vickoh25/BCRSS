from unittest.mock import patch

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from rest_framework import status
from rest_framework.test import APITestCase

from users.models import User


# ──────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────

def _register_payload(**overrides):
    """Return a valid registration payload, with optional field overrides."""
    data = {
        'username': 'newuser',
        'email': 'new@example.com',
        'password': 'securepass123',
        'password_confirm': 'securepass123',
        'first_name': 'New',
        'last_name': 'User',
        'location': 'Baraton',
        'contact': '+254700000000',
    }
    data.update(overrides)
    return data


# ──────────────────────────────────────────────
# REGISTER
# ──────────────────────────────────────────────

class RegisterTests(APITestCase):
    """POST /api/auth/register/"""

    @patch('users.auth_views.send_welcome_email')
    def test_successful_registration(self, mock_email):
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(),
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User registered successfully')

        # User was created
        self.assertTrue(User.objects.filter(username='newuser').exists())
        user = User.objects.get(username='newuser')
        self.assertEqual(user.email, 'new@example.com')
        self.assertEqual(user.role, 'Member')
        self.assertTrue(user.check_password('securepass123'))

        # Tokens returned
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])

        # Welcome email was sent
        mock_email.assert_called_once()

    @patch('users.auth_views.send_welcome_email')
    def test_registration_returns_user_data(self, mock_email):
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(),
            format='json',
        )
        user_data = response.data['user']
        self.assertEqual(user_data['username'], 'newuser')
        self.assertEqual(user_data['email'], 'new@example.com')
        self.assertEqual(user_data['first_name'], 'New')
        self.assertEqual(user_data['last_name'], 'User')
        self.assertEqual(user_data['role'], 'Member')

    @patch('users.auth_views.send_welcome_email')
    def test_registration_creates_usable_tokens(self, mock_email):
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(),
            format='json',
        )
        # Use the returned access token to call /api/auth/me/
        access = response.data['tokens']['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        me_response = self.client.get('/api/auth/me/')
        self.assertEqual(me_response.status_code, status.HTTP_200_OK)
        self.assertEqual(me_response.data['username'], 'newuser')

    def test_password_mismatch(self):
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(password='pass12345', password_confirm='different123'),
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(User.objects.filter(username='newuser').exists())

    def test_duplicate_username(self):
        User.objects.create_user(
            username='newuser', email='existing@example.com', password='pass12345'
        )
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(),
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_duplicate_email(self):
        User.objects.create_user(
            username='other', email='new@example.com', password='pass12345'
        )
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(),
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_short_password_rejected(self):
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(password='short', password_confirm='short'),
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_required_fields(self):
        response = self.client.post(
            '/api/auth/register/',
            {},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @patch('users.auth_views.send_welcome_email')
    def test_welcome_email_failure_does_not_break_registration(self, mock_email):
        mock_email.side_effect = Exception('SMTP down')
        response = self.client.post(
            '/api/auth/register/',
            _register_payload(),
            format='json',
        )
        # Registration still succeeds even if email fails
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())


# ──────────────────────────────────────────────
# LOGIN
# ──────────────────────────────────────────────

class LoginTests(APITestCase):
    """POST /api/auth/login/"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User',
            role='Member',
        )

    def test_successful_login(self):
        response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'testpass123'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Login successful')

        # Tokens returned
        self.assertIn('access', response.data['tokens'])
        self.assertIn('refresh', response.data['tokens'])

        # User data returned
        self.assertEqual(response.data['user']['username'], 'testuser')
        self.assertEqual(response.data['user']['email'], 'test@example.com')
        self.assertEqual(response.data['user']['role'], 'Member')
        self.assertEqual(response.data['user']['first_name'], 'Test')

    def test_login_with_wrong_password(self):
        response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'wrongpassword'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_with_nonexistent_user(self):
        response = self.client.post(
            '/api/auth/login/',
            {'username': 'nobody', 'password': 'testpass123'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_with_empty_body(self):
        response = self.client.post(
            '/api/auth/login/',
            {},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_tokens_are_usable(self):
        response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'testpass123'},
            format='json',
        )
        access = response.data['tokens']['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        me_response = self.client.get('/api/auth/me/')
        self.assertEqual(me_response.status_code, status.HTTP_200_OK)
        self.assertEqual(me_response.data['username'], 'testuser')

    def test_login_returns_avatar_color(self):
        response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'testpass123'},
            format='json',
        )
        self.assertIn('avatar_color', response.data['user'])


# ──────────────────────────────────────────────
# LOGOUT
# ──────────────────────────────────────────────

class LogoutTests(APITestCase):
    """POST /api/auth/logout/"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', email='test@example.com', password='testpass123'
        )
        # Get a refresh token
        from rest_framework_simplejwt.tokens import RefreshToken
        self.refresh_token = str(RefreshToken.for_user(self.user))
        self.client.force_authenticate(user=self.user)

    def test_successful_logout(self):
        response = self.client.post(
            '/api/auth/logout/',
            {'refresh': self.refresh_token},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Logout successful')

    def test_logout_blacklists_refresh_token(self):
        self.client.post(
            '/api/auth/logout/',
            {'refresh': self.refresh_token},
            format='json',
        )
        # Refreshing with the blacklisted token should fail
        response = self.client.post(
            '/api/token/refresh/',
            {'refresh': self.refresh_token},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_without_refresh_token(self):
        """Logout still succeeds even if no refresh token is provided."""
        response = self.client.post(
            '/api/auth/logout/',
            {},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.post(
            '/api/auth/logout/',
            {'refresh': self.refresh_token},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_with_invalid_refresh_token(self):
        response = self.client.post(
            '/api/auth/logout/',
            {'refresh': 'invalid-token-value'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# ──────────────────────────────────────────────
# GET CURRENT USER (me)
# ──────────────────────────────────────────────

class MeTests(APITestCase):
    """GET /api/auth/me/"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User',
            location='Baraton',
            bio='Hello world',
        )
        self.client.force_authenticate(user=self.user)

    def test_get_current_user(self):
        response = self.client.get('/api/auth/me/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertEqual(response.data['first_name'], 'Test')
        self.assertEqual(response.data['last_name'], 'User')
        self.assertEqual(response.data['location'], 'Baraton')
        self.assertEqual(response.data['bio'], 'Hello world')

    def test_me_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get('/api/auth/me/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_includes_counts(self):
        response = self.client.get('/api/auth/me/')
        self.assertIn('resources_count', response.data)
        self.assertIn('jobs_count', response.data)
        self.assertIn('reviews_count', response.data)


# ──────────────────────────────────────────────
# CHANGE PASSWORD
# ──────────────────────────────────────────────

class ChangePasswordTests(APITestCase):
    """POST /api/auth/change_password/"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', email='test@example.com', password='oldpass12345'
        )
        self.client.force_authenticate(user=self.user)

    def test_successful_password_change(self):
        response = self.client.post(
            '/api/auth/change_password/',
            {
                'old_password': 'oldpass12345',
                'new_password': 'newpass12345',
                'new_password_confirm': 'newpass12345',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Password changed successfully')

        # Verify new password works
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('newpass12345'))
        self.assertFalse(self.user.check_password('oldpass12345'))

    def test_wrong_old_password(self):
        response = self.client.post(
            '/api/auth/change_password/',
            {
                'old_password': 'wrongoldpass',
                'new_password': 'newpass12345',
                'new_password_confirm': 'newpass12345',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_mismatched_new_passwords(self):
        response = self.client.post(
            '/api/auth/change_password/',
            {
                'old_password': 'oldpass12345',
                'new_password': 'newpass12345',
                'new_password_confirm': 'different123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_short_new_password(self):
        response = self.client.post(
            '/api/auth/change_password/',
            {
                'old_password': 'oldpass12345',
                'new_password': 'short',
                'new_password_confirm': 'short',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_password_requires_auth(self):
        self.client.force_authenticate(user=None)
        response = self.client.post(
            '/api/auth/change_password/',
            {
                'old_password': 'oldpass12345',
                'new_password': 'newpass12345',
                'new_password_confirm': 'newpass12345',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


# ──────────────────────────────────────────────
# UPDATE PROFILE
# ──────────────────────────────────────────────

class UpdateProfileTests(APITestCase):
    """PUT/PATCH /api/auth/update_profile/"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            first_name='Old',
            last_name='Name',
        )
        self.client.force_authenticate(user=self.user)

    def test_partial_profile_update(self):
        response = self.client.patch(
            '/api/auth/update_profile/',
            {'first_name': 'New', 'bio': 'Updated bio'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Profile updated successfully')
        self.assertEqual(response.data['user']['first_name'], 'New')
        self.assertEqual(response.data['user']['bio'], 'Updated bio')

    def test_update_email(self):
        response = self.client.patch(
            '/api/auth/update_profile/',
            {'email': 'new@example.com'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, 'new@example.com')

    def test_duplicate_email_rejected(self):
        User.objects.create_user(
            username='other', email='taken@example.com', password='pass12345'
        )
        response = self.client.patch(
            '/api/auth/update_profile/',
            {'email': 'taken@example.com'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_profile_requires_auth(self):
        self.client.force_authenticate(user=None)
        response = self.client.patch(
            '/api/auth/update_profile/',
            {'first_name': 'Hacker'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


# ──────────────────────────────────────────────
# PASSWORD RESET REQUEST
# ──────────────────────────────────────────────

class PasswordResetRequestTests(APITestCase):
    """POST /api/auth/password_reset/"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', email='test@example.com', password='testpass123'
        )

    @patch('users.auth_views.send_password_reset_email')
    def test_valid_email_sends_reset(self, mock_email):
        response = self.client.post(
            '/api/auth/password_reset/',
            {'email': 'test@example.com'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('reset link has been sent', response.data['message'])
        mock_email.assert_called_once()

        # Verify the email was called with uid and token
        args, kwargs = mock_email.call_args
        user_arg, token_arg, uid_arg = args
        self.assertEqual(user_arg, self.user)
        self.assertIsInstance(token_arg, str)
        self.assertIsInstance(uid_arg, str)

    @patch('users.auth_views.send_password_reset_email')
    def test_nonexistent_email_still_returns_200(self, mock_email):
        """Prevents email enumeration — same response whether user exists or not."""
        response = self.client.post(
            '/api/auth/password_reset/',
            {'email': 'nobody@example.com'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_email.assert_not_called()

    def test_invalid_email_format(self):
        response = self.client.post(
            '/api/auth/password_reset/',
            {'email': 'not-an-email'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_email(self):
        response = self.client.post(
            '/api/auth/password_reset/',
            {},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# ──────────────────────────────────────────────
# PASSWORD RESET CONFIRM
# ──────────────────────────────────────────────

class PasswordResetConfirmTests(APITestCase):
    """POST /api/auth/password_reset_confirm/"""

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', email='test@example.com', password='oldpass12345'
        )
        self.token = default_token_generator.make_token(self.user)
        self.uid = urlsafe_base64_encode(force_bytes(self.user.pk))

    def test_successful_password_reset(self):
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': self.uid,
                'token': self.token,
                'new_password': 'newsecurepass123',
                'new_password_confirm': 'newsecurepass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Password reset successful')

        # Verify new password works
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('newsecurepass123'))
        self.assertFalse(self.user.check_password('oldpass12345'))

    def test_new_password_works_for_login(self):
        """Full end-to-end: reset password → login with new password."""
        self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': self.uid,
                'token': self.token,
                'new_password': 'brandnewpass123',
                'new_password_confirm': 'brandnewpass123',
            },
            format='json',
        )
        response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'brandnewpass123'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_token(self):
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': self.uid,
                'token': 'invalid-token',
                'new_password': 'newsecurepass123',
                'new_password_confirm': 'newsecurepass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Invalid or expired token', response.data['error'])

    def test_invalid_uid(self):
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': 'AAAA',
                'token': self.token,
                'new_password': 'newsecurepass123',
                'new_password_confirm': 'newsecurepass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Invalid reset link', response.data['error'])

    def test_nonexistent_user_uid(self):
        """uid decodes to a valid integer but no matching user."""
        fake_uid = urlsafe_base64_encode(force_bytes(999999))
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': fake_uid,
                'token': self.token,
                'new_password': 'newsecurepass123',
                'new_password_confirm': 'newsecurepass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_mismatch(self):
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': self.uid,
                'token': self.token,
                'new_password': 'newsecurepass123',
                'new_password_confirm': 'differentpass123',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Passwords do not match', response.data['error'])

    def test_short_password(self):
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': self.uid,
                'token': self.token,
                'new_password': 'short',
                'new_password_confirm': 'short',
            },
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('at least 8 characters', response.data['error'])

    def test_missing_fields(self):
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {'uidb64': self.uid},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_empty_body(self):
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_token_is_single_use(self):
        """After a successful reset, the same token should be invalid."""
        self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': self.uid,
                'token': self.token,
                'new_password': 'newsecurepass123',
                'new_password_confirm': 'newsecurepass123',
            },
            format='json',
        )
        # Try reusing the same token
        response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': self.uid,
                'token': self.token,
                'new_password': 'anotherpass123',
                'new_password_confirm': 'anotherpass123',
            },
            format='json',
        )
        # Token should be invalid after password change
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# ──────────────────────────────────────────────
# FULL END-TO-END FLOWS
# ──────────────────────────────────────────────

class EndToEndAuthFlowTests(APITestCase):
    """Multi-step integration-style tests."""

    @patch('users.auth_views.send_welcome_email')
    def test_register_then_login_then_me(self, mock_email):
        # 1. Register
        reg_response = self.client.post(
            '/api/auth/register/',
            _register_payload(),
            format='json',
        )
        self.assertEqual(reg_response.status_code, status.HTTP_201_CREATED)

        # 2. Login with the same credentials
        login_response = self.client.post(
            '/api/auth/login/',
            {'username': 'newuser', 'password': 'securepass123'},
            format='json',
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        access = login_response.data['tokens']['access']

        # 3. Call /me with the login token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        me_response = self.client.get('/api/auth/me/')
        self.assertEqual(me_response.status_code, status.HTTP_200_OK)
        self.assertEqual(me_response.data['username'], 'newuser')

    def test_login_then_logout_then_refresh_fails(self):
        User.objects.create_user(
            username='testuser', email='test@example.com', password='testpass123'
        )
        from rest_framework_simplejwt.tokens import RefreshToken

        # 1. Login
        login_response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'testpass123'},
            format='json',
        )
        refresh = login_response.data['tokens']['refresh']
        access = login_response.data['tokens']['access']

        # 2. Logout (blacklists refresh token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access}')
        logout_response = self.client.post(
            '/api/auth/logout/',
            {'refresh': refresh},
            format='json',
        )
        self.assertEqual(logout_response.status_code, status.HTTP_200_OK)

        # 3. Refreshing with blacklisted token fails
        refresh_response = self.client.post(
            '/api/token/refresh/',
            {'refresh': refresh},
            format='json',
        )
        self.assertEqual(refresh_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_full_password_reset_flow(self):
        """Request reset → get token → confirm reset → login with new password."""
        user = User.objects.create_user(
            username='testuser', email='test@example.com', password='oldpass12345'
        )

        # 1. Request password reset
        with patch('users.auth_views.send_password_reset_email') as mock_email:
            self.client.post(
                '/api/auth/password_reset/',
                {'email': 'test@example.com'},
                format='json',
            )
            # Extract uid and token from the mock call
            args = mock_email.call_args[0]
            token = args[1]
            uid = args[2]

        # 2. Confirm password reset
        confirm_response = self.client.post(
            '/api/auth/password_reset_confirm/',
            {
                'uidb64': uid,
                'token': token,
                'new_password': 'brandnewpass123',
                'new_password_confirm': 'brandnewpass123',
            },
            format='json',
        )
        self.assertEqual(confirm_response.status_code, status.HTTP_200_OK)

        # 3. Login with new password
        login_response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'brandnewpass123'},
            format='json',
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

        # 4. Old password no longer works
        old_login = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'oldpass12345'},
            format='json',
        )
        self.assertEqual(old_login.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_password_then_login(self):
        """Change password → logout → login with new password."""
        user = User.objects.create_user(
            username='testuser', email='test@example.com', password='oldpass12345'
        )
        self.client.force_authenticate(user=user)

        # 1. Change password
        change_response = self.client.post(
            '/api/auth/change_password/',
            {
                'old_password': 'oldpass12345',
                'new_password': 'newsecure123',
                'new_password_confirm': 'newsecure123',
            },
            format='json',
        )
        self.assertEqual(change_response.status_code, status.HTTP_200_OK)

        # 2. Login with new password
        self.client.force_authenticate(user=None)
        login_response = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'newsecure123'},
            format='json',
        )
        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

        # 3. Old password fails
        old_login = self.client.post(
            '/api/auth/login/',
            {'username': 'testuser', 'password': 'oldpass12345'},
            format='json',
        )
        self.assertEqual(old_login.status_code, status.HTTP_400_BAD_REQUEST)


# ──────────────────────────────────────────────
# DOWNLOAD REPORT (existing tests)
# ──────────────────────────────────────────────

class DownloadReportTests(APITestCase):
    def setUp(self):
        self.member = User.objects.create_user(
            username='member1',
            email='member@test.com',
            password='testpass123',
            role='Member',
        )
        self.admin = User.objects.create_user(
            username='admin1',
            email='admin@test.com',
            password='testpass123',
            role='Admin',
        )

    def test_download_report_requires_auth(self):
        response = self.client.get('/api/users/download_report/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_member_can_download_personal_report(self):
        self.client.force_authenticate(user=self.member)
        response = self.client.get('/api/users/download_report/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        self.assertIn('attachment', response['Content-Disposition'])
        self.assertIn('BCRSS_Personal_Report_member1', response['Content-Disposition'])
        self.assertTrue(response.content.startswith(b'%PDF'))

    def test_admin_can_download_community_report(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/users/download_report/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        self.assertIn('BCRSS_Community_Report', response['Content-Disposition'])
        self.assertTrue(response.content.startswith(b'%PDF'))
