import React from 'react';
import { UsersIcon, TruckIcon, StarIcon, ShieldCheckIcon, HeartIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Add interfaces for our data structures
interface StatItem {
  label: string;
  number: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface ValueItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const values: ValueItem[] = [
  {
    title: 'Customer First',
    description: 'We prioritize our customers\' needs and satisfaction above all else.',
    icon: HeartIcon
  },
  {
    title: 'Quality Service',
    description: 'We maintain the highest standards in our service and products.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Innovation',
    description: 'We continuously evolve and adapt to serve you better.',
    icon: SparklesIcon
  },
  {
    title: 'Team Excellence',
    description: 'Our experienced team is committed to delivering the best.',
    icon: UserGroupIcon
  }
];

const stats: StatItem[] = [
  {
    label: 'Years of Excellence',
    number: '5+',
    icon: ShieldCheckIcon
  },
  {
    label: 'Happy Customers',
    number: '10,000+',
    icon: UsersIcon
  },
  {
    label: 'Trusted Brands',
    number: 'Multiple',
    icon: StarIcon
  },
  {
    label: 'Countless Memories',
    number: 'Created on Two Wheels',
    icon: TruckIcon
  }
];

const About: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/aboutbg.png")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container-custom h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Journey</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-4">
              Five Years of Dedication to the Two-Wheeler Community
            </p>
            <h3 className="text-lg text-gray-300">
              Redefining the two-wheeler buying experience since 2020.
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-16">
        {/* Story Section */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Since 2000, Siddhivinayak Auto World has been at the forefront of the two-wheeler industry in India. 
              What started as a small dealership has grown into one of the most trusted multi-brand showrooms in the region.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our commitment to excellence, customer satisfaction, and after-sales service has helped us build 
              lasting relationships with thousands of happy customers over the years.
            </p>
          </div>
          <div className="relative">
            <img
              src="/sss.png"
              alt="Our Showroom"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg hidden md:block">
              <p className="text-3xl font-bold">5+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>
        </div> */}

        {/* Our Showroom in Numbers Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Showroom in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="bg-gray-100 p-6 rounded-lg shadow-lg text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="flex space-x-4">
                <div className="flex-shrink-0">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 text-white p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              To be the most trusted and customer-centric two-wheeler dealership, offering 
              the best selection of bikes and unmatched after-sales service.
            </p>
          </div>
          <div className="bg-blue-600 text-white p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-blue-100 leading-relaxed">
              To revolutionize the two-wheeler buying experience by combining premium products 
              with exceptional customer service and technical expertise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
