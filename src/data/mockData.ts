import { Hackathon, Internship } from '../types';

export const mockHackathons: Hackathon[] = [];

export const mockInternships: Internship[] = [
  {
    id: 'intern1',
    title: 'Frontend Developer Intern',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    duration: '3 months',
    stipend: '₹15,000/month',
    type: 'Full-time',
    description: 'Work with our frontend team to build modern web applications using React and TypeScript.',
    requirements: [
      'Knowledge of React.js and JavaScript',
      'Familiarity with TypeScript',
      'Basic understanding of HTML/CSS',
      'Good communication skills'
    ]
  }
];