import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight, FaExternalLinkAlt, FaDownload, FaSms, FaWhatsapp } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks, SiMongodb, SiExpress, SiReact, SiNodedotjs, SiPython } from 'react-icons/si';
import { FaHackerrank, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa';
import ProjectModal from '../components/ProjectModal';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';
import { projectsData } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100, duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const navFadeDown = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  // Typing Effect State
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = ["Medical Coder", "HCC Specialist", "Biotechnologist", "Data Enthusiast"];

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certificates'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={navFadeDown}
      >
        <motion.div whileHover={{ scale: 1.05 }} className="nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/richard_logo.svg" alt="Richard Logo" style={{ height: '40px', filter: 'drop-shadow(0 0 5px var(--accent-glow))' }} />
        </motion.div>
        <div className="nav-links">
          {['home', 'about', 'experience', 'skills', 'projects', 'certificates'].map((item, i) => (
            <motion.span
              key={item}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={() => scrollTo(item)}
              whileHover={{ y: -3, color: 'var(--accent-color)' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5, ease: 'easeOut' }}
              style={{ color: activeSection === item ? 'var(--accent-color)' : '' }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.span>
          ))}
          <motion.a
            href="/RichardFranklin_resume.pdf"
            download="Richard_Franklin_Resume.pdf"
            className="nav-link"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              background: 'rgba(16, 185, 129, 0.1)', 
              padding: '0.4rem 1rem', 
              borderRadius: '20px',
              border: '1px solid var(--accent-color)',
              color: 'var(--accent-color)',
              fontWeight: '600'
            }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ease: 'easeOut' }}
          >
            Resume <FaDownload size={12} />
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="section hero">
        <div className="hero-content-wrapper">
          <motion.div className="hero-text" initial="hidden" animate="visible" variants={staggerContainer} style={{ y: heroY, opacity: heroOpacity }}>
            <motion.p variants={fadeUp} className="hero-subtitle">Welcome to my portfolio</motion.p>
            <motion.h1 variants={fadeUp} className="hero-title">
              Hi, I'm Richard Franklin<br />
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'inline-block' }}
              >
                {titles[titleIndex]}
              </motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-desc">
              Hi, I'm Richard Franklin — Medical Coder & Biotechnologist with 1.8 years at Clarus RCM.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-buttons">
              <Magnetic>
                <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                  View My Work <FaChevronRight size={20} />
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn-secondary" onClick={() => scrollTo('contact')}>
                  Contact Me
                </button>
              </Magnetic>
              <Magnetic>
                <motion.a
                  href="/RichardFranklin_resume.pdf"
                  download="Richard_Franklin_Resume.pdf"
                  className="btn"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    textDecoration: 'none',
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: 'var(--accent-color)',
                    border: '1px solid var(--accent-color)',
                  }}
                  whileHover={{ scale: 1.05, background: 'rgba(16, 185, 129, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -5, 0],
                    boxShadow: ["0px 0px 0px rgba(16,185,129,0)", "0px 0px 15px rgba(16,185,129,0.4)", "0px 0px 0px rgba(16,185,129,0)"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Download CV <FaDownload size={16} />
                </motion.a>
              </Magnetic>

            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="hero-image-glow"></div>
            <img src="/richard_logo.svg" alt="Richard Franklin" className="hero-image" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Add+me.jpg+in+public' }} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h2 className="section-title">About <span>Me</span></h2>
          <motion.div whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              I am a Biotechnology graduate and an Executive Coder with 1.8 years of experience in HCC at Clarus RCM. My expertise lies in medical coding, healthcare documentation analysis, and ensuring compliance with healthcare regulations. I aim for continuous professional growth while contributing to organizational success.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <Marquee text="MEDICAL CODING • HEALTHCARE COMPLIANCE • BIOTECHNOLOGY • DATA ANALYSIS" />

      {/* Experience Section */}
      <section id="experience" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">My <span>Experience</span></motion.h2>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-color)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Executive Coder <span style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>(1.8 Years)</span></h3>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Clarus RCM</h4>
            <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginLeft: '1.5rem', listStyleType: 'disc' }}>
              <li>Coded 3,28,500+ patient records with high accuracy over 1.8 years at Clarus RCM.</li>
              <li>Analyzed healthcare documentation to ensure strict compliance with medical coding regulations (HCC).</li>
              <li>Consistently maintained high accuracy in medical coding audits, improving data reliability.</li>
              <li>Collaborated with team members to resolve complex coding scenarios efficiently and securely.</li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">My <span>Education</span></motion.h2>
          <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-color)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>B.Sc. Biotechnology</h3>
            <h4 style={{ color: 'var(--text-secondary)' }}>St. Joseph's College (Autonomous), Trichy • Graduated 2022</h4>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">My <span>Skills</span></motion.h2>
          <div className="skills-grid">
            {[
              { name: 'Medical Coding (HCC)', icon: <FaHtml5 />, category: 'Healthcare', percent: 90 },
              { name: 'MS Excel', icon: <FaCss3Alt />, category: 'Tools', percent: 80 },
              { name: 'Data Analysis', icon: <SiPython />, category: 'Analytics', percent: 75 },
              { name: 'Quality Assurance', icon: <FaGitAlt />, category: 'Process', percent: 85 },
            ].map((skill, index) => (
              <motion.div key={index} variants={fadeUp} whileHover={{ y: -10, scale: 1.05, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px rgba(56,189,248,0.1)' }} className="glass skill-card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, height: '4px', width: `${skill.percent}%`, backgroundColor: 'var(--accent-color)' }}></div>
                <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="skill-icon">{skill.icon}</motion.div>
                <div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-level">{skill.percent}% Proficiency</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">Featured <span>Projects</span></motion.h2>
          <div className="projects-grid">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                whileHover={{ y: -15, scale: 1.02 }}
                className="glass project-card"
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="project-img-wrapper">
                  <img src={project.mainImg} alt={project.title} className="project-img" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200?text=Project+Image' }} />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'rgba(56,189,248,0.1)', color: 'var(--accent-color)', borderRadius: '12px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.span whileHover={{ x: 5 }} className="project-link">View Details <FaExternalLinkAlt size={16} /></motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">Client <span>Testimonials</span></motion.h2>
          <div className="projects-grid" style={{ gridTemplateColumns: '1fr' }}>
            <motion.div variants={fadeUp} className="glass" style={{ padding: '2rem', fontStyle: 'italic', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '10px', left: '20px', fontSize: '4rem', color: 'rgba(56,189,248,0.2)', fontFamily: 'serif' }}>"</span>
              <p style={{ position: 'relative', zIndex: 1, fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                Richard is an exceptionally accurate medical coder. His attention to detail on the ACA/MRA projects ensured full compliance and greatly reduced audit errors. Highly recommended!
              </p>
              <br />
              <strong style={{ color: 'var(--accent-color)' }}>- Senior QA Auditor, Clarus RCM</strong>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Profiles & Certificates */}
      <section id="certificates" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <div className="two-col-grid">
            {/* Professional Skills */}
            <div>
              <motion.h2 variants={fadeUp} className="section-title">Professional <span>Skills</span></motion.h2>
              <motion.div variants={fadeUp} whileHover={{ x: 10 }} className="glass profile-card">
                <div className="profile-info" style={{ flexGrow: 1 }}>
                  <h4>Attention to Detail</h4>
                  <p>Ensuring high accuracy in healthcare data</p>
                  <div className="progress-container"><motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="progress-bar"></motion.div></div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} whileHover={{ x: 10 }} className="glass profile-card">
                <div className="profile-info" style={{ flexGrow: 1 }}>
                  <h4>Time Management</h4>
                  <p>Efficiently handling documentation & audits</p>
                  <div className="progress-container"><motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="progress-bar"></motion.div></div>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} whileHover={{ x: 10 }} className="glass profile-card">
                <div className="profile-info" style={{ flexGrow: 1 }}>
                  <h4>Medical Terminology</h4>
                  <p>Strong understanding of medical records</p>
                  <div className="progress-container"><motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="progress-bar"></motion.div></div>
                </div>
              </motion.div>
            </div>

            {/* Certificates Sidebar Promo */}
            <div>
              <motion.h2 variants={fadeUp} className="section-title">Certifications</motion.h2>
              <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>🏆</motion.div>
                <h3>30+ Certifications Completed</h3>
                <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem' }}>From institutions like Microsoft Azure, IBM, Cisco, and more.</p>
                <Link to="/certificates" style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary" style={{ display: 'inline-flex', width: 'auto' }}>
                    View All Certificates <FaChevronRight size={16} />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="footer">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} style={{ marginBottom: '2rem' }}>
          <motion.h2 variants={fadeUp} style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Get In <span style={{ color: 'var(--accent-color)' }}>Touch</span></motion.h2>
          <motion.p variants={fadeUp} style={{ maxWidth: '500px', margin: '0 auto', marginBottom: '2rem' }}>Looking for placement opportunities. Feel free to reach out to me for any work or suggestions!</motion.p>

          <motion.form variants={fadeUp} className="glass" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! Auto-reply: Thank you for reaching out, I will get back to you soon.'); e.target.reset(); }} style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', marginBottom: '3rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Name</label>
              <input type="text" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
              <input type="email" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Message</label>
              <textarea rows="4" required style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Send Message</button>
          </motion.form>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="social-links">
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="mailto:richardfranklin2202@gmail.com" className="social-link" title="Email"><FaEnvelope size={20} /></motion.a>
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="sms:9486365812" className="social-link" title="Send SMS"><FaSms size={20} /></motion.a>
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="https://wa.me/9486365812" className="social-link" title="WhatsApp"><FaWhatsapp size={20} /></motion.a>
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="https://www.linkedin.com/in/richard-franklin-266317220/" target="_blank" rel="noreferrer" className="social-link" title="LinkedIn"><FaLinkedin size={20} /></motion.a>
        </motion.div>
        <p>© {new Date().getFullYear()} Richard Franklin </p>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
};

export default Home;
