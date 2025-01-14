from django.contrib import admin
from django.urls import include, path
from appointment_reminder.views import get_instagram_images, create_assessment

urlpatterns = [
    path('', include("appointment_reminder.urls")),
    # path('appointments/<str:response_type>/', include('appointment.urls')),
    path('api/', include('appointment.urls')),
    path('api/admin/', admin.site.urls),
    path('api/get_instagram_images/', get_instagram_images, name='get_instagram_images'),
    path('api/create_assessment/', create_assessment, name='create_assessment'),
]
