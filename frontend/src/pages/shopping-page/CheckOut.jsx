import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from '@/Slices/shop/order-slice'
import {  clearCart } from '@/Slices/shop/cart-slice'  // <-- Import clearCart action
import { Button } from '@/components/ui/button'
import banner4 from '@/assets/banner4.jpg'
import Addresses from '@/components/shoppingComp/Address/Addresses'
import UserCartItems from '@/components/shoppingComp/UserCartItems'
import { toast } from 'sonner'  // <-- Import toast from sonner
import { useNavigate } from 'react-router-dom'

const CheckOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.shopCart)
  const { addressList } = useSelector(state => state.shopAddress)
  const { user } = useSelector(state => state.auth)

 const totalCartAmount = () => {
  if (!cartItems || !Array.isArray(cartItems.items)) return 0;

  return cartItems.items.reduce((sum, currentItem) => {
    const price = currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price;
    return sum + price * currentItem.quantity;
  }, 0);
};

  const handleCheckOut = () => {
  const selectedAddressId = localStorage.getItem('selectedAddressId');
  if (!selectedAddressId) {
    toast.error('Please select a delivery address before checkout.');
    return;
  }

  const selectedAddress = addressList.find(addr => addr._id === selectedAddressId);
  if (!selectedAddress) {
    toast.error('Selected address not found. Please select a valid address.');
    return;
  }

  if (!user?.id) {
    toast.error('User not logged in.');
    return;
  }

  if (!cartItems || !Array.isArray(cartItems.items) || cartItems.items.length === 0) {
  toast.error('Your cart is empty.');
  return;
  }

  const orderPayload = {
    userId: user.id,
    items: cartItems.items.map(item => ({
      productId: item.productId,  // <-- Use item.productId here, NOT item._id
      quantity: item.quantity,
    })),
    address: selectedAddress,
  };

  dispatch(addOrder(orderPayload))
    .unwrap()
    .then(() => {
      toast.success('Order placed successfully!');
      dispatch(clearCart(user?.id));
      navigate('/shop/account') // Clear cart after successful order
      // Optional: redirect user here if needed
    })
    .catch((err) => {
      toast.error('Failed to place order: ' + err);
    });
};


  return (
    <div className="w-full">
      {/* Banner */}
      <div className="w-full">
        <img src={banner4} alt="Checkout Banner" className="w-full h-48 object-cover" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
        {/* Left: Addresses */}
        <div className="w-full md:w-1/2 space-y-4">
          <Addresses />
        </div>

        {/* Right: Cart Items */}
        <div className="w-full md:w-1/2 space-y-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((cartItem, index) => (
              <UserCartItems key={index} cartItem={cartItem} />
            ))
          ) : (
            <p className="text-gray-500">No items in cart.</p>
          )}

          {/* Total Price */}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Total</span>
            <span className="text-lg font-semibold text-gray-900">₹{totalCartAmount()}</span>
          </div>

          {/* Checkout Button */}
          <div className="mt-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleCheckOut}
            >
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOut
