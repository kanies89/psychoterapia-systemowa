from django.contrib import admin
from .models import SMSReminder, FAQ

admin.site.index_template = 'custom-admin-index.html'

@admin.register(SMSReminder)
class SMSReminderAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'message', 'send_date')
    ordering = ('send_date',)

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at", "updated_at")
    search_fields = ("title", "content")
