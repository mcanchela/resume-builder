import { ResumeData } from "@/types/resume";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationForm from "./forms/EducationForm";
import ExperienceForm from "./forms/ExperienceForm";
import LeadershipForm from "./forms/LeadershipForm";
import SkillsForm from "./forms/SkillsForm";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  showLeadership: boolean;
  onToggleLeadership: (show: boolean) => void;
}

export default function ResumeForm({ data, onChange, showLeadership, onToggleLeadership }: ResumeFormProps) {
  return (
    <div className="space-y-8 bg-white p-6 shadow-sm rounded-xl border border-gray-100">
      <PersonalInfoForm
        data={data.personalInfo}
        onChange={(personalInfo) => onChange({ ...data, personalInfo })}
      />
      <EducationForm
        data={data.education}
        onChange={(education) => onChange({ ...data, education })}
      />
      <ExperienceForm
        data={data.experience}
        onChange={(experience) => onChange({ ...data, experience })}
      />
      
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-800">Leadership & Activities</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">This section is optional</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={showLeadership}
              onChange={(e) => onToggleLeadership(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {showLeadership && (
          <LeadershipForm
            data={data.leadership}
            onChange={(leadership) => onChange({ ...data, leadership })}
          />
        )}
      </div>

      <SkillsForm
        data={data.skills}
        onChange={(skills) => onChange({ ...data, skills })}
      />
    </div>
  );
}
