import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, CubeIcon, CurrencyRupeeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import api from '../../utils/api';
import Spinner from '../../components/Spinner';

const STATUS_COLORS = {
  Pending: 'text-yellow-600', Paid: 'text-blue-600', Processing: 'text-purple-600',
  Shipped: 'text-indigo-600', Delivered: 'text-green-600', Cancelled: 'text-red-600'
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/orders/admin/all'), api.get('/products/admin/all')])
      .then(([ordersRes, productsRes]) => {
        const orders = ordersRes.data;
        const products = productsRes.data;
        const revenue = orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);
        setStats({
          orders: orders.length, products: products.length, revenue,
          paid: orders.filter(o => ['Paid', 'Delivered'].includes(o.status)).length
        });
        setRecentOrders(orders.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: stats.orders, icon: <ShoppingBagIcon className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600' },
          { label: 'Products', value: stats.products, icon: <CubeIcon className="w-6 h-6" />, color: 'bg-green-50 text-green-600' },
          { label: 'Revenue', value: `₹${stats.revenue.toFixed(0)}`, icon: <CurrencyRupeeIcon className="w-6 h-6" />, color: 'bg-amber-50 text-amber-600' },
          { label: 'Paid Orders', value: stats.paid, icon: <CheckCircleIcon className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600' },
        ].map(s => (
          <div key={s.label} className="card p-5">
            <div className={`inline-flex p-2 rounded-lg ${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Recent Orders</h2>
          <Link to="/admin/orders" className="text-green-600 text-sm hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="py-2 pr-4">Order ID</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o._id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 pr-4 font-mono">#{o._id.slice(-6).toUpperCase()}</td>
                  <td className="py-2 pr-4">{o.user?.name || 'N/A'}</td>
                  <td className="py-2 pr-4 font-semibold">₹{o.total.toFixed(2)}</td>
                  <td className={`py-2 font-medium ${STATUS_COLORS[o.status]}`}>{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
