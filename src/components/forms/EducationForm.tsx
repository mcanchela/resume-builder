import { Education } from "@/types/resume";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: "",
      location: "",
      degree: "",
      graduationDate: "",
    };
    onChange([...data, newEdu]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
        <h3 className="text-lg font-bold text-slate-800">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all font-bold shadow-sm active:scale-95"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      <div className="space-y-4">
        {data.map((edu) => (
          <div key={edu.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 relative space-y-3 shadow-sm hover:border-slate-200 transition-colors">
            <button
              onClick={() => removeEducation(edu.id)}
              className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
              title="Remove Education"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">School Name</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleChange(edu.id, "school", e.target.value)}
                  placeholder="Harvard University"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleChange(edu.id, "location", e.target.value)}
                  placeholder="Cambridge, MA"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Degree & Concentration</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, "degree", e.target.value)}
                  placeholder="Bachelor of Arts in Economics"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Graduation Date</label>
                <input
                  type="text"
                  value={edu.graduationDate}
                  onChange={(e) => handleChange(edu.id, "graduationDate", e.target.value)}
                  placeholder="May 2024"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleChange(edu.id, "gpa", e.target.value)}
                  placeholder="3.8/4.0"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Relevant Coursework</label>
                <input
                  type="text"
                  value={edu.relevantCoursework}
                  onChange={(e) => handleChange(edu.id, "relevantCoursework", e.target.value)}
                  placeholder="Macroeconomics, Econometrics..."
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <GraduationCap className="mx-auto text-slate-300 mb-2" size={40} />
          <p className="text-slate-500 font-medium">No education entries added yet.</p>
        </div>
      )}
    </div>
  );
}
