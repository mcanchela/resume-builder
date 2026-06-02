import { ResumeData } from "@/types/resume";

interface PersonalInfoFormProps {
  data: ResumeData["personalInfo"];
  onChange: (data: ResumeData["personalInfo"]) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1.5">
        <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-slate-900 bg-white shadow-sm font-medium"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="john.doe@email.com"
            className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-slate-900 bg-white shadow-sm font-medium"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-slate-900 bg-white shadow-sm font-medium"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Location</label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Cambridge, MA"
            className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-slate-900 bg-white shadow-sm font-medium"
          />
        </div>
      </div>
    </div>
  );
}
