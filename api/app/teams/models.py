import uuid
from django.db import models
from django.contrib.auth.models import User

PERMISSIONS = {
    "MEMBER": {
        "level": 0,
        "alias": "Member"
    },
    "MECHANIC": {
        "level": 1,
        "alias": "Mechanic"
    },
    "ENGINEER": {
        "level": 2,
        "alias": "Engineer"
    },
    "DRIVER": {
        "level": 3,
        "alias": "Driver"
    },
    "CAR_CHIEF": {
        "level": 4,
        "alias": "Car Chief"
    },
    "CREW_CHIEF": {
        "level": 5,
        "alias": "Crew Chief"
    },
}

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mode = models.SmallIntegerField(default=0)
    theme = models.IntegerField(default=1)

class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.CharField(max_length=64, default='WB')
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)

class Member(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    permissions = models.IntegerField(default=0)

    class Meta:
        unique_together = ('team', 'user',)