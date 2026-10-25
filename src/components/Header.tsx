import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  Search, 
  Volume2, 
  Eye, 
  Lock,
  ChevronDown
} from 'lucide-react';
import { INITIAL_SCHOOL_INFO } from '../data/schoolData';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onToggleContrast: () => void;
  isHighContrast: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  onChangeFontSize: (size: 'sm' | 'md' | 'lg') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenAdmin,
  onToggleContrast,
  isHighContrast,
  fontSize,
  onChangeFontSize,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academicsDropdown, setAcademicsDropdown] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About School' },
    { id: 'facilities', label: 'Infrastructure' },
    { id: 'academics', label: 'Academics' },
    { id: 'jkbose-board', label: 'JKBOSE Board' },
    { id: 'beyond', label: 'Holistic Growth' },
    { id: 'pmshri', label: 'PM SHRI Dashboard' },
    { id: 'staff', label: 'Faculty & Staff' },
    { id: 'notices', label: 'Notices & Circulars' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setAcademicsDropdown(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Utility & Accessibility Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide text-amber-300">PM SHRI SCHOOL</span>
            <span aria-hidden="true" className="text-emerald-700">·</span>
            <span className="hidden sm:inline">Govt High School Chowgam · Zone Shangus</span>
            <span aria-hidden="true" className="hidden sm:inline text-emerald-700">·</span>
            <a href="tel:7889725799" className="hidden md:inline text-amber-200 hover:text-white transition-colors">
              Tel: 7889725799
            </a>
            <span aria-hidden="true" className="hidden lg:inline text-emerald-700">·</span>
            <a href="mailto:hschowgam@gmail.com" className="hidden lg:inline text-emerald-300 hover:text-white transition-colors">
              hschowgam@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Font Sizer */}
            <div className="flex items-center gap-1 bg-emerald-900/60 rounded px-1.5 py-0.5" title="Adjust text size">
              <span className="text-[10px] text-emerald-400 mr-1">Text:</span>
              <button 
                onClick={() => onChangeFontSize('sm')} 
                className={`px-1 py-0.2 rounded text-[11px] font-bold ${fontSize === 'sm' ? 'bg-emerald-700 text-white' : 'text-emerald-300 hover:text-white'}`}
                aria-label="Small font size"
              >
                A-
              </button>
              <button 
                onClick={() => onChangeFontSize('md')} 
                className={`px-1 py-0.2 rounded text-[11px] font-bold ${fontSize === 'md' ? 'bg-emerald-700 text-white' : 'text-emerald-300 hover:text-white'}`}
                aria-label="Default font size"
              >
                A
              </button>
              <button 
                onClick={() => onChangeFontSize('lg')} 
                className={`px-1 py-0.2 rounded text-[11px] font-bold ${fontSize === 'lg' ? 'bg-emerald-700 text-white' : 'text-emerald-300 hover:text-white'}`}
                aria-label="Large font size"
              >
                A+
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              onClick={onToggleContrast}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors ${isHighContrast ? 'bg-amber-400 text-black font-semibold' : 'bg-emerald-900/60 text-emerald-200 hover:text-white'}`}
              title="Toggle high contrast mode"
            >
              <Eye className="w-3 h-3" />
              <span>{isHighContrast ? 'Normal Contrast' : 'High Contrast'}</span>
            </button>

            {/* Staff / Admin Login Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-800/80 text-emerald-200 hover:bg-emerald-700 text-[11px] transition-colors"
              title="Staff Portal & Administration"
            >
              <Lock className="w-3 h-3 text-amber-300" />
              <span className="hidden sm:inline">Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Compliant with strict 3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single element brand mark */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
            aria-label="PM SHRI Govt High School Chowgam Home"
          >
            {/* School Emblem Crest */}
            <div className="w-12 h-12 rounded-lg bg-emerald-900 border border-emerald-800 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-800 transition-colors shrink-0">
              <svg className="w-7 h-7 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10" />
                <path d="M6 10h10" />
                <path d="M6 14h6" />
                <path d="m18 2-6 8" />
              </svg>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-900 transition-colors">
                PM SHRI GHS CHOWGAM
              </div>
              <div className="text-xs text-stone-500 font-medium">
                Dist. Anantnag, Jammu & Kashmir
              </div>
            </div>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 text-stone-700 hover:text-emerald-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === item.id ? 'text-emerald-900 font-bold underline decoration-2 decoration-emerald-800' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Utility Search */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Search school website"
              title="Quick Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 rounded-lg hover:bg-emerald-800 transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              Admissions & Enquiries
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id 
                  ? 'bg-emerald-50 text-emerald-900 font-semibold' 
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-stone-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-emerald-800 bg-emerald-50/70 flex items-center justify-between"
            >
              <span>Staff Administration Portal</span>
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
