import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, SortDesc, ChevronDown, Gauge, Bike as Engine, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Motorcycle {
  id: number;
  model: string;
  price: string;
  category: string;
  images: string[];
  specs: {
    engine: string;
    power: string;
    mileage: string;
  };
}

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  engineCC: number;
  mileage: string;
  image: string;
}

const getBrandInfo = (brandName: string, brandData: any) => {
  return brandData[brandName as keyof typeof brandData];
};

const getMotorcycles = async (brand: string, brandData: any): Promise<Motorcycle[]> => {
  const brandInfo = getBrandInfo(brand, brandData);
  return brandInfo?.products.map((p: Product) => {
    return {
      id: p.id,
      model: p.name,
      price: p.price,
      category: p.category,
      images: [p.image],
      specs: {
        engine: `${p.engineCC} cc`,
        power: 'N/A',
        mileage: `${p.mileage} kmpl`
      }
    };
  }) ?? [];
};

function BrandPage() {
  const { brand = '' } = useParams();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedBike, setSelectedBike] = useState<Motorcycle | null>(null);
  const [brandData, setBrandData] = useState<any>(null);

  useEffect(() => {
    const loadBrandData = async () => {
      try {
        const data = await import('../data/motorcycleData');
        setBrandData(data.brandData);
        const brandInfo = getBrandInfo(brand, data.brandData);
        if (brandInfo) {
          const motorcycleData = await getMotorcycles(brand, data.brandData);
          setMotorcycles(motorcycleData);
        } else {
          setError('Brand not found');
        }
      } catch (error) {
        console.error('Error loading brand data:', error);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadBrandData();
  }, [brand]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !brandData) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="text-center text-red-600">
          {error || 'Failed to load data'}
        </div>
      </div>
    );
  }

  // Filter and sort motorcycles
  const filteredMotorcycles = motorcycles
    .filter(moto => {
      if (selectedCategory !== 'all' && moto.category.toLowerCase() !== selectedCategory) {
        return false;
      }
      if (priceRange !== 'all') {
        const price = parseInt(moto.price.replace(/[^0-9]/g, ''));
        const [min, max] = priceRange.split('-').map(Number);
        if (max && (price < min || price > max)) {
          return false;
        }
        if (!max && price < min) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        default:
          return a.id - b.id;
      }
    });

  // Function to handle image click
  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleQuotationClick = (motorcycle: Motorcycle) => {
    // Navigate to quotation page with state
    navigate(`/Quotation`, { 
      state: { 
        model: motorcycle.model, 
        brand 
      }
    });
  };

  const handleQuickView = (motorcycle: Motorcycle) => {
    setSelectedBike(motorcycle);
  };

  return (
    <div className="bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${brandData[brand].logo})`,
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container-custom h-full flex flex-col justify-center"
          >
            <div className="text-white max-w-2xl space-y-6 mt-20">
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                {brand.toUpperCase()} <span className="text-blue-500">Motorcycles</span>
              </h1>
              <p className="text-xl text-gray-200">{brandData[brand].description}</p>
              <p className="text-lg font-medium text-blue-400 italic">
                Experience the Power of Performance
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore All Models
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Filters and Products */}
      <div className="container-custom py-12">
        {/* Styled Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Filter Label */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-grow">
              {/* Enhanced Category Filter */}
              <div className="relative group flex-1">
                <select 
                  className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 md:px-6 pr-10
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                           hover:border-blue-500 group-hover:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="commuter">Commuter</option>
                  <option value="sports">Sports</option>
                  <option value="cruiser">Cruiser</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Enhanced Price Range Filter */}
              <div className="relative group flex-1">
                <select 
                  className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 md:px-6 pr-10
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                           hover:border-blue-500 group-hover:border-blue-500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="0-75000">Under ₹75,000</option>
                  <option value="75000-100000">₹75,000 - ₹1,00,000</option>
                  <option value="100000+">Above ₹1,00,000</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Enhanced Sort */}
              <div className="relative group flex-1 md:ml-auto">
                <div className="flex items-center gap-2 mb-2 md:mb-0 md:absolute md:-top-6">
                  <SortDesc className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Sort by:</span>
                </div>
                <select 
                  className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 md:px-6 pr-10
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300
                           hover:border-blue-500 group-hover:border-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMotorcycles.map((motorcycle, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={motorcycle.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group
                         transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={motorcycle.images[0]} 
                  alt={motorcycle.model}
                  className="w-full h-full object-cover transition-transform duration-500 
                             group-hover:scale-110"
                  onClick={() => handleImageClick(motorcycle.images[0])}
                />
                {/* Status badges */}
                {motorcycle.id === 1 && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 
                                 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg
                                 transform -rotate-2">
                    Best Seller
                  </div>
                )}
                {/* Quick view button */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                   transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => handleQuickView(motorcycle)}
                    className="bg-white/90 text-gray-900 px-4 py-2 rounded-lg transform 
                               translate-y-4 group-hover:translate-y-0 transition-transform
                               duration-300 hover:bg-white"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Title and rating */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600
                                 transition-colors duration-300">
                    {motorcycle.model}
                  </h3>
                </div>

                {/* Price and category */}
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-sm text-gray-500">Starting from</span>
                    <div className="text-2xl font-bold text-blue-600">₹{motorcycle.price}</div>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {motorcycle.category}
                  </span>
                </div>

                {/* Specs with icons */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Engine className="h-4 w-4 text-gray-400" />
                    <span>{motorcycle.specs.engine}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Gauge className="h-4 w-4 text-gray-400" />
                    <span>{motorcycle.specs.mileage}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={() => handleQuotationClick(motorcycle)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 
                             rounded-lg transition-all duration-300 transform
                             group-hover:from-blue-700 group-hover:to-blue-800
                             hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Quotation
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <motion.img 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Enlarged"
            className="max-w-[90%] max-h-[90vh] rounded-lg shadow-2xl"
          />
        </motion.div>
      )}

      {/* Quick View Modal */}
      {selectedBike && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedBike(null)}
        >
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 relative" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedBike(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 
                         transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-500 hover:text-gray-700" />
            </button>

            <h2 className="text-2xl font-bold mb-4 pr-8">{selectedBike.model}</h2>
            <img 
              src={selectedBike.images[0]} 
              alt={selectedBike.model}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Specifications</h3>
                <p>Engine: {selectedBike.specs.engine}</p>
                <p>Mileage: {selectedBike.specs.mileage}</p>
              </div>
              <div>
                <h3 className="font-semibold">Price</h3>
                <p className="text-xl font-bold text-blue-600">₹{selectedBike.price}</p>
              </div>
            </div>
            <button 
              onClick={() => handleQuotationClick(selectedBike)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Get Quotation
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default BrandPage;
