
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WishListItems
from .serializers import WishListItemsSerializer
from store.models import Book
from django.shortcuts import get_object_or_404
from users.models import User
from .models import WishListItems
from .serializers import WishListItemsSerializer


class WishlistView(APIView):
    def get(self, request, user_id):
        # Retrieve the user or return a 404 response if not found
        user = get_object_or_404(User, id=user_id)

        # Fetch the wishlist items for the user
        wishlist_items = WishListItems.objects.filter(user=user)

        # Serialize the wishlist items
        serializer = WishListItemsSerializer(wishlist_items, many=True, context={'request': request})


        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request, user_id):
        # Assuming the request data contains 'book_id'
        book_id = request.data.get('book_id')

        # Check if the book exists
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user has a wishlist, create one if not
        user = get_object_or_404(User, id=user_id)
        wishlist_item, created = WishListItems.objects.get_or_create(user=user, book=book)

        # Serialize the updated wishlist item
        serializer = WishListItemsSerializer(wishlist_item ,context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        try:
            # Assuming book_id is also provided in the request
            book_id = request.data.get('book_id')

            # Filter wishlist items based on user_id and book_id
            wishlist_items = WishListItems.objects.filter(user_id=user_id, book_id=book_id)
            # Add additional filtering criteria if necessary

            # Check if wishlist_items is not empty before proceeding
            if wishlist_items.exists():
                # Delete the first item or handle multiple items accordingly
                wishlist_items.first().delete()
                return Response({'message': 'Wishlist item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({'error': 'Wishlist item not found'}, status=status.HTTP_404_NOT_FOUND)

        except WishListItems.DoesNotExist:
            return Response({'error': 'Wishlist item not found'}, status=status.HTTP_404_NOT_FOUND)