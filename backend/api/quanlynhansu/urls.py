
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .views import *


# ========== Accept registration
list_registration_room = ContractRegistationViewSet.as_view({
    'get': 'list',
})

detail_registration_room = ContractRegistationViewSet.as_view({
    'get': 'retrieve',
})
# ========= Accept request registration ======
accept_registration_request = ContractRegistationViewSet.as_view({
    'post': 'post',
})
accept_list_request = ContractRegistationViewSet.as_view({
    'post': 'accept_list_request',
})

# ========= Deny request registration ======
deny_registration_request = ContractRegistationViewSet.as_view({
    'post': 'deny_request',
})
deny_list_request = ContractRegistationViewSet.as_view({
    'post': 'deny_list_request',
})
# ======== Delete user in room ========
delete_user_in_room = ContractRegistationViewSet.as_view({
    'delete': 'delete_user_in_room',
})
# =========== Schedule ===========
schedule = DailyScheduleViewSet.as_view({
    'post' : 'post',
})
# update_schedule = DailyScheduleViewSet.as_view({
#     'put' : 'update',
# })

# =========== Notification =========
# list - create
notification_list = NotificationViewSet.as_view({
    'get': 'list',
    'post': 'post'
})
# detail - update - delete
notification_detail = NotificationViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    # 'patch': 'partial_update',
    'delete': 'destroy'
})

# ========== Used room
# list 
used_room_in_area_list = UsedRoomInAreaViewSet.as_view({
    'get': 'list',
})
urlpatterns = [ 
    # ========== notification
    path('notifications/', notification_list, name = 'notification_list'),
    path('notifications/<str:public_id>/', notification_detail, name = 'notification_detail'),
    # ========= Request Registration
    path('list-registrations/', list_registration_room, name = 'list_registration_room'),
    path('registrations/<str:public_id>/', detail_registration_room, name = 'detail_registration_room'),
    # ========== Accept
    path('registrations/<str:public_id>/', accept_registration_request, name = 'accept_registration_request'),
    path('registrations/', accept_list_request, name = 'accept_list_request'),
    # ========== Deny
    path('deny-registrations/<str:public_id>/', deny_registration_request, name = 'deny_registration_request'),
    path('deny-registrations/', deny_list_request, name = 'deny_list_request'),
    # ========== Delete User in room
    path('delete-user-room/<str:public_id>/', delete_user_in_room, name = 'delete_user_in_room'),
    # ========== Schedule ========
    path('schedules/', schedule, name = 'schedule'),
    # path('schedules/<str:public_id>/', update_schedule, name = 'update_schedule'),
    # ========== room
    path('used-room-area/', used_room_in_area_list, name = 'used_room_in_area_list'),
]