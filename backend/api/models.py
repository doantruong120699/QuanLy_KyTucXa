from django.db import models
from django.contrib.auth.models import User
from vietnam_provinces import Province, District, Ward
from vietnam_provinces.enums import ProvinceEnum
import uuid
from model_utils import Choices
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string
import shortuuid
import datetime

def unique_slugify(instance, slug):
    model = instance.__class__
    unique_slug = slug
    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = slug + get_random_string(length=4)
    return unique_slug

class Faculty(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.CharField(max_length=200, null=True, unique=True)  
    class Meta:
        ordering = ('id',)
    
    def __str__(self):
        return self.name

class Class(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.CharField(max_length=200, null=True, unique=True)  
    class Meta:
        ordering = ('id',)
    
    def __str__(self):
        return self.name

class Position(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.CharField(max_length=200, null=True, unique=True)  
    class Meta:
        ordering = ('id',)
    
    def __str__(self):
        return self.name

class Area(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.CharField(max_length=200, null=True, unique=True)  

    class Meta:
        ordering = ('id',)
    
    def __str__(self):
        return self.name
class Profile(models.Model):
    user = models.OneToOneField(User,related_name = 'user_profile', on_delete=models.CASCADE, primary_key=True)
    public_id = models.UUIDField(default=uuid.uuid4, editable=False)
    birthday = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    identify_card = models.CharField(max_length=200, null=True, blank=True)
    gender = models.BooleanField(default=True, blank=True, null=True)
    phone = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    faculty = models.ForeignKey(Faculty, related_name = 'faculty_profile', on_delete=models.SET_NULL, blank=True, null=True)
    my_class = models.ForeignKey(Class, related_name = 'class_profile', on_delete=models.SET_NULL, blank=True, null=True)
    position = models.ForeignKey(Position, related_name = 'position_profile', on_delete=models.SET_NULL, blank=True, null=True)
    area = models.ForeignKey(Area, related_name = 'area_profile', on_delete=models.SET_NULL, blank=True, null=True)
    token = models.CharField(max_length=100, null=True)

    class Meta:
        ordering = ('user',)

    def __str__(self):
        return self.user.email

# =====================================

class TypeRoom(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.PositiveIntegerField(default=0)  
    number_max = models.PositiveIntegerField(default=8) 
    slug = models.CharField(max_length=200, null=True, unique=True)  

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.name
class Room(models.Model):
    STATUS = Choices(
        ('A', _('Available')),
        ('F', _('Full')),
        ('UA', _('Unavailable')),
    )
    name = models.CharField(max_length=200, null=True, blank=True)
    slug = models.CharField(max_length=255, null=True, unique=True)
    number_now = models.PositiveIntegerField(default=0)  
    typeroom = models.ForeignKey(TypeRoom, related_name = 'type_room', on_delete=models.SET_NULL, blank=True, null=True)
    area = models.ForeignKey(Area, related_name = 'area_room', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    status = models.CharField(choices=STATUS, max_length=10, null=True, blank=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, slugify(self.name))
        super().save(*args, **kwargs)

# =========================================

class PaymentMethod(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    bank_number = models.CharField(max_length=200, null=True, blank=True)
    class Meta:
        ordering = ('id',)

    def __str__(self):
        return self.name

class Contract(models.Model):
    public_id = models.UUIDField(default=uuid.uuid4, editable=False)
    room = models.ForeignKey(Room, related_name = 'contract_room', on_delete=models.SET_NULL, blank=True, null=True)
    profile = models.ForeignKey(Profile, related_name = 'contract_profile', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_by = models.ForeignKey(User, related_name = 'contract_created_by', on_delete=models.CASCADE, blank=True, null=True)
    updated_by = models.ForeignKey(User, related_name = 'contract_updated_by', on_delete=models.CASCADE, blank=True, null=True)
    start_at = models.DateField(null=True, blank=True)
    end_at = models.DateField(null=True, blank=True)
    payment_method = models.ForeignKey(PaymentMethod, related_name = 'contract_payment_method', on_delete=models.SET_NULL, blank=True, null=True)
    
    is_accepted = models.BooleanField(null=True, blank=True)
    is_expired = models.BooleanField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    price = models.FloatField(default=0)
    is_paid = models.BooleanField(null=True)


    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return self.profile.user.username + ' - ' + self.room.name

# =========================================

class Notification(models.Model):
    public_id = models.CharField(max_length=100, null=True, blank=True, default=shortuuid.uuid(), unique=True)
    created_by = models.ForeignKey(User, related_name = 'notification_created_by', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    updated_by = models.ForeignKey(User, related_name = 'notification_updated_by', on_delete=models.CASCADE, blank=True, null=True)
    is_display = models.BooleanField(default=True, null=True, blank=True)

    def __str__(self):
        return self.title
#  Ca truc
class Shift(models.Model):
    WEEKDAYS = Choices(
        ('Mon', _('Monday')),
        ('Tue', _('Tuesday')),
        ('Wed', _('Wednesday')),
        ('Thu', _('Thursday')),
        ('Fri', _('Friday')),
        ('Sat', _('Saturday')),
        ('Sun', _('Sunday')),
    )
    name = models.CharField(max_length=100, null=True, blank=True)
    weekdays = models.CharField(choices=WEEKDAYS, max_length=10, null=True, blank=True)
    start_at = models.TimeField(null=True, blank=True)
    end_at = models.TimeField(null=True, blank=True)
    slug = models.CharField(max_length=255, null=True, unique=True)

    ORDER_CHOICES = []
    for r in range(1, 22):
        ORDER_CHOICES.append((r,r))
    order = models.IntegerField(_('order'), choices=ORDER_CHOICES, null=True, blank=True)

    class Meta:
        ordering = ('order',)

    def __str__(self):
        return self.name + ' - ' +  self.get_weekdays_display()

class DailySchedule(models.Model):
    public_id = models.CharField(max_length=100, null=True, blank=True, default=shortuuid.uuid(), unique=True)
    created_by = models.ForeignKey(User, related_name = 'schedule_created_by', on_delete=models.CASCADE, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    updated_by = models.ForeignKey(User, related_name = 'schedule_updated_by', on_delete=models.CASCADE, blank=True, null=True)
    # 
    YEAR_CHOICES = []
    for r in range(2010, (datetime.datetime.now().year+1)):
        YEAR_CHOICES.append((r,r))

    WEEk_CHOICES = []
    d = (datetime.datetime.now().isocalendar()[1])
    for r in range(d, 53):
        WEEk_CHOICES.append((r,r))

    week = models.IntegerField(_('week'), choices=WEEk_CHOICES, default=datetime.datetime.now().isocalendar()[1] + 1)
    year = models.IntegerField(_('year'), choices=YEAR_CHOICES, default=datetime.datetime.now().year)
    title = models.CharField(max_length=100, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    shift = models.ForeignKey(Shift, related_name = 'schedule_shift', on_delete=models.CASCADE, blank=True, null=True)
    staff = models.ForeignKey(User, related_name = 'daily_schedule_staff', on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.title + ' (week:  ' + str(self.week) + ' - ' + str(self.shift) + ' - ' + str(self.staff.username) + ')'

# ============================================
class WaterElectricalUnitPrice(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    # 
    water_unit_price_level1 = models.PositiveIntegerField(default=0, null=True, blank=True)
    water_unit_price_level2 = models.PositiveIntegerField(default=0, null=True, blank=True)
    water_unit_price_level3 = models.PositiveIntegerField(default=0, null=True, blank=True)
    water_unit_price_level4 = models.PositiveIntegerField(default=0, null=True, blank=True)
    # 
    electrical_unit_price_level1 = models.PositiveIntegerField(default=0, null=True, blank=True)
    electrical_unit_price_level2 = models.PositiveIntegerField(default=0, null=True, blank=True)
    electrical_unit_price_level3 = models.PositiveIntegerField(default=0, null=True, blank=True)
    electrical_unit_price_level4 = models.PositiveIntegerField(default=0, null=True, blank=True)
    electrical_unit_price_level5 = models.PositiveIntegerField(default=0, null=True, blank=True)
    electrical_unit_price_level6 = models.PositiveIntegerField(default=0, null=True, blank=True)
    # 
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name

class WaterElectrical(models.Model):
    public_id = models.CharField(max_length=100, null=True, blank=True, default=shortuuid.uuid(), unique=True)
    room = models.ForeignKey(Room, related_name = 'water_electrical_room', on_delete=models.SET_NULL, blank=True, null=True)
    # 
    new_index_eclectrical = models.PositiveIntegerField(default=0, null=True, blank=True)
    old_index_electrical = models.PositiveIntegerField(default=0, null=True, blank=True)
    # 
    new_index_water = models.PositiveIntegerField(default=0, null=True, blank=True)
    old_index_water = models.PositiveIntegerField(default=0, null=True, blank=True)
    # 
    # Only yyyy-mm
    # time = models.DateField(max_length=50, null=True, blank=True) 
    d = datetime.datetime.now()
    YEAR_CHOICES = []
    for r in range(d.year - 1, d.year + 1):
        YEAR_CHOICES.append((r,r))

    MONTH_CHOICES = []
    for r in range(d.month - 1, 13):
        MONTH_CHOICES.append((r,r))

    month = models.IntegerField(_('month'), choices=MONTH_CHOICES, default=datetime.datetime.now().isocalendar()[1] + 1)
    year = models.IntegerField(_('year'), choices=YEAR_CHOICES, default=datetime.datetime.now().year)
    # 
    # water_unit_price = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)
    # electrical_unit_price = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)
    water_electrical_unit_price = models.ForeignKey(WaterElectricalUnitPrice, related_name = 'water_electrical_unit_price', on_delete=models.SET_NULL, blank=True, null=True)
    # 
    water_price = models.PositiveIntegerField(default=0, null=True, blank=True)
    electrical_price = models.PositiveIntegerField(default=0, null=True, blank=True)
    # 
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_by = models.ForeignKey(User, related_name = 'water_electrical_created_by', on_delete=models.CASCADE, blank=True, null=True)
    updated_by = models.ForeignKey(User, related_name = 'water_electrical_updated_by', on_delete=models.CASCADE, blank=True, null=True)

    def save(self, *args, **kwargs):
        # Electrical Price:
        electrical = (self.new_index_eclectrical - self.old_index_electrical)
        if electrical <= 50:
            self.electrical_price = electrical*self.water_electrical_unit_price.electrical_unit_price_level1

        elif electrical > 50 and electrical <= 100:
            self.electrical_price = 50*self.water_electrical_unit_price.electrical_unit_price_level1 + (electrical-50)*self.water_electrical_unit_price.electrical_unit_price_level2

        elif electrical > 100 and electrical <= 200:
            self.electrical_price = 50*self.water_electrical_unit_price.electrical_unit_price_level1 + 50*self.water_electrical_unit_price.electrical_unit_price_level2 + (electrical-100)*self.water_electrical_unit_price.electrical_unit_price_level3
        
        elif electrical > 200 and electrical <= 300:
            self.electrical_price = 50*self.water_electrical_unit_price.electrical_unit_price_level1 + 50*self.water_electrical_unit_price.electrical_unit_price_level2 + 100*self.water_electrical_unit_price.electrical_unit_price_level3 + (electrical-200)*self.water_electrical_unit_price.electrical_unit_price_level4
        
        elif electrical > 300 and electrical <= 400:
            self.electrical_price = 50*self.water_electrical_unit_price.electrical_unit_price_level1 + 50*self.water_electrical_unit_price.electrical_unit_price_level2 + 100*self.water_electrical_unit_price.electrical_unit_price_level3 + 100*self.water_electrical_unit_price.electrical_unit_price_level4 + (electrical-300)*self.water_electrical_unit_price.electrical_unit_price_level5

        else:
            self.electrical_price = 50*self.water_electrical_unit_price.electrical_unit_price_level1 + 50*self.water_electrical_unit_price.electrical_unit_price_level2 + 100*self.water_electrical_unit_price.electrical_unit_price_level3 + 100*self.water_electrical_unit_price.electrical_unit_price_level4 + 100*self.water_electrical_unit_price.electrical_unit_price_level5 + (electrical-400)*self.water_electrical_unit_price.electrical_unit_price_level6

        # Water Price
        water = (self.new_index_water - self.old_index_water)/1000
        level = water//10 + 1
        if level == 1:
            self.water_price = water*self.water_electrical_unit_price.water_unit_price_level1 
        
        elif level == 2:
            self.water_price = 10*self.water_electrical_unit_price.water_unit_price_level1 + (water-10)*self.water_electrical_unit_price.water_unit_price_level2
        
        elif level == 3:    
            self.water_price = 10*self.water_electrical_unit_price.water_unit_price_level1 + 10*self.water_electrical_unit_price.water_unit_price_level2  + (water-20)*self.water_electrical_unit_price.water_unit_price_level3
        
        else:
            self.water_price = 10*self.water_electrical_unit_price.water_unit_price_level1 + 10*self.water_electrical_unit_price.water_unit_price_level2  + 10*self.water_electrical_unit_price.water_unit_price_level3  + (water-30)*self.water_electrical_unit_price.water_unit_price_level4
        super().save(*args, **kwargs)

    def __str__(self):
        return self.room.name + ' - (' + str(self.month) + '/' + str(self.year) + ') - ' + str(self.water_price)  + ' - ' + str(self.electrical_price) 

class Bill(models.Model):
    public_id = models.CharField(max_length=100, null=True, blank=True, default=shortuuid.uuid(), unique=True)
    water_electrical = models.ForeignKey(WaterElectrical, related_name = 'bill_water_electrical', on_delete=models.SET_NULL, blank=True, null=True)

    payment_method = models.ForeignKey(PaymentMethod, related_name = 'bill_payment_method', on_delete=models.SET_NULL, blank=True, null=True)
    is_paid = models.BooleanField(default=False)

    sinhvien_paid = models.ForeignKey(Profile, related_name = 'bill_sinhvien_paid', on_delete=models.CASCADE, blank=True, null=True)
    time_paid = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_by = models.ForeignKey(User, related_name = 'bill_created_by', on_delete=models.CASCADE, blank=True, null=True)
    updated_by = models.ForeignKey(User, related_name = 'bill_updated_by', on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.water_electrical.room.name + ' - ' + str(self.is_paid)

class Service(models.Model):
    public_id = models.CharField(max_length=100, null=True, blank=True, default=shortuuid.uuid(), unique=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True) 
    price = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)
    
class TypeExpense(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True) 
    slug = models.CharField(max_length=200, null=True, unique=True)  

class Expense(models.Model):
    public_id = models.CharField(max_length=100, null=True, blank=True, default=shortuuid.uuid(), unique=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    type_expense = models.ForeignKey(TypeExpense, related_name = 'type_expense', on_delete=models.CASCADE, blank=True, null=True)
    description = models.TextField(null=True, blank=True) 
    price = models.DecimalField(decimal_places=2, max_digits=20, default=0.00)
    user_paid = models.ForeignKey(Profile, related_name = 'expense_user_paid', on_delete=models.CASCADE, blank=True, null=True)
    time_paid = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    last_update = models.DateTimeField(auto_now=True, null=True, blank=True)