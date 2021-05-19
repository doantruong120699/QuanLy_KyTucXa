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
required_message = 'This Field is required!'

class NotificationListSerializer(serializers.ModelSerializer):
    public_id = serializers.CharField(required=False)
    title = serializers.CharField(required=True)
    content = serializers.CharField(required=True)
    is_display = serializers.BooleanField(required=False)

    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)
    class Meta:
        model = Notification
        fields = [
            'public_id',
            'title',
            'content',
            'is_display',
            'last_update',
            'created_at',
            'created_by',
            'updated_by',
        ]

    # Get current user login

    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            current_user = self._current_user()
            model = Notification.objects.create(
                public_id=shortuuid.uuid(),
                title=validated_data['title'],
                content=validated_data['content'],
                created_by=current_user
            )
            is_display = validated_data['is_display']
            if is_display:
                model.is_display = is_display
            model.save()
            return True
        except:
            pass
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.is_display = validated_data.get('is_display', instance.is_display)
            print(current_user)
            instance.updated_by = current_user
            instance.save()
            return True
        except Exception as e:
            print(e)
            return False

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

class DailyScheduleListSerializer(serializers.Serializer):
    week = serializers.IntegerField(required=False)
    year = serializers.IntegerField(required=False)
    schedule = serializers.ListField(required=True)    

    def validate(self, data):
        """
        validate data
        """
        if 'week' not in data:
            raise serializers.ValidationError({'week' : required_message})
        return data
    
class DailyScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySchedule
        fields = [ "public_id", "created_by", "updated_by", "week", "year", "title", "content", "shift", "staff"]

    # Get current user login
    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, user, validated_data, week, year=None):
        try:
            shift = Shift.objects.get(pk=validated_data['shift'])
            staff = User.objects.get(pk=validated_data['staff'])
            
            model = DailySchedule.objects.create(
                public_id=shortuuid.uuid(),
                created_by=user,
                week=week,
                year=year,
                title=validated_data['title'],
                content=validated_data['content'],
                shift=shift,
                staff=staff,
            )
            return True
        except Exception as e:
            print(e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")
    
    def validate(self, data):
        """
        validate data
        """
        if 'title' not in data:
            raise serializers.ValidationError({'title' : required_message})
        if 'shift' not in data:
            raise serializers.ValidationError({'shift' : required_message})
        if 'staff' not in data:
            raise serializers.ValidationError({'staff' : required_message})    
        return data

class DailyScheduleUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailySchedule
        fields = [ "public_id", "staff"]

    # Get current user login
    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False
    
    def update(self, user, validated_data, instance):
        try:
            staff = User.objects.get(pk=validated_data['staff'])    
            instance.updated_by = current_user
            instance.staff = staff
            instance.save()
        except Exception as e:
            print(e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")

    def validate(self, data):
        """
        validate data
        """
        if 'staff' not in data:
            raise serializers.ValidationError({'staff' : required_message})
        return data

class UsedRoomInAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'name', 'slug'] 
