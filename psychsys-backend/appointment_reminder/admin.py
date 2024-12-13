# appointment/admin.py
from django.contrib import admin
from .models import SMSReminder

@admin.register(SMSReminder)
class SMSReminderAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'message', 'send_date')
    ordering = ('send_date',)


# Register your models here.
