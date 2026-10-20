import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { CODING_PROFILES, PERSONAL_INFO, SOCIAL_PROFILES, SUPPORT_PROFILES } from '../data/portfolioData';
import {
  getBrowserName,
  getDeviceType,
  getLanguage,
  getReferrer,
  getScreenResolution,
  getSourceUrl,
  getSubmissionDateTime,
  getTimezone,
  getUserLocation,
} from '../utils/contactHelpers';
import { Reveal } from './Reveal';

const PROFILE_LINKS = [
  ...CODING_PROFILES.map(p => ({ id: p.id, name: p.name, url: p.url })),
  ...SOCIAL_PROFILES.filter(p => ['linkedin', 'whatsapp', 'instagram'].includes(p.id))
    .map(p => ({ id: p.id, name: p.name, url: p.url })),
  ...SUPPORT_PROFILES.map(p => ({ id: p.id, name: p.name, url: p.url })),
];

const Field: React.FC<{
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}> = ({ id, label, required, error, children }) => (
  <div>
    <label htmlFor={id} className="label block">
      {label}{required && <span className="text-[var(--accent-ink)]"> *</span>}
    </label>
    {children}
    {error && <p id={`${id}-error`} className="mt-2 text-sm text-[var(--accent-ink)]">{error}</p>}
  </div>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    emailjs.init('AfP6Qdzg7VDFpN-8h');
  }, []);

  const set = (key: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 8) {
      errors.message = 'Message should be at least 8 characters.';
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

    let lastSubmission: string | null = null;
    try { lastSubmission = localStorage.getItem('lastSubmissionTime'); } catch { /* storage unavailable */ }
    if (lastSubmission && Date.now() - parseInt(lastSubmission, 10) < 60000) {
      setFormErrors({ _global: 'Please wait 60 seconds before sending another message.' });
      return;
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
      try { localStorage.setItem('lastSubmissionTime', Date.now().toString()); } catch { /* storage unavailable */ }
      setSubmitStatus('success');
      setFormErrors({});
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormErrors({ _global: 'Something went wrong sending that. Please try again, or email me directly.' });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const errorProps = (key: string) =>
    formErrors[key] ? { 'aria-invalid': true as const, 'aria-describedby': `contact-${key}-error` } : {};

  return (
    <section id="contact" className="wrap pt-20 md:pt-32 pb-16">
      <Reveal className="grid-12 rule pt-4 mb-10 md:mb-16">
        <span className="label col-span-1">(07)</span>
        <span className="label col-span-3">Contact</span>
      </Reveal>

      <Reveal>
        <h2 className="display text-[clamp(3.2rem,11vw,12rem)]">
          Let’s <span className="serif">talk</span><span className="text-[var(--accent)]">.</span>
        </h2>
        <div className="mt-8 md:mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-3">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-[clamp(1.35rem,4vw,3.2rem)] font-medium tracking-[-0.03em] u-link break-all"
          >
            {PERSONAL_INFO.email}
          </a>
          <button onClick={handleCopyEmail} className="label !text-[var(--ink)] u-link cursor-pointer" aria-live="polite">
            {copiedEmail ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </Reveal>

      <div className="grid-12 gap-y-16 mt-20 md:mt-32">
        {/* ── Form ── */}
        <Reveal className="col-span-4 md:col-span-7">
          <p className="label mb-8">Or leave a message — I usually reply within a day.</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-8 relative">
            {/* Honeypot (hidden from humans) */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label htmlFor="honeypot">Leave this field empty</label>
              <input type="text" id="honeypot" name="honeypot" value={formData.honeypot} onChange={set('honeypot')} tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <Field id="contact-name" label="Name" required error={formErrors.name}>
                <input id="contact-name" className="field" autoComplete="name" placeholder="Your name" value={formData.name} onChange={set('name')} {...errorProps('name')} />
              </Field>
              <Field id="contact-email" label="Email" required error={formErrors.email}>
                <input id="contact-email" type="email" className="field" autoComplete="email" placeholder="you@company.com" value={formData.email} onChange={set('email')} {...errorProps('email')} />
              </Field>
            </div>
            <Field id="contact-subject" label="Subject">
              <input id="contact-subject" className="field" placeholder="Role, project, or just hello" value={formData.subject} onChange={set('subject')} />
            </Field>
            <Field id="contact-message" label="Message" required error={formErrors.message}>
              <textarea id="contact-message" rows={4} className="field resize-y min-h-[120px]" placeholder="Tell me a bit about it…" value={formData.message} onChange={set('message')} {...errorProps('message')} />
            </Field>

            {formErrors._global && <p role="alert" className="text-[var(--accent-ink)]">{formErrors._global}</p>}
            {submitStatus === 'success' && (
              <p role="status" className="text-lg">Thanks — message received. I’ll be in touch soon.</p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-ink w-full sm:w-auto sm:min-w-[220px] justify-between">
              {isSubmitting ? 'Sending…' : 'Send message'} <span aria-hidden>→</span>
            </button>
          </form>
        </Reveal>

        {/* ── Details ── */}
        <Reveal delay={0.08} className="col-span-4 md:col-start-9 md:col-span-4 space-y-10">
          <div>
            <p className="label mb-3">Elsewhere</p>
            <ul className="border-b border-[var(--rule)]">
              {PROFILE_LINKS.map(p => (
                <li key={p.id} className="rule">
                  <a href={p.url} target="_blank" rel="noreferrer" className="row-hover group flex justify-between py-3 px-1">
                    <span className="text-lg">{p.name}</span>
                    <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="label mb-2">Phone</p>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`} className="u-link">{PERSONAL_INFO.phone}</a>
            </div>
            <div>
              <p className="label mb-2">Location</p>
              <p>{PERSONAL_INFO.location}</p>
            </div>
          </div>
          <a id="resume" href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" className="btn-ink w-full justify-between">
            Download résumé (PDF) <span aria-hidden>↓</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};
