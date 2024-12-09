import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  const backgrounds = [
    "url('/herosec2.png')",
    "url('/herosec1.png')",
    "url('/herosec3.png')", 
    "url('/herosec4.png')",
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[80vh] min-h-[600px] bg-gray-900">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: backgrounds[currentBg],
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container-custom flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
            Your Trusted Multibrand Two-Wheeler Showroom
          </h1>
          <p className="text-base md:text-lg mb-6 text-gray-200">
            Discover your perfect ride from our extensive collection of premium bikes. 
            Experience excellence in service and unmatched expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products" 
              className="btn-primary flex items-center justify-center space-x-2 text-lg"
            >
              <span>Explore Our Collection</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;