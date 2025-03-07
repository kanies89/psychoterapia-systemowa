# urls.py
# Path: appointment/urls.py

"""
Author: Adams Pierre David
Since: 1.0.0
"""

from django.urls import include, path

from appointment.views import (
    appointment_client_information, appointment_request, appointment_request_submit, confirm_reschedule,
    default_thank_you, enter_verification_code, get_available_slots_ajax, get_next_available_date_ajax,
    get_non_working_days_ajax, prepare_reschedule_appointment, reschedule_appointment_submit, set_passwd,
    send_verification_code, confirm_verification_code
)
from appointment.views_admin import (
    add_day_off, add_or_update_service, add_or_update_staff_info, add_staff_member_info, add_working_hours,
    create_new_staff_member, delete_appointment, delete_appointment_ajax, delete_day_off, delete_service,
    delete_working_hours, display_appointment, email_change_verification_code, fetch_service_list_for_staff,
    fetch_staff_list, get_service_list, get_user_appointments, is_user_staff_admin, make_superuser_staff_member,
    remove_staff_member, remove_superuser_staff_member, update_appt_date_time, update_appt_min_info, update_day_off,
    update_personal_info, update_working_hours, user_profile, validate_appointment_date
)
prefix = 'api/'
prefix_admin = ''
app_name = 'appointment'

admin_urlpatterns = [
    # display the calendar with the events
    path(f'{prefix_admin}appointments/<str:response_type>/', get_user_appointments, name='get_user_event_type'),
    path(f'{prefix_admin}appointments/', get_user_appointments, name='get_user_appointments'),

    # create a new staff member and make/remove superuser staff member
    path(f'{prefix_admin}add-staff-member-info/', add_staff_member_info, name='add_staff_member_info'),
    path(f'{prefix_admin}create-new-staff-member/', create_new_staff_member, name='add_staff_member_personal_info'),
    path(f'{prefix_admin}update-staff-member/<int:user_id>/', add_or_update_staff_info, name='update_staff_other_info'),
    path(f'{prefix_admin}add-staff-member/', add_or_update_staff_info, name='add_staff_other_info'),
    path(f'{prefix_admin}make-superuser-staff-member/', make_superuser_staff_member, name='make_superuser_staff_member'),
    path(f'{prefix_admin}remove-superuser-staff-member/', remove_superuser_staff_member, name='remove_superuser_staff_member'),

    # remove staff member
    path(f'{prefix_admin}remove-staff-member/<int:staff_user_id>/', remove_staff_member, name='remove_staff_member'),

    # add, update, remove services
    path(f'{prefix_admin}add-service/', add_or_update_service, name='add_service'),
    path(f'{prefix_admin}update-service/<int:service_id>/', add_or_update_service, name='update_service'),
    path(f'{prefix_admin}delete-service/<int:service_id>/', delete_service, name='delete_service'),
    path(f'{prefix_admin}service-list/', get_service_list, name='get_service_list'),
    path(f'{prefix_admin}service-list/<str:response_type>/', get_service_list, name='get_service_list_type'),
    path(f'{prefix_admin}view-service/<int:service_id>/<int:view>/', add_or_update_service, name='view_service'),

    # display details for one event
    path(f'{prefix_admin}display-appointment/<int:appointment_id>/', display_appointment, name='display_appointment'),

    # complete profile
    path(f'{prefix_admin}user-profile/<int:staff_user_id>/', user_profile, name='user_profile'),
    path(f'{prefix_admin}user-profile/', user_profile, name='user_profile'),
    path(f'{prefix_admin}update-user-info/<int:staff_user_id>/', update_personal_info, name='update_user_info'),
    path(f'{prefix_admin}update-user-info/', update_personal_info, name='update_user_info'),

    # add, update, delete day off with staff_user_id
    path(f'{prefix_admin}add-day-off/<int:staff_user_id>/', add_day_off, name='add_day_off'),
    path(f'{prefix_admin}update-day-off/<int:day_off_id>/<int:staff_user_id>/', update_day_off, name='update_day_off_id'),
    path(f'{prefix_admin}delete-day-off/<int:day_off_id>/<int:staff_user_id>/', delete_day_off, name='delete_day_off_id'),

    # add, update, delete day off without staff_user_id
    path(f'{prefix_admin}update-day-off/<int:day_off_id>/', update_day_off, name='update_day_off'),
    path(f'{prefix_admin}delete-day-off/<int:day_off_id>/', delete_day_off, name='delete_day_off'),

    # add, update, delete working hours with staff_user_id
    path(f'{prefix_admin}update-working-hours/<int:working_hours_id>/<int:staff_user_id>/', update_working_hours,
         name='update_working_hours_id'),
    path(f'{prefix_admin}add-working-hours/<int:staff_user_id>/', add_working_hours, name='add_working_hours_id'),
    path(f'{prefix_admin}delete-working-hours/<int:working_hours_id>/<int:staff_user_id>/', delete_working_hours,
         name='delete_working_hours_id'),

    # add, update, delete working hours without staff_user_id
    path(f'{prefix_admin}update-working-hours/<int:working_hours_id>/', update_working_hours, name='update_working_hours'),
    path(f'{prefix_admin}add-working-hours/', add_working_hours, name='add_working_hours'),
    path(f'{prefix_admin}delete-working-hours/<int:working_hours_id>/', delete_working_hours, name='delete_working_hours'),

    # delete appointment
    path(f'{prefix_admin}delete-appointment/<int:appointment_id>/', delete_appointment, name='delete_appointment'),
]

