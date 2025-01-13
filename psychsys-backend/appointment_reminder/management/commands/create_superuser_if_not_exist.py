from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured


class Command(BaseCommand):
    help = "Creates a superuser if it doesn't exist"

    def handle(self, *args, **kwargs):
        try:
            username = settings.SUPERUSER_USERNAME
            email = settings.SUPERUSER_EMAIL
            password = settings.SUPERUSER_PASSWORD
        except AttributeError as e:
            raise ImproperlyConfigured(
                "SUPERUSER_USERNAME, SUPERUSER_EMAIL, and SUPERUSER_PASSWORD must be defined in settings."
            ) from e

        if not username or not email or not password:
            self.stdout.write(
                self.style.ERROR("Superuser credentials not provided or incomplete in environment variables.")
            )
            return

        if not User.objects.filter(username=username).exists():
            try:
                User.objects.create_superuser(username=username, email=email, password=password)
                self.stdout.write(self.style.SUCCESS(f"Superuser {username} created successfully!"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Failed to create superuser {username}: {e}"))
        else:
            self.stdout.write(self.style.WARNING(f"Superuser {username} already exists."))
