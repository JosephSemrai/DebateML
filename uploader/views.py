from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib import messages
from .forms import *
from .models import *

# Create your views here.
def index(request):
    print("reached")
    return render(request, "uploader/index.html")

def model_form_upload(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return render(request, "uploader/index.html")
    else:
        form = DocumentForm()
    return render(request, 'uploader/model_form_upload.html', {
        'form': form
    })