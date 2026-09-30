import { PreflightAnalysis } from '../types';

const ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'analyzed', 'architected', 'automated',
  'built', 'championed', 'consolidated', 'created', 'decreased', 'delivered',
  'deployed', 'designed', 'developed', 'directed', 'eliminated', 'engineered',
  'established', 'expanded', 'formulated', 'generated', 'implemented', 'improved',
  'increased', 'initiated', 'launched', 'led', 'managed', 'maximized', 'mentored',
  'minimized', 'negotiated', 'optimized', 'orchestrated', 'overhauled', 'pioneered',
  'reduced', 'resolved', 'restructured', 'revamped', 'scaled', 'simplified',
  'spearheaded', 'standardized', 'streamlined', 'surpassed', 'transformed'
];

export function analyzeResumeText(text: string): PreflightAnalysis {
  if (!text || text.trim().length === 0) {
    return {
      wordCount: 0,
      hasContactInfo: false,
      hasExperience: false,
      hasEducation: false,
      hasSkills: false,
      actionVerbsCount: 0,
      metricsCount: 0,
      score: 0,
      suggestions: ['Please upload or paste resume text to begin analysis.']
    };
  }

  const cleanText = text.toLowerCase();
  const words = text.trim().split(/\s+/);
  const wordCount = words.length;

  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  const hasContactInfo = hasEmail && hasPhone;

  const hasExperience = /(experience|employment|work history|professional background|career)/i.test(text);
  const hasEducation = /(education|degree|university|college|b\.s\.|m\.s\.|b\.a\.|phd|diploma)/i.test(text);
  const hasSkills = /(skills|technologies|proficiencies|competencies|tools|core strengths)/i.test(text);

  // Count action verbs
  let foundVerbs = 0;
  for (const verb of ACTION_VERBS) {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(text)) {
      foundVerbs++;
    }
  }

  // Count metrics (% signs, $ amounts, numbers with + or x)
  const metricMatches = text.match(/\b\d+(\.\d+)?%|\$\d+(\.\d+)?[kmb]?|\b\d+\+\b|\b\d+x\b/gi);
  const metricsCount = metricMatches ? metricMatches.length : 0;

  // Calculate composite ATS readiness score out of 100
  let score = 25; // base

  if (hasContactInfo) score += 15;
  else if (hasEmail || hasPhone) score += 8;

  if (hasExperience) score += 15;
  if (hasEducation) score += 15;
  if (hasSkills) score += 15;

  // Verb points (up to 10)
  score += Math.min(foundVerbs * 2, 10);

  // Metric points (up to 10)
  score += Math.min(metricsCount * 2, 10);

  // Word count penalty/reward
  if (wordCount < 150) {
    score = Math.max(20, score - 20);
  } else if (wordCount > 1200) {
    score = Math.max(50, score - 10);
  }

  const suggestions: string[] = [];
  if (!hasContactInfo) {
    suggestions.push('Add both email address and reachable phone number in the contact header.');
  }
  if (!hasExperience) {
    suggestions.push('Include a clearly headed "Professional Experience" or "Work History" section.');
  }
  if (!hasEducation) {
    suggestions.push('List formal degrees, university names, or certified credentials in an "Education" section.');
  }
  if (!hasSkills) {
    suggestions.push('Group core technical skills and competencies in a bulleted "Skills" inventory.');
  }
  if (foundVerbs < 4) {
    suggestions.push('Strengthen bullet points with decisive action verbs (e.g., "Spearheaded", "Optimized", "Scaled").');
  }
  if (metricsCount < 3) {
    suggestions.push('Add quantifiable impact metrics (% growth, $ revenue saved, hours reduced) to substantiate claims.');
  }
  if (wordCount < 250) {
    suggestions.push('Resume length is currently quite brief; aim for 350 - 750 words for optimal ATS depth.');
  }

  return {
    wordCount,
    hasContactInfo,
    hasExperience,
    hasEducation,
    hasSkills,
    actionVerbsCount: foundVerbs,
    metricsCount,
    score: Math.min(Math.max(score, 10), 98),
    suggestions: suggestions.length > 0 ? suggestions : ['Excellent structure and strong ATS keyword alignment!']
  };
}
