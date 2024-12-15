import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import { ArrowRight, DollarSign, CheckCircle, Star, CreditCard, MapPin, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import BikePreviewModal from '../components/BikePreviewModal';

interface BikeImage {
  url: string;
  title: string;
  specs?: {
    engine?: string;
    power?: string;
    mileage?: string;
    price?: string;
  };
}

const featuredBikes = [
  {
    model: "Honda",
    images: [
      {
        url: "/activa.png",
        title: "Honda Activa"
      },
      {
        url: "/activa125.png",
        title: "Activa 125"
      },
      {
        url: "/sp125.png",
        title: "SP-125"
      },
      {
        url: "/cbshine.png",
        title: "CB-Shine 125"
      },
      {
        url: "/hornet.png",
        title: "hornet"
      }
    ]
  },
  {
    model: "Hero",
    images: [
      {
        url: "/splender.png",
        title: "Splender"
      },
      {
        url: "/hf.png",
        title: "Hero HF Deluxe"
      },
      {
        url: "/glamour.png",
        title: "Hero Glamour"
      },
      {
        url: "/extreme.png",
        title: "hero Extreme"
      },
      {
        url: "/plasure.png",
        title: "hero pleasure"
      }
    ]
  },
  {
    model: "TVS",
    images: [
      {
        url: "/jupiter.png",
        title: "TVS Jupiter"
      },
      {
        url: "/jupiter125.png",
        title: "Jupiter 125"
      },
      {
        url: "/rider125.png",
        title: "raider-125"
      },
      {
        url: "/apache4v.png",
        title: "apache-rtr-160-4v"
      },
      {
        url: "/apache2v.png",
        title: "apache-160-2v"
      },
      {
        url: "/apache310.png",
        title: "apache-310"
      }
    ]
  },
  {
    model: "Suzuki",
    images: [
      {
        url:  "https://cdn.bikedekho.com/processedimages/suzuki/bs6-access-125/640X309/bs6-access-1256431264fe3a67.jpg",
        title: "access-125"
      },
      {
        url: "/burgman.png",
        title: "burgman-200"
      },
      {
        url: "/gixxer.png",
        title: "gixxer-sf-250"
      },
      {
        url: "/intruder.png",
        title: "=suzuki intruder"
      },
      {
        url: "/hayabusa.png",
        title: "hayabusa"
      }
    ]
  },
  {
    model: "Yamaha",
    images: [
      {
        url: "/r15-v4.png",
        title: "r15-v4"
      },
      {
        url: "/yamahamt-15.png",
        title: "yamaha mt-15-2-0"
      },
      {
        url: "/yamahafz25.png",
        title: "yamaha fz25"
      },
      {
        url: "/yamahafz-x.png",
        title: "yamaha fz-x"
      },
      {
        url: "/fascino-125.png",
        title: "fascino-125"
      }
    ]
  },
  {
    model: "Royal Enfield",
    images: [
      {
        url: "/classic350.png",
        title: "classic350"
      },
      {
        url: "/hunter-350.png",
        title: "hunter-350"
      },
      {
        url: "/2021-bullet-350.png",
        title: "2021-bullet-350"
      },
      {
        url: "/meteor.png",
        title: "meteor"
      },
      {
        url: "/GT-650.png",
        title: "GT-650"
      }
    ]
  },
  {
    model: "Bajaj",
    images: [
      {
        url: "/platina-100.png",
        title: "platina-100"
      },
      {
        url: "/pulsar-125.png",
        title: "pulsar-125-2024"
      },
      {
        url: "/pulsar-ns125.png",
        title: "pulsar-ns125"
      },
      {
        url: "/bajaj-pulsar-rs-200.png",
        title: "bajaj-pulsar-rs-200"
      },
      {
        url: "/dominar-250.png",
        title: "dominar-250"
      }
    ]
  },
  {
    model: "KTM",
    images: [
      {
        url: "/ktm-rc-200.png",
        title: "ktm-rc-200"
      },
      {
        url: "/2023-200-duke.png",
        title: "2023-200-duke"
      },
      {
        url: "/390-adventure.png",
        title: "390-adventure"
      }
    ]
  },
  // Add more bikes as needed
];

const brandHighlights = [
  {
    brand: "",
    description: "A leader in innovation, performance, and craftsmanship in motorcycle manufacturing.",
    image: "/hondalogomain.png"
  },
  {
    brand: "",
    description: "Renowned for high-quality, fuel-efficient, and reliable two-wheelers.",
    image: "/herocompany.png"
  },
  {
    brand: "",
    description: "Offers innovative, high-performance motorcycles and scooters with great value.",
    image: "/tvslogo.png"
  },
  {
    brand: "",
    description: " Known for reliable and versatile motorcycles for all rider types.",
    image: "/suzukilogo.png"
  },
  {
    brand: "",
    description: "Crafts advanced, stylish, and dependable motorcycles for thrilling rides.",
    image: "/yamahalogo.png"
  },
  {
    brand: "",
    description: "Blends heritage and modern engineering with iconic classic motorcycles.",
    image: "/royalenfieldlogo.png"
  },
  {
    brand: "",
    description: "Delivers powerful, efficient, and innovative motorcycles for diverse needs.",
    image: "/bajajlogo.png"
  },
  {
    brand: "",
    description: "High-performance motorcycles with bold designs and a racing legacy.",
    image: "/ktmlogo.png"
  }
];

function Home() {
  const [showAllBikes, setShowAllBikes] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [selectedBike, setSelectedBike] = useState<{ model: string; image: BikeImage } | null>(null);

  // Organize bikes
  const initialBikes = featuredBikes.slice(0, 6); // First 6 bikes
  const extraBikes = featuredBikes.slice(6);      // Remaining bikes

  const initialBrands = brandHighlights.slice(0, 6); // First 3 brands
  const extraBrands = brandHighlights.slice(6);      // Remaining brands

  // Determine how many bikes to show based on screen size
  const displayedBikes = showAllBikes ? initialBikes : initialBikes.slice(0, window.innerWidth < 768 ? 3 : 6);

  const whyChooseUsItems = [
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: "Unbeatable Pricing",
      description: "Premium bikes at budget-friendly prices. Get the best value without compromising on quality.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      title: "Diverse Collection",
      description: "From commuters to superbikes, find your perfect ride from India's top brands.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Expert Support",
      description: "Our dedicated team ensures your journey is smooth, satisfying, and memorable.",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-purple-600" />,
      title: "Flexible Financing",
      description: "Easy EMI options and customized payment plans to make your dream bike affordable.",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div>
      <HeroSection />
      <div className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'url("/pattern.png")',
                 backgroundSize: '30px 30px',
                 backgroundRepeat: 'repeat'
               }}
          />
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why We're Your <span className="text-blue-600">Best Choice</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience excellence in every aspect of your bike-buying journey with us
            </p>
          </div>
          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              loopAdditionalSlides={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="py-8 why-choose-swiper"
            >
              {whyChooseUsItems.map((item, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl 
                             transition-all duration-300 transform hover:-translate-y-1 overflow-hidden
                             h-full flex flex-col"
                  >
                    {/* Gradient Border */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-300 bg-gradient-to-r ${item.gradient}`} 
                         style={{ padding: '2px' }}>
                      <div className="absolute inset-0 bg-white rounded-2xl" />
                    </div>

                    <div className="relative p-6 space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-4">
                        <motion.div 
                          className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center
                                   group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          {item.icon}
                        </motion.div>

                        <h3 className="text-xl font-bold text-gray-900 text-center">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 text-center">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-8">
            {whyChooseUsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient Border */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 
                               transition-opacity duration-300 bg-gradient-to-r ${item.gradient}`} 
                     style={{ padding: '2px' }}>
                  <div className="absolute inset-0 bg-white rounded-2xl" />
                </div>

                <div className="relative p-6 space-y-4">
                  <motion.div 
                    className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center
                             group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 text-center">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-center">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Featured Bikes Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Bikes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked collection of premium bikes from India's leading manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {displayedBikes.map((bike) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                key={bike.model}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-64">
                  <Swiper
                    pagination={{ 
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    navigation={true}
                    loop={true}
                    modules={[Pagination, Navigation, Autoplay]}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true
                    }}
                    className="h-full group"
                  >
                    {bike.images?.map((image, imgIndex) => (
                      <SwiperSlide key={imgIndex} className="overflow-hidden">
                        <button 
                          onClick={() => setSelectedBike({ model: bike.model, image })}
                          className="w-full h-full cursor-zoom-in relative"
                        >
                          <div className="w-full h-full overflow-hidden">
                            <img
                              src={image.url}
                              alt={image.title}
                              className="w-full h-full object-cover transform group-hover:scale-110 
                                       transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white text-left
                                        opacity-0 group-hover:opacity-100 transform translate-y-2 
                                        group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-lg font-bold truncate">{image.title}</h3>
                          </div>
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="p-6">
                  <Link
                    to={`/products/${bike.model.toLowerCase().replace(' ', '-')}`}
                    className="block text-center"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 
                                 transition-colors">{bike.model}</h3>
                  </Link>
                </div>
              </motion.div>
            ))}

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 col-span-full transition-all duration-500 ease-in-out ${
              showAllBikes ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              {extraBikes.map((bike) => (
                <div key={bike.model} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-64">
                    <Swiper
                      pagination={{ clickable: true }}
                      navigation={true}
                      loop={true}
                      modules={[Pagination, Navigation, Autoplay]}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                      }}
                      className="h-full group"
                    >
                      {bike.images?.map((image, imgIndex) => (
                        <SwiperSlide key={imgIndex} className="overflow-hidden">
                          <button 
                            onClick={() => setSelectedBike({ model: bike.model, image })}
                            className="w-full h-full cursor-zoom-in"
                          >
                            <div className="w-full h-full overflow-hidden group">
                              <img
                                src={image.url}
                                alt={image.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="p-4">
                    <Link
                      to={`/products/${bike.model.toLowerCase().replace(' ', '-')}`}
                      className="text-xl font-bold hover:text-blue-700 transition-colors block text-center"
                    >
                      {bike.model}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllBikes(!showAllBikes)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white 
                       rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 
                       transition-all duration-300"
            >
              {showAllBikes ? 'Show Less' : 'Show More'}
              <ArrowRight className={`h-5 w-5 transition-transform duration-300 
                                    ${showAllBikes ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>
      {/* Brand Showcase */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Our Trusted Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {initialBrands.map((brand) => (
              <div key={brand.brand} className="card overflow-hidden group">
                <Link
                  to={`/products/${brand.brand.toLowerCase().replace(' ', '-')}`}
                  className="block relative h-48 group"
                >
                  <div className="absolute inset-0 bg-white group-hover:bg-blue-50/80 transition-all duration-300">
                    <img
                      src={brand.image}
                      alt={brand.brand}
                      className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-all duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    {brand.brand}
                  </h3>
                </Link>
                <div className="p-4">
                  <p className="text-gray-600">{brand.description}</p>
                  <Link
                    to={`/products/${brand.brand.toLowerCase().replace(' ', '-')}`}
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 group/link"
                  >
                    View Collection 
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}

            <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 col-span-full transition-all duration-500 ease-in-out ${
              showAllBrands ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              {extraBrands.map((brand) => (
                <div key={brand.brand} className="card overflow-hidden group">
                  <Link
                    to={`/products/${brand.brand.toLowerCase().replace(' ', '-')}`}
                    className="block relative h-48 group"
                  >
                    <div className="absolute inset-0 bg-white group-hover:bg-blue-50/80 transition-all duration-300">
                      <img
                        src={brand.image}
                        alt={brand.brand}
                        className="w-full h-full object-contain p-4 transform group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      {brand.brand}
                    </h3>
                  </Link>
                  <div className="p-4">
                    <p className="text-gray-600">{brand.description}</p>
                    <Link
                      to={`/products/${brand.brand.toLowerCase().replace(' ', '-')}`}
                      className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 group/link"
                    >
                      View Collection 
                      <ArrowRight className="h-4 w-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center gap-2 mx-auto"
            >
              {showAllBrands ? 'See Less' : 'See More'}
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAllBrands ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" 
               style={{
                 backgroundImage: 'url("https://media.lordicon.com/icons/wired/gradient/843-bike.svg")',
                 backgroundSize: '60px 60px',
                 backgroundRepeat: 'repeat'
               }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container-custom relative z-10"
        >
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img 
                src="/SV.png" 
                alt="Motorcycle" 
                className="w-12 h-12 object-contain"
              />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ready to Find Your Perfect Ride?
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Visit our showroom today or get a personalized quotation for your dream bike
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="group flex items-center justify-center gap-2 px-6 py-3 
                         text-blue-600 rounded-lg border border-blue-600
                         transition-all duration-300 transform hover:scale-105"
              >
                <MapPin className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                <span>Visit Showroom</span>
              </Link>
              
              <Link 
                to="/quotation" 
                className="group flex items-center justify-center gap-2 px-6 py-3 
                         bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                <span>Get Quotation</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 relative overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/showroom-bg.jpg" 
            alt="Showroom" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-blue-900/90" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container-custom relative z-10"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative inline-block">
              Our Journey
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </h2>

            <p className="text-lg md:text-xl text-gray-200 mb-8">
              We are dedicated to providing the best two-wheeler experience, combining quality, 
              performance, and customer satisfaction.
            </p>

            {/* Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">Established 2019</h3>
                <p className="text-gray-300">Started our journey with a vision</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-4xl mb-2">🛵</div>
                <h3 className="text-xl font-bold text-white mb-2">10,000+ Bikes</h3>
                <p className="text-gray-300">Delivered to happy customers</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="text-xl font-bold text-white mb-2">8+ Brands</h3>
                <p className="text-gray-300">Premium partnerships</p>
              </motion.div>
            </div>

            <Link 
              to="/about" 
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 
                       rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              <span>Explore Our Story</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Add Modal */}
      <BikePreviewModal
        isOpen={!!selectedBike}
        onClose={() => setSelectedBike(null)}
        bike={selectedBike || { model: '', image: { url: '', title: '' } }}
      />
    </div>
  );
}

export default Home;