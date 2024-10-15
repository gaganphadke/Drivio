import Header from '../components/Header';
import Hero from '../components/Hero';
import TopPicks from '../components/TopPicks';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar/>
      {/* <Navbar/> */}
      <Hero />
      <TopPicks />
      <Footer />
    </>
  );
}
