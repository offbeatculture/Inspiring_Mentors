// app/components/FreeResourcesSection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, PlayCircle, Mic, Calendar } from "lucide-react";

type FreeCard = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

export default function FreeResourcesSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards: FreeCard[] = [
    {
      title: "Free PDF",
      description: "A quick-start guide to kick off your growth journey.",
      href: "/free/pdf",
      icon: <FileText className="h-6 w-6" />,
      badge: "Free",
    },
    {
      title: "Free Video",
      description: "Watch a power-packed lesson to gain clarity fast.",
      href: "/free/video",
      icon: <PlayCircle className="h-6 w-6" />,
      badge: "Free",
    },
    {
      title: "Free Podcast",
      description: "Listen to bite-sized insights on the go.",
      href: "/free/podcast",
      icon: <Mic className="h-6 w-6" />,
      badge: "Free",
    },
    {
      title: "Free Session",
      description: "Book a no-cost session to map your next steps.",
      href: "/free-session",
      icon: <Calendar className="h-6 w-6" />,
      badge: "Free",
    },
  ];

  const container = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.45 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
  };

  return (
    <section id="free" className="bg-black px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display font-extrabold tracking-tight text-[#EBBB2F] text-3xl sm:text-4xl md:text-5xl mb-3">
            Free Resources
          </h2>
          <p className="text-[#EBBB2F]/80 text-base sm:text-lg max-w-2xl mx-auto">
            Explore our complimentary tools to start your transformation today.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6"
        >
          {cards.map((c) => (
            <motion.a
              key={c.title}
              variants={item}
              href={c.href}
              className="
                group relative flex flex-col justify-between
                bg-white text-black rounded-2xl p-5 sm:p-6
                min-h-[180px] sm:min-h-[200px]
                shadow-[0_8px_30px_rgba(235,187,47,0.12)]
                ring-1 ring-[#EBBB2F]/20
                transition-transform duration-200 hover:-translate-y-1
                focus:outline-none focus:ring-2 focus:ring-[#EBBB2F]
              "
            >
              {/* Badge */}
              {c.badge && (
                <span
                  className="
                    absolute top-3 right-3 text-xs font-semibold
                    px-2 py-0.5 rounded-full
                    bg-[#EBBB2F] text-black
                  "
                >
                  {c.badge}
                </span>
              )}

              {/* Icon */}
              <div
                className="
                  inline-flex items-center justify-center
                  rounded-xl border border-[#EBBB2F]/30
                  bg-[#EBBB2F]/10 text-[#EBBB2F]
                  h-11 w-11 mb-4
                  transition-colors group-hover:bg-[#EBBB2F] group-hover:text-black
                "
                aria-hidden="true"
              >
                {c.icon}
              </div>

              {/* Title & description */}
              <div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold mb-1">
                  {c.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  {c.description}
                </p>
              </div>

              {/* Button */}
              <div className="pt-4">
                <span
                  className="
                    relative inline-flex items-center justify-center
                    px-4 py-2 rounded-full border border-[#EBBB2F]
                    text-black font-semibold overflow-hidden
                  "
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                    Learn More
                  </span>
                  <span
                    className="
                      absolute inset-0 bg-[#EBBB2F]
                      scale-x-0 group-hover:scale-x-100
                      origin-center transition-transform duration-300 ease-out rounded-full
                    "
                  />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
