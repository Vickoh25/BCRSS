# BCRSS Backend - Windows Setup Guide

If you're experiencing issues installing dependencies on Windows, follow these steps:

## Common Issues & Solutions

### Issue 1: Pillow Installation Error on Python 3.14

**Error**: `KeyError: '__version__'` when installing Pillow 10.1.0

**Solution**: Use a newer version of Pillow that supports Python 3.14

### Issue 2: mysqlclient Installation Error

**Error**: `error: Microsoft Visual C++ 14.0 or greater is required`

**Solution**: Install using pre-built wheels:
```powershell
pip install mysqlclient --only-binary :all:
```

Alternatively, download pre-built wheels from: https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient

### Issue 3: Django Database Connection Error

**Error**: `mysqlclient 2.2.1 or newer is required`

**Solution**: Ensure you have mysqlclient (not PyMySQL) installed:
```powershell
pip uninstall PyMySQL
pip install mysqlclient --only-binary :all:
```

## Installation Steps for Windows

### 1. Prerequisites
- Python 3.10+ (recommended: Python 3.11 or 3.12)
- MySQL 5.7+ or MariaDB
- Git

### 2. Clone the Repository
```powershell
git clone https://github.com/Vickoh25/BCRSS.git
cd BCRSS
```

### 3. Create Virtual Environment
```powershell
python -m venv venv
venv\Scripts\activate
```

### 4. Upgrade pip
```powershell
python -m pip install --upgrade pip
```

### 5. Install Dependencies
```powershell
pip install -r requirements.txt
```

If you still encounter issues with Pillow, try:
```powershell
pip install --upgrade Pillow
```

Or install packages individually:
```powershell
pip install Django djangorestframework django-cors-headers python-dotenv cloudinary django-filter
pip install mysqlclient --only-binary :all:
pip install Pillow --upgrade
```

### 6. Configure Environment Variables
Create a `.env` file in the project root:
```
DEBUG=True
SECRET_KEY=your-secret-key-here

# Database Configuration
DB_NAME=bcrss_db
DB_USER=root
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=3306

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 7. Create MySQL Database
```sql
CREATE DATABASE bcrss_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 8. Run Migrations
```powershell
python manage.py makemigrations
python manage.py migrate
```

### 9. Create Superuser
```powershell
python manage.py createsuperuser
```

### 10. Run Development Server
```powershell
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

## Troubleshooting

### Issue: MySQL Connection Error
**Solution**: Ensure MySQL is running and credentials in `.env` are correct

### Issue: Port 8000 Already in Use
**Solution**: Run on a different port:
```powershell
python manage.py runserver 8001
```

### Issue: Module Not Found
**Solution**: Ensure virtual environment is activated:
```powershell
venv\Scripts\activate
```

### Issue: Django Migrations Error
**Solution**: Clear migrations and start fresh:
```powershell
python manage.py migrate --fake-initial
```

## Python Version Recommendation

For best compatibility, use **Python 3.11 or 3.12**:
- Download from: https://www.python.org/downloads/
- Avoid Python 3.14 if you encounter Pillow issues

## Additional Resources

- Django Documentation: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- MySQL Installation: https://dev.mysql.com/downloads/mysql/

## Support

If you encounter any issues, please:
1. Check that all prerequisites are installed
2. Ensure MySQL is running
3. Verify the `.env` file is correctly configured
4. Check the error message carefully for specific issues
