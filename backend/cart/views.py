from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from store.models import Book
from .models import ShopCart
from .serializers import ShopCartSerializer



class ListShopCartView(APIView):
    def get(self, request):
        # Get the user making the request
        user = request.user

        # Check if the user is authenticated
        if not user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

        # Retrieve the shop cart items for the user
        shop_cart_items = ShopCart.objects.filter(client=user)

        # Serialize the shop cart items
        serializer = ShopCartSerializer(shop_cart_items, many=True,context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)



class AddToShopCartView(APIView):
    def post(self, request):
        # Assuming the request data contains 'book_id' and 'quantity'
        book_id = request.data.get('book_id')
        quantity = request.data.get('quantity', 1)  # Default to 1 if quantity is not provided

        # Check if the book exists
        try:
            book = Book.objects.get(id=book_id)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user has a shop cart, create one if not
        user = request.user  # Assuming you are using authentication
        shop_cart, created = ShopCart.objects.get_or_create(client=user, book=book)

        # Check if the requested quantity exceeds the available stock
        if quantity > book.stock:
            return Response({'error': 'Requested quantity exceeds available stock'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the requested quantity exceeds the available stock of the book
        if quantity > book.stock:
            return Response({'error': 'Requested quantity exceeds available stock'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the quantity
        shop_cart.quantity += quantity
        shop_cart.save()

        # Serialize the updated shop cart item
        serializer = ShopCartSerializer(shop_cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class RemoveFromShopCartView(APIView):
    def post(self, request):
        # Assuming the request data contains 'cart_item_id'
        cart_item_id = request.data.get('cart_item_id')

        try:
            # Retrieve the shop cart item
            shop_cart_item = ShopCart.objects.get(id=cart_item_id)

            # Check if the user making the request is the owner of the shop cart item
            user = request.user
            if shop_cart_item.client != user:
                return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

            # Delete the shop cart item
            shop_cart_item.delete()

            return Response({'message': 'Item removed from the shop cart'}, status=status.HTTP_200_OK)

        except ShopCart.DoesNotExist:
            return Response({'error': 'Shop cart item not found'}, status=status.HTTP_404_NOT_FOUND)



class ReduceShopCartItemQuantityView(APIView):
    def post(self, request):
        # Assuming the request data contains 'cart_item_id'
        cart_item_id = request.data.get('cart_item_id')

        try:
            # Retrieve the shop cart item
            shop_cart_item = ShopCart.objects.get(id=cart_item_id)

            # Check if the user making the request is the owner of the shop cart item
            user = request.user
            if shop_cart_item.client != user:
                return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

            # Reduce the quantity of the shop cart item by 1
            if shop_cart_item.quantity > 1:
                shop_cart_item.quantity -= 1
                shop_cart_item.save()
            else:
                # If the quantity is 1, remove the item
                shop_cart_item.delete()

            return Response({'message': 'Quantity reduced or item removed from the shop cart'}, status=status.HTTP_200_OK)

        except ShopCart.DoesNotExist:
            return Response({'error': 'Shop cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        
        
class IncreaseShopCartItemQuantityView(APIView):
    def post(self, request):
        # Assuming the request data contains 'cart_item_id'
        cart_item_id = request.data.get('cart_item_id')

        try:
            # Retrieve the shop cart item
            shop_cart_item = ShopCart.objects.get(id=cart_item_id)

            # Check if the user making the request is the owner of the shop cart item
            user = request.user
            if shop_cart_item.client != user:
                return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)

            # Increase the quantity of the shop cart item by 1
            shop_cart_item.quantity += 1
            shop_cart_item.save()

            return Response({'message': 'Quantity increased for the shop cart item'}, status=status.HTTP_200_OK)

        except ShopCart.DoesNotExist:
            return Response({'error': 'Shop cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        