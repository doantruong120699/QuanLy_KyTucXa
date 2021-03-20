from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group, Permission
from django.db.models import Q
from collections import OrderedDict
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from api.models import *
from api.custom_pagination import LibraryCustomPagination
from .serializers import *
from api import status_http
from api.permissions import *

class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomListSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyNhanSu]
    lookup_field = 'slug'

    def get_queryset(self):
        return Room.objects.all().order_by('-created_at')

    # def get_permissions(self):
    #     if self.action == 'get_all_room':
    #         return [IsAuthenticated(), IsQuanLyNhanSu(),]
    #     return [IsAuthenticated(), IsQuanLyNhanSu(),]

    def list(self, request, *args, **kwargs):
        queryset = Room.objects.all().order_by('-created_at')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, **kwargs):
        try:
            queryset = Room.objects.get(slug=kwargs['slug'])
            serializer = RoomSerializer(queryset)
            return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Room Not Found'}, status=status.HTTP_404_NOT_FOUND)

    # get list all lesson 
    @action(methods=["GET"], detail=False, url_path="get_all_room", url_name="get_all_room")
    def get_all_room(self, request, *args, **kwargs):
        member_room = {}        
        # data['public_id'] = request.user.user_profile
        # data['email'] = request.user.email
        # data['first_name'] = request.user.first_name
        # data['last_name'] = request.user.last_name

        # profile = {}
        # try:
        #     profile = ProfileSinhVienSerializer(queryset).data
        # except:
        #     pass
        # data['profile'] = profile


        queryset = Room.objects.all().order_by('-created_at')
        print(queryset)
        page = self.paginate_queryset(member_room)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    # get list post room
    @action(methods=["GET"], detail=False, url_path="get_room_post", url_name="get_room_post")
    def get_room_post(self, request, *args, **kwargs):
        queryset = Room.objects.all().order_by('-created_at')
        if 'slug' in kwargs:
            queryset = queryset.filter(area__slug=kwargs['slug'])

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


