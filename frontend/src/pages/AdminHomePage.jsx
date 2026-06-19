import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';
import { fetchUsers } from '../redux/slices/adminSlice';

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  const {
    users,
    loading: usersLoading,
    error: usersError,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-wider text-black mb-1">Admin Dashboard</h2>
        <p className="text-xs text-neutral-500 tracking-wide font-medium">Overview of store sales, operations and catalog metrics</p>
      </div>

      {productsLoading || ordersLoading || usersLoading ? (
        <p className="text-black animate-pulse py-10 text-xs font-semibold tracking-wider uppercase">Loading dashboard...</p>
      ) : productsError ? (
        <p className="text-red-500 text-sm font-semibold">Error loading products: {productsError}</p>
      ) : ordersError ? (
        <p className="text-red-500 text-sm font-semibold">Error loading orders: {ordersError}</p>
      ) : usersError ? (
        <p className="text-red-500 text-sm font-semibold">Error loading users: {usersError}</p>
      ) : (
        <>
          {/* Top Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {/* Revenue Card */}
            <div className="p-6 border border-neutral-200 bg-white rounded-none shadow-none flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">Revenue</h3>
                <p className="text-3xl font-black tracking-tight text-black">${(totalSales || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-widest mt-4">Lifetime Sales</span>
            </div>

            {/* Total Orders Card */}
            <div className="p-6 border border-neutral-200 bg-white rounded-none shadow-none flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">Total Orders</h3>
                <p className="text-3xl font-black tracking-tight text-black">{totalOrders}</p>
              </div>
              <div className="mt-4">
                <Link to="/admin/orders" className="inline-block text-[10px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                  Manage Orders
                </Link>
              </div>
            </div>

            {/* Total Products Card */}
            <div className="p-6 border border-neutral-200 bg-white rounded-none shadow-none flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">Total Products</h3>
                <p className="text-3xl font-black tracking-tight text-black">{products?.length || 0}</p>
              </div>
              <div className="mt-4">
                <Link to="/admin/products" className="inline-block text-[10px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                  Manage Products
                </Link>
              </div>
            </div>

            {/* Total Users Card */}
            <div className="p-6 border border-neutral-200 bg-white rounded-none shadow-none flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-2">Total Users</h3>
                <p className="text-3xl font-black tracking-tight text-black">{users?.length || 0}</p>
              </div>
              <div className="mt-4">
                <Link to="/admin/users" className="inline-block text-[10px] font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                  Manage Users
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Orders Table Section */}
          <div className="mt-8">
            <div className="mb-4">
              <h2 className="text-xl font-black uppercase tracking-wider text-black mb-1">Recent Orders</h2>
              <p className="text-[11px] text-neutral-400 font-medium tracking-wide">The latest transaction updates across the storefront</p>
            </div>
            
            <div className="overflow-x-auto border border-neutral-200 rounded-none bg-white">
              <table className="min-w-full text-left text-neutral-600">
                <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
                  <tr>
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-6">User</th>
                    <th className="py-4 px-6">Total Price</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {orders && orders.length > 0 ? (
                    orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-neutral-50/50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-6 font-semibold text-neutral-900 whitespace-nowrap text-sm">{order._id}</td>
                        <td className="py-4 px-6 text-sm text-neutral-600">{order.user?.name || "N/A"}</td>
                        <td className="py-4 px-6 text-sm text-neutral-900 font-semibold">${order.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className="py-4 px-6 text-sm">
                          <span className={`inline-block w-[100px] text-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none ${
                            order.status === 'Delivered' || order.status === 'Shipped'
                              ? 'bg-black text-white'
                              : 'bg-neutral-100 text-neutral-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-8 px-6 text-center text-sm text-neutral-400"
                      >
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHomePage;