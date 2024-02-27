from django.db import models
from users.models import User
from store.models import Book

class Order(models.Model):
    PENDING = 'PENDING'
    IN_DELIVERY = 'IN_DELIVERY'
    DELIVERED = 'DELIVERED'

    ORDER_STATUS = [
        (PENDING, 'Pending'),
        (IN_DELIVERY, 'In Delivery'),
        (DELIVERED, 'Delivered'),
    ]

    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    name = models.CharField(max_length=30)
    email = models.EmailField()
    phone = models.CharField(max_length=16)
    address = models.CharField(max_length=150)
    ship_to_different_address = models.BooleanField(default=False)
    order_notes = models.TextField(blank=True, null=True)

    ordered_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default=PENDING)
    total_price = models.FloatField(blank=True, null=True)
    
    # Additional fields for PayPal integration
    paypal_payment_id = models.CharField(max_length=255, blank=True, null=True)
    is_paid = models.BooleanField(default=False)


    def save(self, *args, **kwargs):
        # Calculate total price based on the items in the order
        self.total_price = sum(cart_item.item_cost for cart_item in self.client.shopcart_item.all())
        # If the order is paid through PayPal, set is_paid to True
        if self.paypal_payment_id:
            self.is_paid = True

        super().save(*args, **kwargs)


    def __str__(self):
        return f"Order {self.id} - Total Price: {self.total_price} EGP"

class OrderManager(models.Manager):
    def create_order(self, client):
        order = self.model(client=client)
        # Copy items from the cart to the order
        for cart_item in client.shopcart_item.all():
            order_item = OrderItem.objects.create(order=order, book=cart_item.book, quantity=cart_item.quantity)
        # Clear the cart
        client.shopcart_item.all().delete()
        return order
    
    
    
Order.add_to_class('objects', OrderManager())
    
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def save(self, *args, **kwargs):
        # Update the associated order's total price when saving an item
        self.order.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order Item {self.id} - Book: {self.book}, Quantity: {self.quantity}"

# In your User model, you can add the following property to get the total cart price
# Assuming you have a related name 'shopcart_item' in the ShopCart model
    @property
    def total_cart_price(self):
        return sum(cart_item.item_cost for cart_item in self.shopcart_item.all())

    # Assign the OrderManager to the Order model
# Order.objects = OrderManager()
