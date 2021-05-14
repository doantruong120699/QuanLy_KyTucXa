from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer
from datetime import date
from datetime import datetime
from api.room.serializers import *
from api.serializers import *

class NotificationListSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    class Meta:
        model = Notification
        fields = [
            'public_id',
            'created_by',
            'title',
            'content',
            'created_at',
            'last_update',
            'updated_by',
        ]

class ProfileSinhVienSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    my_class = ClassSerializer(required=False)
    user = UserSerializer()
    class Meta:
        model = Profile
        fields = [
            'user',
            'birthday',
            'address',
            'gender',
            'faculty',
            'my_class',
        ]

class RoomSerializer(serializers.ModelSerializer):
    typeroom = TypeRoomSerializer(required=False)
    area = AreaSerializer(required=False)

    class Meta:
        model = Room
        fields = ['id', 'name', 'number_now', 'typeroom', 'area', 'status'] 

class ContractRegistationSerializer(serializers.ModelSerializer):
    profile = ProfileSinhVienSerializer()
    room = RoomSerializer()
    class Meta:
        model = Contract
        fields = [
            'public_id',
            'room', 
            'start_at', 
            'end_at', 
            'payment_method', 
            'created_at',
            'profile'
        ] 

class ListRequestSerializer(serializers.Serializer):
    list_request = serializers.ListField()


