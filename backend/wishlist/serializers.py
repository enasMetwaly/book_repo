
from rest_framework import serializers
from .models import WishListItems

class WishListItemsSerializer(serializers.ModelSerializer):
    cover_page_url = serializers.SerializerMethodField()

    class Meta:
        model = WishListItems
        fields = ('id', 'user', 'book', 'cover_page_url')

    def get_cover_page_url(self, instance):
        # Access the book instance through the 'instance' parameter
        book = instance.book

        # Check if cover_page exists in the book instance
        if book.cover_page:
            # Generate absolute URL for cover_page using request object from context
            return self.context['request'].build_absolute_uri(book.cover_page.url)
        return None  # Return None if cover_page doesn't exist or is None

    def to_representation(self, instance):
        # Get the default representation from the parent class
        representation = super().to_representation(instance)

        # Replace the 'book' key with its serialized representation including 'cover_page_url'
        representation['book'] = {
            'id': instance.book.id,
            'title': instance.book.name,
            'price': instance.book.price,
            'pages': instance.book.pages,
            'cover_page': self.get_cover_page_url(instance),  # Include cover_page_url in book representation
        }
        return representation
