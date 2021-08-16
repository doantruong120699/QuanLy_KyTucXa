
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
# ====== DashBoard ======
dashboard = SinhVienViewSet.as_view({
    'get':'dashboard'
})
# ====== List contract of sinh vien ====
contract_list = ContractRegistationViewSet.as_view({
    'get': 'list', # Get lists
})

contract_detail = ContractRegistationViewSet.as_view({
    'get': 'retrieve' # get detail
})
# =====================
water_electrical_list = BillViewSet.as_view({
    'get': 'list', # Get lists
})

water_electrical_detail = BillViewSet.as_view({
    'get': 'retrieve' # get detail
})

urlpatterns = [
    path('students/get-all-student/', sinhvien_list, name = 'sinhvien_list'),
    path('students/<uuid:public_id>/', sinhvien_detail, name = 'sinhvien_detail'),
    path('dashboard/', dashboard, name = 'dashboard'),
    #  Contract student
    path('students/get-all-contract/', contract_list, name = 'contract_list'),
    path('students/contract/<str:public_id>/', contract_detail, name = 'contract_detail'),
    # =========
    path('students/water-electrical/', water_electrical_list, name = 'water_electrical_list'),
    path('students/water-electrical/<str:public_id>/', water_electrical_detail, name = 'water_electrical_detail'),
]