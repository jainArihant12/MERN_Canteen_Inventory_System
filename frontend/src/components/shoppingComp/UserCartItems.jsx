import React from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart, updateCart,fetchCartItems } from '@/Slices/shop/cart-slice'
import { toast } from 'sonner'
const UserCartItems = ({cartItem}) => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)

  function handleDeleteCart(getCartId) {
  dispatch(deleteCart({ userId: user?.id, productId: getCartId }))
    .then((data) => {
      if (data.payload?.success) {
        toast.success('Item deleted');
        
        dispatch(fetchCartItems(user?.id));  // 🔁 Fetch updated cart
      } else {
        toast.error('Failed to delete item');
      }
    })
    .catch(() => {
      toast.error('Error deleting item');
    });
}
  const handleUpdateQuantity = (getCartItem , typeOfAction)=>{
    dispatch(updateCart({ userId:user.id, productId:getCartItem.productId, quantity : typeOfAction==='add' ? getCartItem.quantity+1 :  getCartItem.quantity-1}))
    .then((data) => {
      if (data?.payload?.success) {
        toast.success('Item updated')
        
        dispatch(fetchCartItems(user?.id));  // 🔁 Fetch updated cart
      } else {
        toast.error('Failed to delete item');
      }
    })
  }

  return (
    <div className="flex items-center justify-between border-b py-4">
  {/* Product Info */}
  <div className="flex items-center gap-4">
    <img
      src={cartItem?.image}
      alt={cartItem?.title}
      className="w-16 h-16 object-cover rounded-lg"
    />

    <div className="flex flex-col">
      <h3 className="font-medium text-gray-800">{cartItem?.title}</h3>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>{cartItem?.brand}</span>
        <span>·</span>
        <span>{cartItem?.category}</span>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 mt-2">
        <button
        disabled={cartItem.quantity===1}
        onClick={()=>{handleUpdateQuantity(cartItem , 'minus')}}
          className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
        >
          −
        </button>
        <span className="text-sm font-medium">{cartItem?.quantity}</span>
        <button
          onClick={()=>{handleUpdateQuantity(cartItem , 'add')}}
          className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  </div>

  {/* Price + Delete */}
  <div className="flex flex-col items-end gap-2">
    <span className="font-bold text-sm text-gray-800">
      ₹
      {cartItem?.salePrice > 0 && cartItem?.salePrice < cartItem?.price
        ? cartItem.salePrice * cartItem.quantity
        : cartItem.price * cartItem.quantity}
    </span>

    <Button onClick={
      ()=>{handleDeleteCart(cartItem.productId)}
    }
    >
      <Trash2  className='h-5 w-5 text-red-600'/>
    </Button>
  </div>
</div>

  )
}

export default UserCartItems