"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path, include, re_path
from auth import urls as auth_urls
from teams import urls as teams_urls
from projects import urls as projects_urls
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

class BaseView(TemplateView):
    template_name = 'index.html'

    #@method_decorator(login_required)
    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(BaseView, self).dispatch(*args, **kwargs)
    
class OpenView(TemplateView):
    template_name = 'index.html'
    
    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(BaseView, self).dispatch(*args, **kwargs)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/', include('rest_framework.urls')),
    path('v1/auth/', include(auth_urls)),
    path('v1/teams/', include(teams_urls)),
    path('v1/projects/', include(projects_urls)),
    re_path(r'.*', BaseView.as_view(template_name='index.html'), name='index'),
]
#TemplateView.as_view(template_name='dist/index.html')