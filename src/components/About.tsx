import React from 'react';
import { motion } from 'motion/react';
import { Server, Code2, Database, Shield, Activity, Compass, Headphones, Cpu, Camera, Gamepad2, Award } from 'lucide-react';
import { PERSONAL_INFO, STATS } from '../data/portfolioData';
import { CountUp } from './CountUp';
import { SplitLeft, SplitRight } from './SplitSection';

export const About: React.FC = () => {
  const getHobbyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity size={14} className="text-zinc-400" />;
      case 'Compass': return <Compass size={14} className="text-zinc-400" />;
      case 'Headphones': return <Headphones size={14} className="text-zinc-400" />;
      case 'Cpu': return <Cpu size={14} className="text-zinc-400" />;
      case 'Camera': return <Camera size={14} className="text-zinc-400" />;
      case 'Gamepad2': return <Gamepad2 size={14} className="text-zinc-400" />;
      default: return <Activity size={14} className="text-zinc-400" />;
    }
  };

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Main Grid - Split Dual Convergence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          
          {/* Left Wing: Title & Identity (4 cols - glides from Left) */}
          <SplitLeft className="lg:col-span-4">
            {/* 1. Section Number & Line */}
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ originX: 0 }}
                className="h-[2px] w-6 bg-indigo-500 inline-block"
              />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                // SECTION 01
              </span>
            </div>
            
            {/* 2. Heading */}
            <div className="overflow-hidden py-1">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1]">
                WHO I AM.
              </h2>
            </div>

            {/* 3. Subtitle */}
            <p className="mt-3 text-xs font-mono text-zinc-400">
              Identity & Technical Philosophy
            </p>
          </SplitLeft>

          {/* Right Wing: Bio & Core Philosophy Cards (8 cols - glides from Right) */}
          <SplitRight className="lg:col-span-8 space-y-6">
            {/* Main Bio Container Card with subtle hover */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 bg-[#0a0a0e] border border-zinc-850 rounded-sm shadow-lg hover:border-zinc-700 transition-colors"
            >
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-white font-semibold">Passionate Java Backend Developer and IT student</strong> dedicated to engineering robust, scalable server-side architectures. I specialize in translating complex business requirements into clean, performant code. My approach is rooted in precision, leveraging modern Java ecosystems, Spring Boot microservices, and distributed cloud databases to build high-availability systems.
              </p>
              
              <div className="mt-6 pt-6 border-t border-zinc-850 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider">// ACADEMIC STATUS</span>
                  <span className="text-zinc-200 mt-1 block">B.Tech IT @ CGPIT (2022 - 2026)</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider">// CORE EXPERTISE</span>
                  <span className="text-zinc-200 mt-1 block">Java 21, Spring Boot, REST APIs</span>
                </div>
              </div>
            </motion.div>

            {/* Core Pillars / Technical Mindset Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-[#0a0a0e] border border-zinc-850 rounded-sm hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm font-mono mb-2">
                  <Server size={15} className="text-indigo-400" />
                  <span>Microservices Architecture</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Decoupled, containerized services with Spring Cloud, Eureka discovery, resilient circuit breakers, and distributed tracing.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-[#0a0a0e] border border-zinc-850 rounded-sm hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm font-mono mb-2">
                  <Shield size={15} className="text-emerald-400" />
                  <span>Security & Authentication</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Enterprise-grade security using Spring Security 6, stateless JWT tokenization, RBAC access controls, and OAuth2.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-[#0a0a0e] border border-zinc-850 rounded-sm hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm font-mono mb-2">
                  <Database size={15} className="text-sky-400" />
                  <span>Relational & NoSQL Optimization</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Advanced schema indexing, Hibernate second-level caching, Redis memory layers, and ACID-compliant transaction safety.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-[#0a0a0e] border border-zinc-850 rounded-sm hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-xs sm:text-sm font-mono mb-2">
                  <Code2 size={15} className="text-amber-400" />
                  <span>Algorithms & Problem Solving</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Rigorous algorithmic approach to data structures, memory constraints, time complexity analysis, and concurrency.
                </p>
              </motion.div>
            </div>
          </SplitRight>

        </div>

        {/* Dynamic Key Performance Statistics Counters with Split Entrances */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <SplitLeft className="grid grid-cols-2 gap-4">
            {STATS.slice(0, 2).map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 bg-[#0a0a0e] border border-zinc-850 rounded-sm flex flex-col justify-between hover:border-zinc-700 transition-colors group shadow-sm"
              >
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-1">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.6}
                    className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight group-hover:text-indigo-200 transition-colors"
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-2 block">
                  {stat.subtext}
                </span>
              </motion.div>
            ))}
          </SplitLeft>

          <SplitRight className="grid grid-cols-2 gap-4">
            {STATS.slice(2, 4).map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 bg-[#0a0a0e] border border-zinc-850 rounded-sm flex flex-col justify-between hover:border-zinc-700 transition-colors group shadow-sm"
              >
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-1">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1.6}
                    className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight group-hover:text-indigo-200 transition-colors"
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 mt-2 block">
                  {stat.subtext}
                </span>
              </motion.div>
            ))}
          </SplitRight>
        </div>

        {/* Beyond The Code / Personal Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 bg-[#08080c] border border-zinc-850 rounded-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              // BEYOND THE TERMINAL • INTERESTS
            </span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {PERSONAL_INFO.hobbies.map((hobby) => (
              <motion.div
                key={hobby.name}
                whileHover={{ y: -2 }}
                className="px-3.5 py-2 bg-zinc-950 border border-zinc-850 text-zinc-300 text-xs font-mono flex items-center gap-2 rounded-sm hover:border-zinc-600 transition-colors"
              >
                {getHobbyIcon(hobby.icon)}
                <span>{hobby.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
