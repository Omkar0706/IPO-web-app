from django.urls import path
from .views import IPOListCreateAPIView, IPODetailAPIView

urlpatterns = [
    path('api/ipo/', IPOListCreateAPIView.as_view(), name='ipo-list'),
    path('api/ipo/<int:pk>/', IPODetailAPIView.as_view(), name='ipo-detail'),
]