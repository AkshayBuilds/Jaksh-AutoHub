import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bike, 
  Phone, 
  Mail,
  MapPin,
  MessageCircle,
  Instagram, 
  Youtube
} from 'lucide-react';


function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Bike className="h-20 w-20 text-blue-500" />
              <span className="text-xl font-bold text-white">Siddhivinayak Auto World: Your One-Stop Bike Showroom
              </span>
            </div>
            <p className="text-sm">
              Your trusted multibrand two-wheeler showroom, offering premium bikes and exceptional service since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="hover:text-blue-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={scrollToTop}
                  className="hover:text-blue-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" onClick={scrollToTop} className="hover:text-blue-500 transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/offers" onClick={scrollToTop} className="hover:text-blue-500 transition-colors">Offers & Deals</Link>
              </li>
              <li>
                <Link to="/quotation" onClick={scrollToTop} className="hover:text-blue-500 transition-colors">Quotation</Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="hover:text-blue-500 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-500" />
                <a href="tel:+919998303810" className="hover:text-blue-500 transition-colors">
                  +91 9998303810
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <a href="mailto:sidhhivinayakautoworld@gmail.com" className="text-white-600 hover:text-blue-700">
                sidhhivinayakautoworld
                @gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <a href='https://maps.app.goo.gl/MRmLnGjDgr9rEVUv8' target='_blank' className="hover:text-blue-700">G 8,9,10, Shyam Satva Residency, Naroda - Dehgam Rd, opp. Hp petrol pump, nr. GEB OFFICE, Vasant Vihar 2, Naroda, Ahmedabad. Gujarat - 382330
                  </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://wa.me/+919998303810" target='_blank' className="hover:text-blue-500 transition-colors">
                 <MessageCircle className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/sidhhivinayak_auto__world/" target='_blank' className="hover:text-blue-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Business Hours</h4>
              <p className="text-sm">Monday - Saturday: 9:30 AM - 7:30 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Sidhhivinayak Auto World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;