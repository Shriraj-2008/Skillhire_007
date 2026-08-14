import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, RotateCcw, Check, X, Award, FileQuestion } from 'lucide-react';

export default function SkillTestResult({ testResult: propsTestResult, onRetake }) {
  const [testResult, setTestResult] = useState(propsTestResult || null);

  // 1. Storage Sync & Retaking Sync Effect
  useEffect(() => {
    if (propsTestResult) {
      setTestResult(propsTestResult);
      // Save result to LocalStorage for persistent UI state
      localStorage.setItem('candidate_latest_skill_test_result', JSON.stringify(propsTestResult));
      
      // Update score in candidate results summary
      const existingSummary = JSON.parse(localStorage.getItem('candidate_quiz_results')) || {};
      localStorage.setItem('candidate_quiz_results', JSON.stringify({
        ...existingSummary,
        score: propsTestResult.percentage ?? 0,
        evaluatedAt: new Date().toLocaleDateString('en-GB')
      }));
      window.dispatchEvent(new Event('storage'));
    } else {
      // Fetch stored test result if available
      const savedResult = JSON.parse(localStorage.getItem('candidate_latest_skill_test_result'));
      if (savedResult) {
        setTestResult(savedResult);
      }
    }
  }, [propsTestResult]);

  // Retake handler with storage reset support
  const handleRetakeClick = () => {
    localStorage.removeItem('candidate_latest_skill_test_result');
    setTestResult(null);
    if (onRetake) {
      onRetake();
    }
  };

  // 2. Safe Fallback: Agar result na ho toh Empty UI dikhayega
  if (!testResult) {
    return (
      <div className="bg-white p-10 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm max-w-xl mx-auto my-12">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <FileQuestion size={32} />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800">No Test Results Yet</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
            You haven't taken any skill assessment test yet. Take a test to view your skill score breakdown and detailed feedback.
          </p>
        </div>
        {onRetake && (
          <button
            onClick={handleRetakeClick}
            className="bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 inline-flex items-center gap-2 transition shadow-sm cursor-pointer"
          >
            <RotateCcw size={16} /> Take Skill Test
          </button>
        )}
      </div>
    );
  }

  // 3. Props Extraction with Default Values
  const {
    percentage = 0,
    correctAnswers = 0,
    totalQuestions = 0,
    passed = false,
    skillBreakdown = [],
    detailedAnswers = []
  } = testResult;

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm max-w-3xl mx-auto text-slate-800">
      {/* Header Status */}
      <div className="text-center space-y-3">
        {passed ? (
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle size={36} />
          </div>
        ) : (
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle size={36} />
          </div>
        )}

        <h2 className="text-2xl font-bold text-slate-800">
          {passed ? 'Skill Test Passed!' : 'Skill Assessment Needs Improvement'}
        </h2>
        <p className="text-xs text-slate-500">
          {passed 
            ? 'Great job! You have demonstrated strong expertise in your skills.' 
            : 'Review your skill scores below and try again to improve.'}
        </p>
      </div>

      {/* Overall Score Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall Score</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{percentage}%</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Correct Answers</p>
          <p className="text-2xl font-bold text-slate-700 mt-1">{correctAnswers} / {totalQuestions}</p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center col-span-2 md:col-span-1">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</p>
          <p className={`text-2xl font-bold mt-1 ${passed ? 'text-emerald-600' : 'text-rose-600'}`}>
            {passed ? 'PASSED' : 'FAILED'}
          </p>
        </div>
      </div>

      {/* Skill-Wise Breakdown */}
      {skillBreakdown.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Award size={18} className="text-indigo-600" /> Skill-Wise Performance
          </h3>
          <div className="space-y-3">
            {skillBreakdown.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800">{item.skill}</span>
                  <span className={item.percentage >= 70 ? 'text-emerald-600' : 'text-rose-600'}>
                    {item.correct} / {item.total} ({item.percentage}%)
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      item.percentage >= 70 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Review */}
      {detailedAnswers.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-700">Detailed Question Review</h3>
          <div className="space-y-3">
            {detailedAnswers.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  item.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-800">Q{idx + 1}. {item.question}</p>
                  {item.isCorrect ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold text-[11px] shrink-0">
                      <Check size={14} /> Correct
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-700 font-bold text-[11px] shrink-0">
                      <X size={14} /> Incorrect
                    </span>
                  )}
                </div>
                {item.skill && (
                  <span className="inline-block bg-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                    Skill: {item.skill}
                  </span>
                )}
                <p className="text-slate-600"><strong>Your Answer:</strong> {item.userAnswer}</p>
                {!item.isCorrect && (
                  <p className="text-emerald-700"><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      {onRetake && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleRetakeClick}
            className="bg-indigo-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 flex items-center gap-2 transition shadow-sm cursor-pointer"
          >
            <RotateCcw size={16} /> Retake / Test Another Resume
          </button>
        </div>
      )}
    </div>
  );
}