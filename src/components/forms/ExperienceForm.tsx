import { Experience } from "@/types/resume";
import { Plus, Trash2, Briefcase } from "lucide-react";

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      location: "",
      title: "",
      startDate: "",
      endDate: "",
      description: [""],
    };
    onChange([...data, newExp]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const handleChange = (id: string, field: keyof Experience, value: any) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addBullet = (expId: string) => {
    onChange(
      data.map((exp) =>
        exp.id === expId ? { ...exp, description: [...exp.description, ""] } : exp
      )
    );
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    onChange(
      data.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              description: exp.description.map((b, i) =>
                i === bulletIndex ? value : b
              ),
            }
          : exp
      )
    );
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    onChange(
      data.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== bulletIndex),
            }
          : exp
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
        <h3 className="text-lg font-bold text-slate-800">Professional Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all font-bold shadow-sm active:scale-95"
        >
          <Plus size={14} /> Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {data.map((exp) => (
          <div key={exp.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 relative space-y-4 shadow-sm hover:border-slate-200 transition-colors">
            <button
              onClick={() => removeExperience(exp.id)}
              className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                  placeholder="Google"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleChange(exp.id, "location", e.target.value)}
                  placeholder="Mountain View, CA"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Job Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => handleChange(exp.id, "title", e.target.value)}
                  placeholder="Software Engineer Intern"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Dates of Employment</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={exp.startDate}
                    onChange={(e) => handleChange(exp.id, "startDate", e.target.value)}
                    placeholder="Jun 2023"
                    className="w-1/2 border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                  />
                  <input
                    type="text"
                    value={exp.endDate}
                    onChange={(e) => handleChange(exp.id, "endDate", e.target.value)}
                    placeholder="Aug 2023"
                    className="w-1/2 border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Achievements & Responsibilities</label>
                <button
                  onClick={() => addBullet(exp.id)}
                  className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded font-bold transition-all"
                >
                  + Add Bullet
                </button>
              </div>
              <div className="space-y-2">
                {exp.description.map((bullet, bIndex) => (
                  <div key={bIndex} className="flex gap-2 items-start">
                    <span className="mt-2.5 text-slate-400 font-bold">•</span>
                    <textarea
                      value={bullet}
                      onChange={(e) => updateBullet(exp.id, bIndex, e.target.value)}
                      placeholder="Collaborated with cross-functional teams to..."
                      rows={2}
                      className="flex-1 border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-slate-900 font-medium text-xs shadow-inner"
                    />
                    <button
                      onClick={() => removeBullet(exp.id, bIndex)}
                      className="mt-2.5 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-10 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          <Briefcase className="mx-auto text-slate-300 mb-2" size={40} />
          <p className="text-slate-500 font-medium">No experience entries added yet.</p>
        </div>
      )}
    </div>
  );
}
