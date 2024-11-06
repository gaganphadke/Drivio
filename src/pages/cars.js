// pages/cars.js
import CarsPage from '../components/CarsPage';
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer'

const Cars = () => {
  return (
    <div>
      <Navbar />
      <CarsPage />
      <Footer/>
    </div>
  );
};

export default Cars;