import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import Spinner from '../../components/Spinner';

const STATUSES = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800', Paid: 'bg-blue-100 text-blue-800',
  Processing: 'bg-purple-100 text-purple-800', Shipped: 'bg-indigo-100 text-indigo-800',
  Delivered: 'bg-green-100 text-green-800', Cancelled: 'bg-red-100 text-red-800'
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api.get('/orders/admin/all').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: data.status } : o));
      toast.success(`Status updated to ${status}`);
    } catch (err) { toast.error(err.message || 'Failed to update'); }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders ({orders.length})</h1>
      <div className="space-y-3">
        {orders.map(order => (
          <div key={order._id} className="card overflow-hidden">
            <div
              className="p-4 flex flex-wrap items-center gap-4 cursor-pointer hover:bg-gray-50"
              onClick={() => setExpanded(expanded === order._id ? null : order._id)}
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono font-semibold">#{order._id.slice(-8).toUpperCase()}</p>
                <p className="text-sm text-gray-500">{order.user?.name} · {order.user?.email}</p>
                <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">₹{order.total.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{order.items.length} item(s)</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                {order.status}
              </span>
              <select
                value={order.status}
                onChange={e => { e.stopPropagation(); updateStatus(order._id, e.target.value); }}
                onClick={e => e.stopPropagation()}
                className="input-field w-auto text-sm py-1"
              >
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {expanded === order._id && (
              <div className="border-t bg-gray-50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Items</p>
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm py-1 border-b last:border-0">
                        <span>{item.name} × {item.quantity} {item.unit}</span>
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm space-y-1">
                    {order.shippingAddress && <p><span className="font-medium">Address:</span> {order.shippingAddress}</p>}
                    {order.phone && <p><span className="font-medium">Phone:</span> {order.phone}</p>}
                    {order.paymentId && <p><span className="font-medium">Payment ID:</span> <span className="font-mono text-xs">{order.paymentId}</span></p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
