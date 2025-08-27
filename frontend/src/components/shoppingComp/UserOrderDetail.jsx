import React from 'react';

const UserOrderDetail = ({ order }) => {
  if (!order) {
    return <p>No order selected.</p>;
  }
   const statusClasses = {
    pending: 'text-yellow-600 font-semibold',
    inprocess: 'text-orange-600 font-semibold',
    shipped: 'text-blue-600 font-semibold',
    delivered: 'text-green-600 font-semibold',
    cancelled: 'text-red-600 font-semibold',
  };
  const {
    _id,
    createdAt,
    items = [],
    status,
    address = {}
  } = order;

  // Calculate total price considering salePrice if available
  const totalPrice = items.reduce((sum, item) => {
    const price = item.salePrice > 0 ? item.salePrice : item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="mt-8">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Order ID</span>
          <span className="text-gray-800">{_id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Order Date</span>
          <span className="text-gray-800">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Order Price</span>
          <span className="text-gray-800">₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <hr className="border-t my-4" />

      {/* List of ordered items */}
      <div className="space-y-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border p-2 rounded">
              <div>
                <p className="font-semibold">{item.title || 'No Title'}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div>
                <p className="font-semibold">
                  ₹{(item.salePrice > 0 ? item.salePrice : item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No items in this order.</p>
        )}
      </div>

      <hr className="border-t my-4" />

      {/* Address Info */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Address</span>
          <span className="text-gray-800">{address.address || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">City</span>
          <span className="text-gray-800">{address.city || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Pincode</span>
          <span className="text-gray-800">{address.pincode || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Phone</span>
          <span className="text-gray-800">{address.phone || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">Notes</span>
          <span className="text-gray-800">{address.notes || '-'}</span>
        </div>
        <div className="flex justify-between text-sm font-semibold mt-4">
          <span>Order Status</span>
          <span className={statusClasses[status?.toLowerCase()] || ''}>
  {status}
</span>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetail;
