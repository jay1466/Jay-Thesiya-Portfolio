import React from 'react';
import { motion } from 'motion/react';
import {
  Linkedin,
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Github,
  Code2,
  Coffee,
  ArrowUpRight,
  ExternalLink,
  Terminal,
} from 'lucide-react';
import { SOCIAL_PROFILES, CODING_PROFILES, SUPPORT_PROFILES } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { SplitLeft, SplitRight } from './SplitSection';

export const SocialProfiles: React.FC = () => {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'linkedin':
        return <Linkedin size={22} className="text-zinc-200 group-hover:text-white transition-colors" />;
      case 'email':
        return <Mail size={22} className="text-zinc-200 group-hover:text-white transition-colors" />;
      case 'whatsapp':
        return <MessageCircle size={22} className="text-zinc-200 group-hover:text-white transition-colors" />;
      case 'instagram':
        return <Instagram size={22} className="text-zinc-200 group-hover:text-white transition-colors" />;
      case 'facebook':
        return <Facebook size={22} className="text-zinc-200 group-hover:text-white transition-colors" />;
      default:
        return <ExternalLink size={22} className="text-zinc-200 group-hover:text-white transition-colors" />;
    }
  };

  const getCodingIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github size={24} className="text-white" />;
      case 'leetcode':
        return <Code2 size={24} className="text-amber-400" />;
      default:
        return <Code2 size={24} className="text-white" />;
    }
  };

  return (
    <section
      id="profiles"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <SectionHeading
          number="// SECTION 08 • DIRECTORY"
          title="PROFILES & SUPPORT."
          subtitle="Direct channels to connect, explore active code repositories, follow problem-solving progress, and support open-source engineering."
        />

        {/* Top 2-Column Block: CONNECT WITH ME (Left) & SEE WHAT I'M DOING (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-14">
          
          {/* Left Column: CONNECT WITH ME (7 cols - reveals from Left) */}
          <SplitLeft className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                // CONNECT WITH ME
              </span>
              <div className="h-[1px] flex-1 bg-zinc-850"></div>
            </div>

            {/* Circular Social Icons Row */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              {SOCIAL_PROFILES.map((profile, idx) => (
                <motion.a
                  key={profile.id}
                  id={`social-link-${profile.id}`}
                  href={profile.url}
                  target={profile.id === 'email' ? undefined : '_blank'}
                  rel={profile.id === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={profile.ariaLabel}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  {/* Dark Circular Container */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-zinc-800 bg-[#0a0a0e] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-zinc-500 group-hover:bg-zinc-900/80 group-hover:shadow-indigo-500/10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getSocialIcon(profile.iconType)}
                    </motion.div>
                  </div>

                  {/* Label underneath */}
                  <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 mt-2.5 transition-colors tracking-wide">
                    {profile.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </SplitLeft>

          {/* Right Column: SEE WHAT I'M DOING (5 cols - reveals from Right) */}
          <SplitRight className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                // SEE WHAT I'M DOING
              </span>
              <div className="h-[1px] flex-1 bg-zinc-850"></div>
            </div>

            {/* Developer / Coding Profiles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {CODING_PROFILES.map((profile, idx) => (
                <motion.a
                  key={profile.id}
                  id={`coding-link-${profile.id}`}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.ariaLabel}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.15 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="p-5 bg-[#0a0a0e] border border-zinc-850 rounded-sm hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-md cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-sm group-hover:border-zinc-700 transition-colors">
                        {getCodingIcon(profile.iconType)}
                      </div>
                      <motion.div
                        whileHover={{ x: 2, y: -2 }}
                        className="text-zinc-500 group-hover:text-zinc-300 transition-colors"
                      >
                        <ArrowUpRight size={15} />
                      </motion.div>
                    </div>

                    <h3 className="text-sm font-bold text-white tracking-tight font-display">
                      {profile.name}
                    </h3>
                    <p className="text-[11px] font-mono text-indigo-400 mt-0.5">
                      @{profile.username}
                    </p>
                  </div>

                  <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                    {profile.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </SplitRight>

        </div>

        {/* Bottom Block: SUPPORT & CODING */}
        <div className="pt-8 border-t border-zinc-900">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
              // SUPPORT & CODING
            </span>
            <div className="h-[1px] flex-1 bg-zinc-850"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Codolio Card - reveals from Left */}
            <SplitLeft>
              <motion.a
                id="support-link-codolio"
                href={SUPPORT_PROFILES[0].url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SUPPORT_PROFILES[0].ariaLabel}
                whileHover={{ y: -3 }}
                className="p-6 bg-[#0a0a0e] border border-zinc-850 rounded-sm hover:border-zinc-700 transition-all flex items-center justify-between group shadow-lg cursor-pointer h-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-zinc-950 border border-zinc-800 flex items-center justify-center text-white font-mono font-bold text-lg group-hover:border-indigo-500/50 transition-colors">
                    <Terminal size={22} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white font-display tracking-tight">
                        Codolio
                      </h3>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-950 border border-zinc-850 text-zinc-400 uppercase">
                        Profile
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {SUPPORT_PROFILES[0].tagline}
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ x: 3 }}
                  className="text-zinc-500 group-hover:text-white transition-colors p-2"
                >
                  <ArrowUpRight size={18} />
                </motion.div>
              </motion.a>
            </SplitLeft>

            {/* 2. Buy Me a Coffee Button / Card - reveals from Right */}
            <SplitRight>
              <motion.a
                id="support-link-buymeacoffee"
                href={SUPPORT_PROFILES[1].url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SUPPORT_PROFILES[1].ariaLabel}
                whileHover={{ y: -3, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 bg-[#FFDD00] text-black border border-[#E6C600] rounded-sm transition-all flex items-center justify-between group shadow-xl shadow-amber-500/10 cursor-pointer h-full"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-black text-amber-300 flex items-center justify-center shadow-md">
                    <Coffee size={22} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black tracking-tight uppercase font-mono">
                        Buy me a coffee
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-900 font-medium mt-0.5">
                      {SUPPORT_PROFILES[1].tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white font-mono text-xs font-bold rounded-sm tracking-wider uppercase group-hover:bg-zinc-900 transition-colors">
                  <span>Support</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
            </SplitRight>

          </div>
        </div>

      </div>
    </section>
  );
};
