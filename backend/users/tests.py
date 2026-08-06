from rest_framework import status
from rest_framework.test import APITestCase

from users.models import User


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
