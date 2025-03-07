import json
import requests
import logging
from datetime import datetime, timedelta
from collections import defaultdict

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from django.core.files.storage import FileSystemStorage

from .utils import fetch_instagram_embed
from .models import FAQ, UploadedImage

from appointment.models import Service, StaffMember
from appointment.utils.db_helpers import check_day_off_for_staff, is_working_day
from appointment.services import get_available_slots_for_staff


logger = logging.getLogger(__name__)

def get_services(request):
    try:
        services = Service.objects.all()
        services_data = [
            {
            "id": service.id,
            "name": service.name,
            "description": service.description,
            "duration": service.duration,
            "price": service.price,
            "currency": service.currency
            }
            for service in services
        ]
        return json_response(
            message="Successfully retrieved services",
            custom_data={"error": False, "services": services_data},
            success=True
        )
    except Exception as e:
        return json_response(message=str(e), custom_data={"error": True, "services": []}, success=False)

def json_response(message=None, custom_data=None, success=True, error_code=0):
    return JsonResponse({
        'message': message,
        'custom_data': custom_data,
        'success': success,
        'error_code': error_code
    })

def get_available_services(request):
    # Fetch available services
    services = Service.objects
    services_list = list(services.values('id', 'name', 'description', 'duration', 'price'))
    return JsonResponse(services_list, safe=False)

def get_staff_members(request, service_id):
    try:
        # Ensure service_id is an integer
        service_id = int(service_id)
        service = Service.objects.get(id=service_id)
        print(service)
        # Fetch staff members related to the given service ID
        staff_members = StaffMember.objects.all().filter(services_offered=service)
        print(staff_members)

        # Create staff data
        staff_data = [{"id": staff.id, "name": staff.get_staff_member_name()} for staff in staff_members]
        print(staff_data)
        # Return the staff data in JSON format
        return JsonResponse({"staff_members": staff_data}, safe=False)

    except ValueError:
        # Handle case where service_id cannot be converted to integer
        return JsonResponse({
            "message": "Invalid service ID format",
            "custom_data": {"error": True, "staff_members": []},
            "success": False
        })

    except StaffMember.DoesNotExist:
        # Handle case where no staff members are found for the service
        return JsonResponse({
            "message": "No staff members found for this service",
            "custom_data": {"error": True, "staff_members": []},
            "success": False
        })

    except Exception as e:
        # Handle general exceptions
        return JsonResponse({
            "message": str(e),
            "custom_data": {"error": True, "staff_members": []},
            "success": False
        })


def get_available_slots(request):
    selected_date = request.GET.get('selected_date')
    staff_member_id = request.GET.get('staff_member')

    if not selected_date or not staff_member_id:
        return JsonResponse({
            "message": "This field is required.",
            "custom_data": {"error": True, "available_slots": {}, "date_chosen": ""},
            "success": False
        })

    selected_date = datetime.strptime(selected_date, '%Y-%m-%d').date()
    staff_member = StaffMember.objects.filter(id=staff_member_id).first()

    if not staff_member:
        return JsonResponse({
            "message": "Invalid staff member.",
            "custom_data": {"error": True, "available_slots": {}, "date_chosen": ""},
            "success": False
        })

    # Check if the day is off
    days_off_exist = check_day_off_for_staff(staff_member=staff_member, date=selected_date)
    if days_off_exist:
        return JsonResponse({
            "message": "Day off. Please select another date!",
            "custom_data": {"error": True, "available_slots": {}, "date_chosen": str(selected_date)},
            "success": False
        })

    # Calculate the end date for the loop (14 days forward)
    today = datetime.now().date()
    end_date = today + timedelta(days=14)

    # Dictionary to store slots grouped by date
    available_slots_dict = defaultdict(list)

    for current_date in (today + timedelta(days=i) for i in range((end_date - today).days + 1)):
        if current_date.weekday() < 5:  # Only weekdays (Monday to Friday)
            weekday_num = current_date.weekday() + 1  # Monday = 1, Sunday = 7
            is_working_day_ = is_working_day(staff_member=staff_member, day=weekday_num)
            if is_working_day_:
                slots = get_available_slots_for_staff(current_date, staff_member)
                for slot in slots:
                    available_slots_dict[str(current_date)].append(slot.strftime('%H:%M'))


    if not available_slots_dict:
        return JsonResponse({
            "message": "No availability",
            "custom_data": {"error": True, "available_slots": {}, "date_chosen": str(selected_date)},
            "success": False
        })

    return JsonResponse({
        "message": "Successfully retrieved available slots",
        "custom_data": {
            "error": False,
            "available_slots": available_slots_dict,
            "date_chosen": str(selected_date)
        },
        "success": True
    })


