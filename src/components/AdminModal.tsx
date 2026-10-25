import React, { useState } from 'react';
import { 
  Lock, 
  X, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  PlusCircle, 
  Edit3, 
  Users, 
  Building, 
  FileText,
  Sliders
} from 'lucide-react';
import { 
  StaffMember, 
  NoticeItem, 
  FacilityItem, 
  QualityIndicator 
} from '../data/schoolData';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffList: StaffMember[];
  onUpdateStaff: (staff: StaffMember[]) => void;
  notices: NoticeItem[];
  onUpdateNotices: (notices: NoticeItem[]) => void;
  facilities: FacilityItem[];
  onUpdateFacilities: (facilities: FacilityItem[]) => void;
  hoiMessage: string;
  hoiName: string;
  onUpdateHoi: (message: string, name: string) => void;
  onResetAll: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  staffList,
  onUpdateStaff,
  notices,
  onUpdateNotices,
  facilities,
  onUpdateFacilities,
  hoiMessage,
  hoiName,
  onUpdateHoi,
  onResetAll,
}) => {
  const [activeTab, setActiveTab] = useState<'hoi' | 'staff' | 'notices' | 'facilities'>('hoi');
  const [localHoiName, setLocalHoiName] = useState(hoiName);
  const [localHoiMessage, setLocalHoiMessage] = useState(hoiMessage);
  const [saveAlert, setSaveAlert] = useState(false);

  // New Notice form state
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<NoticeItem['category']>('Academic');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeImportant, setNewNoticeImportant] = useState(false);

  if (!isOpen) return null;

  const handleSaveHoi = () => {
    onUpdateHoi(localHoiMessage, localHoiName);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) return;
    const newNotice: NoticeItem = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      category: newNoticeCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      content: newNoticeContent,
      isImportant: newNoticeImportant,
      attachmentName: `${newNoticeTitle.slice(0, 15).replace(/\s+/g, '_')}_Official.pdf`
    };
    onUpdateNotices([newNotice, ...notices]);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNewNoticeImportant(false);
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2500);
  };

  const handleStaffChange = (id: string, field: keyof StaffMember, value: string) => {
    const updated = staffList.map(s => s.id === id ? { ...s, [field]: value } : s);
    onUpdateStaff(updated);
  };

  const handleFacilityStatusChange = (id: string, newStatus: FacilityItem['status']) => {
    const updated = facilities.map(f => f.id === id ? { ...f, status: newStatus } : f);
    onUpdateFacilities(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in">
        
        {/* Modal Top Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">PM SHRI GHS Chowgam · Administration Console</h3>
              <p className="text-xs text-stone-400">Update verified school records, leadership address, notices, and facilities</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Console Navigation Tabs */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => setActiveTab('hoi')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'hoi' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              HOI Leadership Profile
            </button>
            <button
              onClick={() => setActiveTab('staff')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'staff' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Staff Directory (13 Members)
            </button>
            <button
              onClick={() => setActiveTab('notices')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'notices' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Publish Circular
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'facilities' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Facilities Status
            </button>
          </div>

          <button
            onClick={onResetAll}
            className="text-[11px] text-stone-500 hover:text-rose-600 flex items-center gap-1 shrink-0"
            title="Reset data to initial verified baseline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Defaults</span>
          </button>
        </div>

        {/* Save confirmation banner */}
        {saveAlert && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-900 px-6 py-2 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Updates saved successfully to local institutional records.</span>
          </div>
        )}

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs sm:text-sm text-stone-700">
          
          {/* TAB 1: HOI */}
          {activeTab === 'hoi' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Head of Institution (HOI) / Headmaster Name
                </label>
                <input
                  type="text"
                  value={localHoiName}
                  onChange={(e) => setLocalHoiName(e.target.value)}
                  placeholder="Enter official Headmaster name (or leave as placeholder)"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 font-medium focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  HOI Welcome Address & Educational Philosophy
                </label>
                <textarea
                  rows={6}
                  value={localHoiMessage}
                  onChange={(e) => setLocalHoiMessage(e.target.value)}
                  placeholder="Enter the official welcome message for students and parents..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveHoi}
                  className="px-4 py-2 bg-emerald-900 text-white rounded-lg font-semibold hover:bg-emerald-800 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save HOI Address</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: STAFF DIRECTORY */}
          {activeTab === 'staff' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">
                Update the official names, qualifications, and roles for each of the 13 dedicated cadre positions at PM SHRI GHS Chowgam:
              </p>

              <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
                {staffList.map((member) => (
                  <div key={member.id} className="p-4 bg-white hover:bg-stone-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-800 text-xs">
                          Slot #{member.slotNumber}
                        </span>
                        <span className="font-semibold text-stone-900 text-xs sm:text-sm">
                          {member.role}
                        </span>
                        {member.isHOI && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                            Head of Institution
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500">
                        Dept: {member.department} · {member.responsibilities}
                      </div>
                    </div>

                    <div className="w-full sm:w-72 space-y-2">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleStaffChange(member.id, 'name', e.target.value)}
                        placeholder="Staff Name"
                        className="w-full bg-stone-50 border border-stone-200 rounded p-1.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                      />
                      <input
                        type="text"
                        value={member.qualifications}
                        onChange={(e) => handleStaffChange(member.id, 'qualifications', e.target.value)}
                        placeholder="Qualifications (e.g. M.Sc, B.Ed)"
                        className="w-full bg-stone-50 border border-stone-200 rounded p-1.5 text-xs text-stone-700 focus:outline-none focus:border-emerald-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PUBLISH NOTICE */}
          {activeTab === 'notices' && (
            <div className="max-w-2xl">
              <form onSubmit={handleAddNotice} className="space-y-4">
                <h4 className="font-bold text-stone-900">Publish New Official Notice / Circular</h4>
                
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Circular Title *</label>
                  <input
                    type="text"
                    required
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    placeholder="e.g. Winter Preparedness & Examination Schedule Announcement"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Category</label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-700"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Admissions">Admissions</option>
                      <option value="PM SHRI">PM SHRI</option>
                      <option value="Examination">Examination</option>
                      <option value="General">General</option>
                      <option value="Holiday">Holiday</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
                      <input
                        type="checkbox"
                        checked={newNoticeImportant}
                        onChange={(e) => setNewNoticeImportant(e.target.checked)}
                        className="rounded text-emerald-800 focus:ring-emerald-700"
                      />
                      <span>Mark as High Priority / Urgent</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Circular Text / Body *</label>
                  <textarea
                    required
                    rows={4}
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    placeholder="Enter the full official notification text..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-900 text-white rounded-lg font-semibold hover:bg-emerald-800 flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Publish Notice to Website</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: FACILITIES STATUS */}
          {activeTab === 'facilities' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">
                Update operational condition and maintenance status for all 22 campus facilities:
              </p>

              <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                {facilities.map((fac) => (
                  <div key={fac.id} className="p-3.5 flex items-center justify-between gap-4 hover:bg-stone-50">
                    <div>
                      <div className="font-semibold text-stone-900 text-xs sm:text-sm">{fac.name}</div>
                      <div className="text-[11px] text-stone-500">{fac.accessibility}</div>
                    </div>

                    <select
                      value={fac.status}
                      onChange={(e) => handleFacilityStatusChange(fac.id, e.target.value as any)}
                      className="bg-stone-50 border border-stone-200 rounded px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                    >
                      <option value="Operational">Operational</option>
                      <option value="Active">Active</option>
                      <option value="Under Enhancement">Under Enhancement</option>
                      <option value="Planned Expansion">Planned Expansion</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500">PM SHRI GHS Chowgam Management Panel</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800"
          >
            Done & Close
          </button>
        </div>

      </div>
    </div>
  );
};
