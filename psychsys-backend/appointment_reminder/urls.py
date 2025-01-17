from django.urls import path, include
from .views import instagram_embed_api, get_available_services, get_available_slots, get_staff_members

urlpatterns = [

    path('api/instagram_api/instagram-embed/', instagram_embed_api, name='instagram_embed_api'),
    # Include the URLs of the 'appointment' library
    path('api/appointment_api/get_available_services/', get_available_services, name='get_available_services'),
    # need to be incuded the date and staff_member id in request, like:
    # /appointment/get_available_slots/?selected_date=2024-12-11&staff_member=2
    path('api/appointment_api/get_available_slots/', get_available_slots, name='get_available_slots'),
    path('api/appointment_api/get_staff_members/<int:service_id>/', get_staff_members, name='get_staff_members_by_service')
    path('api/server-time/', views.server_time, name='server_time'),
]
