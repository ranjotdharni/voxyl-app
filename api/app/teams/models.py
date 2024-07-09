import uuid
from django.db import models

# Create your models here.
class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.CharField(max_length=64, default='WB')
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)