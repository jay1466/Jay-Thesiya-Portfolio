import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from 'emailjs-com';
import {
  Send, CheckCircle2, AlertCircle, Github, Linkedin,
  Mail, Phone, MapPin, Copy, Check, Terminal, Sparkles, ArrowUpRight,
} from 'lucide-react';
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

/* ── Styled input ───────────────────────────────────────────────── */
const GlassInput: React.FC<{
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
}> = ({ id, label, required, type = 'text', value, onChange, placeholder, error, textarea, rows = 4 }) => {
  const [focused, setFocused] = useState(false);
  const baseStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    background: focused
      ? 'rgba(34,211,238,0.04)'
      : 'rgba(20,26,41,0.7)',
    border: `1px solid ${error ? '#f43f5e' : focused ? 'var(--accent-cyan)' : 'rgba(34,211,238,0.15)'}`,
    borderRadius: '10px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    outline: 'none',
    transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
    boxShadow: focused
      ? `0 0 0 1px rgba(34,211,238,0.2), 0 0 20px rgba(34,211,238,0.08), inset 0 0 10px rgba(34,211,238,0.03)`
      : 'none',
    resize: 'none' as const,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-mono uppercase tracking-widest mb-2"
        style={{ color: focused ? 'var(--accent-cyan)' : 'var(--text-muted)', transition: 'color 0.3s' }}
      >
        {label}
        {required && <span style={{ color: 'var(--accent-cyan)' }}> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
      {error && (
        <p className="text-[11px] mt-1.5 flex items-center gap-1" style={{ color: '#f43f5e' }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
};

/* ── Contact link row ───────────────────────────────────────────── */
const ContactLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
  color?: string;
  external?: boolean;
  action?: React.ReactNode;
}> = ({ href, icon, label, color = 'var(--accent-cyan)', external, action }) => (
  <motion.div
    whileHover={{ x: 4 }}
    className="flex items-center gap-3 group"
  >
    <span
      className="p-2 rounded-lg transition-all duration-300"
      style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.12)' }}
    >
      {React.cloneElement(icon as React.ReactElement, {
        size: 14,
        style: { color },
      })}
    </span>
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="text-xs font-mono transition-colors"
      style={{ color: 'var(--text-secondary)' }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = color}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
    >
      {label}
    </a>
    {action}
    {external && (
      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" style={{ color }} />
    )}
  </motion.div>
);

/* ── Contact Section ────────────────────────────────────────────── */
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
    emailjs.init('AfP6Qdzg7VDFpN-8h');
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
    if (formData.honeypot.trim() !== '') {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      return;
    }
    const lastSubmission = localStorage.getItem('lastSubmissionTime');
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
        from_name: formData.name || 'Unknown Name',
        user_email: formData.email || 'Unknown Email',
        subject: formData.subject || 'No Subject',
        message: formData.message || 'No Message',
        submission_date: date || 'Unknown Date',
        submission_time: time || 'Unknown Time',
        user_location: userLocation || 'Unknown Location',
        browser: getBrowserName() || 'Unknown Browser',
        device: getDeviceType() || 'Unknown Device',
        timezone: getTimezone() || 'Unknown Timezone',
        language: getLanguage() || 'Unknown Language',
        referrer: getReferrer() || 'Direct / Unknown',
        source_url: getSourceUrl() || 'Unknown URL',
        screen_resolution: getScreenResolution() || 'Unknown Resolution',
      };
      await emailjs.send('service_v8o1v3w', 'template_759k908', payload);
      localStorage.setItem('lastSubmissionTime', Date.now().toString());
      setSubmitStatus('success');
      setFormErrors({});
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-x-clip"
    >
      <div className="section-separator mb-16" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left: Heading + contact info ── */}
          <SplitLeft className="lg:col-span-6">

            {/* Section number */}
            <div className="flex items-center gap-2 mb-4">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                style={{
                  originX: 0,
                  display: 'inline-block',
                  height: '2px',
                  width: '28px',
                  background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))',
                  borderRadius: '2px',
                  boxShadow: '0 0 8px rgba(34,211,238,0.5)',
                }}
              />
              <span
                className="text-[11px] font-mono tracking-widest uppercase font-semibold"
                style={{ color: 'var(--accent-cyan)' }}
              >
                // SECTION 09
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase font-display leading-[1.05] mb-3">
              INITIALIZE<br className="hidden sm:inline" />{' '}
              <span className="gradient-text">CONNECTION.</span>
            </h2>

            <p className="text-sm sm:text-base leading-relaxed mb-10 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              Whether you have a complex backend challenge, an internship or full-time engineering
              opportunity, or simply want to discuss Java optimization and distributed systems —
              my inbox is open.
            </p>

            {/* Contact links */}
            <div className="space-y-3 mb-10">
              <ContactLink
                href={PERSONAL_INFO.github}
                icon={<Github />}
                label={`github.com/${PERSONAL_INFO.githubUsername}`}
                color="var(--text-primary)"
                external
              />
              <ContactLink
                href={PERSONAL_INFO.linkedin}
                icon={<Linkedin />}
                label={`linkedin.com/in/${PERSONAL_INFO.linkedinUsername}`}
                color="#0a66c2"
                external
              />
              <ContactLink
                href={`mailto:${PERSONAL_INFO.email}`}
                icon={<Mail />}
                label={PERSONAL_INFO.email}
                color="var(--accent-cyan)"
                action={
                  <motion.button
                    onClick={handleCopyEmail}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 rounded transition-colors cursor-pointer"
                    style={{ color: copiedEmail ? '#10b981' : 'var(--text-muted)' }}
                    title="Copy email"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? <Check size={13} /> : <Copy size={13} />}
                  </motion.button>
                }
              />
              <div className="flex items-center gap-3">
                <span
                  className="p-2 rounded-lg"
                  style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.12)' }}
                >
                  <Phone size={14} style={{ color: 'var(--text-muted)' }} />
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {PERSONAL_INFO.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="p-2 rounded-lg"
                  style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.12)' }}
                >
                  <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 15px rgba(16,185,129,0.1)',
                  '0 0 30px rgba(16,185,129,0.2), 0 0 60px rgba(34,211,238,0.08)',
                  '0 0 15px rgba(16,185,129,0.1)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-mono"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.25)',
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" style={{ boxShadow: '0 0 8px #10b981' }} />
              </span>
              <span style={{ color: '#10b981' }}>STATUS: OPEN FOR NEW OPPORTUNITIES & COLLABORATIONS</span>
            </motion.div>

          </SplitLeft>

          {/* ── Right: Glass terminal form ── */}
          <SplitRight className="lg:col-span-6">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(6,6,18,0.88)',
                border: '1px solid rgba(34,211,238,0.18)',
                boxShadow: '0 0 60px rgba(34,211,238,0.08), 0 0 120px rgba(139,92,246,0.05), 0 24px 80px rgba(0,0,0,0.7)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
              }}
            >
              {/* Terminal titlebar */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{
                  background: 'rgba(34,211,238,0.04)',
                  borderColor: 'rgba(34,211,238,0.12)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/70" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  <Terminal size={11} style={{ color: 'var(--accent-cyan)' }} />
                  <span className="gradient-text font-semibold">POST /api/v1/contact/send</span>
                </div>
                <Sparkles size={12} style={{ color: 'var(--accent-violet)', opacity: 0.6 }} />
              </div>

              {/* Prompt line */}
              <div
                className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-mono border-b"
                style={{ background: 'rgba(10,14,23,0.4)', borderColor: 'rgba(255,255,255,0.04)' }}
              >
                <span style={{ color: 'var(--accent-cyan)' }}>root@thesiya:~$</span>
                <span className="text-white">initialize_contact_protocol.sh</span>
                <span className="animate-blink" style={{ color: 'var(--accent-cyan)' }}>|</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5" noValidate>

                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                  <label htmlFor="honeypot">Leave this field empty if you are human</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Global error */}
                <AnimatePresence>
                  {formErrors._global && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded-xl text-xs flex items-center gap-3"
                      style={{
                        background: 'rgba(244,63,94,0.08)',
                        border: '1px solid rgba(244,63,94,0.3)',
                        color: '#f87171',
                      }}
                    >
                      <AlertCircle size={16} className="flex-shrink-0" style={{ color: '#f43f5e' }} />
                      <div>
                        <p className="font-bold font-mono">HTTP 429 / 500: Error</p>
                        <p className="text-[11px] mt-0.5 opacity-80">{formErrors._global}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3.5 rounded-xl text-xs flex items-center gap-3"
                      style={{
                        background: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#6ee7b7',
                      }}
                    >
                      <CheckCircle2 size={16} className="flex-shrink-0" style={{ color: '#10b981' }} />
                      <div>
                        <p className="font-bold font-mono">HTTP 200: Message Dispatched Successfully</p>
                        <p className="text-[11px] mt-0.5 opacity-80">Thank you. I have received your message and will respond promptly.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <GlassInput
                    id="contact-name"
                    label="sender_name"
                    required
                    value={formData.name}
                    onChange={v => setFormData({ ...formData, name: v })}
                    placeholder="e.g. Alex Mercer"
                    error={formErrors.name}
                  />
                  <GlassInput
                    id="contact-email"
                    label="sender_email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={v => setFormData({ ...formData, email: v })}
                    placeholder="e.g. alex@company.com"
                    error={formErrors.email}
                  />
                </div>

                <GlassInput
                  id="contact-subject"
                  label="message_subject"
                  value={formData.subject}
                  onChange={v => setFormData({ ...formData, subject: v })}
                  placeholder="e.g. Backend Developer Role / Project Discussion"
                />

                <GlassInput
                  id="contact-message"
                  label="payload_body"
                  required
                  textarea
                  rows={4}
                  value={formData.message}
                  onChange={v => setFormData({ ...formData, message: v })}
                  placeholder="Write your message or inquiry here..."
                  error={formErrors.message}
                />

                {/* Submit */}
                <MagneticButton
                  id="submit-contact-btn"
                  onClick={() => {}}
                  className="w-full py-3.5 rounded-xl btn-primary flex items-center justify-center gap-2.5 text-xs font-mono font-black tracking-wider"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    <Send size={13} className={isSubmitting ? 'animate-bounce' : ''} />
                    {isSubmitting ? 'DISPATCHING PAYLOAD...' : 'TRANSMIT MESSAGE'}
                  </span>
                </MagneticButton>

              </form>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-5 py-2.5 border-t text-[10px] font-mono"
                style={{ background: 'rgba(34,211,238,0.02)', borderColor: 'rgba(34,211,238,0.08)', color: 'var(--text-muted)' }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 6px #10b981' }} />
                  <span>encrypted_channel: active</span>
                </span>
                <span className="gradient-text font-bold">///</span>
              </div>
            </div>
          </SplitRight>

        </div>
      </div>
      <div className="section-separator mt-16" />
    </section>
  );
};
