from django.urls import path
from . import views

app_name = 'projects'

urlpatterns = [
    path('project/', views.Projects.as_view(), name='project'),
    path('describe/', views.Describe.as_view(), name='describe')
]