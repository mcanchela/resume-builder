import { Leadership } from "@/types/resume";
import { Plus, Trash2, Users } from "lucide-react";

interface LeadershipFormProps {
  data: Leadership[];
  onChange: (data: Leadership[]) => void;
}

export default function LeadershipForm({ data, onChange }: LeadershipFormProps) {
  const addLeadership = () => {
    const newLead: Leadership = {
      id: crypto.randomUUID(),
      organization: "",
      role: "",
      startDate: "",
      endDate: "",
      description: [""],
    };
    onChange([...data, newLead]);
  };

  const removeLeadership = (id: string) => {
    onChange(data.filter((l) => l.id !== id));
  };

  const handleChange = (id: string, field: keyof Leadership, value: any) => {
    onChange(
      data.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const addBullet = (leadId: string) => {
    onChange(
      data.map((l) =>
        l.id === leadId ? { ...l, description: [...l.description, ""] } : l
      )
    );
  };

  const updateBullet = (leadId: string, bulletIndex: number, value: string) => {
    onChange(
      data.map((l) =>
        l.id === leadId
          ? {
              ...l,
              description: l.description.map((b, i) =>
                i === bulletIndex ? value : b
              ),
            }
          : l
      )
    );
  };

  const removeBullet = (leadId: string, bulletIndex: number) => {
    onChange(
      data.map((l) =>
        l.id === leadId
          ? {
              ...l,
              description: l.description.filter((_, i) => i !== bulletIndex),
            }
          : l
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
        <h3 className="text-lg font-bold text-slate-800">Leadership & Activities</h3>
        <button
          onClick={addLeadership}
          className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-all font-bold shadow-sm active:scale-95"
        >
          <Plus size={14} /> Add Activity
        </button>
      </div>

      <div className="space-y-4">
        {data.map((l) => (
          <div key={l.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50 relative space-y-4 shadow-sm hover:border-slate-200 transition-colors">
            <button
              onClick={() => removeLeadership(l.id)}
              className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Organization</label>
                <input
                  type="text"
                  value={l.organization}
                  onChange={(e) => handleChange(l.id, "organization", e.target.value)}
                  placeholder="Harvard Debate Council"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Role</label>
                <input
                  type="text"
                  value={l.role}
                  onChange={(e) => handleChange(l.id, "role", e.target.value)}
                  placeholder="President"
                  className="border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Dates of Involvement</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={l.startDate}
                    onChange={(e) => handleChange(l.id, "startDate", e.target.value)}
                    placeholder="Sep 2022"
                    className="w-1/2 border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                  />
                  <input
                    type="text"
                    value={l.endDate}
                    onChange={(e) => handleChange(l.id, "endDate", e.target.value)}
                    placeholder="Present"
                    className="w-1/2 border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-sm text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Description & Impact</label>
                <button
                  onClick={() => addBullet(l.id)}
                  className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded font-bold transition-all"
                >
                  + Add Bullet
                </button>
              </div>
              <div className="space-y-2">
                {l.description.map((bullet, bIndex) => (
                  <div key={bIndex} className="flex gap-2 items-start">
                    <span className="mt-2.5 text-slate-400 font-bold">•</span>
                    <textarea
                      value={bullet}
                      onChange={(e) => updateBullet(l.id, bIndex, e.target.value)}
                      placeholder="Managed a team of 20..."
                      rows={2}
                      className="flex-1 border border-slate-200 p-2 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none bg-white text-slate-900 font-medium text-xs shadow-inner"
                    />
                    <button
                      onClick={() => removeBullet(l.id, bIndex)}
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
          <Users className="mx-auto text-slate-300 mb-2" size={40} />
          <p className="text-slate-500 font-medium">No leadership entries added yet.</p>
        </div>
      )}
    </div>
  );
}
