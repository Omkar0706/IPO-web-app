from rest_framework import generics
from .models import IPO
from .serializers import IPOSerializer

class IPOListCreateAPIView(generics.ListCreateAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer

class IPODetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer