import Feedback from '../components/Feedback';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/FeedbackPage.module.css'; // Import the new CSS module


export default function FeedbackPage() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.feedbackContainer}>
        <Feedback />
      </div>
      <Footer />
    </div>
  );
}
