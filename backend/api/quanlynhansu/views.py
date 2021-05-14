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

    def retrieve(self, request, **kwargs):
        try:
            noti = Notification.objects.get(public_id=kwargs['public_id'])
            serializer = NotificationListSerializer(noti)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'detail': 'Notification Not Found'}, status=status.HTTP_404_NOT_FOUND)

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
                regis_request.is_expried = False
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
                        regis_request.is_expried = False
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
                




