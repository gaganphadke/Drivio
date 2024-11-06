// CarsPage.js
import styles from '../styles/AllCars.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CarsPage = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('kmsHigh');
  const [filters, setFilters] = useState({
    transmission: '',
    carType: '',
    passengers: '',
    luggage: ''
  });

  const [filterOptions, setFilterOptions] = useState({
    transmissions: [],
    carTypes: [],
    passengers: [],
    luggage: []
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/getAllCars');
        const data = await response.json();
        setCars(data);
        setFilteredCars(data);

        const transmissions = [...new Set(data.map(car => car.transmission))];
        const carTypes = [...new Set(data.map(car => car.category))];
        const passengers = [...new Set(data.map(car => car.passengers))];
        const luggage = [...new Set(data.map(car => car.luggage))];

        setFilterOptions({ transmissions, carTypes, passengers, luggage });
      } catch (error) {
        console.error('Failed to fetch car data:', error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let updatedCars = cars;

    if (searchTerm) {
      updatedCars = updatedCars.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.transmission) {
      updatedCars = updatedCars.filter((car) => car.transmission === filters.transmission);
    }
    if (filters.carType) {
      updatedCars = updatedCars.filter((car) => car.category === filters.carType);
    }
    if (filters.passengers) {
      updatedCars = updatedCars.filter((car) => car.passengers === Number(filters.passengers));
    }
    if (filters.luggage) {
      updatedCars = updatedCars.filter((car) => car.luggage === Number(filters.luggage));
    }

    if (sortBy) {
      updatedCars = [...updatedCars].sort((a, b) =>
        sortBy === 'priceLow' ? a.price - b.price :
        sortBy === 'priceHigh' ? b.price - a.price :
        sortBy === 'ratingLow' ? a.rating - b.rating :
        sortBy === 'ratingHigh' ? b.rating - a.rating :
        b.kms - a.kms
      );
    }

    setFilteredCars(updatedCars);
  }, [searchTerm, sortBy, filters, cars]);

  const resetFilters = () => {
    setSearchTerm('');
    setSortBy('kmsHigh');
    setFilters({
      transmission: '',
      carType: '',
      passengers: '',
      luggage: ''
    });
    setFilteredCars(cars);
  };

  // Function to handle navigation to CarDetail page with reg_num query parameter
  const handleCarClick = (reg_num) => {
    router.push({
      pathname: '/car-detail',
      query: { reg_num }
    });
  };

  return (
    <section className={styles.topPicksSection}>
      <div className={styles.heading}>
        <h2>All Available Cars</h2>
        <p>Explore our full range of cars for an unforgettable journey.</p>
      </div>

      <div className={styles.filterControls}>
        <input
          type="text"
          placeholder="Search by car name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />

        <div className={styles.filterRow}>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className={styles.filterSelect}
          >
            <option value="kmsHigh">Sort Price & Rating</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="ratingLow">Rating: Low to High</option>
            <option value="ratingHigh">Rating: High to Low</option>
          </select>

          <select 
            value={filters.transmission} 
            onChange={(e) => setFilters((prev) => ({ ...prev, transmission: e.target.value }))} 
            className={styles.filterSelect}
          >
            <option value="">Filter by Transmission</option>
            {filterOptions.transmissions.map((transmission) => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>

          <select 
            value={filters.carType} 
            onChange={(e) => setFilters((prev) => ({ ...prev, carType: e.target.value }))} 
            className={styles.filterSelect}
          >
            <option value="">Filter by Car Type</option>
            {filterOptions.carTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select 
            value={filters.passengers} 
            onChange={(e) => setFilters((prev) => ({ ...prev, passengers: e.target.value }))} 
            className={styles.filterSelect}
          >
            <option value="">Filter by Passengers</option>
            {filterOptions.passengers.map((passenger) => (
              <option key={passenger} value={passenger}>{passenger}</option>
            ))}
          </select>

          <select 
            value={filters.luggage} 
            onChange={(e) => setFilters((prev) => ({ ...prev, luggage: e.target.value }))} 
            className={styles.filterSelect}
          >
            <option value="">Filter by Luggage</option>
            {filterOptions.luggage.map((luggage) => (
              <option key={luggage} value={luggage}>{luggage}</option>
            ))}
          </select>

        </div>
        <div className={styles.button}>
          <button onClick={resetFilters} className={styles.resetButton}>Reset Filters</button>
        </div>
      </div>

      <div className={styles.carsGrid}>
        {filteredCars.map((car) => (
          <div key={car.id} className={styles.carContainer} onClick={() => handleCarClick(car.reg_num)}>
            <div className={styles.carCard}>
              <span className={styles.categoryTag}>{car.category}</span>
              <img src={car.image} alt={car.name} className={styles.carImage} />
            </div>
            <div className={styles.carDetailsContainer}>
              <h3 className={styles.carTitle}>{car.name}</h3>
              <div className={styles.transmission}>
                <Image src="/gear.png" alt="Transmission Gear Icon" width={18} height={18} className={styles.icon} />
                <span>{car.transmission}</span>
              </div>
              <div className={styles.carDetails}>
                <span>
                  <Image src="/group.png" alt="Passengers" width={18} height={18} className={styles.icon} />
                  {car.passengers}
                </span>
                <span>
                  <Image src="/luggage.png" alt="Luggage" width={18} height={18} className={styles.icon} />
                  {car.luggage}
                </span>
                <span>
                  <Image src="/star.png" alt="Rating" width={18} height={18} className={styles.icon} />
                  {car.rating}
                </span>
              </div>
              <div className={styles.priceInfo}>
                <span>Starts from</span>
                <span className={styles.price}>${car.price}</span>
                <span className={styles.perDay}>/ day</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarsPage;
