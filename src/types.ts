export interface SubmissionRecord {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  files: {
    name: string;
    size: number;
    type: string;
  }[];
  timestamp: string;
  status: 'success' | 'failed' | 'simulated';
  n8nTargetUrl: string;
  responseSnippet?: string;
  preflightScore?: number;
}

export interface PreflightAnalysis {
  wordCount: number;
  hasContactInfo: boolean;
  hasExperience: boolean;
  hasEducation: boolean;
  hasSkills: boolean;
  actionVerbsCount: number;
  metricsCount: number;
  score: number;
  suggestions: string[];
}

export interface SampleProfile {
  name: string;
  email: string;
  role: string;
  summary: string;
  content: string;
}
