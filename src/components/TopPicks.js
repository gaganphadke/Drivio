import styles from '../styles/TopPicks.module.css';

const TopPicks = () => {
  const cars = [
    {
      id: 1,
      category: 'Hatchback',
      name: 'Toyota Yaris',
      transmission: 'Automatic/Manual',
      passengers: 3,
      luggage: 2,
      rating: 4.7,
      price: '$70',
      image: '/path-to-toyota-yaris.png'
    },
    {
      id: 2,
      category: 'Minivan',
      name: 'Alphard',
      transmission: 'Automatic',
      passengers: 5,
      luggage: 3,
      rating: 4.8,
      price: '$95',
      image: '/path-to-alphard.png'
    },
    {
      id: 3,
      category: 'SUV',
      name: 'Lexus NX-300',
      transmission: 'Automatic',
      passengers: 3,
      luggage: 2,
      rating: 4.7,
      price: '$88',
      image: '/path-to-lexus-nx300.png'
    },
    {
      id: 4,
      category: 'Sedan',
      name: 'Camry',
      transmission: 'Automatic',
      passengers: 3,
      luggage: 2,
      rating: 4.9,
      price: '$50',
      image: '/path-to-camry.png'
    },
    {
      id: 5,
      category: 'Minivan',
      name: 'Innova',
      transmission: 'Manual',
      passengers: 5,
      luggage: 2,
      rating: 4.9,
      price: '$85',
      image: '/path-to-innova.png'
    },
    {
      id: 6,
      category: 'SUV',
      name: 'Toyota Fortuner',
      transmission: 'Automatic',
      passengers: 5,
      luggage: 2,
      rating: 4.8,
      price: '$75',
      image: '/path-to-toyota-fortuner.png'
    },
    {
      id: 7,
      category: 'MPV',
      name: 'Innova Zenix',
      transmission: 'Automatic/Manual',
      passengers: 6,
      luggage: 2,
      rating: 4.8,
      price: '$60',
      image: '/path-to-innova-zenix.png'
    },
    {
      id: 8,
      category: 'SUV',
      name: 'Terios',
      transmission: 'Automatic',
      passengers: 5,
      luggage: 2,
      rating: 4.6,
      price: '$70',
      image: '/path-to-terios.png'
    }
  ];

  return (
    <section className={styles.topPicksSection}>
      <div className={styles.heading}>
        <h2>Top picks vehicle this month</h2>
        <p>Experience the epitome of amazing journey with our top picks.</p>
      </div>
      <div className={styles.carsGrid}>
        {cars.map((car) => (
          <div key={car.id} className={styles.carCard}>
            <div className={styles.categoryTag}>{car.category}</div>
            <img src={car.image} alt={car.name} className={styles.carImage} />
            <h3>{car.name}</h3>
            <p className={styles.transmission}>{car.transmission}</p>
            <div className={styles.carDetails}>
              <span>👤 {car.passengers}</span>
              <span>🧳 {car.luggage}</span>
              <span>⭐ {car.rating}</span>
            </div>
            <div className={styles.priceInfo}>
              <span>Start from</span>
              <span className={styles.price}>{car.price} / day</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.seeMore}>
        <button>See More</button>
      </div>
    </section>
  );
};

export default TopPicks;
