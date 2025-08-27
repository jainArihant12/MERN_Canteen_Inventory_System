import React, { useEffect, useState } from 'react';
import CommonForm from '../common/form';
import { formControlForStatus } from '../../config/index';

const AdminOrderDetail = ({ order, onStatusUpdate }) => {
  const initialState = {
    status: order?.status || 'pending',
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    setFormData({ status: order?.status || 'pending' });
  }, [order]);

  const handleSubmitStatus = (event) => {
    event.preventDefault();
    if (!order) return;
    if (formData.status === order.status) return; // no change

    onStatusUpdate && onStatusUpdate(order._id, formData.status);
  };

  if (!order) {
    return <p>No order selected</p>;
  }

  const orderPrice = order.items?.reduce((sum, item) => {
    const price = item.salePrice > 0 ? item.salePrice : item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="mt-8 space-y-6">
      {/* Order Info */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Order ID</span>
          <span className="text-gray-800">{order._id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Order Date</span>
          <span className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Order Price</span>
          <span className="text-gray-800">₹{orderPrice.toFixed(2)}</span>
        </div>
      </div>

      <hr className="border-t" />

      {/* Address Info */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Address</span>
          <span className="text-gray-800">{order.address?.address || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">City</span>
          <span className="text-gray-800">{order.address?.city || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Pincode</span>
          <span className="text-gray-800">{order.address?.pincode || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Phone</span>
          <span className="text-gray-800">{order.address?.phone || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Notes</span>
          <span className="text-gray-800">{order.address?.notes || '-'}</span>
        </div>
      </div>

      {/* Status Update Form */}
      <CommonForm
        formControls={formControlForStatus}
        formData={formData}
        setFormData={setFormData}
        buttonText="Update Status"
        onSubmit={handleSubmitStatus}
      />
    </div>
  );
};

export default AdminOrderDetail;
