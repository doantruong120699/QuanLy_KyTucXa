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
from django.http import JsonResponse
import json

from api.models import *
from .serializers import *
from api.serializers import *
from api import status_http
from api.permissions import *
sinhvien_group = 'sinhvien_group'
nhanvien_group = 'nhanvien_group'

class SinhVienViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = SinhVienListSerializer
    # permission_classes = [IsAuthenticated]
    # permission_classes = []
    lookup_field = 'public_id'

    def get_queryset(self):
        public_id = self.kwargs['public_id']
        return Profile.objects.filter(public_id__public_id=public_id).order_by('id')

    def list(self, request, *args, **kwargs):
        queryset = User.objects.filter(groups__name=sinhvien_group, user_profile__isnull=False).order_by('username')
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
            data = {}        
            data['id'] = queryset.user.id
            data['email'] = queryset.user.email
            # Add username
            data['username'] = queryset.user.username
            data['first_name'] = queryset.user.first_name
            data['last_name'] = queryset.user.last_name
            data['room'] = {}
            data['room']['name'] = ""
            data['room']['area'] = ""
            data['room']['slug'] = ""
            try:
                contract = Contract.objects.filter(profile=queryset, is_expired=False, is_delete = False).first()
                if contract:
                    # data['room'] = {}
                    data['room']['name'] = contract.room.name
                    data['room']['area'] = contract.room.area.name
                    data['room']['slug'] = contract.room.slug
            except Exception as ee:
                print(ee)
                pass

            profile = {}
            try:
                profile = ProfileSinhVienSerializer(queryset).data
            except Exception as e:
                print(e)
                pass
            data['profile'] = profile
            #
            return Response(data, status=status.HTTP_200_OK) 


            # return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Profile Not Found'}, status=status.HTTP_404_NOT_FOUND)

    # API thong ke
    @action(methods=["GET"], detail=False, url_path="dashboard", url_name="dashboard")
    def dashboard(self, request, *args, **kwargs):
        try:
            data = {}
            dt = datetime.datetime.today()
            #  ====== Student ======
            sinhvien_queryset = User.objects.filter(groups__name=sinhvien_group)
            sinhvien_pre_month = sinhvien_queryset.filter(date_joined__month=dt.month-1)
            sinhvien_cur_month = sinhvien_queryset.filter(date_joined__month=dt.month)
            sinhvien = {}
            sinhvien['total'] = sinhvien_queryset.count()
            sinhvien['pre_month'] = sinhvien_pre_month.count()
            sinhvien['cur_month'] = sinhvien_cur_month.count()
            data['student'] = sinhvien
            # ======Staff=========
            staff_queryset = User.objects.filter(groups__name=nhanvien_group)
            staff_pre_month = staff_queryset.filter(date_joined__month=dt.month-1)
            staff_cur_month = staff_queryset.filter(date_joined__month=dt.month)
            staff = {}
            staff['total'] = staff_queryset.count()
            staff['pre_month'] = staff_pre_month.count()
            staff['cur_month'] = staff_cur_month.count()
            data['staff'] = staff
            # ======Room==========
            room_queryset = Room.objects.all()
            room = {}
            room['total'] = room_queryset.count()
            data['room'] = room
            data['room_available'] = room_queryset.filter(number_now__lte = 8).count()
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"status":"Fail"}, status=status.HTTP_200_OK)
        
class ContractRegistationViewSet(viewsets.ModelViewSet):
    serializer_class = ContractRegistationSerializer
    permission_classes = [IsAuthenticated, IsSinhVien]
    lookup_field = 'public_id'

    def list(self, request, *args, **kwargs):
        try:
            list_contract_room = Contract.objects.filter(profile__user=request.user).order_by('-created_at')
            
            is_expired = request.GET.get('is_expired', None)
            if is_expired:
                list_contract_room = list_contract_room.filter(is_expired = is_expired)
                
            page = self.paginate_queryset(list_contract_room)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
        return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, **kwargs):
        try:
            request_regis = Contract.objects.get(public_id=kwargs['public_id'])
            serializer = ContractRegistationSerializer(request_regis)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Request Not Found'}, status=status.HTTP_404_NOT_FOUND)
            
class BillViewSet(viewsets.ModelViewSet):
    serializer_class = WaterElectricalInListSerializer
    permission_classes = [IsAuthenticated, IsSinhVien]
    lookup_field = 'public_id'
    
    def check_user_in_room(self, user):
        contracts = Contract.objects.filter(
            profile__user=user, 
            is_delete=False, 
            is_expired=False, 
            is_accepted=True,
        )
        if len(contracts) == 0:
            return (False, 0)
        else:
            return (True, contracts.first().room)
    
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
        try:
            (check, room) = self.check_user_in_room(request.user)
            print(check, room)
            if check == True:             
                list_water_electrical = WaterElectrical.objects.filter(room=room)   
                is_paid = request.GET.get('is_paid', None)
                if is_paid != None:
                    list_water_electrical = list_water_electrical.filter(bill__is_paid=is_paid)    
                month = request.GET.get('month', None)
                year = request.GET.get('year', None)
                if month != None:
                    (month, year) = self.check_month_year(month, year)
                    list_water_electrical = list_water_electrical.filter(month=month, year=year)
                
                page = self.paginate_queryset(list_water_electrical)
                if page is not None:
                    serializer = self.get_serializer(page, many=True)
                    return self.get_paginated_response(serializer.data)
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            else:
                return Response({'status': 'fail', 'notification':'Sinh viên chưa đăng ký phòng.'}, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            print(e)
        return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, **kwargs):
        try:
            request_regis = WaterElectrical.objects.get(public_id=kwargs['public_id'])
            serializer = WaterElectricalDetailSerializer(request_regis)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Request Not Found'}, status=status.HTTP_404_NOT_FOUND)
        
        

