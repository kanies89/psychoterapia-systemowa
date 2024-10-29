from django.urls import path
from .views import example_api

urlpatterns = [
    path('api/example/', example_api),
    # other paths...
]
