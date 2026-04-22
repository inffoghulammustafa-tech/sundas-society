import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'motion/react';
import { 
  Droplets, 
  HeartHandshake, 
  Hospital, 
  Menu, 
  X, 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  ChevronRight,
  ChevronDown,
  CreditCard,
  Activity
} from 'lucide-react';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const match = value.match(/(\d+)(.*)/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCount(Math.floor(latest));
        },
      });
      return controls.stop;
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Navbar = ({ onDonate, onAbout, onHome, onCauses, onContact, onCenters, onAboutSubPage, onMediaSubPage }: { onDonate: () => void, onAbout: () => void, onHome: () => void, onCauses: () => void, onContact: () => void, onCenters: () => void, onAboutSubPage?: (sub: string) => void, onMediaSubPage?: (sub: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { 
      name: 'About Us', 
      href: '#about',
      subLinks: [
        { name: 'Chairman', href: '#chairman' },
        { name: 'Patron', href: '#patron' },
        { 
          name: 'Our Philanthoropists', 
          href: '#philanthoropists',
          subLinks: [
            { name: 'Sohail Ahmad', href: '#sohail-ahmad' },
            { name: 'Khalid Abbas', href: '#khalid-abbas' },
          ]
        },
        { name: 'Office Bearers', href: '#office-bearers' },
        { name: 'Our Centers', href: '#centers' },
        { 
          name: 'Executive Management', 
          href: '#executive',
          subLinks: [
            { name: 'Muhammad Yaseen Khan', href: '#yaseen-khan' },
            { name: 'Fareeda Yaseen', href: '#fareeda-yaseen' },
          ]
        },
        { name: 'News', href: '#news' },
      ]
    },
    { 
      name: 'Media', 
      href: '#media',
      subLinks: [
        { name: 'Events', href: '#events' },
        { name: 'Blog', href: '#blog' },
        { name: 'Certificates', href: '#certificates' },
      ]
    },
    { name: 'Our Causes', href: '#causes' },
    { name: 'Our Centers', href: '#centers' },
    { name: 'Contact', href: '#contact' },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          onClick={onHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="https://static.vecteezy.com/system/resources/previews/017/765/065/non_2x/community-care-logo-on-letter-s-template-teamwork-heart-people-family-care-love-logos-charity-foundation-creative-charity-donation-sign-free-vector.jpg" 
            alt="Sundas Logo" 
            className="h-12 w-12 rounded-full object-cover border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform"
            referrerPolicy="no-referrer"
          />
          <div className={`text-2xl font-display font-extrabold tracking-tighter ${isScrolled ? 'text-sundas-blue' : 'text-white'}`}>
            SUNDAS <span className="text-sundas-red">CLONE</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {navLinks.map((link) => (
            <li 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => {
                  if (link.name === 'About Us') onAbout();
                  else if (link.name === 'Our Causes') onCauses();
                  else if (link.name === 'Our Centers') onCenters();
                  else if (link.name === 'Contact') onContact();
                  else if (link.name === 'Home') onHome();
                }}
                className={`flex items-center gap-1 transition-colors duration-200 hover:text-sundas-red py-2 ${isScrolled ? 'text-sundas-blue' : 'text-white/90'}`}
              >
                {link.name}
                {link.subLinks && <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
              </button>

              {link.subLinks && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl py-4 border border-sundas-blue/5"
                    >
                      {link.subLinks.map((sub) => (
                        <div key={sub.name} className="relative group/sub">
                          <button
                            onClick={() => {
                              if (!sub.subLinks) {
                                if (link.name === 'About Us') {
                                  if (onAboutSubPage) onAboutSubPage(sub.name);
                                  else onAbout();
                                } else if (link.name === 'Media') {
                                  if (onMediaSubPage) onMediaSubPage(sub.name);
                                  else onHome();
                                }
                                setActiveDropdown(null);
                              }
                            }}
                            className="w-full text-left px-6 py-3 text-sm text-sundas-blue hover:bg-sundas-blue/5 hover:text-sundas-red border-l-4 border-transparent hover:border-sundas-red transition-all flex items-center justify-between"
                          >
                            {sub.name}
                            {sub.subLinks && <ChevronRight size={14} className="text-sundas-blue/30 group-hover/sub:text-sundas-red transition-colors" />}
                          </button>
                          {sub.subLinks && (
                            <div className="absolute top-0 left-full w-48 bg-white shadow-xl rounded-xl py-2 hidden group-hover/sub:block border border-sundas-blue/5">
                              {sub.subLinks.map((inner) => (
                                <button 
                                  key={inner.name}
                                  onClick={() => {
                                    if (onAboutSubPage) onAboutSubPage(inner.name);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full text-left px-4 py-2 text-xs text-sundas-blue hover:text-sundas-red transition-all"
                                >
                                  {inner.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onDonate}
            className="hidden md:block bg-sundas-red text-white px-7 py-2.5 rounded-full font-bold hover:bg-sundas-blue transition-all duration-300 shadow-lg hover:shadow-sundas-red/20 active:scale-95"
          >
            DONATE NOW
          </button>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-sundas-blue' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-sundas-blue' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-sundas-blue/10 overflow-hidden"
          >
            <ul className="px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => {
                      if (link.subLinks) {
                        setActiveDropdown(activeDropdown === link.name ? null : link.name);
                      } else {
                        if (link.name === 'Our Causes') onCauses();
                        else if (link.name === 'Our Centers') onCenters();
                        else if (link.name === 'Contact') onContact();
                        else if (link.name === 'Home') onHome();
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center justify-between w-full py-3 text-lg font-medium text-sundas-blue hover:text-sundas-red"
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown size={20} className={`transition-transform duration-200 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                  </button>

                  <AnimatePresence>
                    {link.subLinks && activeDropdown === link.name && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-6 space-y-2 border-l-2 border-sundas-red/20 mb-4"
                      >
                        {link.subLinks.map((sub) => (
                          <li key={sub.name} className="space-y-2">
                            <button
                              onClick={() => {
                                if (sub.subLinks) {
                                  setActiveMobileSub(activeMobileSub === sub.name ? null : sub.name);
                                } else {
                                  if (link.name === 'About Us') {
                                    if (onAboutSubPage) onAboutSubPage(sub.name);
                                    else onAbout();
                                  } else if (link.name === 'Media') {
                                    if (onMediaSubPage) onMediaSubPage(sub.name);
                                    else onHome();
                                  }
                                  setIsMobileMenuOpen(false);
                                  setActiveDropdown(null);
                                }
                              }}
                              className="flex items-center justify-between w-full py-2 text-base text-sundas-blue/70 hover:text-sundas-red"
                            >
                              {sub.name}
                              {sub.subLinks && <ChevronDown size={16} className={`transition-transform duration-200 ${activeMobileSub === sub.name ? 'rotate-180' : ''}`} />}
                            </button>
                            {sub.subLinks && activeMobileSub === sub.name && (
                               <motion.ul 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="pl-4 space-y-2 border-l border-sundas-blue/10 mb-2 overflow-hidden"
                               >
                                  {sub.subLinks.map(inner => (
                                     <li key={inner.name}>
                                        <button 
                                           onClick={() => {
                                              if (onAboutSubPage) onAboutSubPage(inner.name);
                                              setIsMobileMenuOpen(false);
                                              setActiveDropdown(null);
                                              setActiveMobileSub(null);
                                           }}
                                           className="block py-1 text-sm text-sundas-blue/60 hover:text-sundas-red"
                                        >
                                           {inner.name}
                                        </button>
                                     </li>
                                  ))}
                               </motion.ul>
                            )}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ))}
              <li className="pt-4">
                <button 
                  onClick={() => {
                    onDonate();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-sundas-red text-white py-3 rounded-xl font-bold"
                >
                  DONATE NOW
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AboutPage = ({ onBack, subPage }: { onBack: () => void, subPage: string | null }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subPage]);

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop" 
          alt="About Sundas Foundation" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
           
        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
                <motion.div
                  key={subPage || 'about'}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                      {subPage ? (
                        <>
                          {subPage.split(' ')[0]} <span className="text-sundas-red">{subPage.split(' ').slice(1).join(' ') || ''}</span>
                        </>
                      ) : (
                        <>
                          About <span className="text-sundas-red">Us</span>
                        </>
                      )}
                  </h1>
                  <div className="w-24 h-2 bg-sundas-red mx-auto mt-4 rounded-full shadow-lg shadow-sundas-red/40"></div>
                  <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
                      {subPage ? `Dedicated to excellence in ${subPage.toLowerCase()} activities.` : "Know more about our mission, vision, and the incredible journey of serving humanity."}
                  </p>
                </motion.div>
            </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sundas-blue font-bold mb-12 hover:gap-4 transition-all"
        >
          <ArrowRight className="rotate-180" size={20} /> Back to Home
        </button>

        {subPage === 'Chairman' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2">
                 <div className="relative group">
                    <img 
                      src="https://sundas.org/images/board-members/Munoo-bhai.jpeg" 
                      alt="Munnu Bhai (Late)" 
                      className="rounded-3xl shadow-2xl w-full object-cover aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sundas-red/10 rounded-full blur-2xl -z-10"></div>
                 </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue mb-2">
                    Munnu <span className="text-sundas-red">Bhai (Late)</span>
                  </h2>
                  <p className="text-xl font-bold text-sundas-red uppercase tracking-widest">Chairman</p>
                  <div className="absolute -top-10 -right-10 text-9xl text-sundas-blue/5 font-serif select-none">"</div>
                </div>
                <div className="space-y-6 text-sundas-blue/80 text-lg leading-relaxed text-justify relative">
                  <p>
                    Munnu Bhai was a celebrated journalist, poet, columnist, and one of Pakistan's most cherished writers. His journey began as a translator for an Urdu newspaper, but his extraordinary talent soon led him to the world of drama and literature. As a playwright, he became a cornerstone of Pakistan Television Corporation (PTV), writing some of its most iconic works. His timeless drama Sona Chandi (1982) remains a classic, alongside other notable creations such as Ashiana, Dasht, and the environmental documentary Before It’s Too Late.
                  </p>
                  <p>
                    He also wrote Tamanna, a UK-Pakistani film featuring Rahat Fateh Ali Khan's music, showcasing his ability to craft narratives that resonate deeply. Munnu Bhai's Punjabi poetry is widely regarded as a masterpiece of modern Punjabi literature. As a columnist for Daily Jang, his insightful and fearless writing earned him a place among Pakistan's finest voices.
                  </p>
                  <p>
                    For his exceptional contributions to literature and society, he was honored with the Pride of Performance Award in 2007 and the Hilal-i-Imtiaz (Crescent of Excellence) posthumously in 2018. Beyond his literary brilliance, Munnu Bhai's compassion knew no bounds. His love for humanity inspired the creation of Sundas Foundation, a light of hope for patients battling Thalassemia and other blood disorders.
                  </p>
                  <p>
                    His life's work reflected his profound empathy for society's struggles and his unwavering commitment to justice and truth. Munnu Bhai had an unmatched ability to illuminate societal flaws through his writings, giving voice to the voiceless. He passed away on 19 January 2018 in Lahore at the age of 84, but his legacy stays in his timeless works and the countless lives he touched. Munnu Bhai’s life was a testament to selflessness, resilience, and an enduring love for humanity. Through his words and actions, he remains an inspiration for generations to come.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : subPage === 'Muhammad Yaseen Khan' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2">
                 <div className="relative group">
                    <img 
                      src="https://sundas.org/images/board-members/yaseen-khan.jpg" 
                      alt="Muhammad Yaseen Khan" 
                      className="rounded-3xl shadow-2xl w-full object-cover aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sundas-red/10 rounded-full blur-2xl -z-10"></div>
                 </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue mb-2">
                    Muhammad <span className="text-sundas-red">Yaseen Khan</span>
                  </h2>
                  <p className="text-xl font-bold text-sundas-red uppercase tracking-widest">Founder / President</p>
                  <div className="absolute -top-10 -right-10 text-9xl text-sundas-blue/5 font-serif select-none">"</div>
                </div>
                <div className="space-y-6 text-sundas-blue/80 text-lg leading-relaxed text-justify relative">
                  <p>
                    Mr. Yaseen Khan is a highly respected name in social work and philanthropy in Pakistan. In 1998, he founded Sundas Foundation with a mission to overcome the impact of Thalassemia and Hemophilia in Pakistan while providing free, high-quality care to those in need. Under his leadership, Sundas Foundation has grown into a symbol of hope, offering excellent patient care and advocating for stronger corporate and governmental support to further its cause.
                  </p>
                  <p>
                    Mr. Khan’s journey in social work spans over 30 years, beginning as the Head of the Blood Management Department at Fatimid Foundation. During his time, he witnessed the hardships faced by patients traveling from distant areas to receive care. Determined to ease their suffering, he established a facility in Gujranwala named after a Thalassemia patient, Sundas, giving birth to Sundas Foundation.
                  </p>
                  <p>
                    In response to the rising number of Thalassemia patients, Mr. Khan played a pivotal role in founding additional institutions such as Noor Thalassemia Foundation, Jado Jehad Foundation in Lahore, Amna Hematological Services & Blood Bank in Multan, and Pakistan Thalassemia Center in Islamabad. His dedication extended beyond healthcare, as he was instrumental in establishing Pakistan Sweet Homes in 2011, a sanctuary for over 4,000 orphans affected by terrorism in Khyber Pakhtunkhwa and Balochistan.
                  </p>
                  <p>
                    Currently serving as the President of Pakistan Civil Society, Mr. Khan continues to champion the rights of marginalized and underserved communities. His tireless efforts and unwavering commitment to social justice have transformed countless lives, making him a beacon of hope for the vulnerable and a role model for future generations.
                  </p>
                  <div className="pt-4 border-t border-sundas-blue/10">
                    <p className="font-bold text-sundas-blue">Yaseen Khan</p>
                    <p className="text-sm text-sundas-blue/60">Founder / President, Sundas Foundation</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : subPage === 'Fareeda Yaseen' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2">
                 <div className="relative group">
                    <img 
                      src="https://sundas.org/images/board-members/farida-yaseen.jpg" 
                      alt="Fareeda Yaseen" 
                      className="rounded-3xl shadow-2xl w-full object-cover aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sundas-blue/10 rounded-full blur-2xl -z-10"></div>
                 </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue mb-2">
                    Fareeda <span className="text-sundas-red">Yaseen</span>
                  </h2>
                  <p className="text-xl font-bold text-sundas-red uppercase tracking-widest">CEO</p>
                  <div className="absolute -top-10 -right-10 text-9xl text-sundas-blue/5 font-serif select-none">"</div>
                </div>
                <div className="space-y-6 text-sundas-blue/80 text-lg leading-relaxed text-justify relative">
                  <p>
                    Fareeda Yaseen brings over 30 years of experience in the Thalassemia and Hemophilia healthcare sector. She began her career at Fatimid Foundation Pakistan before joining Sundas Foundation, where she played a key role in managing various departments from the very start of its operations in Punjab.
                  </p>
                  <p>
                    Her efforts, driven by a positive and visionary approach, have been instrumental in establishing the foundation as one of the leading organizations in its field. As the CEO of Sundas Foundation, Fareeda Yaseen continues to oversee critical management tasks, making her an invaluable asset to the organization.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : subPage === 'Sohail Ahmad' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2">
                 <div className="relative group">
                    <img 
                      src="https://sundas.org/images/board-members/sohail-ahmad.jpg" 
                      alt="Sohail Ahmad" 
                      className="rounded-3xl shadow-2xl w-full object-cover aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sundas-blue/10 rounded-full blur-2xl -z-10"></div>
                 </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue mb-2">
                    Sohail <span className="text-sundas-red">Ahmed (Azizi)</span>
                  </h2>
                  <p className="text-xl font-bold text-sundas-red uppercase tracking-widest">Director</p>
                  <div className="absolute -top-10 -right-10 text-9xl text-sundas-blue/5 font-serif select-none">"</div>
                </div>
                <div className="space-y-6 text-sundas-blue/80 text-lg leading-relaxed text-justify relative">
                  <p>
                    Sohail Ahmed, widely known as Azizi, is a celebrated Pakistani comedian and actor, best recognized for his role in the popular Dunya TV show Hasb-e-Haal. Through his witty and insightful commentary, Azizi tackles social, political, and local issues, offering both entertainment and clarity to his viewers. Born on 1 May 1963 in Gujranwala, Punjab, Azizi is proud of his roots in a city renowned for its food and culture.
                  </p>
                  <p>
                    His father, Mian Muhammad Akram, was a DSP, and his grandfather, Dr. Fakeer Muhammad, was a renowned philanthropist and the author of over 40 books in Punjabi. Sohail Ahmed's talent goes beyond performance; he has skillfully embraced a range of versatile roles, setting new standards in the entertainment industry. As an active member of the Punjab Arts Council, he has been a strong advocate for clean, meaningful stage performances, opposing vulgarity and obscenity in drama.
                  </p>
                  <p>
                    Sohail Ahmed has also been an invaluable part of Sundas Foundation for many years, currently serving as the Director. His dedication and service to the foundation have made a significant impact and continue to inspire the community.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : subPage === 'Khalid Abbas' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2">
                 <div className="relative group">
                    <img 
                      src="https://sundas.org/images/board-members/khalid-abbas-dar.jpg" 
                      alt="Khalid Abbas Dar" 
                      className="rounded-3xl shadow-2xl w-full object-cover aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sundas-red/10 rounded-full blur-2xl -z-10"></div>
                 </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue mb-2">
                    Khalid <span className="text-sundas-red">Abbas Dar</span>
                  </h2>
                  <p className="text-xl font-bold text-sundas-red uppercase tracking-widest">Director</p>
                  <div className="absolute -top-10 -right-10 text-9xl text-sundas-blue/5 font-serif select-none">"</div>
                </div>
                <div className="space-y-6 text-sundas-blue/80 text-lg leading-relaxed text-justify relative">
                  <p>
                    Born in 1942, Mr. Khalid Abbas Dar is a renowned actor, playwright, director, mimic, and television host, with a career spanning over five decades. His contributions to Pakistan's entertainment industry have earned him prestigious awards, including the Presidential Pride of Performance in 1999, Sitara-e-Imtiaz in 2006-07, and Hilal-e-Imtiaz in 2013 from the Government of Pakistan.
                  </p>
                  <p>
                    Starting his career as a child performer on Radio Pakistan in 1955, Khalid Abbas Dar became the first-ever "One Man Show" performer on PTV in 1964. He has also worked closely with the Federal Ministry of Health to raise awareness about crucial health issues such as Polio, Hepatitis, and HIV/AIDS. 
                  </p>
                  <p>
                    Mr. Dar has been a dedicated member of Sundas Foundation for many years, currently serving as its Director. His unwavering support and tireless efforts in supporting the foundation's mission make him an invaluable asset. Despite his busy schedule, he consistently participates in key events, helping drive the foundation's success.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : subPage === 'Office Bearers' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue">
                Office <span className="text-sundas-red">Bearers</span>
              </h2>
              <div className="w-24 h-1.5 bg-sundas-red mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 max-w-6xl mx-auto">
              {[
                { name: "Muhammad Yaseen Khan", role: "Founder / President", img: "https://sundas.org/images/OfficeBearers/YaseenKhan_P_MBG.png" },
                { name: "Shahid Hassan Sheikh", role: "Vice President - I", img: "https://sundas.org/images/OfficeBearers/ShahidHassanSheikh_VP_MBG.png" },
                { name: "Aalia Tayyaba", role: "Vice President - II", img: "https://sundas.org/images/OfficeBearers/AliaTayyaba_VP_MBG.png" },
                { name: "Sajjad Ahmed Cheema", role: "General Secretary", img: "https://sundas.org/images/OfficeBearers/Dr_SajjadCheema_GS_MBG.png" },
                { name: "Naeem Ahmad", role: "Finance Secretary", img: "https://sundas.org/images/board-members/Naeem-Ahmad.jpg" },
                { name: "Tayyab Saleem", role: "Joint Secretary", img: "https://sundas.org/images/OfficeBearers/TayyabSaleem_JS_MBG.png" },
                { name: "Bushra Saddique", role: "Information Secretary", img: "https://sundas.org/images/OfficeBearers/BushraSaddique_IS_MBG.png", colStart: true }
              ].map((member, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`text-center group ${member.colStart ? 'lg:col-start-2' : ''}`}
                >
                  <div className="w-48 h-64 mx-auto mb-6 overflow-hidden rounded-t-full bg-[#8b3d3d] border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="font-bold text-sundas-blue uppercase tracking-wide text-lg">{member.name}</h3>
                  <p className="text-xs text-sundas-red font-bold mt-2 uppercase tracking-widest">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : subPage === 'Patron' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="grid lg:grid-cols-5 gap-16 items-start">
              <div className="lg:col-span-2">
                 <div className="relative group">
                    <img 
                      src="https://sundas.org/images/board-members/SuhailWarraich_Pattern.png" 
                      alt="Suhail Warraich" 
                      className="rounded-3xl shadow-2xl w-full object-cover aspect-[3/4] grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sundas-blue/10 rounded-full blur-2xl -z-10"></div>
                 </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <div className="relative">
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue mb-2">
                    Suhail <span className="text-sundas-red">Warraich</span>
                  </h2>
                  <p className="text-xl font-bold text-sundas-red uppercase tracking-widest">Patron</p>
                  <div className="absolute -top-10 -right-10 text-9xl text-sundas-blue/5 font-serif select-none">"</div>
                </div>
                <div className="space-y-6 text-sundas-blue/80 text-lg leading-relaxed text-justify relative">
                  <p>
                    Suhail Warraich is a renowned Pakistani journalist, television host, analyst, and media personality. He is widely recognized for hosting Aik Din Geo Kay Sath on Geo News which is a profile-based talk show. Suhail Warraich was born on November 8, 1961, in Jauharabad, Khushab. He earned a master’s degree in English literature from the University of the Punjab.
                  </p>
                  <p>
                    His journalism career started in print media in December 1985, and he has been associated with GEO TV since its launch. He gained immense popularity as the host of Ek Din Geo K Sath, a profile-based TV program showcasing the lifestyles of celebrities. Additionally, he hosted Left Right, a political debate show featuring right-wing and left-wing perspectives, where he advocated for left-wing viewpoints.
                  </p>
                  <p>
                    Beyond his media career, Suhail Warraich is actively engaged in humanitarian work. As the Patron of Sundas Foundation, he supports the welfare of Thalassemia and Hemophilia patients across Pakistan. He plays a key role in raising awareness about blood disorders and advocating for upgraded treatment facilities. His efforts have strengthened Sundas Foundation’s mission to provide free blood transfusions, medical aid, and better healthcare services to those in need.
                  </p>
                  <p>
                    Warraich is also a strong advocate for human rights, contributing to Amnesty International Pakistan’s Human Rights Project. His dedication to journalism and social welfare continues to leave a lasting impact on society. In 2024, he was honored with the President’s Pride of Performance award for his contributions to society.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : subPage === 'News' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-32"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-sundas-blue">
                Latest <span className="text-sundas-red">News</span>
              </h2>
              <p className="text-sundas-blue/60 mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
                Social Services community centers and settlement houses that provide integrated services for local communities.
              </p>
              <div className="w-24 h-1 bg-sundas-red mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { date: "10-02-2023", title: "Prof. Dr. Javed Akra..." },
                { date: "14-01-2023", title: "Senator Ejaz Ahmad C..." },
                { date: "29-11-2022", title: "Inspection team of P..." },
                { date: "28-11-2022", title: "Commissioner Lahore ..." },
                { date: "31-08-2022", title: "...سیلاب زدگان کے لیے س", rtl: true },
                { date: "02-08-2022", title: "Blood Donation Camp ..." }
              ].map((news, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 shadow-lg shadow-sundas-blue/5 hover:shadow-xl transition-all duration-300 relative group border border-sundas-blue/10 rounded-2xl"
                >
                  <div className="absolute top-0 left-0 bg-sundas-red text-white px-5 py-2 flex items-center text-sm font-semibold rounded-tl-2xl rounded-br-2xl">
                    <span className="mr-2 opacity-80 decoration-none">📅</span> {news.date}
                  </div>
                  <div className="mt-10 pt-4">
                    <h3 className={`text-xl font-bold text-sundas-blue line-clamp-2 ${news.rtl ? 'text-right' : ''}`} dir={news.rtl ? 'rtl' : 'ltr'}>
                      {news.title}
                    </h3>
                    <div className="flex justify-between items-center mt-8">
                       <a href="#" className="inline-flex items-center gap-1 text-sundas-red text-xs font-bold uppercase tracking-widest hover:gap-2 transition-all group">
                         Read More <ArrowRight size={14} />
                       </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : !subPage ? (
          <>
            <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-sundas-blue mb-8">
                  Our <span className="text-sundas-red">Historical</span> Journey
                </h2>
                <div className="space-y-6 text-sundas-blue/80 text-lg leading-relaxed">
                  <p>
                    Founded in 1998 by the visionary poet and intellectual, Munnoo Bhai (Late), Sundas Foundation began with a simple yet powerful goal: to ensure no child in Pakistan suffers from blood-related disorders due to a lack of resources.
                  </p>
                  <p>
                    What started as a small initiative has grown into a nationwide network of blood transfusion centers and medical facilities, serving thousands of patients suffering from Thalassemia, Hemophilia, and other blood disorders.
                  </p>
                  <p>
                    We believe in the sanctity of human life and work tirelessly to provide state-of-the-art medical care, psychological support, and a community for those who face these challenges daily.
                  </p>
                </div>
              </motion.div>
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="relative"
              >
                <img 
                  src="https://sundas.org/images/gallery_2.jpg" 
                  alt="Sundas Activities" 
                  className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-video"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-sundas-blue/5 rounded-full blur-3xl -z-10"></div>
              </motion.div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center"
          >
            <h2 className="text-4xl font-display font-bold text-sundas-blue mb-8">
              Welcome to the <span className="text-sundas-red">{subPage}</span> Section
            </h2>
            <div className="max-w-3xl mx-auto p-12 bg-sundas-blue/5 rounded-3xl border border-sundas-blue/10">
              <p className="text-xl text-sundas-blue/70 leading-relaxed mb-10">
                This section provides detailed information about our {subPage.toLowerCase()} and their contribution to the mission of Sundas Foundation.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-sundas-blue/5">
                  <div className="w-12 h-12 bg-sundas-red/10 text-sundas-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Key Role</h4>
                  <p className="text-sm text-sundas-blue/50">Strategic direction and governance support for foundation activities.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-sundas-blue/5">
                  <div className="w-12 h-12 bg-sundas-blue/10 text-sundas-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={24} />
                  </div>
                  <h4 className="font-bold mb-2">Commitment</h4>
                  <p className="text-sm text-sundas-blue/50">Welfare of humanity and providing free medical care to the needy.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            { 
              title: "Our Mission", 
              desc: "To provide world-class healthcare and blood transfusion services to non-affording patients without any distinction of caste, creed, or status.",
              icon: <Droplets className="mx-auto text-sundas-red mb-6" size={48} />
            },
            { 
              title: "Our Vision", 
              desc: "A society where every patient with a blood disorder has access to the best medical care and lives a healthy, productive life.",
              icon: <HeartHandshake className="mx-auto text-sundas-blue mb-6" size={48} />
            },
            { 
              title: "Our Values", 
              desc: "Compassion, Transparency, and Excellence in everything we do. We are committed to serving humanity with utmost integrity.",
              icon: <Hospital className="mx-auto text-sundas-red mb-6" size={48} />
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sundas-blue/5 p-10 rounded-3xl border border-sundas-blue/10"
            >
              {item.icon}
              <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">{item.title}</h3>
              <p className="text-sundas-blue/70">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="py-24 bg-sundas-blue text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sundas-blue via-sundas-red to-sundas-blue opacity-30"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 italic">
            "Sunder Sapnay, Sundas Foundation"
          </h2>
          <p className="text-xl text-white/80 mb-12 font-medium">
            Join the legacy of Munnoo Bhai. Your donation is a gift of life to those who need it most.
          </p>
          <button 
             onClick={onBack}
             className="bg-white text-sundas-blue px-10 py-4 rounded-full font-bold text-lg hover:bg-sundas-red hover:text-white transition-all shadow-xl"
          >
            Become a Part of Our Journey
          </button>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mb-48 -mr-48"></div>
      </section>
    </div>
  );
};

const MediaPage = ({ onBack, subPage }: { onBack: () => void, subPage: string | null }) => {
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedBlog(null);
  }, [subPage]);

  if (selectedBlog === 'nawaz-sharif-birthday') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Events
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sundas.org/Images/NewsandEvents/Events/26-Dec-2025_01-52-04_605150152_1293209289507958_3706831559144245765_n.jpg" 
                alt="Nawaz Sharif Birthday" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Provincial Education Minister Rana Sikandar Hayat Khan Celebrates <span className="text-sundas-red">Nawaz Sharif’s Birthday</span> with Thalassemia and Hemophilia Patients at Sundas Foundation
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <div className="flex items-center gap-4 text-sundas-red font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-sundas-blue/10">
                <Activity size={18} /> 12/25/2025 12:00:00 AM
              </div>

              <p className="font-bold text-xl italic text-sundas-blue">Provincial Education Minister Rana Sikandar Hayat Khan visited Sundas Foundation Lahore and celebrated the birthday of PML-N President Muhammad Nawaz Sharif with thalassemia and hemophilia patients, distributing gifts and appreciating the foundation’s welfare services.</p>

              <p>Lahore: Provincial Minister for Education Rana Sikandar Hayat Khan visited Sundas Foundation Lahore on the occasion of the birthday of President Pakistan Muslim League (N), Muhammad Nawaz Sharif. He was warmly received by Founder and President of Sundas Foundation Muhammad Yasin Khan, Director Khalid Abbas Dar, Patron Sohail Warraich and the foundation’s management.</p>

              <p>During the visit, the Provincial Education Minister cut a birthday cake with children suffering from thalassemia and hemophilia to celebrate the birthday of Muhammad Nawaz Sharif. Rana Sikandar Hayat Khan met the children, distributed gifts among them and expressed deep affection and encouragement. He also reviewed the medical facilities being provided to patients suffering from blood disorders at Sundas Foundation.</p>

              <p>While speaking to the media, Rana Sikandar Hayat Khan said that the day was full of joy as Christmas was being celebrated alongside the birthdays of Mian Muhammad Nawaz Sharif and Quaid-e-Azam Muhammad Ali Jinnah (RA). He stated that these happy moments were shared with the children by celebrating together and cutting cakes on the occasion.</p>

              <p>He further said that Sundas Foundation is a remarkable welfare organization that brings smiles to the faces of millions of Pakistanis and serves as a blessing especially for children suffering from thalassemia.</p>

              <p>Rana Sikandar Hayat Khan also emphasized that minorities across Punjab and Pakistan enjoy complete protection and the government remains committed to ensuring equal rights for all citizens.</p>

              <div className="bg-sundas-blue/5 p-10 rounded-3xl mt-12 border border-sundas-blue/10">
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">Support Our Ongoing Efforts</h3>
                <p className="mb-8">Your support enables us to continue hosting events that bring joy and critical care to children in need. Join hands with Sundas Foundation today.</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    const element = document.getElementById('causes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sundas-red text-white px-10 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-xl"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'governor-kpk-visit') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Events
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sundas.org/Images/NewsandEvents/Events/19-Dec-2025_21-18-32_WhatsApp%20Image%202025-12-20%20at%2010.17.29%20AM.jpeg" 
                alt="Governor KPK Visit" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Governor Khyber Pakhtunkhwa <span className="text-sundas-red">Faisal Karim Kundi</span> Visits Sundas Foundation Lahore
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <div className="flex items-center gap-4 text-sundas-red font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-sundas-blue/10">
                <Activity size={18} /> 12/19/2025 12:00:00 AM
              </div>

              <p className="font-bold text-xl italic text-sundas-blue">Governor of Khyber Pakhtunkhwa Faisal Karim Kundi, visited Sundas Foundation Lahore, where he reviewed medical facilities, met children undergoing treatment for thalassemia and hemophilia and appreciated the foundation’s free healthcare services and international-standard blood management system.</p>

              <p>Lahore: Governor of Khyber Pakhtunkhwa Faisal Karim Kundi, paid a visit to Sundas Foundation Lahore, where he was warmly received by the Founder and President of Sundas Foundation Mr. Muhammad Yasin Khan, Director Mr. Khalid Abbas Dar and the foundation’s management team.</p>

              <p>During the visit, the Governor met children undergoing treatment at the foundation, distributed gifts among them and encouraged the young patients. He also reviewed the medical facilities being provided for the treatment of patients suffering from thalassemia, hemophilia, and other blood-related disorders.</p>

              <p>On this occasion, Medical Director Dr. Adnan Gillani briefed the Governor in detail about the foundation’s medical services, advanced treatment methods, modern medical equipment and efficient blood management system. Dr. Adnan stated that Sundas Foundation provides free blood and medical treatment to thousands of patients every month and ensures international standards in healthcare services. He further added that the foundation is working on new programs based on genetic screening and research to enable early diagnosis and prevention of hereditary blood diseases.</p>

              <p>While talking to the media, Governor Faisal Karim Kundi appreciated the services of Sundas Foundation and said that he was pleased to see the dedication and commitment of the staff in serving patients suffering from thalassemia, hemophilia and other blood disorders. He added that he thoroughly reviewed the medical facilities provided by the foundation and found its healthcare services, modern treatment methods, and blood management system to be in line with international standards.</p>

              <p>The Governor emphasized that the Khyber Pakhtunkhwa government has always encouraged institutions working for social welfare and assured full cooperation with Sundas Foundation in the future to support its noble cause.</p>

              <div className="bg-sundas-blue/5 p-10 rounded-3xl mt-12 border border-sundas-blue/10">
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">Support Our Cause</h3>
                <p className="mb-8">Your contribution helps us maintain international standards of care for children battling blood disorders.</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    const element = document.getElementById('causes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sundas-red text-white px-10 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-xl"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'advisor-punjab-visit') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Events
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sundas.org/Images/NewsandEvents/Events/19-Nov-2025_04-41-17_WhatsApp%20Image%202025-11-19%20at%203.30.23%20PM.jpeg" 
                alt="Advisor to CM Punjab Visit" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Advisor to the Chief Minister Punjab for <span className="text-sundas-red">Zakat & Ushr Rashid Iqbal Nasrullah</span> Visits Sundas Foundation
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <div className="flex items-center gap-4 text-sundas-red font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-sundas-blue/10">
                <Activity size={18} /> 11/19/2025 12:00:00 AM
              </div>

              <p className="font-bold text-xl italic text-sundas-blue">Advisor to the Chief Minister Punjab for Zakat & Ushr Rashid Iqbal Nasrullah visited Sundas Foundation Lahore. Met children suffering from thalassemia, hemophilia and other blood disorders, Presented gifts and reviewed the foundation’s medical facilities.</p>

              <p>Lahore: Advisor to the Chief Minister Punjab for Zakat & Ushr Rashid Iqbal Nasrullah visited Sundas Foundation Lahore where he met children suffering from thalassemia, hemophilia and other hereditary blood disorders. He encouraged the young patients, presented gifts to them and reviewed the treatment facilities and overall healthcare system of the foundation.</p>

              <p>Founder and President of Sundas Foundation Muhammad Yaseen Khan and Foundation management warmly welcomed the guests. Medical Director Dr. Adnan Gillani briefed them in detail about the medical services, advanced treatment facilities, modern equipment and blood management system offered by the Foundation. He shared that Sundas Foundation provides free blood and treatment to hundreds of patients every month while maintaining global healthcare standards. Additionally, he highlighted the Foundation’s initiatives on genetic screening and new research programs aimed at prevention and early diagnosis.</p>

              <p>While speaking to the media Mr. Rashid Iqbal Nasrullah praised the services of Sundas Foundation, stating “Sundas Foundation is truly a beacon of humanity. The high-quality medical care, exemplary child-care environment and modern treatment facilities here are impressive. This institution is not only a ray of hope but a true reflection of our society’s collective responsibility. Both the government and the public must extend full support to such organizations. I pay tribute to the tireless efforts of Sundas Foundation and assure all possible assistance.</p>

              <p>The Advisor added that organizations like Sundas Foundation represent dedication, compassion and professional excellence in Pakistan’s healthcare sector, serving as a lifeline for thousands of families.</p>

              <p>He further said that Chief Minister Maryam Nawaz holds this institution close to her heart and she will soon visit Sundas Foundation to meet the children herself.</p>

              <div className="bg-sundas-blue/5 p-10 rounded-3xl mt-12 border border-sundas-blue/10">
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">A Beacon of Humanity</h3>
                <p className="mb-8">Your Zakat and Sadaqah support institutions that serve as a lifeline for thousands of families across Punjab.</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    const element = document.getElementById('causes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sundas-red text-white px-10 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-xl"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'resham-nimra-visit') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Events
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sundas.org/Images/NewsandEvents/Events/03-Nov-2025_03-45-05_WhatsApp%20Image%202025-11-03%20at%2012.42.10%20PM.jpeg" 
                alt="Resham and Nimra Mehra Visit" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Film Star <span className="text-sundas-red">Resham</span> and Singer <span className="text-sundas-red">Nimra Mehra</span> Visit Sundas Foundation
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <div className="flex items-center gap-4 text-sundas-red font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-sundas-blue/10">
                <Activity size={18} /> 11/3/2025 12:00:00 AM
              </div>

              <p className="font-bold text-xl italic text-sundas-blue">Renowned film star Resham and singer Nimra Mehra visited Sundas Foundation where they met children suffering from thalassemia and hemophilia, distributed gifts and praised the foundation’s healthcare services. They lauded the staff’s dedication and urged the public to support the foundation’s humanitarian mission.</p>

              <p>Lahore: Pakistan’s renowned film star Resham and popular singer Nimra Mehra visited Sundas Foundation, where they spent time with children suffering from thalassemia, hemophilia and other blood disorders. The guests distributed gifts among the children and reviewed the foundation’s medical facilities.</p>

              <p>The visitors were warmly welcomed by Finance Director Ali Rauf, the management team of Sundas Foundation and media students from Punjab University. Director Khalid Abbas Dar was also present on the occasion.</p>

              <p>Dr. Farhan briefed the guests about the foundation’s medical services, advanced treatment procedures, modern equipment and an efficient blood management system. He highlighted that Sundas Foundation provides free blood transfusions and treatment to thousands of patients every month, ensuring international standards of healthcare.</p>

              <p>He further shared that the foundation is working on genetic screening and research-based programs aimed at the early diagnosis and prevention of hereditary blood diseases.</p>

              <p>Expressing her feelings singer Nimra Mehra said that Sundas Foundation is truly serving humanity. “Seeing the smiles on these children’s faces fills my heart with joy,” she said, urging the public to donate generously to support the foundation’s mission of providing better lives for these children.</p>

              <p>Appreciating the dedication of the staff film star Resham said, “Sundas Foundation is a ray of hope. The hard work and commitment of the team are truly commendable. We all must support them in this noble cause.”</p>

              <div className="bg-sundas-blue/5 p-10 rounded-3xl mt-12 border border-sundas-blue/10">
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">A Ray of Hope</h3>
                <p className="mb-8">Your support brings smiles to the faces of children battling serious conditions. Share the joy of giving today.</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    const element = document.getElementById('causes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sundas-red text-white px-10 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-xl"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'khawaja-imran-visit') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Events
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sundas.org/Images/NewsandEvents/Events/28-Oct-2025_23-26-47_571347790_1246929037469317_5390816052461761227_n.jpg" 
                alt="Khawaja Imran Nazir Visit" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Punjab Health Minister <span className="text-sundas-red">Khawaja Imran Nazir</span> Celebrates CM Maryam Nawaz Sharif’s Birthday
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <div className="flex items-center gap-4 text-sundas-red font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-sundas-blue/10">
                <Activity size={18} /> 10/28/2025 12:00:00 AM
              </div>

              <p className="font-bold text-xl italic text-sundas-blue">Punjab Health Minister Khawaja Imran Nazir Celebrates CM Maryam Nawaz Sharif’s Birthday with Thalassemia and Hemophilia Patients at Sundas Foundation. Punjab Health Minister Khawaja Imran Nazir distributed gifts interacted with the children and appreciated the foundation’s efforts in providing quality healthcare services.</p>

              <p>Lahore: Punjab Minister for Health and Population, Khawaja Imran Nazir visited Sundas Foundation on the occasion of Chief Minister Punjab Maryam Nawaz Sharif’s birthday. The distinguished guest was warmly received by President of Sundas Foundation Mr. Yasin Khan.</p>

              <p>During the visit the Minister celebrated the Chief Minister’s birthday by cutting a cake alongside children undergoing treatment for Thalassemia and Hemophilia. Khawaja Imran Nazir interacted with the children, presented gifts and expressed his affection and encouragement for them. He also reviewed the medical facilities being provided to patients suffering from blood disorders including Thalassemia and Hemophilia.</p>

              <p>Speaking to the media the Health Minister said that Maryam Nawaz Sharif’s politics embodies service, leadership and progress. He added that she has transformed promises into reality and has made public service the essence of her political journey.</p>

              <p>Khawaja Imran Nazir further stated that Maryam Nawaz Sharif is a beloved leader whose vision, political insight and people-friendly approach are acknowledged even by her critics. He said that her focus on transparency, good governance and development has ushered Punjab into a new era of progress and prosperity.</p>

              <p>“Maryam Nawaz Sharif is the true symbol of change in Punjab,” he remarked, emphasizing that her leadership continues to inspire hope and confidence among the people of the province.</p>

              <div className="bg-sundas-blue/5 p-10 rounded-3xl mt-12 border border-sundas-blue/10">
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">A Symbol of Service</h3>
                <p className="mb-8">Support the vision of health for all. Your contribution helps us provide quality care to blood disorder patients.</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    const element = document.getElementById('causes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sundas-red text-white px-10 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-xl"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'salma-butt-visit') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Events
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sundas.org/Images/NewsandEvents/Events/23-Oct-2025_00-44-34_WhatsApp%20Image%202025-10-23%20at%2012.29.40%20PM%20(1).jpeg" 
                alt="Salma Butt Visit" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Special Assistant to CM Punjab <span className="text-sundas-red">Salma Butt</span> Visits Sundas Foundation Lahore
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <div className="flex items-center gap-4 text-sundas-red font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-sundas-blue/10">
                <Activity size={18} /> 10/23/2025 12:00:00 AM
              </div>

              <p className="font-bold text-xl italic text-sundas-blue">Chairperson of CM’s Task Force on Price Control Ms. Salma Butt visited Sundas Foundation Lahore met children receiving treatment for thalassemia and hemophilia distributed gifts and reviewed the foundation’s medical facilities. She praised the foundation’s humanitarian efforts and reaffirmed the Punjab Government’s commitment to improving healthcare for children with blood disorders.</p>

              <p>Lahore: Chairperson of the Chief Minister’s Task Force on Price Control Ms. Salma Butt visited Sundas Foundation Lahore where she met children undergoing treatment, distributed gifts and reviewed the medical facilities provided to patients suffering from thalassemia, hemophilia and other blood disorders.</p>

              <p>The distinguished guest was warmly received by the foundation's management. Consultant Hematologist Dr. Saira Mueen gave Ms. Salma Butt a detailed briefing on the foundation’s medical services, advanced treatment procedures, modern equipment and efficient blood management system.</p>

              <p>Dr. Saira shared that Sundas Foundation provides free blood and treatment to thousands of patients every month ensuring international standards in healthcare are upheld.</p>

              <p>She further informed that the foundation is actively working on genetic screening and new research-based programs to enable early diagnosis and prevention of inherited blood disorders.</p>

              <p>At the conclusion of the visit Ms. Salma Butt spoke to the media commending Sundas Foundation for its outstanding humanitarian work in the treatment and care of children battling serious blood diseases like thalassemia and hemophilia.</p>

              <p>She stated that over 12,000 children are currently receiving treatment at Sundas Foundation Lahore where in addition to blood transfusion services, patients are also provided with comprehensive medical care, including dental treatment.</p>

              <p>Ms. Salma described the foundation as a beacon of hope and humanity, emphasizing that such institutions are a source of pride for society.</p>

              <p>She further added that the Government of Punjab is taking concrete and coordinated steps for the treatment and prevention of thalassemia with the aim of providing timely and modern medical facilities to affected children.</p>

              <p>She reiterated that it is the government's priority to ensure high-quality treatment, regular blood availability and improved facilities for children with blood disorders and that public-private partnerships will play a key role in achieving these goals.</p>

              <p>At the end of the visit Sundas Foundation presented Ms. Salma Butt with an honorary shield in recognition of her continued support for healthcare and social welfare initiatives.</p>

              <div className="bg-sundas-blue/5 p-10 rounded-3xl mt-12 border border-sundas-blue/10">
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">Join Our Journey</h3>
                <p className="mb-8">Be a source of hope for children battling thalassemia and hemophilia. Your support makes all possible.</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    const element = document.getElementById('causes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sundas-red text-white px-10 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-xl"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'university-lahore-camp') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Events
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://sundas.org/Images/NewsandEvents/Events/16-Oct-2025_00-05-19_DSC03914.JPG" 
                alt="University of Lahore Camp" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Sundas Foundation Organizes Successful Blood Donation Camp at <span className="text-sundas-red">University of Lahore</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <div className="flex items-center gap-4 text-sundas-red font-bold uppercase tracking-widest text-sm mb-6 pb-4 border-b border-sundas-blue/10">
                <Activity size={18} /> 10/15/2025 12:00:00 AM
              </div>

              <p className="font-bold text-xl italic text-sundas-blue">Sundas Foundation in collaboration with the University of Lahore organized a successful blood donation camp to support thalassemia and hemophilia patients. Students enthusiastically participated resulting in the collection of 278 blood bags.</p>

              <p>Lahore: In a heartfelt initiative to support children suffering from thalassemia and hemophilia. Sundas Foundation in collaboration with the University of Lahore successfully organized a blood donation camp on campus. The event received an overwhelming response from students who not only participated by donating blood but also actively promoted the cause by carrying banners and encouraging their fellow students to join the mission.</p>

              <p>By the end of the camp an impressive 278 blood bags were collected a significant contribution toward saving the lives of children who require regular blood transfusions.</p>

              <p>Students from diverse nationalities and backgrounds joined hands for this noble cause. Among them were:</p>

              <div className="space-y-6">
                <div className="p-6 bg-sundas-blue/5 rounded-2xl border-l-4 border-sundas-red">
                  <p className="font-bold text-sundas-blue">Sheikh Hammad (Saudi Arabia):</p>
                  <p>“Donating blood is a simple act for us but for the children who rely on it, it’s a matter of life and death. I’m honored to be part of this mission.”</p>
                </div>

                <div className="p-6 bg-sundas-blue/5 rounded-2xl border-l-4 border-sundas-red">
                  <p className="font-bold text-sundas-blue">Haram (Iran):</p>
                  <p>“It’s our moral responsibility to step up for humanity. It doesn’t matter where we’re from saving lives unites us all.”</p>
                </div>

                <div className="p-6 bg-sundas-blue/5 rounded-2xl border-l-4 border-sundas-red">
                  <p className="font-bold text-sundas-blue">Laiba Amjad (MBBS Student):</p>
                  <p>“Children suffering from thalassemia and hemophilia depend on regular blood donations. We can be the reason they live another day. I urge everyone to donate and spread awareness.”</p>
                </div>
              </div>

              <p>Ahmad Aslam and Talha Saleem: both active volunteers at the camp appreciated the efforts of Sundas Foundation and encouraged others to participate regularly.</p>
              <p>“This camp reminded us how much impact one small act can have. We hope this becomes a regular activity and more students get involved,” they shared.</p>

              <div className="bg-sundas-blue/5 p-10 rounded-3xl mt-12 border border-sundas-blue/10">
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-4">Be a Lifesaver</h3>
                <p className="mb-8">Your regular blood donation is the lifeline for children with thalassemia. Join our mission and save a life today.</p>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    const element = document.getElementById('causes');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-sundas-red text-white px-10 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-xl"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'hajj-2026') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Blog
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://t3.ftcdn.net/jpg/08/25/18/44/360_F_825184434_EmMHOJQ4wVSbZw4NhqmQkLMCxelxlzsJ.jpg" 
                alt="Hajj 2026" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              When is Hajj 2026? <span className="text-sundas-red">Arafah Day, Eid al-Adha 2026 Dates</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <p>Hajj is one of the five pillars of Islam. Performing Hajj is compulsory for every eligible Muslim at least once in their lifetime. Every year, Hajj takes place during the same period, in the month of Dhul Hijjah. Hajj starts from the 8th of Dhul Hijjah and lasts until the 12th of Dhul Hijjah.</p>

              <p>This article is a detailed account of Hajj in 2026. Let’s explore when the Hajj is in 2026 and how to perform the Hajj with complete rituals. As well as this, we will also discuss the mistakes every pilgrim must avoid during Hajj to have a safe and memorable Hajj experience. So, let’s begin understanding Hajj here:</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What is Hajj?</h2>
              <p>Among the five pillars of Islam, Hajj is marked as the fifth one. It is a sacred activity in Islam that Muslims perform every year at the Holy Masjid of Al-Haram in Makkah, Saudi Arabia. A financially stable Muslim must perform Hajj at least once in his lifetime. If someone is wealthy enough that he can perform Hajj more than once, he is permitted to do so. However, their intention to perform Hajj must be purely for the cause of Allah or to seek Allah’s forgiveness and pleasure. There are three different types of Hajj in Islam, including;</p>

              <ul className="list-decimal pl-6 space-y-2 font-medium">
                <li><strong>Hajj Al-Ifrad (Solo Hajj):</strong> It is the phenomenon in which Muslims perform only Hajj without Umrah.</li>
                <li><strong>Hajj Al-Qiran (Combined Hajj and Umrah):</strong> In this type of Hajj, Muslims perform Hajj and Umrah together without a break in Ihram.</li>
                <li><strong>Hajj Al-Tamattu (Relaxed Hajj):</strong> It is a type in which Muslims first perform Umrah, then take a break, and then perform Hajj.</li>
              </ul>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">When is Hajj 2026?</h2>
              <p>In 2026, it is expected that Hajj will be performed on 25th May, 2026. However, the exact Hajj schedule depends on the moon sighting in Saudi Arabia. Remember that the Hajj event will start on the 8th of Dhul Hijjah according to the Saudi calendar. Usually, the Hajj is completed in 5 or 6 days and comprises a series of rites and rituals.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Hajj Applications in Pakistan 2026?</h2>
              <p>Every year, candidates from Pakistan who wish to perform Hajj apply for the Hajj through a government Hajj scheme. You can find a complete Hajj Details 2026 for Pakistanis proposed by the government of Pakistan or the Ministry of Religious Affairs and Interfaith Harmony. Through this government portal, Hajj Zaireen can get important updates regarding Hajj registration, Hajj application status, Hajj flight schedule 2026, and Hajj Policy 2026.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Who is Eligible for Hajj?</h2>
              <p>To perform Hajj, the candidates or Zaireen must fulfill the following conditions:</p>
              <ul className="list-decimal pl-6 space-y-2">
                <li><strong>Be an Adult Muslim:</strong> The first and foremost condition to perform Hajj is that the candidate must be an adult Muslim. Hajj is not obligatory for kids or the underage.</li>
                <li><strong>Must be a Sane Person:</strong> To perform Hajj, the candidates or Zaireen must be sane or mentally well.</li>
                <li><strong>Must be a Free Person:</strong> To perform Hajj, the person must be free, as slaves are not liable for Hajj.</li>
                <li><strong>A Financially Stable Person:</strong> To perform Hajj, one must be financially strong to bear the expenses of Hajj without any problem.</li>
                <li><strong>Hajj for Women:</strong> For women, it is advised to perform Hajj with their Mahram, such as husband, father, son, brother, nephew, uncle, etc.</li>
              </ul>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">How to Perform Hajj?</h2>
              <p>The duration of Hajj is five or six days, comprising several activities to perform to complete it. Below are the must-do activities during Hajj to complete this obligation. However, one must perform each activity carefully to avoid mistakes:</p>
              <div className="bg-sundas-blue/5 p-8 rounded-3xl space-y-4">
                {[
                  { t: "Prepare for Hajj", d: "Ensure you have a valid visa, financial readiness, and good physical and mental health." },
                  { t: "Enter Ihram", d: "Wear simple, modest clothing and make the intention to perform Hajj. Men wear two white cloths, while women wear modest clothing." },
                  { t: "Arriving in Makkah (Tawaf al-Qudum)", d: "Perform Tawaf (seven circles around the Kaaba) upon arrival and pray two rak’ahs near Maqam Ibrahim." },
                  { t: "Sa’i (Walking between Safa and Marwah)", d: "Walk seven times between the hills of Safa and Marwah as part of the pilgrimage." },
                  { t: "Travel to Mina", d: "On the 8th day of Dhul-Hijjah, travel to Mina, where you will stay overnight and pray." },
                  { t: "Arafat (The Day of Arafah)", d: "Spend the day at Arafat praying and supplicating, asking Allah for forgiveness." },
                  { t: "Muzdalifah (Night under the Stars)", d: "Spend the night in Muzdalifah, pray Maghrib and Isha together, and collect pebbles for the next ritual." },
                  { t: "Jamarat (Stoning the Devil)", d: "Throw seven pebbles at the largest pillar in Mina to reject Satan’s temptations." },
                  { t: "Sacrifice and Tahallul (Shaving/Cutting Hair)", d: "After stoning, perform a sacrifice (usually a sheep or goat) and either shave your head (for men) or trim your hair (for women)." },
                  { t: "Tawaf al-Ifadah", d: "Perform Tawaf around the Kaaba again, then offer two rak’ahs at Maqam Ibrahim." },
                  { t: "Stoning the Jamarat Again", d: "On the 11th and 12th day, throw seven pebbles at each of the three pillars." },
                  { t: "Tawaf al-Wada (Farewell Tawaf)", d: "Before leaving Makkah, make a final Tawaf around the Kaaba." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-sundas-red text-white flex items-center justify-center rounded-full font-bold text-sm">{i + 1}</span>
                    <div>
                      <h4 className="font-bold text-sundas-blue">{step.t}</h4>
                      <p className="text-sm opacity-80">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Mistakes to Avoid While Performing Hajj?</h2>
              <div className="grid md:grid-cols-2 gap-6 pt-2">
                {[
                  { t: "Not Learning rituals", d: "Muslims do not learn the rituals and get disturbed during Hajj. Learn everything before performing Hajj." },
                  { t: "Wearing Ihram Incorrectly", d: "Safety pins and stitched clothes are not allowed for Ihram. You must also learn everything else before wearing Ihram." },
                  { t: "Control Your Emotions", d: "You may face a long walk, heat, and a crowd, causing frustration. But you must control your anger and emotions." },
                  { t: "Getting Lost", d: "Commonly, people get lost from the group. Keep your ID badge with your name, hotel and group name." }
                ].map((m, i) => (
                  <div key={i} className="p-6 bg-sundas-red/5 border border-sundas-red/10 rounded-2xl">
                    <h4 className="font-bold text-sundas-red mb-2">{m.t}</h4>
                    <p className="text-sm opacity-80">{m.d}</p>
                  </div>
                ))}
              </div>

              <div className="bg-sundas-blue text-white p-10 rounded-3xl text-center shadow-xl">
                 <h2 className="text-3xl font-display font-bold mb-6 italic">"Give Your Donations to Sundas Foundation This Dhul Hijjah"</h2>
                 <p className="text-lg opacity-90 mb-8">Those who are going to perform Hajj this year, may Allah accept their Hajj. However, those who are not going are advised to do good deeds on this day. Muslims can donate on this day to seek Allah’s forgiveness and pleasure. Give your donations to Sundas Foundation on Hajj day and help us treat the poor patients suffering from Thalassemia, Hemophilia, and other blood disorders.</p>
                 <button className="bg-sundas-red px-10 py-4 rounded-full font-bold hover:bg-white hover:text-sundas-blue transition-all">Donate Now</button>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">When is Hajj in 2026?</h4>
                    <p className="opacity-80">It is estimated that the Hajj 2026 will be performed on May 25th, 2026. However, the final date will be decided based on the moon sighting in Saudi Arabia.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">Who can perform Hajj?</h4>
                    <p className="opacity-80">Every adult Muslim who is sane and financially stable must perform Hajj once in a lifetime.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">What is the Dua that Hajj pilgrims offer?</h4>
                    <p className="font-serif italic opacity-90 text-lg">"Labbaik, Allahumma Labbaik, Labbaik La Sharika laka Labbaik. Inn-al-Hamda Wan-Ni'mata Laka wal-Mulk, La Sharika Lak.”</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-20 pt-10 border-t border-sundas-blue/10 flex flex-wrap gap-2 justify-center">
               {['Hajj 2026', 'Eid ul adha', 'Hajj Date'].map(tag => (
                 <span key={tag} className="px-4 py-2 bg-sundas-blue/5 text-sundas-blue/60 text-xs font-bold rounded-full">{tag}</span>
               ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'eid-ul-adha-2026') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Blog
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://cdn1.wionews.com/prod/wion/images/2025/20250606/image-1749225002177.jpg?rect=(1,0,405,304)&imwidth=800&imheight=600&format=webp&quality=medium" 
                alt="Eid Ul-Adha 2026" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Eid Ul-Adha 2026 - <span className="text-sundas-red">Date, Importance, and Holidays</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <p>Eid ul Adha is one of the major Islamic festivals celebrated by Muslims across the world. The festival is celebrated on the 10th of Dhul Hijjah, the last month of the Islamic calendar. Eid ul Adha comes with a range of festivities.</p>

              <p>Muslims offer prayer, say Eid ul-Adha Takbeerat, slaughter animals, distribute meat, and arrange dinner parties with their family and friends. Another best activity is not to ignore those who are poor and looking for your support to celebrate the Eid’s festivities. Look into your surroundings and help poor people with money, clothes, sacrifice meat, and other charity.</p>

              <p>This article is a detailed account of when Eid Ul Adha 2026 will be celebrated. As well as this, we will shed light on the ideas of how to celebrate Eid to not only experience happy moments but also to get Allah’s pleasure.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">When is Eid ul Adha 2026?</h2>
              <p>The actual day of celebration is decided based on the Eid ul-Adha moon sighting in Pakistan. Ruet-e-Hilal Committee is a dedicated organization that serves to see the moon for Eid ul-Adha. The committee sees moons on its own and sometimes makes a decision based on witnesses collected from across the country.</p>

              <p>In 2026, the Committee will gather on the 16th or 17th of May to sight the moon. However, Eid ul Adha is celebrated on the 10th of Dhul Hijjah, which means the Eid will be celebrated on 26th or 27th May in 2026. However, the final Eid date will be announced by the Committee once the moon is sighted.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Why do Muslims Celebrate Eid ul Adha?</h2>
              <p>Muslims celebrate Eid ul Adha and do Qurbani as it is the Sunnah of Hazrat Ibrahim (AS). Allah (SWT) came to Hazrat Ibarhim’s dream and instructed him to sacrifice the most valuable thing, his son Hazrat ISmail (AS).</p>

              <p>Both Hazrat Ibrahim and Hazrat Ismail agreed to fulfill Allah’s order, without any hesitation. To obey Allah’s order, Hazrat Ibrahim AS went on Mount Arafat with Hazrat Islamil (AS). He bound Ismali (AS) with a rope to prevent him from struggling. On the other hand, Hazrat Ibrahim blindfolded himself so as not to see the suffering of his son.</p>

              <p>When Ibrahim (AS) finished slaughtering, he removed his blindfold and saw Hazrat Ismail (AS) standing in front of him. Hazrat Ismail (AS) was alive and well, and a slaughtered ram lay in place of him. Allah (SWT) saved Ismail’s life and rewarded both Hazrat Ibrahim and Ismail (AS) for obeying Allah’s order.</p>

              <p>So, Muslims celebrate Eid ul Adha to commemorate the event of Hazrat Ibrahim (AS). Muslims throughout the world sacrifice animals based on their affordability and distribute meat among deserving people to get Allah’s pleasure.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Eid ul Adha 2026 Holidays in Pakistan</h2>
              <p>As Eid ul-Adha is one of the major festivals in Pakistan, during the festival, the government announces public holidays. However, Eid ul-Adha vacations in Pakistan will be announced by the government of Pakistan once the Eid days are confirmed. Three-day holidays are confirmed; however, the substitute holidays will be confirmed soon by the officials.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Eid ul Adha and Qurbani</h2>
              <p>Eid ul Adha is also known as Qurbani Eid in Pakistan. Eligible Muslims, based on their affordability, sacrifice animals and distribute the meat among others to celebrate this day. However, there are certain rules and regulations to offer Qurbani and distribute the meat after Qurbani.</p>

              <h3 className="text-2xl font-display font-bold text-sundas-blue pt-2">Who is Eligible to Offer Qurbani</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Mature and Sane Muslims:</strong> Any mature and sane Muslim can perform Qurbani.</li>
                <li><strong>Non-Traveling Person:</strong> To perform Qurbani, you must not be involved in travelling for the three days of Eid.</li>
                <li><strong>Meet the Nisba:</strong> Muslims who own wealth equal to or above the Nisab (87.48 grams of gold or 612.36 grams of silver) are eligible to perform Qurbani.</li>
              </ul>

              <h3 className="text-2xl font-display font-bold text-sundas-blue pt-2">How to Distribute Qurbani Meat</h3>
              <p>The recommended way to distribute Qurbani meat is to divide it into three equal categories:</p>
              <ul className="list-decimal pl-6 space-y-2">
                <li><strong>Qurbani Performer:</strong> Islam teaches us to keep one equal part of meat for those who perform Qurbani.</li>
                <li><strong>Family and Friends:</strong> The second part must be distributed among your family and friends. Ensure that you distribute meat among those relatives and friends who need it most.</li>
                <li><strong>Poor or Needy:</strong> The third part is for the poor and needy people. Keep looking around and distribute meat to those with low incomes who cannot afford to eat meat daily.</li>
              </ul>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Key Rituals of Eid ul-Adha</h2>
              <div className="bg-sundas-blue/5 p-8 rounded-3xl space-y-4">
                {[
                  { t: "Get Prepared for Eid", d: "Muslims get prepared for the Eid event early in the morning. They wear new clothes to celebrate and be thankful." },
                  { t: "Offer Prayer", d: "They gather in the Masjid and perform Eid ul-Adha, which is a special prayer." },
                  { t: "Offer Takbeerat", d: "Special Eid ul-Adha dua and Takbeerat are offered. 'Allah is the greatest, and to Allah belongs all praise'." },
                  { t: "Perform Qurbani/Help Others", d: "After offering prayers, eligible Muslims perform Qurbani." },
                  { t: "Distribute Meat", d: "Muslims who perform Qurbani distribute meat among their acquaintances and needy Muslims." },
                  { t: "Give Sadaqah and Charity", d: "Giving Sadaqah or charity is also considered the best practice to do on Eid." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-sundas-red text-white flex items-center justify-center rounded-full font-bold text-sm">{i + 1}</span>
                    <div>
                      <h4 className="font-bold text-sundas-blue">{step.t}</h4>
                      <p className="text-sm opacity-80">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-sundas-blue text-white p-10 rounded-3xl text-center shadow-xl">
                 <h2 className="text-3xl font-display font-bold mb-6 italic">"Give Your Donations to the Sundas Foundation this Eid!"</h2>
                 <p className="text-lg opacity-90 mb-8">On this Eid ul-Adha, do not forget those who are suffering from bad health conditions. Give your donations to Sundas Foundation and help us in the life-saving missions. Your donations are used to treat patients for those suffering from Hemophilia, Thalassemia, and other blood disorders.</p>
                 <button className="bg-sundas-red px-10 py-4 rounded-full font-bold hover:bg-white hover:text-sundas-blue transition-all">Donate Now</button>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">1. When is Eid ul Adha 2026?</h4>
                    <p className="opacity-80">It is estimated that Eid ul Adha 2026 will be celebrated from 26th or 27th May.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">2. Who Must Offer Qurbani?</h4>
                    <p className="opacity-80">Muslims who are adults, sane, not travelling, and possess wealth above the Nisab are required to perform Qurbani.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">3. What is the best time to perform Qurbani?</h4>
                    <p className="opacity-80">Qurbani can be performed from the 10th to the 12th of Dhul Hijjah after Eid prayer.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'itikaf-ramadan') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Blog
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://www.islamandihsan.com/uploads/2021/09/itikaf.jpg" 
                alt="Itikaf in Ramadan" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Itikaf in Ramadan - <span className="text-sundas-red">Everything You Need to Know</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <p>Itikaf is a form of worship Muslims perform in the last Ashrah of Ramadan. As Ikikaf is done by the Holy Prophet (Peace Be Upon Him), it is considered a Sunnah to be performed by the Muslim Ummah.</p>

              <p>Muslims from across the world perform Itikaf in Ramadan. During this period, Muslims remain in isolation and worship Allah. The only cause to perform Itikaf is to please Allah and draw His closeness.</p>

              <p>This article highlights everything about Itikaf. We will discuss what Itikaf is, who can perform it, what to do during Itikaf, and what can nullify your Itikaf. So, let’s start understanding Itikaf before you appear to perform it in Ramadan 2026.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What is Itikaf in Ramadan?</h2>
              <p>Itikaf is a Sunnah and is performed in the last ten days or the last Ashrah of Ramadan. It is a way to worship Allah in isolation while keeping yourself disconnected from the world. For men, it is advisable to perform Itikaf in the Masjid and learn Islamic values from Islamic scholars throughout this Itikaf period. However, for women, it is advised to perform Itikaf in their home and must not be involved in the household activities.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Who Can Perform Itikaf In Ramadan?</h2>
              <p>Every Muslim, including men and women, can perform Itikaf under the following conditions.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Adult Muslims:</strong> Itikaf can be done by adult and sane Muslims who can understand the purpose of worship.</li>
                <li><strong>Men and Women:</strong> Both men and women can perform Itikaf. Men in Masajid, women at home in isolation.</li>
                <li><strong>Proper Nyyah:</strong> Muslims who want to perform Itikaf must take the intention or Nyyah to dedicate this time purely for the worship of Allah.</li>
                <li><strong>Physical health:</strong> Muslims who want to perform this practice must be physically fit and able to complete this duration.</li>
              </ul>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What to do during Itikaf?</h2>
              <div className="bg-sundas-blue/5 p-8 rounded-3xl space-y-4">
                {[
                  { t: "Offer Prayers and Voluntary Ibadah", d: "Offer obligatory prayers, Traweeh, and special Nawafil/Salat al Khair." },
                  { t: "Recite the Holy Quran", d: "Recite as much as possible, preferably with translation to understand Allah's message." },
                  { t: "Make Duas", d: "Pray for yourself, family, and the Ummah. Laylatul Qadr is a special chance." },
                  { t: "Do Dhikr", d: "Recite Allah’s name and offer Darood to the Prophet (PBUH)." },
                  { t: "Learn More about Islam", d: "Attend teaching sessions in Masajid and read recommended Islamic books." },
                  { t: "Seek Forgiveness", d: "This is a special chance to seek Allah's mercy and repentance." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-sundas-red text-white flex items-center justify-center rounded-full font-bold text-sm">{i + 1}</span>
                    <div>
                      <h4 className="font-bold text-sundas-blue">{step.t}</h4>
                      <p className="text-sm opacity-80">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What can Nullify Your Itikaf?</h2>
              <p>Remember that there are some practices that can nullify your Itikaf. For example, leaving your Itikaf place without any reason and getting involved in unwanted companies can nullify your Itikaf. You must avoid making gatherings without any reason or for nonsense, as it will distract you from your aim to get Allah’s pleasure and forgiveness.</p>

              <div className="bg-sundas-blue text-white p-10 rounded-3xl text-center shadow-xl">
                 <h2 className="text-3xl font-display font-bold mb-6 italic">"Give Your Donations to Sundas Foundation This Ramadan!"</h2>
                 <p className="text-lg opacity-90 mb-8">Muslims who wish to perform Itikaf during Ramadan 2026, may Allah accept their Itikaf and fast of Ramadan. If you want to give donations before sitting for Itikaf, give your donations to Sundas Foundation.</p>
                 <button className="bg-sundas-red px-10 py-4 rounded-full font-bold hover:bg-white hover:text-sundas-blue transition-all">Donate Now</button>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">How many days of Itikaf should I perform?</h4>
                    <p className="opacity-80">The Sunnah Itikaf is performed for the last ten days of Ramadan.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">How long does Itikaf run?</h4>
                    <p className="opacity-80">It lasts until the end of Ramadan or when the moon of Shawal is sighted.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'eid-al-fitr-2026') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Blog
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://d34vm3j4h7f97z.cloudfront.net/original/4X/1/0/e/10edc692398b345ea4bd47397002bcb7a4699593.jpeg" 
                alt="Eid al Fitr 2026" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Eid al Fitr 2026 - <span className="text-sundas-red">How to Celebrate it?</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <p>Eid al-Fitr is a celebration that marks the end of Ramadan. Eid al-Fitr is celebrated on the 1st of Shawal, and Muslims throughout the world celebrate this event with great joy, passion, and generosity.</p>

              <p>This event is considered a reward or celebration from Allah for Muslims as they fasted for the whole month of Ramadan. On this special occasion, Muslims offer prayers, give Sadaqah, prepare and distribute food, and spend time with their families and friends.</p>

              <p>This article highlights the meaning and importance of Eid. Additionally, we will discuss what to do and how to celebrate Eid al-Fitr. So, let’s begin understanding the joy of Eid al-Fitr!</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What is Eid al-Fitr?</h2>
              <p>Eid al-Fitr is one of the two major festivals celebrated by Muslims from across the world. Muslims complete the practice of fasting when the Shawal moon is sighted and start celebrating Eid al-Fitr, which lasts for three days.</p>

              <p>This three-day celebration comes with joy, gratitude, passion, and kindness. The celebration starts with the Eid prayer, which is a gesture or worshipping and thanking Allah for having this celebration. Throughout the day, Muslims greet each other with a special gesture, distribute food and cash (Eidi), and arrange gatherings and parties.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">When is Eid al-Fitr in 2026?</h2>
              <p>It is expected that Eid al-Fitr will be celebrated in Pakistan on March 20th or March 21st, 2026, depending on the moon sighting. Sometimes, Ramadan ends in 29 days, and sometimes it ends in 30 days. So, every year, the actual Eid day is not confirmed until the Shawal moon is sighted and the officials announce the Eid calendar.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">How to Prepare for Eid Prayer?</h2>
              <p>On Eid al-Fitr, one of the major things to do is to offer Eid prayer. It is considered that without the Eid prayer, Eid is not said to be completed. However, different scholars give different opinions about the Eid prayer.</p>

              <div className="bg-sundas-blue/5 p-8 rounded-3xl space-y-4">
                {[
                  { t: "Perform Ghusl", d: "Perform ghusl to purify yourself before attending Eid prayer." },
                  { t: "Wear new clothes", d: "Wear new or clean clothes before going to appear for Eid prayer." },
                  { t: "Put on fragrances", d: "As it is the time to greet others, it is recommended to put attar or fragrances on Eid day." },
                  { t: "Eat dates", d: "Before leaving your home for Eid prayer, eat dates, as it is Sunnah. The Prophet (s.a.w) used to eat an odd number of dates." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-sundas-red text-white flex items-center justify-center rounded-full font-bold text-sm">{i + 1}</span>
                    <div>
                      <h4 className="font-bold text-sundas-blue">{step.t}</h4>
                      <p className="text-sm opacity-80">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">How to Celebrate Eid al-Fitr?</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-sundas-blue text-xl mb-2">Give Charity</h4>
                  <p>The beauty of the Eid celebration is that it must not be celebrated by yourself only. You have to include others in this celebration who are poor and needy. This can happen by giving Sadaqah or charity on Eid days. It is advisable to donate Sadaqah before Eid day, as it helps the poor to get prepared for Eid. It is advisable to offer your Zakat, Fitrana, and other charities voluntarily.</p>
                </div>
                <div>
                  <h4 className="font-bold text-sundas-blue text-xl mb-2">Visit Family and Friends</h4>
                  <p>After offering the Eid prayer, usually Muslims visit their family members, relatives, or friends. It is a way to greet them and make them happy on this special day. Eid is considered a day to let go of resentments. Unfortunately, if someone is angry with you, it is the time to embrace them and create a lasting bond with them.</p>
                </div>
                <div>
                  <h4 className="font-bold text-sundas-blue text-xl mb-2">Prepare and Distribute Special Meals</h4>
                  <p>Among the best practices Muslims follow across the globe is to prepare and distribute special meals on Eid day. In Pakistan, people usually prepare and distribute sweets, which is considered a gesture of happiness. Besides this, people prepare meals and invite their loved ones to consume the meals together.</p>
                </div>
                <div>
                  <h4 className="font-bold text-sundas-blue text-xl mb-2">Engage in Festivities</h4>
                  <p>In almost all the major areas, communities organize Eid fairs and other activities. You must visit these carnivals with your family, kids, or friends to be engaged in some cultural and festive activities on Eid day.</p>
                </div>
              </div>

              <div className="bg-sundas-blue text-white p-10 rounded-3xl text-center shadow-xl">
                 <h2 className="text-3xl font-display font-bold mb-6 italic">"Give Your Donations to Sundas Foundation on This Eid!"</h2>
                 <p className="text-lg opacity-90 mb-8">On this Eid, do not forget those who are looking for your help. At Sundas Foundation, hundreds of patients suffering from blood disorders get free treatment. Your donations enable us to manage blood supply, medications, and blood transfusion equipment for Thalassemia and Hemophilia patients. So, this Eid, give your donations to Sundas Foundation and support patients who really need your help to live a better life.</p>
                 <button className="bg-sundas-red px-10 py-4 rounded-full font-bold hover:bg-white hover:text-sundas-blue transition-all">Donate Now</button>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">When is Eid al-Fitr 2026?</h4>
                    <p className="opacity-80">It is expected that Eid al-Fitr will be celebrated on March 20th or 21st, 2026, in Pakistan, depending on the moon sighting.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">Why is Eid al-Fitr celebrated?</h4>
                    <p className="opacity-80">Eid al-Fitr is celebrated as a gratitude on the end of Ramadan. It is a reward from Allah to Muslims for fasting and being patient throughout the Holy month of Ramadan.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">Is Fitrana obligatory to pay before Eid al-Fitr?</h4>
                    <p className="opacity-80">Yes, Fitrana is obligatory to be paid before Eid al-Fitr. If you are eligible, then you must pay it to deserving people to include them in the Eid celebration.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">How much Fitrana is required to pay in 2026?</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                       <div className="p-4 bg-sundas-blue/5 rounded-xl border border-sundas-blue/10">
                          <span className="block text-xs font-bold text-sundas-red uppercase">Wheat Flour</span>
                          <span className="text-xl font-bold text-sundas-blue">300 PKR <span className="text-sm font-normal opacity-60">/ head</span></span>
                       </div>
                       <div className="p-4 bg-sundas-blue/5 rounded-xl border border-sundas-blue/10">
                          <span className="block text-xs font-bold text-sundas-red uppercase">Barley</span>
                          <span className="text-xl font-bold text-sundas-blue">1550 PKR <span className="text-sm font-normal opacity-60">/ head</span></span>
                       </div>
                       <div className="p-4 bg-sundas-blue/5 rounded-xl border border-sundas-blue/10">
                          <span className="block text-xs font-bold text-sundas-red uppercase">Dates</span>
                          <span className="text-xl font-bold text-sundas-blue">2100 PKR <span className="text-sm font-normal opacity-60">/ head</span></span>
                       </div>
                       <div className="p-4 bg-sundas-blue/5 rounded-xl border border-sundas-blue/10">
                          <span className="block text-xs font-bold text-sundas-red uppercase">Raisins</span>
                          <span className="text-xl font-bold text-sundas-blue">4550 PKR <span className="text-sm font-normal opacity-60">/ head</span></span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'fitrana-2026') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Blog
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://shop.donatedirectly.com/cdn/shop/files/1_Pay_Your_Fitrana_-_Thumbnails_-_Ramadan_2026_-_Website_-_Donate_Directly_103f9593-d1c9-4d03-bdb2-71c52c422cdb.jpg?v=1772469187&width=1920" 
                alt="Fitrana 2026" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Fitrana in <span className="text-sundas-red">Ramadan 2026</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <p>The month of Ramadan comes with many blessings and rewards. It makes us closer to Allah and brings patience to our personality. At the same time, it also highlights a sense of giving charity or Sadaqah to those who really need our help to celebrate Ramadan and Eid.</p>

              <p>Allah (SWT) makes it obligatory for Muslims to fast during Ramadan. At the same time, He also makes it necessary for wealthy Muslims to take care of the poor among their surroundings. For this purpose, Allah orders eligible Muslims to pay Fitrana in Ramadan and help the poor who are looking for our support.</p>

              <p>This article highlights what Fitrana is and who needs to pay it. We will also discuss the best time to pay fitrana and how much fitrana is required to pay in Ramadan 2026. So, keep reading and clear all of your concepts related to Fitrana.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What is Fitrana?</h2>
              <p>Fitrana is an obligatory form of charity that needs to be paid by every eligible Muslim in Ramadan. Remember that paying Fitrana is compulsory, and denying to pay it can be a sinful act. You need to pay it only to those who really deserve it. Well, sometimes it becomes difficult to find out the eligible persons among your surroundings.</p>

              <p>First of all, you need to pay Fitrana to your relatives, then your neighbours, and then other needy people. If you do not have the poor in your relatives and neighbourhood, you can give it to the organisations that take care of the poor and feed them on a daily basis.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Who Needs to Pay Fitrana?</h2>
              <p>Paying Fitrana is obligatory for every Muslim who can afford it. Remember that Muslims who possess wealth in excess of their daily living expenses or beyond what is needed for themselves or their dependents are subject to paying Fitrana. It is the responsibility of the head of the household to pay Fitrana on behalf of himself and dependents. Remember that if a baby is born just before the Eid prayer, you must pay Fitrana for the newborn as well.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What is the Best Time to Pay Fitrana?</h2>
              <p>As it is a religious obligation to pay Fitrana, everyone must be aware of its rules and regulations. It is said that Fitrana must be paid before the Eid al-Fitr prayer. In Pakistan, it is expected that Eid al-Fitr will take place on either Thursday, 19th March or Friday, 20th March 2026, depending on the moon sighting. However, you must be aware of the exact Eid al-Fitr date in your region and pay Fitrana accordingly.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">How Much is Fitrana in 2026?</h2>
              <p>The amount of Fitrana is decided based on the items we consume on a daily basis. Below is the list of eatables along with their decided Fitrana amount per person.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Wheat Flour", amount: "300" },
                  { name: "Barley", amount: "1550" },
                  { name: "Dates", amount: "2100" },
                  { name: "Raisins", amount: "4550" },
                  { name: "Ajwa", amount: "3540" }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-sundas-blue/5 rounded-2xl border border-sundas-blue/10 flex flex-col items-center">
                    <span className="text-xs font-black text-sundas-red uppercase tracking-widest mb-2">{item.name}</span>
                    <span className="text-3xl font-display font-bold text-sundas-blue">Rs. {item.amount}</span>
                    <span className="text-xs opacity-60 mt-1">Per Head</span>
                  </div>
                ))}
              </div>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">The Importance of Paying Fitrana in Ramadan?</h2>
              <p>Any act of charity, whether it is obligatory or voluntary, comes with extraordinary benefits:</p>
              <div className="space-y-4">
                <p><strong>a) It purifies the wealth and soul of givers:</strong> Paying Fitrana is a way to purify your wealth and soul. It is considered that this act of charity becomes a way for you to get Allah’s forgiveness if you have made any mistakes during Ramadan.</p>
                <p><strong>b) It helps create a strong community:</strong> Paying Fitrana can help us build a strong community and bond. For example, it is necessary to offer Fitrana to your relatives first. It will surely create strong bonds and relationships with your relatives.</p>
              </div>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Fitrana vs. Fidya vs. Kaffarah vs. Zakat</h2>
              <div className="overflow-x-auto rounded-3xl border border-sundas-blue/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-sundas-blue text-white">
                      <th className="p-4 border border-white/10 uppercase text-xs font-black">Feature</th>
                      <th className="p-4 border border-white/10 uppercase text-xs font-black">Fitrana</th>
                      <th className="p-4 border border-white/10 uppercase text-xs font-black">Fidya</th>
                      <th className="p-4 border border-white/10 uppercase text-xs font-black">Kaffarah</th>
                      <th className="p-4 border border-white/10 uppercase text-xs font-black">Zakat</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="p-4 border border-sundas-blue/10 font-bold">Category</td>
                      <td className="p-4 border border-sundas-blue/10">Obligatory charity</td>
                      <td className="p-4 border border-sundas-blue/10">Obligatory charity</td>
                      <td className="p-4 border border-sundas-blue/10">Obligatory charity</td>
                      <td className="p-4 border border-sundas-blue/10">Obligatory charity</td>
                    </tr>
                    <tr className="bg-sundas-blue/5">
                      <td className="p-4 border border-sundas-blue/10 font-bold">Paid By</td>
                      <td className="p-4 border border-sundas-blue/10">Wealth {'>'} basic needs</td>
                      <td className="p-4 border border-sundas-blue/10">Missed fasts</td>
                      <td className="p-4 border border-sundas-blue/10">Broken fasts deliberately</td>
                      <td className="p-4 border border-sundas-blue/10">Wealth {'>'} Nisab</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-sundas-blue/10 font-bold">Time</td>
                      <td className="p-4 border border-sundas-blue/10">Before Eid</td>
                      <td className="p-4 border border-sundas-blue/10">Ramadan/Afterward</td>
                      <td className="p-4 border border-sundas-blue/10">Ramadan/Afterward</td>
                      <td className="p-4 border border-sundas-blue/10">Anytime (Lunar)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-sundas-blue text-white p-10 rounded-3xl text-center shadow-xl">
                 <h2 className="text-3xl font-display font-bold mb-6 italic">"Give Your Donations to Sundas Foundation This Ramadan!"</h2>
                 <p className="text-lg opacity-90 mb-8">Do you want to pay Fitrana, Fidya, Kaffarah, and other donations in Ramadan? Give them to the Sundas Foundation. Your donations are used to manage the blood supply, medicines, and other equipment to support patients suffering from Thalassemia, Hemophilia, and other blood disorders.</p>
                 <button className="bg-sundas-red px-10 py-4 rounded-full font-bold hover:bg-white hover:text-sundas-blue transition-all">Donate Now</button>
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">What is the difference between Fitrana and Fidya?</h4>
                    <p className="opacity-80">Fitrana is for Muslims with excess wealth/food. Fidya is compensation for missing fasts during Ramadan.</p>
                  </div>
                  <div className="border-b border-sundas-blue/10 pb-4">
                    <h4 className="font-bold text-sundas-blue">What if I forgot to pay Fitrana?</h4>
                    <p className="opacity-80">Pay it once you remember. After Eid prayer, it counts as Sadaqah, not obligatory Fitrana.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedBlog === 'laylatul-qadr-2026') {
    return (
      <div className="bg-white min-h-screen font-sans">
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <button 
              onClick={() => setSelectedBlog(null)}
              className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
            >
              <ArrowRight className="rotate-180" size={20} /> Back to Blog
            </button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://www.akramaid.org/wp-content/uploads/2026/01/AA-Laylatul-Qadr-night-Web-mobile.webp" 
                alt="Laylatul Qadr 2026" 
                className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
              Laylatul Qadr - <span className="text-sundas-red">The Night of Power</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-8 leading-relaxed text-justify">
              <p>Laylatul Qadr, also known as the night of decree or the night of power, appears on one of the odd nights in the last Ashra of Ramadan. A single good act on this night is measured as the acts of thousands of months.</p>

              <p>Muslims from across the world offer prayers and do good on this night to draw Allah’s closeness and forgiveness. This article highlights what the Laylatul Qadr is, its signs and significance.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What is Laylatul Qadr?</h2>
              <p>Laylatul Qadr is a night in which the Holy Quran was first revealed completely on Prophet Muhammad (Peace Be Upon Him). Allah (SWT) explains its importance: <span className="italic">"The Night of Glory is better than a thousand months."</span></p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">Signs of Layatul Qadr?</h2>
              <div className="bg-sundas-blue/5 p-8 rounded-3xl space-y-4">
                <p><strong>The Sun without Rays:</strong> On the morning following Laylatul Qadr, the sun rises without rays, like a brass dish.</p>
                <p><strong>Calm and Pleasant:</strong> The night is calm, neither hot nor cold, with a feeble and red morning sun.</p>
                <p><strong>Tranquility:</strong> A specialized sense of moderate temperature and peace in the atmosphere.</p>
              </div>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">When is Laylatul Qadr 2026?</h2>
              <p>Find Laylatul Qadr in the odd nights of the last Ashra. Estimated odd nights for 2026:</p>
              <ul className="list-disc pl-6 grid grid-cols-2 gap-2 font-bold text-sundas-red">
                <li>9th March (21st)</li>
                <li>11th March (23rd)</li>
                <li>13th March (25th)</li>
                <li>15th March (27th)</li>
                <li>17th March (29th)</li>
              </ul>
              <p>Many treat the <strong>27th night (15th March)</strong> as the primary focus in congregations.</p>

              <h2 className="text-3xl font-display font-bold text-sundas-blue pt-4">What to do on Laylatul Qadr?</h2>
              <div className="bg-white border-2 border-sundas-blue/10 p-8 rounded-3xl space-y-4 shadow-sm">
                {[
                  { t: "Vacation for Allah", d: "Purely focus on worship, avoiding worldly responsibilities." },
                  { t: "Itikaf", d: "Engage in isolation at Masjid or home to draw closer to Allah." },
                  { t: "Special Dua", d: "Allahumma innaka `afuwwun tuhibbul `afwa fa`fu `annee." },
                  { t: "Recite Quran", d: "Preferably with translation for better understanding." },
                  { t: "Night Prayers", d: "Attend Traweeh, Nawafil, and Khatam al Quran duas." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 border-b border-sundas-blue/5 pb-4 last:border-0 last:pb-0">
                    <span className="flex-shrink-0 w-8 h-8 bg-sundas-blue text-white flex items-center justify-center rounded-lg font-bold text-sm">{i + 1}</span>
                    <div>
                      <h4 className="font-bold text-sundas-blue">{step.t}</h4>
                      <p className="text-sm opacity-80">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-sundas-red text-white p-10 rounded-3xl text-center shadow-xl">
                 <h2 className="text-3xl font-display font-bold mb-6 italic">"Give Your Donations on Laylatul Qadr"</h2>
                 <p className="text-lg opacity-90 mb-8">Doing good deeds on this night comes with multiple rewards. Give your donations to Sundas Foundation on Laylatul Qadr to treat poor patients suffering from Thalassemia, Hemophilia, and other blood disorders.</p>
                 <button className="bg-white text-sundas-red px-10 py-4 rounded-full font-bold hover:bg-sundas-blue hover:text-white transition-all">Donate Now</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const items = subPage === 'Blog' ? [
    {
      id: 'hajj-2026',
      title: 'When is Hajj 2026? Arafah Day, Eid al-Adha 2026 Dates',
      description: 'Hajj is one of the five pillars of Islam. Performing Hajj is compulsory for every eligible Muslim at least once in their lifetime.',
      img: 'https://t3.ftcdn.net/jpg/08/25/18/44/360_F_825184434_EmMHOJQ4wVSbZw4NhqmQkLMCxelxlzsJ.jpg',
      date: '2026 Archive'
    },
    {
      id: 'eid-ul-adha-2026',
      title: 'Eid Ul-Adha 2026 - Date, Importance, and Holidays',
      description: 'Eid ul Adha is one of the major Islamic festivals celebrated by Muslims across the world.',
      img: 'https://cdn1.wionews.com/prod/wion/images/2025/20250606/image-1749225002177.jpg?rect=(1,0,405,304)&imwidth=800&imheight=600&format=webp&quality=medium',
      date: '2026 Archive'
    },
    {
      id: 'itikaf-ramadan',
      title: 'Itikaf in Ramadan - Everything You Need to Know',
      description: 'Itikaf is a form of worship Muslims perform in the last Ashrah of Ramadan.',
      img: 'https://www.islamandihsan.com/uploads/2021/09/itikaf.jpg',
      date: '2026 Archive'
    },
    {
      id: 'eid-al-fitr-2026',
      title: 'Eid al Fitr 2026 - How to Celebrate it?',
      description: 'Eid al-Fitr is a celebration that marks the end of Ramadan, celebrated on the 1st of Shawal.',
      img: 'https://d34vm3j4h7f97z.cloudfront.net/original/4X/1/0/e/10edc692398b345ea4bd47397002bcb7a4699593.jpeg',
      date: '2026 Archive'
    },
    {
      id: 'fitrana-2026',
      title: 'Fitrana in Ramadan 2026',
      description: 'Fitrana is an obligatory form of charity that needs to be paid by every eligible Muslim in Ramadan.',
      img: 'https://shop.donatedirectly.com/cdn/shop/files/1_Pay_Your_Fitrana_-_Thumbnails_-_Ramadan_2026_-_Website_-_Donate_Directly_103f9593-d1c9-4d03-bdb2-71c52c422cdb.jpg?v=1772469187&width=1920',
      date: '2026 Archive'
    },
    {
      id: 'laylatul-qadr-2026',
      title: 'Laylatul Qadr - The Night of Power',
      description: 'Laylatul Qadr appears on one of the odd nights in the last Ashra of Ramadan.',
      img: 'https://www.akramaid.org/wp-content/uploads/2026/01/AA-Laylatul-Qadr-night-Web-mobile.webp',
      date: '2026 Archive'
    }
  ] : subPage === 'Certificates' ? [] : subPage === 'Events' ? [
    {
      id: 'nawaz-sharif-birthday',
      title: 'Provincial Education Minister Rana Sikandar Hayat Khan Celebrates Nawaz Sharif’s Birthday with Thalassemia and Hemophilia Patients at Sundas Foundation',
      description: 'Provincial Education Minister Rana Sikandar Hayat Khan visited Sundas Foundation Lahore and celebrated the birthday of PML-N President Muhammad Nawaz Sharif with thalassemia and hemophilia patients...',
      img: 'https://sundas.org/Images/NewsandEvents/Events/26-Dec-2025_01-52-04_605150152_1293209289507958_3706831559144245765_n.jpg',
      date: '12/25/2025'
    },
    {
      id: 'governor-kpk-visit',
      title: 'Governor Khyber Pakhtunkhwa Faisal Karim Kundi Visits Sundas Foundation Lahore',
      description: 'Governor of Khyber Pakhtunkhwa Faisal Karim Kundi, visited Sundas Foundation Lahore, where he reviewed medical facilities...',
      img: 'https://sundas.org/Images/NewsandEvents/Events/19-Dec-2025_21-18-32_WhatsApp%20Image%202025-12-20%20at%2010.17.29%20AM.jpeg',
      date: '12/19/2025'
    },
    {
      id: 'advisor-punjab-visit',
      title: 'Advisor to the Chief Minister Punjab for Zakat & Ushr Rashid Iqbal Nasrullah Visits Sundas Foundation',
      description: 'Advisor to the Chief Minister Punjab for Zakat & Ushr Rashid Iqbal Nasrullah visited Sundas Foundation Lahore...',
      img: 'https://sundas.org/Images/NewsandEvents/Events/19-Nov-2025_04-41-17_WhatsApp%20Image%202025-11-19%20at%203.30.23%20PM.jpeg',
      date: '11/19/2025'
    },
    {
      id: 'resham-nimra-visit',
      title: 'Film Star Resham and Singer Nimra Mehra Visit Sundas Foundation to Support Children Battling Blood Disorders',
      description: 'Renowned film star Resham and singer Nimra Mehra visited Sundas Foundation where they met children suffering from thalassemia and hemophilia...',
      img: 'https://sundas.org/Images/NewsandEvents/Events/03-Nov-2025_03-45-05_WhatsApp%20Image%202025-11-03%20at%2012.42.10%20PM.jpeg',
      date: '11/03/2025'
    },
    {
      id: 'khawaja-imran-visit',
      title: 'Punjab Health Minister Khawaja Imran Nazir Celebrates CM Maryam Nawaz Sharif’s Birthday with Thalassemia and Hemophilia Patients at Sundas Foundation',
      description: 'Punjab Health Minister Khawaja Imran Nazir Celebrates CM Maryam Nawaz Sharif’s Birthday with Thalassemia and Hemophilia Patients...',
      img: 'https://sundas.org/Images/NewsandEvents/Events/28-Oct-2025_23-26-47_571347790_1246929037469317_5390816052461761227_n.jpg',
      date: '10/28/2025'
    },
    {
      id: 'salma-butt-visit',
      title: 'Special Assistant to CM Punjab Salma Butt Visits Sundas Foundation Lahore',
      description: 'Chairperson of CM’s Task Force on Price Control Ms. Salma Butt visited Sundas Foundation Lahore met children receiving treatment for thalassemia and hemophilia...',
      img: 'https://sundas.org/Images/NewsandEvents/Events/23-Oct-2025_00-44-34_WhatsApp%20Image%202025-10-23%20at%2012.29.40%20PM%20(1).jpeg',
      date: '10/23/2025'
    },
    {
      id: 'university-lahore-camp',
      title: 'Sundas Foundation Organizes Successful Blood Donation Camp at University of Lahore',
      description: 'Sundas Foundation in collaboration with the University of Lahore organized a successful blood donation camp to support thalassemia and hemophilia patients...',
      img: 'https://sundas.org/Images/NewsandEvents/Events/16-Oct-2025_00-05-19_DSC03914.JPG',
      date: '10/15/2025'
    }
  ]
  : [1, 2, 3, 4, 5, 6].map(i => ({ id: i }));

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600&auto=format&fit=crop" 
          alt="Sundas Media Center" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
           
        <div className="absolute inset-0 bg-sundas-blue/80 flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
                <motion.div
                  key={subPage || 'media'}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                      {subPage ? (
                        <>
                          {subPage.split(' ')[0]} <span className="text-sundas-red">{subPage.split(' ').slice(1).join(' ') || ''}</span>
                        </>
                      ) : (
                        <>
                          Media <span className="text-sundas-red">Center</span>
                        </>
                      )}
                  </h1>
                  <div className="w-24 h-2 bg-sundas-red mx-auto mt-4 rounded-full shadow-lg shadow-sundas-red/40"></div>
                  <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
                      {subPage ? `Latest updates and information regarding ${subPage.toLowerCase()} activities.` : "Stay updated with our latest news, events, and meaningful stories."}
                  </p>
                </motion.div>
            </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sundas-blue font-bold mb-12 hover:gap-4 transition-all"
        >
          <ArrowRight className="rotate-180" size={20} /> Back to Home
        </button>

        <motion.div
          key={subPage || 'media-content'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-10"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-sundas-blue mb-6">
              {subPage ? `Our ${subPage}` : "Sundas News & Updates"}
            </h2>
            <p className="text-xl text-sundas-blue/60 max-w-3xl mx-auto">
              {subPage 
                ? `Explore our documented ${subPage.toLowerCase()} highlighting the impact of your support and our core activities.`
                : "Explore our media gallery and news reports covering the foundation's journey from 1998 to present."}
            </p>
          </div>

          <div className={`${items.length > 0 ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col items-center justify-center py-20 bg-sundas-blue/5 rounded-3xl border border-dashed border-sundas-blue/20'}`}>
            {items.length > 0 ? items.map((item: any, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => ['hajj-2026', 'eid-ul-adha-2026', 'itikaf-ramadan', 'eid-al-fitr-2026', 'fitrana-2026', 'laylatul-qadr-2026', 'nawaz-sharif-birthday', 'governor-kpk-visit', 'advisor-punjab-visit', 'resham-nimra-visit', 'khawaja-imran-visit', 'salma-butt-visit', 'university-lahore-camp'].includes(item.id) && setSelectedBlog(item.id)}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-sundas-blue/5 hover:shadow-2xl transition-all duration-500 ${['hajj-2026', 'eid-ul-adha-2026', 'itikaf-ramadan', 'eid-al-fitr-2026', 'fitrana-2026', 'laylatul-qadr-2026', 'nawaz-sharif-birthday', 'governor-kpk-visit', 'advisor-punjab-visit', 'resham-nimra-visit', 'khawaja-imran-visit', 'salma-butt-visit', 'university-lahore-camp'].includes(item.id) ? 'cursor-pointer' : ''}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.img || `https://picsum.photos/seed/${subPage || 'media'}${item.id}/800/600`}
                    alt="Media Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-sundas-red uppercase tracking-widest mb-3">
                    <Activity size={14} /> {item.date || '2026 Archive'}
                  </div>
                  <h4 className="text-xl font-bold text-sundas-blue mb-3 group-hover:text-sundas-red transition-colors">
                    {item.title || (subPage ? `${subPage} Item #${item.id}` : `Media Update #${item.id}`)}
                  </h4>
                  <p className="text-sm text-sundas-blue/60 line-clamp-2">
                    {item.description || `A brief description of this ${subPage?.toLowerCase() || 'news'} item highlighting the core event or update.`}
                  </p>
                  {['hajj-2026', 'eid-ul-adha-2026', 'itikaf-ramadan', 'eid-al-fitr-2026', 'fitrana-2026', 'laylatul-qadr-2026', 'nawaz-sharif-birthday', 'governor-kpk-visit', 'advisor-punjab-visit', 'resham-nimra-visit', 'khawaja-imran-visit', 'salma-butt-visit', 'university-lahore-camp'].includes(item.id) && (
                    <div className="mt-4 flex items-center gap-2 text-sundas-red font-bold text-sm">
                      Read Full {subPage === 'Events' ? 'Report' : 'Article'} <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              </motion.div>
            )) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-sundas-blue/10">
                   <Activity className="text-sundas-blue/20" size={40} />
                </div>
                <h3 className="text-2xl font-display font-bold text-sundas-blue mb-2">No Certificates Found</h3>
                <p className="text-sundas-blue/50">There are currently no certificates to display in this section.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <section className="py-24 bg-sundas-blue/5 border-y border-sundas-blue/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="w-16 h-16 bg-sundas-red text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                <Mail size={32} />
            </div>
            <h3 className="text-3xl font-display font-bold text-sundas-blue mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-lg text-sundas-blue/70 mb-10">Get the latest news and event updates delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input type="email" placeholder="Your email address" className="flex-1 px-6 py-4 rounded-full border border-sundas-blue/20 outline-none focus:border-sundas-red focus:ring-4 focus:ring-sundas-red/10 transition-all font-medium" />
                <button className="bg-sundas-red text-white px-8 py-4 rounded-full font-bold hover:bg-sundas-blue transition-all shadow-lg hover:shadow-sundas-blue/20">Subscribe</button>
            </div>
        </div>
      </section>
    </div>
  );
};

const CausesPage = ({ onBack, onLearnMore }: { onBack: () => void, onLearnMore: (id: string) => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img 
          src="https://sundas.org/images/gallery_3.jpg" 
          alt="Our Causes" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
           
        <div className="absolute inset-0 bg-gray-950/70 flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                      Our <span className="text-sundas-red">Causes</span>
                  </h1>
                  <div className="w-24 h-2 bg-sundas-red mx-auto mt-4 rounded-full shadow-lg shadow-sundas-red/40"></div>
                  <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl mx-auto font-medium leading-relaxed">
                      Explore the critical healthcare areas where your support transforms lives every day.
                  </p>
                </motion.div>
            </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sundas-blue font-bold mb-8 hover:gap-4 transition-all"
        >
          <ArrowRight className="rotate-180" size={20} /> Back to Home
        </button>
      </div>

      <Causes onLearnMore={onLearnMore} />

      <section className="py-24 bg-sundas-red text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
            Every Donation Counts
          </h2>
          <p className="text-xl opacity-90 mb-10">
            Join thousands of donors in providing safe blood and medical care to those who need it most.
          </p>
          <button 
             onClick={onBack}
             className="bg-white text-sundas-red px-12 py-4 rounded-full font-bold text-lg hover:bg-sundas-blue hover:text-white transition-all shadow-xl"
          >
            Start Your Contribution Today
          </button>
        </div>
      </section>
    </div>
  );
};

const CentersPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const centers = [
    {
      city: 'Lahore (Head Office)',
      address: '880 Shadman-1, Near Crescent Girls School, Lahore.',
      phone: '+92 42 111-786-327',
      email: 'info@sundas.org',
      image: 'https://walledcitylahore.gop.pk/wp-content/uploads/2024/06/Lahore-fort-main-gate-scaled.jpeg'
    },
    {
      city: 'Gujranwala',
      address: 'G.T. Road, Near General Bus Stand, Gujranwala.',
      phone: '+92 55 3843555',
      email: 'gujranwala@sundas.org',
      image: 'https://crystalpakistan.com/wp-content/uploads/2024/07/Gujranwala.webp'
    },
    {
      city: 'Sialkot',
      address: 'Near Khawaja Safdar Medical College, Sialkot.',
      phone: '+92 52 4589255',
      email: 'sialkot@sundas.org',
      image: 'https://handicrafts.punjab.gov.pk/public/uploads/all/6gn4DaS88udzwGHDHhpX7W70F08jrxrGpYh5ugRR.jpg'
    },
    {
      city: 'Faisalabad',
      address: 'Jail Road, Opposite District Courts, Faisalabad.',
      phone: '+92 41 2622744',
      email: 'faisalabad@sundas.org',
      image: 'https://i.ytimg.com/vi/ID5B8vpojbs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBgsHcUIXGD7xt0LtYKd4bolJZkJw'
    },
    {
      city: 'Gujrat',
      address: 'Bhimbher Road, Near Fawara Chowk, Gujrat.',
      phone: '+92 53 3524255',
      email: 'gujrat@sundas.org',
      image: 'https://i.ytimg.com/vi/83UFTZGK2_c/sddefault.jpg'
    },
    {
      city: 'Islamabad',
      address: 'Plot # 22, G-8/4, Islamabad.',
      phone: '+92 51 2252555',
      email: 'islamabad@sundas.org',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/3a/f7/e7/faisal-mosque-in-islamabad.jpg?w=600&h=-1&s=1'
    },
    {
      city: 'Multan',
      address: 'Near Children Complex, Multan.',
      phone: '+92 61 4545222',
      email: 'multan@sundas.org',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Shrine_Shah_Rukn-e-Alam.jpg'
    },
    {
      city: 'Mirpur (AJK)',
      address: 'Industrial Area, Mirpur, Azad Kashmir.',
      phone: '+92 5827 433333',
      email: 'mirpur@sundas.org',
      image: 'https://www.amflbd.com/upload/location/1777281164483802.jpg'
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img 
          src="https://sundas.org/images/gallery_5.jpg" 
          alt="Our Centers" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase tracking-tight">
                      Our <span className="text-sundas-red">Centers</span>
                  </h1>
                  <div className="w-24 h-2 bg-sundas-red mx-auto mt-4 rounded-full"></div>
                  <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-2xl mx-auto font-medium">
                      Providing high-standard treatment & blood donation services across Pakistan.
                  </p>
                </motion.div>
            </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sundas-blue font-bold mb-12 hover:gap-4 transition-all"
        >
          <ArrowRight className="rotate-180" size={20} /> Back to Home
        </button>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {centers.map((center, index) => (
            <motion.div
              key={center.city}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-sundas-blue/5 group hover:shadow-2xl transition-all duration-500"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={center.image} 
                  alt={center.city} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sundas-blue/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{center.city}</h3>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-sundas-red/10 p-2 rounded-lg text-sundas-red shrink-0">
                    <MapPin size={18} />
                  </div>
                  <p className="text-sundas-blue/70 text-sm leading-relaxed">{center.address}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-sundas-red/10 p-2 rounded-lg text-sundas-red shrink-0">
                    <Phone size={18} />
                  </div>
                  <p className="text-sundas-blue/70 text-sm">{center.phone}</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-sundas-red/10 p-2 rounded-lg text-sundas-red shrink-0">
                    <Mail size={18} />
                  </div>
                  <p className="text-sundas-blue/70 text-sm">{center.email}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans pt-20">
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop" 
          alt="Contact Us" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-sundas-blue/80 flex items-center justify-center text-center">
            <div className="container mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tight">
                      Contact <span className="text-sundas-red">Us</span>
                  </h1>
                  <div className="w-24 h-2 bg-sundas-red mx-auto mt-4 rounded-full shadow-lg shadow-sundas-red/40"></div>
                </motion.div>
            </div>
        </div>
      </section>

      <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
              <button 
                onClick={onBack}
                className="flex items-center gap-2 text-sundas-blue font-bold mb-12 hover:gap-4 transition-all"
              >
                <ArrowRight className="rotate-180" size={20} /> Back to Home
              </button>
              
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                  
                  <div className="space-y-8 text-left">
                      <div>
                          <h2 className="text-4xl font-bold text-sundas-blue">Get In <span className="text-sundas-red">Touch</span></h2>
                          <div className="w-20 h-1.5 bg-sundas-red mt-4 rounded-full"></div>
                          <p className="text-sundas-blue/70 mt-6 text-lg">
                              Hamari team 24/7 aapki madad ke liye maujood hai. Blood donation ya kisi bhi maloomat ke liye niche diye gaye tareeqon se raabta karein.
                          </p>
                      </div>

                      <div className="space-y-6">
                          <div className="flex items-start">
                              <div className="bg-sundas-red/10 p-4 rounded-2xl text-sundas-red mr-5">
                                  <MapPin size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold text-sundas-blue">Main Office Address</h4>
                                  <p className="text-sundas-blue/60">880 Shadman-1, Near Crescent Girls School, Lahore, Pakistan.</p>
                              </div>
                          </div>

                          <div className="flex items-start">
                              <div className="bg-sundas-red/10 p-4 rounded-2xl text-sundas-red mr-5">
                                  <Phone size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold text-sundas-blue">Phone & UAN</h4>
                                  <p className="text-sundas-blue/60">UAN: +92 42 111-786-327</p>
                                  <p className="text-sundas-blue/60">Tel: (+92) 423 7422 131</p>
                              </div>
                          </div>

                          <div className="flex items-start">
                              <div className="bg-sundas-red/10 p-4 rounded-2xl text-sundas-red mr-5">
                                  <Mail size={24} />
                              </div>
                              <div>
                                  <h4 className="text-xl font-bold text-sundas-blue">Email Address</h4>
                                  <p className="text-sundas-blue/60">info@sundas.org</p>
                              </div>
                          </div>
                      </div>

                      <div className="rounded-3xl overflow-hidden shadow-2xl h-64 border border-sundas-blue/10 relative">
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.3225219213!2d74.32986831514838!3d31.543232981362624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904b73b22e705%3A0xc6c7d9a1059f13c3!2sSundas%20Foundation!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen={true} 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Sundas Foundation Location"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                          ></iframe>
                      </div>
                  </div>

                  <div className="bg-sundas-blue/5 p-8 md:p-12 rounded-3xl shadow-xl border border-sundas-blue/10 text-left">
                      <h3 className="text-2xl font-bold text-sundas-blue mb-8 text-center">Send Us a Message</h3>
                      <form action="#" className="space-y-5">
                          <div className="grid md:grid-cols-2 gap-5">
                              <div className="space-y-2 text-left">
                                  <label className="text-sm font-bold text-sundas-blue/70 ml-1">Full Name</label>
                                  <input type="text" placeholder="Ahmad Ali" className="w-full bg-white border border-sundas-blue/20 p-4 rounded-xl outline-none focus:border-sundas-red focus:ring-2 focus:ring-sundas-red/10 transition" />
                              </div>
                              <div className="space-y-2 text-left">
                                  <label className="text-sm font-bold text-sundas-blue/70 ml-1">Email</label>
                                  <input type="email" placeholder="example@mail.com" className="w-full bg-white border border-sundas-blue/20 p-4 rounded-xl outline-none focus:border-sundas-red focus:ring-2 focus:ring-sundas-red/10 transition" />
                              </div>
                          </div>

                          <div className="space-y-2 text-left">
                              <label className="text-sm font-bold text-sundas-blue/70 ml-1">Subject</label>
                              <select className="w-full bg-white border border-sundas-blue/20 p-4 rounded-xl outline-none focus:border-sundas-red focus:ring-2 focus:ring-sundas-red/10 transition appearance-none cursor-pointer">
                                  <option>Blood Donation Inquiry</option>
                                  <option>Zakat/Donation Help</option>
                                  <option>Volunteer Registration</option>
                                  <option>General Message</option>
                              </select>
                          </div>

                          <div className="space-y-2 text-left">
                              <label className="text-sm font-bold text-sundas-blue/70 ml-1">Message</label>
                              <textarea rows={5} placeholder="Write your message here..." className="w-full bg-white border border-sundas-blue/20 p-4 rounded-xl outline-none focus:border-sundas-red focus:ring-2 focus:ring-sundas-red/10 transition"></textarea>
                          </div>

                          <button type="submit" className="w-full bg-sundas-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-sundas-red/90 transform hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                              Send Message <ArrowRight size={20} />
                          </button>
                      </form>
                  </div>

              </div>
          </div>
      </section>
    </div>
  );
};

const Hero = ({ onDonate }: { onDonate: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://sundas.org/images/gallery_4.jpg",
    "https://sundas.org/Images/NewsandEvents/Events/26-Dec-2025_01-52-04_605150152_1293209289507958_3706831559144245765_n.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence>
        <motion.div 
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${images[currentImageIndex]}")` }}
        />
      </AnimatePresence>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white transform translate-y-24 md:translate-y-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold mb-6 tracking-wide uppercase">
            ESTABLISHED SINCE 1998
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-8 leading-tight tracking-tight glow-text-red">
            Your Little <span className="text-white/80 italic glow-text-blue">Donation</span> Can Make a Big Difference
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
            Providing Free Treatment to Thalassemia & Hemophilia Patients across Pakistan. Join our mission to serve humanity.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('causes');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-white text-sundas-blue px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-sundas-blue/5 transition-all flex items-center justify-center gap-2"
            >
              Explore Causes <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(203,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onDonate}
              className="w-full sm:w-auto border-2 border-white/30 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-sundas-blue transition-all glow-red"
            >
              Donate Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Centers', value: '12+', color: 'text-sundas-red' },
    { label: 'Active Donors', value: '25k+', color: 'text-sundas-blue' },
    { label: 'Transfusions', value: '100k+', color: 'text-sundas-red' },
    { label: 'Support', value: '24/7', color: 'text-sundas-blue' },
  ];

  // Duplicate stats for infinite scroll effect
  const duplicatedStats = [...stats, ...stats, ...stats];

  return (
    <section className="py-20 bg-white border-b border-sundas-blue/10 overflow-hidden">
      <div className="relative flex">
        <motion.div 
          animate={{ x: [0, "-33.333%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex whitespace-nowrap"
        >
          {duplicatedStats.map((stat, index) => (
            <div 
              key={`${stat.label}-${index}`}
              className="flex-shrink-0 w-[300px] md:w-[400px] text-center px-10"
            >
              <h3 className={`text-5xl md:text-7xl font-display font-extrabold mb-2 ${stat.color}`}>
                <Counter value={stat.value} />
              </h3>
              <p className="text-sundas-blue/60 font-medium uppercase tracking-widest text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Causes = ({ onLearnMore }: { onLearnMore: (cause: string) => void }) => {
  const causes = [
    {
      id: 'thalassemia',
      title: 'Thalassemia',
      description: 'Thalassemia is a genetic blood disorder that affects the body’s ability to produce healthy hemoglobin—the protein in red blood cells that carries oxygen to every part of the body.',
      img: 'https://sundas.org/images/cause_1.jpg',
      icon: <Droplets className="text-white" size={24} />,
      border: 'border-sundas-blue',
      bg: 'hover:bg-sundas-blue/5'
    },
    {
      id: 'hemophilia',
      title: 'Hemophilia',
      description: "Hemophilia is a rare genetic disorder that affects the blood's clotting ability. Patients with hemophilia experience prolonged bleeding due to the lack of specific clotting factors.",
      img: 'https://sundas.org/images/cause_2.jpg',
      icon: <HeartHandshake className="text-white" size={24} />,
      border: 'border-sundas-red',
      bg: 'hover:bg-sundas-red/5'
    },
    {
      id: 'other-blood-disorders',
      title: 'Other Blood Disorders',
      description: "Blood disorders include a wide range of conditions that affect the blood's ability to function properly, impacting red blood cells, white blood cells, platelets, or plasma.",
      img: 'https://sundas.org/images/cause_3.jpg',
      icon: <Hospital className="text-white" size={24} />,
      border: 'border-sundas-blue',
      bg: 'hover:bg-sundas-blue/5'
    }
  ];

  return (
    <section id="causes" className="py-32 bg-sundas-blue/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-6"
          >
            Our Primary <span className="text-sundas-red">Causes</span>
          </motion.h2>
          <p className="text-sundas-blue/70 max-w-2xl mx-auto text-lg">
            We are dedicated to providing comprehensive care and support to those in need, ensuring no one fights alone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {causes.map((cause, index) => (
            <motion.div 
              key={cause.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ 
                y: -10, 
                boxShadow: cause.id === 'hemophilia' ? "0 20px 40px rgba(203,0,0,0.15)" : "0 20px 40px rgba(0,74,173,0.15)"
              }}
              className={`bg-white rounded-3xl overflow-hidden shadow-xl shadow-sundas-blue/10 border-b-8 ${cause.border} transition-all duration-500 group cursor-default h-full flex flex-col`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={cause.img} 
                  alt={cause.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 left-4 p-3 rounded-2xl backdrop-blur-md shadow-lg ${cause.id === 'hemophilia' ? 'bg-sundas-red/90' : 'bg-sundas-blue/90'}`}>
                  {cause.icon}
                </div>
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <h3 className="text-2xl font-display font-bold mb-4 text-sundas-blue">{cause.title}</h3>
                <p className="text-sundas-blue/70 leading-relaxed mb-8 flex-grow">
                  {cause.description}
                </p>
                <button 
                  onClick={() => onLearnMore(cause.id)}
                  className="flex items-center gap-2 text-sundas-blue font-bold group-hover:gap-4 transition-all"
                >
                  Learn More <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl md:text-5xl font-display font-bold text-sundas-blue mb-4 glow-text-blue">
            Sundas Foundation Archives
          </h3>
          <p className="text-xl md:text-2xl text-sundas-blue/70 font-light italic">
            Spread happiness on innocent faces with your donations.
          </p>
          <div className="mt-8 h-1 w-24 bg-sundas-red mx-auto rounded-full glow-red"></div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "https://sundas.org/Images/NewsandEvents/Events/15-Mar-2025_02-29-46_Secretary%20Health%20Balochistan%20Visits%20Sundas%20Foundation%20Lahore.jpg",
            "https://sundas.org/images/gallery_2.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOo7oCa9QMMCiGCtzndYRUDERBNjp6Gxb3Pw&s",
            "https://pbs.twimg.com/media/F2sviHXaQAAC3U5.jpg",
            "https://sundas.org/images/gallery_4.jpg"
          ].map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Archive ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-bold">Sundas Archive</p>
              </div>
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-all pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CauseDetail = ({ causeId, onBack }: { causeId: string, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (causeId === 'thalassemia') {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
          >
            <ArrowRight className="rotate-180" size={20} /> Back to Home
          </button>
          
          <img 
            src="https://sundas.org/images/cause_1.jpg" 
            alt="Thalassemia" 
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />
          
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8">Thalassemia</h1>
          
          <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-6 leading-relaxed text-justify">
            <p>Thalassemia is a genetic blood disorder that affects the body’s ability to produce healthy hemoglobin—the protein in red blood cells that carries oxygen to every part of the body. This condition is inherited, meaning it’s passed down through families when at least one parent carries the gene.</p>

            <p>Living with Thalassemia often means living with anemia, which can range from mild to severe depending on the type and severity of the disorder. For many people, managing this condition is a lifelong journey that requires regular medical care and frequent blood transfusions. At Sundas Foundation, we are deeply committed to supporting patients living with Thalassemia. We work tirelessly to raise awareness, provide life-saving blood transfusions, and deliver effective treatments to those who need them most. Through our efforts, we aim to not only ease their struggles but also bring hope and positivity to their lives.</p>
            
            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Types of thalassemia</h2>
            <p>There are two main types of thalassemia: alpha-thalassemia and beta-thalassemia, which are further classified into subtypes based on the severity of the disease:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Alpha-thalassemia:</strong> Includes silent carrier, alpha-thalassemia trait, hemoglobin H disease, and hydrops fetalis.</li>
              <li><strong>Beta-thalassemia:</strong> Includes beta-thalassemia minor, intermedia, and major (also known as Cooley's anemia).</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Alpha vs. Beta Thalassemia</h2>
            <p>Alpha vs. beta-thalassemia has the following differences between them:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-sundas-blue/10 mt-4">
                <thead>
                  <tr className="bg-sundas-blue/5">
                    <th className="border border-sundas-blue/10 p-4 text-left">Aspect</th>
                    <th className="border border-sundas-blue/10 p-4 text-left">Alpha Thalassemia</th>
                    <th className="border border-sundas-blue/10 p-4 text-left">Beta Thalassemia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-sundas-blue/10 p-4 font-bold">Cause</td>
                    <td className="border border-sundas-blue/10 p-4">Problems with one or more of the four genes that make alpha-globin</td>
                    <td className="border border-sundas-blue/10 p-4">Problems with one or both genes that make beta-globin</td>
                  </tr>
                  <tr>
                    <td className="border border-sundas-blue/10 p-4 font-bold">Severity</td>
                    <td className="border border-sundas-blue/10 p-4">Ranges from mild (silent carrier) to fatal (hydrops fetalis)</td>
                    <td className="border border-sundas-blue/10 p-4">Ranges from mild (minor) to severe (major)</td>
                  </tr>
                  <tr>
                    <td className="border border-sundas-blue/10 p-4 font-bold">Symptoms</td>
                    <td className="border border-sundas-blue/10 p-4">Fatigue, anemia, enlarged spleen, and bone deformities in severe cases</td>
                    <td className="border border-sundas-blue/10 p-4">Severe anemia, jaundice, bone deformities, and growth delays in major cases</td>
                  </tr>
                  <tr>
                    <td className="border border-sundas-blue/10 p-4 font-bold">Treatment</td>
                    <td className="border border-sundas-blue/10 p-4">Blood transfusions, Iron chelation, Supportive care</td>
                    <td className="border border-sundas-blue/10 p-4">Blood transfusions, Iron chelation, Bone marrow transplant in severe cases</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Signs & Symptoms</h2>
            <p>The signs and symptoms for thalassemia vary from patient to patient. Some babies start showing symptoms of thalassemia after childbirth while others develop the disease in the first 2-3 years.</p>
            <p>Some common symptoms noticed among thalassemia patients are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fatigue and weakness</li>
              <li>Pale or yellowish skin</li>
              <li>Shortness of breath</li>
              <li>Slow growth and delayed development</li>
              <li>Bone deformities, particularly in the face</li>
              <li>Enlarged spleen or liver</li>
              <li>Dark urine</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Thalassemia Causes</h2>
            <p>Thalassemia is caused by inherited mutations in the hemoglobin-producing genes. It is passed from parents to children in an autosomal recessive manner, meaning both parents must carry the gene for the child to inherit the condition.</p>
            <p>Hemoglobin is made up of two types of protein chains: alpha and beta. Mutations in the genes responsible for these chains lead to two main types of thalassemia: alpha-thalassemia and beta-thalassemia. The reduction in either alpha or beta chains disrupts the balance of hemoglobin production, leading to anemia and other complications associated with thalassemia.</p>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Diagnosis</h2>
            <p>Many children start showing symptoms in the early ages. If a child shows any of the symptoms discussed above, it is crucial to consult a doctor and get the following tests done as early as possible:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Complete blood count (CBC):</strong> To identify anemia and abnormalities in red blood cells.</li>
              <li><strong>Hemoglobin electrophoresis:</strong> To detect abnormal hemoglobin.</li>
              <li><strong>DNA testing:</strong> To confirm genetic mutations causing thalassemia.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Thalassemia Treatment</h2>
            <p>Mild forms of thalassemia trait don't need treatment. For moderate to severe thalassemia, treatments might include:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Frequent Blood Transfusions:</strong> Severe forms of thalassemia often require regular blood transfusions, sometimes as frequently as every few weeks. However, repeated transfusions can lead to iron buildup in the body, potentially damaging vital organs such as the heart and liver.</li>
              <li><strong>Chelation Therapy:</strong> This treatment helps remove excess iron from the blood caused by frequent transfusions or naturally occurring iron buildup. Medications used for chelation include:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li><strong>Deferasirox (Exjade, Jadenu) and Deferiprone (Ferriprox):</strong> These are oral medications that help reduce iron levels.</li>
                  <li><strong>Deferoxamine (Desferal):</strong> Administered via injection, this drug is another option for managing iron overload.</li>
                </ul>
              </li>
              <li><strong>Stem Cell Transplant:</strong> Also known as a bone marrow transplant, this treatment may be a viable option, especially for children with severe thalassemia. A successful stem cell transplant from a compatible donor (often a sibling) can eliminate the need for lifelong blood transfusions and iron control medications. This procedure involves replacing the defective stem cells with healthy ones to restore normal blood production.</li>
            </ul>
            <p>Sundas Foundation is the epitome of thalassemia treatment and diagnosis in Pakistan. We are dedicated to providing the best healthcare to those affected, no matter the challenges.</p>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Possible Complications</h2>
            <p>Sundas Foundation provides the best thalassemia treatment for those in need in Pakistan. But complications are a part of any recovery journey. If not managed properly, thalassemia can lead to complications such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Iron overload, affecting the heart, liver, and endocrine glands.</li>
              <li>Growth and developmental delays in children.</li>
              <li>Increased risk of infections due to spleen dysfunction.</li>
              <li>Bone deformities and fractures.</li>
              <li>Osteoporosis, thrombophilia and pseudoxanthoma elasticum.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (causeId === 'hemophilia') {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
          >
            <ArrowRight className="rotate-180" size={20} /> Back to Home
          </button>
          
          <img 
            src="https://sundas.org/images/cause_2.jpg" 
            alt="Hemophilia" 
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />
          
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8">Hemophilia</h1>
          
          <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-6 leading-relaxed text-justify">
            <p>Hemophilia is a rare genetic disorder that affects the blood's clotting ability. Patients with hemophilia experience prolonged bleeding due to the lack of specific clotting factors. If not managed properly, hemophilia can lead to severe health complications.</p>

            <p>At Sundas Foundation, our mission is to raise awareness and support to those affected by hemophilia in Pakistan. Our services include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Covering the costs of essential diagnostic tests to monitor and manage the condition.</li>
              <li>Providing life-saving medications, such as clotting factor replacement therapy.</li>
              <li>Offering additional support to patients’ families, helping them cope with the financial and emotional challenges of living with hemophilia.</li>
            </ul>
            <p>We go beyond treatment at Sundas Foundation by creating a strong support system that ensures better health and well-being for hemophilia patients and their families. Our goal is to improve their quality of life, enabling them to face each day with hope and confidence.</p>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Hemophilia Types</h2>
            <p>Hemophilia is classified into three types:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hemophilia A:</strong> Also known as classic hemophilia. It is caused by a deficiency in clotting factor VIII. It is the most common form of the disorder.</li>
              <li><strong>Hemophilia B:</strong> Also called Christmas disease. It is a result of a deficiency in clotting factor IX. It is less common than Hemophilia A.</li>
              <li><strong>Hemophilia C:</strong> This rarer form is caused by a deficiency in clotting factor XI and affects both males and females. It often leads to milder symptoms.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Hemophilia Causes</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Genetic mutations:</strong> Hemophilia is usually caused by changes in the genes on the X chromosome, which affect the production of clotting factors.</li>
              <li><strong>Gender differences:</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li><strong>Males:</strong> Since they have only one X chromosome, a single mutation can cause hemophilia.</li>
                  <li><strong>Females:</strong> They have two X chromosomes, so they are typically carriers unless mutations occur on both X chromosomes. Carriers may also show mild symptoms.</li>
                </ul>
              </li>
              <li><strong>Rare cases:</strong> Sometimes, hemophilia can develop later in life due to factors like:
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Autoimmune conditions</li>
                  <li>Certain medical issues that disrupt clotting factor production</li>
                </ul>
              </li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Signs & Symptoms</h2>
            <p>Hemophilia symptoms vary from patient to patient. Some common signs and symptoms of hemophilia are mentioned below:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prolonged bleeding from cuts or injuries</li>
              <li>Frequent nose bleeds</li>
              <li>Easy bruising</li>
              <li>Joint pain and swelling caused by internal bleeding</li>
              <li>Blood in urine or stool</li>
              <li>Excessive bleeding after surgeries or dental procedure</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Hemophilia Treatment</h2>
            <p>While there is no cure for hemophilia, it can be managed effectively through:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Replacement Therapy:</strong> Administering clotting factor concentrates to replace the missing or deficient factors.</li>
              <li><strong>Desmopressin (DDAVP):</strong> A synthetic hormone used for mild Hemophilia A to stimulate the release of stored factor VIII.</li>
              <li><strong>Antifibrinolytic Medications:</strong> Drugs that help prevent the breakdown of clots.</li>
              <li><strong>Gene Therapy:</strong> A promising experimental approach aimed at correcting the genetic mutation causing hemophilia.</li>
            </ul>
            <p>Sundas Foundation works closely with hemophilia patients and provides them quality treatment and better healthcare. Your donations help Sundas Foundation focus on hemophilia patients and their treatment without any financial barriers.</p>
          </div>
        </div>
      </div>
    );
  }

  if (causeId === 'other-blood-disorders') {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sundas-blue font-bold mb-10 hover:gap-4 transition-all"
          >
            <ArrowRight className="rotate-180" size={20} /> Back to Home
          </button>
          
          <img 
            src="https://sundas.org/images/cause_3.jpg" 
            alt="Other Blood Disorders" 
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />
          
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-sundas-blue mb-8">Other Blood Disorders</h1>
          
          <div className="prose prose-lg max-w-none text-sundas-blue/80 space-y-6 leading-relaxed text-justify">
            <p>Blood disorders include a wide range of conditions that affect the blood's ability to function properly. These disorders can impact red blood cells, white blood cells, platelets, or plasma which leads to various health challenges.</p>

            <p>At Sundas Foundation, we aim to raise awareness and provide treatments to those affected by blood disorders, helping them lead healthier lives.</p>
            
            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Common Blood Disorders</h2>
            <p>At Sundas Foundation, we are committed to improving the lives of individuals battling a wide range of rare and complex blood disorders. Our mission is to ensure that every patient has access to the care, treatment, and support they need. We provide treatments and facilitate donations for the following conditions:</p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Thalassemia:</strong> A genetic blood disorder requiring regular blood transfusions and medical care.</li>
              <li><strong>Hemophilia:</strong> A bleeding disorder where the blood doesn’t clot properly, often requiring clotting factor infusions.</li>
              <li><strong>Glanzmann’s Thrombasthenia & Bernard-Soulier Syndrome:</strong> Rare platelet disorders causing excessive bleeding, managed through specialized care.</li>
              <li><strong>Pure Red Cell Aplasia & Aplastic Anemia:</strong> Conditions affecting red blood cell production, treated with transfusions and medical therapies.</li>
              <li><strong>Chronic Dyserythropoietic Anemia (CDA):</strong> A rare form of anemia requiring targeted interventions.</li>
              <li><strong>Von Willebrand’s Disease:</strong> A genetic bleeding disorder treated with replacement therapies and medications.</li>
              <li><strong>Deficiencies in Factor I, V, VII, X, and XIII:</strong> Rare clotting disorders managed through factor replacement treatments.</li>
            </ul>
            <p>Sundas foundation stands as a light of hope, providing critical support, awareness, and resources for these conditions.</p>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Signs & Symptoms of Blood Disorders</h2>
            <p>Every blood disorder symptom varies. Some common symptoms of blood disorders are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fatigue and weakness</li>
              <li>Shortness of breath</li>
              <li>Unexplained bruising or bleeding</li>
              <li>Frequent infections</li>
              <li>Pale or yellowish skin</li>
              <li>Swollen lymph nodes</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Treatment Options</h2>
            <p>The treatment option also varies for different blood disorders. While some blood disorders can be managed with medication, others are fatal and require intensive care.</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Medications:</strong> To manage symptoms or address the underlying cause</li>
              <li><strong>Blood Transfusions:</strong> For severe anemia or other conditions</li>
              <li><strong>Bone Marrow or Stem Cell Transplants:</strong> For disorders like leukemia or severe thalassemia</li>
              <li><strong>Lifestyle Changes:</strong> Improved diet and regular monitoring</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-sundas-blue mt-12">Living with Blood Disorders</h2>
            <p>Living with a blood disorder requires ongoing care and management. Regular check-ups, following the treatment plans, and maintaining a healthy lifestyle can significantly improve quality of life.</p>
            <p>At Sundas Foundation, we are dedicated to raising awareness and support for individuals and families dealing with blood disorders. Your donations can help patients suffering from various blood disorders. Be a part of Sundas Foundation and let’s become a beacon of hope for those in need.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-display font-bold mb-8">Coming Soon</h1>
      <button 
        onClick={onBack}
        className="bg-sundas-blue text-white px-8 py-3 rounded-full font-bold"
      >
        Back to Home
      </button>
    </div>
  );
};

const DonatePage = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState('credit-card');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 pb-20 bg-sundas-blue/5 min-h-screen font-sans">
      <div className="bg-sundas-red py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 font-bold mb-8 hover:text-white transition-all"
          >
            <ArrowRight className="rotate-180" size={20} /> Back to Home
          </button>
          <div className="flex flex-col items-center mb-8">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/017/765/065/non_2x/community-care-logo-on-letter-s-template-teamwork-heart-people-family-care-love-logos-charity-foundation-creative-charity-donation-sign-free-vector.jpg" 
              alt="Sundas Logo" 
              className="h-20 w-20 rounded-full object-cover border-4 border-white/20 shadow-2xl mb-4"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-4xl md:text-5xl font-display font-bold">Make a Donation</h1>
          </div>
          <p className="mt-4 text-lg md:text-xl opacity-90">Your support saves lives of Thalassemia & Hemophilia patients.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 pb-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-sundas-blue/10">
          
          <div className="flex border-b border-sundas-blue/10 overflow-x-auto bg-sundas-blue/5">
            <button 
              onClick={() => setActiveTab('credit-card')} 
              className={`flex-1 py-6 px-4 text-center font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'credit-card' ? 'border-b-4 border-sundas-red text-sundas-red bg-white' : 'text-sundas-blue/50 hover:bg-sundas-blue/10'}`}
            >
              <CreditCard size={20} /> Credit Card
            </button>
            <button 
              onClick={() => setActiveTab('bank-transfer')} 
              className={`flex-1 py-6 px-4 text-center font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'bank-transfer' ? 'border-b-4 border-sundas-red text-sundas-red bg-white' : 'text-sundas-blue/50 hover:bg-sundas-blue/10'}`}
            >
              <Hospital size={20} /> Bank Transfer
            </button>
            <button 
              onClick={() => setActiveTab('offline-cheque')} 
              className={`flex-1 py-6 px-4 text-center font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'offline-cheque' ? 'border-b-4 border-sundas-red text-sundas-red bg-white' : 'text-sundas-blue/50 hover:bg-sundas-blue/10'}`}
            >
              <Mail size={20} /> Cash / Cheque
            </button>
          </div>

          <div className="p-8 md:p-12">
            {activeTab === 'credit-card' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-display font-bold text-sundas-blue">Online Secure Payment</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-sundas-blue/80 mb-2">Donation Amount (PKR)</label>
                      <input type="number" placeholder="5000" className="w-full border-2 border-sundas-blue/10 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-sundas-blue/5 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-sundas-blue/80 mb-2">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full border-2 border-sundas-blue/10 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-sundas-blue/5 focus:bg-white" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-sundas-blue/80 mb-2">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full border-2 border-sundas-blue/10 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-sundas-blue/5 focus:bg-white" />
                        <div className="absolute right-4 top-4 text-sundas-blue/40">
                          <CreditCard size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-sundas-blue/80 mb-2">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full border-2 border-sundas-blue/10 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-sundas-blue/5 focus:bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-sundas-blue/80 mb-2">CVV</label>
                        <input type="text" placeholder="***" className="w-full border-2 border-sundas-blue/10 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-sundas-blue/5 focus:bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-sundas-red text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-sundas-red/20 hover:bg-sundas-blue transition-all">
                  Donate Now
                </button>
              </motion.div>
            )}

            {activeTab === 'bank-transfer' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-display font-bold text-sundas-blue">Bank Account Details</h3>
                <div className="bg-sundas-blue/5 p-8 rounded-2xl border border-sundas-blue/10 space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-sundas-blue/60 font-bold uppercase tracking-wider mb-1">Bank Name</p>
                      <p className="text-lg font-bold text-sundas-blue">Habib Bank Limited (HBL)</p>
                    </div>
                    <div>
                      <p className="text-sm text-sundas-blue/60 font-bold uppercase tracking-wider mb-1">Account Title</p>
                      <p className="text-lg font-bold text-sundas-blue">Sundas Foundation</p>
                    </div>
                    <div>
                      <p className="text-sm text-sundas-blue/60 font-bold uppercase tracking-wider mb-1">Account Number</p>
                      <p className="text-lg font-bold text-sundas-blue">0042 7901 2345 03</p>
                    </div>
                    <div>
                      <p className="text-sm text-sundas-blue/60 font-bold uppercase tracking-wider mb-1">IBAN</p>
                      <p className="text-lg font-bold text-sundas-blue">PK72 HABB 0042 7901 2345 03</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-sundas-blue/5 rounded-2xl border border-sundas-blue/10">
                  <p className="text-sundas-blue/80">Please send a screenshot of the transfer to <span className="font-bold text-sundas-blue">donations@sundas.org</span> for confirmation.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'offline-cheque' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-display font-bold text-sundas-blue">Cash or Cheque Donation</h3>
                <div className="space-y-6">
                  <p className="text-sundas-blue/70 text-lg">You can visit any of our centers to donate in person or send a cheque to our main office.</p>
                  <div className="bg-sundas-blue/5 p-8 rounded-2xl border border-sundas-blue/10">
                    <h4 className="font-bold text-sundas-blue mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-sundas-red" /> Main Office Address
                    </h4>
                    <p className="text-sundas-blue/80 leading-relaxed">
                      Sundas Foundation Headquarters<br />
                      80-G, Gulberg III, Lahore, Pakistan<br />
                      Phone: +92 42 111 786 327
                    </p>
                  </div>
                  <div className="p-6 bg-sundas-red/5 rounded-2xl border border-sundas-red/10">
                    <p className="text-sundas-red font-medium">Please make all cheques payable to <span className="font-bold">"Sundas Foundation"</span>.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8">
              Get in <span className="text-sundas-red">Touch</span>
            </h2>
            <p className="text-sundas-blue/70 text-lg mb-12">
              Have questions or want to volunteer? Reach out to us and our team will get back to you as soon as possible.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-sundas-blue/10 rounded-2xl text-sundas-blue">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sundas-blue">Call Us</h4>
                  <p className="text-sundas-blue/60">+92 42 111 786 327</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="p-4 bg-sundas-red/10 rounded-2xl text-sundas-red">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sundas-blue">Email Us</h4>
                  <p className="text-sundas-blue/60">info@sundas.org.pk</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="p-4 bg-sundas-blue/10 rounded-2xl text-sundas-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sundas-blue">Visit Us</h4>
                  <p className="text-sundas-blue/60">80-G, Gulberg III, Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sundas-blue/5 p-10 rounded-3xl border border-sundas-blue/10 shadow-sm">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-sundas-blue/80 mb-2">Full Name</label>
                  <input type="text" className="w-full px-5 py-3 rounded-xl border border-sundas-blue/20 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-sundas-blue/80 mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-3 rounded-xl border border-sundas-blue/20 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-sundas-blue/80 mb-2">Subject</label>
                <input type="text" className="w-full px-5 py-3 rounded-xl border border-sundas-blue/20 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-sundas-blue/80 mb-2">Message</label>
                <textarea rows={4} className="w-full px-5 py-3 rounded-xl border border-sundas-blue/20 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="Your message here..."></textarea>
              </div>
              <button className="w-full bg-sundas-blue text-white py-4 rounded-xl font-bold hover:bg-sundas-blue/90 transition-all shadow-lg shadow-sundas-blue/20">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onContact, onCenters }: { onContact: () => void, onCenters: () => void }) => {
  return (
    <footer className="bg-sundas-blue text-white pt-24 pb-12 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sundas-blue via-sundas-red to-sundas-blue glow-red opacity-50"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/017/765/065/non_2x/community-care-logo-on-letter-s-template-teamwork-heart-people-family-care-love-logos-charity-foundation-creative-charity-donation-sign-free-vector.jpg" 
                alt="Sundas Logo" 
                className="h-12 w-12 rounded-full object-cover border-2 border-white/10 glow-blue"
                referrerPolicy="no-referrer"
              />
              <div className="text-2xl font-display font-extrabold tracking-tighter glow-text-blue">
                SUNDAS <span className="text-sundas-red glow-text-red">CLONE</span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-8">
              Founded by Munnoo Bhai (Late) to serve humanity and save innocent lives through healthcare and blood donation.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: 10, backgroundColor: "#cb0000", boxShadow: "0 0 15px rgba(203,0,0,0.5)" }}
                  className="p-3 bg-white/5 rounded-full transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              Quick Links <div className="h-1 w-8 bg-sundas-red rounded-full glow-red"></div>
            </h4>
            <ul className="text-white/60 space-y-4">
              {[
                { name: 'About Foundation', action: () => {} },
                { name: 'Our Centers', action: onCenters },
                { name: 'Zakat Calculator', action: () => {} },
                { name: 'Volunteer Program', action: () => {} },
                { name: 'Privacy Policy', action: () => {} }
              ].map((link) => (
                <li key={link.name}>
                  <motion.button 
                    onClick={link.action}
                    whileHover={{ x: 10, color: "#ffffff", textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                    className="transition-colors inline-block text-left"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              Our Services <div className="h-1 w-8 bg-white rounded-full glow-blue"></div>
            </h4>
            <ul className="text-white/60 space-y-4">
              {['Blood Transfusion', 'Diagnostic Lab', 'Emergency Care', 'Patient Support'].map((service) => (
                <li key={service}>
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 10, color: "#ffffff", textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                    className="transition-colors inline-block"
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              Newsletter <div className="h-1 w-8 bg-sundas-red rounded-full glow-red"></div>
            </h4>
            <p className="text-white/70 mb-6">Subscribe to get latest updates and news.</p>
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 focus-within:border-sundas-red focus-within:glow-red transition-all">
              <input type="email" placeholder="Email" className="bg-transparent px-4 py-2 rounded-lg outline-none w-full text-white" />
              <motion.button 
                onClick={onContact}
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(203,0,0,0.5)" }}
                whileTap={{ scale: 0.9 }}
                className="bg-sundas-red p-2 rounded-lg hover:bg-sundas-red/80 transition-colors shrink-0"
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Sundas Foundation Clone. All rights reserved. Built for humanity.</p>
        </div>
      </div>
    </footer>
  );
};

const DonateModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="bg-sundas-blue p-8 text-white text-center relative">
              <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white">
                <X size={24} />
              </button>
              <Heart className="mx-auto mb-4 text-sundas-red fill-sundas-red" size={48} />
              <h3 className="text-3xl font-display font-bold">Make a Donation</h3>
              <p className="text-white/80 mt-2">Your small contribution can save a life.</p>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 mb-8">
                {['$10', '$50', '$100'].map(amount => (
                  <button key={amount} className="py-3 border-2 border-sundas-blue/10 rounded-xl font-bold hover:border-sundas-red hover:text-sundas-red transition-all">
                    {amount}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                <input type="number" placeholder="Custom Amount" className="w-full px-5 py-3 rounded-xl border border-sundas-blue/20 outline-none focus:border-sundas-blue" />
                <button className="w-full bg-sundas-red text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-sundas-red/20 hover:bg-sundas-red/90 transition-all">
                  Proceed to Payment
                </button>
              </div>
              
              <p className="text-center text-sundas-blue/40 text-xs mt-6">
                All donations are tax-deductible. Secure payment powered by Sundas Clone.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/923001234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-all glow-whatsapp"
      initial={{ scale: 0, opacity: 0, x: -100 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: 0
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2, 
          ease: "easeInOut" 
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          fill="currentColor" 
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.06 3.973L0 16l4.104-1.076a7.864 7.864 0 0 0 3.886 1.02h.004c4.368 0 7.926-3.558 7.93-7.93a7.897 7.897 0 0 0-2.323-5.688zM7.994 14.52a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </motion.div>
    </motion.a>
  );
};

export default function App() {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [showDonatePage, setShowDonatePage] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);
  const [showCausesPage, setShowCausesPage] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showMediaPage, setShowMediaPage] = useState(false);
  const [showCentersPage, setShowCentersPage] = useState(false);
  const [aboutSubPage, setAboutSubPage] = useState<string | null>(null);
  const [mediaSubPage, setMediaSubPage] = useState<string | null>(null);

  const resetViews = () => {
    setShowDonatePage(false);
    setSelectedCause(null);
    setShowAboutPage(false);
    setShowCausesPage(false);
    setShowContactPage(false);
    setShowMediaPage(false);
    setShowCentersPage(false);
    setAboutSubPage(null);
    setMediaSubPage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutSubPage = (sub: string) => {
    resetViews();
    if (sub === 'Our Centers') {
      setShowCentersPage(true);
    } else {
      setShowAboutPage(true);
      setAboutSubPage(sub);
    }
  };

  const handleMediaSubPage = (sub: string) => {
    resetViews();
    setShowMediaPage(true);
    setMediaSubPage(sub);
  };

  if (showDonatePage) {
    return (
      <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar 
          onDonate={() => setShowDonatePage(true)} 
          onAbout={() => { resetViews(); setShowAboutPage(true); }}
          onAboutSubPage={handleAboutSubPage}
          onMediaSubPage={handleMediaSubPage}
          onHome={() => resetViews()}
          onCauses={() => { resetViews(); setShowCausesPage(true); }}
          onContact={() => { resetViews(); setShowContactPage(true); }}
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <DonatePage onBack={() => setShowDonatePage(false)} />
        </motion.div>
        <Footer 
          onContact={() => { resetViews(); setShowContactPage(true); }} 
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <WhatsAppButton />
      </div>
    );
  }

  if (showAboutPage) {
    return (
      <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar 
          onDonate={() => { resetViews(); setShowDonatePage(true); }} 
          onAbout={() => setShowAboutPage(true)}
          onAboutSubPage={handleAboutSubPage}
          onMediaSubPage={handleMediaSubPage}
          onHome={() => resetViews()}
          onCauses={() => { resetViews(); setShowCausesPage(true); }}
          onContact={() => { resetViews(); setShowContactPage(true); }}
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <motion.div
           key={aboutSubPage || 'about'}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
        >
          <AboutPage onBack={() => setShowAboutPage(false)} subPage={aboutSubPage} />
        </motion.div>
        <Footer 
          onContact={() => { resetViews(); setShowContactPage(true); }} 
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <WhatsAppButton />
      </div>
    );
  }

  if (showMediaPage) {
    return (
      <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar 
          onDonate={() => { resetViews(); setShowDonatePage(true); }} 
          onAbout={() => { resetViews(); setShowAboutPage(true); }}
          onAboutSubPage={handleAboutSubPage}
          onMediaSubPage={handleMediaSubPage}
          onHome={() => resetViews()}
          onCauses={() => { resetViews(); setShowCausesPage(true); }}
          onContact={() => { resetViews(); setShowContactPage(true); }}
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <motion.div
           key={mediaSubPage || 'media'}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
        >
          <MediaPage onBack={() => setShowMediaPage(false)} subPage={mediaSubPage} />
        </motion.div>
        <Footer 
          onContact={() => { resetViews(); setShowContactPage(true); }} 
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <WhatsAppButton />
      </div>
    );
  }

  if (showCausesPage) {
    return (
      <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar 
          onDonate={() => { resetViews(); setShowDonatePage(true); }} 
          onAbout={() => { resetViews(); setShowAboutPage(true); }}
          onAboutSubPage={handleAboutSubPage}
          onMediaSubPage={handleMediaSubPage}
          onHome={() => resetViews()}
          onCauses={() => setShowCausesPage(true)}
          onContact={() => { resetViews(); setShowContactPage(true); }}
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           transition={{ duration: 0.5 }}
        >
          <CausesPage onBack={() => setShowCausesPage(false)} onLearnMore={(id) => setSelectedCause(id)} />
        </motion.div>
        <Footer 
          onContact={() => { resetViews(); setShowContactPage(true); }} 
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <WhatsAppButton />
      </div>
    );
  }

  if (showContactPage) {
    return (
      <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar 
          onDonate={() => { resetViews(); setShowDonatePage(true); }} 
          onAbout={() => { resetViews(); setShowAboutPage(true); }}
          onAboutSubPage={handleAboutSubPage}
          onMediaSubPage={handleMediaSubPage}
          onHome={() => resetViews()}
          onCauses={() => { resetViews(); setShowCausesPage(true); }}
          onContact={() => setShowContactPage(true)}
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <motion.div
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.9 }}
           transition={{ duration: 0.5 }}
        >
          <ContactPage onBack={() => setShowContactPage(false)} />
        </motion.div>
        <Footer 
          onContact={() => setShowContactPage(true)} 
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <WhatsAppButton />
      </div>
    );
  }

  if (showCentersPage) {
    return (
      <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar 
          onDonate={() => { resetViews(); setShowDonatePage(true); }} 
          onAbout={() => { resetViews(); setShowAboutPage(true); }}
          onAboutSubPage={handleAboutSubPage}
          onMediaSubPage={handleMediaSubPage}
          onHome={() => resetViews()}
          onCauses={() => { resetViews(); setShowCausesPage(true); }}
          onContact={() => { resetViews(); setShowContactPage(true); }}
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <motion.div
           initial={{ opacity: 0, x: -100 }}
           animate={{ opacity: 1, x: 0 }}
           exit={{ opacity: 0, x: 100 }}
           transition={{ duration: 0.5 }}
        >
          <CentersPage onBack={() => setShowCentersPage(false)} />
        </motion.div>
        <Footer 
          onContact={() => { resetViews(); setShowContactPage(true); }} 
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <WhatsAppButton />
      </div>
    );
  }

  if (selectedCause) {
    return (
      <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar 
          onDonate={() => { resetViews(); setShowDonatePage(true); }} 
          onAbout={() => { resetViews(); setShowAboutPage(true); }}
          onAboutSubPage={handleAboutSubPage}
          onMediaSubPage={handleMediaSubPage}
          onHome={() => resetViews()}
          onCauses={() => { resetViews(); setShowCausesPage(true); }}
          onContact={() => { resetViews(); setShowContactPage(true); }}
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <CauseDetail causeId={selectedCause} onBack={() => setSelectedCause(null)} />
        </motion.div>
        <Footer 
          onContact={() => { resetViews(); setShowContactPage(true); }} 
          onCenters={() => { resetViews(); setShowCentersPage(true); }}
        />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sundas-blue/5 font-sans text-sundas-blue selection:bg-sundas-red/10 selection:text-sundas-red">
      <Navbar 
        onDonate={() => setShowDonatePage(true)} 
        onAbout={() => { resetViews(); setShowAboutPage(true); }}
        onAboutSubPage={handleAboutSubPage}
        onMediaSubPage={handleMediaSubPage}
        onHome={() => resetViews()}
        onCauses={() => { resetViews(); setShowCausesPage(true); }}
        onContact={() => { resetViews(); setShowContactPage(true); }}
        onCenters={() => { resetViews(); setShowCentersPage(true); }}
      />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero onDonate={() => setShowDonatePage(true)} />
        <Stats />
        
        {/* About Section */}
        <section id="about" className="py-32 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://sundas.org/Images/NewsandEvents/Events/15-Mar-2025_02-29-46_Secretary%20Health%20Balochistan%20Visits%20Sundas%20Foundation%20Lahore.jpg" 
                    alt="Secretary Health Balochistan Visits Sundas Foundation" 
                    className="w-full h-auto object-cover aspect-[4/5]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-sundas-red/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-sundas-blue/10 rounded-full blur-3xl -z-10"></div>
                
                <div className="absolute bottom-10 left-10 bg-white p-6 rounded-2xl shadow-xl border border-sundas-blue/10 max-w-xs hidden md:block">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-sundas-red/10 rounded-lg text-sundas-red">
                      <HeartHandshake size={24} />
                    </div>
                    <span className="font-bold text-sundas-blue">Our Mission</span>
                  </div>
                  <p className="text-sm text-sundas-blue/70 leading-relaxed">
                    To provide high-quality healthcare services to non-affording patients with blood disorders.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-sundas-red font-bold tracking-widest uppercase text-sm mb-4 block">Who We Are</span>
                <h2 className="text-4xl md:text-5xl font-display font-extrabold text-sundas-blue mb-8 leading-tight">
                  Serving Humanity with <span className="text-sundas-blue">Compassion</span> Since 1998
                </h2>
                <p className="text-sundas-blue/70 text-lg leading-relaxed mb-8">
                  Sundas Foundation was established in 1998 with the vision of providing free treatment to patients suffering from Thalassemia, Hemophilia, and other blood-related disorders.
                </p>
                <p className="text-sundas-blue/70 text-lg leading-relaxed mb-10">
                  Founded by the legendary Munnoo Bhai, we have grown from a single center to a nationwide network, saving thousands of lives through voluntary blood donations and state-of-the-art medical facilities.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-red rounded-full"></div>
                    <span className="font-semibold text-sundas-blue/80">Free Treatment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-blue rounded-full"></div>
                    <span className="font-semibold text-sundas-blue/80">Safe Blood</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-red rounded-full"></div>
                    <span className="font-semibold text-sundas-blue/80">Expert Doctors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-blue rounded-full"></div>
                    <span className="font-semibold text-sundas-blue/80">24/7 Support</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsDonateModalOpen(true)}
                  className="bg-sundas-blue text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-sundas-blue/90 transition-all shadow-lg shadow-sundas-blue/20"
                >
                  Support Our Mission
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* New Fighting Blood Disorders Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -bottom-8 -right-8 w-full h-full bg-gradient-to-br from-sundas-red/10 to-sundas-red/5 rounded-[40px] z-0 transition-all duration-300 group-hover:translate-x-3 group-hover:translate-y-3"></div>
                
                <img 
                  src="https://c8.alamy.com/comp/2BMC71Y/lahore-pakistan-08th-may-2020-582020-pakistani-children-affected-by-thalassemia-being-treated-by-blood-transfusion-at-sundas-foundation-center-as-blood-for-thalassaemia-patients-is-too-short-due-to-pandemic-covid-19-and-ramzan-ul-mubarak-while-world-observe-international-thalassaemia-day-in-lahore-thalassemia-is-a-genetic-disease-of-the-blood-where-patients-cannot-produce-enough-hemoglobin-the-substance-in-red-blood-cells-that-transport-oxygen-from-the-lungs-photo-by-rana-sajid-hussainpacific-presssipa-usa-credit-sipa-usaalamy-live-news-2BMC71Y.jpg" 
                  alt="Blood Donation for Thalassemia Child" 
                  className="relative z-10 w-full h-[520px] object-cover rounded-[40px] shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-8 left-8 z-20 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-sundas-red/10">
                  <div className="bg-sundas-red/10 p-3 rounded-full text-sundas-red">
                    <Activity size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-sundas-blue/50 tracking-wider">Your Donation</p>
                    <p className="text-xl font-black text-sundas-blue">Saves a Life</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 bg-sundas-red/10 text-sundas-red text-xs font-black px-6 py-2 rounded-full uppercase tracking-[0.2em]">
                  <Droplets size={14} /> Serving Humanity
                </div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-sundas-blue leading-tight">
                  Fighting <span className="text-sundas-red italic">Blood Disorders</span> across Pakistan
                </h2>
                
                <p className="text-lg text-sundas-blue/70 leading-relaxed font-medium">
                  Sundas Foundation is dedicated to providing free blood transfusions and comprehensive treatment to children suffering from Thalassemia, Hemophilia, and other serious blood diseases. We believe every child deserves a chance at a healthy life.
                </p>
                
                <div className="grid grid-cols-3 gap-6 pt-10 border-t border-sundas-blue/5">
                  <div className="text-center">
                    <p className="text-4xl font-black text-sundas-red mb-1"><Counter value="25+" /></p>
                    <p className="text-[10px] uppercase font-bold text-sundas-blue/40 tracking-widest">Years of Service</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-sundas-blue mb-1"><Counter value="12" /></p>
                    <p className="text-[10px] uppercase font-bold text-sundas-blue/40 tracking-widest">Centers Nationwide</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-black text-sundas-blue mb-1"><Counter value="1M+" /></p>
                    <p className="text-[10px] uppercase font-bold text-sundas-blue/40 tracking-widest">Lives Impacted</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setIsDonateModalOpen(true)}
                    className="group flex items-center gap-3 text-sundas-red font-bold text-lg hover:gap-5 transition-all"
                  >
                    Learn about our impact <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <Causes onLearnMore={(id) => setSelectedCause(id)} />
        
        {/* CTA Section */}
        <section className="py-24 bg-sundas-red relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-8">
              Be a Hero. <span className="text-white/80">Donate Blood.</span>
            </h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto font-light">
              Your single donation can save up to three lives. Join our community of heroes today.
            </p>
            <button className="bg-white text-sundas-red px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl">
              Register as a Donor
            </button>
          </div>
        </section>

        {/* Our Global Presence Section */}
        <section className="py-24 bg-sundas-blue/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold text-sundas-blue">Our <span className="text-sundas-red">Presence</span> & Support</h2>
              <p className="text-sundas-blue/60 mt-4 text-lg">Connecting donors and supporters from across the globe to save lives in Pakistan.</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white aspect-[21/9] md:aspect-[3/1]"
            >
              <img 
                src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop" 
                alt="World Map Presence" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sundas-blue/60 to-transparent flex items-end justify-center pb-12">
                <div className="text-white text-center">
                  <div className="flex justify-center gap-8 md:gap-20">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                      <div className="text-3xl font-black"><Counter value="25+" /></div>
                      <div className="text-xs uppercase tracking-widest opacity-80 mt-1">Centers</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                      <div className="text-3xl font-black"><Counter value="100k+" /></div>
                      <div className="text-xs uppercase tracking-widest opacity-80 mt-1">Donors</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                      <div className="text-3xl font-black"><Counter value="1M+" /></div>
                      <div className="text-xs uppercase tracking-widest opacity-80 mt-1">Lives Saved</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pulsing Dots for Map Pins effect */}
              <div className="absolute top-[40%] left-[65%] w-4 h-4 bg-sundas-red rounded-full shadow-[0_0_0_8px_rgba(239,68,68,0.3)] animate-pulse"></div>
              <div className="absolute top-[35%] left-[25%] w-3 h-3 bg-white rounded-full shadow-[0_0_0_6px_rgba(255,255,255,0.3)] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-[50%] left-[80%] w-3 h-3 bg-white rounded-full shadow-[0_0_0_6px_rgba(255,255,255,0.3)] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </motion.div>
          </div>
        </section>

        <Contact />
      </motion.main>

      <Footer 
        onContact={() => { resetViews(); setShowContactPage(true); }} 
        onCenters={() => { resetViews(); setShowCentersPage(true); }}
      />
      <WhatsAppButton />
      
      <DonateModal 
        isOpen={isDonateModalOpen} 
        onClose={() => setIsDonateModalOpen(false)} 
      />
    </div>
  );
}
