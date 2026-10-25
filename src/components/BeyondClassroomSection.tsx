import React, { useState } from 'react';
import { 
  Brain, 
  Activity, 
  Heart, 
  Users, 
  Palette, 
  Cpu, 
  TreePine, 
  Briefcase, 
  Flag, 
  Compass,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { BEYOND_CLASSROOM_DOMAINS, DevelopmentDomain } from '../data/schoolData';

export const BeyondClassroomSection: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<DevelopmentDomain>(BEYOND_CLASSROOM_DOMAINS[0]);

  const getDomainIcon = (code: string) => {
    switch (code) {
      case 'A': return <Brain className="w-5 h-5" />;
      case 'B': return <Activity className="w-5 h-5" />;
      case 'C': return <Heart className="w-5 h-5" />;
      case 'D': return <Users className="w-5 h-5" />;
      case 'E': return <Palette className="w-5 h-5" />;
      case 'F': return <Cpu className="w-5 h-5" />;
      case 'G': return <TreePine className="w-5 h-5" />;
      case 'H': return <Briefcase className="w-5 h-5" />;
      case 'I': return <Flag className="w-5 h-5" />;
      case 'J': return <Compass className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="beyond" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Holistic Student Growth Framework
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Beyond the Classroom: 10 Pillars of Whole-Child Development
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            True education harmonizes the mind, body, character, and spirit. At PM SHRI Govt High School Chowgam, we cultivate every dimension of our children's innate potential through 10 interconnected growth domains.
          </p>
        </div>

        {/* 10 Domains Grid Selector (Interactive segmented cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {BEYOND_CLASSROOM_DOMAINS.map((domain) => {
            const isSelected = selectedDomain.id === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950 text-white border-emerald-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-emerald-800'}`}>
                    Domain {domain.code}
                  </span>
                  <div className={isSelected ? 'text-white' : 'text-stone-500'}>
                    {getDomainIcon(domain.code)}
                  </div>
                </div>
                <div className="text-xs font-semibold leading-snug line-clamp-2">
                  {domain.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Domain Spotlight Display */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase tracking-wider mb-1">
                <span>Domain {selectedDomain.code}</span>
                <span aria-hidden="true">·</span>
                <span>NEP 2020 Aligned</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
                {selectedDomain.title}
              </h3>
              <p className="text-stone-600 text-sm mt-1 italic font-serif">
                "{selectedDomain.tagline}"
              </p>
            </div>

            <div className="text-xs text-stone-500 bg-white border border-stone-200 px-4 py-2 rounded-lg max-w-sm">
              <strong className="text-stone-800 block">Policy Mandate:</strong>
              {selectedDomain.nepAlignment}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Core Objectives */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-700" />
                Foundational Objectives
              </h4>
              <div className="space-y-2.5">
                {selectedDomain.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-white rounded-lg border border-stone-200/70 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Activities Conducted */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                Active Activities & Initiatives at Chowgam
              </h4>
              <div className="space-y-2.5">
                {selectedDomain.keyActivities.map((act, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-white rounded-lg border border-stone-200/70 text-xs sm:text-sm text-stone-700">
                    <span className="text-amber-700 font-bold shrink-0">·</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pedagogy Note Footer */}
          <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-600">
            <div>
              <strong className="text-stone-900">Pedagogical Approach: </strong>
              {selectedDomain.pedagogy}
            </div>
            <div className="text-stone-400 font-mono text-[11px] shrink-0">
              PM SHRI Quality Indicator {selectedDomain.code}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
