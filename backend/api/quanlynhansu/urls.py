
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .views import *


# ========== Accept registration
list_registration_room = ContractRegistationViewSet.as_view({
    'get': 'list',
})
list_contract_filter = ContractRegistationViewSet.as_view({
    'get': 'list_contract_filter'
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
# =========== Notification =========
# list - create
notification_list = NotificationViewSet.as_view({
    'get': 'list',
    'post': 'post'
})
notification_student_list = NotificationViewSet.as_view({
    'get': 'get_noti_student',
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
# ========== List Permission
permission_list = GroupPermissionViewSet.as_view({
    'get': 'list',
})
permission_information_list = GroupPermissionViewSet.as_view({
    'get': 'get_permission_infomation',
})
# =========== Profile =========
# list - create
profile_list = UserProfileViewSet.as_view({
    'get': 'list',
    'post': 'post'
})
# detail - update - delete
profile_detail = UserProfileViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    # 'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [ 
    # ========== notification
    path('notifications/', notification_list, name = 'notification_list'),
    path('student-notifications/', notification_student_list, name = 'notification_student_list'),
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
    # ========== Lisst contract filter
    path('list-contract/', list_contract_filter, name = 'list_contract_filter'),
    # ========== Schedule ========
    path('schedules/', schedule, name = 'schedule'),
    # path('schedules/<str:public_id>/', update_schedule, name = 'update_schedule'),
    # ========== room
    path('used-room-area/', used_room_in_area_list, name = 'used_room_in_area_list'),
    # =========== Permission
    path('permission/', permission_list, name = 'permission_list'),
    path('permission-and-information/', permission_information_list, name = 'permission_information_list'),
    # ========== notification
    path('admin/account/', profile_list, name = 'profile_list'),
    path('admin/account/<str:public_id>/', profile_detail, name = 'profile_detail'),
]