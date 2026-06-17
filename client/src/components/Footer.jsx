import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌾</span>
            <div>
              <div className="font-bold text-lg">Thanjavur Arasi Aalai</div>
              <div className="text-green-300 text-sm">Wholesale Rice & Groceries</div>
            </div>
          </div>
          <p className="text-green-300 text-sm">Your trusted wholesale partner for premium quality rice and grocery items since decades.</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <div className="space-y-2 text-green-300 text-sm">
            <div className="flex items-center gap-2"><PhoneIcon className="w-4 h-4" /><a href="tel:+919443335527" className="hover:text-white transition-colors">+91 94433 35527</a></div>
            <div className="flex items-center gap-2"><EnvelopeIcon className="w-4 h-4" /><a href="mailto:thanjavurarasiaalai@gmail.com" className="hover:text-white transition-colors">thanjavurarasiaalai@gmail.com</a></div>
            <div className="flex items-start gap-2"><MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>Shop No. 300, Palakkad - Coimbatore Rd, Pulakadu, Kuniyamuthur, Tamil Nadu 641008, India</span></div>
          </div>
          <div className="mt-4 p-3 bg-orange-600/30 border border-orange-500 rounded text-orange-200 text-xs">
            <p className="font-bold mb-1">📦 Delivery Area: Kunimuthur Only</p>
            <p>We deliver fresh products to Kunimuthur area with same-day service available.</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Find Us</h3>
          <a
            href="https://maps.app.goo.gl/EMjVDfV1UAJFJfBG8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <MapPinIcon className="w-4 h-4" />
            View on Google Maps
          </a>
          <p className="text-green-300 text-xs mt-3">Open: Mon–Sat, 10 AM – 10 PM &nbsp;|&nbsp; Sun, 10 AM – 2 PM</p>
        </div>
      </div>
      <div className="border-t border-green-800 text-center py-4 text-green-400 text-sm">
        © {new Date().getFullYear()} Thanjavur Arasi Aalai. All rights reserved.
      </div>
    </footer>
  );
}
