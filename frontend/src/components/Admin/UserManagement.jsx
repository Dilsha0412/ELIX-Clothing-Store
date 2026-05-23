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
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      {loading && <p className="text-blue-500 animate-pulse mb-4">Loading users...</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      {/* Add New User Form Section */}
      <div className="p-6 rounded-lg mb-6 bg-white shadow-md">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List Management Table Section */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {u.name}
                  </td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="p-2 border rounded bg-white text-gray-700 focus:outline-none cursor-pointer"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
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