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

class WaterElectricalUnitPriceViewSet(viewsets.ModelViewSet):
    serializer_class = WaterElectricalUnitPriceSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

    def get_queryset(self):
        return WaterElectricalUnitPrice.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
            _list = WaterElectricalUnitPrice.objects.all().order_by('-created_at')
            page = self.paginate_queryset(_list)
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
            query = WaterElectricalUnitPrice.objects.get(id=kwargs['id'])
            serializer = WaterElectricalUnitPriceSerializer(query)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'status': 'fail', 'notification' : 'Water and Electrical Unit Price not found!'}, status=status.HTTP_404_NOT_FOUND)

class FinancalRoomInAreaViewSet(viewsets.ModelViewSet):
    serializer_class = FinancalRoomInAreaSerializer
    permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'slug'

    def get_queryset(self):
        return Area.objects.all().order_by('-created_at')

    def get_permissions(self):
        if self.action == 'list':
            return [IsAuthenticated(), IsQuanLyTaiChinh(),]
        return [IsAuthenticated(), IsQuanLyTaiChinh(),]

    def list(self, request, *args, **kwargs):
        try:
            area = Area.objects.get(slug=kwargs['slug'])
            time = kwargs['time'] + '-01'
            time = datetime.fromisoformat(time)
            # Number now in room >=0 
            room_in_area = Room.objects.filter(area=area).order_by('-id')
            all_bill = Bill.objects.filter(water_electrical__room__in=room_in_area, 
                                                              water_electrical__year=time.year,
                                                              water_electrical__month=time.month)
            list_room_add_json = []
            for bill in all_bill:
                list_room_add_json.append({'name': bill.water_electrical.room.name, 'isPaid' : bill.is_paid})
            
            serializer = FinancalRoomInAreaSerializer(area)
            data_room = serializer.data
            data_room['room'] = list_room_add_json
            
            return Response(data_room, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)

# =========================================================

class WaterElectricalViewSet(viewsets.ModelViewSet):
    serializer_class = WaterElectricalSerializer
    permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

    def get_queryset(self):
        return WaterElectrical.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
            area = Area.objects.get(slug=kwargs['slug'])
            time = kwargs['time'] + '-01'
            time = datetime.fromisoformat(time)
            # Number now in room >=0 
            room_in_area = Room.objects.filter(area=area).order_by('-id')
            _list = WaterElectrical.objects.filter(room__in=room_in_area, year=time.year, month=time.month)
            page = self.paginate_queryset(_list)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        serializer = WaterElectricalSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            if serializer.exist_validate(request.data):
                save = serializer.create(request.data)
                if save:
                    return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'fail', 'notification' : 'This room added water-electrical bill!'}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, public_id, format=None):
        try:
            queryset = WaterElectrical.objects.get(public_id=public_id)
            datas = request.data
            serializer = WaterElectricalSerializer(queryset, data=datas, context={'request': request})
            if serializer.is_valid():
                if serializer.exist_update_validate(instance=queryset, validated_data = request.data):
                    save = serializer.update(instance = queryset, validated_data = request.data)
                    if save:
                        return Response({'status': 'successful', 'notification' : 'Update successful!'}, status=status.HTTP_201_CREATED)
                return Response({'status': 'fail', 'notification' : 'This room added water-electrical bill!'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'status': 'fail', 'notification' : 'Water Electrical Not Found!'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, public_id, format=None):
        try:
            queryset = WaterElectrical.objects.get(public_id=public_id)
            queryset.delete()
            return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
        except:
            return Response({'status': 'fail', 'notification' : 'Water Electrical not found!'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, public_id, **kwargs):
        try:
            queryset = WaterElectrical.objects.get(public_id=public_id)
            serializer = WaterElectricalDetailSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'status': 'fail', 'notification' : 'Water Electrical not found!'}, status=status.HTTP_404_NOT_FOUND)

class BillViewSet(viewsets.ModelViewSet):
    serializer_class = BillSerializer
    permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

    def get_queryset(self):
        return Bill.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
            area = Area.objects.get(slug=kwargs['slug'])
            time = kwargs['time'] + '-01'
            time = datetime.fromisoformat(time)
            # Number now in room >=0 
            room_in_area = Room.objects.filter(area=area).order_by('-id')
            _list = Bill.objects.filter(water_electrical__room__in=room_in_area, 
                                                              water_electrical__year=time.year,
                                                              water_electrical__month=time.month)
            _list = _list.filter(is_delete=False)
            page = self.paginate_queryset(_list)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, public_id, format=None):
        try:
            queryset = Bill.objects.filter(Q(public_id=public_id) & Q(is_delete=False))
            if len(queryset) > 0:
                queryset = queryset.first()
                datas = request.data
                serializer = BillUpdateSerializer(queryset, data=datas, context={'request': request})
                if serializer.is_valid():
                    save = serializer.update(instance=queryset, validated_data=request.data)
                    if save:
                        return Response({'status': 'successful', 'notification' : 'Update successful!'}, status=status.HTTP_201_CREATED)
                print(serializer.errors)
                return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Bill Not Found!'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, public_id, format=None):
        try:
            queryset = Bill.objects.get(public_id=public_id)
            queryset.is_delete = True
            queryset.save()
            return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
        except:
            return Response({'status': 'fail', 'notification' : 'Bill not found!'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, public_id, **kwargs):
        try:
            queryset = Bill.objects.filter(Q(public_id=public_id) & Q(is_delete=False))
            if len(queryset) > 0:
                serializer = BillDetailSerializer(queryset.first())
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Bill not found!'}, status=status.HTTP_404_NOT_FOUND)

# ==========================================================

class PaidBillInAreaViewSet(viewsets.ModelViewSet):
    serializer_class = PaidBillInAreaSerializer

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
            month = self.request.GET.get('month',None)                    
            year = self.request.GET.get('year',None)
            month, year = self.check_month_year(month, year)
            list_area = Area.objects.all()
            data = list(list_area.values())
            for index, value in enumerate(list_area):
                room = Room.objects.filter(area=value)
                all_bill = Bill.objects.filter(water_electrical__room__in=room, 
                                                water_electrical__year=year,
                                                water_electrical__month=month)
                data[index]['total'] = all_bill.count()
                data[index]['paid'] = all_bill.filter(is_paid=True).count()
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
