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
        
        teams = Team.objects.all().filter(owner=request.user.username)
        members = []
        memberData = []

        for team in teams:
            instance = team.members.all()
            members.append(serializers.serialize('json', instance))

        for i in range(len(members)):
            memberData.append(json.loads(members[i]))

        teams = serializers.serialize('json', teams)
        data = json.loads(teams)
        res = {"crew": [], "members": []}

        for x in range(len(data)):
            userItems = []
            resItem = {
                "id": None,
                "name": None,
                "about": None
            }

            resItem["id"] = data[x]['pk']
            resItem["name"] = data[x]['fields']['name']
            resItem["about"] = data[x]['fields']['description']
            res["crew"].append(resItem)

            for y in range(len(memberData[x])):
                userItem = {
                    "id": None,
                    "username": None,
                    "first": None,
                    "last": None,
                    "email": None
                }

                userItem["id"] = memberData[x][y]['pk']
                userItem["username"] = memberData[x][y]['fields']['username']
                userItem["first"] = memberData[x][y]['fields']['first_name']
                userItem["last"] = memberData[x][y]['fields']['last_name']
                userItem["email"] = memberData[x][y]['fields']['email']
                userItems.append(userItem)
                
            res["members"].append(userItems)

        return Response(res, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data

        if not request.user.is_authenticated:
            return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)
        
        message = 'Crew Members Added'
        rawAddData = data['addData']
        addData = json.loads(rawAddData)
        team_id = addData['team']
        add_list = json.loads(addData['list'])

        team = None

        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({"error": "Team Not Found"}, status=status.HTTP_400_BAD_REQUEST)

        for item in add_list:
            try:
                user = User.objects.get(username=item['id'])
                team.members.add(user)
                team.save()
            except Exception as e:
                message = 'Some Users not found'

            

        return Response({"success": "true", "message": message}, status=status.HTTP_200_OK)



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
        team.members.add(request.user)
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
            return Response({"error": "Unauthorized"}, status=status.HTTP_400_BAD_REQUEST)

        team_id = data['team']
        search_query = data['search']

        try:
            current_team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({"error": "Team Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        users = serializers.serialize('json', User.objects.all().filter(
            Q(username__contains=search_query) | 
            Q(first_name__contains=search_query) | 
            Q(last_name__contains=search_query) | 
            Q(email__contains=search_query)
        ).exclude(username=request.user.username).exclude(username__in=current_team.members.values_list('username', flat=True)))

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




