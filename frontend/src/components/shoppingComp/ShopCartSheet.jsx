import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartItems from './UserCartItems'
import { useNavigate } from 'react-router-dom'

const ShopCartSheet = ({ cartItems, setOpenCart }) => {
  const navigate = useNavigate();

  const items = Array.isArray(cartItems) ? cartItems : (cartItems?.items || []);

  const totalCartAmount = () => {
    return items.reduce((sum, currentItem) => {
      const price = currentItem.salePrice > 0 ? currentItem.salePrice : currentItem.price;
      return sum + price * currentItem.quantity;
    }, 0);
  };

 

  return (
    <SheetContent className="bg-white p-4 sm:p-6 w-full max-w-md shadow-lg rounded-lg">
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold text-gray-800">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-4 space-y-4 max-h-80 overflow-y-auto">
        {items.length > 0 ? (
          items.map((item) => (
            <UserCartItems key={item.productId} cartItem={item} />
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <span className="text-lg font-medium text-gray-700">Total</span>
        <span className="text-lg font-semibold text-gray-900">₹{totalCartAmount()}</span>
      </div>

      <Button
        onClick={() => {
          navigate('/shop/checkout');
          setOpenCart(false);
        }}
        className="mt-6 w-full bg-black text-white hover:bg-blue-700"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};


export default ShopCartSheet