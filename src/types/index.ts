export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Hackathon {
  id: string;
  title: string;
  shortInfo: string;
  moreInfo: string;
  location: string;
  type: string;
  date: string;
  prize: string;
  image?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  type: string;
  description: string;
  requirements: string[];
}

export interface SavedItem {
  id: string;
  type: 'hackathon' | 'internship';
  item: Hackathon | Internship;
  savedAt: Date;
  priority: boolean;
}

export interface SwipeState {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
}