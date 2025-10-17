// app/components/EventsStrip.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

type EventCard =
  | { type: "image"; title: string; subtitle: string; href?: string; src?: string; alt?: string }
  | { type: "video"; title: string; subtitle: string; href?: string; src?: string; poster?: string };

const events: EventCard[] = [
  {
    type: "image",
    title: "Business Mastery",
    subtitle: "Grow your business exponentially",
    src: "/media/events/business-mastery.jpg",
  },
  {
    type: "video",
    title: "Leadership Academy",
    subtitle: "Become the leader you were meant to be",
    src: "/media/events/leadership-teaser.mp4",
    poster: "/media/events/leadership-poster.jpg",
  },
  {
    type: "image",
    title: "Life Mastery",
    subtitle: "Transform every area of your life",
  },
  {
    type: "video",
    title: "Date with Destiny",
    subtitle: "Discover your true purpose",
  },
];

export default function EventsStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const fallbackColors = [
    "bg-[#EBBB2F]/80",
    "bg-[#EBBB2F]/40",
    "bg-[#F5C542]/70",
    "bg-[#C29A1C]/60",
  ];

  return (
    <section id="events" className="bg-black px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 text-center sm:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="font-display font-extrabold tracking-tight text-[#EBBB2F] text-2xl sm:text-4xl md:text-5xl">
              Events that liberate
            </h2>

            {/* Mobile-only Discover Events */}
            <div className="sm:hidden mt-3">
              <a
                href="/events"
                className="inline-flex items-center gap-2 text-[#EBBB2F] text-base font-semibold hover:opacity-90 transition"
              >
                Discover events <ChevronRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Desktop Discover Events */}
          <div className="hidden sm:flex">
            <a
              href="/events"
              className="inline-flex items-center gap-2 text-[#EBBB2F] text-base sm:text-lg font-semibold hover:opacity-90 transition"
            >
              Discover events <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {/* Scrollable cards */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="relative"
        >
          <div
            className="
              no-scrollbar
              flex gap-4 sm:gap-6
              overflow-x-auto overscroll-x-contain
              scroll-smooth
              snap-x snap-mandatory
              pb-2
            "
            aria-label='Upcoming events'
          >
            {events.map((ev, i) => {
              const slug =
                ev.href ??
                `/events/${ev.title.toLowerCase().replace(/\s+/g, "-")}`;

              return (
                <a
                  key={ev.title}
                  href={slug}
                  className="
                    group relative
                    min-w-[240px] sm:min-w-[300px] md:min-w-[360px] lg:min-w-[420px]
                    h-[340px] sm:h-[400px] md:h-[420px]
                    rounded-2xl overflow-hidden
                    snap-center
                    bg-black ring-1 ring-[#EBBB2F]/15 shadow-2xl
                  "
                >
                  {ev.type === "image" && ev.src ? (
                    <img
                      src={ev.src}
                      alt={ev.alt ?? ev.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : ev.type === "video" && ev.src ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={ev.src}
                      poster={ev.poster}
                      autoPlay
                      muted
                      playsInline
                      loop
                    />
                  ) : (
                    <div
                      className={`absolute inset-0 ${
                        fallbackColors[i % fallbackColors.length]
                      }`}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5 opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-[#EBBB2F] mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                      {ev.title}
                    </h3>
                    <p className="text-[#EBBB2F]/90 text-sm sm:text-base font-semibold">
                      {ev.subtitle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar globally */}
      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </section>
  );
}
