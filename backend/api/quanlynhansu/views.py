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


# class FinancalRoomInAreaViewSet(viewsets.ModelViewSet):
#     serializer_class = FinancalRoomInAreaSerializer
#     permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
#     lookup_field = 'slug'

#     def get_queryset(self):
#         return Area.objects.all().order_by('-created_at')

#     def get_permissions(self):
#         if self.action == 'list':
#             return [IsAuthenticated(), IsQuanLyTaiChinh(),]
#         return [IsAuthenticated(), IsQuanLyTaiChinh(),]

#     def list(self, request, *args, **kwargs):
#         try:
#             area = Area.objects.get(slug=kwargs['slug'])
#             time = kwargs['time'] + '-01'
#             time = datetime.fromisoformat(time)
#             # Number now in room >=0 
#             room_in_area = Room.objects.filter(area=area).order_by('-id')
#             all_bill = Bill.objects.filter(water_electrical__room__in=room_in_area, 
#                                                               water_electrical__time__year=time.year,
#                                                               water_electrical__time__month=time.month)
#             list_room_add_json = []
#             for bill in all_bill:
#                 list_room_add_json.append({'name': bill.water_electrical.room.name, 'isPaid' : bill.is_paid})
            
#             serializer = FinancalRoomInAreaSerializer(area)
#             data_room = serializer.data
#             data_room['room'] = list_room_add_json
            
#             return Response(data_room, status=status.HTTP_200_OK)
#         except Exception as e:
#             print(e)
#             return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)

