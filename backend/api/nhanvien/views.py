from django.shortcuts import render
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User, Group, Permission
from django.db.models import Q, Prefetch
from collections import OrderedDict
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
import re
from datetime import datetime, timedelta

from api.models import *
from .serializers import *
from api.serializers import *
from api import status_http
from api.permissions import *
from django.http import JsonResponse
import shortuuid

nhanvien_group = 'nhanvien_group'

class NhanVienViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = NhanVienListSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = []
    lookup_field = 'public_id'

    def get_queryset(self):
        public_id = self.kwargs['public_id']
        return Profile.objects.filter(public_id__public_id=public_id).order_by('id')

    def list(self, request, *args, **kwargs):
        queryset = User.objects.filter(groups__name=nhanvien_group).order_by('id')

        keyword = self.request.GET.get('keyword')
        if keyword and len(keyword) > 0:
            words = re.split(r"[-;,.\s]\s*", keyword)
            query = Q()
            for word in words:
                query |= Q(first_name__icontains=word)
                query |= Q(last_name__icontains=word)
            queryset=queryset.filter(query).distinct()
                   
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    def retrieve(self, request, **kwargs):
        try:
            queryset = Profile.objects.get(public_id=kwargs['public_id'])
            # serializer = ProfileSerializer(queryset).user.id

            data = {}        
            data['id'] = queryset.user.id
            data['email'] = queryset.user.email
            data['username'] = queryset.user.username
            data['first_name'] = queryset.user.first_name
            data['last_name'] = queryset.user.last_name

            profile = {}
            try:
                profile = ProfileNhanVienSerializer(queryset).data
            except:
                pass
            data['profile'] = profile
            #
            return Response(data, status=status.HTTP_200_OK) 


            # return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Profile Not Found'}, status=status.HTTP_404_NOT_FOUND)

    # get list all nhanvien 
    @action(methods=["GET"], detail=False, url_path="get_all_nhanvien", url_name="get_all_nhanvien")
    def get_all_nhanvien(self, request, *args, **kwargs):
        queryset = list(User.objects.filter(groups__name=nhanvien_group).order_by('id').values())
        _list = list(Shift.objects.values().order_by('id'))
        return JsonResponse(queryset, safe=False, status=status.HTTP_200_OK)
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        # serializer = self.get_serializer(page, many=True)
        # return self.get_paginated_response(serializer.data)

class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer

    def get_queryset(self):
        return Shift.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        _list = list(Shift.objects.values().order_by('id'))
        return JsonResponse(_list, safe=False, status=status.HTTP_200_OK)

    def retrieve(self, request, **kwargs):
        try:
            queryset = Shift.objects.get(slug=kwargs['slug'])
            serializer = ShiftSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Shift Not Found'}, status=status.HTTP_404_NOT_FOUND)

class DailyScheduleViewSet(viewsets.ModelViewSet):
    queryset = DailySchedule.objects.all()
    serializer_class = DailyScheduleListSerializer

    def get_queryset(self):
        week = self.kwargs['week']
        return DailySchedule.objects.filter(week=week).order_by('-pk')
    
    def day_week(self, i):
        switcher={
                'Sun':0,
                'Mon':1,
                'Tue':2,
                'Wed':3,
                'Thu':4,
                'Fri':5,
                'Sat':6,
            }
        return switcher.get(i,"Invalid day of week")

    def list(self, request, *args, **kwargs):
        _list = DailySchedule.objects.filter(week=kwargs['week']).order_by('shift__order')
        if len(_list)>0:
            serializer = DailyScheduleListSerializer(_list, many=True)
            data = serializer.data

            weekday = serializer.data[0]['shift']['weekdays']
            d =  str(serializer.data[0]['year'])+"-"+'W'+str(serializer.data[0]['week'])
            sunday = datetime.datetime.strptime(d + '-1', "%Y-W%W-%w") - timedelta(days=1)

            for item in range(len(data)):
                staff = Profile.objects.filter(user__email = data[item]['staff']['email']).first()
                data[item]['staff']['id'] = staff.pk
                day_of_week = data[item]['shift']['weekdays']
                day_shift = sunday + datetime.timedelta(days=self.day_week(day_of_week))
                data[item]['shift']['date'] = day_shift.date()
            return Response(data, status=status.HTTP_200_OK)
        return Response({'message':'No data'}, status=status.HTTP_200_OK)

    def retrieve(self, request, **kwargs):
        try:
            queryset = DailySchedule.objects.get(public_id=kwargs['public_id'])
            serializer = DailyScheduleDetailSerializer(queryset)
            serializer.data['staff']['id'] = queryset.staff.user_profile.pk
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Schedule Not Found'}, status=status.HTTP_404_NOT_FOUND)

