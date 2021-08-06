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
import re
from django.http import JsonResponse
quanlytaichinh_group = 'quanlytaichinh_group'
quanlynhansu_group = 'quanlynhansu_group'
nhanvien_group = 'nhanvien_group'

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
            area = request.GET.get('area', '')
            
            month = self.request.GET.get('month',None)                    
            year = self.request.GET.get('year',None)
            month, year = self.check_month_year(month, year)
            
            area = Area.objects.filter(
                Q(name__icontains=area) |
                Q(slug=area)).first()
            # Number now in room >=0        
            room_in_area = Room.objects.filter(area=area).order_by('-id')
            all_bill = Bill.objects.filter(water_electrical__room__in=room_in_area, 
                                                              water_electrical__year=year,
                                                              water_electrical__month=month)
            list_room_add_json = []
            for bill in all_bill:
                list_room_add_json.append({'id': bill.water_electrical.room.pk, 'name': bill.water_electrical.room.name, 'isPaid' : bill.is_paid, 'public_id_water_electrical':bill.water_electrical.public_id, 'public_id_bill':bill.public_id})
            
            serializer = FinancalRoomInAreaSerializer(area)
            data_room = serializer.data
            data_room['room'] = list_room_add_json
            return Response(data_room, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

# =========================================================

class WaterElectricalViewSet(viewsets.ModelViewSet):
    serializer_class = WaterElectricalSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

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
    
    def check_permission(self, request):
        user = request.user
        user_group = [g.name for g in user.groups.all()]
        user_permission = [p.codename for p in user.user_permissions.all()]
        if quanlytaichinh_group in user_group:
            return True
        elif quanlynhansu_group in user_group or nhanvien_group in user_group:
            action = self.action
            if action == 'list' or action == 'retrieve':
                action = 'view'
            elif action == 'post':
                action = 'add'
            elif action == 'update':
                action = 'change'
            elif action == 'destroy':
                action = 'delete'

            required_action = action + '_waterelectrical'
            return required_action in user_permission
        else:
            return False
    
    def get_queryset(self):
        return WaterElectrical.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
            if self.check_permission(request):
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
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        if self.check_permission(request):
            serializer = WaterElectricalSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                if serializer.exist_validate(request.data):
                    save = serializer.create(request.data)
                    if save:
                        return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_201_CREATED)
                return Response({'status': 'fail', 'notification' : 'This room added water-electrical bill!'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)

    def update(self, request, public_id, format=None):
        try:
            if self.check_permission(request):
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
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            pass
        return Response({'status': 'fail', 'notification' : 'Water Electrical Not Found!'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, public_id, format=None):
        try:
            if self.check_permission(request):
                queryset = WaterElectrical.objects.get(public_id=public_id)
                queryset.delete()
                return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except:
            pass
        return Response({'status': 'fail', 'notification' : 'Water Electrical not found!'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, public_id, **kwargs):
        try:
            if self.check_permission(request):
                queryset = WaterElectrical.objects.get(public_id=public_id)
                serializer = WaterElectricalDetailSerializer(queryset)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            pass
        return Response({'status': 'fail', 'notification' : 'Water Electrical not found!'}, status=status.HTTP_404_NOT_FOUND)

    # get list all room 
    @action(methods=["GET"], detail=False, url_path="get_list_water_electrical_not_pagination", url_name="get_list_water_electrical_not_pagination")
    def get_list_water_electrical_not_pagination(self, request, *args, **kwargs):
        try:
            if self.check_permission(request):
                
                area = self.request.GET.get('area', None) 
                month = self.request.GET.get('month',None)                    
                year = self.request.GET.get('year',None)
                month, year = self.check_month_year(month, year)
                if area != None:
                    area = Area.objects.filter(Q(name=area) | Q(slug=area)) 
                else:
                    area = Area.objects.all()
                               
                room_in_area = Room.objects.filter(area__in=area).order_by('-id')
                _list = WaterElectrical.objects.filter(room__in=room_in_area, year=year, month=month)
                serializer = WaterElectricalDetailSerializer(_list, many=True)
                data = serializer.data
                for index, value in enumerate(_list):
                    # print(value.bill_water_electrical.all().first())
                    data[index]['isPaid'] = value.bill_water_electrical.all().first().is_paid
            
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

class BillViewSet(viewsets.ModelViewSet):
    serializer_class = BillSerializer
    permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

    def get_queryset(self):
        return Bill.objects.all().order_by('-created_at')

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
            area = self.request.GET.get('area', None) 
            month = self.request.GET.get('month',None)                    
            year = self.request.GET.get('year',None)
            month, year = self.check_month_year(month, year)
            if area != None:
                area = Area.objects.filter(Q(name=area) | Q(slug=area)) 
            else:
                area = Area.objects.all()
            
            room_in_area = Room.objects.filter(area__in=area).order_by('-id')
            _list = Bill.objects.filter(water_electrical__room__in=room_in_area, 
                                                              water_electrical__year=year,
                                                              water_electrical__month=month)
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

    # get list all room 
    @action(methods=["GET"], detail=False, url_path="get_bill_of_room", url_name="get_bill_of_room")
    def get_bill_of_room(self, request, *args, **kwargs):
        try:
            room = self.request.GET.get('room','') 
            month = self.request.GET.get('month',None)                    
            year = self.request.GET.get('year',None)
            month, year = self.check_month_year(month, year)
            
            room = Room.objects.filter(Q(slug=room)) 
            # room_in_area = Room.objects.filter(area__in=area).order_by('-id')
            _list = Bill.objects.filter(water_electrical__room__in=room, 
                                                              water_electrical__year=year,
                                                              water_electrical__month=month)
            _list = _list.filter(is_delete=False).order_by('created_at')
            if _list:
                serializer = BillDetailSerializer(_list, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : 'Room not have bill!'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    
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

# =======================================================

class TypeExpenseViewSet(viewsets.ModelViewSet):
    queryset = TypeExpense.objects.all()
    serializer_class = TypeExpenseSerializer

    def get_queryset(self):
        return TypeExpense.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        queryset = list(TypeExpense.objects.values().order_by('id'))
        return JsonResponse(queryset, safe=False, status=status.HTTP_200_OK)

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseListSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

    def check_permission(self, request):
        user = request.user
        user_group = [g.name for g in user.groups.all()]
        user_permission = [p.codename for p in user.user_permissions.all()]
        if quanlytaichinh_group in user_group:
            return True
        elif quanlynhansu_group in user_group:
            action = self.action
            if action == 'list' or action == 'retrieve':
                action = 'view'
            elif action == 'post':
                action = 'add'
            elif action == 'update':
                action = 'change'
            elif action == 'destroy':
                action = 'delete'

            required_action = action + '_expense'
            return required_action in user_permission
        else:
            return False
    
    def get_queryset(self):
        return Expense.objects.filter(is_delete=False).order_by('-created_at')
    
    def list(self, request, *args, **kwargs):
        try:
            if self.check_permission(request):
                _list = Expense.objects.filter(is_delete=False).order_by('-created_at')
                user_group = [g.name for g in request.user.groups.all()]
                if quanlynhansu_group in user_group:
                    _list = _list.filter(created_by=request.user)
                    
                keyword = self.request.GET.get('keyword')
                if keyword and len(keyword) > 0:
                    words = re.split(r"[-;,.\s]\s*", keyword)
                    query = Q()
                    for word in words:
                        query |= ( Q(name__icontains=word)| 
                                Q(type_expense__name__icontains=word) | 
                                Q(description__icontains=word) | 
                                Q(user_paid__user__first_name__icontains=word)| 
                                Q(user_paid__user__last_name__icontains=word)| 
                                Q(user_paid__user__username__icontains=word) )
                        if word.isnumeric():
                            query |= Q(price=int(word))
                            
                    _list=_list.filter(query).distinct()
                
                page = self.paginate_queryset(_list)
                if page is not None:
                    serializer = self.get_serializer(page, many=True)
                    return self.get_paginated_response(serializer.data)
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            if self.check_permission(request):
                serializer = ExpenseSerializer(data=request.data, context={'request': request})
                if serializer.is_valid():
                    save = serializer.create(request.data)
                    if save:
                        return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_201_CREATED)
                print(serializer.errors)
                return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'status': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)    

    def update(self, request, public_id, format=None):
        try:
            if self.check_permission(request):
                queryset = Expense.objects.filter(public_id=public_id, is_delete=False).first()
                if queryset:
                    datas = request.data
                    serializer = ExpenseUpdateSerializer(queryset, data=datas, context={'request': request})
                    if serializer.is_valid():
                            save = serializer.update(instance = queryset, validated_data = request.data)
                            if save:
                                return Response({'status': 'successful', 'notification' : 'Update successful!'}, status=status.HTTP_201_CREATED)
                    return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Expense Not Found!'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, public_id, format=None):
        try:
            if self.check_permission(request):
                queryset = Expense.objects.filter(public_id=public_id ,is_delete=False).first()
                if queryset:
                    queryset.is_delete = True
                    queryset.save()
                    return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            pass
        return Response({'status': 'fail', 'notification' : 'Expense not found!'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, public_id, **kwargs):
        try:
            if self.check_permission(request):
                queryset = Expense.objects.filter(public_id=public_id, is_delete=False).first()
                if queryset:
                    serializer = ExpenseDetailSerializer(queryset)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Expense not found!'}, status=status.HTTP_404_NOT_FOUND)

# ==========================================================

class TypeRevenueViewSet(viewsets.ModelViewSet):
    queryset = TypeRevenue.objects.all()
    serializer_class = TypeRevenueSerializer

    def get_queryset(self):
        return TypeRevenue.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        queryset = list(TypeRevenue.objects.values().order_by('id'))
        return JsonResponse(queryset, safe=False, status=status.HTTP_200_OK)

class RevenueViewSet(viewsets.ModelViewSet):
    serializer_class = RevenueSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

    def check_permission(self, request):
        user = request.user
        user_group = [g.name for g in user.groups.all()]
        user_permission = [p.codename for p in user.user_permissions.all()]
        if quanlytaichinh_group in user_group:
            return True
        elif quanlynhansu_group in user_group:
            action = self.action
            if action == 'list' or action == 'retrieve':
                action = 'view'
            elif action == 'post':
                action = 'add'
            elif action == 'update':
                action = 'change'
            elif action == 'destroy':
                action = 'delete'

            required_action = action + '_revenue'
            return required_action in user_permission
        else:
            return False
    
    def get_queryset(self):
        return Revenue.objects.filter(is_delete=False).order_by('-created_at')
    
    def list(self, request, *args, **kwargs):
        try:
            if self.check_permission(request):
                _list = Revenue.objects.filter(is_delete=False).order_by('-created_at')
                user_group = [g.name for g in request.user.groups.all()]
                if quanlynhansu_group in user_group:
                    _list = _list.filter(created_by=request.user)
                
                keyword = self.request.GET.get('keyword')
                if keyword and len(keyword) > 0:
                    words = re.split(r"[-;,.\s]\s*", keyword)
                    query = Q()
                    for word in words:
                        query |= ( Q(name__icontains=word)| 
                                Q(type_revenue__name__icontains=word) | 
                                Q(description__icontains=word) | 
                                Q(user_recieve__user__first_name__icontains=word)| 
                                Q(user_recieve__user__last_name__icontains=word)| 
                                Q(user_recieve__user__username__icontains=word) )
                        if word.isnumeric():
                            query |= Q(amount=int(word))
                            
                    _list=_list.filter(query).distinct()

                page = self.paginate_queryset(_list)
                if page is not None:
                    serializer = RevenueListSerializer(page, many=True)
                    return self.get_paginated_response(serializer.data)
                serializer = RevenueListSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            if self.check_permission(request):
                serializer = RevenueSerializer(data=request.data, context={'request': request})
                if serializer.is_valid():
                    save = serializer.create(request.data)
                    if save:
                        return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_201_CREATED)
                return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'status': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)    

    def update(self, request, public_id, format=None):
        try:
            if self.check_permission(request):
                queryset = Revenue.objects.filter(public_id=public_id, is_delete=False).first()
                if queryset:
                    datas = request.data
                    serializer = RevenueUpdateSerializer(queryset, data=datas, context={'request': request})
                    if serializer.is_valid():
                            save = serializer.update(instance = queryset, validated_data = request.data)
                            if save:
                                return Response({'status': 'successful', 'notification' : 'Update successful!'}, status=status.HTTP_201_CREATED)
                    return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Expense Not Found!'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, public_id, format=None):
        try:
            if self.check_permission(request):
                queryset = Revenue.objects.filter(public_id=public_id ,is_delete=False).first()
                if queryset:
                    queryset.is_delete = True
                    queryset.save()
                    return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            pass
        return Response({'status': 'fail', 'notification' : 'Revenue not found!'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, public_id, **kwargs):
        try:
            if self.check_permission(request):
                queryset = Revenue.objects.filter(public_id=public_id, is_delete=False).first()
                if queryset:
                    serializer = RevenueDetailSerializer(queryset)
                    return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Revenue not found!'}, status=status.HTTP_404_NOT_FOUND)

# ========================================================

class UserRecievePaidViewSet(viewsets.ModelViewSet):
    queryset = TypeExpense.objects.all()
    serializer_class = UserRecievePaidSerializer

    def list(self, request, *args, **kwargs):
        queryset = list(User.objects.filter((Q(groups__name='quanlynhansu_group')|
                                            Q(groups__name='quanlytaichinh_group')|
                                            Q(groups__name='nhanvien_group'))).distinct().values().order_by('id'))
        for i in range(len(queryset)):
            queryset[i].pop('password', None)
            queryset[i].pop('last_login', None)
            queryset[i].pop('is_superuser', None)
            queryset[i].pop('is_staff', None)
            queryset[i].pop('is_active', None)
            queryset[i].pop('date_joined', None)
            user = User.objects.get(pk=queryset[i]['id'])
            l = []
            for g in user.groups.all():
                l.append(g.name)
            per = []
            for p in user.user_permissions.all():
                per.append(p.codename)
            queryset[i]['group'] = l
            queryset[i]['permission'] = per

        return JsonResponse(queryset, safe=False, status=status.HTTP_200_OK)


class TotalRevenueExpense(viewsets.ModelViewSet):
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
        month = self.request.GET.get('month',None)                    
        year = self.request.GET.get('year',None)
        month, year = self.check_month_year(month, year)
        data = {}
        queryset_revenue = Revenue.objects.filter(time_recieve__month = month, time_recieve__year = year)
        total_revenue = 0
        for i in queryset_revenue:
            total_revenue = total_revenue + i.amount
        data['revenue'] = total_revenue
        
        queryset_expense = Expense.objects.filter(time_paid__month = month, time_paid__year = year)
        total_expense = 0
        for i in queryset_expense:
            total_expense = total_expense + i.price
        data['expense'] = total_expense
        
        return JsonResponse(data, safe=False, status=status.HTTP_200_OK)

