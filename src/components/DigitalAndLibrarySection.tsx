import React, { useState } from 'react';
import { 
  CheckCircle2
} from 'lucide-react';
import { SCHOOL_IMAGES } from '../data/assets';

interface DigitalAndLibrarySectionProps {
  onOpenDigitalLibrary?: () => void;
}

export const DigitalAndLibrarySection: React.FC<DigitalAndLibrarySectionProps> = ({
  onOpenDigitalLibrary,
}) => {
  const [activeTab, setActiveTab] = useState<'agaaz' | 'smart' | 'ict' | 'library'>('agaaz');
  const [agaazPhotoIndex, setAgaazPhotoIndex] = useState<0 | 1>(0);

  return (
    <section id="digital-library" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Modern Learning Spaces & STEM Labs
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Agaaz Lab, Smart Classroom, ICT Lab & Library
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Bridging geographical distances through hands-on space science instruments in our Agaaz Lab, interactive smart boards, computer systems, and a dedicated school library.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('agaaz')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'agaaz'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Agaaz Space & Science Lab
          </button>
          <button
            onClick={() => setActiveTab('smart')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'smart'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Smart Classroom / Digital Room
          </button>
          <button
            onClick={() => setActiveTab('ict')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'ict'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            ICT Computer Laboratory
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'library'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Dedicated School Library
          </button>
        </div>

        {/* Agaaz Space & Science Lab Showcase */}
        {activeTab === 'agaaz' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-mono text-emerald-800 mb-2">
                  <span>Astronomy & Hands-On STEM Laboratory</span>
                  <span aria-hidden="true">·</span>
                  <span>Zone Shangus</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-3">
                  Agaaz Space & Science Lab
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed mb-5">
                  Our dedicated Agaaz Lab sparks scientific curiosity in astronomy, space exploration, physics, and earth sciences. Supervised by Teacher In-charge <strong>Mr. Muzaffer Rasool Malik</strong>, all scientific and astronomical instruments are available for practical student learning.
                </p>

                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Available Lab Instruments & Apparatus:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700">
                  <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-stone-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Astronomical Telescope:</strong> Reflector telescope & tripod mount for sky and lunar observation.</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-stone-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Orbital & Planetary Kits:</strong> Sun-Earth-Moon apparatus, solar system & illuminated orbit models.</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-stone-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Rocketry & Space Models:</strong> ISRO launch vehicle scaled models & satellite assembly kits.</span>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-stone-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Optical & Science Tools:</strong> Microscopes, prisms, lenses, globes, weather & lab instrument kits.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                <span>
                  Teacher In-charge: <strong className="text-stone-900">Mr. Muzaffer Rasool Malik</strong> (Science Teacher)
                </span>
                <span className="font-mono text-emerald-800 font-semibold">All Instruments Available</span>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="rounded-xl overflow-hidden border border-stone-200 shadow-xs relative aspect-4/3 bg-stone-900">
                <img
                  src={agaazPhotoIndex === 0 ? SCHOOL_IMAGES.agaazLab1 : SCHOOL_IMAGES.agaazLab2}
                  alt={agaazPhotoIndex === 0
                    ? "Students and teachers demonstrating globes and orbital models in Agaaz Lab at PM SHRI GHS Chowgam"
                    : "Agaaz Space & Science Lab showing reflector telescope, solar system apparatus, and planetary murals"}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-4 sm:p-5 text-white text-xs">
                  <div className="font-semibold text-amber-300">
                    {agaazPhotoIndex === 0
                      ? "Agaaz Lab — Orbital & Rocket Models Session"
                      : "Agaaz Lab — Reflector Telescope & Planetary Instruments"}
                  </div>
                  <p className="text-stone-200 text-[11px] mt-0.5">
                    {agaazPhotoIndex === 0
                      ? "Students inspecting Earth-Moon-Sun orbital mechanics and ISRO rocket models."
                      : "Reflector telescope (right shelf), illuminated Sun-Earth model, and Satish Dhawan / Solar System murals."}
                  </p>
                </div>
              </div>

              {/* Dual Lab Photo Switcher */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAgaazPhotoIndex(0)}
                  className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-colors ${
                    agaazPhotoIndex === 0
                      ? 'bg-emerald-50 border-emerald-800 ring-1 ring-emerald-800'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <img
                    src={SCHOOL_IMAGES.agaazLab1}
                    alt="Agaaz Lab orbital session thumbnail"
                    className="w-16 h-12 rounded object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900 truncate">Lab Session & Models</div>
                    <div className="text-[11px] text-stone-500 truncate">Orbital & Rocket Kits</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAgaazPhotoIndex(1)}
                  className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-colors ${
                    agaazPhotoIndex === 1
                      ? 'bg-emerald-50 border-emerald-800 ring-1 ring-emerald-800'
                      : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <img
                    src={SCHOOL_IMAGES.agaazLab2}
                    alt="Agaaz Lab telescope and apparatus thumbnail"
                    className="w-16 h-12 rounded object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-stone-900 truncate">Telescope & Apparatus</div>
                    <div className="text-[11px] text-stone-500 truncate">Solar System & Kits</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Smart Classroom Showcase */}
        {activeTab === 'smart' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-stone-50 p-8 rounded-xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase font-mono text-emerald-800 mb-2">
                  Interactive Digital Pedagogy
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">
                  Interactive Smart Classroom
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed mb-4">
                  The smart classroom transforms abstract science and mathematics concepts into vivid, interactive visual experiences. Equipped with an interactive digital board and multimedia sound, teachers project 3D biological models, geometric proof animations, and historical documentaries.
                </p>

                <div className="space-y-3 pt-4 border-t border-stone-200/60">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>DIKSHA Integration:</strong> Real-time access to energized NCERT and JKBOSE QR-coded textbook modules.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Experiential Science Demos:</strong> High-definition video simulations of experiments that require specialized lab conditions.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Multilingual Audiovisual Aids:</strong> English, Urdu, and Kashmiri language pronunciation, grammar, and literature stories.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <span>Timetabled for Classes 6 to 10</span>
                <span className="font-mono text-emerald-800">Operational Daily</span>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-stone-200 shadow-xs relative min-h-[350px]">
              <img
                src={SCHOOL_IMAGES.smartClassroom}
                alt="Smart classroom at PM SHRI GHS Chowgam"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6 text-white text-xs">
                <div>
                  <div className="font-semibold text-amber-300">Smart Classroom & Digital Center</div>
                  <p className="text-stone-300 text-[11px] mt-0.5">Fostering active student engagement through digital presentations.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ICT Computer Laboratory */}
        {activeTab === 'ict' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-stone-50 p-8 rounded-xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase font-mono text-emerald-800 mb-2">
                  Computer Literacy & Computational Skills
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">
                  ICT Computer Laboratory
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed mb-4">
                  In today's digital era, computer fluency is an essential life skill. Our dedicated ICT computer lab provides hands-on terminals for students to learn typing, word processing, basic computational logic, spreadsheet creation, and educational software navigation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-200/60 text-xs text-stone-700">
                  <div className="p-3 bg-white rounded-lg border border-stone-200/60">
                    <strong className="block text-stone-900 mb-1">Foundational Typing & Office Tools</strong>
                    English & Urdu keyboarding, formatting documents, and presentations.
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-200/60">
                    <strong className="block text-stone-900 mb-1">Cyber Ethics & Safe Browsing</strong>
                    Recognizing online risks, password safety, and responsible digital citizenship.
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <span>ICT In-charge: <strong className="text-stone-800">Mr. Tahir Ahmad Kumar</strong> (Teacher & Examination In-charge)</span>
                <span className="font-mono text-emerald-800">1:1 Student Workstations</span>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-stone-200 shadow-xs relative min-h-[350px]">
              <img
                src={SCHOOL_IMAGES.smartClassroom}
                alt="ICT Lab at PM SHRI GHS Chowgam"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6 text-white text-xs">
                <div>
                  <div className="font-semibold text-amber-300">ICT Learning Laboratory</div>
                  <p className="text-stone-300 text-[11px] mt-0.5">Empowering students with 21st-century technological tools.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* School Library */}
        {activeTab === 'library' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-stone-50 p-8 rounded-xl border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase font-mono text-emerald-800 mb-2">
                  Reading Sanctuary & Literature
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4">
                  Dedicated School Library
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed mb-4">
                  Nestled in the quiet wing of our main building overlooking the mini-valley mountains, the school library is a tranquil haven for reading and reflection. It houses a growing collection of curriculum reference books, historical biographies, Kashmiri folk literature, Urdu prose, English classics, and popular science periodicals.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200/60 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-stone-200/60">
                    <span className="font-semibold text-stone-900 block">Weekly Reading Period</span>
                    <span className="text-stone-500">Dedicated silent reading slot for every class in the weekly timetable.</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-200/60">
                    <span className="font-semibold text-stone-900 block">Book Review Circle</span>
                    <span className="text-stone-500">Monthly book review contests in English, Urdu, and Kashmiri.</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-stone-200/60">
                    <span className="font-semibold text-stone-900 block">Lending Facility</span>
                    <span className="text-stone-500">Free home borrowing with library cards maintained by the faculty in-charge.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                <span>Free Open Access for All Enrolled Students</span>
                {onOpenDigitalLibrary ? (
                  <button
                    type="button"
                    onClick={onOpenDigitalLibrary}
                    className="px-4 py-2 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white font-semibold transition-colors whitespace-nowrap"
                  >
                    Open Smart Digital Library (Read Books Online) →
                  </button>
                ) : (
                  <span className="font-mono text-emerald-800">Reading Tables & Study Desks</span>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-stone-200 shadow-xs relative min-h-[350px]">
              <img
                src={SCHOOL_IMAGES.library}
                alt="School library at PM SHRI GHS Chowgam"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-6 text-white text-xs">
                <div>
                  <div className="font-semibold text-amber-300">Dedicated Reading Library</div>
                  <p className="text-stone-300 text-[11px] mt-0.5">A quiet sanctuary surrounded by mountain vistas.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
