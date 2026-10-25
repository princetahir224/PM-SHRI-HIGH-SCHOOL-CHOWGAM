import React from 'react';
import { 
  Building2, 
  MapPin, 
  Lock, 
  ExternalLink, 
  Heart,
  TreePine,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_SCHOOL_INFO } from '../data/schoolData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Institutional Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-800 border border-emerald-700 text-white flex items-center justify-center font-bold text-lg">
                <TreePine className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="font-bold text-white text-base tracking-tight">
                  PM SHRI GOVT HIGH SCHOOL CHOWGAM
                </div>
                <div className="text-xs text-emerald-400 font-mono">
                  District Anantnag, Jammu & Kashmir
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-serif italic">
              "{INITIAL_SCHOOL_INFO.tagline}"
            </p>

            <div className="text-xs text-stone-400 space-y-1">
              <p>Chowgam Mini-Valley, ~27 km from Anantnag Town</p>
              <p>Zone: Shangus · Distt: Anantnag, J&K, India</p>
              <div className="pt-2 flex flex-col gap-1 text-stone-300 font-mono text-[11px]">
                <div>Headmaster: Mr. Shareef Ahmad Khan (M.A., B.Ed.)</div>
                <div>Phone: <a href="tel:7889725799" className="text-amber-300 hover:underline">7889725799</a></div>
                <div>Email: <a href="mailto:hschowgam@gmail.com" className="text-emerald-400 hover:underline">hschowgam@gmail.com</a></div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Institutional Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  School Homepage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Our School & Mountain Setting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('facilities')} className="hover:text-white transition-colors">
                  Campus Facilities & Infrastructure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academics')} className="hover:text-white transition-colors">
                  Academics & Secondary Classes (6-10)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('jkbose-board')} className="hover:text-amber-300 font-medium text-amber-200 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  JKBOSE Live Notice Board & AI Desk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('beyond')} className="hover:text-white transition-colors">
                  Beyond the Classroom (10 Pillars)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pmshri')} className="hover:text-white transition-colors">
                  PM SHRI Quality Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('staff')} className="hover:text-white transition-colors">
                  Head of Institution & Staff Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact & Admissions Enquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Educational Portals (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Official Educational Portals
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-stone-800/80 rounded-lg border border-stone-700/60">
                <div className="font-semibold text-white mb-0.5">PM SHRI Schools Portal</div>
                <div className="text-[11px] text-stone-400">Department of School Education & Literacy, Govt of India</div>
              </div>

              <div className="p-3 bg-stone-800/80 rounded-lg border border-stone-700/60">
                <div className="font-semibold text-white mb-0.5">Jammu & Kashmir Board of School Education (JKBOSE)</div>
                <div className="text-[11px] text-stone-400">Prescribed curriculum, textbooks, and matriculation certification</div>
              </div>

              <div className="p-3 bg-stone-800/80 rounded-lg border border-stone-700/60">
                <div className="font-semibold text-white mb-0.5">DIKSHA & SWAYAM PRABHA</div>
                <div className="text-[11px] text-stone-400">National digital platform for students and teachers</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Admin Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} PM SHRI Govt High School Chowgam, Anantnag, J&K. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-stone-400 hover:text-stone-200 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Staff & Administrative Access</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
