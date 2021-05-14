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

    def create(self, validated_data):
        try:
            current_user = self._current_user()
            shift = Shift.objects.get(pk=validated_data['shift'])
            staff = User.objects.get(pk=validated_data['staff'])
            # payment_method = PaymentMethod.objects.get(pk=validated_data['payment_method'])

            model = DailySchedule.objects.create(
                public_id=shortuuid.uuid(),
                created_by=current_user,
                week=validated_data['week'],
                year=validated_data['year'],
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
        if 'week' not in data:
            raise serializers.ValidationError({'week' : required_message})
        if 'year' not in data:
            raise serializers.ValidationError({'year' : required_message})
        if 'title' not in data:
            raise serializers.ValidationError({'title' : required_message})
        if 'shift' not in data:
            raise serializers.ValidationError({'shift' : required_message})
        if 'staff' not in data:
            raise serializers.ValidationError({'staff' : required_message})

        week=data['week']
        year=data['year']
        shift=data['shift']
        check = DailySchedule.objects.filter(week=week, year=year, shift=shift)
        if len(check) != 0:
            raise serializers.ValidationError({'Exist':'This shift has been scheduled!'})
        
        if 'public_id' not in data:
            raise serializers.ValidationError({'publid_id' : required_message})
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
    
    def update(self, validated_data, instance):
        try:
            current_user = self._current_user()
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


