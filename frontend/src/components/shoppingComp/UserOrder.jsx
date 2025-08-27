import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import UserOrderDetail from './UserOrderDetail'
import { fetchAllOrder } from '../../Slices/shop/order-slice'  // Adjust path as needed

const UserOrder = () => {
  const dispatch = useDispatch()
  const { orderList, isLoading, error } = useSelector(state => state.shopOrder)  // Adjust slice name if needed
  const userId = useSelector(state => state.auth.user?.id) // <-- Moved out of useEffect

  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    if (userId) {
      dispatch(fetchAllOrder(userId))
    }
  }, [dispatch, userId])

  if (isLoading) return <p>Loading orders...</p>
  if (error) return <p className="text-red-600">Error: {error}</p>

  const statusClasses = {
    pending: 'text-yellow-600 font-semibold',
    inprocess: 'text-orange-600 font-semibold',
    shipped: 'text-blue-600 font-semibold',
    delivered: 'text-green-600 font-semibold',
    cancelled: 'text-red-600 font-semibold',
  };

    console.log(orderList);
    

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption> List of orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead> <span className='sr-only'>Detail</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            )}

            {orderList.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className={statusClasses[order.status.toLowerCase()] || ''}>
                  {order.status}
                </TableCell>
                <TableCell>
                  ₹{order.items.reduce((sum, item) => sum + (item?.price || 0) * item.quantity, 0)}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedOrder(order)}>
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl w-full p-6 rounded-lg space-y-4 bg-white">
                      <UserOrderDetail order={selectedOrder} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default UserOrder
