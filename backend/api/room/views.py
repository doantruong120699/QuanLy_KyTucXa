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
import re
from .utils import *

class TypeRoomViewSet(viewsets.ModelViewSet):
    queryset = TypeRoom.objects.all()
    serializer_class = TypeRoomSerializer

    def get_queryset(self):
        return TypeRoom.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        type_room = list(TypeRoom.objects.values().order_by('id'))
        return JsonResponse(type_room, safe=False, status=status.HTTP_200_OK)

    def retrieve(self, request, **kwargs):
        try:
            queryset = TypeRoom.objects.get(slug=kwargs['slug'])
            serializer = TypeRoomSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Type Not Found'}, status=status.HTTP_404_NOT_FOUND)

class SchoolYearViewSet(viewsets.ModelViewSet):
    serializer_class = SchoolYearSerializer

    def get_queryset(self):
        return SchoolYear.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        school_year = list(SchoolYear.objects.values().order_by('id'))
        for index, value in enumerate(school_year):
            school_year[index]['label'] = str(school_year[index]['year_start'])+'-'+str(school_year[index]['year_end'])
        return JsonResponse(school_year, safe=False, status=status.HTTP_200_OK)
    
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset =  PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

    def get_queryset(self):
        return PaymentMethodSerializer.objects.all().order_by('id')

    def list(self, request, *args, **kwargs):
        payment_method = list(PaymentMethod.objects.values().order_by('id'))
        return JsonResponse(payment_method, safe=False, status=status.HTTP_200_OK)

class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomListSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyNhanSu]
    lookup_field = 'slug'

    def get_queryset(self):
        return Room.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return JsonResponse(serializer.data, safe=False)

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

    # get list all room 
    @action(methods=["GET"], detail=False, url_path="get_all_room", url_name="get_all_room")
    def get_all_room(self, request, *args, **kwargs):
        queryset = Room.objects.all()
        keyword = self.request.GET.get('keyword')
        if keyword and len(keyword) > 0:
            words = re.split(r"[-;,.\s]\s*", keyword)
            query = Q()
            for word in words:
                query |= Q(area__name__icontains=word) | Q(name__icontains=word)
                if word.isnumeric():
                    query |= Q(number_now=int(word))
            queryset=queryset.filter(query).distinct()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    # get list post room
    @action(methods=["GET"], detail=False, url_path="get_list_user_in_room", url_name="get_list_user_in_room")
    def get_list_user_in_room(self, request, *args, **kwargs):

        room = Room.objects.get(slug=kwargs['slug'])
        _sv = Profile.objects.filter(contract_profile__room=room)
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
        return JsonResponse(list_sv, safe=False, status=status.HTTP_200_OK)

    def getStage(self):
        today = date.today()
        stage1 = Stage.objects.filter(stage1_started_at__lte = today, stage1_ended_at__gte = today)
        stage2 = Stage.objects.filter(stage2_started_at__lte = today, stage2_ended_at__gte = today)
        stage3 = Stage.objects.filter(stage3_started_at__lte = today, stage3_ended_at__gte = today)
        if len(stage1) > 0:
            return (1, stage1)
        elif len(stage2) > 0:
            return (2, stage2)
        elif len(stage3) > 0:
            return (3, stage3)
        else:
            return (-1, None)            
    
    def getPermission(self, room):
        (stage, objects) = self.getStage()
        if stage != -1:
            obj = objects.first()
            # ==================
            semester = obj.semester
            school_year = obj.school_year
            
            pre_semester = 0
            
            if semester == '1':
                pre_semester = '3'
                school_year = school_year.previous_year
            elif semester == '2':
                pre_semester = '1'
            elif semester == '3':
                pre_semester = '2'
                
            pre_contract = Contract.objects.filter(
                semester=pre_semester, 
                school_year=school_year,
                # profile=user.user_profile,
                room__pk=room,
                is_accepted=True,
                is_delete=False,
            )
            now_contract = Contract.objects.filter(
                semester=semester, 
                school_year=school_year,
                # profile=user.user_profile,
                room__pk=room,
            )
            if stage == 1 and len(pre_contract) > 0:
                return 'registration_stage_1'
            
            elif stage == 2 and len(now_contract) > 0:
                return 'registration_stage_2'
            
            elif stage == 3:
                return 'registration_stage_3'
            
            else:
                return 'not_registration_time'
        else:
            return 'not_registration_time'

    def getPenddingRegistration(self, room):
        obj_room = Room.objects.get(pk=room)
        # print(obj_room)
        list_contract = Contract.objects.filter(room=obj_room, is_accepted=None, is_delete=False)
        return list_contract.count()

    @action(methods=["GET"], detail=False, url_path="get_list_room_in_area", url_name="get_list_room_in_area")
    def get_list_room_in_area(self, request, *args, **kwargs):
        try:
            area = kwargs['slug']
            queryset = Room.objects.filter(area__slug = area)
            keyword = self.request.GET.get('keyword')
            
            if keyword and len(keyword) > 0:
                words = re.split(r"[-;,.\s]\s*", keyword)
                query = Q()
                for word in words:
                    query |= Q(name__icontains=word)
                    if word.isnumeric():
                        query |= Q(number_now=int(word))
                queryset=queryset.filter(query).distinct()
            
            page = self.paginate_queryset(queryset)

            serializer = self.get_serializer(page, many=True)
            data = serializer.data
            for index, room in enumerate(data):
                data[index]['permission'] = self.getPermission(room['id'])
                data[index]['pendding'] = self.getPenddingRegistration(room['id'])
            return self.get_paginated_response(data)

        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)
        
    @action(methods=["GET"], detail=False, url_path="get_list_room_in_area_not_pagination", url_name="get_list_room_in_area_not_pagination")
    def get_list_room_in_area_not_pagination(self, request, *args, **kwargs):
        try:
            area = kwargs['slug']
            queryset = Room.objects.filter(area__slug = area)
            
            serializer = RoomListSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK) 

        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)


        # list_room = (Room.objects.all())  
        
