
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

shift_list = ShiftViewSet.as_view({
    'get': 'list', # Get lists
})

shift_detail = ShiftViewSet.as_view({
    'get': 'retrieve',
})


schedule_list = DailyScheduleViewSet.as_view({
    'get': 'list', # Get lists
})

schedule_detail = DailyScheduleViewSet.as_view({
    'get': 'retrieve',
})


urlpatterns = [
    path('staffs/get-all-staff/', nhanvien_list, name = 'nhanvien_list'),
    path('staffs/<uuid:public_id>/', nhanvien_detail, name = 'nhanvien_detail'),
    # ========== shift
    path('shifts/', shift_list, name = 'shift_list'),
    path('shifts/<slug:slug>/', shift_detail, name = 'shift_detail'),
    # ========== shift
    path('daily-schedules/<int:week>/', schedule_list, name = 'schedule_list'),
    path('daily-schedules/<str:public_id>/', schedule_detail, name = 'schedule_detail'),
]