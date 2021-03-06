
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

urlpatterns = [
    url(r'^auth/login/$', MyTokenObtainPairView.as_view()),
    # path('auth/register/', registration_view),    
    # path('auth/forgot-password/', forgot_password_view),
    # path('auth/resend-link-active/', resend_link_activation_view),
    # path('auth/active-account/', active_account_view),
    # path('auth/create-access-token/', create_access_token_view),
    # path('auth/reset-password/', reset_password_view),
]