from datetime import timedelta, datetime

from django.core.management.base import BaseCommand
from appointment.models import Service, StaffMember, WorkingHours, Config
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Create test data for the appointment app"

    def handle(self, *args, **kwargs):
        # Create a test user
        user, created = User.objects.get_or_create(
            username="test_user",
            defaults={"email": "test_user@example.com", "password": "password123"},
        )
        if created:
            self.stdout.write("Test user created.")
        else:
            self.stdout.write("Test user already exists.")

        # Create a test service
        service, created = Service.objects.get_or_create(
            name="Test Service",
            defaults={"description": "This is a test service."},
            duration=timedelta(minutes=50),  # Example duration of 1 hour
            price=300,
            down_payment=0,
            currency = 'PLN'
        )
        if created:
            self.stdout.write("Test service created.")
        else:
            self.stdout.write("Test service already exists.")

        # Create a test staff member
        staff_member, created = StaffMember.objects.get_or_create(
            user=user,
            slot_duration=60
        )
        if created:
            self.stdout.write("Test staff member created.")
        else:
            self.stdout.write("Test staff member already exists.")


        # Create a test config
        config, created = Config.objects.get_or_create(
            slot_duration = timedelta(minutes=60),  # Example duration of 1 hour
            lead_time = datetime.strptime("07:00:00", "%H:%M:%S").time(),
            finish_time = datetime.strptime("20:00:00", "%H:%M:%S").time(),
            appointment_buffer_time = 60,  # Example duration of 1 hour
            website_name = 'Psychoterapia-systemowa'
        )

        if created:
            self.stdout.write("Test config created.")
        else:
            self.stdout.write("Test config already exists.")

        # Create test working hours for the test staff member
        test_hours = [
            {"day_of_week": 0, "start_time": "09:00:00", "end_time": "17:00:00"},
            {"day_of_week": 1, "start_time": "09:00:00", "end_time": "17:00:00"},
        ]

        for hours in test_hours:
            WorkingHours.objects.get_or_create(
                staff_member=staff_member,
                day_of_week=hours["day_of_week"],
                defaults={
                    "start_time": hours["start_time"],
                    "end_time": hours["end_time"],
                },
            )
        self.stdout.write("Test working hours created.")
