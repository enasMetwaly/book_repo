from rest_framework import serializers
from .models import *


class CategorySerializer(serializers.ModelSerializer):
    
    def validate_name(self, value):
        instance = getattr(self, 'instance', None)

        if Category.objects.exclude(pk=instance.id if instance else None).filter(name=value).exists():
            raise serializers.ValidationError("A category with this name already exists.")
        return value
    class Meta:
        model = Category
        fields = ['id', 'name','image']



class BookSerializer(serializers.ModelSerializer):
    
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    total_reviews = serializers.SerializerMethodField()

    def validate_name(self, value):
        instance = getattr(self, 'instance', None)

        if Book.objects.exclude(pk=instance.id if instance else None).filter(name=value).exists():
            raise serializers.ValidationError("A book with this name already exists.")
        return value

    class Meta:
        model = Book
        fields = ['id', 'name', 'description', 'price', 'stock', 'category', 'cover_page', 'pages', 'total_reviews']

    
            
    def create(self, validated_data):            
        book = Book.objects.create(**validated_data)
        return book
        
    def get_total_reviews(self, obj):
        return obj.review_set.count()
    def get_cover_page_url(self, obj):
        if obj.cover_page:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.cover_page.url)
        return None
       