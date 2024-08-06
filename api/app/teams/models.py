import uuid
from django.db import models
from django.contrib.auth.models import User

PERMISSIONS = {
    "MEMBER": {
        "level": 0,
        "alias": "Member"
    },
    "SENIOR": {
        "level": 1,
        "alias": "Senior Member"
    },
    "LEAD": {
        "level": 2,
        "alias": "Lead"
    },
    "MOD": {
        "level": 3,
        "alias": "Moderator"
    },
    "CAPTAIN": {
        "level": 4,
        "alias": "Captain"
    },
    "OWNER": {
        "level": 5,
        "alias": "Team Owner"
    },
}

# Create your models here.
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