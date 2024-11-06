import Hero from '../components/Hero';
import TopPicks from '../components/TopPicks';
import Navbar from '@/components/Navbar';
import PopularDestinations from '@/components/PopularDestinations';
import Deals from '@/components/Deals';
import FooterLanding from '@/components/FooterLanding';

export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero />
      <TopPicks />
      <PopularDestinations/>
      <Deals/>
      <FooterLanding/>
    </>
  );
}
