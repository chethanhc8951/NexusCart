import { useEffect, useState } from "react";
import API from "../services/api";
import { getUser } from "../utils/auth";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Trash2, CreditCard, ArrowRight, Package, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  const loadCart = async (user) => {
    try {
      const res = await API.get(`/cart`, {
        params: { username: user },
      });

      const items = res.data;

      // Fetch product details for each item
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          try {
            const productRes = await API.get(`/api/products/${item.productId}`);
            return {
              ...item,
              product: productRes.data,
            };
          } catch (err) {
            console.error("Product fetch error", err);
            return item;
          }
        })
      );

      setCartItems(updatedItems);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUsername(user);
      loadCart(user);
    } else {
      setIsLoading(false);
    }
  }, []);

  const removeItem = async (id) => {
    if (!username) return;
    try {
      await API.delete(`/cart/remove/${id}`, {
        params: { username },
      });
      toast.success("Item removed");
      loadCart(username);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const placeOrder = async () => {
    if (!username) {
      toast.error("Please login to place an order");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);
    try {
      await API.post(`/orders/place`, null, {
        params: { username },
      });
      toast.success("Order placed successfully! 🎉");
      setCartItems([]);
      navigate("/my-orders");
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-12">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <ShoppingCart className="text-white w-6 h-6" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Your Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200"
        >
          <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Start exploring our collection!</p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all transform hover:scale-105"
          >
            Start Shopping <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-6"
                >
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                    {item.product?.imageUrl ? (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.product?.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="font-medium">Qty: {item.quantity}</span>
                      <span className="font-medium text-indigo-600">₹{item.price} each</span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end space-y-4">
                    <span className="text-xl font-bold text-gray-900">₹{item.price * item.quantity}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-indigo-100/50 sticky top-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-emerald-500 font-bold uppercase text-xs tracking-widest">Free</span>
              </div>
              <div className="h-px bg-gray-100 my-4" />
              <div className="flex justify-between items-end">
                <span className="text-gray-900 font-bold">Total Amount</span>
                <span className="text-3xl font-bold text-indigo-600">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              disabled={isPlacingOrder}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-6 h-6" />
                  <span>Place Order</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-6 font-medium uppercase tracking-widest">
              Secure Checkout Powered by NexusCart
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
