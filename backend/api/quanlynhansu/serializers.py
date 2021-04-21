from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer
from datetime import date
from datetime import datetime

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        return data and data.values_list('name', flat=True)

# class ProfileInListSerializer(serializers.ModelSerializer):
#     faculty = FacultySerializer(required=False)
#     my_class = ClassSerializer(required=False)
#     class Meta:
#         model = Profile
#         fields = [
#             'gender',
#             'phone',
#             'public_id',
#             'faculty',
#             'my_class',
#         ]

# class ProfileSinhVienSerializer(serializers.ModelSerializer):
#     faculty = FacultySerializer(required=False)
#     my_class = ClassSerializer(required=False)
#     class Meta:
#         model = Profile
#         fields = [
#             'birthday',
#             'address',
#             'identify_card',
#             'gender',
#             'phone',
#             'created_at',
#             'faculty',
#             'my_class',
#             # 'position',
#             # 'area',
#         ]
# class SinhVienListSerializer(serializers.ModelSerializer):
#     profile = ProfileInListSerializer(source='user_profile')
#     class Meta:
#         model = User
#         fields = [
#             'username',
#             'email',
#             'first_name',
#             'last_name',
#             'profile',
#         ]




