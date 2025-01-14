import sys
import json
import serwersms
import requests
import os

# Access the token
token = os.getenv("SMSSERVER_TOKEN")  # Replace TOKEN_NAME with your actual environment variable name

if token:
    print("Token retrieved successfully.")
else:
    print("Token not found. Ensure the environment variable is set.")

def fetch_instagram_embed(post_url, access_token):
    """
    Fetch the embed HTML for an Instagram post using the Instagram oEmbed API.

    Args:
        post_url (str): The URL of the Instagram post.
        access_token (str): The access token for the Instagram oEmbed API.

    Returns:
        str: The embed HTML if successful, None otherwise.
    """
    api_url = f"https://graph.facebook.com/v21.0/instagram_oembed"
    params = {
        "url": post_url,
        "access_token": access_token,
    }

    try:
        response = requests.get(api_url, params=params)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        data = response.json()
        return data.get("html")  # Return the embed HTML
    except requests.RequestException as e:
        # Log the error if needed
        print(f"Error fetching Instagram embed: {e}")
        return None

api = serwersms.SerwerSMS(token)

def sms_send(number):
        try:
            params = {
                'details': 'true'
            }
            text = 'TEST'
            # Assuming `api` is properly imported and configured
            response = api.message.send_sms(number, text, 'INFORMACJA', params)
            print(response)
            return response

        except Exception:
            error_message = str(sys.exc_info()[1])
            print(error_message)
            return error_message

def receive_messages(request):
    try:
        params = {
            'phone': number
        }

        # Assuming `api` is properly imported and configured
        response = api.message.received('ndi', params)  # Corrected method name
        return response

    except Exception:
        error_message = str(sys.exc_info()[1])
        return error_message

from google.cloud import recaptchaenterprise_v1
from google.cloud.recaptchaenterprise_v1 import Assessment

def create_assessment(
    project_id: str, recaptcha_key: str, token: str, recaptcha_action: str
) -> Assessment:
    """Utwórz ocenę, aby przeanalizować ryzyko związane z działaniem w interfejsie użytkownika.
    Args:
        project_id: Identyfikator Twojego projektu Google Cloud.
        recaptcha_key: Klucz reCAPTCHA powiązany z witryną lub aplikacją
        token: Wygenerowany token uzyskany od klienta.
        recaptcha_action: Nazwa działania odpowiadająca tokenowi.
    """

    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    # Ustaw właściwości zdarzenia do śledzenia.
    event = recaptchaenterprise_v1.Event()
    event.site_key = recaptcha_key
    event.token = token

    assessment = recaptchaenterprise_v1.Assessment()
    assessment.event = event

    project_name = f"projects/{project_id}"

    # Utwórz żądanie oceny.
    request = recaptchaenterprise_v1.CreateAssessmentRequest()
    request.assessment = assessment
    request.parent = project_name

    response = client.create_assessment(request)

    # Sprawdź, czy token jest prawidłowy.
    if not response.token_properties.valid:
        print(
            "The CreateAssessment call failed because the token was "
            + "invalid for the following reasons: "
            + str(response.token_properties.invalid_reason)
        )
        return

    # Sprawdź, czy oczekiwane działanie zostało wykonane.
    if response.token_properties.action != recaptcha_action:
        print(
            "The action attribute in your reCAPTCHA tag does"
            + "not match the action you are expecting to score"
        )
        return
    else:
        # Uzyskaj ocenę ryzyka i jego przyczyny.
        # Więcej informacji o interpretowaniu testu znajdziesz tutaj:
        # https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
        for reason in response.risk_analysis.reasons:
            print(reason)
        print(
            "The reCAPTCHA score for this token is: "
            + str(response.risk_analysis.score)
        )
        # Uzyskaj nazwę (id) oceny. Użyj jej, by dodać adnotację do oceny.
        assessment_name = client.parse_assessment_path(response.name).get("assessment")
        print(f"Assessment name: {assessment_name}")
    return response