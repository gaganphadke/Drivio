import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';  // Import the AdminDashboard component
import Navbar from '@/components/Navbar-no-float';

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <AdminDashboard />   {/* Admin Dashboard Component */}
      <Footer />           {/* Reuse Footer */}
    </>
  );
};

export default AdminPage;
