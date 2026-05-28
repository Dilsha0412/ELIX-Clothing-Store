import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateOrderStatus, fetchAllOrders } from '../../redux/slices/adminOrderSlice';

const OrderManagement = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const { user } = useSelector((state) => state.auth);
const { orders, loading, error } = useSelector((state) => state.adminOrders);

useEffect(() => {
  if (!user || user.role !== "admin") {
    navigate("/");
  }else {
    dispatch(fetchAllOrders());
  }
},[dispatch, navigate, user]);

  const handleStatusChange = (orderId, newStatus) => {
    console.log(`Order ID: ${orderId} status updated to ${newStatus}`);

    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));

    alert(`Order #${orderId} status has been updated to ${newStatus}!`);
  };

  if(loading) return <p>Loading...</p>;
  if(error) return <p >Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-wider text-black mb-1">Order Management</h2>
        <p className="text-xs text-neutral-500 tracking-wide font-medium">Track client purchases, shipment status, and billing</p>
      </div>

      {/* Orders List Table Section */}
      <div className="overflow-x-auto border border-neutral-200 rounded-none bg-white">
        <table className="min-w-full text-left text-neutral-600">
          <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
            <tr>
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Total Price</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-xs font-semibold text-neutral-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-neutral-800">{order.user?.name || "Unknown"}</td>
                  <td className="py-4 px-6 text-sm font-semibold text-neutral-900">${order.totalPrice.toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm">

                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="border border-neutral-200 bg-white text-neutral-800 text-xs font-semibold p-2 rounded-none focus:border-black outline-none cursor-pointer"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  
                  <td className="py-4 px-6 text-center">
                    {/* Mark as Delivered Button */}
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      disabled={order.status === "Delivered"}
                      className="border border-black bg-black text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-neutral-800 transition duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black"
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 px-6 text-center text-sm text-neutral-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;