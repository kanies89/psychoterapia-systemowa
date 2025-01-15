from django.utils.timezone import now

def server_time(request):
    return {"current_time": now()}
