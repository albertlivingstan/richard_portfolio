import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane, FaWhatsapp, FaDownload } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Richard's AI Assistant. How can I help you today? Try asking about 'experience', 'skills', or 'contact'." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      generateBotResponse(userMessage.toLowerCase());
    }, 1000);
  };

  const generateBotResponse = (query) => {
    setIsTyping(false);
    let botReply = '';
    let isRedirect = false;
    let isResume = false;

    if (query.includes('experience') || query.includes('work') || query.includes('job')) {
      botReply = "Richard is an Executive Coder with 1.8 years of experience in HCC at Clarus RCM, having coded over 3,28,500 patient records with high accuracy!";
    } else if (query.includes('skill')) {
      botReply = "His top skills include Medical Coding (HCC), Data Analysis, MS Excel, and Quality Assurance. He's also a Biotechnology graduate!";
    } else if (query.includes('education') || query.includes('degree') || query.includes('study')) {
      botReply = "Richard graduated with a B.Sc. in Biotechnology from St. Joseph's College (Autonomous), Trichy in 2022.";
    } else if (query.includes('cert')) {
      botReply = "Richard has completed 30+ professional certifications, including CPC Medical Coding Certification, Java Developer Associate (JDAC-24), and various Biotechnology courses from NPTEL!";
    } else if (query.includes('resume') || query.includes('cv') || query.includes('download')) {
      botReply = "You can download Richard's official resume right here!";
      isResume = true;
    } else if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
      botReply = "Hello! Feel free to ask about Richard's portfolio, background, or certifications.";
    } else if (query.includes('project')) {
      botReply = "Richard has worked on ACA/MRA compliance and even researched bioactive quercetin! Check out the Projects section for more details.";
    } else if (query.includes('contact') || query.includes('hire') || query.includes('reach')) {
      botReply = "You can email him at richardfranklin2202@gmail.com, or drop him a WhatsApp message directly using the button below!";
      isRedirect = true;
    } else {
      botReply = "I'm still learning! For more detailed discussions or if you want to chat more, Richard would love to speak with you directly on WhatsApp.";
      isRedirect = true;
    }

    setMessages(prev => [...prev, { sender: 'bot', text: botReply, isRedirect, isResume }]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="chatbot-window glass"
            style={{
              position: 'fixed', bottom: '80px', right: '20px', 
              width: 'calc(100vw - 40px)', maxWidth: '350px', 
              height: '450px', maxHeight: 'calc(100vh - 120px)',
              zIndex: 1000, display: 'flex', flexDirection: 'column', borderRadius: '15px', overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(56,189,248,0.2)',
              background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{ padding: '15px', background: 'var(--accent-color)', color: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', background: '#25D366', borderRadius: '50%', boxShadow: '0 0 5px #25D366' }}></div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>AI Assistant</h3>
              </div>
              <FaTimes style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
            </div>
            
            <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      padding: '10px 15px',
                      borderRadius: '15px',
                      background: msg.sender === 'user' ? 'rgba(56,189,248,0.2)' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      border: msg.sender === 'user' ? '1px solid var(--accent-color)' : '1px solid rgba(255,255,255,0.1)',
                      borderBottomRightRadius: msg.sender === 'user' ? '2px' : '15px',
                      borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '15px',
                    }}
                  >
                    {msg.text}
                  </motion.div>
                  {msg.isRedirect && (
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/9486365812?text=Hi%20Richard%2C%20I%20am%20a%20recruiter.%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20chat%20with%20you!"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px', padding: '8px 12px',
                        background: '#25D366', color: 'white', textDecoration: 'none', borderRadius: '20px', fontSize: '0.9rem', width: 'fit-content',
                        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
                      }}
                    >
                      <FaWhatsapp size={16} /> Chat on WhatsApp
                    </motion.a>
                  )}
                  {msg.isResume && (
                    <motion.a
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="/RichardFranklin_resume.pdf"
                      download="Richard_Franklin_Resume.pdf"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px', padding: '8px 12px',
                        background: 'var(--accent-color)', color: 'black', textDecoration: 'none', borderRadius: '20px', fontSize: '0.9rem', width: 'fit-content',
                        boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)'
                      }}
                    >
                      <FaDownload size={14} /> Download Resume
                    </motion.a>
                  )}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '10px 15px', borderRadius: '15px', borderBottomLeftRadius: '2px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <motion.div style={{ display: 'flex', gap: '4px' }}>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: '6px', height: '6px', background: 'var(--accent-color)', borderRadius: '50%' }}></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: '6px', height: '6px', background: 'var(--accent-color)', borderRadius: '50%' }}></motion.div>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: '6px', height: '6px', background: 'var(--accent-color)', borderRadius: '50%' }}></motion.div>
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} style={{ display: 'flex', padding: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me something..."
                style={{ flex: 1, padding: '10px 15px', borderRadius: '20px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none', marginRight: '10px', fontSize: '0.9rem' }}
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit" 
                style={{ background: 'var(--accent-color)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: 'black', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 10px rgba(56,189,248,0.4)' }}
              >
                <FaPaperPlane size={14} style={{ marginLeft: '-2px' }} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000,
          width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-color)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
          boxShadow: '0 0 20px rgba(56,189,248,0.5)', color: 'black'
        }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
      </motion.div>
    </>
  );
};

export default Chatbot;
