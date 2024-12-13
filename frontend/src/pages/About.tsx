import React from 'react';
import { UsersIcon, TruckIcon, StarIcon, ShieldCheckIcon, HeartIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Target, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Add interfaces for our data structures
interface StatItem {
  label: string;
  number: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ValueItem {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

interface VisionMissionItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const values: ValueItem[] = [
  {
    title: 'Customer First',
    description: 'Our customers are at the heart of every decision we make, ensuring their complete satisfaction.',
    icon: HeartIcon,
    color: 'text-red-500'
  },
  {
    title: 'Quality Service',
    description: 'Setting new standards for service excellence with every interaction.',
    icon: ShieldCheckIcon,
    color: 'text-blue-500'
  },
  {
    title: 'Innovation',
    description: 'Evolving continuously to redefine excellence in the two-wheeler industry.',
    icon: SparklesIcon,
    color: 'text-yellow-500'
  },
  {
    title: 'Team Excellence',
    description: 'Our dedicated team works together to deliver unparalleled experiences.',
    icon: UserGroupIcon,
    color: 'text-green-500'
  }
];

const stats: StatItem[] = [
  {
    label: 'Years of Excellence',
    number: '5+',
    description: 'Fueling journeys with trust and expertise since 2019',
    icon: ShieldCheckIcon
  },
  {
    label: 'Happy Customers',
    number: '10,000+',
    description: 'Creating smiles, one bike at a time',
    icon: UsersIcon
  },
  {
    label: 'Trusted Brands',
    number: '8+',
    description: 'Partnered with the best in the industry',
    icon: StarIcon
  },
  {
    label: 'Memories Created',
    number: 'Countless',
    description: 'Turning every ride into a cherished memory',
    icon: TruckIcon
  }
];

const visionMissionItems: VisionMissionItem[] = [
  {
    title: 'Our Mission',
    description: '"To be the most trusted and customer-centric two-wheeler dealership, offering not only the finest selection of bikes but also an unmatched after-sales experience that inspires loyalty and satisfaction."',
    icon: Target
  },
  {
    title: 'Our Vision',
    description: '"To revolutionize the two-wheeler buying journey by seamlessly blending premium products, exceptional customer service, and cutting-edge technical expertise, redefining the way people connect with their rides."',
    icon: Lightbulb
  }
];

const About: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/aboutbg.png")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        <div className="relative container-custom h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Journey</h1>
            <p className="text-xl text-gray-200 mb-6">
              Five Years of Dedication to the Two-Wheeler Community
            </p>
            <h3 className="text-lg text-blue-400 italic">
              Driven by passion, trusted by thousands, and fueled by excellence.
            </h3>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-16">
        {/* Enhanced Statistics Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey at a Glance
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
              className="py-8 stats-swiper"
            >
              {stats.map((stat, index) => (
                <SwiperSlide key={stat.label} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl 
                             transition-all duration-300 transform hover:-translate-y-1 overflow-hidden
                             h-full flex flex-col"
                  >
                    <div className="p-6 text-center flex-grow flex flex-col justify-between">
                      <motion.div 
                        className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center
                                 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className="h-8 w-8 text-blue-600" />
                      </motion.div>
                      <div className="space-y-2">
                        <p className="text-3xl font-bold text-gray-900 mt-4 mb-2">{stat.number}</p>
                        <p className="text-lg font-medium text-gray-700 mb-2">{stat.label}</p>
                        <p className="text-sm text-gray-500">{stat.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-6 text-center">
                  <motion.div 
                    className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center
                             group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </motion.div>
                  <p className="text-3xl font-bold text-gray-900 mt-4 mb-2">{stat.number}</p>
                  <p className="text-lg font-medium text-gray-700 mb-2">{stat.label}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that guide us in delivering excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/20 
                         transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 p-3 bg-white/10 rounded-full ${value.color}`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-1">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white,transparent)]" />
          
          {/* Mobile Slider */}
          <div className="md:hidden relative p-8">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="py-8"
            >
              {visionMissionItems.map((item, index) => (
                <SwiperSlide key={item.title} className="h-[400px]">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 
                             transition-all duration-300 group h-full flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-blue-600/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="h-8 w-8 text-blue-400" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">{item.title}</h2>
                    </div>
                    <div className="flex-grow flex items-center">
                      <p className="text-gray-300 leading-relaxed text-lg italic">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 gap-8 p-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 
                       transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg italic">
                "To be the most trusted and customer-centric two-wheeler dealership, offering not only 
                <span className="text-blue-400"> the finest selection of bikes </span> 
                but also an unmatched after-sales experience that 
                <span className="text-blue-400"> inspires loyalty and satisfaction</span>."
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 
                       transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="h-8 w-8 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg italic">
                "To revolutionize the two-wheeler buying journey by seamlessly blending 
                <span className="text-blue-400"> premium products</span>, 
                <span className="text-blue-400"> exceptional customer service</span>, and 
                <span className="text-blue-400"> cutting-edge technical expertise</span>, 
                redefining the way people connect with their rides."
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center p-8"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Explore Our Dealership
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
