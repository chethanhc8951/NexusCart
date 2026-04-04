import { useEffect, useState } from "react";
import API from "../services/api";
import { getUser } from "../utils/auth";
import { motion } from "motion/react";
import { Package, Calendar, Tag, CheckCircle2, Clock, Truck, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrders = async (user) => {
    try {
      const res = await API.get("/orders/my-orders", {
        params: { username: user },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error loading orders", err);
      toast.error("Failed to load your orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      loadOrders(user);
    } else {
      setIsLoading(false);
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "shipped": return <Truck className="w-5 h-5 text-indigo-500" />;
      case "pending": return <Clock className="w-5 h-5 text-amber-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "shipped": return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-100";
      default: return "bg-gray-50 text-gray-700 border-gray-100";
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-12">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Package className="text-white w-6 h-6" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-indigo-50/50 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                    <p className="text-xl font-mono font-bold text-gray-900">{String(order.id).slice(-8)}</p>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-2xl border flex items-center space-x-2 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="font-bold text-sm uppercase tracking-wider">{order.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6 bg-gray-50 rounded-3xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <Tag className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Total Amount</p>
                      <p className="text-lg font-bold text-gray-900">₹{order.totalAmount}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Date Placed</p>
                      <p className="text-lg font-bold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button className="text-indigo-600 font-bold text-sm hover:underline uppercase tracking-widest">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
