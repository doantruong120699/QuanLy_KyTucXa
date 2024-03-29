from rest_framework import serializers
from django.contrib.auth.models import User
import datetime
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
from api.models import *
from api.serializers import AreaSerializer
from api.serializers import *
from api.room.serializers import *
from api.serializers import *
from api.sinhvien.serializers import *
from datetime import date
from datetime import datetime
from django.db.models import Q
required_message = 'This Field is required!'

class StringListField(serializers.ListField): # get from http://www.django-rest-framework.org/api-guide/fields/#listfield
    child = serializers.CharField()

    def to_representation(self, data):
        return data and data.values_list('name', flat=True)

class FinancalRoomInAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'name'] 

# =============================================

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
            'old_index_eclectrical',
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
                new_index_eclectrical= int(validated_data['new_index_eclectrical']),
                new_index_water=int(validated_data['new_index_water']),
                month = int(validated_data['month']),
                water_electrical_unit_price=water_electrical_unit_price,
                created_by=current_user
            )
            d = datetime.now()
            if 'year' in validated_data:
                year = int(validated_data['year'])
            else:
                year = d.year
            model.year = year
            # Old index this month = new index pre month
            month = int(validated_data['month'])
            if month == 1:
                water_electrical_pre_month = WaterElectrical.objects.filter(room=room, year=year-1,month=12)
            else:
                water_electrical_pre_month = WaterElectrical.objects.filter(room=room, year=year,month=month-1)
            if len(water_electrical_pre_month) == 0:
                model.old_index_water = 0
                model.old_index_eclectrical = 0
            else:
                model.old_index_water = water_electrical_pre_month.new_index_water
                model.old_index_eclectrical = water_electrical_pre_month.new_index_eclectrical
            model.save()
            type_service = TypeService.objects.filter(name="Điện Nước").first()
            bill = Bill.objects.create(
                public_id=shortuuid.uuid(),
                # water_electrical=model,
                created_by=current_user,
                type_service=type_service
            )
            # bill.save()
            model.bill = bill
            model.save()
            return True
        except Exception as e:
            print("WaterElectricalSerializer: ", e)
            pass
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            water_electrical_unit_price = WaterElectricalUnitPrice.objects.get(pk=validated_data['water_electrical_unit_price'])
            room = Room.objects.get(pk=validated_data['room'])

            instance.room = room
            instance.new_index_eclectrical = int(validated_data.get('new_index_eclectrical', instance.new_index_eclectrical))
            instance.new_index_water = int(validated_data.get('new_index_water', instance.new_index_water))
            instance.month = int(validated_data.get('month', instance.month))
            if 'year' in validated_data:
                year = int(validated_data['year'])
                instance.year = int(validated_data.get('year', instance.year))
            instance.water_electrical_unit_price = water_electrical_unit_price
            instance.updated_by = current_user

            instance.save()
            return True
        except Exception as e:
            print(e)
            return False

    def exist_validate(self, validated_data):
        month = self.validated_data['month']
        d = datetime.now()
        if 'year' in validated_data:
            year = validated_data['year']
        else:
            year = d.year
        room = Room.objects.get(pk=validated_data['room'])
        query = WaterElectrical.objects.filter(
            Q(room=room) & 
            Q(month=month)&
            Q(year=year)
        )
            
        if len(query) > 0:
            return False
        return True     

    def exist_update_validate(self, instance, validated_data):
        
        month = self.validated_data['month']
        d = datetime.now()
        if 'year' in validated_data:
            year = validated_data['year']
        else:
            year = d.year
        room = Room.objects.get(pk=validated_data['room'])

        if month == instance.month and year == instance.year and room == instance.room:
            return True
        else:
            query = WaterElectrical.objects.filter(
                Q(room=room) & 
                Q(month=month)&
                Q(year=year)
            )
                
            if len(query) > 0:
                return False
            return True     

    def validate(self, data):
        """
        validate data
        """
        if 'room' not in data:
            raise serializers.ValidationError({'room' : required_message})
        if 'water_electrical_unit_price' not in data:
            raise serializers.ValidationError({'water_electrical_unit_price' : required_message})
        return data

class WaterElectricalDetailSerializer(serializers.ModelSerializer):
    water_electrical_unit_price = WaterElectricalUnitPriceSerializer()
    room = RoomListByAreaSerializer()
    
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)
    class Meta:
        model = WaterElectrical
        fields = [
            'public_id',
            'room',
            # 
            'new_index_eclectrical',
            'old_index_eclectrical',
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

class RoomInListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = [
            'name', 
            'slug',
            'number_now',
        ]

class WaterElectricalInListSerializer(serializers.ModelSerializer):
    room = RoomInListSerializer()
    class Meta:
        model = WaterElectrical
        fields = [
            'public_id',
            'room',
            'month',
            'year',
            'water_price',
            'electrical_price',
        ]

# =====================================================

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
        
class ProfileStaffListBillSerializer(serializers.ModelSerializer):
    area = AreaSerializer(required=False)
    position = PositionSerializer(required=False)
    user = UserSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'user',
            'gender',
            'phone',
            'public_id',
            'area',
            'position'
        ]

