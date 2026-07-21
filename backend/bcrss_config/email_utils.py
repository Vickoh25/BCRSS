from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import os

def send_verification_email(user, token):
    """Send email verification link to new user"""
    subject = 'Verify your BCRSS Account'
    frontend_url = os.getenv('FRONTEND_URL', 'https://vickoh25.github.io/BCRSS')
    verification_url = f"{frontend_url}/verify-email.html?token={token}&uid={user.id}"
    
    message = f"Hi {user.first_name},\n\nPlease verify your email by clicking the link below:\n{verification_url}\n\nThank you!"
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=True,
    )

def send_borrow_request_notification(owner, requester, resource):
    """Notify owner of a new borrow request"""
    subject = 'New Borrow Request for your Item'
    message = f"Hi {owner.first_name},\n\n{requester.username} wants to borrow your item: {resource.title}.\n\nPlease log in to the app to approve or decline the request."
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [owner.email],
        fail_silently=True,
    )

def send_status_update_notification(requester, resource, status):
    """Notify requester of status change (Approved/Declined)"""
    subject = f'Borrow Request {status}'
    message = f"Hi {requester.first_name},\n\nYour request for {resource.title} has been {status}."
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [requester.email],
        fail_silently=True,
    )
