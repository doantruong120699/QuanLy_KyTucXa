
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .views import *


# ========== room
# list - create
# financal_room_in_area_list = FinancalRoomInAreaViewSet.as_view({
#     'get': 'list',
# })

urlpatterns = [ 
    # ========== room
    # path('financal-room-area/<slug:slug>/<str:time>/', financal_room_in_area_list, name = 'financal_room_in_area_list'),
]