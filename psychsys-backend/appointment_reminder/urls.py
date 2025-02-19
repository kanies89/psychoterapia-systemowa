from django.urls import path
from .views import (instagram_embed_api, get_available_services, get_available_slots, get_staff_members,
                    server_time, get_service_duration, upload_image, list_images, faq_list, add_faq, check_login_status)

urlpatterns = [
    path('api/instagram_api/instagram-embed/', instagram_embed_api, name='instagram_embed_api'),
    # Include the URLs of the 'appointment' library
    path('api/appointment_api/get_available_services/', get_available_services, name='get_available_services'),
    # need to be incuded the date and staff_member id in request, like:
    # /appointment/get_available_slots/?selected_date=2024-12-11&staff_member=2
    path('api/appointment_api/get_available_slots/', get_available_slots, name='get_available_slots'),
    path('api/appointment_api/get_staff_members/<int:service_id>/', get_staff_members, name='get_staff_members_by_service'),
    path('api/admin/api/server-time/', server_time, name='server_time'),
    path('api/appointment_api/get_service_duration/', get_service_duration, name='get_service_duration'),
    path('api/upload-image/', upload_image, name='upload-image'),
    path('api/list-images/', list_images, name='list-images'),
    path("api/faqs/", faq_list, name="faq_list"),
    path("api/faqs/add/", add_faq, name="add_faq"),
    path("api/check-login-status/", check_login_status, name="check_login_status"),
]