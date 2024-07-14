from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from teams.models import Team, Member, PERMISSIONS
from django.contrib.auth import authenticate, login
from django.db import IntegrityError

@method_decorator(csrf_protect, name='dispatch')
class LoginApiView(APIView):
    def put(self, request):
        data = request.data

        username = data['user']
        passkey = data['pass']

        print('here')
        if username and passkey:
            try:
                user = authenticate(request, username=username, password=passkey)
            except Exception as e:
                print(e)

        print('then here')
        if user is not None:
            login(request, user)
            return Response({"success": "true"}, status=status.HTTP_200_OK)
        
        return Response({"error": "Username Not Found/Credentials Incorrect."}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        data = request.data

        first_name = data['first']
        last_name = data['last']
        user = data['user']
        email = data['email']
        passkey = data['pass']

        print('first here')
        if (passkey != data['confirm']):
            return Response({"error": "Passwords must match."}, status=status.HTTP_400_BAD_REQUEST)

        print('next here')
        try:
            user = User.objects.create_user(username=user, password=passkey, email=email)
        except Exception as e:
            print(e)
            return Response({"error": "Username or Email already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if user is not None:
            try:
                login(request, user)
            except Exception as e:
                print(e)
                return
        else: 
            return Response({"error": "Fatal Error. Please Try Again."}, status=status.HTTP_400_BAD_REQUEST)

        print('after that here')
        user.first_name = first_name
        user.last_name = last_name

        user.save()

        print('gets here')
        user = authenticate(request, username=user, password=passkey)

        default_team = Team(name='Your Team', description='This is your default team.', owner=user.username)
        default_team.save()
        print('finally here')

        team_member = Member(user=user, team=default_team, permissions=PERMISSIONS["CREW_CHIEF"]["level"])
        team_member.save()

        print('lastly here')
        
        return Response({"success": "true"}, status=status.HTTP_200_OK)
        

@method_decorator(login_required(login_url='/entry/'), name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class TestApiView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return HttpResponse({"success": True}, status=status.HTTP_200_OK)