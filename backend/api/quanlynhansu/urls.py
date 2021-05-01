
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

urlpatterns = [ 
    # ========== notification
    path('notifications/', list_notification, name = 'list_notification'),
    path('notifications/<str:public_id>/', detail_notification, name = 'detail_notification'),
]