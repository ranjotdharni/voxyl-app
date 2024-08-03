import json
from rest_framework.renderers import JSONRenderer
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from teams.models import Team, Member, PERMISSIONS
from .models import Project
from .serializers import ProjectSerializer

@method_decorator(login_required(login_url='/entry/'), name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class Projects(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        team_id = data['team']
        title = data['title']

        if not request.user.is_authenticated:
            return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)
        
        current_team = Team.objects.get(id=team_id)
        
        try:
            requester = Member.objects.get(team=current_team, user=request.user)
            if (requester.permissions < PERMISSIONS['LEAD']['level']):
                return Response({"error": "Access Level Denied"}, status=status.HTTP_403_FORBIDDEN)
        except Member.DoesNotExist:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
        project = Project(title=title, team=current_team)
        project.save()

        project.members.add(requester)
        project.save()

        return Response({"success": "true", "redirect": f'/project/{project.id}'}, status=status.HTTP_200_OK)
    
@method_decorator(login_required(login_url='/entry/'), name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class Describe(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        project_id = data['project']

        project = Project.objects.filter(id=project_id).prefetch_related('strides__steps')

        try:
            requester = Member.objects.get(team=project[0].team, user=request.user)
            if (not requester in project[0].members.all()) and (requester.permissions < PERMISSIONS['LEAD']['level']):
                return Response({"error": "Access Level Denied"}, status=status.HTTP_403_FORBIDDEN) 
        except Member.DoesNotExist:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        serial_data = ProjectSerializer(project, many=True)
        res = JSONRenderer().render(serial_data.data)

        return Response({"success": "true", "data": res}, status=status.HTTP_200_OK)

