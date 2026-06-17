import { Link } from 'react-router-dom';
import { ShoppingBagIcon, TruckIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';

const categories = [
  { name: 'Rice', emoji: '🌾', tamil: 'அரிசி', desc: 'Ponni, Basmati, Sona Masoori & more', color: 'bg-amber-50 border-amber-200' },
  { name: 'Pulses', emoji: '🫘', tamil: 'பருப்பு', desc: 'Toor, Urad, Chana, Moong dal', color: 'bg-orange-50 border-orange-200' },
  { name: 'Spices', emoji: '🌶️', tamil: 'மசாலா', desc: 'Turmeric, Chilli, Coriander powder', color: 'bg-red-50 border-red-200' },
  { name: 'Oil', emoji: '🫙', tamil: 'எண்ணெய்', desc: 'Groundnut, Coconut, Sesame oil', color: 'bg-yellow-50 border-yellow-200' },
  { name: 'Groceries', emoji: '🛒', tamil: 'நూறு பொருட்கள்', desc: 'Sugar, Salt, Flour & essentials', color: 'bg-green-50 border-green-200' },
];

export default function Home() {
  return (
    <div>
      {/* Storefront Hero with Background Image */}
      <section className="relative py-24 px-4 overflow-hidden" style={{
        backgroundImage: 'url(/storefront.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-2 text-sm uppercase tracking-wider font-bold text-yellow-300">Welcome to</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg">தஞ்சாவூர் அரிசி ஆலை</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300 drop-shadow-lg">Thanjavur Rice Mills</h2>
          <p className="text-lg md:text-xl text-yellow-100 mb-2 font-semibold drop-shadow-lg">தஞ்சாவூரின் மதுரமான சாதனங்கள் — Quality You Can Trust</p>
          <p className="text-yellow-200 mb-8 text-sm md:text-base drop-shadow-lg">Premium Wholesale Rice, Pulses, Spices & Groceries • Direct from our Mill to Your Home</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-4 px-10 rounded-lg transition-colors text-lg shadow-lg transform hover:scale-105">
              🛍️ Shop Now
            </Link>
            <a href="https://maps.app.goo.gl/EMjVDfV1UAJFJfBG8" target="_blank" rel="noopener noreferrer"
              className="border-2 border-yellow-400 text-white hover:bg-yellow-400 hover:text-green-900 font-bold py-4 px-10 rounded-lg transition-colors text-lg transform hover:scale-105">
              📍 Visit Our Store
            </a>
          </div>
        </div>
      </section>

      {/* Delivery Area Notice */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 text-center flex-col sm:flex-row">
          <span className="text-3xl">📦</span>
          <div>
            <p className="font-bold text-lg">We Deliver to Kunimuthur Area Only</p>
            <p className="text-sm text-orange-100">Fast & Fresh Delivery • Same-day Orders Welcome</p>
          </div>
        </div>
      </section>

      {/* Storefront Image */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-green-700">
            <img 
              src="/storefront.png" 
              alt="Thanjavur Rice Mills Storefront"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">Our Specialty</h2>
          <p className="text-center text-gray-600 mb-12">Experience authentic quality from Tamil Nadu's finest mill</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {categories.map((cat, idx) => (
              <Link key={cat.name} to={`/products?category=${cat.name}`}
                className={`group relative`}>
                <div className={`relative overflow-hidden rounded-2xl p-8 h-64 flex flex-col items-center justify-center text-center ${cat.color} border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}>
                  {/* Stack effect */}
                  <div className="absolute -z-10 inset-0 rounded-2xl transform translate-y-2 translate-x-2 bg-gray-200 opacity-30"></div>
                  <div className="absolute -z-20 inset-0 rounded-2xl transform translate-y-4 translate-x-4 bg-gray-100 opacity-20"></div>
                  
                  <div className="text-6xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-600 italic mb-2">{cat.tamil}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{cat.desc}</p>
                  <div className="mt-4 text-xs font-semibold text-green-700 group-hover:text-green-900">Browse →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Thanjavur Rice Mills?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: '⭐', 
                title: 'Premium Quality', 
                tamil: 'சிறந்த தரம்',
                desc: 'Handpicked grains and ingredients sourced directly from local farms' 
              },
              { 
                icon: '🚚', 
                title: 'Fast Delivery', 
                tamil: 'வேகமான விநியோகம்',
                desc: 'Same-day delivery available in Kunimuthur • Fast & Fresh' 
              },
              { 
                icon: '💰', 
                title: 'Best Prices', 
                tamil: 'சிறந்த விலை',
                desc: 'Direct from mill prices without middlemen markup' 
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-xl border-2 border-green-100 hover:border-green-500 bg-gradient-to-br from-green-50 to-white transition-all duration-300 hover:shadow-lg">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-green-700 font-semibold mb-3">{feature.tamil}</p>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-700 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
        }}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Ready to Order?</h2>
          <p className="text-xl text-green-100 mb-4">விளைபொருட்கள் வாங்கத் தயாரா?</p>
          <p className="text-green-200 mb-4 max-w-2xl mx-auto">Get the freshest wholesale products directly from our mill. Wholesale rates for bulk orders. Sign up now and enjoy exclusive benefits!</p>
          
          <div className="bg-yellow-300 text-green-900 rounded-lg px-4 py-3 mb-8 inline-block max-w-2xl mx-auto">
            <p className="font-bold">📍 Serving Kunimuthur • Fast Delivery Available</p>
            <p className="text-sm">Order today for same-day or next-day delivery!</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-4 px-10 rounded-lg transition-colors text-lg shadow-lg transform hover:scale-105">
              Browse All Products
            </Link>
            <Link to="/register" className="border-2 border-yellow-400 text-white hover:bg-yellow-400 hover:text-green-900 font-bold py-4 px-10 rounded-lg transition-colors text-lg transform hover:scale-105">
              Create Free Account
            </Link>
          </div>
          
          <p className="text-green-200 mt-8 text-sm">📞 Contact us for bulk orders | 🌐 Shop online 24/7</p>
        </div>
      </section>
    </div>
  );
}
