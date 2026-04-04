import React, { useEffect, useState } from "react";
import { getUser, logout, isAdmin } from "../utils/auth";
import { motion } from "motion/react";
import { User, Mail, Shield, LogOut, Package, ArrowRight, Settings } from "lucide-react";
import MyOrders from "./MyOrders";
import { Link } from "react-router-dom";

export default function Profile() {
  const [username, setUsername] = useState(null);
  const userIsAdmin = isAdmin();

  useEffect(() => {
    setUsername(getUser());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* User Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-8"
        >
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-50/50 text-center">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200">
              <User className="text-white w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{username}</h2>
            <div className="flex items-center justify-center space-x-2 mb-8">
              {userIsAdmin ? (
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider flex items-center">
                  <Shield className="w-3 h-3 mr-1" /> Admin Account
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-full uppercase tracking-wider">
                  Customer Account
                </span>
              )}
            </div>

            <div className="space-y-4 text-left">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Email Address</p>
                  <p className="text-sm font-semibold text-gray-700">{username}@nexuscart.com</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <Settings className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Account Status</p>
                  <p className="text-sm font-semibold text-emerald-600">Active & Verified</p>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full mt-8 flex items-center justify-center space-x-2 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all group"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Sign Out</span>
            </button>
          </div>

          {userIsAdmin && (
            <Link
              to="/add-product"
              className="block p-6 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] text-white shadow-xl shadow-indigo-200 hover:shadow-2xl transition-all group"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold mb-1">Inventory Management</h3>
                  <p className="text-indigo-100 text-sm">Add new products to store</p>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          )}
        </motion.div>

        {/* Orders Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-50/50">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Package className="text-indigo-600 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            </div>
            
            {/* We can reuse the MyOrders logic here or just a simplified version */}
            <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              <MyOrders />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
