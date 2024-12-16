import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroSection() {
  const navigate = useNavigate();

  const backgrounds = [
    "url('/herosec2.webp')",
    "url('/herosec1.webp')",
    "url('/herosec3.webp')", 
    "url('/herosec4.webp')",
  ];

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (path: string) => {
    // Fade out
    document.body.style.opacity = '0';
    
    setTimeout(() => {
      // Navigate and scroll to top
      navigate(path);
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      
      // Fade in
      document.body.style.opacity = '1';
    }, 300);
  };

  return (
    <div className="relative h-[90vh] sm:h-[80vh] min-h-[600px] bg-gray-900">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: backgrounds[currentBg],
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container-custom flex items-center justify-center sm:justify-start">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl text-white px-4 sm:px-0 text-center sm:text-left"
        >
          {/* Enhanced Typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight
                     tracking-tight drop-shadow-lg mt-20 sm:mt-0"
          >
            Your Trusted Multibrand
            <span className="text-blue-500"> Two-Wheeler </span>
            Showroom
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl mb-8 text-gray-200 leading-relaxed
                     drop-shadow-md font-medium"
          >
            Discover your perfect ride from our extensive collection of premium bikes. 
            Experience excellence in service and unmatched expertise.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
          >
            <button 
              onClick={() => handleClick('/products')}
              className="group flex items-center justify-center gap-2 px-8 py-4 
                       bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-all duration-300 transform hover:scale-105 text-lg
                       shadow-lg hover:shadow-xl"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              onClick={() => handleClick('/quotation')}
              className="group flex items-center justify-center gap-2 px-8 py-4 
                       bg-white/10 backdrop-blur-sm text-white rounded-lg 
                       hover:bg-white/20 transition-all duration-300 
                       transform hover:scale-105 text-lg border border-white/30
                       shadow-lg hover:shadow-xl"
            >
              <span>Get Quote</span>
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Background Indicators */}
          <div className="absolute bottom-8 left-1/2 sm:left-4 transform -translate-x-1/2 sm:translate-x-0 flex gap-2">
            {backgrounds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBg(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                          ${currentBg === index ? 'w-8 bg-blue-500' : 'bg-white/50 hover:bg-white'}`}
                aria-label={`Switch to background ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/70 hover:text-white/90 transition-colors cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown className="h-8 w-8" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection;