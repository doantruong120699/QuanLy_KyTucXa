from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import *
from api.serializers import PositionSerializer, AreaSerializer

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        # return ' '.join(data.values_list('name', flat=True)) # you change the representation style here.
        return data.values_list('name', flat=True)

class ProfileInListSerializer(serializers.ModelSerializer):
    position = PositionSerializer(required=False)
    area = AreaSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'gender',
            'phone',
            'public_id',
            'position',
            'area'
        ]

class ProfileNhanVienSerializer(serializers.ModelSerializer):
    # faculty = FacultySerializer(required=False)
    position = PositionSerializer(required=False)
    area = AreaSerializer(required=False)
    # my_class = ClassSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'birthday',
            'address',
            'identify_card',
            'gender',
            'phone',
            'created_at',
            # 'faculty',
            # 'my_class',
            'position',
            'area',
        ]

class NhanVienListSerializer(serializers.ModelSerializer):
    profile = ProfileInListSerializer(source='user_profile')
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
        ]

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = [ "id", "name", "weekdays", "start_at", "end_at", "slug"]

class NhanVienScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
        ]

class DailyScheduleListSerializer(serializers.ModelSerializer):
    staff = NhanVienScheduleSerializer()
    shift = ShiftSerializer()
    class Meta:
        model = DailySchedule
        fields = [ "public_id", "week", "year", "title", "content", "shift", "staff"]

class DailyScheduleDetailSerializer(serializers.ModelSerializer):
    shift = ShiftSerializer()
    staff = NhanVienListSerializer()
    class Meta:
        model = DailySchedule
        fields = [ "public_id", "created_by", "created_at", "week", "year", "title", "content", "shift", "staff"]






