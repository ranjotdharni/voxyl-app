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
from django.db.models import Q
from teams.models import Team
from django.contrib.auth import authenticate, login
from django.db import IntegrityError
from django.core import serializers
import json

@method_decorator(login_required(login_url='/entry/'), name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class TeamsView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)
        
        teams = serializers.serialize('json', Team.objects.all().filter(owner=request.user.username))
        data = json.loads(teams)
        res = []
        for item in data:
            resItem = {
                "id": None,
                "name": None,
                "email": None
            }
            resItem["id"] = item['pk']
            resItem["name"] = item['fields']['name']
            res.append(resItem)

        return Response(res, status=status.HTTP_200_OK)



@method_decorator(login_required(login_url='/entry/'), name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class TeamsCreate(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"error": "405 Method Not Allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request):
        data = request.data

        if not request.user.is_authenticated:
            return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)

        team_name = data['name']
        team_desc = data['desc']
        team_owner = request.user.username

        team = Team(name=team_name, description=team_desc, owner=team_owner)
        team.save()

        return Response({"success": "true"}, status=status.HTTP_200_OK)
    
@method_decorator(login_required(login_url='/entry/'), name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class TeamsAdd(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"error": "405 Method Not Allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def put(self, request):
        data = request.data

        if not request.user.is_authenticated:
            return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)

        search_query = data['search']
        users = serializers.serialize('json', User.objects.all().filter(Q(username__contains=search_query) | Q(first_name__contains=search_query) | Q(last_name__contains=search_query) | Q(email__contains=search_query)))
        data = json.loads(users)
        res = []
        for item in data:
            resItem = {
                "id": None,
                "name": None,
                "email": None
            }
            resItem["id"] = item['fields']['username']
            resItem["name"] = item['fields']['first_name'] + ' ' + item['fields']['last_name']
            resItem["email"] = item['fields']['email']
            res.append(resItem)

        return Response(res, status=status.HTTP_200_OK)