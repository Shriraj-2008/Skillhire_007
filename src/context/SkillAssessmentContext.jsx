// src/context/SkillAssessmentContext.jsx
import React, { createContext, useContext, useState } from 'react';

const SkillAssessmentContext = createContext();

// Sample Question Bank (Skills ke basis par)
const questionBank = {
  React: [
    {
      id: 1,
      question: 'React me state updates kya hote hain?',
      options: ['Synchronous', 'Asynchronous', 'Blocking', 'Directly mutated'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'useMemo Hook ka primary use case kya hai?',
      options: ['Side effects manage karna', 'Performance Optimization (Memoization)', 'DOM reference hold karna', 'State modify karna'],
      correctAnswer: 1
    }
  ],
  JavaScript: [
    {
      id: 3,
      question: 'Event Loop me microtask queue ka execution priority kya hota hai?',
      options: ['Macrotask ke baad', 'Macrotask se pehle', 'Parallelly run hota hai', 'Randomly execute hota hai'],
      correctAnswer: 1
    }
  ],
  NodeJS: [
    {
      id: 4,
      question: 'Node.js me non-blocking I/O operations kiski wajah se possible hain?',
      options: ['V8 Engine', 'Libuv Event Loop', 'Thread Pool', 'Cluster Module'],
      correctAnswer: 1
    }
  ]
};

export const SkillAssessmentProvider = ({ children }) => {
  const [analyzedSkills, setAnalyzedSkills] = useState([]);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [testResult, setTestResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Resume Text / Keywords Analysis Function
  const analyzeResumeAndGenerateTest = (resumeText) => {
    setIsAnalyzing(true);
    
    // Simulate Resume Parsing & AI Keyword Extraction
    setTimeout(() => {
      const detectedSkills = [];
      const lowerText = resumeText.toLowerCase();

      if (lowerText.includes('react') || lowerText.includes('frontend')) detectedSkills.push('React');
      if (lowerText.includes('javascript') || lowerText.includes('js')) detectedSkills.push('JavaScript');
      if (lowerText.includes('node') || lowerText.includes('backend')) detectedSkills.push('NodeJS');

      // Fallback skill if no keyword matches
      const finalSkills = detectedSkills.length > 0 ? detectedSkills : ['JavaScript'];
      setAnalyzedSkills(finalSkills);

      // Selected Skills ke according Questions combine karna
      let questions = [];
      finalSkills.forEach(skill => {
        if (questionBank[skill]) {
          questions = [...questions, ...questionBank[skill]];
        }
      });

      setGeneratedQuestions(questions);
      setIsAnalyzing(false);
    }, 1500);
  };

  // Submit & Score Calculation
  const calculateResult = (userAnswers) => {
    let score = 0;
    generatedQuestions.forEach((q, idx) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });

    const percentage = Math.round((score / generatedQuestions.length) * 100);
    const resultData = {
      totalQuestions: generatedQuestions.length,
      correctAnswers: score,
      percentage,
      passed: percentage >= 60,
      skillsEvaluated: analyzedSkills
    };

    setTestResult(resultData);
    return resultData;
  };

  return (
    <SkillAssessmentContext.Provider value={{
      analyzedSkills,
      generatedQuestions,
      testResult,
      isAnalyzing,
      analyzeResumeAndGenerateTest,
      calculateResult
    }}>
      {children}
    </SkillAssessmentContext.Provider>
  );
};

export const useSkillAssessment = () => useContext(SkillAssessmentContext);