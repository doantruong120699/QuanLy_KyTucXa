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


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationListSerializer
    # permission_classes = [IsAuthenticated, IsQuanLyTaiChinh]
    lookup_field = 'public_id'

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
        serializer = NotificationListSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            save = serializer.create(request.data)
            if save:
                return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, public_id, format=None):
        try:
            queryset = Notification.objects.get(public_id=public_id)
            datas = request.data
            serializer = NotificationListSerializer(queryset, data=datas, context={'request': request})
            if serializer.is_valid():
                save = serializer.save()
                if save:
                    return Response({'status': 'successful', 'notification' : 'Create successful!'}, status=status.HTTP_200_OK)
            return Response({'status': 'fail', 'notification' : list(serializer.errors.values())[0][0]}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'status': 'fail', 'notification' : 'Not Found Notification!'}, status=status.HTTP_404_NOT_FOUND)
    
    def destroy(self, request, public_id, format=None):
        try:
            queryset = Notification.objects.get(public_id=public_id)
            queryset.delete()
            return Response({'status': 'successful', 'notification' : 'Delete successful!'}, status=status.HTTP_200_OK)
        except:
            return Response({'status': 'fail', 'notification' : 'Notification not found!'}, status=status.HTTP_404_NOT_FOUND)

    def retrieve(self, request, **kwargs):
        try:
            noti = Notification.objects.get(public_id=kwargs['public_id'])
            serializer = NotificationListSerializer(noti)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'status': 'fail', 'notification' : 'Notification not found!'}, status=status.HTTP_404_NOT_FOUND)

class ContractRegistationViewSet(viewsets.ModelViewSet):
    serializer_class = ContractRegistationSerializer
    permission_classes = [IsAuthenticated, IsQuanLyNhanSu]
    lookup_field = 'public_id'

    def get_queryset(self):
        return Contract.objects.all().order_by('-created_at')

    def list(self, request, *args, **kwargs):
        try:
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
                regis_request.is_accepted = True
                regis_request.is_expired = False
                regis_request.save()
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
         
    # ==== Deny List Request ====
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
                    if 'public_id' in obj and obj['public_id']:
                        try:
                            query = DailySchedule.objects.get(public_id=obj['public_id'])
                            if 'title' in obj:
                                title = obj['title']
                                query.title = title
                                
                            if 'content' in obj:
                                content = obj['content']
                                query.content = content
                            
                            if 'staff' in obj:
                                staff = User.objects.get(pk=obj['staff'])
                                query.staff = staff
                                  
                            query.updated_by = request.user
                            query.save()
                        except Exception as ex:
                            print(ex)
                            errors = {}
                            errors['id_schedule'] = obj['public_id']
                            errors['message'] = str(ex)
                            data.append(errors)
                    else:
                        x = DailyScheduleSerializer(data=obj, context={'request': request})
                        if x.is_valid():
                            x.create(user=request.user, validated_data=obj, week=week, year=year)
                        else:
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
                count_full = 0
                for i in room:
                    number_max = i.typeroom.number_max
                    if number_max == i.number_now :
                        count_full = count_full + 1
                data[index]['total'] = room.count()
                data[index]['full'] = count_full
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Area Not Found'}, status=status.HTTP_404_NOT_FOUND)



