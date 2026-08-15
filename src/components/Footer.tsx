import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#050507] text-zinc-400 font-mono text-xs"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright */}
        <div className="text-center md:text-left text-zinc-400">
          © 2026 Jay Thesiya. <span className="text-zinc-400">Built with Java & Backend Precision.</span>
        </div>

        {/* Center: Brand Monogram & Name */}
        <div className="flex items-center gap-2 text-zinc-300 font-semibold tracking-widest uppercase">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -1 }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            JAY THESIYA
          </motion.button>
        </div>

        {/* Right: Social Links & Back To Top */}
        <div className="flex items-center gap-6 text-zinc-400">
          <motion.a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            GitHub
          </motion.a>
          <motion.a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            LinkedIn
          </motion.a>
          <motion.a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            LeetCode
          </motion.a>
          <motion.a
            href={`mailto:${PERSONAL_INFO.email}`}
            whileHover={{ y: -2 }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Email
          </motion.a>
          
          <motion.button
            id="footer-back-to-top"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors ml-2 cursor-pointer"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp size={13} />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};
