import { Link } from 'react-router-dom';

const brands = [
  {
    name: 'Honda',
    image: "/hondabike.png"
  },
  {
    name: 'Hero',
    image: "/herobike.png"
  },
  {
    name: 'TVS',
    image: "/tvsbike.png"
  },
  {
    name: 'Suzuki',
    image: "/suzukibike.png"
  },
  {
    name: 'Yamaha',
    image: "/yamahabike.png"
  },
  {
    name: 'Royal Enfield',
    image: "/rebike.png"
  },
  {
    name: 'Bajaj',
    image: "/bajajbike.png"
  },
  {
    name: 'KTM',
    image: '/ktmbike.png'
  }
];

function Products() {
  return (
    <div className="container-custom py-12 mt-20">
      <h1 className="section-title">Our Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            to={`/products/${brand.name.toLowerCase().replace(' ', '-')}`}
            className="card group"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white">{brand.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;