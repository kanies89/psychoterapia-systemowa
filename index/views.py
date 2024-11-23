from django.http import JsonResponse
from .utils import fetch_instagram_embed
from django.conf import settings
from django.http import JsonResponse

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
