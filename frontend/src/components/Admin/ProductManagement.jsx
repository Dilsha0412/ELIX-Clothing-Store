import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, deleteProduct } from '../../redux/slices/adminProductSlice';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'sonner';


const ProductManagement = () => {
const dispatch = useDispatch();
const { products, loading, error } = useSelector(
  (state) => state.adminProducts
);
const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  dispatch(fetchAdminProducts());
}, [dispatch]);

  // Filter products by Name or SKU
  const filteredProducts = products ? products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      product.sku?.toLowerCase().includes(term)
    );
  }) : [];

  // Delete Product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        toast.success("Product deleted successfully!");
      } catch (err) {
        toast.error(err || "Failed to delete product.");
      }
    }
  };

  if(loading) return <p>Loading...</p>;
  if(error) return <p >Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-wider text-black mb-1">Product Management</h2>
          <p className="text-xs text-neutral-500 tracking-wide font-medium">Manage and update your retail catalog items</p>
        </div>
        <Link
          to="/admin/products/create"
          className="bg-black hover:bg-neutral-800 text-white px-5 py-3 text-xs font-bold uppercase tracking-widest rounded-none transition duration-300 shadow-sm hover:shadow"
        >
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <input
          type="text"
          placeholder="Search products by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-neutral-300 bg-white pl-10 pr-4 py-2.5 text-sm rounded-none focus:outline-none focus:border-black transition duration-300 placeholder:text-neutral-400"
        />
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <FiSearch className="h-4 w-4 text-neutral-400" />
        </div>
      </div>

      {/* Product List Table Section */}
      <div className="overflow-x-auto border border-neutral-200 rounded-none bg-white">
        <table className="min-w-full text-left text-neutral-600">
          <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-200">
            <tr>
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">SKU</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-neutral-900 whitespace-nowrap text-sm">
                    {product.name}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-neutral-700">${product.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm text-neutral-500 font-mono">{product.sku}</td>
                  <td className="py-4 px-6 text-center">

                    {/* Edit Button */}
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="inline-block border border-black bg-black text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-neutral-800 transition duration-300 mr-2"
                    >
                      Edit
                    </Link>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="border border-neutral-300 bg-white text-neutral-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-none hover:text-red-600 hover:border-red-600 transition duration-300 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 px-6 text-center text-sm text-neutral-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;