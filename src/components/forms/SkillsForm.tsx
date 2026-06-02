import { Skills } from "@/types/resume";

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
        <h3 className="text-lg font-bold text-slate-800">Skills & Interests</h3>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Languages</label>
          <input
            type="text"
            name="languages"
            value={data.languages || ""}
            onChange={handleChange}
            placeholder="English (Native), Spanish (Fluent)"
            className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium shadow-sm transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Technical Skills</label>
          <input
            type="text"
            name="technical"
            value={data.technical || ""}
            onChange={handleChange}
            placeholder="Python, Java, React, SQL"
            className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium shadow-sm transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Interests</label>
          <input
            type="text"
            name="interests"
            value={data.interests || ""}
            onChange={handleChange}
            placeholder="Chess, Marathon Running"
            className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium shadow-sm transition-all"
          />
        </div>
      </div>
    </div>
  );
}
