from django.urls import path
from .views import instagram_embed_api

urlpatterns = [
    path('api/instagram-embed/', instagram_embed_api, name='instagram_embed_api'),
]
