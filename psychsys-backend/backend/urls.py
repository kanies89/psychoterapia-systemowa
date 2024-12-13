from django.contrib import admin
from django.urls import include, path
from appointment_reminder.views import get_instagram_images


urlpatterns = [
    path('', include("appointment_reminder.urls")),
    path('appointment/', include('appointment.urls')),
    path('admin/', admin.site.urls),
    path('api/get_instagram_images', get_instagram_images, name='get_instagram_images'),
]
