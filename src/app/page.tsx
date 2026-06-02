"use client";

import { useState, useRef } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData } from "@/types/resume";
import { FileText, Download, RotateCcw, Sparkles } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const initialData: ResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
  education: [],
  experience: [],
  leadership: [],
  skills: {},
};

const sampleData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "(123) 456-7890",
    address: "New York, NY",
  },
  education: [
    {
      id: "1",
      school: "State University",
      location: "New York, NY",
      degree: "Bachelor of Science in Business Administration",
      graduationDate: "May 2023",
      gpa: "3.7/4.0",
      relevantCoursework: "Financial Accounting, Marketing Management, Business Ethics",
    },
  ],
  experience: [
    {
      id: "1",
      company: "General Enterprises",
      location: "Brooklyn, NY",
      title: "Marketing Coordinator",
      startDate: "Jun 2023",
      endDate: "Present",
      description: [
        "Managed social media accounts, increasing follower engagement by 20% over six months.",
        "Coordinated with the design team to produce promotional materials for quarterly campaigns.",
        "Analyzed market trends to assist in the development of new branding strategies.",
      ],
    },
  ],
  leadership: [
    {
      id: "1",
      organization: "University Business Club",
      role: "Vice President",
      startDate: "Sep 2021",
      endDate: "May 2023",
      description: [
        "Led a team of 10 members to organize an annual networking event for 200+ students.",
        "Secured $2,000 in sponsorships from local businesses for club activities.",
      ],
    },
  ],
  skills: {
    languages: "English (Native), Spanish (Conversational)",
    technical: "Microsoft Office Suite, Google Analytics, Adobe Photoshop",
    interests: "Photography, Hiking, Chess",
  },
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [showLeadership, setShowLeadership] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    
    const element = previewRef.current;
    
    // Ensure the scroll position doesn't affect the capture
    window.scrollTo(0, 0);
    await new Promise(resolve => setTimeout(resolve, 150));

    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      logging: false,
      // letterRendering: true,
      allowTaint: false,
      scrollX: 0,
      scrollY: 0,
      width: 816,
      windowWidth: 816,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector(".resume-container") as HTMLElement;
        if (clonedElement) {
          clonedElement.style.boxShadow = "none";
          clonedElement.style.margin = "0";
          clonedElement.style.width = "816px";
          clonedElement.style.transform = "none";
        }
      }
    });
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });
    
    // Explicitly set to 8.5 x 11 inches
    pdf.addImage(imgData, "PNG", 0, 0, 8.5, 11);
    pdf.save(`${resumeData.personalInfo.fullName || "Resume"}.pdf`);
  };

  const loadSampleData = () => {
    setResumeData(sampleData);
    setShowLeadership(true);
  };

  const resetForm = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      setResumeData(initialData);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col lg:flex-row">
      {/* Left Side: Form */}
      <section className="w-full lg:w-[45%] p-4 md:p-6 lg:p-10 overflow-y-auto max-h-screen no-scrollbar print:hidden shadow-inner">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 p-1.5 rounded-lg shadow-md shadow-blue-200">
                  <FileText className="text-white" size={24} />
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Resume <span className="text-blue-600">Builder</span>
                </h1>
              </div>
              <p className="text-slate-500 font-semibold text-sm">
                Craft your professional identity.
              </p>
            </div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={loadSampleData}
                className="group flex items-center gap-1.5 bg-white hover:bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                Sample Data
              </button>
              <button
                onClick={resetForm}
                className="flex items-center gap-1.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-100 hover:border-red-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
                title="Clear all fields"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </header>

          <ResumeForm 
            data={resumeData} 
            onChange={setResumeData} 
            showLeadership={showLeadership}
            onToggleLeadership={setShowLeadership}
          />
          
          <footer className="mt-12 py-6 border-t border-slate-200 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
            <p>© 2024 mcanchela • All Rights Reserved</p>
          </footer>
        </div>
      </section>

      {/* Right Side: Preview */}
      <section className="w-full lg:w-[55%] p-4 md:p-6 lg:p-10 bg-slate-800 overflow-y-auto max-h-screen flex justify-center print:bg-white print:p-0 print:overflow-visible print:max-h-none shadow-2xl">
        <div className="w-full max-w-[8.5in] print:max-w-none">
          <div className="mb-4 flex justify-between items-center print:hidden border-b border-slate-700 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Preview</h2>
            </div>
            <p className="text-[10px] text-slate-500 font-bold italic">Standard A4/Letter Layout</p>
          </div>
          <div ref={previewRef} className="print:m-0 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <ResumePreview data={resumeData} showLeadership={showLeadership} />
          </div>
        </div>
      </section>

      {/* Action Button */}
      <div className="fixed bottom-8 right-8 print:hidden">
        <button
          onClick={handleDownloadPDF}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 px-6 py-3 rounded-xl shadow-[0_8px_25px_rgba(5,150,105,0.3)] text-sm font-black transition-all transform hover:-translate-y-1 active:scale-95 group"
        >
          <Download size={18} className="group-hover:bounce" />
          <span>Download PDF</span>
        </button>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 0;
            size: auto;
          }
          body {
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          nav, footer, .print\\:hidden {
            display: none !important;
          }
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .group:hover .group-hover\:bounce {
          animation: bounce 0.5s infinite;
        }
      `}</style>
    </main>
  );
}
