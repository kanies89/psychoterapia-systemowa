from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.conf import settings

class Command(BaseCommand):
    help = "Creates a superuser if it doesn't exist"

    def handle(self, *args, **kwargs):
        username = settings.SUPERUSER_USERNAME
        email = settings.SUPERUSER_EMAIL
        password = settings.SUPERUSER_PASSWORD

        if not username or not email or not password:
            self.stdout.write(self.style.ERROR("Superuser credentials not provided in environment variables."))
            return

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f"Superuser {username} created successfully!"))
        else:
            self.stdout.write(self.style.WARNING(f"Superuser {username} already exists."))
