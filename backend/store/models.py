
from django.db import models
from users.models import User
from django.utils import timezone

class Category(models.Model):

    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='category_images', null=True, blank=True)

    
    def __str__(self) -> str:
        return self.name
    
class Book(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    price = models.IntegerField()
    stock = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    cover_page = models.ImageField(upload_to = "coverpage", verbose_name='cover picture', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    pages = models.PositiveIntegerField()


    def __str__(self) -> str:
        return self.name
