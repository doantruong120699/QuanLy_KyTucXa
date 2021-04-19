from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer
from datetime import date
from datetime import datetime

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        return data and data.values_list('name', flat=True)

class FinancalRoomInAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'is_paid'] 



