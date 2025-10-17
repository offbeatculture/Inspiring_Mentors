// app/components/HeroCarousel.tsx
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Replace with your assets ---
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
// Example video imports (or use URLs):
// import promoVid from "@/assets/promo.mp4";

type MediaSlide =
  | { type: "image"; src: string; alt?: string; duration?: number }   // duration ms
  | { type: "video"; src: string; poster?: string; duration?: number };

const slides: MediaSlide[] = [
  { type: "image", src: hero1 as unknown as string, alt: "Slide 1", duration: 6000 },
  { type: "video", src: "/videos/promo-1.mp4", duration: 8000, /* poster: hero2 */ },
  { type: "image", src: hero2 as unknown as string, alt: "Slide 2", duration: 6000 },
  { type: "video", src: "/videos/promo-2.mp4", duration: 9000, /* poster: hero3 */ },
  { type: "image", src: hero3 as unknown as string, alt: "Slide 3", duration: 6000 },
];

const HeroCarousel = () => {
  const [i, setI] = useState(0);

  // per-slide duration (fallback 6s)
  const duration = useMemo(() => slides[i]?.duration ?? 6000, [i]);

  useEffect(() => {
    const t = setTimeout(() => setI((p) => (p + 1) % slides.length), duration);
    return () => clearTimeout(t);
  }, [i, duration]);

  return (
    <section
      className="
        relative w-full bg-black
        px-4 sm:px-6 lg:px-8
        mt-[72px] sm:mt-[90px] lg:mt-[110px]
        mb-10 sm:mb-14
      "
    >
      {/* Black framed carousel card */}
      <div className="relative rounded-[36px] overflow-hidden h-[70svh] sm:h-[75svh] lg:h-[80svh] bg-black shadow-2xl">
        {/* Crossfade media */}
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0.0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {slides[i].type === "image" ? (
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url(${(slides[i] as any).src})` }}
                aria-label={(slides[i] as any).alt ?? "carousel image"}
              />
            ) : (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src={(slides[i] as any).src}
                poster={(slides[i] as any).poster}
                autoPlay
                muted
                playsInline
                // Use loop=false so the timeout advances to next slide naturally
                loop={false}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === i ? "w-8 bg-[#EBBB2F]" : "w-2 bg-[#EBBB2F]/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
