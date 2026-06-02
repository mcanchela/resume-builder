export interface Education {
  id: string;
  school: string;
  location: string;
  degree: string;
  graduationDate: string;
  gpa?: string;
  relevantCoursework?: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string; // or "Present"
  description: string[]; // Bullet points
}

export interface Leadership {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Skills {
  languages?: string;
  technical?: string;
  interests?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
  };
  education: Education[];
  experience: Experience[];
  leadership: Leadership[];
  skills: Skills;
}
