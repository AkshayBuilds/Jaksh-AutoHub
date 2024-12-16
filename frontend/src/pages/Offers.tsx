import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Offers() {
  return (
    <div className="container-custom py-12 mt-20">
      <h1 className="section-title">Current Offers & Deals</h1>
      <div className="text-center text-gray-600 mb-12">
        Coming Soon: Special offers and seasonal deals
      </div>
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
  );
}

export default Offers;