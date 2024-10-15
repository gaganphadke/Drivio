import styles from '../styles/TopPicks.module.css';

const cars = [
  { name: 'Toyota Yaris', price: 70, img: '/images/yaris.png' },
  { name: 'Alphard', price: 85, img: '/images/alphard.png' },
  { name: 'Lexus NX', price: 90, img: '/images/lexus-nx.png' },
  // Add more car data here...
];

const TopPicks = () => (
  <section className={styles.topPicks}>
    <h2>Top picks vehicle this month</h2>
    <div className={styles.carsGrid}>
      {cars.map((car, index) => (
        <div key={index} className={styles.carCard}>
          <img src={car.img} alt={car.name} />
          <div className={styles.carDetails}>
            <h3>{car.name}</h3>
            <p>${car.price} / day</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TopPicks;
