'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useRef } from 'react';

const projects = [
  {
    title: 'Network Security Framework',
    description: 'Developed a comprehensive network security framework implementing advanced threat detection and prevention mechanisms.',
    technologies: ['Python', 'Docker', 'Kubernetes', 'ELK Stack'],
    github: '#',
    demo: '#',
    image: '/project1.jpg',
    color: 'cyan'
  },
  {
    title: 'Secure Authentication System',
    description: 'Built a multi-factor authentication system with biometric verification and secure session management.',
    technologies: ['Node.js', 'React', 'MongoDB', 'JWT'],
    github: '#',
    demo: '#',
    image: '/project2.jpg',
    color: 'purple'
  },
  {
    title: 'Threat Intelligence Platform',
    description: 'Created a real-time threat intelligence platform for monitoring and analyzing security threats.',
    technologies: ['Python', 'TensorFlow', 'PostgreSQL', 'Redis'],
    github: '#',
    demo: '#',
    image: '/project3.jpg',
    color: 'pink'
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden" ref={containerRef}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900"
        style={{ y, opacity }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            Showcasing my expertise in cybersecurity solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg overflow-hidden backdrop-blur-sm border border-gray-700/50"
            >
              <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 text-sm bg-gray-700/50 rounded-full text-gray-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub className="mr-2" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.1, x: 5 }}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Demo
                  </motion.a>
                </div>
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
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
} 