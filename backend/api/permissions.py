from rest_framework.permissions import BasePermission
from django.conf import settings


# Custom permission for users in group 'sinhvien_group'.
class IsSinhVien(BasePermission):
    """
    Allows access only to "sinhvien_group" group.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name=settings.GROUP_NAME['SINHVIEN']).exists()
# Custom permission for users in group 'nhanvien_group'.
class IsNhanVien(BasePermission):
    """
    Allows access only to "nhanvien_group" group.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name=settings.GROUP_NAME['NHANVIEN']).exists()
# Custom permission for users in group 'quanlynhansu_group'.
class IsQuanLyNhanSu(BasePermission):
    """
    Allows access only to "quanlynhansu_group" group.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name=settings.GROUP_NAME['QUANLYNHANSU']).exists()
# Custom permission for users in group 'quanlytaichinh_group'.
class IsQuanLyTaiChinh(BasePermission):
    """
    Allows access only to "quanlytaichinh_group" group.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name=settings.GROUP_NAME['QUANLYTAICHINH']).exists()

# Custom permission for users in group 'member_group' and 'coach_group'.
# class IsCoachMember(BasePermission):
#     """
#     Allows access only to "member_group", "coach_group" group.
#     """
#     def has_permission(self, request, view):
#         return request.user and request.user.groups.filter(name__in=[settings.GROUP_NAME['COACH'], settings.GROUP_NAME['MEMBER']]).exists()