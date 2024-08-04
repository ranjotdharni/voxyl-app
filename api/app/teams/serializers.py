from rest_framework import serializers
from django.contrib.auth.models import User

class BasicUserSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='username')
    name = serializers.SerializerMethodField()

    def get_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'

    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email'
        ]