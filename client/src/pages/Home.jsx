import { Link } from 'react-router-dom';
import { ShoppingBagIcon, TruckIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';

const categories = [
  { name: 'Rice', emoji: '🌾', desc: 'Ponni, Basmati, Sona Masoori & more', color: 'bg-amber-50 border-amber-200' },
  { name: 'Pulses', emoji: '🫘', desc: 'Toor, Urad, Chana, Moong dal', color: 'bg-orange-50 border-orange-200' },
  { name: 'Spices', emoji: '🌶️', desc: 'Turmeric, Chilli, Coriander powder', color: 'bg-red-50 border-red-200' },
  { name: 'Oil', emoji: '🫙', desc: 'Groundnut, Coconut, Sesame oil', color: 'bg-yellow-50 border-yellow-200' },
  { name: 'Groceries', emoji: '🛒', desc: 'Sugar, Salt, Flour & essentials', color: 'bg-green-50 border-green-200' },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">🌾</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Thanjavur Arasi Aalai</h1>
          <p className="text-xl text-green-100 mb-2">Premium Wholesale Rice & Groceries</p>
          <p className="text-green-200 mb-8">Direct from the heart of Thanjavur — quality you can trust, prices you'll love</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl transition-colors text-lg">
              Shop Now
            </Link>
            <a href="https://maps.app.goo.gl/EMjVDfV1UAJFJfBG8" target="_blank" rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-3 px-8 rounded-xl transition-colors text-lg">
              Visit Store
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <TruckIcon className="w-8 h-8 text-green-600" />, title: 'Wholesale Delivery', desc: 'Bulk orders delivered to your doorstep' },
            { icon: <ShieldCheckIcon className="w-8 h-8 text-green-600" />, title: 'Quality Assured', desc: 'Handpicked premium quality products' },
            { icon: <StarIcon className="w-8 h-8 text-green-600" />, title: 'Best Prices', desc: 'Wholesale rates for everyone' }
          ].map(f => (
            <div key={f.title} className="flex items-start gap-4 p-6 rounded-xl bg-green-50 border border-green-100">
              {f.icon}
              <div><h3 className="font-semibold text-gray-800">{f.title}</h3><p className="text-gray-500 text-sm">{f.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <Link key={cat.name} to={`/products?category=${cat.name}`}
                className={`card border-2 ${cat.color} p-4 text-center hover:shadow-md transition-shadow`}>
                <div className="text-4xl mb-2">{cat.emoji}</div>
                <div className="font-semibold text-gray-800">{cat.name}</div>
                <div className="text-xs text-gray-500 mt-1">{cat.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <ShoppingBagIcon className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Ready to Order Wholesale?</h2>
          <p className="text-gray-600 mb-6">Get the best prices on bulk orders. Register now and start saving!</p>
          <Link to="/register" className="btn-primary text-lg py-3 px-8 inline-block">Create Account</Link>
        </div>
      </section>
    </div>
  );
}
