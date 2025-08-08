'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Skill {
  id: number;
  name: string;
  level: number;
  icon: string;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

const skills: Skill[] = [
  { id: 1, name: 'Network Security', level: 90, icon: '🛡️', color: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Penetration Testing', level: 85, icon: '🔍', color: 'from-purple-500 to-pink-500' },
  { id: 3, name: 'Malware Analysis', level: 80, icon: '🦠', color: 'from-red-500 to-orange-500' },
  { id: 4, name: 'Cryptography', level: 75, icon: '🔐', color: 'from-green-500 to-emerald-500' },
  { id: 5, name: 'Security Architecture', level: 85, icon: '🏗️', color: 'from-indigo-500 to-blue-500' },
  { id: 6, name: 'Incident Response', level: 80, icon: '🚨', color: 'from-yellow-500 to-orange-500' },
];

export default function Skills() {
  const [particles, setParticles] = useState<Particle[]>([]);

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
    <section id="skills" className="min-h-screen py-20 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Technical Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{skill.icon}</span>
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              </div>
              <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="mt-2 text-right text-sm text-gray-400">
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </div>
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
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
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
  );
} 