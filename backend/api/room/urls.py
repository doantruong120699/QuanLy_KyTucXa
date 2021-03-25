
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .views import *


# ========== room
# list - create
room_list = RoomViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
# get all room
room_get_all = RoomViewSet.as_view({
    'get': 'get_all_room'
})
# get room post
room_get_post = RoomViewSet.as_view({
    'get': 'get_room_post'
})
# detail - update - delete
room_detail = RoomViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    # 'patch': 'partial_update',
    'delete': 'destroy'
})
list_user_in_room = RoomViewSet.as_view({
    'get' : 'get_list_user_in_room',
})

urlpatterns = [
    # ========== room
    path('rooms/get-all/', room_get_all, name = 'room_get_all'),
    path('rooms/<slug:slug>/', room_detail, name = 'room_detail_slug'),
    path('rooms/user/<slug:slug>/', list_user_in_room, name = 'list_user_in_room'),
]