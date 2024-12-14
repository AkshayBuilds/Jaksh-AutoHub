import React from 'react';
import { X } from 'lucide-react';

interface BikePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bike: {
    model: string;
    image: {
      url: string;
      title: string;
    };
    specs?: {
      engine?: string;
      power?: string;
      mileage?: string;
      price?: string;
    };
  };
}

const BikePreviewModal: React.FC<BikePreviewModalProps> = ({ isOpen, onClose, bike }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-6">
          <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
            <img
              src={bike.image.url}
              alt={bike.image.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{bike.image.title}</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {bike.specs?.engine && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Engine</p>
                <p className="font-semibold text-gray-900">{bike.specs.engine}</p>
              </div>
            )}
            {bike.specs?.power && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Power</p>
                <p className="font-semibold text-gray-900">{bike.specs.power}</p>
              </div>
            )}
            {bike.specs?.mileage && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="font-semibold text-gray-900">{bike.specs.mileage}</p>
              </div>
            )}
            {bike.specs?.price && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Starting Price</p>
                <p className="font-semibold text-gray-900">{bike.specs.price}</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <a
              href={`/products/${bike.model.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikePreviewModal; 