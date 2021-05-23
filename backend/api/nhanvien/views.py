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
        queryset = User.objects.filter(groups__name=nhanvien_group, user_profile__isnull=False).order_by('id')

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
        try:
            queryset = User.objects.filter(groups__name=nhanvien_group).order_by('pk')
            serializer = NhanVienListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK) 
        except:
            return Response({'detail':'Bad Request'}, status=status.HTTP_400_BAD_REQUEST) 

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

        def check_month_year(self, _month, _year):
            d = datetime.now()
            month = _month
            year = _year
            if _month == None or not _month.isnumeric():
                if d.month == 1:
                    month = 12
                else:
                    month = d.month - 1
            elif int(_month) > 12 or int(_month) < 1:
                if d.month == 1:
                    month = 12
                else:
                    month = d.month - 1
            if _year == None or not _year.isnumeric():
                year = d.year
            return (month, year)
     
    def list(self, request, *args, **kwargs):
        week = request.GET.get('week', None)
        year = request.GET.get('year', None)
        if year == None:
            year = datetime.datetime.now().year
        if week != None:
            _list = DailySchedule.objects.filter(week=week, year=year).order_by('shift__order')
            serializer = DailyScheduleListSerializer(_list, many=True)
            data = serializer.data
            if len(_list)>0:
                weekday = serializer.data[0]['shift']['weekdays']
                d =  str(serializer.data[0]['year'])+"-"+'W'+str(serializer.data[0]['week'])
                sunday = datetime.datetime.strptime(d + '-1', "%Y-W%W-%w") - timedelta(days=1)

                for item in range(len(data)):
                    data[item]['shift']['id'] = Shift.objects.get(pk=data[item]['shift']['id']).order
                    day_of_week = data[item]['shift']['weekdays']
                    day_shift = sunday + datetime.timedelta(days=self.day_week(day_of_week))
                    data[item]['shift']['date'] = day_shift.date()
                return Response(data, status=status.HTTP_200_OK)
        return Response({'status':'fail'}, status=status.HTTP_200_OK)

    def retrieve(self, request, **kwargs):
        try:
            queryset = DailySchedule.objects.get(public_id=kwargs['public_id'])
            serializer = DailyScheduleDetailSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Schedule Not Found'}, status=status.HTTP_404_NOT_FOUND)

