from rest_framework.permissions import BasePermission
from django.conf import settings
from django.db.models import Q


# Custom permission for users in group 'sinhvien_group'.
class IsSinhVien(BasePermission):
    """
    Allows access only to "sinhvien_group" group.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name=settings.GROUP_NAME['SINHVIEN']).exists()