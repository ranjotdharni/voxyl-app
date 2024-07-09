from django.urls import path
from . import views

app_name = 'teams'

urlpatterns = [
    path('create/', views.TeamsCreate.as_view(), name='create'),
    path('add/query/', views.TeamsAdd.as_view(), name='search'),
    path('view/', views.TeamsView.as_view(), name='view')
]