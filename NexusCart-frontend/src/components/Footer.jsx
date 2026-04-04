import React from "react";
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <ShoppingCart className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                NexusCart
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed">
              Experience the future of shopping with NexusCart. Premium quality products, lightning-fast delivery, and secure payments.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-gray-500 hover:text-indigo-600 transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="text-gray-500 hover:text-indigo-600 transition-colors">Shopping Cart</Link></li>
              <li><Link to="/profile" className="text-gray-500 hover:text-indigo-600 transition-colors">My Profile</Link></li>
              <li><Link to="/my-orders" className="text-gray-500 hover:text-indigo-600 transition-colors">Order History</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase tracking-widest text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-500">
                <MapPin className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>123 Nexus Street, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Phone className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-500">
                <Mail className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <span>support@nexuscart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} NexusCart. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
