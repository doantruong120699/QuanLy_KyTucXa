from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer
from datetime import date
from datetime import datetime
from django.db.models import Q
from django.conf import settings
from .utils import *

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        return data and data.values_list('name', flat=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email'] 

class TypeRoomSerializer(serializers.ModelSerializer):
    name_gender = serializers.ReadOnlyField(source="get_gender_display")

    class Meta:
        model = TypeRoom
        fields = [
            'id', 
            'name', 
            'price', 
            'number_max', 
            'slug',
            'gender',
            'name_gender'
        ] 
        
class SchoolYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolYear
        fields = ['id', 'year_start', 'year_end'] 

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
            # 'start_at', 
            # 'end_at', 
            'semester',
            'school_year',
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
            # 'start_at', 
            # 'end_at', 
            'semester',
            'school_year',
            'payment_method', 
            'is_cover_room'
        ] 
        extra_kwargs = {
            'room': {'required': True},
            'payment_method': {'required': True},
            'semester': {'required': True},
            'school_year': {'required': True},
        }

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
            school_year = SchoolYear.objects.get(pk=validated_data['school_year'])
            model = Contract.objects.create(
                room=room,
                profile=current_user.user_profile,
                created_by=current_user,
                # start_at=validated_data['start_at'],
                # end_at=validated_data['end_at'],
                payment_method=payment_method,
                semester=validated_data['semester'],
                school_year=school_year,
            )
            
            # start_at=validated_data['start_at']
            # end_at=validated_data['end_at']
            # start_at = datetime.fromisoformat(start_at)
            # end_at = datetime.fromisoformat(end_at)
            semester = str(validated_data['semester'])
            month = settings.NUMBER_MONTH[semester]
            model.price = month*room.typeroom.price
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
        stage = getStageNow(semester=data['semester'], school_year=data['school_year'])
        
        room = data['room']
        if room.number_now == room.typeroom.number_max:
            raise serializers.ValidationError({'room':'Phòng đã đầy!'})
        
        current_user = self._current_user()
        check_contract = Contract.objects.filter(profile=current_user.user_profile).filter(Q(is_expired=None) | Q(is_expired=False), is_cover_room=False)
        if len(check_contract) != 0:
            raise serializers.ValidationError({'registered':'Bạn đã đăng ký phòng!'})
            # return False
        return data
    
class ContractCoverRoomRegistationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = [
            'public_id',
            'room', 
            # 'start_at', 
            # 'end_at', 
            'semester',
            'school_year',
            'payment_method', 
            'number_registration',
            'is_cover_room'
        ] 
        extra_kwargs = {
            'room': {'required': True},
            'payment_method': {'required': True},
            'semester': {'required': True},
            'school_year': {'required': True}
        }

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
            school_year = SchoolYear.objects.get(pk=validated_data['school_year'])
            model = Contract.objects.create(
                room=room,
                profile=current_user.user_profile,
                created_by=current_user,
                payment_method=payment_method,
                semester=validated_data['semester'],
                school_year=school_year,
                # number_registration=validated_data['number_registration'],
                is_cover_room=True
            )
            model.number_registration = model.room.typeroom.number_max - model.room.number_now
            model.save()
            print("Model: ", model)
            semester = str(validated_data['semester'])
            month = settings.NUMBER_MONTH[semester]
            model.price = month*model.number_registration*room.typeroom.price
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
        current_user = self._current_user()
        stage = getStageNow(semester=data['semester'], school_year=data['school_year'])
        
        room = data['room']
        if room.number_now == room.typeroom.number_max:
            raise serializers.ValidationError({'room':'Phòng đã đầy!!'})
        
        check_room = Contract.objects.filter(profile=current_user.user_profile, semester=data['semester'], school_year=data['school_year'], is_cover_room=False).exclude(room=room)
        print(check_room)
        if len(check_room) > 0:
            raise serializers.ValidationError({'registered':'Bạn không được đăng ký bao phòng này!'})
        
        check_contract = Contract.objects.filter(profile=current_user.user_profile).filter(Q(is_expired=None) | Q(is_expired=False), is_cover_room=True)
        if len(check_contract) != 0:
            raise serializers.ValidationError({'registered':'Bạn đã đăng ký bao phòng này!'})
            # return False
        return data
    
    
    
    
    
    
    
    