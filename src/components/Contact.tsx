import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from 'emailjs-com';
import { Send, CheckCircle2, AlertCircle, Github, Linkedin, Mail, Phone, MapPin, Copy, Check, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  getDeviceType,
  getBrowserName,
  getUserLocation,
  getSubmissionDateTime,
  getTimezone,
  getLanguage,
  getReferrer,
  getSourceUrl,
  getScreenResolution,
} from '../utils/contactHelpers';
import { MagneticButton } from './MagneticButton';
import { SplitLeft, SplitRight } from './SplitSection';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    emailjs.init("AfP6Qdzg7VDFpN-8h");
  }, []);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Client identification / name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Valid sender email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Malformed email format.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Payload body / message is required.';
    } else if (formData.message.trim().length < 8) {
      errors.message = 'Message payload should contain at least 8 characters.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check
    if (formData.honeypot.trim() !== '') {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      return;
    }

    // Rate Limiting (60 seconds)
    const lastSubmission = localStorage.getItem("lastSubmissionTime");
    if (lastSubmission) {
      const timeSinceLast = Date.now() - parseInt(lastSubmission, 10);
      if (timeSinceLast < 60000) {
        setFormErrors({ _global: 'Please wait 60 seconds before sending another message.' });
        return;
      }
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const userLocation = await getUserLocation();
      const { date, time } = getSubmissionDateTime();

      const payload = {
        from_name: formData.name || "Unknown Name",
        user_email: formData.email || "Unknown Email",
        subject: formData.subject || "No Subject",
        message: formData.message || "No Message",
        submission_date: date || "Unknown Date",
        submission_time: time || "Unknown Time",
        user_location: userLocation || "Unknown Location",
        browser: getBrowserName() || "Unknown Browser",
        device: getDeviceType() || "Unknown Device",
        timezone: getTimezone() || "Unknown Timezone",
        language: getLanguage() || "Unknown Language",
        referrer: getReferrer() || "Direct / Unknown",
        source_url: getSourceUrl() || "Unknown URL",
        screen_resolution: getScreenResolution() || "Unknown Resolution",
      };

      await emailjs.send(
        "service_v8o1v3w",
        "template_759k908",
        payload
      );

      localStorage.setItem("lastSubmissionTime", Date.now().toString());
      setSubmitStatus('success');
      setFormErrors({});
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormErrors({ _global: 'Failed to send message. Please try again later.' });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-[#060608] overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid with Split Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading & Contact Info (6 cols, reveals from Left) */}
          <SplitLeft className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ originX: 0 }}
                className="h-[2px] w-6 bg-indigo-500 inline-block"
              />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                // SECTION 09
              </span>
            </div>

            <div className="overflow-hidden py-1 mb-4">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.1]">
                INITIALIZE<br className="hidden sm:inline" /> CONNECTION.
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-lg">
              Whether you have a complex backend challenge, an internship or full-time software engineering opportunity, or simply want to discuss Java optimization and distributed systems, my inbox is open.
            </p>

            {/* Direct Connect Links */}
            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <motion.a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-zinc-300 hover:text-white group transition-colors cursor-pointer"
              >
                <span className="text-zinc-500 group-hover:text-indigo-400 transition-colors">&lt;&gt;</span>
                <span>github.com/{PERSONAL_INFO.githubUsername}</span>
              </motion.a>

              <motion.a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-zinc-300 hover:text-white group transition-colors cursor-pointer"
              >
                <Linkedin size={15} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                <span>linkedin.com/in/{PERSONAL_INFO.linkedinUsername}</span>
              </motion.a>

              <div className="flex items-center gap-3 text-zinc-300 group">
                <Mail size={15} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
                <motion.button
                  onClick={handleCopyEmail}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </motion.button>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <Phone size={15} className="text-zinc-500" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={15} className="text-zinc-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="mt-8 inline-flex items-center gap-2 p-3 bg-zinc-950 border border-zinc-850 text-xs font-mono text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-slow" />
              <span>STATUS: OPEN FOR NEW OPPORTUNITIES & COLLABORATIONS</span>
            </div>
          </SplitLeft>

          {/* Right Column: Terminal Form (6 cols, reveals from Right) */}
          <SplitRight className="lg:col-span-6">
            <div className="bg-[#0a0a0e] border border-zinc-800 rounded-sm shadow-2xl overflow-hidden font-mono">
              
              {/* Header */}
              <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700"></span>
                  <span className="text-xs text-zinc-400 ml-2">POST /api/v1/contact/send</span>
                </div>
                <Terminal size={14} className="text-zinc-500" />
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5" noValidate>
                
                {/* Honeypot Field */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                  <label htmlFor="honeypot">Leave this field empty if you are human</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Global Error Message Banner */}
                <AnimatePresence>
                  {formErrors._global && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-sm text-rose-300 text-xs flex items-center gap-3"
                    >
                      <AlertCircle size={16} className="text-rose-400 shrink-0" />
                      <div>
                        <p className="font-bold">HTTP 429 / 500: Error</p>
                        <p className="text-[11px] text-rose-400 mt-0.5">{formErrors._global}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success Message Banner */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-sm text-emerald-300 text-xs flex items-center gap-3"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-bold">HTTP 200: Message Dispatched Successfully</p>
                        <p className="text-[11px] text-emerald-400 mt-0.5">Thank you. I have received your message and will respond promptly.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wide">
                    sender_name <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full px-3.5 py-2.5 bg-zinc-950 border ${
                      formErrors.name ? 'border-rose-500' : 'border-zinc-800 focus:border-white'
                    } text-zinc-200 text-xs rounded-none transition-colors outline-none`}
                  />
                  {formErrors.name && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wide">
                    sender_email <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-3.5 py-2.5 bg-zinc-950 border ${
                      formErrors.email ? 'border-rose-500' : 'border-zinc-800 focus:border-white'
                    } text-zinc-200 text-xs rounded-none transition-colors outline-none`}
                  />
                  {formErrors.email && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wide">
                    message_subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Backend Developer Role / Project Discussion"
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-white text-zinc-200 text-xs rounded-none transition-colors outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs text-zinc-400 mb-1.5 uppercase tracking-wide">
                    payload_body <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message or inquiry here..."
                    className={`w-full px-3.5 py-2.5 bg-zinc-950 border ${
                      formErrors.message ? 'border-rose-500' : 'border-zinc-800 focus:border-white'
                    } text-zinc-200 text-xs rounded-none transition-colors outline-none resize-none`}
                  />
                  {formErrors.message && (
                    <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle size={11} /> {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <MagneticButton
                  id="submit-contact-btn"
                  onClick={(e) => {
                    // form submission handled by form onSubmit
                  }}
                  className="w-full py-3.5 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-zinc-200 shadow-lg shadow-white/5 disabled:opacity-60 gap-2"
                >
                  <Send size={13} className={isSubmitting ? 'animate-bounce' : ''} />
                  <span>{isSubmitting ? 'DISPATCHING PAYLOAD...' : 'TRANSMIT MESSAGE'}</span>
                </MagneticButton>

              </form>
            </div>
          </SplitRight>

        </div>

      </div>
    </section>
  );
};
