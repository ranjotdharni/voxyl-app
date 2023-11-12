from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class LoginApiView(APIView):
    throttle_classes = [UserRateThrottle, AnonRateThrottle]
    
    def post(self, request):
        headers = request.headers
        print("Headers: ", headers, "\n")

        data = request.data
        print("Body Data: ", data, "\n")

        return Response({"message": "successful request!"}, status=status.HTTP_200_OK)
