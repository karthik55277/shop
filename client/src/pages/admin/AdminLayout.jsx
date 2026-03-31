import { NavLink, Outlet } from 'react-router-dom';
import { HomeIcon, CubeIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const links = [
  { to: '/admin', label: 'Dashboard', icon: <HomeIcon className="w-5 h-5" />, end: true },
  { to: '/admin/products', label: 'Products', icon: <CubeIcon className="w-5 h-5" /> },
  { to: '/admin/orders', label: 'Orders', icon: <ShoppingBagIcon className="w-5 h-5" /> },
];

export default function AdminLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
              }`
            }>
            {l.icon}{l.label}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
