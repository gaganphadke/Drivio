import EditProfile from '../components/EditProfile';
import Navbar from '../components/Navbar-car';
import Footer from '../components/Footer';
import styles from '../styles/AddCarMain.module.css'
const Edit = () => {
  return (
    <div className={styles.addback}>
      <Navbar />
      <EditProfile />
      <Footer />
    </div>
  );
};

export default Edit;