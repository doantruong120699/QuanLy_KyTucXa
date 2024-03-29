from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group, Permission
from django.db.models import Q
from .models import *
from collections import OrderedDict
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets
from .serializers import *
# from api.lessons.serializers import LessonListSerializer
from django.http import JsonResponse
from . import status_http
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from rest_framework.decorators import api_view, permission_classes, action
from django.core.mail import send_mail
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import parsers
from rest_framework.views import APIView


# API Change Password
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    if request.method == 'PUT':
        serializer = ChangePasswordSerializer(data=request.data)
        data = {}
        # Validate data: it'll call to validate() function in ChangePasswordSerializer 
        if serializer.is_valid():
            try:
                # Validate: check old password, it'll call to old_password() function in ChangePasswordSerializer 
                if not serializer.old_password_validate(request):
                    data['message'] = 'Old password is incorrect'
                    return Response(data, status=status_http.HTTP_ME_454_OLD_PASSWORD_IS_INCORRECT)
                # Validate: Check password confirm, it'll call to confirm_password_validate() function in ChangePasswordSerializer 
                if  not serializer.confirm_password_validate():
                    data['message'] = 'Confirm password is incorrect'
                    return Response(data, status=status_http.HTTP_ME_456_CONFIRM_PASSWORD_IS_INCORRECT)
                # Call function update() in ChangePasswordSerializer to update password
                serializer.update(request)
                data['message'] = 'Change password successfully'
                return Response(data, status=status.HTTP_200_OK)
            except:
                pass
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def get_profile_view(request):
    if request.method == 'GET':
        data = {}        
        queryset = Profile.objects.get(user=request.user)
        # print(queryset.public_id)
        data['email'] = request.user.email
        user = User.objects.get(email=request.user.email)
        data['username'] = user.username
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        data['id'] = user.id
        # data['room'] = {}
        # data['room']['name'] = ""
        # data['room']['area'] = ""
        # data['room']['slug'] = ""
        if  user.groups.filter(name='sinhvien_group').exists():
            try:
                contract = Contract.objects.filter(profile=queryset, is_expired=False, is_delete=False).first()
                if contract:
                    data['room'] = {}
                    data['room']['name'] = contract.room.name
                    data['room']['slug'] = contract.room.slug
                    data['room']['area'] = contract.room.area.name
            except Exception as e:
                print(e)
                pass
    
        groups = Group.objects.filter(user=request.user).all()
        groups_ = []
        for g in groups:
            groups_.append(g.name) ## += g.name + ';'
        
        data['groups'] = groups_   
        # 
        permissions = Permission.objects.filter(Q(user=user) | Q(group__user=user)).all()
        permissions_user = []
        for p in permissions:            
            permissions_user.append(p.name)
        data['permissions'] = permissions_user
        # 
        # groups_all = Group.objects.all()
        # serializer_group_all = GroupSerializer(groups_all, many=True)
        # data['groups_with_permissions'] = serializer_group_all.data
        # 
        profile = {}
        try:
            profile = ProfileSerializer(user.user_profile).data
        except Exception as e:
            print(e)
            pass
        data['profile'] = profile
        if data['profile']['avatar']:
            data['profile']['avatar'] = settings.BACKEND_URL + data['profile']['avatar']
        #
        return Response(data, status=status.HTTP_200_OK)            
    return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['PUT'])
