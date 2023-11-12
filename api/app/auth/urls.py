from django.urls import path
from . import views

app_name = 'auth'

urlpatterns = [
    path('login', views.LoginApiView.as_view(), name='test'),
]