import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import AdminOrderDetail from "./AdminOrderDetail";
import { fetchAllOrdersAdmin, updateOrderStatus } from "../../Slices/admin/order-slice";

const AdminOrderView = () => {
  
  const dispatch = useDispatch();
  const { orderList, isLoading, error } = useSelector(state => state.adminOrders);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  const handleStatusUpdate = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }))
      .unwrap()
      .then(() => {
        // Refetch orders or update local state
        dispatch(fetchAllOrdersAdmin());
        setSelectedOrder(null); // Close detail dialog or reset selected order if needed
      })
      .catch((err) => {
        console.error("Failed to update status:", err);
      });
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const statusClasses = {
    pending: 'text-yellow-600 font-semibold',
    inprocess: 'text-orange-600 font-semibold',
    shipped: 'text-blue-600 font-semibold',
    delivered: 'text-green-600 font-semibold',
    cancelled: 'text-red-600 font-semibold',
  };

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Detail</span>
              </TableHead>
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
                <TableCell className={statusClasses[order.status.toLowerCase()] || ''}>{order.status}</TableCell>
                <TableCell>
                  ₹{order.items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0)}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="bg-black text-white hover:bg-gray-600"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl w-full p-6 rounded-lg space-y-4 bg-white">
                      <AdminOrderDetail order={selectedOrder} onStatusUpdate={handleStatusUpdate} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrderView;