ajax_urlpatterns = [
    path(f'{prefix}available_slots/', get_available_slots_ajax, name='available_slots_ajax'),
    path(f'{prefix}request_next_available_slot/<int:service_id>/', get_next_available_date_ajax,
         name='request_next_available_slot'),
    path(f'{prefix}request_staff_info/', get_non_working_days_ajax, name='get_non_working_days_ajax'),
    path(f'{prefix}fetch_service_list_for_staff/', fetch_service_list_for_staff, name='fetch_service_list_for_staff'),
    path(f'{prefix}fetch_staff_list/', fetch_staff_list, name='fetch_staff_list'),
    path(f'{prefix}update_appt_min_info/', update_appt_min_info, name="update_appt_min_info"),
    path(f'{prefix}update_appt_date_time/', update_appt_date_time, name="update_appt_date_time"),
    path(f'{prefix}validate_appointment_date/', validate_appointment_date, name="validate_appointment_date"),
    # delete appointment ajax
    path(f'{prefix}delete_appointment/', delete_appointment_ajax, name="delete_appointment_ajax"),
    path(f'{prefix}is_user_staff_admin/', is_user_staff_admin, name="is_user_staff_admin"),
]

urlpatterns = [
    # homepage
    path(f'{prefix}request/<int:service_id>/', appointment_request, name='appointment_request'),
    path(f'{prefix}request-submit/', appointment_request_submit, name='appointment_request_submit'),
    path(f'{prefix}appointment/<str:id_request>/reschedule/', prepare_reschedule_appointment,
         name='prepare_reschedule_appointment'),
    path(f'{prefix}appointment-reschedule-submit/', reschedule_appointment_submit, name='reschedule_appointment_submit'),
    path(f'{prefix}confirm-reschedule/<str:id_request>/', confirm_reschedule, name='confirm_reschedule'),
    path(f'{prefix}client-info/<int:appointment_request_id>/<str:id_request>/', appointment_client_information,
         name='appointment_client_information'),
    path(f'{prefix}verification-code/<int:appointment_request_id>/<str:id_request>/', enter_verification_code,
         name='enter_verification_code'),
    path(f'{prefix}verification-code/', email_change_verification_code, name='email_change_verification_code'),
    path(f'{prefix}thank-you/<int:appointment_id>/', default_thank_you, name='default_thank_you'),
    path(f'{prefix}verify/<uidb64>/<str:token>/', set_passwd, name='set_passwd'),
    path(f'{prefix}ajax/', include(ajax_urlpatterns)),
    path(f'{prefix}app-admin/', include(admin_urlpatterns)),
    path(f'{prefix}appointment_api/send_verification_code/', send_verification_code, name='send_verification_code'),
    path(f'{prefix}appointment_api/confirm_verification_code/', confirm_verification_code, name='confirm_verification_code'),
]
