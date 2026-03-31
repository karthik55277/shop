import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setOpen(false); };

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <div>
            <div className="font-bold text-lg leading-tight">Thanjavur Arasi Aalai</div>
            <div className="text-xs text-green-200">Wholesale Rice & Groceries</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/products" className="hover:text-green-200 transition-colors">Products</Link>
          {user?.role === 'admin' && <Link to="/admin" className="hover:text-green-200 transition-colors">Admin</Link>}
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="hover:text-green-200 transition-colors">My Orders</Link>
              <button onClick={handleLogout} className="hover:text-green-200 transition-colors">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 hover:text-green-200 transition-colors">
              <UserIcon className="w-5 h-5" /> Login
            </Link>
          )}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="w-6 h-6" />
            {itemCount > 0 && <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{itemCount}</span>}
          </Link>
          <button onClick={() => setOpen(!open)}>{open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}</button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-green-800 px-4 pb-4 flex flex-col gap-3">
          <Link to="/products" onClick={() => setOpen(false)} className="py-2 border-b border-green-700">Products</Link>
          {user?.role === 'admin' && <Link to="/admin" onClick={() => setOpen(false)} className="py-2 border-b border-green-700">Admin</Link>}
          {user ? (
            <>
              <Link to="/orders" onClick={() => setOpen(false)} className="py-2 border-b border-green-700">My Orders</Link>
              <button onClick={handleLogout} className="py-2 text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="py-2">Login / Register</Link>
          )}
        </div>
      )}
    </nav>
  );
}
