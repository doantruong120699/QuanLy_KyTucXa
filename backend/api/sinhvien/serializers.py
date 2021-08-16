from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import *
from api.room.serializers import *
from api.serializers import FacultySerializer, ClassSerializer

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        # return ' '.join(data.values_list('name', flat=True)) # you change the representation style here.
        return data.values_list('name', flat=True)

class ProfileInListSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    my_class = ClassSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'avatar',
            'gender',
            'phone',
            'public_id',
            'faculty',
            'my_class'
        ]

class RoomSerializer(serializers.ModelSerializer):
    typeroom = TypeRoomSerializer(required=False)
    area = AreaSerializer(required=False)

    class Meta:
        model = Room
        fields = ['id', 'name', 'number_now', 'typeroom', 'area', 'status'] 

class ProfileSinhVienSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(required=False)
    my_class = ClassSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'birthday',
            'address',
            'identify_card',
            'gender',
            'phone',
            'created_at',
            'faculty',
            'my_class',
            # 'position',
            # 'area',
        ]
class SinhVienListSerializer(serializers.ModelSerializer):
    profile = ProfileInListSerializer(source='user_profile')
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'profile',
        ]


class ContractRegistationSerializer(serializers.ModelSerializer):
    # profile = ProfileSinhVienSerializer()
    room = RoomSerializer()
    class Meta:
        model = Contract
        fields = [
            'public_id',
            'room', 
            # 'start_at', 
            # 'end_at', 
            'payment_method', 
            'created_at',
            # 'profile',
            'is_expired',
        ] 
# =======================================================================

class RoomInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = [
            'name', 
            'slug',
            'number_now',
        ]

class FacultyBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = ["name"]

class ClassBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = ["name"]


class ProfileInListBillSerializer(serializers.ModelSerializer):
    faculty = FacultyBillSerializer(required=False)
    my_class = ClassBillSerializer(required=False)
    user = UserSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'user',
            'gender',
            'phone',
            'public_id',
            'faculty',
            'my_class'
        ]
   

class BillListSerializer(serializers.ModelSerializer):
    sinhvien_paid = ProfileInListBillSerializer(required=False)
    class Meta:
        model = Bill
        fields = [
            'public_id', 
            # 'water_electrical',
            'payment_method',
            'is_paid',
            'time_paid',
            'sinhvien_paid',
            'created_at',
        ]
        
class BillSerializer(serializers.ModelSerializer):
    # water_electrical = WaterElectricalInListSerializer(required=False)
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)
    sinhvien_paid = ProfileInListBillSerializer(required=False)
    class Meta:
        model = Bill
        fields = [
            'public_id', 
            # 'water_electrical',
            'payment_method',
            'is_paid',
            'time_paid',
            'sinhvien_paid',
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

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


class WaterElectricalInListSerializer(serializers.ModelSerializer):
    room = RoomInListSerializer()
    bill = BillListSerializer()
    class Meta:
        model = WaterElectrical
        fields = [
            'public_id',
            'room',
            'month',
            'year',
            'new_index_eclectrical',
            'new_index_water',
            'water_price',
            'electrical_price',
            'bill',
        ]

class WaterElectricalDetailSerializer(serializers.ModelSerializer):
    room = RoomInListSerializer()
    bill = BillSerializer()
    water_electrical_unit_price = WaterElectricalUnitPriceSerializer()
    class Meta:
        model = WaterElectrical
        fields = [
            'public_id',
            'room',
            'month',
            'year',
            'old_index_eclectrical',
            'new_index_eclectrical',
            'old_index_water',
            'new_index_water',
            'water_price',
            'electrical_price',
            'bill',
            'water_electrical_unit_price'
        ]
