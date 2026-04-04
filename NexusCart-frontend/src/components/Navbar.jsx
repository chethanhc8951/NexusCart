import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getUser, isAdmin } from "../utils/auth";
import { ShoppingCart, Package, PlusCircle, User, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setUsername(getUser());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
      navigate(`/products?search=${searchQuery}`);
    } else {
      setSearchParams({});
      navigate(`/products`);
    }
  };

  const isUserAdmin =true;
  //  isAdmin();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <span className="hidden sm:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              NexusCart
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-grow max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </form>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {isUserAdmin && (
              <Link
                to="/add-product"
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center space-x-1"
                title="Add Product"
              >
                <PlusCircle className="w-5 h-5" />
                <span className="hidden lg:block">Add Product</span>
              </Link>
            )}
            
            <Link
              to="/products"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center space-x-1"
              title="Shop"
            >
              <Package className="w-5 h-5" />
              <span className="hidden lg:block">Shop</span>
            </Link>

            <Link
              to="/profile"
              className="text-gray-600 hover:text-indigo-600 font-medium transition-colors flex items-center space-x-1"
              title="Profile"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:block">Profile</span>
            </Link>

            <Link
              to="/cart"
              className="relative p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
              title="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-3 space-y-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                />
              </form>
              
              <div className="space-y-1">
                <Link
                  to="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Shop</span>
                  </div>
                </Link>
                
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </div>
                </Link>

                {isUserAdmin && (
                  <Link
                    to="/add-product"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <PlusCircle className="w-5 h-5" />
                      <span>Add Product</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
