import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { 
  FileText, Download, Upload, Trash2, FileX, ExternalLink, FileCheck 
} from 'lucide-react';

export default function ResumePreview() {
  // Safe Context Fallback
  const jobContext = useJobs() || {};
  const { userProfile, uploadResume, deleteResume } = jobContext;

  // Safe Property Extraction
  const resumeFile = userProfile?.resumeUrl || userProfile?.resumeFile || userProfile?.resume || null;
  const fileName = userProfile?.resumeFileName || userProfile?.resumeName || "Candidate_Resume.pdf";
  const uploadDate = userProfile?.resumeUpdatedLast || "Recently uploaded";

  const [isUploading, setIsUploading] = useState(false);

  // Check if file is PDF for iframe rendering
  const isPdf = typeof resumeFile === 'string' && resumeFile.toLowerCase().includes('.pdf');

  // File Upload Handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && uploadResume) {
      setIsUploading(true);
      try {
        await uploadResume(file);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-6 bg-slate-50/50 min-h-screen text-slate-800">
      
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="text-indigo-600" size={24} /> Resume Preview
          </h1>
          <p className="text-xs text-slate-400">Dashboard &gt; Resume Preview</p>
        </div>

        {/* Top Actions (Visible when Resume Exists) */}
        {resumeFile && (
          <div className="flex gap-2">
            <label className="border border-slate-200 bg-white text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Upload size={14} /> Re-upload
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
            </label>
            <a 
              href={resumeFile} 
              download={fileName}
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <Download size={14} /> Download File
            </a>
          </div>
        )}
      </div>

      {/* Main Condition Check */}
      {resumeFile ? (
        /* State 1: Jab Resume Dala Hua Hai */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Resume Viewer Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 h-[750px] flex flex-col">
            <div className="flex justify-between items-center pb-3 px-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <FileText size={16} className="text-indigo-600" /> {fileName}
              </span>
              <a 
                href={resumeFile} 
                target="_blank" 
                rel="noreferrer" 
                className="text-indigo-600 hover:underline flex items-center gap-1"
              >
                Open in new tab <ExternalLink size={12} />
              </a>
            </div>

            {/* Smart Viewer: PDF hai to iframe, Word File hai to Document Card */}
            <div className="flex-1 mt-3 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
              {isPdf ? (
                <iframe 
                  src={resumeFile} 
                  title="Candidate Resume Preview"
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-3 bg-white">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                    <FileCheck size={32} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Document Uploaded Successfully</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    This file format (.doc / .docx) cannot be rendered directly in web preview. You can open or download it below.
                  </p>
                  <a 
                    href={resumeFile} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-indigo-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <Download size={14} /> Download & View File
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - File Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-800">Resume Details</h3>
              
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium">File Name</span>
                  <p className="font-semibold text-slate-800 truncate">{fileName}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium">Last Updated</span>
                  <p className="font-semibold text-slate-800">{uploadDate}</p>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                {deleteResume && (
                  <button 
                    onClick={deleteResume}
                    className="w-full flex items-center justify-between p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition text-xs font-semibold cursor-pointer"
                  >
                    <span>Remove Resume</span>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      ) : (

        <div className="bg-white p-12 max-w-xl mx-auto rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm my-16">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <FileX size={36} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No Resume Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
              You haven't uploaded your resume yet. Upload your PDF or DOCX file to preview it here and share it with employers.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-semibold px-6 py-3 rounded-2xl hover:bg-indigo-700 transition cursor-pointer shadow-sm">
            <Upload size={16} /> 
            {isUploading ? 'Uploading Resume...' : 'Upload Resume'}
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange} 
              className="hidden" 
              disabled={isUploading}
            />
          </label>
        </div>
      )}

    </div>
  );
}