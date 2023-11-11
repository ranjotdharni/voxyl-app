from django.http import HttpResponse
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class LoginApiView(APIView):
    throttle_classes = [UserRateThrottle, AnonRateThrottle]
    
    def post(self, request):
        return HttpResponse([{"message": "successful request!"}])