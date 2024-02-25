from django.db import models

from django.db import models
from users.models import User
from store.models import Book
#from order.models import Order, BoughtItem
from django.db.models.signals import post_save
from django.dispatch import receiver

class ShopCart(models.Model):
   client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shopcart_item', blank=True, null=True)
   book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='shopcart_books')
   quantity = models.PositiveSmallIntegerField(default=0)

   @property
   def item_cost(self):
      return self.quantity * self.book.price

   def __str__(self):
      return f"product id: {self.book_id}, Price: {self.item_cost} EGP, quantity :{self.quantity}"
   
   def get_total_cost_for_user(self, user):
        # Retrieve all shop cart items related to the user
        user_cart_items = ShopCart.objects.filter(client=user)

        # Calculate the total cost by summing up item costs for each cart item
        total_cost = sum(cart_item.item_cost for cart_item in user_cart_items)

        return total_cost