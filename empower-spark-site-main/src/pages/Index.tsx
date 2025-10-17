import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import EventsCarousel from '@/components/EventsCarousel';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <AboutSection />
        <EventsCarousel />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
