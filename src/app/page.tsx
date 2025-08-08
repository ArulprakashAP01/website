'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaShieldAlt, FaCode, FaLock, FaUserSecret, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { useRef, useState, useEffect } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function Home() {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Generate particles only on client-side
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <main className="min-h-screen" ref={containerRef}>
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
            >
              ARUL PRAKASH R
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.1, color: '#06b6d4' }}
                  className="text-gray-300 hover:text-cyan-500 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"
          style={{ y, opacity }}
        />
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
              animate={{
                backgroundPosition: ["0%", "100%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              ARUL PRAKASH R
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Cybersecurity Expert & Full Stack Developer
            </motion.p>
            
            {/* Social Links */}
            <motion.div 
              className="flex justify-center space-x-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-2xl text-gray-400 hover:text-cyan-500"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-2xl text-gray-400 hover:text-blue-500"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-2xl text-gray-400 hover:text-purple-500"
              >
                <FaTwitter />
              </motion.a>
            </motion.div>

            {/* Animated Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center space-x-6"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg backdrop-blur-sm"
              >
                <FaShieldAlt className="text-4xl text-cyan-500" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm"
              >
                <FaCode className="text-4xl text-purple-500" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg backdrop-blur-sm"
              >
                <FaLock className="text-4xl text-blue-500" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm"
              >
                <FaUserSecret className="text-4xl text-pink-500" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-cyan-500 rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
