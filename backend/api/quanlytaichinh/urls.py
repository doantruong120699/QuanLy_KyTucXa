
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .views import *


# ========== room
# list - create
financal_room_in_area_list = FinancalRoomInAreaViewSet.as_view({
    'get': 'list',
})
# ========== Water Electrical Unit Price
list_unit_price = WaterElectricalUnitPriceViewSet.as_view({
    'get': 'list',
})
detail_unit_price = WaterElectricalUnitPriceViewSet.as_view({
    'get': 'retrieve',
})

urlpatterns = [ 
    # ========== room
    path('financal-room-area/<slug:slug>/<str:time>/', financal_room_in_area_list, name = 'financal_room_in_area_list'),
    # ========== water electrical unit price
    path('water-electrical-unit-price/', list_unit_price, name = 'list_unit_price'),
    path('water-electrical-unit-price/<int:id>/', detail_unit_price, name = 'detail_unit_price'),
]