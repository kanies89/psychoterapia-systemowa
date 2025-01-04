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