
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .views import *


# ========== Financal in room
# list 
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
# list - create
# water_electrical_list = WaterElectricalViewSet.as_view({
#     'get': 'list',
# })

# =========== water_electrical =========
# list - create
water_electrical_list = WaterElectricalViewSet.as_view({
    'get': 'list',
    'post': 'post'
})
# detail - update - delete
water_electrical_detail = WaterElectricalViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
# ========== Bill ================
# list - create
bill_list = BillViewSet.as_view({
    'get': 'list',
})
bill_of_room = BillViewSet.as_view({
    'get': 'get_bill_of_room',
})
# detail - update - delete
bill_detail = BillViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

# ========== Used room
# list 
paid_bill_in_area_list = PaidBillInAreaViewSet.as_view({
    'get': 'list',
})
# ========= 
type_expense_list = TypeExpenseViewSet.as_view({
    'get': 'list', # Get lists
})
# ========= Expense
expense_list = ExpenseViewSet.as_view({
    'get': 'list',
    'post': 'post'
})
# detail - update - delete
expense_detail = ExpenseViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
# ======== Revenue
type_revenue_list = TypeRevenueViewSet.as_view({
    'get': 'list', # Get lists
})
# ========= revenue
revenue_list = RevenueViewSet.as_view({
    'get': 'list',
    'post': 'post'
})
# detail - update - delete
revenue_detail = RevenueViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})
urlpatterns = [ 
    # ========== room
    path('financal-room-area/', financal_room_in_area_list, name = 'financal_room_in_area_list'),
    # ========== water electrical unit price
    path('water-electrical-unit-price/', list_unit_price, name = 'list_unit_price'),
    path('water-electrical-unit-price/<int:id>/', detail_unit_price, name = 'detail_unit_price'),
    # ========== Water electrical
    path('water-electricals/<slug:slug>/<str:time>/', water_electrical_list, name = 'water_electrical_list'),
    path('water-electricals/', water_electrical_list, name = 'water_electrical_list'),
    path('water-electricals/<str:public_id>/', water_electrical_detail, name = 'water_electrical_detail'),
    # ========== Bill
    path('bills/', bill_list, name = 'bill_list'),
    path('room-bills/', bill_of_room, name = 'bill_of_room'),
    path('bills/<str:public_id>/', bill_detail, name = 'bill_detail'),
    # 
    path('paid-bill-area/', paid_bill_in_area_list, name = 'paid_bill_in_area_list'),
    # 
    path('type-expense/', type_expense_list),
    # ========== expense
    path('expense/', expense_list, name = 'expense_list'),
    path('expense/<str:public_id>/', expense_detail, name = 'expense_detail'),
    # ========== revenue
    path('type-revenue/', type_revenue_list),
    path('revenue/', revenue_list, name = 'revenue_list'),
    path('revenue/<str:public_id>/', revenue_detail, name = 'revenue_detail'),
]