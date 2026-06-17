import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    if (product.stock === 0) return toast.error('Out of stock');
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="card hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 border border-gray-200 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'; }}
        />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          {product.category}
        </span>
        
        {/* Stock Status */}
        {product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            ✓ In Stock
          </span>
        )}
        
        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-bold text-gray-800 mb-2 truncate text-lg group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
        
        {/* Price and Unit */}
        <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-green-700">₹{product.price}</span>
            <span className="text-gray-500 text-xs font-semibold">per {product.unit}</span>
          </div>
        </div>
        
        {/* Stock and Add Button */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500">
            📦 {product.stock > 0 ? `${product.stock} ${product.unit}` : 'Out of stock'}
          </p>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className={`flex items-center gap-2 font-bold py-2 px-4 rounded-lg transition-all duration-300 ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg hover:scale-105 active:scale-95'
            }`}
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
