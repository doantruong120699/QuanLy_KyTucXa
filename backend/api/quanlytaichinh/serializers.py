from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer
from api.serializers import *
from api.room.serializers import *
from datetime import date
from datetime import datetime

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        return data and data.values_list('name', flat=True)

class FinancalRoomInAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'name'] 

class WaterElectricalUnitPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterElectricalUnitPrice
        fields = [
            'id', 
            'name',
            'water_unit_price_level1',
            'water_unit_price_level2',
            'water_unit_price_level3',
            'water_unit_price_level4',
            'electrical_unit_price_level1',
            'electrical_unit_price_level2',
            'electrical_unit_price_level3',
            'electrical_unit_price_level4',
            'electrical_unit_price_level5',
            'electrical_unit_price_level6',
            'created_at',
            'last_update',
        ] 

class WaterElectricalSerializer(serializers.ModelSerializer):
    public_id = serializers.CharField(required=False)

    new_index_eclectrical = serializers.IntegerField(required=True)
    new_index_water = serializers.IntegerField(required=True)

    month = serializers.IntegerField(required=True)
    year = serializers.IntegerField(required=False)
    
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)
    class Meta:
        model = WaterElectrical
        fields = [
            'public_id',
            'room',
            # 
            'new_index_eclectrical',
            'old_index_electrical',
            # 
            'new_index_water',
            'old_index_water',
            # 
            'month',
            'year',
            # 
            'water_electrical_unit_price',
            # 
            'water_price',
            'electrical_price',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

    # Get current user login

    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            current_user = self._current_user()
            room = Room.objects.get(pk=validated_data['room'])
            water_electrical_unit_price = WaterElectricalUnitPrice.objects.get(pk=validated_data['water_electrical_unit_price'])
            model = WaterElectrical.objects.create(
                public_id=shortuuid.uuid(),
                room=room,
                new_index_eclectrical=validated_data['new_index_eclectrical'],
                new_index_water=validated_data['new_index_water'],
                month = validated_data['month'],
                water_electrical_unit_price=validated_data['water_electrical_unit_price'],
                created_by=current_user
            )
            d = datetime.datetime.now()
            if 'year' in validated_data:
                year = validated_data['year']
            else:
                year = d.year
            model.year = year
            # Old index this month = new index pre month
            month = validated_data['month']
            if month == 1:
                water_electrical_pre_month = WaterElectrical.objects.filter(room=room, year=year-1,month=12)
            else:
                water_electrical_pre_month = WaterElectrical.objects.filter(room=room, year=year,month=month-1)
            model.old_index_water = water_electrical_pre_month.new_index_water
            model.old_index_electrical = water_electrical_pre_month.new_index_eclectrical

            model.save()
            return True
        except:
            pass
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            instance.title = validated_data.get('title', instance.title)
            instance.content = validated_data.get('content', instance.content)
            instance.is_display = validated_data.get('is_display', instance.is_display)
            print(current_user)
            instance.updated_by = current_user
            instance.save()
            return True
        except Exception as e:
            print(e)
            return False


