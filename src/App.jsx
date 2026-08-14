import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import AdminDashboard from './components/admin/AdminDashboard';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CandidateLayout from './components/candidate/CandidateLayout';
import CompanyLayout from './components/company/CompanyLayout';

// Public Pages
import Home from './pages/public/Home';
import Features from './pages/public/Features';
import HowItWorks from './pages/public/HowItWorks';
import Companies from './pages/public/Companies';
import AboutUs from './pages/public/AboutUs';
import Contact from './pages/public/Contact';
import FAQ from './pages/public/FAQ';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyOtp from './pages/auth/VerifyOtp';
import RegisterChoice from './pages/auth/RegisterChoice';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyProfile from './pages/company/CompanyProfile';
import PostJobPage from './pages/company/PostJobPage';
import Step1JobDetails from './components/company/PostJob/Step1JobDetails';
import Step2JobDescription from './components/company/PostJob/Step2JobDescription';
import Step3Requirements from './components/company/PostJob/Step3Requirements';
import Step4Compensation from './components/company/PostJob/Step4Compensation';
import Step5PreviewPublish from './components/company/PostJob/Step5PreviewPublish';
import ManageJobs from './pages/company/ManageJobs';
import CandidateSearchDashboard from './pages/company/CandidateSearchDashboard';
import CandidateDetailsPage from './pages/company/CandidateDetailsPage';
import Applications from './pages/company/Applications';
import Shortlisted from './pages/company/Shortlisted';
import Interviews from './pages/company/Interviews';
import ReportsAnalytics from './pages/company/ReportsAnalytics';
import CompanySettings from './pages/company/CompanySettings';

// Candidate Pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import MyProfile from './pages/candidate/MyProfile';
import EditProfile from './pages/candidate/EditProfile';
import MySkills from './pages/candidate/MySkills';
import SkillTests from './pages/candidate/SkillTests';
import SkillTestResult from './pages/candidate/SkillTestResult';
import Certificates from './pages/candidate/Certificates';
import Projects from './pages/candidate/Projects';
import SavedJobs from './pages/candidate/SavedJobs';
import BrowseJobs from './pages/candidate/BrowseJobs';
import AppliedJobs from './pages/candidate/AppliedJobs';
import Messages from './pages/candidate/Messages';
import InterviewSchedule from './pages/candidate/InterviewSchedule';
import Settings from './pages/candidate/Settings';
import ResumePreview from './pages/candidate/ResumePreview';
import Notifications from './pages/candidate/Notifications';

function MainLayout({ children }) {
  const location = useLocation();
  const isCandidateRoute = location.pathname.startsWith('/candidate');
  const isCompanyRoute = location.pathname.startsWith('/company');
  const isAdminRoute = location.pathname.startsWith('/admindashboard');
  const isAuthRoute = [
    '/login', 
    '/register', 
    '/register-choice', 
    '/forgot-password', 
    '/verify-otp'
  ].includes(location.pathname);

  const hideHeaderFooter = isCandidateRoute || isCompanyRoute || isAuthRoute || isAdminRoute;

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          
          <Route path="/admindashboard" element={<AdminDashboard />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-choice" element={<RegisterChoice />} />
          <Route path="/register-company" element={<Navigate to="/register" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Company Portal Routes */}
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="post-job" element={<PostJobPage />} />
            <Route path="step1jobdetails" element={<Step1JobDetails />} />
            <Route path="step2jobdescription" element={<Step2JobDescription />} />
            <Route path="step3requirements" element={<Step3Requirements />} />
            <Route path="step4compensation" element={<Step4Compensation />} />
            <Route path="step1previewpublish" element={<Step5PreviewPublish />} />
            <Route path="managejobs" element={<ManageJobs />} />
            <Route path="candidatesearchdashboard" element={<CandidateSearchDashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="shortlisted" element={<Shortlisted />} />
            <Route path="candidatedetailspage" element={<CandidateDetailsPage />} />
            <Route path="reportsanalytics" element={<ReportsAnalytics />} />
            <Route path="interviews" element={<Interviews />} />
            <Route path="messages" element={<Messages />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="companysettings" element={<CompanySettings />} />
          </Route>

          {/* Candidate Portal Routes */}
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="skills" element={<MySkills />} />
            <Route path="tests" element={<SkillTests />} />
            <Route path="test-result" element={<SkillTestResult />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="projects" element={<Projects />} />
            <Route path="BrowseJobs" element={<BrowseJobs />} />
            <Route path="AppliedJobs" element={<AppliedJobs />} />
            <Route path="resumepreview" element={<ResumePreview />} />
            <Route path="interviewshedule" element={<InterviewSchedule />} />
            <Route path="settings" element={<Settings />} />
            <Route path="Messages" element={<Messages />} />
            <Route path="Notifications" element={<Notifications />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Fallback Navigation */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </MainLayout>
    </Router>
  );
}