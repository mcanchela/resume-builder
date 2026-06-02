import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
  showLeadership?: boolean;
}

export default function ResumePreview({ data, showLeadership = true }: ResumePreviewProps) {
  const { personalInfo, education, experience, leadership, skills } = data;

  return (
    <div className="resume-container bg-white p-[0.5in] md:p-[0.75in] min-h-[11in] w-full max-w-[8.5in] mx-auto text-black leading-tight shadow-none border-none text-left">
      {/* Name - 14-16pt, Bold, Centered */}
      <header className="text-center mb-6">
        <h1 className="text-[16pt] font-bold uppercase mb-1 leading-none">
          {personalInfo.fullName || "JOHN DOE"}
        </h1>
        <div className="text-[10pt] leading-normal">
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.phone && (
            <>
              <span className="mx-1.5">|</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.email && (
            <>
              <span className="mx-1.5">|</span>
              <span>{personalInfo.email}</span>
            </>
          )}
        </div>
      </header>

      {/* Education - Headings 11-12pt, Bold, All Caps */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase leading-normal mb-2">Education</h2>
          <div className="h-[1px] bg-black w-full mb-3"></div>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3 text-[10pt]">
              <div className="flex justify-between font-bold">
                <span>{edu.school}</span>
                <span>{edu.location}</span>
              </div>
              <div className="flex justify-between italic">
                <span>{edu.degree}</span>
                <span className="font-normal not-italic">{edu.graduationDate}</span>
              </div>
              {edu.gpa && <div>GPA: {edu.gpa}</div>}
              {edu.relevantCoursework && (
                <div className="leading-snug">Relevant Coursework: {edu.relevantCoursework}</div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase leading-normal mb-2">Experience</h2>
          <div className="h-[1px] bg-black w-full mb-3"></div>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4 text-[10pt]">
              <div className="flex justify-between font-bold">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <div className="flex justify-between italic mb-1">
                <span>{exp.title}</span>
                <span className="font-normal not-italic">
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <ul className="list-disc ml-5 space-y-0.5">
                {exp.description.map((bullet, i) => (
                  <li key={i} className="pl-1 leading-snug">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Leadership & Activities */}
      {showLeadership && leadership.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase leading-normal mb-2">Leadership & Activities</h2>
          <div className="h-[1px] bg-black w-full mb-3"></div>
          {leadership.map((item) => (
            <div key={item.id} className="mb-4 text-[10pt]">
              <div className="flex justify-between font-bold">
                <span>{item.organization}</span>
                <span className="font-normal">
                  {item.startDate} – {item.endDate}
                </span>
              </div>
              <div className="italic mb-1">{item.role}</div>
              <ul className="list-disc ml-5 space-y-0.5">
                {item.description.map((bullet, i) => (
                  <li key={i} className="pl-1 leading-snug">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Skills & Interests */}
      {(skills.languages || skills.technical || skills.interests) && (
        <section className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase leading-normal mb-2">Skills & Interests</h2>
          <div className="h-[1px] bg-black w-full mb-3"></div>
          <div className="text-[10pt] space-y-1 leading-snug">
            {skills.languages && (
              <div>
                <span className="font-bold">Languages:</span> {skills.languages}
              </div>
            )}
            {skills.technical && (
              <div>
                <span className="font-bold">Technical Skills:</span> {skills.technical}
              </div>
            )}
            {skills.interests && (
              <div>
                <span className="font-bold">Interests:</span> {skills.interests}
              </div>
            )}
          </div>
        </section>
      )}

      <style jsx>{`
        .resume-container {
          font-family: "Times New Roman", Times, serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        @media print {
          .resume-container {
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
}
