import Navbar from '@/components/Navbar';
import HeroCarousel from '@/components/HeroCarousel';
import AboutSection from '@/components/AboutSection';
import EventsCarousel from '@/components/EventsCarousel';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import PodcastSection from '@/components/PodcastSection';
import SessionsSection from '@/components/SessionsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroCarousel />
        <AboutSection />
        <EventsCarousel />
        <PodcastSection />\
        <SessionsSection/>
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
