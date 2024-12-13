# index/tasks.py
from celery import shared_task

@shared_task
def send_sms(phone_number, message):
    # Example of sending an SMS
    print(f"Sending SMS to {phone_number}: {message}")
    # Actual SMS logic here, e.g., API call to SMS provider
    return f"SMS sent to {phone_number}"
