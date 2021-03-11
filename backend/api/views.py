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

from .serializers import *
# from api.lessons.serializers import LessonListSerializer

from . import status_http

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def change_password_view(request):
    if request.method == 'POST':
        serializer = ChangePasswordSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            try:
                if not serializer.old_password_validate():
                    data['email'] = request.data['email']
                    data['message'] = 'Old password is incorrect'
                    return Response(data, status=status_http.HTTP_ME_454_OLD_PASSWORD_IS_INCORRECT)

                if  not serializer.confirm_password_validate():
                    data['email'] = request.data['email']
                    data['message'] = 'Confirm password is incorrect'
                    return Response(data, status=status_http.HTTP_ME_456_CONFIRM_PASSWORD_IS_INCORRECT)
                serializer.update()
                data['email'] = request.data['email']
                data['message'] = 'Change password successfully'
                return Response(data, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

@api_view(['GET'])
@permission_classes([IsAuthenticated, ])
def get_profile_view(request):
    if request.method == 'GET':
        data = {}        
        data['email'] = request.user.email
        user = User.objects.get(email=request.user.email)
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        data['id'] = user.id
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
            profile = ProfileSerializer(user.profile).data
        except:
            pass
        data['profile'] = profile
        #
        return Response(data, status=status.HTTP_200_OK)            
    return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)  