# Create your models here.
# appointment_reminder/models.py
from django.db import models
from datetime import datetime
from django_celery_beat.models import PeriodicTask, CrontabSchedule

import json

class SMSReminder(models.Model):
    phone_number = models.CharField(max_length=15)
    message = models.TextField()
    send_date = models.DateTimeField()

    def schedule_sms(self):
        """
        Schedule the SMS reminder as a periodic task in Celery Beat.
        """
        if datetime.now() < self.send_date:
            # Create or get a crontab schedule matching the send_date
            cron_schedule, created = CrontabSchedule.objects.get_or_create(
                minute=str(self.send_date.minute),
                hour=str(self.send_date.hour),
                day_of_month=str(self.send_date.day),
                month_of_year=str(self.send_date.month),
                day_of_week='*',  # Optional, change to specific days if needed
            )

            # Create a periodic task linked to this model's SMS reminder
            PeriodicTask.objects.create(
                crontab=cron_schedule,
                name=f'sms_reminder_{self.id}',
                task='appointment.tasks.send_sms',
                args=json.dumps([self.phone_number, self.message]),
            )
