from django.db import models
from django.contrib.auth.models import User
from vietnam_provinces import Province, District, Ward
from vietnam_provinces.enums import ProvinceEnum
import uuid
from model_utils import Choices
from django.utils.translation import ugettext_lazy as _
from django.utils.crypto import get_random_string

def unique_slugify(instance, slug):
    model = instance.__class__
    unique_slug = slug
    while model.objects.filter(slug=unique_slug).exists():
        unique_slug = slug + get_random_string(length=4)
    return unique_slug

# ==============================
# === Custom cities_light model ===
class VietNamProvince(models.Model):
    province = ProvinceEnum
# === custom cities_light model ===
# ==============================

class Faculty(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        ordering = ('id',)
    
    def __str__(self):
        return self.name

class Class(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        ordering = ('id',)
    
    def __str__(self):
        return self.name

class Position(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)

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
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
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