
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import paypalrestsdk
from .serializers import OrderItemSerializer
from .models import Order
from django.conf import settings
from users.models import User
from django.shortcuts import redirect
from django.core.mail import send_mail

# Configure PayPal SDK
paypalrestsdk.configure({
    "mode": "sandbox",
    "client_id": settings.PAYPAL_CLIENT_ID,
    "client_secret": settings.PAYPAL_SECRET,
})

@api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Adjust the permission as needed
def create_order(request):
    # Assuming you have access to the order and its total price
    order_total_price = 1.00  # Replace with your actual total price

    # Create the order
    order = Order.objects.create(
        client=request.user,  # Replace with the actual user
        name=request.data.get('name'),  # Replace with the actual form data
        email=request.data.get('email'),  # Replace with the actual form data
        phone=request.data.get('phone'),  # Replace with the actual form data
        address=request.data.get('address'),  # Replace with the actual form data
        ship_to_different_address=request.data.get('ship_to_different_address', False),  # Replace with the actual form data
        order_notes=request.data.get('order_notes', ''),  # Replace with the actual form data
        total_price=order_total_price,
    )

    # Assuming you have a serializer for order items
    order_items_serializer = OrderItemSerializer(data=request.data.get('items', []), many=True)
    order_items_serializer.is_valid(raise_exception=True)
    order_items_serializer.save(order=order)

    return JsonResponse({"order_id": order.id})


@api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Adjust the permission as needed
def create_payment(request, order_id):
    try:
        # Retrieve the order based on the provided order_id
        order = Order.objects.get(id=order_id)

        # Create the PayPal payment
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {"payment_method": "paypal"},
            "redirect_urls": {
                "return_url": "http://localhost:8000/success/",
                "cancel_url": "http://localhost:8000/cancel/",
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Order Payment",
                        "sku": "001",
                        "price": str(order.total_price),
                        "currency": "USD",
                        "quantity": 1,
                    }]
                },
                "amount": {"total": str(order.total_price), "currency": "USD"},
                "description": "Payment for the order",
            }],
        })

        if payment.create():
            # Save PayPal payment details to the order
            order.paypal_payment_id = payment.id
            order.save()
            
            # 
          
            #

            user_id = order.client.id
            
            # Remove cart items associated with the user
            try:
                user = User.objects.get(id=user_id)
                user.shopcart_item.all().delete()
                print("Before deleting cart items")
                print("After deleting cart items")

            except User.DoesNotExist:
                print("User not found")


            approval_url = next(link.href for link in payment.links if link.rel == "approval_url")
            return JsonResponse({"approval_url": approval_url})
        else:
            return JsonResponse({"error": payment.error})
    except Order.DoesNotExist:
        return JsonResponse({"error": "Order not found"})


def execute_payment(request):
    payment_id = request.GET.get("paymentId")
    payer_id = request.GET.get("PayerID")

    payment = paypalrestsdk.Payment.find(payment_id)
    if payment.execute({"payer_id": payer_id}):
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"error": payment.error})
    
    



def send_transaction_details_email(payment_id, token, payer_id, user_email):
    subject = 'Transaction Details'
    additional_text = (
        "Thank you for your purchase! Please make sure to save these details for reference. "
        "You won't be able to receive your order without them."
    )
    message = (
        f"{additional_text}\n\n"
        f"Payment ID: {payment_id}\nToken: {token}\nPayer ID: {payer_id}"
    )
    from_email = 'your_email@gmail.com'  # Replace with your email

    send_mail(subject, message, from_email, [user_email])  # Sending to the user's email

def success_view(request):
    payment_id = request.GET.get('paymentId')
    token = request.GET.get('token')
    payer_id = request.GET.get('PayerID')

    # Remove seller_id from the transaction details
    transaction_details = {
        'payment_id': payment_id,
        'token': token,
        'payer_id': payer_id,
    }

    # Save the transaction details to the database or log them

    # Retrieve order based on the PayPal payment ID
    try:
        order = Order.objects.get(paypal_payment_id=payment_id)

        # Get user email from the order
        user_email = order.email

        # Send the transaction details email
        send_transaction_details_email(payment_id, token, payer_id, user_email)

        success_url = "http://localhost:3000"

        # return JsonResponse({"transaction_details": transaction_details})
        return redirect(success_url)

    except Order.DoesNotExist:
        return JsonResponse({"error": "Order not found"})