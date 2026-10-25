import React, { useState } from 'react';
import { Search, X, BookOpen, Building, Bell, ArrowRight } from 'lucide-react';
import { FacilityItem, NoticeItem, AcademicClass } from '../data/schoolData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: FacilityItem[];
  notices: NoticeItem[];
  classes: AcademicClass[];
  onNavigate: (sectionId: string) => void;
  onSelectNotice: (notice: NoticeItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  facilities,
  notices,
  classes,
  onNavigate,
  onSelectNotice,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedNotices = q ? notices.filter(n => 
    n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
  ) : [];

  const matchedFacilities = q ? facilities.filter(f => 
    f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
  ) : [];

  const matchedClasses = q ? classes.filter(c => 
    c.grade.toLowerCase().includes(q) || c.subjects.some(s => s.toLowerCase().includes(q))
  ) : [];

  const hasResults = matchedNotices.length > 0 || matchedFacilities.length > 0 || matchedClasses.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in duration-150">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search school notices, facilities, subjects, classrooms..."
            className="w-full text-sm text-stone-900 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-stone-400 hover:text-stone-700 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200 text-sm"
          >
            ✕
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {!query && (
            <div className="py-8 text-center text-stone-400">
              Type keywords such as <span className="text-emerald-800 font-semibold">"admissions"</span>, <span className="text-emerald-800 font-semibold">"science"</span>, <span className="text-emerald-800 font-semibold">"smart room"</span>, or <span className="text-emerald-800 font-semibold">"CWSN"</span>.
            </div>
          )}

          {query && !hasResults && (
            <div className="py-8 text-center text-stone-500">
              No matching records found for "{query}". Try another search term.
            </div>
          )}

          {/* Matched Notices */}
          {matchedNotices.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-emerald-800 font-semibold mb-2 flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" />
                <span>Notices & Circulars ({matchedNotices.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedNotices.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      onClose();
                      onSelectNotice(n);
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-stone-100 flex items-center justify-between text-stone-800 transition-colors"
                  >
                    <div>
                      <div className="font-semibold">{n.title}</div>
                      <div className="text-[11px] text-stone-500">{n.category} · {n.date}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Facilities */}
          {matchedFacilities.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-amber-800 font-semibold mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>Campus Facilities ({matchedFacilities.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedFacilities.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onClose();
                      onNavigate('facilities');
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-stone-100 flex items-center justify-between text-stone-800 transition-colors"
                  >
                    <div>
                      <div className="font-semibold">{f.name}</div>
                      <div className="text-[11px] text-stone-500">{f.status} · {f.accessibility}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Classes */}
          {matchedClasses.length > 0 && (
            <div>
              <div className="text-[11px] font-mono uppercase text-blue-800 font-semibold mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Academics & Classes ({matchedClasses.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedClasses.map((c) => (
                  <button
                    key={c.grade}
                    onClick={() => {
                      onClose();
                      onNavigate('academics');
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-stone-100 flex items-center justify-between text-stone-800 transition-colors"
                  >
                    <div>
                      <div className="font-semibold">{c.grade} - {c.section}</div>
                      <div className="text-[11px] text-stone-500">Subjects: {c.subjects.join(', ')}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-right text-xs text-stone-500">
          Press ESC or click ✕ to close
        </div>

      </div>
    </div>
  );
};
