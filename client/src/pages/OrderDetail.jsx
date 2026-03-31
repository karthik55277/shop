import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import api from '../utils/api';
import Spinner from '../components/Spinner';

const STATUS_STEPS = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered'];
const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-800', Paid: 'bg-blue-100 text-blue-800',
  Processing: 'bg-purple-100 text-purple-800', Shipped: 'bg-indigo-100 text-indigo-800',
  Delivered: 'bg-green-100 text-green-800', Cancelled: 'bg-red-100 text-red-800'
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`).then(({ data }) => setOrder(data)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!order) return <div className="text-center py-16 text-gray-500">Order not found</div>;

  const stepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[order.status]}`}>{order.status}</span>
      </div>

      {order.status !== 'Cancelled' && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between">
            {STATUS_STEPS.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i <= stepIndex ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {i < stepIndex ? <CheckCircleIcon className="w-5 h-5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <span className="text-xs mt-1 text-gray-500 hidden sm:block">{step}</span>
                </div>
                {i < STATUS_STEPS.length - 1 && <div className={`flex-1 h-1 mx-1 ${i < stepIndex ? 'bg-green-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card p-6 mb-4">
        <h2 className="font-semibold mb-3">Order #{order._id.slice(-8).toUpperCase()}</h2>
        <p className="text-sm text-gray-500 mb-4">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price} × {item.quantity} {item.unit}</p>
              </div>
              <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
          <span>Total</span>
          <span className="text-green-700">₹{order.total.toFixed(2)}</span>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="card p-6 mb-4">
          <h2 className="font-semibold mb-2">Delivery Address</h2>
          <p className="text-gray-600">{order.shippingAddress}</p>
          {order.phone && <p className="text-gray-600 mt-1">📞 {order.phone}</p>}
        </div>
      )}

      {order.paymentId && (
        <div className="card p-6 mb-4">
          <h2 className="font-semibold mb-2">Payment Info</h2>
          <p className="text-sm text-gray-500">Payment ID: {order.paymentId}</p>
        </div>
      )}

      <Link to="/orders" className="btn-outline inline-block">← Back to Orders</Link>
    </div>
  );
}
