import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Calculator } from 'lucide-react';

const brands = [
  'Hero',
  'Honda',
  'TVS',
  'Royal Enfield',
  'Bajaj',
  'Suzuki',
  'Yamaha',
  'KTM',
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBrands, setShowBrands] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleBrands = () => setShowBrands(!showBrands);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If on home page, scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If on another page, navigate to home with a fade transition
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        navigate('/');
        setTimeout(() => {
          document.body.style.opacity = '1';
          // Reset scroll position on home page
          window.scrollTo({
            top: 0,
            behavior: 'instant'
          });
        }, 50);
      }, 300);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || isOpen ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container-custom">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-24'
        }`}>
          {/* Updated Logo with click handler */}
          <a
            href="/"
            onClick={handleLogoClick}
            className={`flex items-center gap-3 transition-all duration-300 ${
              scrolled ? 'scale-95' : 'scale-100'
            }`}
          >
            <img
              src="/SV.png"
              alt="Sidhhivinayak Logo" 
              className={`transition-all duration-300 object-contain ${
                scrolled ? 'h-10 w-auto' : 'h-12 w-auto'
              }`}
            />
            <div className="flex flex-col">
              <span className={`font-bold text-gray-900 leading-tight transition-all duration-300 ${
                scrolled ? 'text-lg' : 'text-xl'
              }`}>
                SIDHHIVINAYAK
              </span>
              <span className={`font-medium text-gray-900 leading-tight transition-all duration-300 ${
                scrolled ? 'text-sm' : 'text-base'
              }`}>
                AUTO WORLD
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-10 transition-all duration-300 ${
            scrolled ? 'text-base' : 'text-lg'
          }`}>
            <Link
              to="/"
              className={`text-lg hover:text-blue-600 transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`hover:text-blue-600 transition-colors ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>
            <div className="relative group">
              <button
                onClick={toggleBrands}
                className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
              >
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                {brands.map((brand) => (
                  <Link
                    key={brand}
                    to={`/products/${brand.toLowerCase().replace(' ', '-')}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              to="/offers"
              className={`hover:text-blue-600 transition-colors ${
                isActive('/offers') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Offers & Deals
            </Link>
            <Link
              to="/quotation"
              className={`hover:text-blue-600 transition-colors flex items-center space-x-1 ${
                isActive('/quotation') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              <Calculator className="h-4 w-4" />
              <span>Get Quote</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Contact Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden text-gray-700 hover:text-blue-600 transition-all duration-300 ${
              scrolled ? 'scale-90' : 'scale-100'
            }`}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 bg-white">
            <div className="flex flex-col space-y-5">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <div>
                <button
                  onClick={toggleBrands}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span>Products</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showBrands && (
                  <div className="pl-4 mt-2 space-y-2">
                    {brands.map((brand) => (
                      <Link
                        key={brand}
                        to={`/products/${brand.toLowerCase().replace(' ', '-')}`}
                        className="block text-gray-600 hover:text-blue-600 transition-colors"
                        onClick={toggleMenu}
                      >
                        {brand}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/offers"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Offers & Deals
              </Link>
              <Link
                to="/quotation"
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2"
                onClick={toggleMenu}
              >
                <Calculator className="h-4 w-4" />
                <span>Get Quote</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
                onClick={toggleMenu}
              >
                <Phone className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;