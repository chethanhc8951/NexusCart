import React, { useState } from "react";
import API from "../services/api";
import { motion } from "motion/react";
import { PlusCircle, Image as ImageIcon, Tag, Package, IndianRupee, Hash, Layers, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    skuCode: "",
    stock: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warning("Please select a product image");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("skuCode", form.skuCode);
    formData.append("image", image);
    formData.append("stock", form.stock);

    try {
      await API.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully! 🚀");
      navigate("/products");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to add product. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-gray-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      <div className="flex items-center space-x-4 mb-12">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <PlusCircle className="text-white w-6 h-6" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image Upload */}
        <div className="space-y-6">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Product Image</label>
          <div className="relative group">
            <div className={`aspect-square rounded-[2.5rem] border-4 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden bg-gray-50 ${imagePreview ? 'border-indigo-200' : 'border-gray-200 group-hover:border-indigo-400'}`}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Click to upload image</p>
                  <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest">JPG, PNG, WEBP (Max 5MB)</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Product Name</label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="name"
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                placeholder="e.g. Premium Wireless Headphones"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm resize-none"
              placeholder="Tell us about this product..."
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Price (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="price"
                  type="number"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                  placeholder="0.00"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">Stock</label>
              <div className="relative">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="stock"
                  type="number"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                  placeholder="0"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-2">SKU Code</label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="skuCode"
                required
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                placeholder="e.g. WH-1000XM4"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 disabled:opacity-50 mt-8"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <PlusCircle className="w-6 h-6" />
                <span>Publish Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
