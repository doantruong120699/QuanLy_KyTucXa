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
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import account_activation_token
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from datetime import date
# from .room.utils import *

# Authentication ==================================

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('name',) 

class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True)
    class Meta:
        model = Group
        fields = ('name', 'permissions', )    

def getStage():
    today = date.today()
    stage1 = Stage.objects.filter(stage1_started_at__lte = today, stage1_ended_at__gte = today)
    stage2 = Stage.objects.filter(stage2_started_at__lte = today, stage2_ended_at__gte = today)
    stage3 = Stage.objects.filter(stage3_started_at__lte = today, stage3_ended_at__gte = today)
    if len(stage1) > 0:
        return (1, stage1)
    elif len(stage2) > 0:
        return (2, stage2)
    elif len(stage3) > 0:
        return (3, stage3)
    else:
        return (-1, None)            
    

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
        
        per = []
        for p in user_obj.user_permissions.all():
            per.append(p.codename)
            
        if 'sinhvien_group' in gr:
            (stage, objects) = getStage()
            print((stage, objects))
            if stage != -1:
                obj = objects.first()
                # ==================
                semester = obj.semester
                school_year = obj.school_year
                
                # pre_school_year = school_year
                pre_semester = 0
                
                if semester == '1':
                    pre_semester = '3'
                    # pre_school_year = SchoolYear.objects.filter(year_end=school_year.year_start).first()
                    school_year = school_year.previous_year
                elif semester == '2':
                    pre_semester = '1'
                elif semester == '3':
                    pre_semester = '2'
                    
                pre_contract = Contract.objects.filter(
                    semester=pre_semester, 
                    school_year=school_year,
                    profile=user.user_profile,
                    is_accepted=True,
                    is_delete=False,
                )
                now_contract = Contract.objects.filter(
                    semester=obj.semester, 
                    school_year=obj.school_year,
                    profile=user.user_profile,
                    # is_accepted=True,
                    # is_delete=False,
                )
                print(school_year)
                if stage == 1 and len(pre_contract) > 0:
                    per.append('registration_stage_1')
                
                elif stage == 2 and len(now_contract) > 0:
                    per.append('registration_stage_2')
                
                elif stage == 3:
                    per.append('registration_stage_3')
                
                else:
                    per.append('not_registration_time')                           
            else:
                per.append('not_registration_time')
        # print(per)
        token['permission'] = per
        profile = Profile.objects.get(user=user_obj)
        profile.token = token
        profile.save()
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
    # print(serializer_class)

