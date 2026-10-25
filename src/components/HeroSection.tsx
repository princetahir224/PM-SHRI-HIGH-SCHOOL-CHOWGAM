import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Laptop, 
  MapPin, 
  Users, 
  ArrowRight, 
  Calendar, 
  Bell, 
  Building,
  CheckCircle2
} from 'lucide-react';
import { SCHOOL_IMAGES } from '../data/assets';
import { INITIAL_SCHOOL_INFO, NoticeItem } from '../data/schoolData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  notices: NoticeItem[];
  onSelectNotice: (notice: NoticeItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  notices,
  onSelectNotice
}) => {
  const latestNotice = notices[0];
  const [activePhoto, setActivePhoto] = React.useState<'campus' | 'assembly'>('campus');
  const currentImage = activePhoto === 'campus' ? SCHOOL_IMAGES.actualCampus : SCHOOL_IMAGES.morningAssembly;

  return (
    <div className="relative">
      {/* Hero Visual Area with Mountain Backdrop */}
      <div className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-stone-900">
        {/* Background Image with Fallback */}
        <img
          key={activePhoto}
          src={currentImage}
          alt={activePhoto === 'campus' 
            ? "PM SHRI Govt High School Chowgam campus nestled in the green mountain valley" 
            : "PM SHRI Govt High School Chowgam morning assembly in the highlands"}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-700 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Measured Contrast Scrim (Ensures WCAG AA Legibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-900/50" />
        
        {/* Subtle decorative geometric mountain contour */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Authentic Campus Photo Switcher in Hero */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 sm:gap-2 bg-stone-950/85 backdrop-blur-md p-1.5 rounded-xl border border-white/20 text-xs text-white shadow-lg">
          <span className="text-[10px] sm:text-[11px] text-stone-300 font-mono px-1 sm:px-2 hidden xs:inline">Campus View:</span>
          <button
            onClick={() => setActivePhoto('campus')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
              activePhoto === 'campus'
                ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            School Building
          </button>
          <button
            onClick={() => setActivePhoto('assembly')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activePhoto === 'assembly'
                ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                : 'text-stone-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Morning Assembly
          </button>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center text-white">
          
          {/* Institutional Trust Kicker (Unboxed text with dots) */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-300 tracking-wider mb-4 flex-wrap justify-center">
            <span>GOVERNMENT OF JAMMU & KASHMIR</span>
            <span aria-hidden="true">·</span>
            <span>ZONE: SHANGLUS</span>
            <span aria-hidden="true">·</span>
            <span>DISTT: ANANTNAG</span>
            <span aria-hidden="true">·</span>
            <span>PM SHRI SCHOOL</span>
          </div>

          {/* Primary School Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight" style={{ textWrap: 'balance' }}>
            PM SHRI GOVT HIGH SCHOOL CHOWGAM
          </h1>

          {/* Official Subheading & Motto */}
          <p className="text-lg sm:text-2xl font-serif italic text-amber-200/90 mb-5 max-w-2xl mx-auto">
            Learning Today, Leading Tomorrow.
          </p>

          {/* Supporting Statement */}
          <p className="text-sm sm:text-base text-stone-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Empowering young minds through quality education, digital innovation, inclusive learning, environmental responsibility, and holistic development in the beautiful surroundings of Chowgam.
          </p>

          {/* 5 Prominent Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto mb-10">
            <button
              onClick={() => onNavigate('about')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>Explore Our School</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <span>Admissions & Enquiries</span>
            </button>

            <button
              onClick={() => onNavigate('academics')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-100 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xs rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Academic Excellence</span>
            </button>

            <button
              onClick={() => onNavigate('facilities')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-100 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xs rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Building className="w-4 h-4 text-emerald-300" />
              <span>Explore School Facilities</span>
            </button>

            <button
              onClick={() => onNavigate('staff')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-100 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xs rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>Contact Head of Institution</span>
            </button>
          </div>

          {/* Tagline Ribbon */}
          <div className="pt-4 border-t border-white/15 text-xs sm:text-sm text-stone-300 font-serif italic">
            "{INITIAL_SCHOOL_INFO.tagline}"
          </div>

        </div>
      </div>

      {/* Live Announcement Marquee / Notification Strip */}
      {latestNotice && (
        <div className="bg-amber-500 text-stone-950 px-4 py-2.5 border-b border-amber-600">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex h-2 w-2 relative">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-900" />
              </span>
              <span className="font-bold uppercase tracking-wider text-[11px] text-stone-900">
                Latest Notice:
              </span>
            </div>
            
            <div className="truncate flex-1">
              <button 
                onClick={() => onSelectNotice(latestNotice)}
                className="text-left hover:underline truncate inline-block max-w-full font-semibold"
              >
                {latestNotice.title}
              </button>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className="hidden sm:inline text-xs text-stone-800 font-mono">
                {latestNotice.date}
              </span>
              <button
                onClick={() => onNavigate('notices')}
                className="text-xs font-bold text-stone-950 underline hover:text-black whitespace-nowrap"
              >
                All Circulars →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8 Verified Institutional Highlights (Clean Unboxed Grid with Tabular Numerals) */}
      <div className="bg-white border-b border-stone-200 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            {/* 1. Staff count */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
                13
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Dedicated Staff Members
              </div>
              <div className="text-[11px] text-stone-400">
                Faculty & Administration
              </div>
            </div>

            {/* 2. School Buildings */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
                2 Buildings
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Two-Story Main Block
              </div>
              <div className="text-[11px] text-stone-400">
                + Auxiliary Learning Block
              </div>
            </div>

            {/* 3. Campus Area */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
                ~3 Acres
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Mini-Valley Campus
              </div>
              <div className="text-[11px] text-stone-400">
                Subject to official verification
              </div>
            </div>

            {/* 4. Sanitation Facilities */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Separate & CWSN
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Dedicated Toilet Units
              </div>
              <div className="text-[11px] text-stone-400">
                Boys', Girls' & Barrier-free
              </div>
            </div>

            {/* 5. Smart Classroom */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                Smart Room
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Interactive Digital Board
              </div>
              <div className="text-[11px] text-stone-400">
                Audiovisual DIKSHA modules
              </div>
            </div>

            {/* 6. ICT Laboratory */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                ICT Lab
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Computer Learning Center
              </div>
              <div className="text-[11px] text-stone-400">
                Digital literacy for every child
              </div>
            </div>

            {/* 7. Dedicated Library */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                School Library
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                Dedicated Reading Hall
              </div>
              <div className="text-[11px] text-stone-400">
                Multilingual book repository
              </div>
            </div>

            {/* 8. Mountain Location */}
            <div className="border-l border-stone-200 pl-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                ~27 km
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600 mt-1">
                From Anantnag District HQ
              </div>
              <div className="text-[11px] text-stone-400">
                Foothill of green mountains
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
