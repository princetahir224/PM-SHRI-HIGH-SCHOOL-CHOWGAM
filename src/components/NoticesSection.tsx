import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  FileText, 
  PlusCircle, 
  ExternalLink,
  Printer,
  Sparkles
} from 'lucide-react';
import { NoticeItem } from '../data/schoolData';

interface NoticesSectionProps {
  notices: NoticeItem[];
  onOpenAdmin: () => void;
  onSelectNotice: (notice: NoticeItem) => void;
  selectedNotice: NoticeItem | null;
  onCloseNoticeModal: () => void;
}

export const NoticesSection: React.FC<NoticesSectionProps> = ({
  notices,
  onOpenAdmin,
  onSelectNotice,
  selectedNotice,
  onCloseNoticeModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Admissions', 'Academic', 'PM SHRI', 'Examination', 'General'];

  const filteredNotices = notices.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="notices" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              Official Communications & Bulletin
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Notices, Circulars & Academic Updates
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Stay informed with official circulars, examination alerts, admission procedures, holiday notices, and PM SHRI event schedules published by PM SHRI Govt High School Chowgam.
            </p>
          </div>

          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Publish Circular (Admin)</span>
          </button>
        </div>

        {/* Toolbar: Search and Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-2xs">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circulars, topics, keywords..."
              className="w-full text-xs text-stone-800 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-stone-700 text-xs">
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Cards Grid */}
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 rounded-xl border transition-all ${
                notice.isImportant 
                  ? 'bg-amber-50/40 border-amber-300 shadow-xs' 
                  : 'bg-white border-stone-200 shadow-2xs hover:border-stone-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-emerald-800 uppercase font-semibold">
                    {notice.category}
                  </span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-stone-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    {notice.date}
                  </span>
                  {notice.isImportant && (
                    <>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-amber-800 font-semibold text-[11px] uppercase">
                        Important Priority
                      </span>
                    </>
                  )}
                </div>

                <div className="text-xs font-mono text-stone-400">
                  Ref: GHS/CHW/{notice.id.toUpperCase()}
                </div>
              </div>

              <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                {notice.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3 mb-4">
                {notice.content}
              </p>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectNotice(notice)}
                    className="text-xs font-semibold text-emerald-900 hover:text-emerald-700 underline flex items-center gap-1"
                  >
                    <span>Read Full Circular</span>
                    <span>→</span>
                  </button>
                  {notice.attachmentName && (
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>{notice.attachmentName}</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectNotice(notice)}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-8 text-stone-500 text-sm">
              No circulars match the selected filter or search term.
            </div>
          )}
        </div>

        {/* Selected Notice Detailed Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-stone-200 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase mb-1">
                    <span>{selectedNotice.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedNotice.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 leading-snug">
                    {selectedNotice.title}
                  </h3>
                </div>
                <button
                  onClick={onCloseNoticeModal}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto py-4 flex-1 text-sm text-stone-700 leading-relaxed space-y-4">
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-100 whitespace-pre-line">
                  {selectedNotice.content}
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-lg text-xs text-emerald-950 space-y-1">
                  <div className="font-bold">Official Verification Seal:</div>
                  <div>Office of the Headmaster / Head of Institution (HOI)</div>
                  <div>PM SHRI Govt High School Chowgam, Dist. Anantnag, J&K</div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 border border-stone-200 text-stone-700 hover:bg-stone-100 rounded-lg font-medium flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Circular</span>
                </button>

                <button
                  onClick={onCloseNoticeModal}
                  className="px-4 py-1.5 bg-emerald-900 text-white rounded-lg font-semibold hover:bg-emerald-800"
                >
                  Close Notice
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
