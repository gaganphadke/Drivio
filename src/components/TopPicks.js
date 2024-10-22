import styles from '../styles/TopPicks.module.css';
import Image from 'next/image';

const TopPicks = () => {
  const cars = [
    {
      id: 1,
      category: 'Hatchback',
      name: 'Tata Curvv',
      transmission: 'Automatic',
      passengers: 4,
      luggage: 2,
      rating: 4.7,
      price: '$70',
      image: '/tata-curvv.jpeg'
    },
    {
      id: 2,
      category: 'Sportsback',
      name: 'Audi S5',
      transmission: 'Automatic',
      passengers: 5,
      luggage: 2,
      rating: 4.8,
      price: '$95',
      image: '/audi-s5.jpeg'
    },
    {
      id: 3,
      category: 'SUV',
      name: 'Lexus NX-300',
      transmission: 'Automatic',
      passengers: 4,
      luggage: 2,
      rating: 4.7,
      price: '$88',
      image: '/lexus-nx.jpeg'
    },
    {
      id: 4,
      category: 'Sedan',
      name: 'Camry',
      transmission: 'Automatic',
      passengers: 4,
      luggage: 2,
      rating: 4.9,
      price: '$50',
      image: '/camry.jpeg'
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
      image: '/innova.png'
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
      image: '/fortuner.jpeg'
    },
    {
      id: 7,
      category: 'Sportsback',
      name: 'BMW M2',
      transmission: 'Automatic',
      passengers: 4,
      luggage: 2,
      rating: 4.8,
      price: '$60',
      image: '/bmw-m2.jpeg'
    },
    {
      id: 8,
      category: 'Sedan',
      name: 'Mercedes-Benz A-Class',
      transmission: 'Automatic',
      passengers: 4,
      luggage: 2,
      rating: 4.6,
      price: '$70',
      image: '/benz-a-class.jpeg'
    }
  ];

  return (
    <section className={styles.topPicksSection}>
      <div className={styles.heading}>
        <h2>Top picks vehicle this month</h2>
        <p>Experience the epitome of an amazing journey with our top picks.</p>
      </div>

      <div className={styles.carsGrid}>
        {cars.map((car) => (
          <div key={car.id} className={styles.carContainer}>

            {/* Car Image and Category Tag (inside the container) */}
            <div className={styles.carCard}>
              <span className={styles.categoryTag}>{car.category}</span>
              <img src={car.image} alt={car.name} className={styles.carImage} />
            </div>

            {/* Car Details (outside the container) */}
            <div className={styles.carDetailsContainer}>
              <h3 className={styles.carTitle}>{car.name}</h3>

              {/* Transmission with Gear Icon */}
              <div className={styles.transmission}>
                <Image
                  src="/gear.png"
                  alt="Transmission Gear Icon"
                  width={18}
                  height={18}
                  className={styles.icon}
                />
                <span>{car.transmission}</span>
              </div>

              <div className={styles.carDetails}>
                <span>
                  <Image
                    src="/group.png"
                    alt="Passengers"
                    width={18}
                    height={18}
                    className={styles.icon}
                  />
                  {car.passengers}
                </span>

                <span>
                  <Image
                    src="/luggage.png"
                    alt="Luggage"
                    width={18}
                    height={18}
                    className={styles.icon}
                  />
                  {car.luggage}
                </span>

                <span>
                  <Image
                    src="/star.png"
                    alt="Rating"
                    width={18}
                    height={18}
                    className={styles.icon}
                  />
                  {car.rating}
                </span>
              </div>

              <div className={styles.priceInfo}>
                <span>Start from</span>
                <span className={styles.price}>{car.price}</span>
                <span className={styles.perDay}>/ day</span>
              </div>
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
