import React, { useState } from 'react';
import { 
  Mountain, 
  Target, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Heart, 
  Edit3, 
  CheckCircle2, 
  TreePine, 
  Sun,
  Wind,
  Phone,
  Mail
} from 'lucide-react';
import { INITIAL_SCHOOL_INFO } from '../data/schoolData';
import { SCHOOL_IMAGES } from '../data/assets';

interface AboutSectionProps {
  onOpenAdmin: () => void;
  hoiMessage: string;
  hoiName: string;
  annualPriorities: string[];
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenAdmin,
  hoiMessage,
  hoiName,
  annualPriorities
}) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'nature' | 'hoi' | 'nep'>('nature');

  return (
    <section id="about" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Institutional Profile & Identity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            About PM SHRI Govt High School Chowgam
          </h2>
          <p className="mt-4 text-stone-600 text-base leading-relaxed">
            Situated approximately 27 km from the district headquarters of Anantnag in Jammu & Kashmir, our school serves as a progressive rural educational hub dedicated to equitable, high-quality, and nature-connected education.
          </p>
        </div>

        {/* Tabbed Editorial Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('nature')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'nature'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            A School in the Lap of Nature
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'vision'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Vision, Mission & Core Values
          </button>
          <button
            onClick={() => setActiveTab('hoi')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'hoi'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Head of Institution Address
          </button>
          <button
            onClick={() => setActiveTab('nep')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'nep'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            PM SHRI & NEP 2020 Mandate
          </button>
        </div>

        {/* Tab 1: A School in the Lap of Nature */}
        {activeTab === 'nature' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-white p-8 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                  <TreePine className="w-4 h-4 text-emerald-600" />
                  <span>Geographical & Ecological Significance</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">
                  A School in the Lap of Nature
                </h3>
                <p className="text-stone-700 leading-relaxed mb-4">
                  PM SHRI Govt High School Chowgam is blessed with an extraordinary natural sanctuary. Tucked into a pristine mini-valley at the foot of lush green mountains in Kashmir, the school enjoys crisp mountain air, whispering pine trees, and expansive vistas that inspire contemplative thought.
                </p>
                <p className="text-stone-700 leading-relaxed mb-6">
                  Modern educational research continually validates what our environment naturally provides: learning amidst unspoiled nature reduces cognitive fatigue, enhances attention spans, nurtures emotional calm, and sparks instinctive scientific curiosity about flora, fauna, and geology.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100">
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="font-semibold text-stone-900 text-sm">Mini-Valley Setting</div>
                    <div className="text-xs text-stone-500 mt-1">Sheltered from highway noise, promoting deep classroom focus.</div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="font-semibold text-stone-900 text-sm">Foot of Mountains</div>
                    <div className="text-xs text-stone-500 mt-1">Living ecological lab for biodiversity and earth sciences.</div>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-lg">
                    <div className="font-semibold text-stone-900 text-sm">Pure Natural Air</div>
                    <div className="text-xs text-stone-500 mt-1">Health, physical vigor, and outdoor assemblies in fresh breezes.</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Location: Chowgam, Anantnag, J&K (27 km from Anantnag)</span>
                <span className="font-mono text-emerald-700">~3 Acres Campus</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Photo 1: Campus Building */}
              <div className="relative rounded-xl overflow-hidden min-h-[200px] sm:min-h-[220px] border border-stone-200 shadow-xs group">
                <img
                  src={SCHOOL_IMAGES.actualCampus}
                  alt="PM SHRI Govt High School Chowgam two-story building and flower garden with mountain background"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex items-end p-4">
                  <div className="text-white text-xs">
                    <div className="font-semibold text-amber-300">Two-Story Main School Building</div>
                    <p className="text-stone-300 text-[11px] mt-0.5">Two-story red-brick building with mountain backdrop in Chowgam.</p>
                  </div>
                </div>
              </div>

              {/* Photo 2: Morning Assembly in the Highlands */}
              <div className="relative rounded-xl overflow-hidden min-h-[200px] sm:min-h-[220px] border border-stone-200 shadow-xs group">
                <img
                  src={SCHOOL_IMAGES.morningAssembly}
                  alt="Morning Assembly in the Highlands at PM SHRI Govt High School Chowgam"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex items-end p-4">
                  <div className="text-white text-xs">
                    <div className="font-semibold text-amber-300">Morning Assembly in the Highlands</div>
                    <p className="text-stone-300 text-[11px] mt-0.5">Students and faculty gathered for morning prayer at the foot of pine slopes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vision, Mission & Values */}
        {activeTab === 'vision' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vision */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Our Vision</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                To evolve as a model public high school that transforms lives through conceptual academic mastery, digital capability, moral courage, and ecological harmony, preparing every student to thrive in a dynamic world.
              </p>
              <div className="text-xs text-stone-400 font-mono">NEP 2020 Aligned Vision</div>
            </div>

            {/* Mission */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Our Mission</h3>
              <ul className="text-sm text-stone-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">·</span>
                  <span>Deliver rigorous, interactive instruction across sciences, mathematics, and languages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">·</span>
                  <span>Empower students with smart classroom tools and foundational computing in the ICT lab.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">·</span>
                  <span>Ensure zero barriers for differently abled children (CWSN) and prioritize gender equity.</span>
                </li>
              </ul>
            </div>

            {/* Core Values */}
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Core Values</h3>
              <div className="space-y-3 text-xs sm:text-sm text-stone-600">
                <div>
                  <span className="font-semibold text-stone-900">Integrity & Seva:</span> Truthfulness, duty, and service to society and nation.
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Scientific Temper:</span> Curiosity, rational inquiry, and freedom from superstition.
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Ecological Humility:</span> Reverence for our valley, water sources, and forests.
                </div>
                <div>
                  <span className="font-semibold text-stone-900">Empathy & Inclusivity:</span> Respect for diversity and support for every learner.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Head of Institution Address */}
        {activeTab === 'hoi' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="p-6 sm:p-10">
              
              {/* Headmaster Profile Header with Photo */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border-2 border-emerald-900 shadow-md shrink-0 bg-stone-900">
                    <img
                      src={SCHOOL_IMAGES.headmaster}
                      alt="Headmaster Mr. Shareef Ahmad Khan in his formal school office"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-0.5">
                      Institutional Leadership
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900">
                      {hoiName || INITIAL_SCHOOL_INFO.hoi.name}
                    </h3>
                    <div className="text-sm font-semibold text-stone-700 mt-0.5">
                      Headmaster / Head of Institution (HOI)
                    </div>
                    <div className="text-xs text-stone-500 mt-1 flex flex-wrap items-center gap-2">
                      <span>Qualifications: <strong className="text-stone-800">M.A., B.Ed.</strong></span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span>PM SHRI GHS Chowgam</span>
                    </div>

                    {/* Official Contact Badges */}
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
                  onClick={onOpenAdmin}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Update HOI Details</span>
                </button>
              </div>

              {/* Message Content */}
              <div className="prose max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 mb-8">
                <blockquote className="border-l-0 p-4 bg-stone-50 rounded-lg italic font-serif text-stone-800 text-base sm:text-lg">
                  "{hoiMessage || INITIAL_SCHOOL_INFO.hoi.message}"
                </blockquote>
              </div>

              {/* Annual Priorities */}
              <div className="pt-6 border-t border-stone-200">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4">
                  Institutional Priorities for the Academic Year
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(annualPriorities.length > 0 ? annualPriorities : INITIAL_SCHOOL_INFO.hoi.annualPriorities).map((priority, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-stone-50 rounded-lg text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{priority}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signoff block */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <div>
                  <div className="font-semibold text-stone-900">{hoiName || INITIAL_SCHOOL_INFO.hoi.name}</div>
                  <div>Headmaster (M.A., B.Ed.) · HOI</div>
                </div>
                <div className="font-mono text-[11px] text-stone-400">PM SHRI GHS Chowgam · Zone Shangas</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: PM SHRI & NEP 2020 Mandate */}
        {activeTab === 'nep' && (
          <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-xs">
            <div className="max-w-3xl mb-6">
              <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-1">
                Policy Alignment & Vision
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                PM SHRI Schools & National Education Policy 2020
              </h3>
              <p className="text-sm text-stone-600 mt-2">
                PM SHRI (PM ScHools for Rising India) is a transformative initiative by the Government of India to develop exemplar schools that showcase the implementation of the National Education Policy 2020.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
              <div className="space-y-4">
                <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  Key PM SHRI Focus Areas at Chowgam
                </h4>
                <ul className="text-xs sm:text-sm text-stone-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span><strong>Pedagogical Shift:</strong> Experiential, inquiry-driven, and enjoyable learning replacing rote memory.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span><strong>Green School Ethos:</strong> Carbon-neutral practices, water harvesting awareness, and waste segregation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span><strong>Digital Foundation:</strong> Timetabled exposure to smart classroom audiovisuals and ICT computing terminals.</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Equity and Child-Centered Principles
                </h4>
                <ul className="text-xs sm:text-sm text-stone-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span><strong>Inclusivity First:</strong> Barrier-free access and dedicated sanitation facilities for CWSN students.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span><strong>Multilingual Bridge:</strong> Mother tongue / Kashmiri & Urdu alongside English language instruction.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">·</span>
                    <span><strong>Holistic Assessment:</strong> Continuous evaluation celebrating co-curricular talents and sportsmanship.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
