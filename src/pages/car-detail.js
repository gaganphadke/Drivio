import CarDetail from '../components/CarDetail';
import styles from '../styles/CarDetail.module.css';

export default function CarDetailPage() {
  return (
    <>
      <div className={styles.pageContainer}>
        <CarDetail />
      </div>
    </>
  );
}