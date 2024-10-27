import PaymentPage from '../components/PaymentPage';
import Footer from '../components/Footer';
import styles from '../styles/PaymentPageMain.module.css';

const Payment = () => {
  return (
    <div className={styles.pageContainer}>
      <PaymentPage />
      <Footer />
    </div>
  );
};

export default Payment;
