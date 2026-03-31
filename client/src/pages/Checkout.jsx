import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const loadRazorpay = () =>
  new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ address: user?.address || '', phone: user?.phone || '' });

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!form.address || !form.phone) return toast.error('Please fill all fields');
    if (cart.length === 0) return toast.error('Cart is empty');

    setLoading(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) return toast.error('Payment gateway failed to load');

      const { data } = await api.post('/orders', {
        items: cart.map(i => ({ product: i._id, quantity: i.quantity })),
        shippingAddress: form.address,
        phone: form.phone
      });

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'Thanjavur Arasi Aalai',
        description: 'Wholesale Grocery Order',
        image: '🌾',
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          try {
            const { data: verified } = await api.post('/orders/verify-payment', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: data.order._id
            });
            clearCart();
            toast.success('Payment successful! Order placed.');
            navigate(`/orders/${verified.order._id}`);
          } catch (err) {
            toast.error(err.message || 'Payment verification failed');
          }
        },
        prefill: { name: user?.name, email: user?.email, contact: form.phone },
        theme: { color: '#16a34a' },
        modal: { ondismiss: () => toast.error('Payment cancelled') }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleCheckout} className="card p-6 space-y-4">
          <h2 className="font-semibold text-lg">Delivery Details</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input className="input-field" value={user?.name} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input name="phone" className="input-field" placeholder="+91 98765 43210"
              value={form.phone} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label>
            <textarea name="address" className="input-field" rows={3} placeholder="Enter full delivery address"
              value={form.address} onChange={handleChange} required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-lg">
            {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
          </button>
          <p className="text-xs text-gray-400 text-center">Secured by Razorpay</p>
        </form>

        <div className="card p-6 h-fit">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} × {item.quantity} {item.unit}</span>
                <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-green-700">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
