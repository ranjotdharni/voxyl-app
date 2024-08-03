from rest_framework import serializers
from .models import Project, Stride, Step

# !!!!REMEMBER THIS!!!!
#
# The client-side Project comparison function expects everything to be in a specific order!!!!!!!!!

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = [
            'id',
            'title',
            'points',
            'deadline',
            'description',
            'status'
        ]

class StrideSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True)

    class Meta:
        model = Stride
        fields = [
            'id',
            'title',
            'steps'
        ]

class ProjectSerializer(serializers.ModelSerializer):
    strides = StrideSerializer(many=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'strides'
        ]