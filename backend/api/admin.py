from django.contrib import admin
from .models import *
from django.contrib.auth.models import Permission, ContentType

class PermissionAdmin(admin.ModelAdmin):
    model = Permission
    fields = ['name', 'codename']
    
class ContentTypeAdmin(admin.ModelAdmin):
    model = Permission
    fields = ['app_label', 'model']

admin.site.register(Permission, PermissionAdmin)
admin.site.register(ContentType, ContentTypeAdmin)
# Register your models here.
admin.site.register(Profile)
admin.site.register(Faculty)
admin.site.register(Class)
admin.site.register(Position)
admin.site.register(Area)
admin.site.register(TypeRoom)
admin.site.register(Room)
admin.site.register(PaymentMethod)
admin.site.register(Contract)
admin.site.register(Notification)
admin.site.register(Shift)
admin.site.register(DailySchedule)
admin.site.register(WaterElectricalUnitPrice)
admin.site.register(WaterElectrical)
admin.site.register(Bill)
admin.site.register(TypeExpense)
admin.site.register(Service)
admin.site.register(Expense)
admin.site.register(TypeRevenue)
admin.site.register(Revenue)
admin.site.register(SchoolYear)
admin.site.register(Stage)
admin.site.register(TypeService)
