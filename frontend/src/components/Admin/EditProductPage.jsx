import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { fetchProductDetails, updateProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.adminProducts);

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Product Data State
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    collections: "",
    material: "",
    gender: "Unisex",
    images: [],
    isFeatured: false,
    isPublished: false,
    isNewArrival: false,
  });

  const [sizesInput, setSizesInput] = useState("");
  const [colorsInput, setColorsInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || 0,
        discountPrice: selectedProduct.discountPrice || "",
        countInStock: selectedProduct.countInStock || 0,
        sku: selectedProduct.sku || "",
        category: selectedProduct.category || "",
        brand: selectedProduct.brand || "",
        collections: selectedProduct.collections || "",
        material: selectedProduct.material || "",
        gender: selectedProduct.gender || "Unisex",
        images: selectedProduct.images || [],
        isFeatured: selectedProduct.isFeatured || false,
        isPublished: selectedProduct.isPublished || false,
        isNewArrival: selectedProduct.isNewArrival || false,
      });
      setSizesInput(selectedProduct.sizes ? selectedProduct.sizes.join(", ") : "");
      setColorsInput(selectedProduct.colors ? selectedProduct.colors.join(", ") : "");
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setUploading(true);
      const uploadedImages = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await axios.post(`${API_URL}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedImages.push({ url: data.imageUrl, altText: file.name.split(".")[0] });
      }

      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...uploadedImages],
      }));

      toast.success("Images uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setProductData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productData.images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const sizes = sizesInput.split(",").map((s) => s.trim()).filter(Boolean);
    const colors = colorsInput.split(",").map((c) => c.trim()).filter(Boolean);

    if (sizes.length === 0) {
      toast.error("Please enter at least one size.");
      return;
    }

    if (colors.length === 0) {
      toast.error("Please enter at least one color.");
      return;
    }

    const finalProductData = {
      ...productData,
      price: Number(productData.price),
      discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
      countInStock: Number(productData.countInStock),
      sizes,
      colors,
    };

    try {
      await dispatch(updateProduct({ id, productData: finalProductData })).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update product.");
    }
  };

  if (loading) return <p className="text-center my-8 text-sm font-semibold tracking-wider uppercase">Loading product details...</p>;
  if (error) return <p className="text-center my-8 text-sm font-semibold text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-none border border-neutral-200 bg-white my-8 rounded-none">
      <div className="mb-6">
        <h2 className="text-3xl font-black uppercase tracking-wider text-black mb-1">Edit Product</h2>
        <p className="text-xs text-neutral-500 tracking-wide font-medium">Update standard information and media for this catalog item</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
            rows={4}
            required
          />
        </div>

        {/* Price & Discount Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Discount Price ($)</label>
            <input
              type="number"
              name="discountPrice"
              value={productData.discountPrice}
              onChange={handleChange}
              placeholder="0.00 (Optional)"
              min="0"
              step="0.01"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>
        </div>

        {/* Count in Stock & SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Count in Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              min="0"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              placeholder="Enter product SKU (unique)"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
              required
            />
          </div>
        </div>

        {/* Category, Brand, Material */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              placeholder="e.g. Shirts, Pants"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              placeholder="e.g. BrandName"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Material</label>
            <input
              type="text"
              name="material"
              value={productData.material}
              onChange={handleChange}
              placeholder="e.g. Cotton, Polyester"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
            />
          </div>
        </div>

        {/* Gender & Collections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Gender</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsGenderOpen(!isGenderOpen)}
                className="w-full inline-flex justify-between items-center border border-neutral-300 p-3 text-sm focus:border-black transition bg-white rounded-none cursor-pointer text-left"
              >
                <span>{productData.gender}</span>
                <svg className="ml-2 h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isGenderOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setIsGenderOpen(false)}
                  />
                  <div className="absolute left-0 mt-1 w-full bg-white border border-neutral-300 shadow-md z-40 rounded-none">
                    <div className="py-1">
                      {["Men", "Women", "Unisex"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setProductData({ ...productData, gender: g });
                            setIsGenderOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider block transition ${
                            productData.gender === g 
                              ? "bg-black text-white" 
                              : "text-neutral-700 hover:bg-neutral-100 hover:text-black"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Collection</label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              placeholder="e.g. Summer Collection"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
              required
            />
          </div>
        </div>

        {/* Sizes & Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Sizes (comma-separated)</label>
            <input
              type="text"
              value={sizesInput}
              onChange={(e) => setSizesInput(e.target.value)}
              placeholder="e.g. S, M, L, XL"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Colors (comma-separated)</label>
            <input
              type="text"
              value={colorsInput}
              onChange={(e) => setColorsInput(e.target.value)}
              placeholder="e.g. Red, Blue, Black"
              className="w-full border border-neutral-300 rounded-none p-3 text-sm focus:outline-none focus:border-black transition"
              required
            />
          </div>
        </div>

        {/* Toggles: Featured & Published & New Arrival */}
        <div className="flex gap-8 mb-6">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={productData.isFeatured}
              onChange={handleChange}
              className="w-5 h-5 border-neutral-300 rounded-none focus:ring-0 focus:border-black text-black accent-black cursor-pointer"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Is Featured</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              checked={productData.isPublished}
              onChange={handleChange}
              className="w-5 h-5 border-neutral-300 rounded-none focus:ring-0 focus:border-black text-black accent-black cursor-pointer"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Is Published</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="isNewArrival"
              checked={productData.isNewArrival}
              onChange={handleChange}
              className="w-5 h-5 border-neutral-300 rounded-none focus:ring-0 focus:border-black text-black accent-black cursor-pointer"
            />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">Is New Arrival</span>
          </label>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Upload Images (Select one or more)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 block w-full text-sm text-neutral-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-none file:border file:border-neutral-200 file:text-xs file:font-bold file:uppercase file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100 cursor-pointer"
          />

          {uploading && <p className="text-black mb-4 animate-pulse text-xs font-bold uppercase tracking-wider">Uploading images...</p>}

          <div className="flex flex-wrap gap-4">
            {productData.images.map((img, index) => (
              <div key={index} className="relative group w-24 h-24">
                <img
                  src={img.url}
                  alt={`product-img-${index}`}
                  className="w-full h-full object-cover rounded-none shadow-sm border border-neutral-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold hover:bg-neutral-800 transition shadow cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="flex-1 border border-neutral-300 text-neutral-700 bg-white font-bold py-3 px-4 rounded-none hover:bg-neutral-50 hover:border-black transition duration-300 cursor-pointer text-center text-xs uppercase tracking-widest"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="flex-[2] bg-black text-white font-bold py-3 px-4 rounded-none hover:bg-neutral-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-center text-xs uppercase tracking-widest"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;