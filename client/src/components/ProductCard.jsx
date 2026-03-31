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
    <div className="card hover:shadow-md transition-shadow group">
      <div className="relative overflow-hidden h-48 bg-gray-100">
        <img
          src={product.image || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'; }}
        />
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
          {product.category}
        </span>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-green-700">₹{product.price}</span>
            <span className="text-gray-400 text-sm">/{product.unit}</span>
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="flex items-center gap-1 btn-primary text-sm py-1.5 px-3"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            Add
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Stock: {product.stock} {product.unit}</p>
      </div>
    </div>
  );
}
