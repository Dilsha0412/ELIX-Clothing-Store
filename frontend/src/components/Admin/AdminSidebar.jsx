import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaShoppingCart, FaChartPie, FaSignOutAlt, FaClipboardList, FaStore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { clearCart } from '../../redux/slices/cartSlice';


const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
   };
  return (
    <div className='p-6 flex flex-col h-full justify-between bg-black text-white'>
      <div>
        <div className='mb-8 text-center md:text-left'>
          <Link to="/admin" className="text-3xl font-black tracking-widest text-white hover:opacity-80 transition block mb-1">
            ELIX
          </Link>
          <span className='text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase block'>
            Admin Dashboard
          </span>
        </div>

        <nav className='flex flex-col space-y-1.5'>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-900 text-white border-l-2 border-white py-3 px-4 flex items-center space-x-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white py-3 px-4 flex items-center space-x-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            }
          >
            <FaChartPie className="text-sm" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-900 text-white border-l-2 border-white py-3 px-4 flex items-center space-x-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white py-3 px-4 flex items-center space-x-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            }
          >
            <FaUsers className="text-sm" />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-900 text-white border-l-2 border-white py-3 px-4 flex items-center space-x-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white py-3 px-4 flex items-center space-x-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            }
          >
            <FaBoxOpen className="text-sm" />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-900 text-white border-l-2 border-white py-3 px-4 flex items-center space-x-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white py-3 px-4 flex items-center space-x-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            }
          >
            <FaClipboardList className="text-sm" />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-neutral-900 text-white border-l-2 border-white py-3 px-4 flex items-center space-x-3 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white py-3 px-4 flex items-center space-x-3 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            }
          >
            <FaStore className="text-sm" />
            <span>Shop</span>
          </NavLink>
        </nav>
      </div>

      <div className='mt-8 pt-6 border-t border-neutral-900'>
        <button
          onClick={handleLogout}
          className='w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 flex items-center justify-center space-x-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-sm hover:shadow rounded-none border-none'
        >
          <FaSignOutAlt className="text-sm" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;