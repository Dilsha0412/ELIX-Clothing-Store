import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, addUser, updateUser, deleteUser } from '../../redux/slices/adminSlice'; 
import { toast } from 'sonner';

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isFormRoleOpen, setIsFormRoleOpen] = useState(false);

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
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        toast.success("User deleted successfully!");
      } catch (err) {
        toast.error(err || "Failed to delete user.");
      }
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
            <div className="w-full sm:w-64 relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsFormRoleOpen(!isFormRoleOpen)}
                  className="w-full inline-flex justify-between items-center border border-neutral-300 p-3 text-sm focus:border-black transition bg-white rounded-none cursor-pointer text-left"
                >
                  <span className="capitalize">{formData.role}</span>
                  <svg className="ml-2 h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isFormRoleOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setIsFormRoleOpen(false)}
                    />
                    <div className="absolute left-0 mt-1 w-full bg-white border border-neutral-300 shadow-md z-40 rounded-none">
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, role: "customer" });
                            setIsFormRoleOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider block transition ${
                            formData.role === "customer" 
                              ? "bg-black text-white" 
                              : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                          }`}
                        >
                          Customer
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, role: "admin" });
                            setIsFormRoleOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider block transition ${
                            formData.role === "admin" 
                              ? "bg-black text-white" 
                              : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                          }`}
                        >
                          Admin
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
      <div className="overflow-x-auto border border-neutral-200 rounded-none bg-white min-h-[380px]">
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
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() => setOpenDropdownId(openDropdownId === u._id ? null : u._id)}
                        className="inline-flex justify-between items-center w-32 border border-neutral-200 px-3 py-1.5 text-xs text-neutral-800 font-semibold bg-white hover:border-black transition rounded-none cursor-pointer"
                      >
                        <span className="capitalize">{u.role}</span>
                        <svg className="ml-2 h-3.5 w-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {openDropdownId === u._id && (
                        <>
                          {/* Overlay */}
                          <div 
                            className="fixed inset-0 z-30" 
                            onClick={() => setOpenDropdownId(null)}
                          />
                          <div className="absolute left-0 mt-1 w-32 bg-white border border-neutral-200 shadow-md z-40 rounded-none">
                            <div className="py-1">
                              <button
                                type="button"
                                onClick={() => {
                                  handleRoleChange(u._id, "customer");
                                  setOpenDropdownId(null);
                                }}
                                className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider block transition ${
                                  u.role === "customer" 
                                    ? "bg-black text-white" 
                                    : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                                }`}
                              >
                                Customer
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleRoleChange(u._id, "admin");
                                  setOpenDropdownId(null);
                                }}
                                className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase tracking-wider block transition ${
                                  u.role === "admin" 
                                    ? "bg-black text-white" 
                                    : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                                }`}
                              >
                                Admin
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
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