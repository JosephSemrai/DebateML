    
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("upload", views.model_form_upload, name="upload")
]

