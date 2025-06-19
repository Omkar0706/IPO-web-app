from rest_framework import viewsets
from .models import IPO
from .serializers import IPOSerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("✅ Django Backend is Running")
class IPOViewSet(viewsets.ModelViewSet):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer
