import json
from datetime import datetime
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
from django.contrib.auth.models import User
from teams.models import Team, Member, PERMISSIONS
from .models import Project, Stride, Step
from .serializers import ProjectSerializer
from teams.serializers import BasicUserSerializer

dateformat = "%a, %d %b %Y %H:%M:%S %Z" # "%Y-%m-%dT%H:%M:%S.%fZ"

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

    def put(self, request):
        if not request.user.is_authenticated:
                return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data

        raw = data['update']
        rawJson = json.loads(raw)
        project = Project.objects.get(id=rawJson['projectId'])

        try:
            requester = Member.objects.get(team=project.team, user=request.user)
            if (not requester in project.members.all()) and (requester.permissions < PERMISSIONS['LEAD']['level']):
                return Response({"error": "Access Level Denied"}, status=status.HTTP_403_FORBIDDEN) 
        except Member.DoesNotExist:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        # update Project Title
        if ('projectTitle' in rawJson):
            project.title = rawJson['projectTitle']
            project.save()

        diff = rawJson['difference']
        
        # added Strides
        if len(diff['added']) != 0:
            for stride in diff['added']:
                s = Stride(project=project, title=stride['title'])
                s.save()
                for step in stride['steps']:
                    st = Step(stride=s, title=step['title'], points=step['points'], deadline=datetime.strptime(step['deadline'], dateformat), description=step['description'], status=step['status'])
                    st.save()
        
        # updated Strides
        if len(diff['updated']) != 0:
            for stride in diff['updated']:
                s = Stride.objects.get(id=stride['id'])
                if ('title' in stride):
                    s.title = stride['title']
                    s.save()
                # added steps
                for step in stride['added']:
                    st = Step(stride=s, title=step['title'], points=step['points'], deadline=datetime.strptime(step['deadline'], dateformat), description=step['description'], status=step['status'])
                    st.save()
                # updated steps
                for step in stride['updated']:
                    st = Step.objects.get(id=step['id'])
                    if ('title' in step):
                        st.title = step['title']
                    if ('points' in step):
                        st.points = step['points']
                    if ('deadline' in step):
                        st.deadline = datetime.strptime(step['deadline'], dateformat)
                    if ('description' in step):
                        st.description = step['description']
                    if ('status' in step):
                        st.status = step['status']
                    st.save()
                # dropped steps
                for step in stride['dropped']:
                    st = Step.objects.get(id=step)
                    st.delete()
        
        # dropped Strides
        if len(diff['dropped']) != 0:
            for stride in diff['dropped']:
                s = Stride.objects.get(id=stride)
                s.delete()

        return Response({"success": "true"}, status=status.HTTP_200_OK)
    
    def delete(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        project_id = data['project']
        project = Project.objects.get(id=project_id)
        team = project.team

        try:
            requester = Member.objects.get(team=team, user=request.user)
            if requester.permissions < PERMISSIONS['LEAD']['level']:
                return Response({"error": "Access Level Denied"}, status=status.HTTP_403_FORBIDDEN) 
        except Member.DoesNotExist:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
        project.delete()

        return Response({"success": "true", "redirect": '/project/launch'}, status=status.HTTP_200_OK) 
    
@method_decorator(login_required(login_url='/entry/'), name='dispatch')
@method_decorator(csrf_protect, name='dispatch')
class Describe(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_authenticated:
                return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)

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
    
    def put(self, request):
        if not request.user.is_authenticated:
                return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data
        project_id = data['project']
        project = Project.objects.get(id=project_id)
        team = project.team

        try:
            requester = Member.objects.get(team=team, user=request.user)
            if (not requester in project.members.all()) and (requester.permissions < PERMISSIONS['LEAD']['level']):
                return Response({"error": "Access Level Denied"}, status=status.HTTP_403_FORBIDDEN) 
        except Member.DoesNotExist:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
        all_team_members = Member.objects.filter(team=team)
        project_members = project.members.all()
        project_nonmembers = all_team_members.exclude(id__in=project_members.values_list('id', flat=True))
        users_in = JSONRenderer().render(BasicUserSerializer(User.objects.filter(member__in=project_members), many=True).data)
        users_not_in = JSONRenderer().render(BasicUserSerializer(User.objects.filter(member__in=project_nonmembers), many=True).data)

        return Response({"success": "true", "participants": users_in, "nonparticipants": users_not_in}, status=status.HTTP_200_OK)
    
    def patch(self, request):
        if not request.user.is_authenticated:
            return Response({"error": "Fatal Error."}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data
        project_id = data['project']
        project = Project.objects.get(id=project_id)
        team = project.team

        try:
            requester = Member.objects.get(team=team, user=request.user)
            if requester.permissions < PERMISSIONS['LEAD']['level']:
                return Response({"error": "Access Level Denied"}, status=status.HTTP_403_FORBIDDEN) 
        except Member.DoesNotExist:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        
        add = data['add']
        drop = data['drop']
        addData = json.loads(add)
        dropData = json.loads(drop)

        for user in addData:
            project.members.add(Member.objects.get(user=User.objects.get(username=user['id'])))
        
        for user in dropData:
            project.members.remove(Member.objects.get(user=User.objects.get(username=user['id'])))

        return Response({"success": "true"}, status=status.HTTP_200_OK)