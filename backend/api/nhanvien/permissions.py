from rest_framework.permissions import BasePermission


# Custom permission for users with "is_active" = True.
class IsActive(BasePermission):
    """
    Allows access only to "is_active" users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_active