import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const events = [
  {
    title: 'Business Mastery',
    subtitle: 'Grow your business exponentially',
    gradient: 'from-primary to-accent',
  },
  {
    title: 'Leadership Academy',
    subtitle: 'Become the leader you were meant to be',
    gradient: 'from-success to-primary',
  },
  {
    title: 'Life Mastery',
    subtitle: 'Transform every area of your life',
    gradient: 'from-highlight to-success',
  },
  {
    title: 'Date with Destiny',
    subtitle: 'Discover your true purpose',
    gradient: 'from-accent to-highlight',
  },
];

const EventsCarousel = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 md:py-32 px-4 bg-background" id="events">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Events that Transform
          </h2>
          <p className="text-xl md:text-2xl text-secondary">Discover our signature experiences</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="events-swiper pb-12"
          >
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className={`relative h-80 rounded-2xl overflow-hidden group cursor-pointer bg-gradient-to-br ${event.gradient}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-overlay group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative h-full flex flex-col justify-end p-8">
                    <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-lg text-foreground/90">{event.subtitle}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsCarousel;
