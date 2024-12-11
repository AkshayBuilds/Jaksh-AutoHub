import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, SortDesc, ChevronDown, Star, TrendingUp, Award } from 'lucide-react';
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

const brandData = {
  'hero': {
    logo: "/herologo.png",
    description: 'Hero MotoCorp is the world\'s largest manufacturer of two-wheelers, based in India.',
    products: [
      {
        id: 1,
        name: 'Hero Pleasure',
        price: '94,185',
        category: 'Scooter',
        engineCC: 110.9,
        mileage: '55-65',
        image: '/plasure.png'
      },
      {
        id: 2,
        name: 'Hero Destin Prie',
        price: '97,706',
        category: 'Scooter',
        engineCC: 0,
        mileage: '50-60',
        image: '/destin.png'
      },
      {
        id: 4,
        name: 'Hero Splendor Plus',
        price: '93,420',
        category: 'Commuter',
        engineCC: 97.2,
        mileage: '60-70',
        image: '/splender.png'
      },
      {
        id: 5,
        name: 'Hero HF Deluxe',
        price: '76,582',
        category: 'Commuter',
        engineCC: 97.2,
        mileage: '65-70',
        image: '/hf.png'
      },
      {
        id: 6,
        name: 'Hero Passion plus',
        price: '96,384',
        category: 'Commuter',
        engineCC: 97.2,
        mileage: '55-65',
        image: '/passionpro.png'
      },
      
      {
        id: 7,
        name: 'Hero Glamour',
        price: '1,08,889',
        category: 'Commuter',
        engineCC: 124.7,
        mileage: '55-65',
        image: '/glamour.png'
      },
      {
        id: 8,
        name: 'Hero Xtreme 160R',
        price: '1,65,691',
        category: 'Sports',
        engineCC: 163,
        mileage: '45-50',
        image: '/extreme.png'
      },
      {
        id: 10,
        name: 'Hero Xpulse 200',
        price: '1,66,422',
        category: 'Adventure',
        engineCC: 199.6,
        mileage: '40-45',
        image: '/HeroXpulse200.png'
      },
    ]
  },
  'honda': {
    logo: "/hondalogo.png",
    description: 'Honda is a leading manufacturer of motorcycles and scooters worldwide.',
    products: [
      {
        id: 1,
        name: 'Honda Activa 6G',
        price: '97,583',
        category: 'Scooter',
        engineCC: 109.51,
        mileage: '60',
        image: '/activa.png'
      },
      {
        id: 2,
        name: 'activa 125',
        price: '1,03,000',
        category: 'Scooter',
        engineCC: 125,
        mileage: '40-50',
        image: '/activa125.png'
      },
      {
        id: 3,
        name: 'Honda Dio',
        price: '93,280',
        category: 'Scooter',
        engineCC: 109.51,
        mileage: '55',
        image: '/HondaDio.png'
      },
      {
        id: 4,
        name: 'Honda CB Shine',
        price: '80,000',
        category: 'Commuter',
        engineCC: 124,
        mileage: '55',
        image: '/cbshine.png'
      },
      {
        id: 5,
        name: 'Honda Shine SP',
        price: '97,754',
        category: 'Commuter',
        engineCC: 124,
        mileage: '55',
        image: '/sp125.png'
      },
      {
        id: 7,
        name: 'Honda Hornet 2.O',
        price: '1,66,184',
        category: 'Street',
        engineCC: 162.71,
        mileage: '45',
        image: '/hornet.png'
      },
      {
        id: 8,
        name: 'Honda CRF 1100L',
        price: '17,80,000',
        category: 'Adventure',
        engineCC: 1084,
        mileage: '20',
        image: '/HondaCRF.png'
      },
      {
        id: 9,
        name: 'Honda CB350RS',
        price: '2,40,000',
        category: 'Cruiser',
        engineCC: 348.36,
        mileage: '35',
        image: '/HondaCB350RS.png'
      },
      {
        id: 10,
        name: 'Honda CBR1000RR',
        price: '18,00,000',
        category: 'Superbike',
        engineCC: 999,
        mileage: '15',
        image: '/HondaCBR1000RR.png'
      }
    ]
  },
  'tvs': {
    logo: "/tvslogoo.png",
    description: 'TVS Motor Company is a leading two-wheeler manufacturer in India.',
    products: [
      {
        id: 1,
        name: 'TVS Jupiter',
        price: '99,000',
        category: 'Scooter',
        engineCC: 109.7,
        mileage: '62',
        image: '/jupiter.png'
      },
      {
        id: 2,
        name: 'Jupiter 125',
        price: '1,00,799',
        category: 'Scooter',
        engineCC: 125,
        mileage: '60-70',
        image: '/jupiter125.png'
      },
      {
        id: 3,
        name: 'TVS Ntorq 125',
        price: '1,17,546',
        category: 'Scooter',
        engineCC: 124.8,
        mileage: '50',
        image: '/TVSNtorq125.png'
      },
      {
        id: 4,
        name: 'TVS XL100',
        price: '58, 789',
        category: 'Moped',
        engineCC: 99.7,
        mileage: '70',
        image: '/TVSXL100.png'
      },
      {
        id: 5,
        name: 'TVS Radeon',
        price: '85,522',
        category: 'Commuter',
        engineCC: 109.7,
        mileage: '65',
        image: '/TVSRadeon.png'
      },
      {
        id: 6,
        name: 'TVS Apache RTR 160 2V',
        price: '1,46,646',
        category: 'Sports',
        engineCC: 197.75,
        mileage: '35',
        image: '/apache2v.png'
      },
      {
        id: 7,
        name: 'TVS Apache RTR 160 4V',
        price: '1,51,500',
        category: 'Sports',
        engineCC: 159.7,
        mileage: '45',
        image: '/apache4v.png'
      },
      {
        id: 8,
        name: 'TVS Raider-125',
        price: '1,07,000',
        category: 'sports',
        engineCC: 125,
        mileage: '60',
        image: '/rider125.png'
      },
      {
        id: 9,
        name: 'TVS Apache 310 RR',
        price: '3,31,875',
        category: 'Sports',
        engineCC: 310,
        mileage: '30',
        image: '/apache310.png'
      }
    ]
  },
  'bajaj': {
    logo: "/Bajajlogoo.png",
    description: 'Bajaj Auto is one of the leading manufacturers of motorcycles in India.',
    products: [
      {
        id: 1,
        name: 'Bajaj Platina 110',
        price: '88,648',
        category: 'Commuter',
        engineCC: 115,
        mileage: '70',
        image: '/platina-100.png'
      },
      {
        id: 2,
        name: 'Bajaj CT 100',
        price: '88,163',
        category: 'Commuter',
        engineCC: 102,
        mileage: '70',
        image: '/BajajCT100.png'
      },
      {
        id: 3,
        name: 'Bajaj Pulsar 125',
        price: '1,02,500',
        category: 'Commuter',
        engineCC: 124.4,
        mileage: '50',
        image: '/pulsar-125.png'
      },
      {
        id: 9,
        name: 'Bajaj Dominar 400',
        price: '2,79,491',
        category: 'Tourer',
        engineCC: 373.3,
        mileage: '30',
        image: '/dominar-400.png'
      },
      {
        id: 4,
        name: 'Bajaj Avenger Street 160',
        price: '1,44,872',
        category: 'Cruiser',
        engineCC: 160,
        mileage: '45',
        image: '/BajajAvengerStreet160.png'
      },
      {
        id: 6,
        name: 'Bajaj Pulsar NS200',
        price: '1,93,437',
        category: 'Sports',
        engineCC: 199.5,
        mileage: '35',
        image: '/BajajPulsarNS200.png'
      },
      {
        id: 5,
        name: 'Bajaj Dominar 250',
        price: '2,19,884',
        category: 'Tourer',
        engineCC: 248,
        mileage: '30',
        image: '/dominar-250.png'
      },
      {
        id: 8,
        name: 'Bajaj Avenger Cruise 220',
        price: '1,74,113',
        category: 'Cruiser',
        engineCC: 219.89,
        mileage: '35',
        image: '/BajajAvengerCruise220.png'
      },
      {
        id: 7,
        name: 'Bajaj Pulsar RS200',
        price: '2,05,984',
        category: 'Sports',
        engineCC: 199.5,
        mileage: '35',
        image: '/bajaj-pulsar-rs-200.png'
      }
    ]
  },
  'ktm': {
    logo: "/ktmlogoo.png",
    description: 'KTM is known for its high-performance motorcycles.',
    products: [
      {
        id: 1,
        name: 'KTM Duke 200',
        price: '2,32,059',
        category: 'Naked',
        engineCC: 199.5,
        mileage: '35',
        image: '/2023-200-duke.png'
      },
      {
        id: 2,
        name: 'KTM RC 390',
        price: '3,72,350',
        category: 'Sports',
        engineCC: 373.2,
        mileage: '25',
        image: '/KTMRC390.png'
      },
      {
        id: 3,
        name: 'KTM 390 Adventure',
        price: '3,97,000',
        category: 'Adventure',
        engineCC: 373.2,
        mileage: '30',
        image: '/390-adventure.png'
      },
      {
        id: 5,
        name: 'KTM RC 200',
        price: '2,55,600',
        category: 'Sports',
        engineCC: 199.5,
        mileage: '35',
        image: '/ktm-rc-200.png'
      },
      {
        id: 6,
        name: 'KTM 250 Duke',
        price: '2,80,000',
        category: 'Naked',
        engineCC: 248.8,
        mileage: '30',
        image: '/KTM250Duke.png'
      },
      {
        id: 7,
        name: 'KTM 390 Duke',
        price: '3,66,000',
        category: 'Naked',
        engineCC: 373.2,
        mileage: '30',
        image: '/KTM390Duke.png'
      },
      {
        id: 8,
        name: 'KTM 1290 Super Duke R',
        price: '18,00,000',
        category: 'Superbike',
        engineCC: 1301,
        mileage: '15',
        image: '/KTM1290.png'
      },
    ]
  },
  'yamaha': {
    logo: "/yamahalogoo.png",
    description: 'Yamaha is a renowned manufacturer of motorcycles and scooters.',
    products: [
      {
        id: 1,
        name: 'Yamaha Fascino',
        price: '1,20,500',
        category: 'Scooter',
        engineCC: 125,
        mileage: '50\\',
        image: '/yamahafascino.png'
      },
      {
        id: 4,
        name: 'Yamaha FZ',
        price: '1,43,500',
        category: 'Street',
        engineCC: 149,
        mileage: '45',
        image: '/YamahaFZ.png'
      },
      {
        id: 5,
        name: 'Yamaha R15 V4',
        price: '2,35,000',
        category: 'Sports',
        engineCC: 155,
        mileage: '40',
        image: '/r15-v4.png'
      },
      {
        id: 6,
        name: 'Yamaha MT-15 V2',
        price: '2,11,000',
        category: 'Naked',
        engineCC: 155,
        mileage: '40',
        image: '/yamahamt-15.png'
      },
      {
        id: 4,
        name: 'Yamaha R3',
        price: '3,50,000',
        category: 'Sports',
        engineCC: 321,
        mileage: '30',
        image: '/YamahaR3.png'
      },
      {
        id: 2,
        name: 'Yamaha Rayzar',
        price: '1,26,000',
        category: 'Scooter',
        engineCC: 155,
        mileage: '45',
        image: '/YamahaAerox155.png'
      },
      {
        id: 3,
        name: 'Yamaha FZ-X',
        price: '1,69,000',
        category: 'Street',
        engineCC: 149,
        mileage: '45',
        image: '/yamahafz-x.png'
      }
    ]
  },
  'royal-enfield': {
    logo: "/rflogo.png",
    description: 'Royal Enfield is known for its classic motorcycles.',
    products: [
      {
        id: 1,
        name: 'Royal Enfield Classic 350',
        price: '2,32,000',
        category: 'Cruiser',
        engineCC: 349,
        mileage: '35',
        image: '/classic350.png'
      },
      {
        id: 1,
        name: 'hunter-350',
        price: '2,05,000',
        category: 'Cruiser',
        engineCC: 349,
        mileage: '35',
        image: '/hunter-350.png'
      },
      {
        id: 2,
        name: 'Bullet 350',
        price: '2,10,000',
        category: 'Cruiser',
        engineCC: 346,
        mileage: '40',
        image: '/RoyalEnfield.png'
      },
      {
        id: 6,
        name: 'Royal Enfield Interceptor 650',
        price: '3,63,000',
        category: 'Cruiser',
        engineCC: 648,
        mileage: '25',
        image: '/RoyalEnfieldInterceptor.png'
      },
      {
        id: 10,
        name: 'Royal Enfield Continental GT 650',
        price: '3,80,700',
        category: 'Cruiser',
        engineCC: 648,
        mileage: '25',
        image: '/GT-650.png'
      },
      {
        id: 5,
        name: 'Royal Enfield Himalayan',
        price: '3,43,900',
        category: 'Adventure',
        engineCC: 411,
        mileage: '30',
        image: '/RoyalEnfieldHimalayan.png'
      },
      {
        id: 3,
        name: 'Royal Enfield Meteor 350',
        price: '2,40,500',
        category: 'Cruiser',
        engineCC: 349,
        mileage: '35',
        image: '/meteor.png'
      },
      {
        id: 4,
        name: 'Royal Enfield Scram 411',
        price: '2,53,500',
        category: 'Adventure',
        engineCC: 411,
        mileage: '30',
        image: '/RoyalScram411.png'
      }
    ]
  },
  'suzuki': {
    logo: "/suzukilogoo.png",
    description: 'Suzuki is a well-known manufacturer of motorcycles and scooters.',
    products: [
      {
        id: 4,
        name: 'Suzuki Gixxer SF-250',
        price: '2,14,000',
        category: 'Street',
        engineCC: 255,
        mileage: '45',
        image: '/gixxer.png'
      },
      {
        id: 1,
        name: 'Suzuki Access 125',
        price: '1,04,900',
        category: 'Scooter',
        engineCC: 124,
        mileage: '50',
        image: "https://cdn.bikedekho.com/processedimages/suzuki/bs6-access-125/640X309/bs6-access-1256431264fe3a67.jpg"
      },
      {
        id: 6,
        name: 'Suzuki V-Strom 250',
        price: '2,45,000',
        category: 'Adventure',
        engineCC: 250,
        mileage: '25',
        image: '/SuzukiV-Strom650.png'
      },
      {
        id: 7,
        name: 'Suzuki Hayabusa',
        price: '18,00,000',
        category: 'Superbike',
        engineCC: 1340,
        mileage: '15',
        image: '/hayabusa.png'
      },
      {
        id: 2,
        name: 'Suzuki Burgman 125',
        price: '1,14,000',
        category: 'Scooter',
        engineCC: 124,
        mileage: '50',
        image: '/burgman.png'
      },
      {
        id: 3,
        name: 'Suzuki gixxer 150',
        price: '1,69,000',
        category: 'Sports',
        engineCC: 147.3,
        mileage: '40',
        image: '/SuzukiGSX-R150.png'
      }
    ]
  }
};

