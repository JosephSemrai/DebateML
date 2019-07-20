from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
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
            document = form.save()
            data = {'is_valid': True, 'name': document.document.name, 'url': document.document.url}
        else:
            data = {'is_valid': False}
        return JsonResponse(data)
    elif request.method == 'GET':
        form = DocumentForm()
        document_list = Document.objects.all()
    return render(request, 'uploader/model_form_upload.html', {
        'form': form,
        'documents': document_list,
    })