from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import *
from api.serializers import FacultySerializer

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        # return ' '.join(data.values_list('name', flat=True)) # you change the representation style here.
        return data.values_list('name', flat=True)

class ProfileInListSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'gender',
            'phone',
            'public_id',
            'faculty',
        ]

class SinhVienListSerializer(serializers.ModelSerializer):
    profile = ProfileInListSerializer()
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
        ]
