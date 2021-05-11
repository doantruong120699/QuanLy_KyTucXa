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

from api.models import *
from .serializers import *
from api.serializers import *
from api import status_http
from api.permissions import *
sinhvien_group = 'sinhvien_group'

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
        queryset = User.objects.filter(groups__name=sinhvien_group).order_by('id')

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
            contract = Contract.objects.filter(profile=queryset).first()
            data = {}        
            data['id'] = queryset.user.id
            data['email'] = queryset.user.email
            # Add username
            data['username'] = queryset.user.username
            data['first_name'] = queryset.user.first_name
            data['last_name'] = queryset.user.last_name
            data['room'] = contract.room.name
            data['slug-room'] = contract.room.slug

            profile = {}
            try:
                profile = ProfileSinhVienSerializer(queryset).data
            except Exception as e:
                print(e)
                pass
            data['profile'] = profile
            print(profile)
            #
            return Response(data, status=status.HTTP_200_OK) 


            # return Response(serializer.data)
        except Exception as e:
            print(e)
            return Response({'detail': 'Profile Not Found'}, status=status.HTTP_404_NOT_FOUND)

