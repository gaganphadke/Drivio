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

  const [formInputs, setFormInputs] = useState({
    departure: '',
    returnLocation: '',
    pickUpDate: '',
    pickUpTime: '',
    returnDate: '',
    returnTime: '',
    driverOption: null
  });

  // Function to handle navigation to CarDetail page with reg_num query parameter
  const isFormComplete = () => {
    return Object.values(formInputs).every(value => value.trim() !== '');
  };


  useEffect(() => {
    console.log(router.query);
    if (router.query) {
      const { departure, returnLocation, pickUpDate, pickUpTime, returnDate, returnTime, driverOption } = router.query;

      // Populate form inputs from query parameters if they exist
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        departure: departure || prevInputs.departure,
        returnLocation: returnLocation || prevInputs.returnLocation,
        pickUpDate: pickUpDate || prevInputs.pickUpDate,
        pickUpTime: pickUpTime || prevInputs.pickUpTime,
        returnDate: returnDate || prevInputs.returnDate,
        returnTime: returnTime || prevInputs.returnTime,
        driverOption: driverOption || prevInputs.driverOption,
      }));

      // Set the selected driver option button state
      setSelectedButton(driverOption || null);
    }
  }, [router.query]);  // This effect will run every time router.query changes


  // Modified handleCarClick function
  const handleCarClick = (reg_num) => {
    if (isFormComplete()) {
      router.push({
        pathname: '/car-detail',
        query: { reg_num, ...formInputs } // Include form inputs in the query parameters
      });
    } else {
      alert('Please fill in all fields in the form to proceed.');
    }
  };


  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      driverOption: buttonName === selectedButton ? '' : buttonName  // Toggle selection
    }));
    setSelectedButton(buttonName === selectedButton ? null : buttonName);  // Update button state
  };


  return (
    <div className={styles.all}>
      <div className={styles.content}>
        <h1>Rent a Car for Every Journey</h1>
        <div className='form'>
          <form
            className={styles.searchForm}
            style={{
              width: '120%', // Keep the form full width
              margin: '0 auto', // Center the form
              transition: 'width 0.7s ease', // Smooth transition
              display: 'flex', // Ensure it uses flexbox for alignment
              flexWrap: 'wrap', // Allow wrapping of input groups
              gap: '10px', // Space between input groups
            }}
          >
            <div className={styles.inputGroup}>
              <label>Departure</label>
              <div className={styles.inputWrapper}>
                <Image
                  src="/location.png"
                  alt="Location Icon"
                  width={20}
                  height={20}
                  className={styles.inputIcon}
                />
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={formInputs.departure}
                  onChange={(e) => setFormInputs({ ...formInputs, departure: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Return Location</label>
              <div className={styles.inputWrapper}>
                <Image
                  src="/location.png"
                  alt="Location Icon"
                  width={20}
                  height={20}
                  className={styles.inputIcon}
                />
                <input
                  type="text"
                  placeholder="Enter Location"
                  value={formInputs.returnLocation}
                  onChange={(e) => setFormInputs({ ...formInputs, returnLocation: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Pick Up Date</label>
              <input
                className='logo'
                type="date"
                value={formInputs.pickUpDate}
                onChange={(e) => setFormInputs({ ...formInputs, pickUpDate: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Pick Up Time</label>
              <input
                className='logo'
                type="time"
                value={formInputs.pickUpTime}
                onChange={(e) => setFormInputs({ ...formInputs, pickUpTime: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Return Date</label>
              <input
                className='logo'
                type="date"
                value={formInputs.returnDate}
                onChange={(e) => setFormInputs({ ...formInputs, returnDate: e.target.value })}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Return Time</label>
              <input
                className='logo'
                type="time"
                value={formInputs.returnTime}
                onChange={(e) => setFormInputs({ ...formInputs, returnTime: e.target.value })}
              />
            </div>
            <div className={styles.actionGroup}>
              <div className={styles.filterGroup}>
                <p style={{ marginRight: '10px' }}>Filter:</p>
                <button
                  type="button"
                  className={`${styles.filterButton} ${selectedButton === 'Without Driver' ? styles.selected : ''}`}
                  onClick={() => handleButtonClick('Without Driver')}
                >
                  Without Driver
                </button>
                <button
                  type="button"
                  className={`${styles.filterButton} ${selectedButton === 'With Driver' ? styles.selected : ''}`}
                  onClick={() => handleButtonClick('With Driver')}
                >
                  With Driver
                </button>
              </div>
              <div className={styles.searchButtonContainer}>
                <button type="submit" className={styles.searchButton}>
                  Search →
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <section className={styles.topPicksSection}>

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
    </div>
  );
};

export default CarsPage;