class ContractViewSet(viewsets.ModelViewSet):
    serializer_class = ContractRegistationSerializer
    permission_classes = [IsAuthenticated, IsQuanLyTaiChinhAndSinhVien]
    lookup_field = 'public_id'
    
    def get_queryset(self):
        return Contract.objects.filter(profile=self.request.user.user_profile).order_by('-created_at')

    def get_permissions(self):
        if self.action == 'get_all_lesson':
            return [IsAuthenticated(), IsQuanLyTaiChinhAndSinhVien(),]
        return [IsAuthenticated(), IsQuanLyTaiChinhAndSinhVien(),]

    # ==== Get all contract of sinhvien ====
    def list(self, request, *args, **kwargs):
        queryset = Contract.objects.filter(profile=self.request.user.user_profile).order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = ContractRegistationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():     
            save = serializer.create(request.data)
            if save:
                return Response({'status': 'successful', 'notification' : 'Save successful!'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)

    # ==== Get detail contract ====
    def retrieve(self, request, **kwargs):
        try:
            queryset = Contract.objects.filter(public_id=kwargs['public_id']).first()
            serializer = ContractSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Contract Not Found'}, status=status.HTTP_404_NOT_FOUND)

    # ==== get list all contract ( filter by profile, is_accepted) ====
    @action(methods=["GET"], detail=False, url_path="get_all_contract", url_name="get_all_contract")
    def get_all_contract(self, request, *args, **kwargs):
        queryset = Contract.objects.filter(profile=self.request.user.user_profile).order_by('-created_at')
        q_search = self.request.GET.get('is_accepted')
        if q_search and len(q_search) > 0:
            queryset = queryset.filter(is_accepted=q_search)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

class ContractCoverRoomRegistationViewSet(viewsets.ModelViewSet):
    serializer_class = ContractCoverRoomRegistationSerializer
    permission_classes = [IsAuthenticated, IsQuanLyTaiChinhAndSinhVien]
    lookup_field = 'public_id'
    
    def get_queryset(self):
        return Contract.objects.filter(profile=self.request.user.user_profile).order_by('-created_at')

    def get_permissions(self):
        if self.action == 'get_all_lesson':
            return [IsAuthenticated(), IsQuanLyTaiChinhAndSinhVien(),]
        return [IsAuthenticated(), IsQuanLyTaiChinhAndSinhVien(),]

    # ==== Get all contract of sinhvien ====
    def list(self, request, *args, **kwargs):
        queryset = Contract.objects.filter(profile=self.request.user.user_profile, is_cover_room=True).order_by('-created_at')
        if q_search and len(q_search) > 0:
            queryset = queryset.filter(is_accepted=q_search)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = ContractCoverRoomRegistationSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():     
            save = serializer.create(request.data)
            if save:
                return Response({'status': 'successful', 'notification' : 'Save successful!'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)

    # ==== Get detail contract ====
    def retrieve(self, request, **kwargs):
        try:
            queryset = Contract.objects.filter(public_id=kwargs['public_id']).first()
            serializer = ContractSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Contract Not Found'}, status=status.HTTP_404_NOT_FOUND)

    # ==== get list all contract ( filter by profile, is_accepted) ====
    @action(methods=["GET"], detail=False, url_path="get_all_contract", url_name="get_all_contract")
    def get_all_contract(self, request, *args, **kwargs):
        queryset = Contract.objects.filter(profile=self.request.user.user_profile, is_cover_room=True).order_by('-created_at')
        q_search = self.request.GET.get('is_accepted')
        if q_search and len(q_search) > 0:
            queryset = queryset.filter(is_accepted=q_search)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

def getStage():
    today = date.today()
    stage1 = Stage.objects.filter(stage1_started_at__lte = today, stage1_ended_at__gte = today)
    stage2 = Stage.objects.filter(stage2_started_at__lte = today, stage2_ended_at__gte = today)
    stage3 = Stage.objects.filter(stage3_started_at__lte = today, stage3_ended_at__gte = today)
    if len(stage1) > 0:
        return (1, stage1)
    elif len(stage2) > 0:
        return (2, stage2)
    elif len(stage3) > 0:
        return (3, stage3)
    else:
        return (-1, None)      
    
class CheckStageViewSet(viewsets.ModelViewSet):
    
    def list(self, request, *args, **kwargs):
        (stage, obj) = getStage()
        data = {
            'stage_is_open' : True,
            'stage' : stage
        }
        if stage == -1:
            data['stage_is_open'] = False
        return JsonResponse(data, safe=False, status=status.HTTP_200_OK)
        
      

