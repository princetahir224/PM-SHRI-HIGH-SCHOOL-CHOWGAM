import React, { useState } from 'react';
import { 
  Accessibility, 
  ShieldCheck, 
  HeartHandshake, 
  Droplet, 
  ShieldPlus, 
  Smile, 
  CheckCircle2, 
  AlertTriangle,
  Users,
  Eye
} from 'lucide-react';

export const InclusionAndSafetySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cwsn' | 'safety' | 'health'>('cwsn');

  return (
    <section id="inclusion-safety" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Equity, Protection & Well-being
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Inclusion, CWSN Support & Student Safety
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Every child deserves dignity, safety, and equal opportunity to learn. We maintain dedicated barrier-free infrastructure for Children with Special Needs (CWSN), hygienic drinking water, separate sanitation, and proactive child safeguarding.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('cwsn')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'cwsn'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Inclusion & CWSN Accessibility
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'safety'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Child Safeguarding & Protection
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'health'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Sanitation, Drinking Water & First-Aid
          </button>
        </div>

        {/* CWSN Accessibility Tab */}
        {activeTab === 'cwsn' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Accessibility className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Dedicated CWSN Sanitation</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                A verified, custom-built barrier-free toilet unit featuring wide door clearance for wheelchairs, stainless steel wall-mounted grab rails, low-height faucets, and anti-slip flooring.
              </p>
              <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Operational & Maintained Daily</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Differentiated Classroom Support</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Teachers adapt lesson pacing, provide audio and visual alternatives in the smart classroom, and offer seating at front rows for students with visual, hearing, or orthopedic variations.
              </p>
              <div className="text-xs text-amber-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Segregation Policy</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Parent Collaboration & Equity</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Regular consultative reviews between parents and class teachers to identify specific learning needs and ensure children participate joyfully in sports, cultural days, and assemblies.
              </p>
              <div className="text-xs text-blue-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Compassionate Mentorship</span>
              </div>
            </div>
          </div>
        )}

        {/* Safety & Safeguarding Tab */}
        {activeTab === 'safety' && (
          <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  Child Safeguarding & Anti-Bullying Code
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  We enforce a strict, zero-tolerance policy towards any form of corporal punishment, harassment, bullying, or verbal disrespect. Every teacher acts as a trusted guardian and counselor.
                </p>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span>Confidential suggestion and grievance box installed outside HOI office.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span>Designated teacher-counselors for student welfare and emotional guidance.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span>Regular morning assembly talks on empathy, mutual respect, and gender sensitivity.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Mountain Valley Safety & Emergency Preparedness
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  Due to our scenic mountain foothill location, winter weather and seasonal runoff are managed with structured protocols:
                </p>
                <div className="space-y-2 text-xs text-stone-700">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">·</span>
                    <span>Clear snow clearing and non-skid path maintenance during winter months.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">·</span>
                    <span>Periodic earthquake and fire evacuation drills for all students and staff.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">·</span>
                    <span>Direct coordination with local administration and Chowgam PHC.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health, Water & First-Aid Tab */}
        {activeTab === 'health' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Potable Drinking Water</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Filtered drinking water station connected to clean mountain supply points with regular water purity inspections and clean drinking cups.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Separate Sanitation Units</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Independent, ventilated, and privacy-secured toilet blocks for boys and girls, with continuous running water and daily cleaning rosters.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">First-Aid Station</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Emergency first-aid cabinet with bandages, antiseptics, thermal blankets, and resting cot managed by designated faculty members.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
