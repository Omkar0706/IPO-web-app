# create_superuser.py
from django.contrib.auth.models import User

def run():
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'adminpass')
        print("Superuser created")
    else:
        print("Superuser already exists")