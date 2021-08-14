from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import *
from api.room.serializers import *
from api.serializers import FacultySerializer, ClassSerializer

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        # return ' '.join(data.values_list('name', flat=True)) # you change the representation style here.
        return data.values_list('name', flat=True)

class ProfileInListSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    my_class = ClassSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'avatar',
            'gender',
            'phone',
            'public_id',
            'faculty',
            'my_class'
        ]

class RoomSerializer(serializers.ModelSerializer):
    typeroom = TypeRoomSerializer(required=False)
    area = AreaSerializer(required=False)

    class Meta:
        model = Room
        fields = ['id', 'name', 'number_now', 'typeroom', 'area', 'status'] 

class ProfileSinhVienSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    my_class = ClassSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'birthday',
            'address',
            'identify_card',
            'gender',
            'phone',
            'created_at',
            'faculty',
            'my_class',
            # 'position',
            # 'area',
        ]
class SinhVienListSerializer(serializers.ModelSerializer):
    profile = ProfileInListSerializer(source='user_profile')
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
        ]


class ContractRegistationSerializer(serializers.ModelSerializer):
    # profile = ProfileSinhVienSerializer()
    room = RoomSerializer()
    class Meta:
        model = Contract
        fields = [
            'public_id',
            'room', 
            # 'start_at', 
            # 'end_at', 
            'payment_method', 
            'created_at',
            # 'profile',
            'is_expired',
        ] 