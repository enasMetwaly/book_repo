from django import forms
from .models import Category,Book
from .models import *


class CategoryFrom(forms.ModelForm):
    class Meta:
        model = Category
        fields= '__all__'



from django import forms

class BookForm(forms.ModelForm):
    category = forms.ModelChoiceField(queryset=Category.objects.all(), 
                                      widget=forms.Select(attrs={"class": "form-control"}))
    class Meta:
        model = Book
        fields = ['name', 'description', 'price', 'pages', 'stock', 'category', 'cover_page']
