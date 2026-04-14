import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  CreditCard
} from 'lucide-react';

const Navbar = ({ onDonate }: { onDonate: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Causes', href: '#causes' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://static.vecteezy.com/system/resources/previews/017/765/065/non_2x/community-care-logo-on-letter-s-template-teamwork-heart-people-family-care-love-logos-charity-foundation-creative-charity-donation-sign-free-vector.jpg" 
            alt="Sundas Logo" 
            className="h-12 w-12 rounded-full object-cover border-2 border-white/20 shadow-lg"
            referrerPolicy="no-referrer"
          />
          <div className={`text-2xl font-display font-extrabold tracking-tighter ${isScrolled ? 'text-sundas-blue' : 'text-white'}`}>
            SUNDAS <span className="text-sundas-red">CLONE</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-10 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className={`transition-colors duration-200 hover:text-sundas-red ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}
              >
                {link.name}
              </a>
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
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
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
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <ul className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="block text-lg font-medium text-gray-800 hover:text-sundas-red"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
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

const Hero = ({ onDonate }: { onDonate: () => void }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: 'url("https://sundas.org/images/gallery_4.jpg")' }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
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
              className="w-full sm:w-auto bg-white text-sundas-blue px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
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
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
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
                {stat.value}
              </h3>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">
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
      description: 'Providing life-saving blood transfusions and medicine to children fighting Thalassemia.',
      icon: <Droplets className="text-sundas-blue" size={40} />,
      border: 'border-sundas-blue',
      bg: 'hover:bg-sundas-blue/5'
    },
    {
      id: 'hemophilia',
      title: 'Hemophilia',
      description: 'Specialized treatment and emergency care for patients with bleeding disorders.',
      icon: <HeartHandshake className="text-sundas-red" size={40} />,
      border: 'border-sundas-red',
      bg: 'hover:bg-sundas-red/5'
    },
    {
      id: 'blood-bank',
      title: 'Blood Bank',
      description: 'A high-tech facility for collecting, testing, and storing safe blood products.',
      icon: <Hospital className="text-sundas-blue" size={40} />,
      border: 'border-sundas-blue',
      bg: 'hover:bg-sundas-blue/5'
    }
  ];

  return (
    <section id="causes" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-extrabold text-gray-900 mb-6"
          >
            Our Primary <span className="text-sundas-red">Causes</span>
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
                boxShadow: cause.id === 'thalassemia' ? "0 20px 40px rgba(203,0,0,0.15)" : "0 20px 40px rgba(0,74,173,0.15)"
              }}
              className={`bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border-b-8 ${cause.border} ${cause.bg} transition-all duration-500 group cursor-default`}
            >
              <div className="mb-8 transform group-hover:scale-110 transition-transform duration-300">
                {cause.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">{cause.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {cause.description}
              </p>
              <button 
                onClick={() => onLearnMore(cause.id)}
                className="flex items-center gap-2 text-sundas-blue font-bold group-hover:gap-4 transition-all"
              >
                Learn More <ChevronRight size={18} />
              </button>
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
            src="https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/how-is-thalassemia-treated-201705-1494225090.jpg" 
            alt="Thalassemia Treatment" 
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />
          
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-gray-900 mb-8">Thalassemia Support</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
            <p>At Sundas Foundation, we are deeply committed to supporting patients living with Thalassemia. We work tirelessly to raise awareness, provide life-saving blood transfusions, and deliver effective treatments to those who need them most. Through our efforts, we aim to not only ease their struggles but also bring hope and positivity to their lives.</p>
            
            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Types of thalassemia</h2>
            <p>There are two main types of thalassemia: alpha-thalassemia and beta-thalassemia, which are further classified into subtypes based on the severity of the disease:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Alpha-thalassemia:</strong> Includes silent carrier, alpha-thalassemia trait, hemoglobin H disease, and hydrops fetalis.</li>
              <li><strong>Beta-thalassemia:</strong> Includes beta-thalassemia minor, intermedia, and major (also known as Cooley's anemia).</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Alpha vs. Beta Thalassemia</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 mt-4">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-4 text-left">Aspect</th>
                    <th className="border border-gray-200 p-4 text-left">Alpha Thalassemia</th>
                    <th className="border border-gray-200 p-4 text-left">Beta Thalassemia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-4 font-bold">Cause</td>
                    <td className="border border-gray-200 p-4">Problems with one or more of the four genes that make alpha-globin</td>
                    <td className="border border-gray-200 p-4">Problems with one or both genes that make beta-globin</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-4 font-bold">Severity</td>
                    <td className="border border-gray-200 p-4">Ranges from mild (silent carrier) to fatal (hydrops fetalis)</td>
                    <td className="border border-gray-200 p-4">Ranges from mild (minor) to severe (major)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-4 font-bold">Symptoms</td>
                    <td className="border border-gray-200 p-4">Fatigue, anemia, enlarged spleen, and bone deformities in severe cases</td>
                    <td className="border border-gray-200 p-4">Severe anemia, jaundice, bone deformities, and growth delays in major cases</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-4 font-bold">Treatment</td>
                    <td className="border border-gray-200 p-4">Blood transfusions, Iron chelation, Supportive care</td>
                    <td className="border border-gray-200 p-4">Blood transfusions, Iron chelation, Bone marrow transplant in severe cases</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Signs & Symptoms</h2>
            <p>The signs and symptoms for thalassemia vary from patient to patient. Some babies start showing symptoms of thalassemia after childbirth while others develop the disease in the first 2-3 years.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fatigue and weakness</li>
              <li>Pale or yellowish skin</li>
              <li>Shortness of breath</li>
              <li>Slow growth and delayed development</li>
              <li>Bone deformities, particularly in the face</li>
              <li>Enlarged spleen or liver</li>
              <li>Dark urine</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Thalassemia Causes</h2>
            <p>Thalassemia is caused by inherited mutations in the hemoglobin-producing genes. It is passed from parents to children in an autosomal recessive manner, meaning both parents must carry the gene for the child to inherit the condition.</p>
            <p>Hemoglobin is made up of two types of protein chains: alpha and beta. Mutations in the genes responsible for these chains lead to two main types of thalassemia: alpha-thalassemia and beta-thalassemia. The reduction in either alpha or beta chains disrupts the balance of hemoglobin production, leading to anemia and other complications associated with thalassemia.</p>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Diagnosis</h2>
            <p>Many children start showing symptoms in the early ages. If a child shows any of the symptoms discussed above, it is crucial to consult a doctor and get the following tests done as early as possible:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Complete blood count (CBC):</strong> To identify anemia and abnormalities in red blood cells.</li>
              <li><strong>Hemoglobin electrophoresis:</strong> To detect abnormal hemoglobin.</li>
              <li><strong>DNA testing:</strong> To confirm genetic mutations causing thalassemia.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Thalassemia Treatment</h2>
            <p>Mild forms of thalassemia trait don't need treatment. For moderate to severe thalassemia, treatments might include:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Frequent Blood Transfusions:</strong> Severe forms of thalassemia often require regular blood transfusions, sometimes as frequently as every few weeks. However, repeated transfusions can lead to iron buildup in the body, potentially damaging vital organs such as the heart and liver.</li>
              <li><strong>Chelation Therapy:</strong> This treatment helps remove excess iron from the blood caused by frequent transfusions or naturally occurring iron buildup. Medications used for chelation include Deferasirox, Deferiprone, and Deferoxamine.</li>
              <li><strong>Stem Cell Transplant:</strong> Also known as a bone marrow transplant, this treatment may be a viable option, especially for children with severe thalassemia. A successful stem cell transplant from a compatible donor can eliminate the need for lifelong blood transfusions.</li>
            </ul>
            <p>Sundas Foundation is the epitome of thalassemia treatment and diagnosis in Pakistan. We are dedicated to providing the best healthcare to those affected, no matter the challenges.</p>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Possible Complications</h2>
            <p>Sundas Foundation provides the best thalassemia treatment for those in need in Pakistan. But complications are a part of any recovery journey. If not managed properly, thalassemia can lead to complications such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Iron overload, affecting the heart, liver, and endocrine glands.</li>
              <li>Growth and developmental delays in children.</li>
              <li>Increased risk of infections due to spleen dysfunction.</li>
              <li>Bone deformities and fractures.</li>
              <li>Osteoporosis, thrombophilia and pseudoxanthoma elasticum.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Thalassemia FAQs</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900">1. How does Sundas Foundation help thalassemia patients?</h4>
                <p>Sundas Foundation is established to support patients suffering from thalassemia and other serious blood disorders. Our staff works tirelessly to raise awareness, provide life-saving blood transfusions, and deliver on-time and effective treatment to needy patients.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">2. How does Sundas Foundation manage thalassemia treatment?</h4>
                <p>We provide comprehensive care including regular transfusions and chelation therapy.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">3. How can I give donations to Sundas Foundation?</h4>
                <p>You can donate through our website or visit any of our centers.</p>
              </div>
            </div>
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
            src="https://media.post.rvohealth.io/wp-content/uploads/2023/08/Woman-with-a-large-hematoma-on-her-leg-thumbnail.jpg" 
            alt="Hemophilia Treatment" 
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />
          
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-gray-900 mb-8">Hemophilia Care</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
            <p>Our services include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Covering the costs of essential diagnostic tests to monitor and manage the condition.</li>
              <li>Providing life-saving medications, such as clotting factor replacement therapy.</li>
              <li>Offering additional support to patients’ families, helping them cope with the financial and emotional challenges of living with hemophilia.</li>
            </ul>
            <p>We go beyond treatment at Sundas Foundation by creating a strong support system that ensures better health and well-being for hemophilia patients and their families. Our goal is to improve their quality of life, enabling them to face each day with hope and confidence.</p>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Hemophilia Types</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hemophilia A:</strong> Also known as classic hemophilia. It is caused by a deficiency in clotting factor VIII. It is the most common form of the disorder.</li>
              <li><strong>Hemophilia B:</strong> Also called Christmas disease. It is a result of a deficiency in clotting factor IX. It is less common than Hemophilia A.</li>
              <li><strong>Hemophilia C:</strong> This rarer form is caused by a deficiency in clotting factor XI and affects both males and females.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Hemophilia Causes</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Genetic mutations:</strong> Hemophilia is usually caused by changes in the genes on the X chromosome, which affect the production of clotting factors.</li>
              <li><strong>Gender differences:</strong> Males have only one X chromosome, so a single mutation can cause hemophilia. Females have two X chromosomes, so they are typically carriers.</li>
              <li><strong>Rare cases:</strong> Sometimes, hemophilia can develop later in life due to autoimmune conditions or certain medical issues.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Signs & Symptoms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prolonged bleeding from cuts or injuries</li>
              <li>Frequent nose bleeds</li>
              <li>Easy bruising</li>
              <li>Joint pain and swelling caused by internal bleeding</li>
              <li>Blood in urine or stool</li>
              <li>Excessive bleeding after surgeries or dental procedure</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Hemophilia Treatment</h2>
            <p>While there is no cure for hemophilia, it can be managed effectively through:</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Replacement Therapy:</strong> Administering clotting factor concentrates to replace the missing or deficient factors.</li>
              <li><strong>Desmopressin (DDAVP):</strong> A synthetic hormone used for mild Hemophilia A to stimulate the release of stored factor VIII.</li>
              <li><strong>Antifibrinolytic Medications:</strong> Drugs that help prevent the breakdown of clots.</li>
              <li><strong>Gene Therapy:</strong> A promising experimental approach aimed at correcting the genetic mutation causing hemophilia.</li>
            </ul>
            <p>Sundas Foundation works closely with hemophilia patients and provides them quality treatment and better healthcare. Your donations help Sundas Foundation focus on hemophilia patients and their treatment without any financial barriers.</p>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Hemophilia FAQs</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900">1. What does Sundas Foundation do for Hemophilia Patients?</h4>
                <p>At Sundas Foundation, we cover the cost of essential diagnostic tests, helping us monitor and manage the condition. We also provide life-saving medications to Hemophilia patients who are poor and cannot afford their treatment costs.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">2. How can I support Hemophilia patients?</h4>
                <p>You can support by donating funds or volunteering at our centers.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">3. Is Hemophilia a curable disease?</h4>
                <p>Currently, there is no cure, but it is highly manageable with modern treatment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (causeId === 'blood-bank') {
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTyQ1IGlEtxAxLVFPsn41U4Bdq-IOZI_xUsQ&s" 
            alt="Blood Bank and Disorders" 
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />
          
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-gray-900 mb-8">Blood Bank & Disorders</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6 leading-relaxed">
            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Common Blood Disorders</h2>
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

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Signs & Symptoms of Blood Disorders</h2>
            <p>Every blood disorder symptom varies. Some common symptoms of blood disorders are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fatigue and weakness</li>
              <li>Shortness of breath</li>
              <li>Unexplained bruising or bleeding</li>
              <li>Frequent infections</li>
              <li>Pale or yellowish skin</li>
              <li>Swollen lymph nodes</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Treatment Options</h2>
            <p>The treatment option also varies for different blood disorders. While some blood disorders can be managed with medication, others are fatal and require intensive care.</p>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Medications:</strong> To manage symptoms or address the underlying cause.</li>
              <li><strong>Blood Transfusions:</strong> For severe anemia or other conditions.</li>
              <li><strong>Bone Marrow or Stem Cell Transplants:</strong> For disorders like leukemia or severe thalassemia.</li>
              <li><strong>Lifestyle Changes:</strong> Improved diet and regular monitoring.</li>
            </ul>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Living with Blood Disorders</h2>
            <p>Living with a blood disorder requires ongoing care and management. Regular check-ups, following the treatment plans, and maintaining a healthy lifestyle can significantly improve quality of life.</p>
            <p>At Sundas Foundation, we are dedicated to raising awareness and support for individuals and families dealing with blood disorders. Your donations can help patients suffering from various blood disorders. Be a part of Sundas Foundation and let’s become a beacon of hope for those in need.</p>

            <h2 className="text-3xl font-display font-bold text-gray-900 mt-12">Other Blood Disorders FAQs</h2>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-900">1. What blood disorders are managed by Sundas Foundation?</h4>
                <p>Sundas Foundation is dedicatedly working to relieve patients suffering from Thalassemia, Hemophilia, Glanzmann’s thrombasthenia & Bernard-Soulier syndrome, pure red cell aplasia & aplastic anemia, chronic dyserythropoietic anemia (CDA), von Willebrand’s disease, and deficiencies in factor I, V, VII, X, and XIII.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">2. How does Sundas Foundation manage blood disorders?</h4>
                <p>We provide specialized medical care, transfusions, and medication support tailored to each condition.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">3. How can I support patients with blood disorders?</h4>
                <p>You can support through financial donations or by donating blood at our high-tech blood bank facilities.</p>
              </div>
            </div>
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
    <div className="pt-20 pb-20 bg-gray-100 min-h-screen font-sans">
      <div className="bg-red-700 py-16 text-white text-center">
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
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          <div className="flex border-b overflow-x-auto bg-gray-50/50">
            <button 
              onClick={() => setActiveTab('credit-card')} 
              className={`flex-1 py-6 px-4 text-center font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'credit-card' ? 'border-b-4 border-sundas-red text-sundas-red bg-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <CreditCard size={20} /> Credit Card
            </button>
            <button 
              onClick={() => setActiveTab('bank-transfer')} 
              className={`flex-1 py-6 px-4 text-center font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'bank-transfer' ? 'border-b-4 border-sundas-red text-sundas-red bg-white' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <Hospital size={20} /> Bank Transfer
            </button>
            <button 
              onClick={() => setActiveTab('offline-cheque')} 
              className={`flex-1 py-6 px-4 text-center font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'offline-cheque' ? 'border-b-4 border-sundas-red text-sundas-red bg-white' : 'text-gray-500 hover:bg-gray-100'}`}
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
                <h3 className="text-2xl font-display font-bold text-gray-800">Online Secure Payment</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Donation Amount (PKR)</label>
                      <input type="number" placeholder="5000" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-gray-50 focus:bg-white" />
                        <div className="absolute right-4 top-4 text-gray-400">
                          <CreditCard size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-gray-50 focus:bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                        <input type="text" placeholder="***" className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-sundas-red outline-none transition-all bg-gray-50 focus:bg-white" />
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
                <h3 className="text-2xl font-display font-bold text-gray-800">Bank Account Details</h3>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Bank Name</p>
                      <p className="text-lg font-bold text-gray-900">Habib Bank Limited (HBL)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Account Title</p>
                      <p className="text-lg font-bold text-gray-900">Sundas Foundation</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Account Number</p>
                      <p className="text-lg font-bold text-gray-900">0042 7901 2345 03</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">IBAN</p>
                      <p className="text-lg font-bold text-gray-900">PK72 HABB 0042 7901 2345 03</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-sundas-blue/5 rounded-2xl border border-sundas-blue/10">
                  <p className="text-gray-700">Please send a screenshot of the transfer to <span className="font-bold text-sundas-blue">donations@sundas.org</span> for confirmation.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'offline-cheque' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-display font-bold text-gray-800">Cash or Cheque Donation</h3>
                <div className="space-y-6">
                  <p className="text-gray-600 text-lg">You can visit any of our centers to donate in person or send a cheque to our main office.</p>
                  <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-sundas-red" /> Main Office Address
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Sundas Foundation Headquarters<br />
                      80-G, Gulberg III, Lahore, Pakistan<br />
                      Phone: +92 42 111 786 327
                    </p>
                  </div>
                  <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-100">
                    <p className="text-yellow-800 font-medium">Please make all cheques payable to <span className="font-bold">"Sundas Foundation"</span>.</p>
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
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 mb-8">
              Get in <span className="text-sundas-red">Touch</span>
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Have questions or want to volunteer? Reach out to us and our team will get back to you as soon as possible.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="p-4 bg-sundas-blue/10 rounded-2xl text-sundas-blue">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Call Us</h4>
                  <p className="text-gray-600">+92 42 111 786 327</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="p-4 bg-sundas-red/10 rounded-2xl text-sundas-red">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email Us</h4>
                  <p className="text-gray-600">info@sundas.org.pk</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="p-4 bg-sundas-blue/10 rounded-2xl text-sundas-blue">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Visit Us</h4>
                  <p className="text-gray-600">80-G, Gulberg III, Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <input type="text" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sundas-blue outline-none transition-all" placeholder="Your message here..."></textarea>
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

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 px-6 relative overflow-hidden">
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
            <p className="text-gray-400 leading-relaxed mb-8">
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
            <ul className="text-gray-400 space-y-4">
              {['About Foundation', 'Zakat Calculator', 'Volunteer Program', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <motion.a 
                    href="#" 
                    whileHover={{ x: 10, color: "#ffffff", textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                    className="transition-colors inline-block"
                  >
                    {link}
                  </motion.a>
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
              Our Services <div className="h-1 w-8 bg-sundas-blue rounded-full glow-blue"></div>
            </h4>
            <ul className="text-gray-400 space-y-4">
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
            <p className="text-gray-400 mb-6">Subscribe to get latest updates and news.</p>
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 focus-within:border-sundas-red focus-within:glow-red transition-all">
              <input type="email" placeholder="Email" className="bg-transparent px-4 py-2 rounded-lg outline-none w-full text-white" />
              <motion.button 
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(203,0,0,0.5)" }}
                whileTap={{ scale: 0.9 }}
                className="bg-sundas-red p-2 rounded-lg hover:bg-sundas-red/80 transition-colors shrink-0"
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-white/5 text-center text-gray-500 text-sm">
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
                  <button key={amount} className="py-3 border-2 border-gray-100 rounded-xl font-bold hover:border-sundas-red hover:text-sundas-red transition-all">
                    {amount}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                <input type="number" placeholder="Custom Amount" className="w-full px-5 py-3 rounded-xl border border-gray-200 outline-none focus:border-sundas-blue" />
                <button className="w-full bg-sundas-red text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-sundas-red/20 hover:bg-sundas-red/90 transition-all">
                  Proceed to Payment
                </button>
              </div>
              
              <p className="text-center text-gray-400 text-xs mt-6">
                All donations are tax-deductible. Secure payment powered by Sundas Clone.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [showDonatePage, setShowDonatePage] = useState(false);

  if (showDonatePage) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar onDonate={() => setShowDonatePage(true)} />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <DonatePage onBack={() => setShowDonatePage(false)} />
        </motion.div>
        <Footer />
      </div>
    );
  }

  if (selectedCause) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-sundas-red/10 selection:text-sundas-red">
        <Navbar onDonate={() => setShowDonatePage(true)} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <CauseDetail causeId={selectedCause} onBack={() => setSelectedCause(null)} />
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-sundas-red/10 selection:text-sundas-red">
      <Navbar onDonate={() => setShowDonatePage(true)} />
      
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
                
                <div className="absolute bottom-10 left-10 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 bg-sundas-red/10 rounded-lg text-sundas-red">
                      <HeartHandshake size={24} />
                    </div>
                    <span className="font-bold text-gray-900">Our Mission</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
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
                <h2 className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 mb-8 leading-tight">
                  Serving Humanity with <span className="text-sundas-blue">Compassion</span> Since 1998
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Sundas Foundation was established in 1998 with the vision of providing free treatment to patients suffering from Thalassemia, Hemophilia, and other blood-related disorders.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  Founded by the legendary Munnoo Bhai, we have grown from a single center to a nationwide network, saving thousands of lives through voluntary blood donations and state-of-the-art medical facilities.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-red rounded-full"></div>
                    <span className="font-semibold text-gray-800">Free Treatment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-blue rounded-full"></div>
                    <span className="font-semibold text-gray-800">Safe Blood</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-red rounded-full"></div>
                    <span className="font-semibold text-gray-800">Expert Doctors</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sundas-blue rounded-full"></div>
                    <span className="font-semibold text-gray-800">24/7 Support</span>
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

        <Contact />
      </motion.main>

      <Footer />
      
      <DonateModal 
        isOpen={isDonateModalOpen} 
        onClose={() => setIsDonateModalOpen(false)} 
      />
    </div>
  );
}
