"""
URL configuration for bookstore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import  settings
from django.conf.urls.static import static

from users.views import *
from store.views import *
from order.views import *
from wishlist.views import *
from cart.views import *



urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/v1/auth/", include('djoser.urls')),
    path("api/v1/auth/", include('djoser.urls.jwt')),
    
    #users
    path('api/v1/auth/users/info', get_user_info, name='get_user_info'),
    #user profile
    path('api/user_data/<int:id>/', user_retrieve, name='user-retrieve'),
    # Define the URL for updating user data
    path('api/user_update/<int:id>/', user_update, name='user-update'),    
    #users list
    path('api/users/', UserList.as_view(), name='user-list'),
    #update and delete user by admin  
    path('api/users/<int:pk>/', UserDetail.as_view(), name='user-detail'),    
    #create user by admin
     path('api/users/create/', CreateUserView.as_view(), name='create-user'),


# books
    path('api/books/', ListBooksView.as_view(), name='list-books'),
    path('api/create-book/', CreateBookView.as_view(), name='create-book'),
    path('api/details-book/<int:pk>/', BookDetails.as_view(), name='details-book'),
    path('api/books/<int:pk>/delete/', DeleteBookView.as_view(), name='delete-book'),
    path('api/latest-books/', LatestBooksView.as_view(), name='latest_books'),
        path('api/books/<int:pk>/', UpdateBookView.as_view(), name='update-book'),



 # categories   
    path('api/categories', CategoryList.as_view(), name='category-list'),
    path('api/categories/', CreateCategoryView.as_view(), name='create-category'),
    path('api/categories/<int:pk>/', UpdateCategoryView.as_view(), name='update-category'),
    path('api/categories/<int:pk>/', CategoryDetailsView.as_view(), name='category-details'),
    path('api/categories/<int:pk>/delete/', DeleteCategoryView.as_view(), name='delete-category'),
    
    # list books with spesific category
        path('api/category/<int:id>/books', BooksByCategory.as_view(), name='books_by_category'),

    

#wishlist
    path('api/wishlist/<int:user_id>/', WishlistView.as_view(), name='wishlist'),
#cart
    path('api/add-to-cart/', AddToShopCartView.as_view(), name='add-to-cart'),
    path('api/remove-from-cart/', RemoveFromShopCartView.as_view(), name='remove-from-cart'),
    path('api/list-cart/', ListShopCartView.as_view(), name='list-cart'),
    path('api/reduce-cart-item-quantity/', ReduceShopCartItemQuantityView.as_view(), name='reduce-cart-item-quantity'),
    path('api/increase-cart-item-quantity/', IncreaseShopCartItemQuantityView.as_view(), name='increase-cart-item-quantity'),


#order
    path('api/create_order/', create_order, name='create_order'),


#payments
    path('api/create_payment/<int:order_id>/', create_payment, name='create_payment'),
    path('execute-payment/', execute_payment, name='execute_payment'),
    path('success/', success_view, name='success'),
    
    
      path('api/reviews/', ReviewListCreate.as_view(), name='review-list-create'),
        path('api/reviews/<int:pk>/', ReviewsByBookView.as_view(), name='reviews_by_book'),
        path('api/search/', BookSearchView.as_view(), name='book-search-api'),


  

]
urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
