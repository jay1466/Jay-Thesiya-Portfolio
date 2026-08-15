import React from 'react';
import { motion } from 'motion/react';
import { EDUCATIONS } from '../data/portfolioData';
import { TiltCard } from './TiltCard';
import { SplitLeft, SplitRight } from './SplitSection';

export const Education: React.FC = () => {
  return (
    <section
      id="academics"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading (4 cols, sticky on desktop - reveals from Left) */}
          <SplitLeft className="lg:col-span-4 lg:sticky lg:top-28">
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
                // SECTION 03
              </span>
            </div>
            
            <div className="overflow-hidden py-1">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1]">
                ACADEMIC<br className="hidden sm:inline" />S.
              </h2>
            </div>

            <p className="mt-3 text-xs font-mono text-zinc-400">
              Formal Degree, Coursework & Academic Foundations
            </p>
          </SplitLeft>

          {/* Right Column: Academic Cards (8 cols - reveals from Right) */}
          <SplitRight className="lg:col-span-8 space-y-6">
            
            <div className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-4">
              // EDUCATION MILESTONES
            </div>

            {EDUCATIONS.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard
                  className="border border-zinc-850 hover:border-zinc-700 transition-colors shadow-md"
                  glowColor="rgba(99, 102, 241, 0.12)"
                >
                  <div className="p-6">
                    {/* Degree & Year header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 border border-zinc-850">
                        {edu.period}
                      </span>
                    </div>

                    {/* Institution & Location */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-indigo-400 mb-4">
                      <span className="font-semibold">{edu.institution}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-400">{edu.location}</span>
                    </div>

                    {/* Academic Highlights */}
                    <p className="text-xs sm:text-sm text-zinc-300 mb-4 leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Grade and Coursework tags */}
                    <div className="pt-3 border-t border-zinc-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 uppercase">{edu.gradeLabel}:</span>
                        <span className="text-white font-bold px-2 py-0.5 bg-zinc-900 border border-zinc-850">
                          {edu.grade}
                        </span>
                      </div>

                      {edu.coursework && (
                        <div className="flex flex-wrap gap-1">
                          {edu.coursework.map((course) => (
                            <span
                              key={course}
                              className="px-2 py-0.5 text-[10px] text-zinc-400 bg-zinc-950 border border-zinc-850"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}

          </SplitRight>

        </div>
      </div>
    </section>
  );
};
