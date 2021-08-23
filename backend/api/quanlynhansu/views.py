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
import shortuuid
import re
from django.contrib.contenttypes.models import ContentType
quanlynhansu_group = 'quanlynhansu_group'
quanlytaichinh_group = 'quanlytaichinh_group'


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationListSerializer
    # permission_classes = [IsAuthenticated]
    lookup_field = 'public_id'
        
    def check_permission(self, request):
        user = request.user
        user_group = [g.name for g in user.groups.all()]
        user_permission = [p.codename for p in user.user_permissions.all()]
        if self.action == 'list':
            return request.user.is_authenticated
        else:
            if quanlynhansu_group in user_group:
                return True
            else:
                action = self.action
                if action == 'post':
                    action = 'add'
                elif action == 'update':
                    action = 'change'
                elif action == 'destroy':
                    action = 'delete'
                elif action == 'get_noti_student' or action == 'retrieve':
                    action = 'view'    
                required_action = action + '_notification'
                return required_action in user_permission

    def get_queryset(self):
        return Notification.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
            list_notification = Notification.objects.all().order_by('-created_at')
            page = self.paginate_queryset(list_notification)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        if self.check_permission(request):
            serializer = NotificationListSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                save = serializer.create(request.data)
                if save:
                    return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        
    def update(self, request, public_id, format=None):
        if self.check_permission(request):
            try:
                user_group = [g.name for g in request.user.groups.all()]
                queryset = Notification.objects.get(public_id=public_id)
                datas = request.data
                serializer = NotificationListSerializer(queryset, data=datas, context={'request': request})
                if quanlynhansu_group not in user_group:
                    if queryset.created_by != request.user:
                        return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
                    else:
                        pass
                if serializer.is_valid():
                    save = serializer.save()
                    if save:
                        return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_200_OK)
                return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
            except:
                pass
            return Response({'status': 'fail', 'notification' : 'Not Found Notification!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        
    def destroy(self, request, public_id, format=None):
        if self.check_permission(request):
            try:
                user_group = [g.name for g in request.user.groups.all()]
                queryset = Notification.objects.get(public_id=public_id)
                if quanlynhansu_group not in user_group:
                    if queryset.created_by == request.user:
                        queryset.delete()
                    else:
                        return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
                else:
                    queryset.delete()
                return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
            except Exception as e:
                print(e)
                pass
            return Response({'status': 'fail', 'notification' : 'Notification not found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            pass
        return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
    
    def retrieve(self, request, **kwargs):
        try:
            if self.check_permission(request):
                noti = Notification.objects.get(public_id=kwargs['public_id'])
                serializer = NotificationListSerializer(noti)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Notification not found!'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=["GET"], detail=False, url_path="get_noti_student", url_name="get_noti_student")
    def get_noti_student(self, request, *args, **kwargs):
        try:
            if self.check_permission(request):
                list_notification = Notification.objects.filter(created_by=request.user).order_by('-created_at')
                page = self.paginate_queryset(list_notification)
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

class ContractRegistationViewSet(viewsets.ModelViewSet):
    serializer_class = ContractRegistationSerializer
    permission_classes = [IsAuthenticated, IsQuanLyNhanSu]
    lookup_field = 'public_id'

    def get_queryset(self):
        return Contract.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
            # room = request.GET.get('room', None)
            # if room != None:
            #     obj_room = Room.objects.get(slug=room)
            #     _list = Contract.objects.filter(room=obj_room).exclude(is_expired=True)
            #     serializer = ContractRegistationSerializer(_list, many=True)
            #     return Response(serializer.data, status=status.HTTP_200_OK)
            # return Response({}, status=status.HTTP_200_OK)
            
            list_registration_room = Contract.objects.filter(is_accepted = None)
            page = self.paginate_queryset(list_registration_room)
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

    def post(self, request, **kwargs):
        try:
            regis_request = Contract.objects.get(public_id=kwargs['public_id'])
            if regis_request.is_accepted != None:
                return Response({'detail': 'This Request accepted!'}, status=status.HTTP_200_OK)
            else:
                if (regis_request.room.number_now < regis_request.room.typeroom.number_max):
                    regis_request.is_accepted = True
                    regis_request.is_expired = False
                    regis_request.save()
                    if regis_request.is_cover_room == True:
                        regis_request.room.number_now = regis_request.room.type_room.number_max
                    else:
                        regis_request.room.number_now = regis_request.room.number_now + 1
                    regis_request.room.save()
                    return Response({'detail': 'Accept Successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
        return Response({'detail': 'Accept Fail'}, status=status.HTTP_404_NOT_FOUND)

    # ==== Accept List Request ====
    @action(methods=["POST"], detail=False, url_path="accept_list_request", url_name="accept_list_request")
    def accept_list_request(self, request, *args, **kwargs):
        try:
            serializer = ListRequestSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                list_request = serializer.data.get('list_request')
                data = {}
                data['status'] = 'All Successful!'
                data_accepted = []
                data_room_full = []
                for index, pub_id in enumerate(list_request):
                    regis_request = Contract.objects.get(public_id=pub_id)
                    if regis_request.is_accepted != None:
                        data_accepted.append(pub_id)
                    else:
                        regis_request.is_accepted = True
                        regis_request.is_expired = False
                        if regis_request.room.number_now < 8:
                            regis_request.room.number_now = regis_request.room.number_now + 1
                            regis_request.room.save()
                            regis_request.save()
                        else:
                            data_room_full.append(pub_id)
                if len(data_accepted) > 0:
                    data['status'] = 'Some error!'
                    data['request-accepted'] = data_accepted
                if len(data_room_full) > 0:
                    data['status'] = 'Some error!'
                    data['room-full'] = data_room_full
                return Response({'response': data}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            pass
        return Response({'detail': 'Error!'}, status=status.HTTP_400_BAD_REQUEST)

    # ==== Deny List Request ====
    @action(methods=["POST"], detail=False, url_path="deny_request", url_name="deny_request")
    def deny_request(self, request, *args, **kwargs):
        try:
            regis_request = Contract.objects.get(public_id=kwargs['public_id'])
            if regis_request.is_accepted != None:
                return Response({'detail': 'This Request denied!'}, status=status.HTTP_200_OK)
            else:
                regis_request.is_accepted = False
                regis_request.is_expired = True
                regis_request.save()

                return Response({'detail': 'Deny Successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Deny Fail'}, status=status.HTTP_404_NOT_FOUND)

    # ==== Deny List Request ====
    @action(methods=["POST"], detail=False, url_path="deny_list_request", url_name="deny_list_request")
    def deny_list_request(self, request, *args, **kwargs):
        try:
            serializer = ListRequestSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                list_request = serializer.data.get('list_request')
                data = {}
                data['status'] = 'All Successful!'
                data_denied = []
                for index, pub_id in enumerate(list_request):
                    regis_request = Contract.objects.get(public_id=pub_id)
                    if regis_request.is_accepted != None:
                        data_denied.append(pub_id)
                    else:
                        regis_request.is_accepted = False
                        regis_request.is_expired = True
                        regis_request.save()
                if len(data_denied) > 0:
                    data['status'] = 'Some error!'
                    data['request-denied'] = data_denied
                return Response({'response': data}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            pass
        return Response({'detail': 'Error!'}, status=status.HTTP_400_BAD_REQUEST)
         
    # ==== delete user in room ====
    @action(methods=["DELETE"], detail=False, url_path="delete_user_in_room", url_name="delete_user_in_room")
    def delete_user_in_room(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(public_id=kwargs['public_id'])
            contract = Contract.objects.filter(profile=profile, is_expired=False, is_delete=False).first()
            contract.is_delete = True
            contract.is_expired = True
            contract.room.number_now = contract.room.number_now - 1 
            contract.save()
            contract.room.save()
            return Response({'detail': 'Delete Successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
        return Response({'detail': 'Sinh Vien not Found!'}, status=status.HTTP_404_NOT_FOUND)
     
class ListContractViewSet(viewsets.ModelViewSet):
    serializer_class = ContractRegistationSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyNhanSu]
    lookup_field = 'public_id'
    
    def check_permission(self, request):
        user = request.user
        user_group = [g.name for g in user.groups.all()]
        if quanlynhansu_group in user_group:
            return True
        elif quanlytaichinh_group in user_group:
            action = self.action
            if action == 'list_contract_filter' or action == 'retrieve':
                return True
        return False
    
    def retrieve(self, request, **kwargs):
        try:
            if (self.check_permission(request)):
                request_regis = Contract.objects.get(public_id=kwargs['public_id'])
                serializer = ContractRegistationSerializer(request_regis)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'status': 'fail', 'notification' : "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            print(e)
            return Response({'detail': 'Request Not Found'}, status=status.HTTP_404_NOT_FOUND)
    
    # ==== List contract =======
    @action(methods=["GET"], detail=False, url_path="list_contract_filter", url_name="list_contract_filter")
    def list_contract_filter(self, request, *args, **kwargs):
        try:
            if (self.check_permission(request)):
                list_contract_room = Contract.objects.all()
                
                is_expired = request.GET.get('is_expired', None)
                if is_expired != None:
                    list_contract_room = list_contract_room.filter(is_expired=is_expired)
                                
                id_user = request.GET.get('id_user', None)
                if id_user != None:
                    list_contract_room = list_contract_room.filter(profile__public_id=id_user)
                room = request.GET.get('room', None)
                if room != None:
                    list_contract_room = list_contract_room.filter(Q(room__name=id_user) | Q(room__slug=id_user))
                
                page = self.paginate_queryset(list_contract_room)
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
            
class DailyScheduleViewSet(viewsets.ModelViewSet):
    serializer_class = DailyScheduleSerializer
    permission_classes = [IsAuthenticated, IsQuanLyNhanSu]
    lookup_field = 'public_id'

    def get_queryset(self):
        return DailySchedule.objects.all().order_by('-created_at')

    def retrieve(self, request, **kwargs):
        try:
            request_regis = Contract.objects.get(public_id=kwargs['public_id'])
            serializer = ContractRegistationSerializer(request_regis)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Request Not Found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        try:
            serializer = DailyScheduleListSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                week = serializer.data['week']
                if 'year' not in serializer.data:
                    year = datetime.now().year
                else:
                    year = serializer.data['year']
                data = []
                schedule = serializer.data['schedule']
                for obj in schedule:
                    if 'shift' in obj:
                        sche = DailySchedule.objects.filter(week=week, year=year, shift__order=obj['shift'])
                        if len(sche) > 0:
                            try:
                                s = sche.first()
                                if 'title' in obj:
                                    title = obj['title']
                                    s.title = title
                                    
                                if 'content' in obj:
                                    content = obj['content']
                                    s.content = content
                                
                                if 'staff' in obj:
                                    staff = User.objects.get(pk=obj['staff'])
                                    s.staff = staff
                                    
                                s.updated_by = request.user
                                s.save()
                            except Exception as ex:
                                print(ex)
                                errors = {}
                                errors['id_shift'] = obj['shift']
                                errors['message'] = str(ex)
                                data.append(errors)
                        else:
                            x = DailyScheduleSerializer(data=obj, context={'request': request})
                            if x.is_valid():
                                x.create(user=request.user, validated_data=obj, week=week, year=year)
                            else:
                                # print("===")
                                errors = {}
                                errors['id_shift'] = obj['shift']
                                errors['message'] = list(x.errors.values())[0][0]
                                data.append(errors)
                if data:
                    return Response({'status': 'Some error', 'notification' : data}, status=status.HTTP_201_CREATED)    
                else:
                    return Response({'status': 'successful'}, status=status.HTTP_201_CREATED)    
            return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'status': 'fail', 'notification' : 'Bad request!'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, public_id, *args, **kwargs):
        try:
            dailySchedule = DailySchedule.objects.get(public_id=public_id)
            serializer = DailyScheduleUpdateSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():             
                update = serializer.update(validated_data=request.data, instance=dailySchedule)
                if update:
                    return Response({'status': 'successful', 'notification' : 'Update successful!'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)        
        except Exception as e:
            print(e)  
            return Response({'status': 'fail', 'notification' : 'Error'}, status=status.HTTP_400_BAD_REQUEST)

class UsedRoomInAreaViewSet(viewsets.ModelViewSet):
    serializer_class = UsedRoomInAreaSerializer

    def get_queryset(self):
        return Area.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
            list_area = Area.objects.all()
            data = list(list_area.values())
            for index, value in enumerate(list_area):
                room = Room.objects.filter(area=value)
                total = 0
                count_full = 0
                for i in room:
                    number_max = i.typeroom.number_max
                    total = total + number_max
                    count_full = count_full + i.number_now
                    # if number_max == i.number_now :
                    #     count_full = count_full + 1
                data[index]['total'] = total
                data[index]['full'] = count_full
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)

# =========================================================

class GroupPermissionViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def list(self, request, *args, **kwargs):
        try:
            queryset = Group.objects.all()
            list_group = GroupSerializer(queryset, many=True)
            
            list_table = [
                            'user',
                            'profile',
                            'room', 
                            'contract', 
                            'notification', 
                            'dailyschedule', 
                            'waterelectrical', 
                            'bill', 
                            'service',
                            'expense',
                            'revenue'
            ]
            list_content_type = []
            for index, value in enumerate(list_table):
                if value == 'user':
                    val_content_type = ContentType.objects.get(app_label="auth", model="user")
                else:
                    val_content_type = ContentType.objects.get(app_label="api", model=value)
                list_content_type.append(val_content_type)
            
            queryset = Permission.objects.filter(content_type_id__in = list_content_type).order_by('content_type_id')
            list_permission = PermissionSerializer(queryset, many=True)
            return Response({'group': list_group.data, 'permission':list_permission.data}, status=status.HTTP_200_OK)
        except:
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)
       
    @action(methods=["GET"], detail=False, url_path="get_permission_infomation", url_name="get_permission_infomation")
    def get_permission_infomation(self, request, *args, **kwargs):
        try:
            data = {}
            queryset = Group.objects.all()
            list_group = GroupSerializer(queryset, many=True)
            list_table = [
                            'user',
                            'profile',
                            'room', 
                            'contract', 
                            'notification', 
                            'dailyschedule', 
                            'waterelectrical', 
                            'bill', 
                            'service',
                            'expense',
                            'revenue'
            ]
            list_content_type = []
            for index, value in enumerate(list_table):
                if value == 'user':
                    val_content_type = ContentType.objects.get(app_label="auth", model="user")
                else:
                    val_content_type = ContentType.objects.get(app_label="api", model=value)
                list_content_type.append(val_content_type)
            
            queryset = Permission.objects.filter(content_type_id__in = list_content_type).order_by('content_type_id')
            list_permission = PermissionSerializer(queryset, many=True)
            data['group'] = list_group.data
            data['permission'] = list_permission.data
            
            faculty = list(Faculty.objects.values().order_by('id'))
            data['faculty'] = faculty
            my_class = list(Class.objects.values().order_by('id'))
            data['class'] = my_class
            area = list(Area.objects.values().order_by('id'))
            data['area'] = area
            position = list(Position.objects.values().order_by('id'))
            data['position'] = position          
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)
     
class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileListSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def list(self, request, *args, **kwargs):
        try:
            queryset = Profile.objects.filter(is_delete=False).order_by('-pk')
            keyword = self.request.GET.get('keyword')
            if keyword and len(keyword) > 0:
                words = re.split(r"[-;,.\s]\s*", keyword)
                query = Q()
                for word in words:
                    query |= Q(user__first_name__icontains=word)
                    query |= Q(user__last_name__icontains=word)
                    query |= Q(user__email__icontains=word)
                queryset=queryset.filter(query).distinct()
            
            page = self.paginate_queryset(queryset)
            serializer = self.get_serializer(page, many=True)
            data = serializer.data
            for index, value in enumerate(data):
                group_list = []
                user = User.objects.get(email=value['user']['email'])
                for g in user.groups.all():
                    group_dic = {}
                    group_dic['id'] = g.pk
                    group_dic['name'] = g.name
                    group_list.append(group_dic)
                    
                permission_list = []
                for p in user.user_permissions.all():
                    permission_dic = {}
                    permission_dic['id'] = p.pk
                    permission_dic['name'] = p.name
                    permission_dic['content_type_id'] = p.content_type_id
                    permission_dic['codename'] = p.codename
                    permission_list.append(permission_dic)
                    
                data[index]['user']['group_list'] = group_list
                data[index]['user']['permission_list'] = permission_list
            return self.get_paginated_response(data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        serializer = UserProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            if serializer.add_validate(data=request.data):
                save = serializer.create(request.data)
                if save:
                    return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_201_CREATED)
        try:
            print("try")
            return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({'status': 'fail', 'notification' : list(list(serializer.errors.values())[0].values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, public_id, format=None):
        # try:
            queryset = Profile.objects.filter(public_id=public_id, is_delete=False)
            if len(queryset) > 0:
                profile = queryset.first()
                datas = request.data
                serializer = UserProfileSerializer(instance=profile.user, data=datas, context={'request': request})
                if serializer.is_valid():
                    save = serializer.save()
                    if save:
                        return Response({'status': 'successful', 'notification' : 'Update successful!'}, status=status.HTTP_200_OK)
                return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        # except Exception as e:
        #     print("Error main update: ", e)
        # return Response({'status': 'fail', 'notification' : 'Not Found Profile!'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, public_id, format=None):
        try:
            queryset = Profile.objects.filter(public_id=public_id, is_delete=False)
            if len(queryset) > 0:
                query = queryset.first()
                query.is_delete = True
                query.save()
                return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            pass
        return Response({'status': 'fail', 'notification' : 'Profile not found!'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, **kwargs):
        try:
            queryset = Profile.objects.filter(public_id=kwargs['public_id'], is_delete=False)
            if len(queryset) > 0:
                profile = queryset.first()
                serializer = ProfileListSerializer(profile)
                data = serializer.data
                group_list = []
                for g in profile.user.groups.all():
                    group_dic = {}
                    group_dic['id'] = g.pk
                    group_dic['name'] = g.name
                    group_list.append(group_dic)
                    
                permission_list = []
                for p in profile.user.user_permissions.all():
                    permission_dic = {}
                    permission_dic['id'] = p.pk
                    permission_dic['name'] = p.name
                    permission_dic['content_type_id'] = p.content_type_id
                    permission_dic['codename'] = p.codename
                    permission_list.append(permission_dic)
                    
                data['user']['group_list'] = group_list
                data['user']['permission_list'] = permission_list
                
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Profile not found!'}, status=status.HTTP_404_NOT_FOUND)

    @action(methods=["GET"], detail=False, url_path="count_profile", url_name="count_profile")
    def count_profile(self, request, *args, **kwargs):
        try:
            queryset = User.objects.filter(is_active=True).exclude(is_superuser=True)
            keyword = self.request.GET.get('keyword')
            if keyword and len(keyword) > 0:
                words = re.split(r"[-;,.\s]\s*", keyword)
                query = Q()
                for word in words:
                    query |= Q(first_name__icontains=word)
                    query |= Q(last_name__icontains=word)
                    query |= Q(email__icontains=word)
                queryset=queryset.filter(query).distinct()
            
            return Response({'number_user': queryset.count()}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Bad Request!'}, status=status.HTTP_400_BAD_REQUEST)
   
# =====================================================

class StageRegistrationViewset(viewsets.ModelViewSet):
    serializer_class = StageSerializer
    permission_classes = [IsAuthenticated, IsQuanLyNhanSu]
    lookup_field = 'public_id'

    def get_queryset(self):
        return Stage.objects.all().order_by('created_at')
    
    def list(self, request, **kwargs):
        try:
            _list = Stage.objects.all().order_by('created_at')
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
        pass
        # try:
        #     request_regis = Contract.objects.get(public_id=kwargs['public_id'])
        #     serializer = ContractRegistationSerializer(request_regis)
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # except Exception as e:
        #     print(e)
        #     return Response({'detail': 'Request Not Found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        try:
            serializer = StageSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                stage = Stage.objects.filter(semester = serializer.validated_data['semester'], school_year= serializer.validated_data['school_year'])
                if len(stage) > 0:
                    return Response({'status': 'fail', 'notification' : "Đã mở đăng ký ở học kỳ này!"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    serializer.save()
                    # Reset data rooms
                    all_room = Room.objects.all()
                    for room in all_room:
                        room.number_now = 0
                        room.is_cover_room = False
                        room.save()
                    return Response({'status': 'success'}, status=status.HTTP_200_OK) 
            else:
                return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Bad request!'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, id, *args, **kwargs):
        try:
            stage = Stage.objects.get(pk=id)
            serializer = StageSerializer(data=request.data, context={'request': request}, instance=stage)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'success'}, status=status.HTTP_200_OK) 
            else:
                return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
        return Response({'status': 'fail', 'notification' : 'Stage not Found!'}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, id):
        try:
            queryset = Stage.objects.get(id=id)
            queryset.delete()
            return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            pass
        return Response({'status': 'fail', 'notification' : 'Stage not found!'}, status=status.HTTP_404_NOT_FOUND)

