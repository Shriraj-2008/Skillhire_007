// src/context/JobContext.jsx
import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export function JobProvider({ children }) {
  // Available Jobs List
  const [jobs, setJobs] = useState([
    {
      id: 'SH245612',
      title: 'Frontend Developer',
      company: 'Google',
      logo: 'https://www.google.com/favicon.ico',
      location: 'Bangalore, India (Remote)',
      salary: '₹ 8 – 12 LPA',
      type: 'Full Time',
      experience: '2 - 4 Years',
      skills: ['React.js', 'JavaScript', 'HTML', 'CSS'],
      postedDate: '20 May 2026',
      applied: false,
      status: null
    },
    {
      id: 'SH245589',
      title: 'Backend Developer',
      company: 'Microsoft',
      logo: 'https://www.microsoft.com/favicon.ico',
      location: 'Hyderabad, India',
      salary: '₹ 7 – 11 LPA',
      type: 'Full Time',
      experience: '3 - 5 Years',
      skills: ['Node.js', 'Express', 'MongoDB'],
      postedDate: '18 May 2026',
      applied: false,
      status: null
    },
    {
      id: 'SH245478',
      title: 'Software Engineer',
      company: 'TCS',
      logo: 'https://www.tcs.com/favicon.ico',
      location: 'Pune, India',
      salary: '₹ 6 – 9 LPA',
      type: 'Full Time',
      experience: '1 - 3 Years',
      skills: ['Java', 'Spring Boot', 'SQL'],
      postedDate: '15 May 2026',
      applied: false,
      status: null
    },
    {
      id: 'SH245267',
      title: 'UI/UX Designer',
      company: 'Flipkart',
      logo: 'https://www.flipkart.com/favicon.ico',
      location: 'Bangalore, India (Hybrid)',
      salary: '₹ 6 – 10 LPA',
      type: 'Full Time',
      experience: '2 - 4 Years',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      postedDate: '10 May 2026',
      applied: false,
      status: null
    }
  ]);

  // Apply Action Function
  const applyForJob = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, applied: true, status: 'Under Review', appliedDate: 'Today' }
          : job
      )
    );
  };

  return (
    <JobContext.Provider value={{ jobs, applyForJob }}>
      {children}
    </JobContext.Provider>
  );
}

export const useJobs = () => useContext(JobContext);