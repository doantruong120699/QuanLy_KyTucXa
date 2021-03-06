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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email'] 

class TypeRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeRoom
        fields = ['id', 'name', 'price', 'number_max', 'slug'] 

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'name', 'bank_number'] 

class RoomListSerializer(serializers.ModelSerializer):
    typeroom = TypeRoomSerializer(required=False)
    area = AreaSerializer(required=False)

    class Meta:
        model = Room
        fields = ['id', 'name', 'slug', 'number_now', 'typeroom', 'area', 'status', 'created_at', 'last_update'] 

class RoomListByAreaSerializer(serializers.ModelSerializer):
    typeroom = TypeRoomSerializer(required=False)
    class Meta:
        model = Room
        fields = ['id', 'name', 'slug', 'number_now', 'typeroom', 'status', 'created_at', 'last_update'] 

class RoomSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(required=False)
    name = serializers.CharField(required=True)
    slug = serializers.CharField(required=False)
    number_now = serializers.CharField(required=True)
    # typeroom = TypeRoomSerializer(required=True)
    area = AreaSerializer(required=True)
    typeroom = TypeRoomSerializer(required=False)
    STATUS = Choices(
        ('A', _('Available')),
        ('F', _('Full')),
        ('UA', _('Unavailable')),
    )
    status = serializers.ChoiceField(choices=STATUS, required=True)

    class Meta:
        model = Room
        fields = ['id', 'name', 'slug', 'number_now', 'typeroom', 'area', 'status', 'created_at', 'last_update', 'created_by'] 

    # Get current user login
    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            current_user = self._current_user()
            model = Room.objects.create(
                name=validated_data['name'],
                number_now=validated_data['number_now'],
                typeroom=validated_data['typeroom'],
                area=validated_data['area'],
                status=validated_data['status'],
                created_at=validated_data['created_at'],
                last_update=validated_data['last_update'],
                created_by=current_user,
            )
            model.save()
            return model
        except:
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")

    # def update(self, instance, validated_data):
    #     instance.lesson_category_id = validated_data.get('lesson_category_id', instance.lesson_category_id)
    #     instance.title = validated_data.get('title', instance.title)
    #     # instance.subtitle = validated_data.get('subtitle', instance.subtitle)
    #     # instance.slug = validated_data.get('slug', instance.slug)
    #     instance.body = validated_data.get('body', instance.body)
    #     instance.is_display = validated_data.get('is_display', instance.is_display)
    #     instance.published_at = validated_data.get('published_at', instance.published_at)
    #     instance.tags.add(*validated_data['tags'])
    #     instance.save()
    #     if 'students_of_coach' in validated_data:
    #         current_user = self._current_user()
    #         students_of_coach = validated_data['students_of_coach']
    #         try:
    #             # check relation member and coach
    #             studentOfCoach = StudentsOfCoach.objects.get(pk=students_of_coach, coach=current_user)

    #             # delete old LessonsOfStudent
    #             try:
    #                 oldLessonOfStudent = LessonsOfStudent.objects.filter(lesson=instance).delete()
    #             except:
    #                 pass
    #             # add new LessonsOfStudent
    #             lessonOfStudent = LessonsOfStudent.objects.create(
    #                 students_of_coach=studentOfCoach,
    #                 lesson=instance
    #             )
                
    #         except :
    #             pass
    #     return instance

class ContractSerializer(serializers.ModelSerializer):
    room = RoomListSerializer()
    payment_method = PaymentMethodSerializer()
    class Meta:
        model = Contract
        fields = [
            'public_id',
            'room', 
            'profile', 
            'start_at', 
            'end_at', 
            'payment_method', 
            'is_expired',
        ] 

    # Get current user login
    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

class ContractRegistationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = [
            'public_id',
            'room', 
            'start_at', 
            'end_at', 
            'payment_method', 
            'is_expired',
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
            room = Room.objects.get(pk=validated_data['room'])
            payment_method = PaymentMethod.objects.get(pk=validated_data['payment_method'])
            model = Contract.objects.create(
                room=room,
                profile=current_user.user_profile,
                start_at=validated_data['start_at'],
                end_at=validated_data['end_at'],
                payment_method=payment_method,
            )
            
            start_at=validated_data['start_at']
            end_at=validated_data['end_at']
            start_at = datetime.fromisoformat(start_at)
            end_at = datetime.fromisoformat(end_at)
            
            time_rentail = int((end_at - start_at).days)
            model.price = (time_rentail/30)*room.typeroom.price
            model.created_by = current_user
            model.save()
            return True
        except Exception as e:
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")

    def validate(self, data):
        """
        Check that start is before finish.
        """
        if 'room' not in data:
            raise serializers.ValidationError({'room':'This Field is required'})
            # return False
        if 'start_at' not in data:
            raise serializers.ValidationError({'start_at':'This Field is required'})
            # return False
        if 'end_at' not in data:
            raise serializers.ValidationError({'end_at':'This Field is required'})
            # return False
        if 'payment_method' not in data:
            raise serializers.ValidationError({'payment_method':'This Field is required'})
            # return False

        start_at=data['start_at']
        end_at=data['end_at']
            
        if start_at >= end_at:
            raise serializers.ValidationError({'end_at':'Time end must be after time start!'})
            # return False
        
        current_user = self._current_user()
        check_contract = Contract.objects.filter(profile=current_user.user_profile, is_accepted=None)
        if len(check_contract) != 0:
            raise serializers.ValidationError({'registered':'You signed up for another room!'})
            # return False
        return data