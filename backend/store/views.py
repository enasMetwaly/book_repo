from django.shortcuts import render

# Create your views here.
from .forms import *
from .serializers import *
from rest_framework import generics
from .serializers import *
from rest_framework.views import APIView

from rest_framework import filters
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import generics, status



class ListBooksView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class LatestBooksView(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        return Book.objects.order_by('-created_at')[:8]


class CreateBookView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
    def create(self, request, *args, **kwargs):
        data = request.data
        price = data.get('price')
        stock = data.get('stock')
        pages = data.get('pages')

        # Your custom validation
        try:
            price = int(price)
            stock = int(stock)
            pages = int(pages)
        except ValueError:
            return Response({"error": "Invalid input for price, stock, or pages. Please provide valid integers."}, status=status.HTTP_400_BAD_REQUEST)

        if price <= 0:
            return Response({"price": "Price must be a positive integer."}, status=status.HTTP_400_BAD_REQUEST)

        if stock < 50:
            return Response({"stock": "Stock must be a positive integer."}, status=status.HTTP_400_BAD_REQUEST)

        if pages <= 10:
            return Response({"pages": "Pages must be a positive integer greater than zero."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Perform additional actions if needed

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    
class UpdateBookView(generics.RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    # def put(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)
    
    
    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class BookDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
class DeleteBookView(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    
class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    
    
class CreateCategoryView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
class UpdateCategoryView(generics.RetrieveUpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    

class CategoryDetailsView(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    
class DeleteCategoryView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer    
    
    
    
    
class ReviewListCreate(APIView):
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ReviewsByBookView(APIView):
    def get(self, request, pk):
        reviews = Review.objects.filter(book=pk)
        serializer = ReviewSerializer(reviews, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)

class BookSearchView(generics.ListAPIView):
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'category__name']

    def get_queryset(self):
        search_query = self.request.query_params.get('q')
        if search_query:
            return Book.objects.filter(
                Q(name__icontains=search_query) |
                Q(category__name__icontains=search_query) 
              
            )
        else:
            return Book.objects.all()
        
class BooksByCategory(APIView):
    def get(self, request, id):
        books = Book.objects.filter(category=id)
        serializer = BookSerializer(books, many=True, context={'request': request})  # Pass the request object
        return Response(serializer.data, status=status.HTTP_200_OK)    
    
    
def latest_books(request):
    latest_books = Book.objects.order_by('-created_at')[:8]  # Get the latest 8 books

    # Serialize the queryset using the BookSerializer
    serialized_books = BookSerializer(latest_books, many=True).data

    return JsonResponse({'latest_books': serialized_books})
    