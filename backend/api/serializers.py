
from django.contrib.auth.models import User, Group, Permission
from django.core.validators import EmailValidator
from django.utils.crypto import get_random_string
from django.db.models import Q
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from .models import *
from django.contrib.auth.models import Group

# Authentication ================================================================

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('name',) 

class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True)
    class Meta:
        model = Group
        fields = ('name', 'permissions', )    

# API Login -> Create token
class MySimpleJWTSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Mac dinh la co id
        token = super().get_token(user)
        user_obj = User.objects.get(username=user)
        token['username'] = user_obj.username
        token['email'] = user_obj.first_name
        token['first_name'] = user_obj.first_name
        token['last_name'] = user_obj.last_name
        gr = []
        for g in user_obj.groups.all():
            gr.append(g.name)
        token['group'] = gr
        return token

    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get("password")
        }
        user_obj = User.objects.filter(email=attrs.get("username")).first(
        ) or User.objects.filter(username=attrs.get("username")).first()
        if user_obj:
            credentials['username'] = user_obj.username

        return super().validate(credentials)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MySimpleJWTSerializer

# API Change Password
class ChangePasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    old_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True) 

    password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
     
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)    

    class Meta:
        model = User
        fields = ['email', 'password', 'old_password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'old_password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'email': {'validators': [EmailValidator]},
        }

    def validate(self, data):
        if len(data['old_password']) < 5:
            raise serializers.ValidationError({'message': 'Password must be at least 5 characters.'}) 
        if len(data['password']) < 5:
            raise serializers.ValidationError({'message': 'Password must be at least 5 characters.'})
        return data    

    def old_password_validate(self):
        user = User.objects.get(email=self.validated_data['email'])
        if not user.check_password(self.validated_data['old_password']):
            return False
        return True  

    def confirm_password_validate(self):
        if (self.validated_data['password'] != self.validated_data['confirm_password']):
            return False
        return True     

    def update(self):
        user = User.objects.get(email=self.validated_data['email'])
        password = self.validated_data['password']  
        user.set_password(password)
        user.save()
        return user 


# API get profile user
class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = [ "id", "name"]

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = [ "id", "name"]

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = [ "id", "name"]
class ProfileSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    position = PositionSerializer(required=False)
    area = AreaSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'birthday',
            'address',
            'identify_card',
            'gender',
            'address',
            'created_at',
            'faculty',
            'position',
            'area',
        ]