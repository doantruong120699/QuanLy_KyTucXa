from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer
from datetime import date
from datetime import datetime
from api.room.serializers import UserSerializer

class NotificationListSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    class Meta:
        model = Notification
        fields = [
            'public_id',
            'created_by',
            'title',
            'content',
            'created_at',
            'last_update',
            'updated_by',
        ]




