export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'FINTECH' | 'SECURITY' | 'ML / NLP' | 'ENTERPRISE' | 'HEALTHCARE' | 'ECOMMERCE';
  featured: boolean;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  documentationUrl?: string;
  imageUrl?: string;
  highlights: string[];
  architecture?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  period: string;
  type: 'Internship' | 'Freelance' | 'Open Source' | 'Full-time';
  description: string[];
  technologies: string[];
  highlightBadge?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  gradeLabel: string;
  description?: string;
  coursework?: string[];
}

export interface SkillCategory {
  id: string;
  sysTag: string;
  name: string;
  skills: {
    name: string;
    proficiency: number;
    level?: string;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerBadge?: string;
  year: string;
  credentialId?: string;
  verificationUrl?: string;
  category: 'Technical' | 'Achievement';
  imagePlaceholderText: string;
  customImage?: string;
  skillsLearned: string[];
  description: string;
}

export interface StatItem {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  subtext: string;
}
