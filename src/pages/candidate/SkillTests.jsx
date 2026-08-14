import React, { useState, useEffect } from 'react';
import { useSkillAssessment } from '../../context/SkillAssessmentContext';
import { FileText, CheckCircle, AlertCircle, ArrowRight, BrainCircuit, RotateCcw } from 'lucide-react';

export default function SkillTests() {
  const contextData = useSkillAssessment() || {};
  const { 
    analyzedSkills: contextSkills = [], 
    generatedQuestions: contextQuestions = [], 
    isAnalyzing: contextAnalyzing = false, 
    testResult: contextResult, 
    analyzeResumeAndGenerateTest, 
    calculateResult 
  } = contextData;

  const [resumeContent, setResumeContent] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  // Local State for Instant AI Fallback Generation
  const [localSkills, setLocalSkills] = useState([]);
  const [localQuestions, setLocalQuestions] = useState([]);
  const [isLocalAnalyzing, setIsLocalAnalyzing] = useState(false);
  const [localResult, setLocalResult] = useState(null);

  // Dynamic Skill Extractor & MCQ Question Generator
  const generateDynamicTestFromResume = (text) => {
    const knownSkillsList = [
      'React', 'JavaScript', 'Node.js', 'Python', 'Java', 'HTML', 'CSS', 
      'TypeScript', 'SQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Redux', 'Tailwind'
    ];

    // Extract skills mentioned in the resume text
    const foundSkills = knownSkillsList.filter(skill => 
      new RegExp(`\\b${skill}\\b`, 'i').test(text)
    );

    // Fallback skills if none detected in text
    const finalSkills = foundSkills.length > 0 ? foundSkills : ['JavaScript', 'React', 'Problem Solving'];

    // Questions Pool for Dynamic Generation
    const questionBank = {
      'React': [
        { id: 'r1', question: 'What is the purpose of useEffect in React?', options: ['Manage side effects', 'Styling components', 'Database query', 'Route handling'], correct: 0 },
        { id: 'r2', question: 'How do you pass data down to child components?', options: ['State', 'Props', 'Redux', 'Sockets'], correct: 1 }
      ],
      'JavaScript': [
        { id: 'j1', question: 'Which keyword creates a block-scoped variable in JS?', options: ['var', 'let', 'global', 'define'], correct: 1 },
        { id: 'j2', question: 'What does Promises handle in JS?', options: ['Asynchronous operations', 'Styling', 'DOM Rendering', 'Memory allocation'], correct: 0 }
      ],
      'Node.js': [
        { id: 'n1', question: 'Which runtime engine is Node.js built upon?', options: ['V8 Engine', 'SpiderMonkey', 'Chakra', 'Nitro'], correct: 0 }
      ],
      'Python': [
        { id: 'p1', question: 'Which data type is immutable in Python?', options: ['List', 'Tuple', 'Dictionary', 'Set'], correct: 1 }
      ],
      'SQL': [
        { id: 's1', question: 'Which command is used to retrieve data from a database?', options: ['FETCH', 'GET', 'SELECT', 'PULL'], correct: 2 }
      ],
      'Problem Solving': [
        { id: 'ps1', question: 'What is the time complexity of a Binary Search algorithm?', options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'], correct: 2 }
      ]
    };

    let generatedQs = [];
    finalSkills.forEach(skill => {
      if (questionBank[skill]) {
        generatedQs.push(...questionBank[skill]);
      }
    });

    if (generatedQs.length === 0) {
      generatedQs = questionBank['Problem Solving'];
    }

    return { skills: finalSkills, questions: generatedQs };
  };

  // Resume Analysis Handler
  const handleStartAnalysis = async (e) => {
    e.preventDefault();
    if (!resumeContent.trim()) return;

    setIsLocalAnalyzing(true);

    // 1. Try Triggering Context Function
    if (analyzeResumeAndGenerateTest) {
      try {
        await analyzeResumeAndGenerateTest(resumeContent);
      } catch (err) {
        console.warn('Context analysis failed, running local AI fallback...', err);
      }
    }

    // 2. Generate via Local Dynamic Engine (Guarantees working state)
    setTimeout(() => {
      const { skills, questions } = generateDynamicTestFromResume(resumeContent);
      setLocalSkills(skills);
      setLocalQuestions(questions);
      setIsLocalAnalyzing(false);
    }, 1200);
  };

  // Option selection handler
  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Final Test Submission Handler
  const handleTestSubmit = () => {
    const questionsToEvaluate = contextQuestions.length > 0 ? contextQuestions : localQuestions;

    if (calculateResult) {
      calculateResult(selectedAnswers);
    }

    // Local evaluation calculation
    let correctCount = 0;
    questionsToEvaluate.forEach((q, idx) => {
      const qId = q.id || idx;
      if (selectedAnswers[qId] === (q.correct ?? 0)) {
        correctCount++;
      }
    });

    const total = questionsToEvaluate.length;
    const percentage = Math.round((correctCount / total) * 100);

    setLocalResult({
      passed: percentage >= 60,
      percentage: percentage,
      correctAnswers: correctCount,
      totalQuestions: total
    });

    // Save skill assessment score to localStorage for Candidate Profile sync
    const existingResults = JSON.parse(localStorage.getItem('candidate_quiz_results')) || {};
    localStorage.setItem('candidate_quiz_results', JSON.stringify({
      ...existingResults,
      score: percentage,
      evaluatedAt: new Date().toLocaleDateString('en-GB')
    }));

    window.dispatchEvent(new Event('storage'));
    setTestSubmitted(true);
  };

  const activeSkills = contextSkills.length > 0 ? contextSkills : localSkills;
  const activeQuestions = contextQuestions.length > 0 ? contextQuestions : localQuestions;
  const activeResult = contextResult || localResult;
  const isLoading = contextAnalyzing || isLocalAnalyzing;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-slate-800">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <BrainCircuit className="text-indigo-600" size={28} /> AI Resume Skill Assessment
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Paste your resume content. Our AI extracts core skills and dynamically builds a personalized quiz.
        </p>
      </div>

      {/* STEP 1: Resume Input & Skill Extraction */}
      {!testStarted && !testSubmitted && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <FileText size={18} className="text-indigo-600" /> Step 1: Paste Resume Content or Keywords
          </h2>

          <textarea
            value={resumeContent}
            onChange={(e) => setResumeContent(e.target.value)}
            placeholder="Paste your resume summary, skills (e.g. React, JavaScript, Node.js, SQL), or experience here..."
            className="w-full text-xs p-4 bg-slate-50 border border-slate-200 rounded-2xl h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
          />

          <button
            onClick={handleStartAnalysis}
            disabled={isLoading || !resumeContent.trim()}
            className="bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 disabled:bg-slate-300 transition shadow-sm flex items-center gap-2"
          >
            {isLoading ? (
              <>Analyzing Resume & Generating Test...</>
            ) : (
              <>Analyze Resume & Generate Test</>
            )}
          </button>

          {/* Extracted Skills Preview Box */}
          {activeSkills.length > 0 && !isLoading && (
            <div className="mt-6 p-5 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-4 animate-fade-in">
              <div>
                <p className="text-xs font-bold text-indigo-950">Extracted Skills Detected:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeSkills.map((skill, idx) => (
                    <span key={idx} className="bg-indigo-600 text-white text-[11px] px-3 py-1 rounded-full font-semibold shadow-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setTestStarted(true)}
                className="bg-emerald-600 text-white text-xs font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-emerald-700 transition shadow-sm"
              >
                Start Adaptive Test ({activeQuestions.length} Questions) <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Interactive Assessment Test */}
      {testStarted && !testSubmitted && (
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex justify-between items-center text-xs shadow-md">
            <span>Evaluating Skills: <strong className="text-indigo-300">{activeSkills.join(', ')}</strong></span>
            <span>Total Questions: <strong>{activeQuestions.length}</strong></span>
          </div>

          {activeQuestions.map((q, index) => {
            const qId = q.id || index;
            return (
              <div key={qId} className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">
                  Q{index + 1}. {q.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {q.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(qId, optIdx)}
                      className={`p-3 text-left rounded-xl text-xs border transition font-medium ${
                        selectedAnswers[qId] === optIdx
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <button
            onClick={handleTestSubmit}
            disabled={Object.keys(selectedAnswers).length < activeQuestions.length}
            className="w-full bg-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl hover:bg-emerald-700 disabled:bg-slate-300 transition shadow-sm"
          >
            Submit Skill Assessment
          </button>
        </div>
      )}

      {/* STEP 3: Assessment Results & LocalStorage Sync */}
      {testSubmitted && activeResult && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-5 shadow-sm">
          {activeResult.passed ? (
            <CheckCircle size={52} className="text-emerald-500 mx-auto" />
          ) : (
            <AlertCircle size={52} className="text-rose-500 mx-auto" />
          )}

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeResult.passed ? 'Skill Assessment Passed!' : 'Skill Assessment Needs Improvement'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Your score has been updated in your Candidate Profile.</p>
          </div>

          <div className="flex justify-center gap-6 py-2">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[130px]">
              <p className="text-[10px] text-slate-400 font-bold">SCORE</p>
              <p className="text-2xl font-black text-indigo-600">{activeResult.percentage}%</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[130px]">
              <p className="text-[10px] text-slate-400 font-bold font-mono">CORRECT</p>
              <p className="text-2xl font-black text-slate-700">{activeResult.correctAnswers} / {activeResult.totalQuestions}</p>
            </div>
          </div>

          <button
            onClick={() => {
              setTestStarted(false);
              setTestSubmitted(false);
              setSelectedAnswers({});
              setLocalSkills([]);
              setLocalQuestions([]);
              setResumeContent('');
            }}
            className="bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={14} /> Retake / Test Another Resume
          </button>
        </div>
      )}
    </div>
  );
}