import React, { useEffect, useState } from "react";
import AdminFeature from "./AdminFeature";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState([]);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(null)
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch("http://localhost:5000/api/admin/dashboard/userCount").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch customer count");
        return res.json();
      }),
      fetch("http://localhost:5000/api/admin/dashboard/totalOrder").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order details");
        return res.json();
      }),
      fetch("http://localhost:5000/api/admin/dashboard/totalProduct").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product details");
        return res.json();
      }),
    ])
      .then(([userData, orderData, productData]) => {
        // set customer count
        setCount(userData.count);

        // set total product count
        setTotalProduct(productData.totalProducts);

        // set order details array
        const features = [
          { title: "Total Orders", value: orderData.totalOrders, badgeText: "Overview" },
          { title: "Delivered", value: orderData.delivered, badgeText: "Completed" },
          { title: "Pending", value: orderData.pending, badgeText: "Awaiting" },
          { title: "In Process", value: orderData.inProcess, badgeText: "Processing" },
          { title: "Total Products", value: productData.totalProducts, badgeText: "Inventory" },
        ];

        setOrderDetails(features);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));

  }, []);

  if (loading) return <div className="text-xl">Loading Dashboard...</div>

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>

      {loading && <p>Loading dashboard data...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <AdminFeature title="Total Customers" value={count} badgeText="Users" />
        {orderDetails.map(({ title, value, badgeText }) => (
          <AdminFeature
            key={title}
            title={title}
            value={value}
            badgeText={badgeText}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
