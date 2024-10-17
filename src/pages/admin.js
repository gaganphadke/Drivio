import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AdminDashboard from '../components/AdminDashboard';  // Import the AdminDashboard component

const AdminPage = () => {
  return (
    <>
      <Navbar />          {/* Reuse Navbar */}
      <AdminDashboard />   {/* Admin Dashboard Component */}
      <Footer />           {/* Reuse Footer */}
    </>
  );
};

export default AdminPage;
