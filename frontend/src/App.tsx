import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import BrandPage from './pages/BrandPage';
import Offers from './pages/Offers';
import Contact from './pages/Contact';
import Quotation from './pages/Quotation';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:brand" element={<BrandPage />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quotation" element={<Quotation />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;