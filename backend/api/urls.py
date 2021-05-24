
from django.conf.urls import url, include
from django.urls import path

from rest_framework import permissions

from .serializers import *
from .views import *
                        
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

faculty_list = FacultyViewSet.as_view({
    'get': 'list', # Get lists
})

class_list = ClassViewSet.as_view({
    'get': 'list', # Get lists
})

position_list = PositionViewSet.as_view({
    'get': 'list', # Get lists
})

area_list = AreaViewSet.as_view({
    'get': 'list', # Get lists
})

urlpatterns = [
    url(r'^auth/login/$', MyTokenObtainPairView.as_view()),
    path('auth/forgot-password/', forgot_password_view),
    path('auth/forgot-password/<uidb64>/<token>', reset_password_view, name='reset_password'),

    # user
    path('account/get-user-profile/', get_profile_view),
    path('account/update-user-profile/', update_user_profile_view),
    path('account/change-password/', change_password_view),
    # Static data
    path('faculty/', faculty_list),
    path('class/', class_list),
    path('position/', position_list),
    path('area/', area_list),
    
    path('', include('api.sinhvien.urls')), 
    path('', include('api.nhanvien.urls')), 
    path('', include('api.room.urls')), 
    path('', include('api.quanlytaichinh.urls')), 
    path('', include('api.quanlynhansu.urls')), 
    # path('', include('api.students_of_coach.urls')),
]