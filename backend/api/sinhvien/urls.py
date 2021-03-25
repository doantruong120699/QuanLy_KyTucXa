
from django.conf.urls import url, include
from django.urls import path
import uuid
from rest_framework import permissions

from .views import *

sinhvien_list = SinhVienViewSet.as_view({
    'get': 'list', # Get lists
})

sinhvien_detail = SinhVienViewSet.as_view({
    'get': 'retrieve' # get detail
})

urlpatterns = [
    path('students/get-all-student/', sinhvien_list, name = 'sinhvien_list'),
    path('students/<uuid:public_id>/', sinhvien_detail, name = 'sinhvien_detail'),
]