
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
    

class Review(models.Model):
	user = models.ForeignKey(User, on_delete = models.CASCADE, default=None)
	book = models.ForeignKey(Book, on_delete = models.CASCADE)
	review_star = models.IntegerField()
	review_text = models.TextField()
	created = models.DateTimeField(default=timezone.now)