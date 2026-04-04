import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { ShoppingCart, Plus, ArrowRight, Package, SearchX } from "lucide-react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    API.get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const addToCart = async (e, productId) => {
    e.stopPropagation();
    try {
      await API.post(`/cart/add?productId=${productId}&quantity=1`);
      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Our Collection"}
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            {searchQuery 
              ? `Found ${filteredProducts.length} matching items`
              : "Discover the latest trends and essentials"}
          </p>
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            {filteredProducts.length} Products Found
          </span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          {searchQuery ? (
            <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          ) : (
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          )}
          <h3 className="text-xl font-semibold text-gray-900">
            {searchQuery ? "No matching products" : "No products yet"}
          </h3>
          <p className="text-gray-500 mt-2">
            {searchQuery ? "Try searching for something else" : "Check back later for new arrivals"}
          </p>
          {searchQuery && (
            <button
              onClick={() => navigate("/products")}
              className="mt-6 text-indigo-600 font-bold hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer flex flex-col h-full"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Package className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={(e) => addToCart(e, product.id)}
                    className="p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-indigo-600">₹{product.price}</span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-2 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
