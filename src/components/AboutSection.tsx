// app/components/AboutSection.tsx
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex justify-center"
    >
      {/* White inner card */}
      <div className="bg-white text-black rounded-[36px] shadow-2xl max-w-7xl w-full px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              About Inspiring Mentors
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Inspiring Mentors is a community of growth seekers and leaders,
              empowering individuals to unlock their fullest potential through
              mentorship, transformation, and purpose-driven learning.
            </motion.p>

            {/* Learn More Button */}
            <motion.a
              href="#"
              className="inline-block relative group overflow-hidden px-8 py-3 rounded-full font-semibold
                         text-black border border-[#EBBB2F] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                Learn More
              </span>
              <span
                className="absolute inset-0 bg-[#EBBB2F] scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 ease-out rounded-full"
              ></span>
            </motion.a>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="h-48 bg-[#EBBB2F]/80 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.div
              className="h-48 bg-black rounded-xl mt-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
            <motion.div
              className="h-48 bg-gray-300 rounded-xl -mt-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
            <motion.div
              className="h-48 bg-[#EBBB2F]/40 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
