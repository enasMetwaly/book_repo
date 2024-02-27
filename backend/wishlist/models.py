from django.db import models
from users.models import User
from store.models import Book
# Create your models here.
class WishListItems(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.user}'s Wishlist Item: {self.book}"
