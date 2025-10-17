// app/components/Navbar.tsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type SubItem = { label: string; href: string; description?: string };
type NavItem = { label: string; href?: string; children?: SubItem[] };

const NAV: NavItem[] = [
  {
    label: "About",
    href: "#about",
    children: [
      { label: "Our Story", href: "#", description: "How Inspiring Mentors began" },
      { label: "Mission & Values", href: "#", description: "What we stand for" },
      { label: "Team", href: "#", description: "Meet the mentors" },
    ],
  },
  {
    label: "Coaches",
    href: "#coaches",
    children: [
      { label: "Ankit Neerav", href: "#", description: "Manifestation" },
      { label: "Swastik Nandakumar", href: "#", description: "Productivity" },
      { label: "Shankar Kulkarni", href: "#", description: "Wealth" },
    ],
  },
  {
    label: "Events",
    href: "#events",
    children: [
      { label: "Business Mastery", href: "#", description: "Scale your business" },
      { label: "Life Mastery", href: "#", description: "Master mind & body" },
      { label: "Date With Destiny", href: "#", description: "Design your future" },
    ],
  },
  {
    label: "Coaching",
    href: "#coaching",
    children: [
      { label: "1:1 Coaching", href: "#", description: "Personalized guidance" },
      { label: "Group Coaching", href: "#", description: "Grow with peers" },
      { label: "Corporate", href: "#", description: "For teams & leaders" },
    ],
  },
  {
    label: "Blog",
    href: "#blog",
    children: [
      { label: "Articles", href: "#", description: "Read our latest" },
      { label: "Videos", href: "#", description: "Watch & learn" },
      { label: "Resources", href: "#", description: "Templates & tools" },
    ],
  },
  {
    label: "Shop",
    href: "#shop",
    children: [
      { label: "Courses", href: "#", description: "On-demand learning" },
      { label: "Books", href: "#", description: "Top recommendations" },
      { label: "Merch", href: "#", description: "Wear the mission" },
    ],
  },
];

const dropIn = {
  hidden: { opacity: 0, y: 8, pointerEvents: "none" as const },
  visible: { opacity: 1, y: 0, pointerEvents: "auto" as const, transition: { duration: 0.18 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
};

const BRAND_TEXT = "text-[#EBBB2F]";
const BRAND_BORDER = "border-[#EBBB2F33]";
const BRAND_BG = "bg-black";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenDesktop(null);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 ${BRAND_BG} transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md shadow-lg" : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      role="navigation"
      aria-label="Primary"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className={`font-display font-extrabold tracking-tight ${BRAND_TEXT} text-lg sm:text-xl md:text-2xl`}
            whileHover={{ scale: 1.03 }}
          >
            Inspiring Mentors
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV.map((item) => {
              const isOpen = openDesktop === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDesktop(item.label)}
                  onMouseLeave={() => setOpenDesktop((cur) => (cur === item.label ? null : cur))}
                >
                  <button
                    className={`group inline-flex items-center gap-1 ${BRAND_TEXT} font-semibold tracking-wide hover:opacity-90`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onFocus={() => setOpenDesktop(item.label)}
                  >
                    <span className="text-sm lg:text-base">{item.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} ${BRAND_TEXT}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isOpen && item.children && (
                      <motion.div
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`absolute left-0 mt-3 w-[300px] lg:w-[400px] rounded-2xl border ${BRAND_BORDER} ${BRAND_BG} shadow-xl overflow-hidden`}
                      >
                        <div className="p-2">
                          {item.children.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              className="rounded-xl px-3 py-2 hover:bg-white/5 transition flex flex-col"
                            >
                              <span className={`text-sm lg:text-[15px] font-semibold ${BRAND_TEXT}`}>
                                {sub.label}
                              </span>
                              {sub.description && (
                                <span className="text-xs text-[#EBBB2FCC]">{sub.description}</span>
                              )}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-white/5 ${BRAND_TEXT}`}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className={`${BRAND_TEXT} hover:bg-white/5 font-semibold`}>
              Login
            </Button>
            <Button
              className="bg-[#EBBB2F] text-black font-black hover:opacity-90"
              size="lg"
            >
              Start Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`${BRAND_TEXT} md:hidden`}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`md:hidden ${BRAND_BG} border-t ${BRAND_BORDER}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            {/* Scrollable list (space for bottom actions) */}
            <div className="mx-auto max-w-7xl px-4 pt-3 pb-28 overflow-y-auto h-[calc(100dvh-0px)]">
              {/* Header row */}
              <div className="flex items-center justify-between py-2">
                <div className={`font-display font-extrabold ${BRAND_TEXT} text-base`}>
                  Inspiring Mentors
                </div>
                <div className="flex items-center gap-2">
                  <Button className="bg-[#EBBB2F] text-black rounded-full h-9 px-4 font-bold">
                    Start now
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Search"
                    className={`${BRAND_TEXT} hover:bg-white/5`}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <hr className={`my-2 border ${BRAND_BORDER}`} />

              {/* Accordion */}
              <ul className="space-y-1">
                {NAV.map((item) => {
                  const open = openMobile === item.label;
                  return (
                    <li key={item.label} className={`border-b ${BRAND_BORDER} pb-2`}>
                      <button
                        className={`w-full flex items-center justify-between py-3 ${BRAND_TEXT} font-bold`}
                        onClick={() => setOpenMobile((cur) => (cur === item.label ? null : item.label))}
                        aria-expanded={open}
                      >
                        {/* slightly smaller on mobile */}
                        <span className="text-xl sm:text-2xl">{item.label}</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""} ${BRAND_TEXT}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="pl-1 pb-2">
                              {(item.children ?? []).map((sub) => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  className="block py-2 text-[15px] sm:text-base text-[#EBBB2FCC] hover:text-[#EBBB2F]"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {sub.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Bottom action bar */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 flex gap-3 ${BRAND_BG} border-t ${BRAND_BORDER}`}>
              <Button className="w-1/2 rounded-full h-11 bg-[#EBBB2F] text-black font-extrabold">
                Start now
              </Button>
              <Button className={`w-1/2 rounded-full h-11 border-2 ${BRAND_TEXT} border-[#EBBB2F] bg-transparent font-bold hover:bg-white/5`}>
                Log in
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
