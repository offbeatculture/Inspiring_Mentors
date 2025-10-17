// app/components/PodcastSection.tsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PodcastSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // just a few alternating brand colors
  const randomColors = [
    "bg-[#ffff]"
  ];
  const color = randomColors[Math.floor(Math.random() * randomColors.length)];

  return (
    <section
      id="podcast"
      ref={ref}
      className="bg-black px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-extrabold tracking-tight text-[#EBBB2F] text-3xl sm:text-4xl md:text-5xl mb-3">
            Inspiring Mentors Podcast
          </h2>
          <p className="text-[#EBBB2F]/80 text-base sm:text-lg max-w-2xl mx-auto">
            Conversations that unlock purpose, performance, and potential — one
            episode at a time.
          </p>
        </motion.div>

        {/* Colored video placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative mx-auto max-w-5xl"
        >
          <div
            className={`
              ${color}
              group relative
              h-[380px] sm:h-[420px]
              rounded-2xl overflow-hidden
              ring-1 ring-[#EBBB2F]/15 shadow-2xl
              flex items-center justify-center
            `}
          >
            <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-black">
              Podcast Video Coming Soon
            </p>
          </div>
        </motion.div>

        {/* Button */}
        <motion.div
          className="mt-10 sm:mt-12 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <a
            href="/podcast"
            className="relative group inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#EBBB2F] text-[#EBBB2F] font-semibold overflow-hidden transition-all duration-300"
          >
            <span className="relative z-10 group-hover:text-black transition-colors">
              Explore More
            </span>
            <span className="absolute inset-0 bg-[#EBBB2F] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-out rounded-full" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
