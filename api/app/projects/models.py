import uuid
from django.db import models
from teams.models import Team, Member

# !!!!REMEMBER THIS!!!!
#
# The client-side Project comparison function expects everything to be in a specific order!!!!!!!!!

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, default=None)
    members = models.ManyToManyField(Member)
    title = models.CharField(max_length=64)

class Stride(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, related_name='strides', on_delete=models.CASCADE)
    title = models.CharField(max_length=64)

class Step(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    stride = models.ForeignKey(Stride, related_name='steps', on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    points = models.IntegerField(default=1)
    deadline = models.DateTimeField()
    description = models.CharField(max_length=256)
    status = models.CharField(max_length=32)