# API Change Password
class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True) 
    new_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)    
    class Meta:
        model = User
        fields = ['old_password','new_password', 'confirm_password']
        extra_kwargs = {
            'old_password': {'write_only': True},
            'new_password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }
    # Validate data
    def validate(self, data):
        if len(data['old_password']) < 5:
            raise serializers.ValidationError({'message': 'Password must be at least 5 characters.'}) 
        if len(data['new_password']) < 5:
            raise serializers.ValidationError({'message': 'Password must be at least 5 characters.'})
        return data    

    def old_password_validate(self, request):
        user = request.user
        if not user.check_password(self.validated_data['old_password']):
            return False
        return True  

    def confirm_password_validate(self):
        if (self.validated_data['new_password'] != self.validated_data['confirm_password']):
            return False
        return True     

    # Update data
    def update(self, request):
        user = User.objects.get(email=request.user.email)
        new_password = self.validated_data['new_password']  
        user.set_password(new_password)
        user.save()
        return user 

class ForgotPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['email']
        extra_kwargs = {
            'email': {'validators': [EmailValidator]},
        }

    def is_account_active(self):
        try:
            user = User.objects.get(
                email=self.validated_data['email'], is_active=True)
            return True
        except:
            return False

    def is_email_exist(self):
        try:
            user = User.objects.get(email=self.validated_data['email'])
            return True
        except:
            return False

    def send_mail(self, request):
        try:
            user = User.objects.get(email=self.validated_data['email'])
            forgot_password_token = account_activation_token.make_token(user)
            user.user_profile.forgot_password_token = forgot_password_token
            user.user_profile.save()

            current_site = get_current_site(request)
            email_body = {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': forgot_password_token,
            } 
            url_frontend = settings.FRONTEND_URL
            # Create link active
            # link = reverse('reset_password', kwargs={'uidb64': email_body['uid'], 'token': email_body['token']})
            # activate_url = 'http://'+current_site.domain+link
            activate_url = url_frontend  + '/' + email_body['uid'] + '/' +  email_body['token'] 
            # Create body of email
            subject = '[RESET YOUR PASSWORD] - DA NANG DORMITORY UNIVERSITY OF TECHNOLOGY'
            # message = f'Hi {user.username}, thank you for registering in geeksforgeeks.'
            time_expire = settings.PASSWORD_RESET_TIMEOUT/60
            message = render_to_string('api/forgot_password.html', {'activate_url': activate_url, 'time_expire':time_expire})  
            # email_from = settings.EMAIL_HOST_USER
            # recipient_list = [self.validated_data['email']]
            # send_mail( subject, message, email_from, recipient_list )
            
            # Create object email  
            send = EmailMessage('[RESET YOUR PASSWORD] - DA NANG DORMITORY UNIVERSITY OF TECHNOLOGY', message, from_email=settings.EMAIL_HOST_USER, to=[self.validated_data['email']])
            send.content_subtype = 'html'
            # Send email to user
            send.send()
            return activate_url, time_expire
        except Exception as e:
            print("Exception send mail: ", e)
            pass
        return "", ""

class ResetPasswordSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(
    #     style={'input_type': 'password'}, write_only=True)
    new_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    confirm_password = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'new_password', 'confirm_password']
        extra_kwargs = {
            'new_password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'email': {'validators': [EmailValidator]},
        }

    def validate(self, data):
        if len(data['new_password']) < 5:
            raise serializers.ValidationError(
                {'message': 'Password must be at least 5 characters.'})
        return data

    def confirm_password_validate(self):
        if (self.validated_data['new_password'] != self.validated_data['confirm_password']):
            return False
        return True 

    def reset_password(self, email):
        try:
            user = User.objects.get(email=email)
            new_password = self.validated_data['new_password']
            user.set_password(new_password)
            user.save()
            return True
        except:
            return False


# =============== API Account ====================

# API get profile user
class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = [ "id", "name", "slug"]

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = [ "id", "name", "slug"]

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = [ "id", "name", "slug"]

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = [ "id", "name", "slug", "image"]

class ProfileSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    position = PositionSerializer(required=False)
    area = AreaSerializer(required=False)
    my_class = ClassSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'avatar',
            'birthday',
            'address',
            'identify_card',
            'gender',
            'phone',
            'created_at',
            'faculty',
            'my_class',
            'position',
            'area',
        ]

class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            # 'avatar',
            'birthday',
            'address',
            'identify_card',
            'gender',
            'phone',
            'created_at',
            'faculty',
            'my_class',
            'position',
            'area',
        ]

#  API Update Profile
class UpdateProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    # email = serializers.EmailField(required=True)
    profile = ProfileUpdateSerializer()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'profile'] 
        extra_kwargs = {
            'email': {'validators': [EmailValidator]},
        }

    def save(self, request):
        # user = User.objects.get(email=self.validated_data['email'])
        user = User.objects.get(email=request.user.email)
        try:
            # update user
            user.first_name = self.validated_data['first_name']
            user.last_name = self.validated_data['last_name']
            user.save()
            # update profile
            try:
                profile_data = self.validated_data['profile']
                profile = Profile.objects.get(user=user)
                # profile.avatar=profile_data['avatar']
                profile.birthday=profile_data['birthday']
                # profile.gender=profile_data['gender']
                profile.address=profile_data['address']
                profile.identify_card=profile_data['identify_card']
                profile.phone=profile_data['phone']

                # profile.faculty=profile_data['faculty']
                # profile.position=profile_data['position']
                # profile.area=profile_data['area']
                profile.save()
            except Exception as e:
                print(e)
                pass

        except:
            pass
        return user 

# class AvatarUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Profile
#         fields = [
#             'avatar'
#         ]

class AvatarUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["avatar"]

    def save(self, *args, **kwargs):
        if self.instance.avatar:
            self.instance.avatar.delete()
        return super().save(*args, **kwargs)
    