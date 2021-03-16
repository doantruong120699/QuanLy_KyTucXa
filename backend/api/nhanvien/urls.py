
from django.conf.urls import url, include
from django.urls import path
import uuid
from rest_framework import permissions

from .views import *

nhanvien_list = NhanVienViewSet.as_view({
    'get': 'list', # Get lists
})

nhanvien_list_all = NhanVienViewSet.as_view({
    'get': 'get_all_nhanvien'
})

nhanvien_detail = NhanVienViewSet.as_view({
    'get': 'retrieve' # get detail
})

urlpatterns = [
    path('staffs/get-all-staff/', nhanvien_list, name = 'nhanvien_list'),
    path('staffs/<uuid:public_id>/', nhanvien_detail, name = 'nhanvien_detail'),
]