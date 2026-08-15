import React from 'react';
import { motion } from 'motion/react';
import { Server, Database, Wrench, Terminal, Layers, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SectionHeading } from './SectionHeading';
import { TiltCard } from './TiltCard';
import { SplitLeft, SplitRight } from './SplitSection';

export const Skills: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'backend': return <Server size={14} className="text-indigo-400" />;
      case 'databases': return <Database size={14} className="text-sky-400" />;
      case 'tools-devops': return <Wrench size={14} className="text-emerald-400" />;
      case 'frontend-core': return <Code2 size={14} className="text-purple-400" />;
      default: return <Terminal size={14} className="text-zinc-400" />;
    }
  };

  const getGlowColor = (id: string) => {
    switch (id) {
      case 'backend': return 'rgba(99, 102, 241, 0.14)';
      case 'databases': return 'rgba(56, 189, 248, 0.14)';
      case 'tools-devops': return 'rgba(52, 211, 153, 0.14)';
      case 'frontend-core': return 'rgba(192, 132, 252, 0.14)';
      default: return 'rgba(255, 255, 255, 0.08)';
    }
  };

  const renderSkillCard = (cat: typeof SKILL_CATEGORIES[0], idx: number) => (
    <div key={cat.id} className="h-full">
      <TiltCard
        className="h-full border border-zinc-850 hover:border-zinc-700 shadow-md"
        glowColor={getGlowColor(cat.id)}
      >
        <div className="p-6 h-full flex flex-col justify-between">
          <div>
            {/* Category Header */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-zinc-850">
              <div className="flex items-center gap-2">
                {getCategoryIcon(cat.id)}
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {cat.name}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                [{cat.skills.length}]
              </span>
            </div>

            {/* Individual Skill Progress Items */}
            <div className="space-y-4">
              {cat.skills.map((skill, sIdx) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-zinc-400 text-[11px]">
                      {skill.proficiency}%
                    </span>
                  </div>

                  {/* Smooth Progress Bar */}
                  <div className="h-1.5 w-full bg-zinc-950 rounded-none overflow-hidden border border-zinc-850">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: skill.proficiency / 100 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.15 + (idx * 0.08) + (sIdx * 0.04),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ originX: 0 }}
                      className={`h-full ${
                        cat.id === 'backend'
                          ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]'
                          : cat.id === 'databases'
                          ? 'bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                          : cat.id === 'tools-devops'
                          ? 'bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                          : 'bg-purple-500 shadow-[0_0_8px_rgba(192,132,252,0.5)]'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card Footer Tagline */}
          <div className="mt-6 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-400">
            // ACTIVE IN PRODUCTION & DSA
          </div>
        </div>
      </TiltCard>
    </div>
  );

  return (
    <section
      id="skills"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <SectionHeading
          number="// SECTION 05"
          title="TECHNICAL ARSENAL."
          subtitle="A quantifiable breakdown of core competencies, heavily weighted towards backend architecture, robust data layer management, and deployment automation."
        />

        {/* Skill Category Cards Grid Divided into Left & Right Wings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Wing (Backend & Databases) */}
          <SplitLeft className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {SKILL_CATEGORIES.slice(0, 2).map((cat, idx) => renderSkillCard(cat, idx))}
          </SplitLeft>

          {/* Right Wing (DevOps/Tools & Frontend/Core) */}
          <SplitRight className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {SKILL_CATEGORIES.slice(2, 4).map((cat, idx) => renderSkillCard(cat, idx + 2))}
          </SplitRight>
        </div>

      </div>
    </section>
  );
};

