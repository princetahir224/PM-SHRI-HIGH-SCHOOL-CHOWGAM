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
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'masters' | 'teachers' | 'support'>('all');

  const hoi = staffList.find(s => s.isHOI) || staffList[0];
  const faculty = staffList.filter(s => !s.isHOI);

  const filteredFaculty = faculty.filter(member => {
    if (selectedCategory === 'masters') return member.slotNumber >= 2 && member.slotNumber <= 8;
    if (selectedCategory === 'teachers') return member.slotNumber >= 9 && member.slotNumber <= 12;
    if (selectedCategory === 'support') return member.slotNumber === 13;
    return true;
  });

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
                    <span className="text-emerald-800 font-semibold">Zone: Shangus</span>
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

        {/* Authentic Morning Assembly Feature Showcase */}
        <div className="bg-emerald-950 text-white rounded-2xl overflow-hidden border border-emerald-900 mb-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[380px] bg-stone-900">
              <img
                src={SCHOOL_IMAGES.morningAssembly}
                alt="Morning Assembly in the Highlands at PM SHRI Govt High School Chowgam"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-xs text-amber-300 border border-emerald-700/80 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md shadow-xs">
                Official Campus Photograph
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Daily Morning Assembly in the Highlands</span>
                  <span aria-hidden="true" className="text-emerald-700">·</span>
                  <span>Zone Shangus, J&K</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  Morning Assembly & Moral Cultivation at the Foot of the Pine Mountains
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-4">
                  Every morning at PM SHRI Govt High School Chowgam commences with our outdoor assembly on the mountain grounds. Encircled by towering evergreen conifers and fresh alpine breezes, our 13 dedicated staff members guide students through daily prayers, moral reflections, news analysis, and physical training (PT).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-900/80 text-xs">
                  <div className="p-2.5 bg-emerald-900/40 rounded-lg border border-emerald-800/60">
                    <div className="font-semibold text-amber-300 text-[11px]">Daily Assembly Routines</div>
                    <div className="text-[11px] text-stone-300 mt-0.5">National anthem, universal prayers, and inspirational moral thought.</div>
                  </div>
                  <div className="p-2.5 bg-emerald-900/40 rounded-lg border border-emerald-800/60">
                    <div className="font-semibold text-amber-300 text-[11px]">Faculty Mentorship</div>
                    <div className="text-[11px] text-stone-300 mt-0.5">All 13 staff members attend, mentor, and supervise student queues.</div>
                  </div>
                  <div className="p-2.5 bg-emerald-900/40 rounded-lg border border-emerald-800/60">
                    <div className="font-semibold text-amber-300 text-[11px]">Scenic Serenity</div>
                    <div className="text-[11px] text-stone-300 mt-0.5">Fresh Himalayan valley air instilling alertness and inner discipline.</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/60 flex flex-wrap items-center justify-between gap-3 text-[11px] text-emerald-300/80 font-mono">
                <span>Location: PM SHRI GHS Chowgam Highlands Assembly Ground</span>
                <span className="text-amber-400">Values for Life • Discipline • Excellence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key In-charge Portfolios Spotlight Banner */}
        <div className="mb-12 bg-stone-900 text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800 mb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                Institutional Portfolios · Zone Shangus
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Key Administrative & Academic In-Charge Desks
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-800 shrink-0">
              Assigned Leadership Responsibilities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* HOI */}
            <div className="p-3.5 bg-stone-800/80 rounded-xl border border-stone-700/70">
              <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">Head of Institution (HOI)</div>
              <div className="text-base font-bold text-white mt-0.5">Mr. Shareef Ahmad Khan</div>
              <div className="text-stone-400 text-[11px] mt-0.5">Headmaster · Overall Institutional Administration & SMC</div>
            </div>

            {/* PM SHRI In-charge */}
            <div className="p-3.5 bg-amber-950/40 rounded-xl border border-amber-800/60">
              <div className="text-amber-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>⭐ PM SHRI In-charge</span>
              </div>
              <div className="text-base font-bold text-amber-100 mt-0.5">Mr. Muzzaffer Ahmad Khan</div>
              <div className="text-stone-300 text-[11px] mt-0.5">Master · 16 Development Domains, NEP 2020 & Green School</div>
            </div>

            {/* Samagra Shiksha In-charge */}
            <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-800/60">
              <div className="text-indigo-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>📚 Samagra Shiksha In-charge</span>
              </div>
              <div className="text-base font-bold text-indigo-100 mt-0.5">Mr. Gh Mohd Rafique</div>
              <div className="text-stone-300 text-[11px] mt-0.5">Master · Flagship Schemes, Grants, Free Textbooks & Uniforms</div>
            </div>

            {/* Office Clerk */}
            <div className="p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-800/60">
              <div className="text-emerald-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>📑 Office Clerk / In-charge</span>
              </div>
              <div className="text-base font-bold text-emerald-100 mt-0.5">Mr. Altaf Ahmad (Mohd Altaf)</div>
              <div className="text-stone-300 text-[11px] mt-0.5">Master · Institutional Admissions, Service Books & ZEO Shangus Desk</div>
            </div>

            {/* Sports In-charge */}
            <div className="p-3.5 bg-orange-950/40 rounded-xl border border-orange-800/60">
              <div className="text-orange-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>🏆 Sports In-charge</span>
              </div>
              <div className="text-base font-bold text-orange-100 mt-0.5">Mr. Mohd Anzar Khan (Anzar Ahmad)</div>
              <div className="text-stone-300 text-[11px] mt-0.5">Teacher · Inter-School Athletic Meets, Volleyball, Cricket & PT</div>
            </div>

            {/* ICT & Exam In-charge */}
            <div className="p-3.5 bg-sky-950/40 rounded-xl border border-sky-800/60">
              <div className="text-sky-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>💻 ICT & Exam In-charge</span>
              </div>
              <div className="text-base font-bold text-sky-100 mt-0.5">Mr. Tahir Ahmad Kumar</div>
              <div className="text-stone-300 text-[11px] mt-0.5">Teacher · Math Teacher (M.Sc. Math), Computer Lab & JKBOSE Cell</div>
            </div>

            {/* Science Lab In-charge */}
            <div className="p-3.5 bg-teal-950/40 rounded-xl border border-teal-800/60">
              <div className="text-teal-300 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <span>🔬 Science Lab In-charge</span>
              </div>
              <div className="text-base font-bold text-teal-100 mt-0.5">Mr. Ajaz Ahmad Wani</div>
              <div className="text-stone-300 text-[11px] mt-0.5">Science Teacher · Composite Science Lab, Practical Sessions & STEM Experiments</div>
            </div>
          </div>
        </div>

        {/* Faculty and Staff Cadre Roster */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                Official Faculty & Staff Cadre (12 Members)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Zone: Shangus · Headmaster Mr. Shareef Ahmad Khan (S.No 1) · Masters Cadre (S.No 2 to 8) · Teachers Cadre (S.No 9 to 12) · Institutional Support (S.No 13)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 font-medium">
                7 Masters
              </span>
              <span className="text-xs text-sky-900 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 font-medium">
                4 Teachers
              </span>
              <span className="text-xs text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200 font-medium">
                1 Support
              </span>
            </div>
          </div>

          {/* Cadre Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-stone-200 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Staff (12)
            </button>
            <button
              onClick={() => setSelectedCategory('masters')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === 'masters'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              Masters (S.No 2 to 8)
            </button>
            <button
              onClick={() => setSelectedCategory('teachers')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === 'teachers'
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
              }`}
            >
              Teachers (S.No 9 to 12)
            </button>
            <button
              onClick={() => setSelectedCategory('support')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCategory === 'support'
                  ? 'bg-stone-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Support Official (S.No 13)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((member) => {
              const isMaster = member.slotNumber >= 2 && member.slotNumber <= 8;
              const isTeacher = member.slotNumber >= 9 && member.slotNumber <= 12;
              const isSlot3Rafique = member.slotNumber === 3;
              const isSlot7Muzzaffer = member.slotNumber === 7;
              const isSlot8Altaf = member.slotNumber === 8;
              const isSlot9Ajaz = member.slotNumber === 9;
              const isSlot10Anzar = member.slotNumber === 10;
              const isSlot11Muzzafer = member.slotNumber === 11;
              const isTahirKumar = member.name.includes('Tahir Ahmad Kumar');

              return (
                <div
                  key={member.id}
                  className={`rounded-xl border p-5 flex flex-col justify-between transition-all shadow-2xs ${
                    isSlot7Muzzaffer
                      ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-300/60'
                      : isSlot3Rafique
                      ? 'bg-indigo-50/50 border-indigo-200 ring-1 ring-indigo-200/60'
                      : isSlot8Altaf
                      ? 'bg-emerald-50/50 border-emerald-200 ring-1 ring-emerald-200/60'
                      : isSlot9Ajaz
                      ? 'bg-teal-50/50 border-teal-300 ring-1 ring-teal-300/60'
                      : isSlot10Anzar
                      ? 'bg-orange-50/50 border-orange-200 ring-1 ring-orange-200/60'
                      : isSlot11Muzzafer
                      ? 'bg-teal-50/40 border-teal-200'
                      : isTahirKumar
                      ? 'bg-sky-50/50 border-sky-300 ring-1 ring-sky-300/60'
                      : isMaster
                      ? 'bg-stone-50 border-amber-200/80 hover:border-amber-400'
                      : 'bg-stone-50 border-stone-200 hover:border-emerald-700/40'
                  }`}
                >
                  <div>
                    {/* Header Slot & Badges */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-stone-500 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-emerald-900 font-bold">Slot #{member.slotNumber}</span>
                        {isSlot7Muzzaffer && (
                          <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            PM SHRI In-charge
                          </span>
                        )}
                        {isSlot3Rafique && (
                          <span className="bg-indigo-100 text-indigo-900 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            Samagra In-charge
                          </span>
                        )}
                        {isSlot8Altaf && (
                          <span className="bg-emerald-100 text-emerald-900 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            Office Clerk
                          </span>
                        )}
                        {isSlot9Ajaz && (
                          <span className="bg-teal-200 text-teal-950 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            Science Lab In-charge
                          </span>
                        )}
                        {isSlot10Anzar && (
                          <span className="bg-orange-100 text-orange-900 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            Sports In-charge
                          </span>
                        )}
                        {isSlot11Muzzafer && (
                          <span className="bg-teal-100 text-teal-900 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            Science Teacher
                          </span>
                        )}
                      </div>
                      
                      {isMaster ? (
                        <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          Master Cadre
                        </span>
                      ) : isTeacher ? (
                        <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-sky-100 text-sky-900 border border-sky-300">
                          Teacher Cadre
                        </span>
                      ) : (
                        <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-stone-200 text-stone-700">
                          Support Cadre
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-stone-900 mb-0.5 flex items-center justify-between">
                      <span>{member.name}</span>
                    </h4>

                    {/* Official Designation */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isMaster 
                          ? 'bg-amber-100 text-amber-950 border border-amber-200' 
                          : isTeacher 
                          ? 'bg-sky-100 text-sky-950 border border-sky-200' 
                          : 'bg-stone-100 text-stone-800'
                      }`}>
                        Designation: {member.designation}
                      </span>
                    </div>

                    <div className="text-xs text-emerald-800 font-medium mb-3">
                      {member.department}
                    </div>

                    {/* Specific In-Charge Portfolio Banners */}
                    {isSlot7Muzzaffer && (
                      <div className="mb-3 p-2 bg-amber-100/80 border border-amber-300 rounded-lg text-xs">
                        <span className="font-bold text-amber-950 flex items-center gap-1">
                          ⭐ Assigned Role: PM SHRI In-charge
                        </span>
                        <p className="text-[11px] text-amber-900 mt-0.5">
                          Directs the 16 PM SHRI development domains, Green School audits, and NEP 2020 quality interventions.
                        </p>
                      </div>
                    )}

                    {isSlot3Rafique && (
                      <div className="mb-3 p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-xs">
                        <span className="font-bold text-indigo-950 flex items-center gap-1">
                          📚 Assigned Role: Samagra Shiksha In-charge
                        </span>
                        <p className="text-[11px] text-indigo-900 mt-0.5">
                          Manages Samagra flagship schemes, civil & pedagogical grants, and free textbook/uniform distribution.
                        </p>
                      </div>
                    )}

                    {isSlot8Altaf && (
                      <div className="mb-3 p-2 bg-emerald-50 border border-emerald-300 rounded-lg text-xs">
                        <span className="font-bold text-emerald-950 flex items-center gap-1">
                          📑 Assigned Role: Office Clerk / In-charge
                        </span>
                        <p className="text-[11px] text-emerald-900 mt-0.5">
                          Handles admissions register, official correspondence with ZEO Shangus & CEO Anantnag, and service records.
                        </p>
                      </div>
                    )}

                    {isSlot9Ajaz && (
                      <div className="mb-3 p-2 bg-teal-50 border border-teal-200 rounded-lg text-xs">
                        <span className="font-bold text-teal-950 flex items-center gap-1">
                          🔬 Assigned Role: Science Lab In-charge & Science Teacher
                        </span>
                        <p className="text-[11px] text-teal-900 mt-0.5">
                          Directs the composite science laboratory, manages experimental kits and apparatus, laboratory safety protocols, and STEM inquiry.
                        </p>
                      </div>
                    )}

                    {isSlot10Anzar && (
                      <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg text-xs">
                        <span className="font-bold text-orange-950 flex items-center gap-1">
                          🏆 Assigned Role: Sports In-charge
                        </span>
                        <p className="text-[11px] text-orange-900 mt-0.5">
                          Organizes inter-school athletic tournaments, daily sports drills, volleyball, cricket meets, and physical fitness.
                        </p>
                      </div>
                    )}

                    {isSlot11Muzzafer && (
                      <div className="mb-3 p-2 bg-teal-50/70 border border-teal-200 rounded-lg text-xs">
                        <span className="font-bold text-teal-950 flex items-center gap-1">
                          🔬 Assigned Role: Science Teacher
                        </span>
                        <p className="text-[11px] text-teal-900 mt-0.5">
                          Delivering secondary and middle-wing core science curriculum, interactive experiments, and promoting scientific curiosity.
                        </p>
                      </div>
                    )}

                    {/* Tahir Ahmad Kumar Special Multi-Role Pills */}
                    {isTahirKumar && (
                      <div className="mb-3 p-2.5 bg-sky-100/70 rounded-lg border border-sky-200 text-xs space-y-1">
                        <div className="text-[11px] font-bold text-sky-950 uppercase tracking-wider mb-1">
                          Assigned In-charge Responsibilities:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 bg-white text-sky-900 border border-sky-300 rounded text-[11px] font-semibold">
                            📐 Mathematics Teacher
                          </span>
                          <span className="px-2 py-0.5 bg-white text-sky-900 border border-sky-300 rounded text-[11px] font-semibold">
                            💻 ICT In-charge
                          </span>
                          <span className="px-2 py-0.5 bg-white text-sky-900 border border-sky-300 rounded text-[11px] font-semibold">
                            📝 Examination In-charge
                          </span>
                          <span className="px-2 py-0.5 bg-white text-emerald-900 border border-emerald-300 rounded text-[11px] font-semibold">
                            🎓 M.Sc. Math, B.Ed.
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-stone-600 mb-2">
                      <span className="text-stone-400">Qual: </span>
                      <span className="font-mono text-stone-900 font-semibold">{member.qualifications}</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {member.responsibilities}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200/70 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-500 font-mono">
                      {isMaster ? 'Master Cadre' : isTeacher ? 'Teacher Cadre' : 'Official Cadre'}
                    </span>
                    <button
                      onClick={() => onEditStaff(member)}
                      className="text-emerald-900 hover:text-emerald-700 font-semibold underline text-xs"
                    >
                      Edit Record
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-stone-100 rounded-lg text-xs text-stone-600 text-center leading-relaxed">
            <strong>Institutional Cadre Summary (Zone Shangus):</strong> PM SHRI Govt High School Chowgam is led by Headmaster Mr. Shareef Ahmad Khan (S.No 1), supported by Masters (S.No 2 to 8: Mr. Ab Raheem Shairgojri, Mr. Gh Mohd Rafique [Samagra In-charge], Mr. Nazir Ahmad Khan, Mr. Gulzar Ahmad Khan, Mr. Ab Rashid Wani, Mr. Muzzaffer Ahmad Khan [PM SHRI In-charge], Mr. Altaf Ahmad [Office Clerk]), Teachers (S.No 9 to 12: Mr. Ajaz Ahmad Wani [Science Lab In-charge], Mr. Mohd Anzar Khan [Sports In-charge], Mr. Muzzafer Rasool Malik [Science Teacher], Mr. Tahir Ahmad Kumar [ICT & Exam In-charge, Math Teacher, M.Sc. Math]), and Office Desk (S.No 13).
          </div>
        </div>

      </div>
    </section>
  );
};
