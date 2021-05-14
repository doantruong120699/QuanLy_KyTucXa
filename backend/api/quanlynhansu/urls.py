
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .views import *


# ========== notification
list_notification = NotificationViewSet.as_view({
    'get': 'list',
})
detail_notification = NotificationViewSet.as_view({
    'get': 'retrieve',
})

# ========== Accept registration
list_registration_room = ContractRegistationViewSet.as_view({
    'get': 'list',
})

detail_registration_room = ContractRegistationViewSet.as_view({
    'get': 'retrieve',
})

accept_registration_request = ContractRegistationViewSet.as_view({
    'post': 'post',
})
accept_list_request = ContractRegistationViewSet.as_view({
    'post': 'accept_list_request',
})
# =========== Schedule ===========
schedule = DailyScheduleViewSet.as_view({
    'post' : 'post',
})
update_schedule = DailyScheduleViewSet.as_view({
    'put' : 'update',
})
urlpatterns = [ 
    # ========== notification
    path('notifications/', list_notification, name = 'list_notification'),
    path('notifications/<str:public_id>/', detail_notification, name = 'detail_notification'),
    # ===============
    path('list-registrations/', list_registration_room, name = 'list_registration_room'),
    path('registrations/<str:public_id>/', detail_registration_room, name = 'detail_registration_room'),
    path('registrations/<str:public_id>/', accept_registration_request, name = 'accept_registration_request'),
    path('registrations/', accept_list_request, name = 'accept_list_request'),
    # ========== Schedule ========
    path('schedules/', schedule, name = 'schedule'),
    path('schedules/<str:public_id>/', update_schedule, name = 'update_schedule'),
]