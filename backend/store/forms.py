from django import forms
from .serializers import BookSerializer, CategorySerializer
from .models import Category,Book

class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = '__all__'

class BookForm(forms.ModelForm):
    category = CategoryForm()

    class Meta:
        model = Book
        fields = ['name', 'description', 'price', 'stock', 'category', 'cover_page', 'pages']



from django import forms
from .models import *
from crispy_forms.helper import FormHelper


class CategoryFrom(forms.ModelForm):
    class Meta:
        model = Category
        fields= '__all__'



from django import forms

class BookForm(forms.ModelForm):
    category = forms.ModelChoiceField(queryset=Category.objects.all(), 
                                      widget=forms.Select(attrs={"class": "form-control"}))
    
    price = forms.IntegerField(
                                    widget=forms.NumberInput(
                                    attrs={
                                        "placeholder": "Price",
                                        "class": "form-control form-control-lg",
                                        "onkeypress":"return (event.charCode !=8 && event.charCode !=0 || (event.charCode >= 48 && event.charCode <= 57))"
                                    }
                                ))
    
    description = forms.CharField(
            widget=forms.Textarea(
                attrs={
                    "placeholder": "Description",
                    "class": "form-control",
                    'rows': '3'
                }
            ))

    class Meta:
        model = Book
        fields = ['name', 'description', 'price', 'pages', 'stock', 'category', 'cover_page']

    def clean_price(self):
        price = self.cleaned_data.get('price')
        if not isinstance(price, int):
            raise forms.ValidationError("Price must be an integer.")
        if price <= 0:
            raise forms.ValidationError("Price must be a non-negative number.")
        return price

    def clean_stock(self):
        stock = self.cleaned_data.get('stock')
        if not isinstance(stock, int):
            raise forms.ValidationError("Stock must be an integer.")
        if stock <= 0:
            raise forms.ValidationError("Price must be a non-negative number.")
        return stock

    def clean_pages(self):
        pages = self.cleaned_data.get('pages')
        if not isinstance(pages, int):
            raise forms.ValidationError("Pages must be an integer.")
        if pages <= 0:
            raise forms.ValidationError("Price must be a non-negative number.")
        return pages




class ReviewForm(forms.ModelForm):
    review_star = forms.IntegerField(widget=forms.HiddenInput(), initial=1)
    review_text = forms.CharField(widget=forms.Textarea(attrs={'rows': 4, 'placeholder': 'Write Your Review'}))

    class Meta:
        model = Review
        fields = [
            'review_star',
            'review_text'
        ]
    def __init__(self, *args, **kwargs):
        super(ReviewForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False