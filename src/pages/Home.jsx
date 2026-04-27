import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronRight, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks, SiMongodb, SiExpress, SiReact, SiNodedotjs, SiPython } from 'react-icons/si';
import { FaHackerrank, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa';
import ProjectModal from '../components/ProjectModal';
import Magnetic from '../components/Magnetic';
import Marquee from '../components/Marquee';
import { projectsData } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
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
      const sections = ['home', 'about', 'skills', 'projects', 'certificates'];
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
          {['home', 'about', 'skills', 'projects', 'certificates'].map((item, i) => (
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
              Results-driven professional with experience in HCC medical coding, committed to leveraging domain expertise and analytical skills to drive organizational success.
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
                <a href="/RichardFranklin_resume.pdf" download="Richard_Franklin_Resume.pdf" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  Resume <FaDownload size={16} />
                </a>
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

      {/* Skills Section */}
      <section id="skills" className="section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          <motion.h2 variants={fadeUp} className="section-title">My <span>Skills</span></motion.h2>
          <div className="skills-grid">
            {[
              { name: 'Medical Coding (HCC)', icon: <FaHtml5 />, category: 'Healthcare' },
              { name: 'MS Excel', icon: <FaCss3Alt />, category: 'Tools' },
              { name: 'Data Analysis', icon: <SiPython />, category: 'Analytics' },
              { name: 'Quality Assurance', icon: <FaGitAlt />, category: 'Process' },
            ].map((skill, index) => (
              <motion.div key={index} variants={fadeUp} whileHover={{ y: -10, scale: 1.05, borderColor: 'var(--accent-color)', boxShadow: '0 10px 30px rgba(56,189,248,0.1)' }} className="glass skill-card">
                <motion.div initial={{ rotate: 0 }} whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="skill-icon">{skill.icon}</motion.div>
                <div>
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-level">{skill.category}</p>
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
          <motion.p variants={fadeUp} style={{ maxWidth: '500px', margin: '0 auto' }}>Looking for placement opportunities. Feel free to reach out to me for any work or suggestions!</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="social-links">
          <motion.a variants={fadeUp} whileHover={{ y: -5, backgroundColor: 'var(--accent-color)', color: '#000' }} href="mailto:richardfranklin2202@gmail.com" className="social-link" title="Email"><FaEnvelope size={20} /></motion.a>
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
