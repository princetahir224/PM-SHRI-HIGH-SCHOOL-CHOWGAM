import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  Phone,
  Award, 
  Edit3, 
  CheckCircle2, 
  UserCheck, 
  Briefcase,
  HelpCircle
} from 'lucide-react';
import { StaffMember } from '../data/schoolData';
import { SCHOOL_IMAGES } from '../data/assets';

interface StaffSectionProps {
  staffList: StaffMember[];
  onOpenAdmin: () => void;
  onEditStaff: (staff: StaffMember) => void;
}

export const StaffSection: React.FC<StaffSectionProps> = ({
  staffList,
  onOpenAdmin,
  onEditStaff
}) => {
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const hoi = staffList.find(s => s.isHOI) || staffList[0];
  const faculty = staffList.filter(s => !s.isHOI);

  return (
    <section id="staff" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              Faculty & Administration
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Institutional Leadership & Staff Directory
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Our school is headed by the Headmaster / Head of Institution (HOI) and served by a dedicated team of 13 staff members committed to student excellence, character building, and public education.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Configure Staff Records</span>
            </button>
          </div>
        </div>

        {/* Head of Institution (HOI) Featured Card */}
        {hoi && (
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 mb-12 shadow-xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-emerald-900 shadow-md shrink-0 bg-stone-900">
                  <img
                    src={SCHOOL_IMAGES.headmaster}
                    alt="Headmaster Mr. Shareef Ahmad Khan in his formal school office"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-800 tracking-wider">
                    Slot #{hoi.slotNumber} · Institutional Leader
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                    {hoi.name}
                  </h3>
                  <div className="text-xs sm:text-sm text-stone-700 font-semibold mt-0.5">
                    {hoi.designation} · {hoi.department}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 flex flex-wrap items-center gap-2">
                    <span>Qualifications: <strong className="text-stone-800">{hoi.qualifications}</strong></span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-emerald-800 font-semibold">Zone: Shangas / Shanglus</span>
                  </div>

                  {/* Direct Contact Links */}
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                    <a
                      href="tel:7889725799"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md font-semibold hover:bg-emerald-100 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>7889725799</span>
                    </a>
                    <a
                      href="mailto:hschowgam@gmail.com"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-800 border border-stone-200 rounded-md font-semibold hover:bg-stone-200 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-stone-600" />
                      <span>hschowgam@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onEditStaff(hoi)}
                className="px-3.5 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Update HOI Profile</span>
              </button>
            </div>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700">
              <div>
                <strong className="block text-stone-900 mb-1">Key Responsibilities:</strong>
                <p className="leading-relaxed text-stone-600">{hoi.responsibilities}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-stone-200/80">
                <div className="text-xs font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Official Leadership Role
                </div>
                <div className="text-xs text-stone-500 leading-relaxed">
                  Oversees school administration, academic monitoring, PM SHRI implementation, School Management Committee (SMC), and child welfare.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12 Staff Member Cards (Transparent, Verified Slots with Clear Placeholders) */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-stone-900">
              Dedicated Faculty & Support Staff (12 Members)
            </h3>
            <span className="text-xs text-stone-500 font-mono">
              Total Staff: 13 (Verified Cadre)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <div
                key={member.id}
                className="bg-stone-50 rounded-xl border border-stone-200 p-5 flex flex-col justify-between hover:border-stone-300 transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-stone-500 mb-2">
                    <span className="text-emerald-800 font-semibold">Staff Slot #{member.slotNumber}</span>
                    <span className="text-[11px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded">
                      {member.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900 mb-1">
                    {member.name}
                  </h4>

                  <div className="text-xs font-semibold text-stone-700 mb-1">
                    {member.designation}
                  </div>

                  <div className="text-xs text-emerald-800 font-medium mb-3">
                    {member.department}
                  </div>

                  <div className="text-xs text-stone-600 mb-2">
                    <span className="text-stone-400">Qual: </span>
                    <span className="font-mono text-stone-700">{member.qualifications}</span>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed mb-4">
                    {member.responsibilities}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-400">PM SHRI GHS Chowgam</span>
                  <button
                    onClick={() => onEditStaff(member)}
                    className="text-emerald-900 hover:text-emerald-700 font-semibold underline"
                  >
                    Configure Slot
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-stone-100 rounded-lg text-xs text-stone-600 text-center leading-relaxed">
            <strong>Transparency Notice:</strong> Staff names and detailed qualifications are maintained by the school administration and can be updated through the authorized staff console. No official personal facts or achievements are fabricated.
          </div>
        </div>

      </div>
    </section>
  );
};