@permission_classes([IsAuthenticated, ])
def update_user_profile_view(request):
    if request.method == 'PUT':
        # update current user by email
        # request.user.email = request.data['email']  
        serializer = UpdateProfileSerializer(data=request.data)
        data = {}
        if serializer.is_valid():   
            try:
                serializer.save(request)
                # data['email'] = request.data['email']
                data['message'] = 'Update profile successfully'
                return Response(data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class UserAvatarUpload(APIView):
    # parser_classes = (parsers.MultiPartParser)
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            data = {}
            data['avatar'] = settings.BACKEND_URL + request.user.user_profile.avatar.url
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"avatar": ""}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, format=None):
        serializer = AvatarUpdateSerializer(data=request.data, instance=request.user.user_profile)
        if serializer.is_valid():
            serializer.save()
            data = serializer.data
            data['avatar'] = settings.BACKEND_URL + data['avatar']
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def forgot_password_view(request):
    data = {}
    try:
        if request.method == 'POST':
            serializer = ForgotPasswordSerializer(data=request.data)
            if serializer.is_valid():
                if not serializer.is_email_exist():
                    data['status'] = False
                    data['message'] = 'Email does not exist!'
                    return Response(data, status=status_http.HTTP_ME_451_EMAIL_DOES_NOT_EXIST) 
                if not serializer.is_account_active():
                    data['status'] = False
                    data['message'] = 'The account is not activated. Contact management to resolve!'
                    return Response(data, status=status_http.HTTP_ME_452_ACCOUNT_IS_NOT_ACTIVATED)    
                
                x = serializer.send_mail(request)  
                if x:
                    data['status'] = True
                    data['message'] = 'Send an activation link to your email successfully!' 
                    return Response(data, status=status.HTTP_200_OK)
            
            print("Serializer Error: ")
            data['status'] = False
            data['message'] = list(serializer.errors.values())[0][0]
            return Response(data, status=status.HTTP_400_BAD_REQUEST)    
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e) 
        data['status'] = False
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def reset_password_view(request, uidb64, token):
    check = check_link_forgot_password(request, uidb64, token).data
    if check['status'] == True: 
        data = {}
        email = check['email']
        if request.method == 'GET':
            return Response(check, status=status.HTTP_200_OK)
        if request.method == 'POST':
            serializer = ResetPasswordSerializer(data=request.data)
            if serializer.is_valid():
                if  not serializer.confirm_password_validate():
                    data['status'] = False
                    data['message'] = 'Confirm password is incorrect!'
                    return Response(data, status=status_http.HTTP_ME_456_CONFIRM_PASSWORD_IS_INCORRECT)
                
                check_send_mail = serializer.reset_password(email) 
                if check_send_mail: 
                    data['status'] = True
                    data['message'] = 'Reset Password successful!'
                    return Response(data, status=status.HTTP_200_OK)
            data['status'] = False
            try:
                data['message'] = list(serializer.errors.values())[0][0]
            except Exception as ex_validate:
                print("Exceptiopn validate: ", ex_validate)
                data['message'] = 'Error!'
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(check, status=status.HTTP_400_BAD_REQUEST)

def check_link_forgot_password(request, uidb64, token):
    data = {}
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
        if user is not None and account_activation_token.check_token(user, token):
            data['status'] = True
            data['email'] = user.email
            return Response(data, status=status.HTTP_200_OK) 
    except Exception as e:
        print(e)
        pass
    data['status'] = False
    data['message'] = 'Link activate is expired!'
    return Response(data, status=status.HTTP_400_BAD_REQUEST)


# API get static data
class FacultyViewSet(viewsets.ModelViewSet):
    queryset = Faculty.objects.all()
    serializer_class = FacultySerializer

    def get_queryset(self):
        return Faculty.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        faculty = list(Faculty.objects.values().order_by('id'))
        return JsonResponse(faculty, safe=False, status=status.HTTP_200_OK)

class ClassViewSet(viewsets.ModelViewSet):
    queryset =  Class.objects.all()
    serializer_class = ClassSerializer

    def get_queryset(self):
        return Class.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        my_class = list(Class.objects.values().order_by('id'))
        return JsonResponse(my_class, safe=False, status=status.HTTP_200_OK)

class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
    def get_queryset(self):
        return Position.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        position = list(Position.objects.values().order_by('id'))
        return JsonResponse(position, safe=False, status=status.HTTP_200_OK)

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

    def get_queryset(self):
        return Area.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        area = list(Area.objects.values().order_by('id'))
        return JsonResponse(area, safe=False, status=status.HTTP_200_OK)
    
    def retrieve(self, request, **kwargs):
        try:
            area = Area.objects.get(slug=kwargs['slug'])
            serializer = AreaSerializer(area)
            data = serializer.data
            data['image'] = settings.BACKEND_URL + data['image']
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(methods=["GET"], detail=False, url_path="get_image_area", url_name="get_all_get_image_arearoom")
    def get_image_area(self, request, *args, **kwargs):
        area = Area.objects.all()
        serializer = AreaSerializer(area, many=True)
        data = serializer.data
        for i in data:
            i.pop('slug')
            i.pop('name')
        return Response(data, status=status.HTTP_200_OK)
            
        