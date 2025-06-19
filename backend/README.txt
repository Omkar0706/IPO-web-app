📦 IPO Web App - Backend Setup Instructions

1. Navigate to the backend directory:
   cd backend

2. Create virtual environment:
   python -m venv venv

3. Activate virtual environment:
   .\venv\Scripts\activate  (Windows)
   source venv/bin/activate    (Mac/Linux)

4. Install requirements:
   pip install -r requirements.txt

5. Apply migrations:
   python manage.py makemigrations
   python manage.py migrate

6. Run the server:
   python manage.py runserver

Visit: http://127.0.0.1:8000/api/ipo/ to test the API.
