import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import { ArrowRight, DollarSign, CheckCircle, Star, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

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
    brand: "Honda",
    description: "Honda is a global leader in motorcycle manufacturing, known for its innovative technology, superior performance, and exceptional build quality.",
    image: "/hondalogomain.png"
  },
  {
    brand: "Hero",
    description: "Hero MotoCorp is one of the largest two-wheeler manufacturers in the world, renowned for its high-quality, fuel-efficient, and reliable motorcycles and scooters.",
    image: "/herocompany.png"
  },
  {
    brand: "TVS",
    description: "TVS Motor Company is known for its innovative technology, quality manufacturing, and diverse range of motorcycles and scooters that deliver excellent performance and value.",
    image: "/tvslogo.png"
  },
  {
    brand: "Suzuki",
    description: "Suzuki offers a diverse range of motorcycles known for their reliability, performance, and value, catering to both casual riders and enthusiasts.",
    image: "/suzukilogo.png"
  },
  {
    brand: "Yamaha",
    description: "Yamaha produces some of the world's most exciting motorcycles, combining cutting-edge technology with stunning design and reliable performance.",
    image: "/yamahalogo.png"
  },
  {
    brand: "Royal Enfield",
    description: "Royal Enfield is renowned for its classic styling and heritage, producing iconic motorcycles that blend traditional charm with modern engineering.",
    image: "/royalenfieldlogo.png"
  },
  {
    brand: "Bajaj",
    description: "Bajaj Auto is one of India's leading motorcycle manufacturers, known for its innovative designs, fuel efficiency, and powerful performance across diverse motorcycle segments.",
    image: "/bajajlogo.png"
  },
  {
    brand: "KTM",
    description: "KTM specializes in producing high-performance motorcycles, known for their aggressive styling, advanced technology, and racing heritage.",
    image: "/ktmlogo.png"
  }
];

function Home() {
  const [showAllBikes, setShowAllBikes] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

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
      {/* Enhanced Why Choose Us Section */}
      <div className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        {/* Background Pattern */}
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
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl 
                             transition-all duration-300 transform hover:-translate-y-1 overflow-hidden h-full"
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
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title">Featured Bikes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedBikes.map((bike) => (
              <div key={bike.model} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                    className="h-full swiper-hover-buttons"
                  >
                    {bike.images?.map((image, imgIndex) => (
                      <SwiperSlide key={imgIndex} className="overflow-hidden">
                        <div className="w-full h-full overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="p-4 text-center">
                <Link
                    to={`/products/${bike.model.toLowerCase().replace(' ', '-')}`}
                    className="text-xl font-bold  hover:text-blue-700"
                  >
                    {bike.model}
                  </Link>
                    {/* <h3 className="text-xl font-bold text-center hover:text-blue-600">{bike.model}</h3> */}
                </div>
              </div>
            ))}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 col-span-full transition-all duration-500 ease-in-out ${
              showAllBikes ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              {extraBikes.map((bike) => (
                <div key={bike.model} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                      className="h-full swiper-hover-buttons"
                    >
                      {bike.images?.map((image, imgIndex) => (
                        <SwiperSlide key={imgIndex} className="overflow-hidden">
                          <div className="w-full h-full overflow-hidden">
                            <img
                              src={image.url}
                              alt={image.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="p-4 text-center">
                  <Link
                    to={`/products/${bike.model.toLowerCase().replace(' ', '-')}`}
                    className="text-xl font-bold  hover:text-blue-700"
                  >
                    {bike.model}
                  </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllBikes(!showAllBikes)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center gap-2 mx-auto"
            >
              {showAllBikes ? 'See Less' : 'See More'}
              <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${showAllBikes ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>
      {/* Brand Showcase */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="section-title">Our Trusted Brands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {initialBrands.map((brand) => (
              <div key={brand.brand} className="card overflow-hidden group">
                <div className="relative h-48">
                  <img
                    src={brand.image}
                    alt={brand.brand}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {brand.brand}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{brand.description}</p>
                  <Link
                    to={`/products/${brand.brand.toLowerCase().replace(' ', '-')}`}
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
                  >
                    View Collection <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 col-span-full transition-all duration-500 ease-in-out ${
              showAllBrands ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              {extraBrands.map((brand) => (
                <div key={brand.brand} className="card overflow-hidden group">
                  <div className="relative h-48">
                    <img
                      src={brand.image}
                      alt={brand.brand}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {brand.brand}
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">{brand.description}</p>
                    <Link
                      to={`/products/${brand.brand.toLowerCase().replace(' ', '-')}`}
                      className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700"
                    >
                      View Collection <ArrowRight className="h-4 w-4 ml-2" />
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
      <section className="py-16 bg-gray-100 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }} />
        
        <div className="container-custom text-center text-gray-700 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
            Ready to Find Your Perfect Ride?
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto drop-shadow-md mb-4">
            Visit our showroom today or Get Quotation for your dream bike
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary bg-white text-blue-600 hover:bg-gray-100 transition duration-300 transform hover:scale-105">
              Visit Showroom
            </Link>
            <Link to="/quotation" className="btn-primary bg-blue-700 hover:bg-blue-800 transition duration-300 transform hover:scale-105">
              Get Quotation
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-blue-600">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
          <p className="text-lg text-gray-200 mb-6">
            We are dedicated to providing the best two-wheeler experience, combining quality, performance, and customer satisfaction.
          </p>
          <Link to="/about" className="btn-primary bg-white hover:bg-gray-200 text-blue-600 font-semibold py-2 px-4 rounded-lg transition duration-300">
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;