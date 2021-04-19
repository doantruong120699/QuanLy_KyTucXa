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
from django.http import JsonResponse


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
        try:
            area = kwargs['slug']
            queryset = Room.objects.filter(area__slug = area)
            # print(queryset)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, **kwargs):
        try:
            room = Room.objects.get(slug=kwargs['slug'])
            _sv = Profile.objects.filter(contract_profile__room=room, contract_profile__is_expired=False)
            list_sv = list(_sv.values())
            for i in range(len(list_sv)):
                list_sv[i].pop('token', None)
                list_sv[i].pop('area_id', None)
                list_sv[i].pop('position_id', None)
                list_sv[i].pop('identify_card', None)
                list_sv[i].pop('created_at', None)
                list_sv[i].pop('last_update', None)
                user = User.objects.get(pk=list_sv[i]['user_id'])
                list_sv[i]['username'] = user.username
                list_sv[i]['first_name'] = user.first_name
                list_sv[i]['last_name'] = user.last_name
                list_sv[i]['faculty_id'] = user.user_profile.faculty.name
                list_sv[i]['my_class_id'] = user.user_profile.my_class.name

            serializer = RoomSerializer(room)
            data_room = serializer.data
            data_room['list_user'] = list_sv
            
            return Response(data_room, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Room Not Found'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=["GET"], detail=False, url_path="get_list_room_in_area", url_name="get_list_room_in_area")
    def get_list_room_in_area(self, request, *args, **kwargs):
        try:
            area = kwargs['slug']
            queryset = Room.objects.filter(area__slug = area)
            # print(queryset)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)


        




