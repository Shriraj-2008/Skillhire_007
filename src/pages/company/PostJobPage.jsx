import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1JobDetails from '../../components/company/PostJob/Step1JobDetails';
import Step2JobDescription from '../../components/company/PostJob/Step2JobDescription';
import Step3Requirements from '../../components/company/PostJob/Step3Requirements';
import Step4Compensation from '../../components/company/PostJob/Step4Compensation';
import Step5PreviewPublish from '../../components/company/PostJob/Step5PreviewPublish';
import SidebarPreview from '../../components/company/PostJob/SidebarPreview';
import { Check } from 'lucide-react';

export default function PostJobPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Complete Form State
  const [formData, setFormData] = useState({
    // Step 1: Details
    jobTitle: '',
    jobRole: '',
    department: '',
    employmentType: 'Full-time',
    workMode: 'On-site',
    experienceLevel: '',
    companyLocation: '',
    jobLocationType: 'same',
    customLocation: '',
    industry: '',
    category: '',
    openings: '1',
    noticePeriod: '',
    deadline: '',

    // Step 2: Description
    jobSummary: '',
    keyResponsibilities: '',
    dayToDayTasks: '',
    detailedDescription: '',

    // Step 3: Requirements
    education: "Bachelor's Degree",
    experience: '2 - 4 Years',
    minExperienceYears: 2,
    skills: ['JavaScript', 'React.js', 'HTML', 'CSS', 'REST APIs', 'Git'],
    preferredSkills: ['TypeScript', 'Next.js', 'Tailwind CSS', 'MongoDB', 'AWS'],
    certifications: ['AWS Certified Developer', 'Google Cloud Associate'],
    languages: ['English', 'Hindi'],
    reqJobType: 'Full-time',
    reqWorkMode: 'Hybrid',
    shift: 'Day Shift',

    // Step 4: Compensation
    minSalary: '5,00,000',
    maxSalary: '8,00,000',
    salaryType: 'Annual CTC',
    currency: 'INR (₹) - Indian Rupee',
    payPeriod: 'Yearly',
    benefits: ['Health Insurance', 'Provident Fund (PF)', 'Flexible Working', 'Performance Bonus'],
    customBenefit: '',
    joiningBonus: '',
    joiningBonusType: 'One-time',
    retentionBonus: '',
    retentionBonusType: 'One-time',
    showCompensation: true
  });

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { id: 1, name: 'Job Details' },
    { id: 2, name: 'Job Description' },
    { id: 3, name: 'Requirements' },
    { id: 4, name: 'Compensation' },
    { id: 5, name: 'Preview & Publish' }
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Top Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">💼</span> Post a Job
        </h1>
        <p className="text-xs text-slate-400 mt-1">Dashboard &gt; Post a Job</p>
      </div>

      {/* Stepper Wizard */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-8 max-w-5xl">
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div 
                className="flex flex-col items-center z-10 cursor-pointer" 
                onClick={() => setCurrentStep(step.id)}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition ${
                    currentStep > step.id
                      ? 'bg-indigo-600 text-white'
                      : currentStep === step.id
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {currentStep > step.id ? <Check size={18} /> : step.id}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    currentStep >= step.id ? 'text-indigo-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 -mt-5 transition ${
                    currentStep > step.id + 1 ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Grid: Forms Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 && <Step1JobDetails formData={formData} updateFormData={updateFormData} onNext={nextStep} />}
          {currentStep === 2 && <Step2JobDescription formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />}
          {currentStep === 3 && <Step3Requirements formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />}
          {currentStep === 4 && <Step4Compensation formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />}
          {currentStep === 5 && <Step5PreviewPublish formData={formData} onBack={prevStep} setCurrentStep={setCurrentStep} />}
        </div>

        <div className="lg:col-span-1">
          <SidebarPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}