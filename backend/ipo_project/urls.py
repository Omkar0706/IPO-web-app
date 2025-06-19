from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ipo_app.urls')),
    path('', lambda request: redirect('api/ipo/')),  # ✅ redirect root to /api/ipo/
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)