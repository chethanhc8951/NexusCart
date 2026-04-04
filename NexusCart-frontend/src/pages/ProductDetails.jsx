import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "motion/react";
import { ShoppingCart, ArrowLeft, CheckCircle2, XCircle, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    API.get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Product not found");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const addToCart = async () => {
    if (!product) return;
    setIsAdding(true);
    try {
      await API.post(`/cart/add?productId=${product.id}&quantity=1`);
      toast.success("Added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 text-indigo-600 font-semibold hover:underline flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </button>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-gray-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl shadow-indigo-100/50"
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-50 flex items-center justify-center text-gray-200">
              <ShoppingCart className="w-32 h-32" />
            </div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                SKU: {product.skuCode}
              </span>
              {isOutOfStock ? (
                <span className="flex items-center text-red-500 text-sm font-semibold">
                  <XCircle className="w-4 h-4 mr-1" /> Out of Stock
                </span>
              ) : (
                <span className="flex items-center text-emerald-500 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> In Stock ({product.stock})
                </span>
              )}
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            <p className="text-4xl font-bold text-indigo-600">₹{product.price}</p>
          </div>

          <div className="prose prose-indigo mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="p-4 bg-gray-50 rounded-2xl text-center">
              <ShieldCheck className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <span className="text-xs font-bold text-gray-500 uppercase">Secure Payment</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl text-center">
              <Truck className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <span className="text-xs font-bold text-gray-500 uppercase">Fast Delivery</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl text-center">
              <RotateCcw className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <span className="text-xs font-bold text-gray-500 uppercase">Easy Returns</span>
            </div>
          </div>

          <button
            onClick={addToCart}
            disabled={isOutOfStock || isAdding}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isAdding ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-6 h-6" />
                <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
