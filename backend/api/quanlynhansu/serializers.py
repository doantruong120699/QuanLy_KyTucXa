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
            'phone',
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
    semester = serializers.ReadOnlyField(source="get_semester_display")
    class Meta:
        model = Contract
        fields = [
            'public_id',
            'room', 
            # 'start_at', 
            # 'end_at', 
            'payment_method', 
            'created_at',
            'profile',
            'is_expired',
            'is_accepted',
            # 
            'semester',
            'school_year',
            'is_cover_room',
            'number_registration',
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
    shift = serializers.IntegerField(required=False)
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
            shift = Shift.objects.filter(order=validated_data['shift']).first()
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
            print("===")
            print(e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")
    
    def validate(self, data):
        """
        validate data
        """
        # if 'title' not in data:
        #     raise serializers.ValidationError({'title' : required_message})
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

# ==============================================

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = [
            'id',
            'name',
            'content_type_id',
            'codename',
        ]

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = [
            'id',
            'name',
        ]

# =====================================================

class AddProfileSerializer(serializers.ModelSerializer):
    birthday = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    address = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    identify_card = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    gender = serializers.BooleanField(required=False, allow_null=True)
    phone = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    class Meta:
        model = Profile
        fields = [
            # 'user'
            'birthday',
            'address',
            'identify_card',
            'gender',
            'phone',
            'faculty',
            'my_class',
            'area',
            'position',
        ]
        
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    password = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    email = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    is_active = serializers.BooleanField(required=False, allow_null=True)
    profile = AddProfileSerializer(required=False)
    group_list = serializers.ListField(required=False, allow_null=True)
    permission_list = serializers.ListField(required=False,allow_null=True)
    
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'profile',
            'group_list',
            'permission_list'
        ]
        # Get current user login
    
    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            user = User.objects.create(
                username=validated_data['username'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
                is_active=validated_data['is_active']
            )
            user.set_password(validated_data['password'])
            user.save()
            data_profile = validated_data['profile']
            profile = Profile.objects.create(
                user=user,
                birthday = data_profile['birthday'],
                address = data_profile['address'],
                identify_card = data_profile['identify_card'],
                gender = data_profile['gender'],
                phone = data_profile['phone'],
            )
            if 'faculty' in data_profile:
                print(len(str(data_profile['faculty'])))
                if data_profile['faculty'] != None and len(str(data_profile['faculty'])) > 0:
                    faculty = Faculty.objects.get(pk=data_profile['faculty'])
                    profile.faculty = faculty
                
            if 'my_class' in data_profile:
                if data_profile['my_class'] != None and len(str(data_profile['my_class'])) >0:
                    my_class = Class.objects.get(pk=data_profile['my_class'])
                    profile.my_class = my_class
                
            if 'area' in data_profile:
                if data_profile['area'] != None  and len(str(data_profile['area'])) > 0:
                    area = Area.objects.get(pk=data_profile['area'])
                    profile.area = area
                
            if 'position' in data_profile :
                if data_profile['position'] != None and len(str(data_profile['position'])) > 0:
                    position = Position.objects.get(pk=data_profile['position'])
                    profile.position = position                
            
            if 'group_list' in validated_data:
                group_list = validated_data['group_list']
                group = Group.objects.filter(pk__in=group_list)
                for g in group:
                    user.groups.add(g)
            
            if 'permission_list' in validated_data:
                permission_list = validated_data['permission_list']
                permission = Permission.objects.filter(pk__in=permission_list)
                for p in permission:
                    user.user_permissions.add(p)
            profile.save()
            return True
        except Exception as e:
            print(e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")
    
    def update(self, instance, validated_data):
        try:
            if 'username' in validated_data:
                if validated_data['username'] != None and len(str(validated_data['username'])) > 0:
                    instance.username = validated_data.get('username', instance.username)
                    
            if 'password' in validated_data:
                if validated_data['password'] != None and len(str(validated_data['password'])) > 0:
                    instance.set_password(validated_data.get('password', instance.password))
                    
            if 'first_name' in validated_data:
                if validated_data['first_name'] != None and len(str(validated_data['first_name'])) > 0:
                    instance.first_name = validated_data.get('first_name', instance.first_name)
                    
            if 'last_name' in validated_data:
                if validated_data['last_name'] != None and len(str(validated_data['last_name'])) > 0:
                    instance.last_name = validated_data.get('last_name', instance.last_name)
                    
            if 'email' in validated_data:
                if validated_data['email'] != None and len(str(validated_data['email'])) > 0:
                    instance.email = validated_data.get('email', instance.email)
                    
            if 'is_active' in validated_data:
                if validated_data['is_active'] != None and len(str(validated_data['is_active'])) > 0:
                    instance.is_active = validated_data.get('is_active', instance.is_active)
                    
            profile = instance.user_profile
            if 'profile' in validated_data:
                profile_data = validated_data.get('profile', instance.user_profile)
                
                if 'birthday' in profile_data:
                    if profile_data['birthday'] != None and len(str(profile_data['birthday'])) > 0:
                        profile.birthday = profile_data.get('birthday', profile.birthday)
                        
                if 'address' in profile_data:
                    if profile_data['address'] != None and len(str(profile_data['address'])) > 0:
                        profile.address = profile_data.get('address', profile.address)
                        
                if 'identify_card' in profile_data:
                    if profile_data['identify_card'] != None and len(str(profile_data['identify_card'])) > 0:
                        profile.identify_card = profile_data.get('identify_card', profile.identify_card)
                        
                if 'gender' in profile_data:
                    if profile_data['gender'] != None and len(str(profile_data['gender'])) > 0:
                        profile.gender = profile_data.get('gender', profile.gender)
                        
                if 'phone' in profile_data:
                    if profile_data['phone'] != None and len(str(profile_data['phone'])) > 0:
                        profile.phone = profile_data.get('phone', profile.phone)
                
                if 'faculty' in profile_data:
                    if profile_data['faculty'] != None and len(str(profile_data['faculty'])) > 0:
                        faculty = Faculty.objects.get(pk=profile_data.get('faculty').pk)
                        profile.faculty = faculty
                    
                if 'my_class' in profile_data:
                    if profile_data['my_class'] != None and len(str(profile_data['my_class'])) > 0: 
                        my_class = Class.objects.get(pk= profile_data.get('my_class').pk)
                        profile.my_class = my_class
                    
                if 'area' in profile_data:
                    if profile_data['area'] != None and len(str(profile_data['area'])) > 0:
                        area = Area.objects.get(pk= profile_data.get('area').pk)
                        profile.area = area
                    
                if 'position' in profile_data:
                    if profile_data['position'] != None and len(str(profile_data['position'])) > 0:
                        position = Position.objects.get(pk= profile_data.get('position').pk)
                        profile.position = position
                
            if 'group_list' in validated_data:
                instance.groups.clear()
                group_list = validated_data['group_list']
                group = Group.objects.filter(pk__in=group_list)
                for g in group:
                    instance.groups.add(g)
                
            if 'permission_list' in validated_data:
                instance.user_permissions.clear()
                permission_list = validated_data['permission_list']
                permission = Permission.objects.filter(pk__in=permission_list)
                for p in permission:
                    instance.user_permissions.add(p)
        
            instance.save()
            profile.save()
            return True
        except Exception as e:
            print("Error update: ", e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")
    
    def add_validate(self, data):
        if 'username' not in data:
            # raise serializers.ValidationError({'username': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'password' not in data:
            # raise serializers.ValidationError({'password': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'last_name' not in data:
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'first_name' not in data:
            # raise serializers.ValidationError({'first_name': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'email' not in data:
            # raise serializers.ValidationError({'email': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'is_active' not in data:
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
            # raise serializers.ValidationError({'is_active': required_message}) 
                        
        profile_data = data['profile']
        
        if 'birthday' not in profile_data:
            # raise serializers.ValidationError({'birthday': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'address' not in profile_data:
            # raise serializers.ValidationError({'address': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'identify_card' not in profile_data:
            # raise serializers.ValidationError({'identify_card': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'gender' not in profile_data:
            # raise serializers.ValidationError({'gender': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'phone' not in profile_data:
            # raise serializers.ValidationError({'phone': required_message}) 
            raise serializers.ValidationError({'status':'fail', 'notification': required_message}) 
        
        if 'password' in data:
            if len(data['password']) < 5:
                # raise serializers.ValidationError({'password': 'Password must be at least 5 characters.'}) 
                raise serializers.ValidationError({'status':'fail', 'notification': 'Password must be at least 5 characters.'}) 
            
        if 'email' in data:
            if data['email']:
                user = User.objects.filter(email = data['email'])
                if len(user) > 0:
                    # raise serializers.ValidationError({'email': 'Email is exist.'})
                    raise serializers.ValidationError({'status':'fail', 'notification': 'Email is exist.'})  
        
        if 'username' in data:
            if data['username']:
                user = User.objects.filter(username = data['username'])
                if len(user) > 0:
                    # raise serializers.ValidationError({'username': 'Username is exist.'}) 
                    raise serializers.ValidationError({'status':'fail', 'notification': 'Username is exist.'}) 
        return data   

class UserProfileListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    is_active = serializers.BooleanField(required=False)
    group_list = serializers.ListField(required=False)
    permission_list = serializers.ListField(required=False)
    
    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            "is_active",
            'group_list',
            'permission_list'
        ]

class ProfileListSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    position = PositionSerializer(required=False)
    area = AreaSerializer(required=False)
    my_class = ClassSerializer(required=False)
    user = UserProfileListSerializer()
    class Meta:
        model = Profile
        fields = [
            'user',
            'public_id',
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

# ====================================================
    
class UpdateProfileSerializer(serializers.ModelSerializer):
    birthday = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    identify_card = serializers.CharField(required=False)
    gender = serializers.BooleanField(required=False)
    phone = serializers.CharField(required=False)
    class Meta:
        model = Profile
        fields = [
            'public_id',
            'birthday',
            'address',
            'identify_card',
            'gender',
            'phone',
            'faculty',
            'my_class',
            'area',
            'position',
        ]
            
class UserProfileUpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    profile = AddProfileSerializer()
    group_list = serializers.ListField(required=False)
    permission_list = serializers.ListField(required=False)
    
    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'first_name',
            'last_name',
            'email',
            'profile',
            'group_list',
            'permission_list'
        ]
        # Get current user login
    
    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            user = User.objects.create(
                username=validated_data['username'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                email=validated_data['email'],
            )
            user.set_password(validated_data['password'])
            user.save()
            data_profile = validated_data['profile']
            profile = Profile.objects.create(
                user=user,
                birthday = data_profile['birthday'],
                address = data_profile['address'],
                identify_card = data_profile['identify_card'],
                gender = data_profile['gender'],
                phone = data_profile['phone'],
            )
            if 'faculty' in data_profile:
                faculty = Faculty.objects.get(pk=data_profile['faculty'])
                profile.faculty = faculty
                
            if 'my_class' in data_profile:
                my_class = Class.objects.get(pk=data_profile['my_class'])
                profile.my_class = my_class
                
            if 'area' in data_profile:
                faculty = Area.objects.get(pk=data_profile['area'])
                profile.faculty = area
                
            if 'position' in data_profile:
                faculty = Position.objects.get(pk=data_profile['position'])
                profile.position = position                
            
            if 'group_list' in data_profile:
                group_list = data_profile['group_list']
                group = Group.objects.filter(pk__in=group_list)
                for g in group:
                    user.groups.add(g)
            if 'permission_list' in data_profile:
                permission_list = data_profile['permission_list']
                permission = Permission.objects.filter(pk__in=permission_list)
                for p in permission:
                    user.user_permissions.add(p)
            profile.save()
            return True
        except Exception as e:
            print(e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")
    
    def validate(self, data):
        if len(data['username'].strip()) == 0:
            raise serializers.ValidationError({'username': required_message}) 
        
        if len(data['password'].strip()) < 5:
            raise serializers.ValidationError({'password': required_message}) 
        
        if len(data['last_name'].strip()) < 5:
            raise serializers.ValidationError({'last_name': required_message}) 
        
        if len(data['last_name'].strip()) < 5:
            raise serializers.ValidationError({'last_name': required_message}) 
        
        if len(data['email'].strip()) < 5:
            raise serializers.ValidationError({'email': required_message}) 
        
        if 'password' in data:
            if len(data['password']) < 5:
                raise serializers.ValidationError({'password': 'Password must be at least 5 characters.'}) 
            
        if 'email' in data:
            if data['email']:
                user = User.objects.filter(email = data['email'])
                if len(user) > 0:
                    raise serializers.ValidationError({'email': 'Email is exist.'}) 
        return data   

# =======================================================

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ["id", "name", "stage1_started_at", "stage1_ended_at", "stage2_started_at", "stage2_ended_at", "stage3_started_at", "stage3_ended_at", "semester", "school_year"]
        extra_kwargs = {
            'name': {'required': True},
            'stage1_started_at': {'required': True},
            'stage1_ended_at': {'required': True},
            'stage2_started_at': {'required': True},
            'stage2_ended_at': {'required': True},
            'stage3_started_at': {'required': True},
            'stage3_ended_at': {'required': True},
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
            user = self._current_user()
            # school_year = SchoolYear.objects.get(pk=validated_data['school_year'])
            model = Stage.objects.create(
                name=validated_data['name'],
                stage1_started_at=validated_data['stage1_started_at'],
                stage1_ended_at=validated_data['stage1_ended_at'],
                stage2_started_at=validated_data['stage2_started_at'],
                stage2_ended_at=validated_data['stage2_ended_at'],
                stage3_started_at=validated_data['stage3_started_at'],
                stage3_ended_at=validated_data['stage3_ended_at'],
                semester=validated_data['semester'],
                school_year=validated_data['school_year'],
                created_by=user,
            )
            return True
        except Exception as e:
            print(e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")
    
    def update(self, instance, validated_data):
        try:
            user = self._current_user()
            instance.name = validated_data.get('name', instance.name)
            
            instance.stage1_started_at = validated_data.get('stage1_started_at', instance.stage1_started_at)
            instance.stage1_ended_at = validated_data.get('stage1_ended_at', instance.stage1_ended_at)
            
            instance.stage2_started_at = validated_data.get('stage2_started_at', instance.stage2_started_at)
            instance.stage2_ended_at = validated_data.get('stage2_ended_at', instance.stage2_ended_at)
            
            instance.stage3_started_at = validated_data.get('stage3_started_at', instance.stage3_started_at)
            instance.stage3_ended_at = validated_data.get('stage3_ended_at', instance.stage3_ended_at)
            
            instance.semester = validated_data.get('semester', instance.semester)
            instance.school_year = validated_data.get('school_year', instance.school_year)
            
            instance.updated_by = user
            instance.save()
            return True
        except Exception as e:
            print("Error update: ", e)
            return serializers.ValidationError("Error")
        return serializers.ValidationError("Server error")
    
    def validate(self, data):
        """
        validate data
        """        
    
        stage1_started_at = data['stage1_started_at']
        stage1_ended_at = data['stage1_ended_at']
        
        stage2_started_at = data['stage2_started_at']
        stage2_ended_at = data['stage2_ended_at']
        
        stage3_started_at = data['stage3_started_at']
        stage3_ended_at = data['stage3_ended_at']
        
        if stage1_ended_at <= stage1_started_at:
            raise serializers.ValidationError({'stage1_ended_at' : "Thời gian kết thúc giai đoạn 1 phải sau thời gian bắt đầu."})  
        
        if stage2_started_at <= stage1_ended_at:
            raise serializers.ValidationError({'stage2_started_at' : "Giai đoan 2 phải bắt đầu sau giai đoạn 1"})  
        
        if stage2_ended_at <= stage2_started_at:
            raise serializers.ValidationError({'stage2_ended_at' : "Thời gian kết thúc giai đoạn 2 phải sau thời gian bắt đầu."})  
        
        if stage3_started_at <= stage2_ended_at:
            raise serializers.ValidationError({'stage2_started_at' : "Giai đoan 3 phải bắt đầu sau giai đoạn 2"})  
        
        if stage3_ended_at <= stage3_started_at:
            raise serializers.ValidationError({'stage3_ended_at' : "Thời gian kết thúc giai đoạn 3 phải sau thời gian bắt đầu."})    
           
        return data