ACCESS_TOKEN = "IGQWRNdGJaTE1BY2d0aUZAXUV9oVk9FdE5PbVhuc0F4SEtXUDZAOTjV3UDEyWldZAZAHVhV3JNMllkNHZAyd2xjeFhSSlpiR3N3YjVLUHI2VEh5RzFLME1DT1NLYUFJemZA6N3VOMjhETmRTQzJUVmJMNjJEVWx0WmplWGMZD"  # Replace with your valid access token


def instagram_embed_api(request):
    post_url = request.GET.get("post_url")  # Get the post URL from query params
    if not post_url:
        return JsonResponse({"error": "Post URL is required."}, status=400)

    embed_html = fetch_instagram_embed(post_url, ACCESS_TOKEN)

    if embed_html:
        return JsonResponse({"html": embed_html})
    else:
        return JsonResponse({"error": "Failed to fetch embed HTML."}, status=500)


def get_instagram_images(request):
    images = [
        "/media/instagram/image1.jpg",
        "/media/instagram/image2.jpg"
    ]  # Replace with your actual logic for fetching Instagram images

    # Make URLs absolute
    base_url = f"{request.scheme}://{request.get_host()}"
    absolute_urls = [f"{base_url}{image}" for image in images]

    return JsonResponse({"images": absolute_urls})

@csrf_exempt
def create_assessment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            recaptcha_response = data.get('g-recaptcha-response')

            if not recaptcha_response:
                return JsonResponse({'success': False, 'message': 'Missing reCAPTCHA token'}, status=400)

            verification_url = "https://www.google.com/recaptcha/api/siteverify"
            payload = {
                "secret": '6LePVqwqAAAAAFKrn3aoF_LfGEazhAv34owD54Mc',
                "response": recaptcha_response,
            }
            print(payload)
            verification_response = requests.post(verification_url, data=payload)
            print(verification_response)

            if verification_response.status_code != 200:
                return JsonResponse({'success': False, 'message': 'Failed to reach reCAPTCHA verification API'})

            verification_result = verification_response.json()

            if verification_result.get('success'):
                return JsonResponse({'success': True, 'message': 'reCAPTCHA verified successfully'})
            else:
                return JsonResponse({
                    'success': False,
                    'message': 'reCAPTCHA verification failed',
                    'error-codes': verification_result.get('error-codes', [])
                }, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON request'}, status=400)


@csrf_exempt  # Use CSRF exemption for simplicity in this example (consider using proper CSRF handling in production)
@login_required
def upload_image(request):
    if request.method == "POST" and request.FILES.get('image'):
        image = request.FILES['image']
        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        uploaded_image = UploadedImage.objects.create(image=filename)
        return JsonResponse({'message': 'Image uploaded successfully', 'image_url': uploaded_image.image.url})

    return JsonResponse({'message': 'No image provided or invalid request method'}, status=400)

def faq_list(request):
    faqs = FAQ.objects.all().order_by("-created_at")
    data = [{"id": faq.id, "title": faq.title, "content": faq.content} for faq in faqs]
    return JsonResponse(data, safe=False)

@csrf_exempt  # Disable CSRF for simplicity, only use in safe environments
@login_required
def add_faq(request):
    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        if title and content:
            FAQ.objects.create(title=title, content=content)
            return JsonResponse({"status": "success"})
        return JsonResponse({"status": "error", "message": "Missing fields"})
    return JsonResponse({"status": "invalid request"})

def check_login_status(request):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        return JsonResponse({"is_logged_in": True})
    else:
        return JsonResponse({"is_logged_in": False})

def list_images(request):
    images = UploadedImage.objects.all()
    image_urls = [image.image.url for image in images]
    return JsonResponse({'images': image_urls})

def server_time(request):
    return JsonResponse({"server_time": now().strftime("%Y-%m-%d %H:%M:%S")})

def get_service_duration(request):
    # Get the service_id from the request
    service_id = request.GET.get('service_id')
    if not service_id:
        return JsonResponse({'error': 'service_id parameter is required.'}, status=400)
    # Fetch the service from the database
    service = get_object_or_404(Service, id=service_id)
    # Return the duration as a JSON response
    return JsonResponse({'service_id': service.id, 'duration': str(service.duration)})

