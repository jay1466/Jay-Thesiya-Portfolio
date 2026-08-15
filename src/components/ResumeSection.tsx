import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Printer, CheckCircle2, ArrowUpRight, Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATIONS, PROJECTS, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

export const ResumeSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handlePrint = () => {
    window.open(PERSONAL_INFO.resumeUrl, '_blank');
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = 'Jay_Thesiya_Resume.pdf';
    link.click();
  };

  return (
    <section
      id="resume"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 mb-3"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ originX: 0 }}
              className="h-[2px] w-6 bg-indigo-500 inline-block"
            />
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
              // SECTION 07
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="overflow-hidden py-1">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1]"
                >
                  MY RESUME.
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-3 text-xs sm:text-sm font-mono text-zinc-400 max-w-2xl leading-relaxed"
              >
                A concise professional summary focused on Java Backend Development, Spring Boot, REST APIs, databases, cloud, and software engineering.
              </motion.p>
            </div>

            {/* Action Buttons with magnetic interactions */}
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                id="download-resume-btn"
                onClick={handleDownload}
                className="px-5 py-3 bg-white text-black font-mono text-xs font-bold tracking-wider uppercase hover:bg-zinc-200 shadow-lg shadow-white/5 gap-2"
              >
                <Download size={15} />
                <span>{downloadSuccess ? 'PRINTING RESUME...' : 'DOWNLOAD RESUME'}</span>
              </MagneticButton>

              <MagneticButton
                id="print-resume-btn"
                onClick={handlePrint}
                className="px-5 py-3 border border-zinc-800 bg-zinc-950/80 text-zinc-200 hover:text-white hover:border-zinc-600 font-mono text-xs tracking-wider gap-2"
              >
                <Printer size={15} />
                <span>PRINT / PDF VIEW</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Resume Preview Paper Container */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#09090d] border border-zinc-800 rounded-sm p-6 sm:p-10 shadow-2xl space-y-8"
        >
          {/* Header Contact Block */}
          <div className="pb-6 border-b border-zinc-850 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-sm font-mono text-indigo-400 font-semibold mt-1">
                {PERSONAL_INFO.title} • Software Engineer
              </p>
            </div>

            <div className="flex flex-wrap gap-y-1.5 gap-x-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-zinc-500" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={13} className="text-zinc-500" />
                {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={13} className="text-zinc-500" />
                {PERSONAL_INFO.phone}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-indigo-500" />
              Professional Summary
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Briefcase size={14} className="text-indigo-400" />
              Work & Internship Experience
            </h4>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <motion.div
                  key={exp.id}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-zinc-950 border border-zinc-850/80 rounded-sm hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="text-sm font-bold text-white">
                      {exp.role} — <span className="text-indigo-400 font-medium">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                    {exp.description[0]}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {exp.technologies.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Core Competencies Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-850">
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap size={14} className="text-indigo-400" />
                Education
              </h4>
              <div className="space-y-3">
                {EDUCATIONS.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-semibold text-zinc-200">{edu.degree}</div>
                    <div className="text-zinc-400 font-mono">{edu.institution} ({edu.period})</div>
                    <div className="text-indigo-400 font-mono mt-0.5">{edu.gradeLabel}: {edu.grade}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <Code size={14} className="text-indigo-400" />
                Core Skill Summary
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-zinc-400 font-mono">Languages & Frameworks: </span>
                  <span className="text-zinc-300">Java, Spring Boot, Spring Security, Hibernate, React</span>
                </div>
                <div>
                  <span className="text-zinc-400 font-mono">Databases: </span>
                  <span className="text-zinc-300">PostgreSQL, MySQL, MongoDB, Redis</span>
                </div>
                <div>
                  <span className="text-zinc-400 font-mono">Tools & Cloud: </span>
                  <span className="text-zinc-300">Docker, Git, Maven, AWS, Postman, Linux</span>
                </div>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
