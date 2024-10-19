import styles from '../styles/PopularDestinations.module.css';

const PopularDestinations = () => {
  const destinations = [
    'Car Rental in Bandung',
    'Car Rental in Jakarta',
    'Car Rental in Bali',
    'Car Rental in Sydney',
    'Car Rental in New York',
    'Car Rental in Seoul',
    'Car Rental in Tokyo',
    'Car Rental in Paris',
    'Car Rental in Jeju Island',
    'Car Rental in Los Angeles',
    'Car Rental in Berlin',
    'Car Rental in Munich',
    'Car Rental in Yogyakarta',
    'Car Rental in Liverpool',
    'Car Rental in Glasgow',
    'Car Rental in Birmingham',
  ];

  return (
    <section className={styles.popularDestinationsSection}>
      <div className={styles.heading}>
        <h2>Discover popular car rental in worldwide</h2>
        <p>Explore a diverse and extensive range of rental cars.</p>
      </div>
      <div className={styles.destinationsGrid}>
        {destinations.map((destination, index) => (
          <div key={index} className={styles.destinationCard}>
            {destination}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
