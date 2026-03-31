import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const CATEGORIES = ['All', 'Rice', 'Pulses', 'Spices', 'Oil', 'Groceries', 'Other'];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 12 };
        if (category !== 'All') params.category = category;
        if (search) params.search = search;
        const { data } = await api.get('/products', { params });
        setProducts(data.products);
        setTotalPages(data.pages);
      } catch { /* handled by interceptor */ }
      finally { setLoading(false); }
    };
    fetchProducts();
  }, [category, search, page]);

  const handleCategory = (cat) => {
    setCategory(cat);
    setPage(1);
    if (cat !== 'All') setSearchParams({ category: cat });
    else setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text" placeholder="Search products..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="input-field pl-10"
          />
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2">
          <FunnelIcon className="w-4 h-4" /> Search
        </button>
      </form>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-green-400'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : (
        <>
          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg font-medium ${page === p ? 'bg-green-600 text-white' : 'bg-white border border-gray-200 hover:border-green-400'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
