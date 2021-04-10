from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        return data and data.values_list('name', flat=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email'] 

class TypeRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeRoom
        fields = ['id', 'name', 'price', 'number_max', 'slug'] 


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

class RegisterRoomSerializer(serializers.ModelSerializer):
    # lesson_category = LessonCategorySerializer(source='lesson_category_id', required=False)
    # created_by = UserSerializer(source='user_id', required=False)
    # students_of_coach = serializers.IntegerField(required=False)
    # slug = serializers.CharField(required=False)
    # subtitle = serializers.CharField(required=False)
    # title = serializers.CharField(required=True)
    # is_display = serializers.BooleanField(required=False)
    # lesson_with_lessons_of_student = LessonsOfStudentField(queryset=LessonsOfStudent.objects.all(), many=True, required=False)
    # tags = StringListField(required=False)
    class Meta:
        model = Contract
        fields = ['id', 'room', 'profile', 'start_at', 'end_at', 'body', 'slug', 'tags', 'is_display', 'created_at', 'updated_at', 'published_at', 'created_by', 'students_of_coach', 'lesson_with_lessons_of_student'] 

    # Get current user login
    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            current_user = self._current_user()
            model = Lesson.objects.create(
                user_id=current_user,
                lesson_category_id=validated_data['lesson_category_id'],
                title=validated_data['title'],
                # subtitle=validated_data['subtitle'],
                # slug=validated_data['slug'],
                body=validated_data['body'],
                is_display=validated_data['is_display'],
                published_at=validated_data['published_at'],
            )

            model.tags.add(*validated_data['tags'])
            model.save()
            
            if 'students_of_coach' in validated_data:
                students_of_coach = validated_data['students_of_coach']
                try:
                    # check relation member and coach
                    studentOfCoach = StudentsOfCoach.objects.get(pk=students_of_coach, coach=current_user)
                    # add lesson of coach to member
                    lessonOfStudent = LessonsOfStudent.objects.create(
                        students_of_coach=studentOfCoach,
                        lesson=model
                    )
                except :
                    pass
            
            return model
        except:
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")

