"""
BCRSS - Email Notification Service
Sends transactional emails for key platform actions.
Uses Django's SMTP email backend configured in settings.py.
"""

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


def _send(subject, message, recipient_email, html_message=None):
    """Helper to send an email and log the result."""
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient_email],
            html_message=html_message,
            fail_silently=False,
        )
        logger.info(f"Email sent to {recipient_email}: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {recipient_email}: {e}")
        return False


# ──────────────────────────────────────────────
# BORROW REQUEST NOTIFICATIONS
# ──────────────────────────────────────────────

def send_borrow_request_notification(borrow_request):
    """Notify the resource owner that someone wants to borrow their item."""
    owner = borrow_request.owner
    requester = borrow_request.requester
    item = borrow_request.item

    if not owner.email:
        return False

    subject = f"New Borrow Request for \"{item.title}\""
    message = (
        f"Hi {owner.first_name or owner.username},\n\n"
        f"{requester.first_name or requester.username} ({requester.username}) "
        f"would like to borrow \"{item.title}\".\n\n"
        f"Borrow Period: {borrow_request.start_date} to {borrow_request.end_date}\n"
        f"Message: {borrow_request.message or '(none)'}\n\n"
        f"Log in to approve or decline this request:\n"
        f"{settings.FRONTEND_URL or 'https://bcrss.vercel.app'}\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, owner.email)


def send_borrow_approved_notification(borrow_request):
    """Notify the requester that their borrow request was approved."""
    requester = borrow_request.requester
    owner = borrow_request.owner
    item = borrow_request.item

    if not requester.email:
        return False

    subject = f"Your Borrow Request for \"{item.title}\" Was Approved!"
    message = (
        f"Hi {requester.first_name or requester.username},\n\n"
        f"Good news! {owner.first_name or owner.username} has approved your request "
        f"to borrow \"{item.title}\".\n\n"
        f"Borrow Period: {borrow_request.start_date} to {borrow_request.end_date}\n\n"
        f"Please arrange pickup and return the item by the agreed date.\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, requester.email)


def send_borrow_declined_notification(borrow_request):
    """Notify the requester that their borrow request was declined."""
    requester = borrow_request.requester
    owner = borrow_request.owner
    item = borrow_request.item

    if not requester.email:
        return False

    subject = f"Update on Your Borrow Request for \"{item.title}\""
    message = (
        f"Hi {requester.first_name or requester.username},\n\n"
        f"Unfortunately, {owner.first_name or owner.username} is unable to lend "
        f"\"{item.title}\" at this time.\n\n"
        f"Feel free to browse other available resources on the platform.\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, requester.email)


def send_return_reminder(borrow_request):
    """Send a return reminder to the borrower (this is the key Objective 2 feature)."""
    requester = borrow_request.requester
    owner = borrow_request.owner
    item = borrow_request.item

    if not requester.email:
        return False

    subject = f"Reminder: Return \"{item.title}\" by {borrow_request.end_date}"
    message = (
        f"Hi {requester.first_name or requester.username},\n\n"
        f"This is a friendly reminder from {owner.first_name or owner.username} "
        f"to return \"{item.title}\" by {borrow_request.end_date}.\n\n"
        f"If you've already returned it, please mark it as returned in your dashboard.\n\n"
        f"Log in to manage your requests:\n"
        f"{settings.FRONTEND_URL or 'https://bcrss.vercel.app'}\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, requester.email)


def send_returned_notification(borrow_request):
    """Notify the owner that the item has been returned."""
    owner = borrow_request.owner
    requester = borrow_request.requester
    item = borrow_request.item

    if not owner.email:
        return False

    subject = f"\"{item.title}\" Has Been Returned"
    message = (
        f"Hi {owner.first_name or owner.username},\n\n"
        f"{requester.first_name or requester.username} has marked \"{item.title}\" as returned.\n\n"
        f"Please confirm the item is back in good condition.\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, owner.email)


# ──────────────────────────────────────────────
# DISPUTE NOTIFICATIONS
# ──────────────────────────────────────────────

def send_dispute_raised_notification(borrow_request, raised_by):
    """Notify the other party that a dispute has been raised."""
    if raised_by == borrow_request.owner:
        recipient = borrow_request.requester
    else:
        recipient = borrow_request.owner

    if not recipient.email:
        return False

    item = borrow_request.item
    subject = f"Dispute Raised on \"{item.title}\" Borrow Request"
    message = (
        f"Hi {recipient.first_name or recipient.username},\n\n"
        f"A dispute has been raised on the borrow request for \"{item.title}\".\n\n"
        f"Reason: {borrow_request.dispute_message}\n\n"
        f"A community manager will review and resolve this shortly.\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, recipient.email)


def send_dispute_resolved_notification(borrow_request):
    """Notify both parties that a dispute has been resolved."""
    item = borrow_request.item
    subject = f"Dispute Resolved for \"{item.title}\""
    message = (
        f"The dispute regarding \"{item.title}\" has been resolved by an admin.\n\n"
        f"New status: {borrow_request.status}\n\n"
        f"Log in for details:\n"
        f"{settings.FRONTEND_URL or 'https://bcrss.vercel.app'}\n\n"
        f"— BCRSS Community Platform"
    )

    sent = False
    for user in [borrow_request.requester, borrow_request.owner]:
        if user.email:
            _send(subject, message, user.email)
            sent = True
    return sent


# ──────────────────────────────────────────────
# JOB NOTIFICATIONS
# ──────────────────────────────────────────────

def send_job_application_notification(job_application):
    """Notify the job poster that someone applied."""
    job = job_application.job
    poster = job.posted_by
    applicant = job_application.applicant

    if not poster.email:
        return False

    subject = f"New Application for \"{job.title}\""
    message = (
        f"Hi {poster.first_name or poster.username},\n\n"
        f"{applicant.first_name or applicant.username} has applied for your job "
        f"\"{job.title}\".\n\n"
        f"Applicant's pitch:\n{job_application.pitch}\n\n"
        f"Log in to review applications:\n"
        f"{settings.FRONTEND_URL or 'https://bcrss.vercel.app'}\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, poster.email)


# ──────────────────────────────────────────────
# AUTH NOTIFICATIONS
# ──────────────────────────────────────────────

def send_welcome_email(user):
    """Send a welcome email after registration."""
    if not user.email:
        return False

    subject = "Welcome to BCRSS!"
    message = (
        f"Hi {user.first_name or user.username},\n\n"
        f"Welcome to the Baraton Community Resource Sharing System!\n\n"
        f"You can now list resources, borrow items, find jobs, and connect "
        f"with your neighbors.\n\n"
        f"Log in here:\n"
        f"{settings.FRONTEND_URL or 'https://bcrss.vercel.app'}\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, user.email)


def send_password_reset_email(user, reset_token):
    """Send a password reset link to the user."""
    if not user.email:
        return False

    frontend_url = settings.FRONTEND_URL or 'https://bcrss.vercel.app'
    reset_url = f"{frontend_url}/reset-password?token={reset_token}"

    subject = "BCRSS - Password Reset Request"
    message = (
        f"Hi {user.first_name or user.username},\n\n"
        f"We received a request to reset your password.\n\n"
        f"Click the link below to set a new password:\n"
        f"{reset_url}\n\n"
        f"If you didn't request this, you can safely ignore this email.\n\n"
        f"— BCRSS Community Platform"
    )
    return _send(subject, message, user.email)
