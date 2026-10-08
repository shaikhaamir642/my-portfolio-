import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -40% 0px" }
    );

    const sectionIds = ['home', 'projects', 'skills', 'about'];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'About', href: '#about', id: 'about' },
  ];

  const categorizedTech = {
    Languages: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    ],
    Frontend: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
    ],
    Backend: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true },
    ],
    Database: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    ]
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-300 font-sans relative selection:bg-blue-500/30 selection:text-white scroll-smooth flex flex-col">
      
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-blue-900/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#home" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 outline-none">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-cyan-400 text-black flex items-center justify-center text-sm font-black shadow-[0_0_15px_rgba(59,130,246,0.3)]">A</div>
            SHAIKH AAMIR.
          </a>

          <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors ${activeSection === link.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="flex items-center gap-4">
            <a 
              href="/Aamir's_Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center h-9 px-5 rounded-md bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
            >
              View Resume
            </a>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 outline-none"
            >
              <span className={`w-5 h-[1.5px] bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-5 h-[1.5px] bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-5 h-[1.5px] bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[72px] left-0 w-full bg-[#09090b]/95 backdrop-blur-2xl border-b border-white/5 z-[90] md:hidden flex flex-col p-6 gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium text-zinc-300 py-3 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="/Aamir's_Resume.pdf" 
              target="_blank"
              className="mt-4 flex items-center justify-center h-12 rounded-md bg-white text-black text-sm font-bold"
            >
              View Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Main Content --- */}
      <main className="relative z-10 w-full flex-1 max-w-7xl mx-auto px-6 md:px-12 pt-32 lg:pt-40 pb-24">
        
        {/* --- Hero Section --- */}
        <motion.section 
          id="home"
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-32 pt-10"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-cyan-600 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-zinc-300 uppercase tracking-widest">Available for Full-Time Roles</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 leading-[1.05]]">
            Engineering <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-zinc-600 drop-shadow-lg">The Future.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-extrabold drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">SHAIKH AAMIR</span>. A Full-Stack Engineer and Prompt Engineer specializing in the MERN stack and intelligent API integrations.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <a href="#contact" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center rounded-md bg-white border border-zinc-800 text-zinc-900 font-semibold text-sm hover:bg-zinc-200 transition-colors">
              Get in Touch
            </a>
            <a href="https://www.linkedin.com/in/shaikhaamir642" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto h-12 px-8 flex items-center justify-center rounded-md bg-white text-zinc-900 font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 gap-2.5">
               <svg className="w-5 h-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </motion.div>
        </motion.section>

        {/* --- Projects Section --- */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="mb-32 scroll-mt-24"
        >
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-zinc-800 pb-6 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Featured Projects</h2>
              <p className="text-zinc-500 mt-2 text-sm md:text-base">A collection of web apps and architectures I have built.</p>
            </div>
            <a href="https://github.com/shaikhaamir642" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-blue-400 flex items-center gap-1 group transition-colors">
              View GitHub <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Project 1 */}
            <motion.a variants={fadeUp} href="https://smart-code-analyzer-one.vercel.app" target="_blank" className="group relative flex flex-col rounded-3xl bg-[#09090b] border border-white/10 p-5 hover:border-blue-500/50 transition-all duration-500 z-10 hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)]">
              <div className="w-full aspect-[18/10] bg-[#0c0c0e] rounded-xl overflow-hidden border border-white/5 relative mb-6">
                <img src="/Smart-Code.png" alt="Smart Code Analyser" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Visit Site ↗</div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Smart Code Analyser</h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">An intelligent static analysis tool utilizing AI integration to scan, format, and review code in real-time.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded bg-zinc-800/50 text-zinc-300 text-xs font-medium border border-zinc-700/50">React</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800/50 text-zinc-300 text-xs font-medium border border-zinc-700/50">Node.js</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800/50 text-zinc-300 text-xs font-medium border border-zinc-700/50">Gemini AI</span>
                </div>
              </div>
            </motion.a>

             {/* Project 2 */}
             <motion.a variants={fadeUp} href="https://taskflow-app-cyan.vercel.app" target="_blank" className="group relative flex flex-col rounded-3xl bg-[#09090b] border border-white/10 p-5 hover:border-cyan-500/50 transition-all duration-500 z-10 hover:shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)]">
              <div className="w-full aspect-[18/10] bg-[#0c0c0e] rounded-xl overflow-hidden border border-white/5 relative mb-6">
                <img src="/TaskFlow.png" alt="TaskFlow" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">Visit Site ↗</div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">TaskFlow SaaS</h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">A complete enterprise task management architecture featuring secure authentication and robust database scaling.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded bg-zinc-800/50 text-zinc-300 text-xs font-medium border border-zinc-700/50">MERN Stack</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800/50 text-zinc-300 text-xs font-medium border border-zinc-700/50">Tailwind</span>
                  <span className="px-2.5 py-1 rounded bg-zinc-800/50 text-zinc-300 text-xs font-medium border border-zinc-700/50">JWT Auth</span>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.section>

        {/* --- Skills Section --- */}
        <motion.section
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="mb-32 scroll-mt-24"
        >
          <motion.div variants={fadeUp} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Technical Skills</h2>
            <p className="text-zinc-500 mt-2 text-sm md:text-base">The tools and languages I use everyday.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(categorizedTech).map(([category, techs], index) => (
              <motion.div 
                key={index} 
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 p-8 rounded-3xl transition-all duration-300 hover:bg-[#0c0c0e] hover:border-blue-500/40 hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)]"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">{category}</h3>
                
                <div className="flex flex-col gap-2 relative z-10">
                  {techs.map(tech => (
                    <motion.div 
                      key={tech.name} 
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center gap-3 p-2 -ml-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#09090b] border border-white/5 flex items-center justify-center p-2.5 shadow-inner group-hover:border-blue-500/50 transition-colors">
                        <img src={tech.icon} alt={tech.name} className={`w-full h-full object-contain ${tech.invert ? 'filter invert opacity-90' : 'opacity-90'}`} />
                      </div>
                      <span className="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- About & Education Section --- */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-32 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* About Text */}
            <motion.div variants={fadeUp} className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">About Me</h2>
              
              <div className="flex items-center gap-4 mb-10 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <img 
                  src="/Aamir.png" 
                  alt="Shaikh Aamir" 
                  className="w-16 h-16 rounded-xl object-cover border border-zinc-700 bg-zinc-900 shadow-xl"
                />
                <div>
                  <h3 className="text-lg font-bold text-white">Shaikh Aamir</h3>
                  <p className="text-sm font-medium text-cyan-400 mt-1">Khandwa (M.P), India</p>
                </div>
              </div>

              <div className="text-zinc-400 space-y-5 text-base leading-relaxed">
                <p>
                  I am a passionate Software Engineer focused on bridging the gap between complex backend logic and clean, accessible user interfaces.
                </p>
                <p>
                  Specializing in the MERN stack and applied AI integrations (Gemini, OpenAI), my approach is heavily rooted in <strong className="text-zinc-200 font-medium">first-principles thinking</strong>—understanding how the core systems work before building atop them.
                </p>
                <p>
                  Whether solving algorithmic puzzles or deploying full-stack SaaS apps, I am constantly learning in public and pushing the limits of what web technologies can achieve.
                </p>
              </div>
            </motion.div>

            {/* Education Timeline */}
            <motion.div variants={fadeUp} className="lg:col-span-7 bg-gradient-to-b from-zinc-900/50 to-transparent border border-white/5 rounded-3xl p-8 md:p-10 md:p-14 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Education & Milestones</h3>
              
              <div className="relative border-l border-zinc-800 pl-8 space-y-12 ml-2">
                
                {/* Timeline Item 1 */}
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-[#09090b] shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                  
                  <span className="inline-block px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold tracking-widest uppercase mb-3 border border-blue-500/20">
                    2022 — 2026
                  </span>
                  <h4 className="text-xl font-bold text-white mb-2">B.Tech in Computer Science</h4>
                  <p className="text-zinc-400 text-base leading-relaxed">Oriental Institute of Science and Technology, Bhopal (M.P). Currently completing my final year of engineering and actively preparing for full-time campus placements.</p>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative">
                  <div className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-zinc-600 ring-4 ring-[#09090b]"></div>
                  
                  <span className="text-xs font-mono text-zinc-500 mb-2 block">Ongoing</span>
                  <h4 className="text-lg font-bold text-white mb-1">200+ Algorithmic Challenges</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Consistently solving complex LeetCode challenges to master Data Structures and Algorithms using Java.</p>
                </div>
                
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.footer 
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-gradient-to-b from-white to-zinc-200 rounded-[2.5rem] px-8 py-12 md:px-16 md:py-16 mt-16 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 relative z-10">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">Let's build together.</h2>
              <p className="text-zinc-600 text-lg max-w-md">I am currently open for full-time engineering roles. Let's discuss how I can bring value to your team.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="mailto:shaikhaamir27765@gmail.com" className="h-12 px-8 flex items-center justify-center rounded-xl bg-zinc-900 text-white font-bold text-sm hover:bg-zinc-800 transition-colors shadow-xl shadow-zinc-900/20">
                Email Me
              </a>
              <a href="https://wa.me/6267112564" target="_blank" rel="noopener noreferrer" className="h-12 px-8 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-200 text-white font-bold text-sm hover:bg-zinc-800 transition-colors shadow-sm">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-zinc-500 text-sm border-t border-zinc-200 pt-8 relative z-10">
            <p>© {new Date().getFullYear()} Shaikh Aamir. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0 font-medium">
              <a href="https://github.com/shaikhaamir642" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/shaikhaamir642" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">LinkedIn</a>
            </div>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}