class BillSerializer(serializers.ModelSerializer):
    # water_electrical = WaterElectricalInListSerializer()
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

class BillUpdateSerializer(serializers.ModelSerializer):
    # water_electrical = WaterElectricalInListSerializer(required=False)
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)
    # sinhvien_paid = UserSerializer(required=False)
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

    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            sinhvien_paid = Profile.objects.get(pk=validated_data['sinhvien_paid'])
            instance.is_paid = validated_data.get('is_paid', instance.is_paid)
            instance.time_paid = validated_data.get('time_paid', instance.time_paid)
            instance.sinhvien_paid = sinhvien_paid
            instance.updated_by = current_user
            instance.save()
            return True
        except Exception as e:
            print(e)
            return False

    def validate(self, data):
        """
        validate data
        """
        if 'is_paid' not in data:
            raise serializers.ValidationError({'is_paid' : required_message})
        if 'time_paid' not in data:
            raise serializers.ValidationError({'time_paid' : required_message})
        if 'sinhvien_paid' not in data:
            raise serializers.ValidationError({'sinhvien_paid' : required_message})
        return data

class BillDetailSerializer(serializers.ModelSerializer):
    # water_electrical = WaterElectricalDetailSerializer()
    payment_method = PaymentMethodSerializer()
    created_by = UserSerializer()
    updated_by = UserSerializer()
    sinhvien_paid = ProfileInListBillSerializer()
    class Meta:
        model = Bill
        fields = [
            'public_id', 
            # 'water_electrical',
            'payment_method',
            'is_paid',
            'sinhvien_paid',
            'time_paid',
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

# ===========================================================

class ProfileInListlSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    class Meta:
        model = Profile
        fields = [
            'user'
        ]

class PaidBillInAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'name', 'slug'] 

class TypeExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeExpense
        fields = [
            'id', 
            'name',
            'description',
            'slug'
        ] 

class ExpenseSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    
    price = serializers.IntegerField(required=True)
    time_paid = serializers.DateTimeField(required=True)
    
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Expense
        fields = [
            'public_id',
            'name',
            'type_expense',
            'description',
            'price',
            'user_paid',
            'time_paid',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            current_user = self._current_user()
            type_expense = TypeExpense.objects.get(pk=validated_data['type_expense'])
            user_paid = Profile.objects.get(pk=validated_data['user_paid'])
            
            model = Expense.objects.create(
                public_id=shortuuid.uuid(),
                name=validated_data['name'],
                type_expense=type_expense,
                price=validated_data['price'],
                user_paid = user_paid,
                time_paid=validated_data['time_paid'],
                created_by=current_user
            )
            if 'description' in validated_data:
                model.description = validated_data['description']
            model.save()
            return True
        except Exception as e:
            print(e)
            pass
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            water_electrical_unit_price = WaterElectricalUnitPrice.objects.get(pk=validated_data['water_electrical_unit_price'])
            room = Room.objects.get(pk=validated_data['room'])

            instance.room = room
            instance.new_index_eclectrical = validated_data.get('new_index_eclectrical', instance.new_index_eclectrical)
            instance.new_index_water = validated_data.get('new_index_water', instance.new_index_water)
            instance.month = validated_data.get('month', instance.month)
            
            instance.updated_by = current_user

            instance.save()
            return True
        except Exception as e:
            print(e)
            return False

    def validate(self, data):
        """
        validate data
        """
        if 'type_expense' not in data:
            raise serializers.ValidationError({'type_expense' : required_message})
        if 'user_paid' not in data:
            raise serializers.ValidationError({'user_paid' : required_message})
        return data

class ExpenseUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    
    price = serializers.IntegerField(required=False)
    time_paid = serializers.DateTimeField(required=False)
    
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Expense
        fields = [
            'public_id',
            'name',
            'type_expense',
            'description',
            'price',
            'user_paid',
            'time_paid',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            if 'type_expense' in validated_data:
                type_expense = TypeExpense.objects.get(pk=validated_data['type_expense'])
                instance.type_expense = type_expense
            if 'user_paid' in validated_data:
                user_paid = Profile.objects.get(pk=validated_data['user_paid'])
                instance.user_paid = user_paid
            
            instance.name = validated_data.get('name', instance.name)
            instance.description = validated_data.get('description', instance.description)
            instance.price = validated_data.get('price', instance.price)
            instance.price = validated_data.get('price', instance.price)
            instance.time_paid = validated_data.get('time_paid', instance.time_paid)
            
            instance.updated_by = current_user

            instance.save()
            return True
        except Exception as e:
            print(e)
            return False

class ExpenseListSerializer(serializers.ModelSerializer):
    type_expense = TypeExpenseSerializer()
    user_paid =ProfileInListlSerializer()
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Expense
        fields = [
            'public_id',
            'name',
            'type_expense',
            'description',
            'price',
            'user_paid',
            'time_paid',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

class ExpenseDetailSerializer(serializers.ModelSerializer):
    type_expense = TypeExpenseSerializer()
    user_paid =ProfileStaffListBillSerializer()
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Expense
        fields = [
            'public_id',
            'name',
            'type_expense',
            'description',
            'price',
            'user_paid',
            'time_paid',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]
        
# ==================================================================

class TypeRevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeRevenue
        fields = [
            'id', 
            'name',
            'description',
            'slug'
        ] 

class RevenueSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    
    amount = serializers.IntegerField(required=True)
    time_recieve = serializers.DateTimeField(required=True)
    
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Revenue
        fields = [
            'public_id',
            'name',
            'type_revenue',
            'description',
            'amount',
            'user_recieve',
            'time_recieve',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def create(self, validated_data):
        try:
            current_user = self._current_user()
            type_revenue = TypeRevenue.objects.get(pk=validated_data['type_revenue'])
            user_recieve = Profile.objects.get(pk=validated_data['user_recieve'])
            
            model = Revenue.objects.create(
                public_id=shortuuid.uuid(),
                name=validated_data['name'],
                type_revenue=type_revenue,
                amount=validated_data['amount'],
                user_recieve = user_recieve,
                time_recieve=validated_data['time_recieve'],
                created_by=current_user
            )
            if 'description' in validated_data:
                model.description = validated_data['description']
            model.save()
            return True
        except Exception as e:
            print(e)
            pass
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            water_electrical_unit_price = WaterElectricalUnitPrice.objects.get(pk=validated_data['water_electrical_unit_price'])
            room = Room.objects.get(pk=validated_data['room'])

            instance.room = room
            instance.new_index_eclectrical = validated_data.get('new_index_eclectrical', instance.new_index_eclectrical)
            instance.new_index_water = validated_data.get('new_index_water', instance.new_index_water)
            instance.month = validated_data.get('month', instance.month)
            
            instance.updated_by = current_user

            instance.save()
            return True
        except Exception as e:
            print(e)
            return False

    def validate(self, data):
        """
        validate data
        """
        if 'type_revenue' not in data:
            raise serializers.ValidationError({'type_revenue' : required_message})
        if 'user_recieve' not in data:
            raise serializers.ValidationError({'user_recieve' : required_message})
        return data

class RevenueUpdateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)
    
    amount = serializers.IntegerField(required=False)
    time_recieve = serializers.DateTimeField(required=False)
    
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Revenue
        fields = [
            'public_id',
            'name',
            'type_revenue',
            'description',
            'amount',
            'user_recieve',
            'time_recieve',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]

    def _current_user(self):
        request = self.context.get('request', None)
        if request:
            return request.user
        return False

    def update(self, instance, validated_data):
        try:
            current_user = self._current_user()
            if 'type_revenue' in validated_data:
                type_revenue = TypeRevenue.objects.get(pk=validated_data['type_revenue'])
                instance.type_revenue = type_revenue
            if 'user_recieve' in validated_data:
                user_recieve = Profile.objects.get(pk=validated_data['user_recieve'])
                instance.user_recieve = user_recieve
            
            instance.name = validated_data.get('name', instance.name)
            instance.description = validated_data.get('description', instance.description)
            instance.amount = validated_data.get('amount', instance.amount)
            instance.time_recieve = validated_data.get('time_recieve', instance.time_recieve)
            
            instance.updated_by = current_user

            instance.save()
            return True
        except Exception as e:
            print(e)
            return False

class RevenueListSerializer(serializers.ModelSerializer):
    type_revenue = TypeRevenueSerializer()
    user_recieve =ProfileInListlSerializer()
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Revenue
        fields = [
            'public_id',
            'name',
            'type_revenue',
            'description',
            'amount',
            'user_recieve',
            'time_recieve',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]
        
class RevenueDetailSerializer(serializers.ModelSerializer):
    type_revenue = TypeRevenueSerializer()
    user_recieve =ProfileStaffListBillSerializer()
    created_by = UserSerializer(required=False)
    updated_by = UserSerializer(required=False)

    class Meta:
        model = Revenue
        fields = [
            'public_id',
            'name',
            'type_revenue',
            'description',
            'amount',
            'user_recieve',
            'time_recieve',
            # 
            'created_at',
            'last_update',
            'created_by',
            'updated_by',
        ]
        
        
# ====================================================================

class UserRecievePaidSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']
 