const getBrandInfo = (brandName: string) => {
  return brandData[brandName as keyof typeof brandData];
};

const getMotorcycles = async (brand: string): Promise<Motorcycle[]> => {
  const brandInfo = getBrandInfo(brand);
  return brandInfo?.products.map((p) => {
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

  const brandInfo = getBrandInfo(brand);
  console.log(brandInfo);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const data = await getMotorcycles(brand);
        setMotorcycles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, [brand]);

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

  if (loading) {
    return (
      <div className="container-custom py-12 mt-20">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !brandInfo) {
    return (
      <div className="container-custom py-12 mt-20">
        <div className="text-center text-red-600">
          {error || 'Brand not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${brandInfo.logo})`,
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
            <div className="text-white max-w-2xl space-y-6">
              <h1 className="text-5xl font-bold mb-4 leading-tight">
                {brand.toUpperCase()} <span className="text-blue-500">Motorcycles</span>
              </h1>
              <p className="text-xl text-gray-200">{brandInfo.description}</p>
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
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300
                         transform hover:scale-105"
            >
              <div className="relative h-48 group">
                <img 
                  src={motorcycle.images[0]} 
                  alt={motorcycle.model}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onClick={() => handleImageClick(motorcycle.images[0])}
                />
                {/* Labels for special bikes */}
                {motorcycle.id === 1 && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full
                                 text-sm font-medium shadow-lg">
                    Best Seller
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{motorcycle.model}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">₹{motorcycle.price}</span>
                  <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {motorcycle.category}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                    <span>{motorcycle.specs.engine}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-400" />
                    <span>{motorcycle.specs.mileage}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate(`/Quotation`, { state: { model: motorcycle.model, brand } })}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg
                           hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md
                           hover:shadow-lg transform hover:-translate-y-1"
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
    </div>
  );
}

export default BrandPage;
