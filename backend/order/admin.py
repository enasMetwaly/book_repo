# from django.contrib import admin
# from .models import Order, OrderItem

# class OrderItemInline(admin.TabularInline):
#     model = OrderItem
#     extra = 1

# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'customer', 'name', 'email', 'phone', 'address', 'division', 'district', 'zip_code', 'totalbook', 'created', 'updated', 'paid')

# class OrderItemAdmin(admin.ModelAdmin):
#     list_display = ('id', 'order', 'book', 'quantity', 'price')

# admin.site.register(Order, OrderAdmin)
# admin.site.register(OrderItem, OrderItemAdmin)
