from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):
    help = "Create or promote a user to Admin role"

    def add_arguments(self, parser):
        parser.add_argument("username", help="Username of the admin user")
        parser.add_argument("--email", default="admin@baraton.edu", help="Admin email")
        parser.add_argument("--password", default="BaratonAdmin2026!", help="Admin password")
        parser.add_argument("--name", default="Admin", help="Admin display name")

    def handle(self, *args, **options):
        username = options["username"]
        email = options["email"]
        password = options["password"]
        name = options["name"]

        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "first_name": name,
                "role": "Admin",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if created:
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(
                f"Admin user '{username}' created successfully with password: {password}"
            ))
        else:
            user.role = "Admin"
            user.is_staff = True
            user.is_superuser = True
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(
                f"User '{username}' promoted to Admin. Password updated."
            ))

        self.stdout.write(f"Role: {user.role}")
        self.stdout.write(f"Email: {user.email}")
        self.stdout.write(f"Staff: {user.is_staff}")
