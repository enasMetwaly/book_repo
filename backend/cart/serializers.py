from rest_framework import serializers
from .models import ShopCart

class ShopCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopCart
        fields = ('id', 'client', 'book', 'quantity', 'item_cost')

    item_cost = serializers.ReadOnlyField()
    
    def get_total_cost(self, obj):
        user = obj.client
        total_cost = ShopCart.objects.filter(client=user).aggregate(total_cost=Sum(F('quantity') * F('book__price')))['total_cost']
        return total_cost or 0
    
    def get_cover_page_url(self, instance):
        if instance.book.cover_page:
            # Assuming 'cover_page' is an ImageField in the Book model
            return self.context['request'].build_absolute_uri(instance.book.cover_page.url)
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['book'] = {
            'id': instance.book.id,
            'name': instance.book.name,  # Replace with the actual field name in your Book model
            'price': instance.book.price,  # Replace with the actual field name in your Book model
            'pages':instance.book.pages,
            'cover_page_url': self.get_cover_page_url(instance),  # Include cover_page_url in book representation

        }
        return representation
