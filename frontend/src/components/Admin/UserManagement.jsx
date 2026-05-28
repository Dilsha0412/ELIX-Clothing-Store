import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, addUser, updateUser, deleteUser } from '../../redux/slices/adminSlice'; 

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);

  // Security Check
  useEffect(() => {
  if (!loading && user && user.role !== "admin") {
    navigate("/");
  }
}, [user, loading, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers()); 
    }
  }, [dispatch, user]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", 
  });

  // Handle Form Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add New User
  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(addUser(formData));

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  // Handle Role Change Dropdown
  const handleRoleChange = (uId, newRole) => {
    const targetUser = users.find((u) => u._id === uId);
    if (targetUser) {
      dispatch(updateUser({ 
        id: uId, 
        name: targetUser.name, 
        email: targetUser.email, 
        role: newRole 
      }));
    }
  };

  // Delete User
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId)); 
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-black uppercase tracking-wider text-black mb-1">User Management</h2>
        <p className="text-xs text-neutral-500 tracking-wide font-medium">Create and manage accounts and system privileges</p>
      </div>
      
      {loading && <p className="text-black animate-pulse mb-4 text-xs font-semibold tracking-wider uppercase">Loading users...</p>}
      {error && <p className="text-red-500 mb-4 text-xs font-semibold">{error}</p>}

      {/* Add New User Form Section */}
      <div className="p-8 border border-neutral-200 bg-white rounded-none mb-8">
        <h3 className="text-xs font-bold tracking-widest text-neutral-400 uppercase mb-6">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Name Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-3 border border-neutral-300 rounded-none text-sm focus:border-black focus:ring-0 focus:outline-none transition bg-white"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full p-3 border border-neutral-300 rounded-none text-sm focus:border-black focus:ring-0 focus:outline-none transition bg-white"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full p-3 border border-neutral-300 rounded-none text-sm focus:border-black focus:ring-0 focus:outline-none transition bg-white"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            {/* Role Field */}
            <div className="w-full sm:w-64">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border border-neutral-300 rounded-none text-sm focus:border-black focus:ring-0 focus:outline-none transition bg-white cursor-pointer"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black hover:bg-neutral-800 text-white font-bold py-3 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 shadow-sm cursor-pointer"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* User List Management Table Section */}
      <div className="overflow-x-auto border border-neutral-200 rounded-none bg-white">
        <table className="min-w-full text-left text-neutral-600">
          <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
            <tr>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {users && users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-neutral-900 whitespace-nowrap text-sm">
                    {u.name}
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-600">{u.email}</td>
                  <td className="py-4 px-6 text-sm">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="p-1.5 border border-neutral-200 rounded-none bg-white text-neutral-800 text-xs font-medium focus:border-black cursor-pointer"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="border border-neutral-300 bg-white text-neutral-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-none hover:text-red-600 hover:border-red-600 transition duration-300 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-8 px-6 text-center text-sm text-neutral-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;