import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  RotateCw, 
  Search, 
  Filter, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  Calendar, 
  ArrowRight, 
  Printer, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Bot,
  Zap
} from 'lucide-react';
import { 
  JkboseNotice, 
  fetchJkboseNotices, 
  syncJkboseFeed, 
  queryKashmirAiDesk,
  FALLBACK_JKBOSE_NOTICES
} from '../services/jkboseService';

export const JkboseNoticeBoard: React.FC = () => {
  const [notices, setNotices] = useState<JkboseNotice[]>(FALLBACK_JKBOSE_NOTICES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [selectedNoticeModal, setSelectedNoticeModal] = useState<JkboseNotice | null>(null);

  // AI Kashmir Desk state
  const [aiQuery, setAiQuery] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiAnswer, setAiAnswer] = useState<string>('');
  const [aiSource, setAiSource] = useState<string>('');
  const [aiTime, setAiTime] = useState<string>('');

  const [activeBoardTab, setActiveBoardTab] = useState<'important' | 'all' | 'ai-desk'>('important');

  // Load notices initially
  useEffect(() => {
    loadNotices();
  }, []);

  // Auto-update timer
  useEffect(() => {
    if (!autoUpdateEnabled) return;
    const interval = setInterval(() => {
      handleSync(true); // background silent sync
    }, 60000); // every 60s
    return () => clearInterval(interval);
  }, [autoUpdateEnabled]);

  const loadNotices = async () => {
    const data = await fetchJkboseNotices();
    setNotices(data.notices);
    setLastSyncTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  };

  const handleSync = async (silent = false) => {
    if (!silent) setIsSyncing(true);
    await syncJkboseFeed();
    await loadNotices();
    if (!silent) {
      setTimeout(() => setIsSyncing(false), 600);
    }
  };

  const handleAiAsk = async (queryText?: string) => {
    const q = queryText || aiQuery;
    if (!q.trim()) return;
    setAiLoading(true);
    setAiAnswer('');
    const res = await queryKashmirAiDesk(q);
    setAiAnswer(res.answer);
    setAiSource(res.source);
    setAiTime(res.timestamp);
    setAiLoading(false);
  };

  const promptSuggestions = [
    "Class 10th Board Exam registration schedule & eligibility",
    "Rationalized NEP 2020 textbooks & 20-mark internal assessment",
    "Special CWSN extra time and scribe concessions by JKBOSE",
    "Science practical demonstration guidelines for high schools",
    "DSEK Kashmir uniform academic calendar & school timing"
  ];

  const categories = ['all', 'Class 10th (Matric)', 'Curriculum & Textbooks', 'Datesheets & Exams', 'DSEK Kashmir', 'General Board'];

  const filteredNotices = notices.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.refNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const importantNotices = notices.filter(n => n.isHighPriority);

  return (
    <section id="jkbose-board" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Official Board Integration</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Kashmir Division</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              JKBOSE Notice Board & Desk of Kashmir
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Live, auto-updated circulars directly from the <strong>Jammu & Kashmir Board of School Education (JKBOSE)</strong> and the <strong>Desk of Kashmir</strong> powered by Google AI intelligence.
            </p>
          </div>

          {/* Sync status & Auto-update control */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-stone-600">Feed: <strong className="text-stone-900">Auto-Synced</strong></span>
              <span className="text-stone-400 font-mono">({lastSyncTime})</span>
            </div>

            <div className="h-4 w-px bg-stone-300 hidden sm:block" />

            <button
              onClick={() => handleSync(false)}
              disabled={isSyncing}
              className="px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded text-stone-700 font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Fetch latest updates from JKBOSE repository"
            >
              <RotateCw className={`w-3.5 h-3.5 text-emerald-700 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>

            <label className="flex items-center gap-1.5 cursor-pointer text-stone-600 select-none">
              <input
                type="checkbox"
                checked={autoUpdateEnabled}
                onChange={(e) => setAutoUpdateEnabled(e.target.checked)}
                className="rounded text-emerald-800 focus:ring-emerald-700"
              />
              <span>Auto-refresh</span>
            </label>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-stone-200">
          <button
            onClick={() => setActiveBoardTab('important')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeBoardTab === 'important'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-amber-300" />
            <span>Important Notices of JKBOSE</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-emerald-800 text-white">
              {importantNotices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveBoardTab('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeBoardTab === 'all'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Bell className="w-4 h-4 text-emerald-300" />
            <span>All Board Circulars Feed</span>
            <span className="text-[11px] font-mono px-1.5 py-0.2 rounded bg-stone-200 text-stone-800">
              {notices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveBoardTab('ai-desk')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeBoardTab === 'ai-desk'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Desk of Kashmir by AI & Google</span>
          </button>
        </div>

        {/* TAB 1: Important Notices of JKBOSE */}
        {activeBoardTab === 'important' && (
          <div className="space-y-6">
            <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl flex items-center justify-between gap-4 text-xs text-amber-900">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <span>
                  <strong>High Priority Board Orders:</strong> Critical notifications for Class 10th examinations, NEP 2020 syllabi, and CWSN inclusion from the Academic Central Wing of JKBOSE.
                </span>
              </div>
              <span className="font-mono text-[11px] shrink-0 text-amber-800">Kashmir Province</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {importantNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-stone-50 rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-emerald-800/40 transition-all shadow-xs group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <span className="font-mono text-emerald-800 font-bold bg-white px-2 py-0.5 rounded border border-stone-200">
                        {notice.refNo}
                      </span>
                      <span className="text-stone-500 font-mono text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        {notice.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mb-2 group-hover:text-emerald-950">
                      {notice.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {notice.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                    <span className="font-medium text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded text-[11px]">
                      {notice.category}
                    </span>
                    <button
                      onClick={() => setSelectedNoticeModal(notice)}
                      className="px-3.5 py-1.5 bg-emerald-900 text-white rounded-lg font-semibold hover:bg-emerald-800 flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Read Full Circular</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: All Board Circulars Feed */}
        {activeBoardTab === 'all' && (
          <div>
            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 flex-1 max-w-md bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5">
                <Search className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by ref no, keyword, or title..."
                  className="w-full text-xs text-stone-800 focus:outline-none bg-transparent"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-stone-700 text-xs">
                    ✕
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg overflow-x-auto">
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
                    {cat === 'all' ? 'All Feeds' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List View of Board Circulars */}
            <div className="space-y-3">
              {filteredNotices.map((n) => (
                <div
                  key={n.id}
                  className="p-5 bg-stone-50 rounded-xl border border-stone-200 hover:bg-white hover:border-stone-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-emerald-800 font-bold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {n.refNo}
                      </span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-stone-500 font-mono text-[11px]">{n.date}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-stone-600 font-medium text-[11px]">{n.category}</span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900 leading-snug">
                      {n.title}
                    </h4>

                    <p className="text-xs text-stone-600 line-clamp-2">
                      {n.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedNoticeModal(n)}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-white border border-stone-200 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>View Notice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredNotices.length === 0 && (
                <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-xs">
                  No board notices matched your search criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Desk of Kashmir by AI and Google Updates */}
        {activeBoardTab === 'ai-desk' && (
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-800 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI & Google Search Intelligence Desk</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900">
                  Desk of Kashmir Educational Advisor
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Ask questions about JKBOSE board examinations, Class 10th guidelines, DSEK circulars, winter school timings, and PM SHRI High School Chowgam academic standards.
                </p>
              </div>

              <div className="text-xs text-stone-500 bg-white border border-stone-200 p-3 rounded-lg max-w-xs shrink-0">
                <div className="font-semibold text-stone-800">Model Power:</div>
                <div>Google Gemini 3.8 Flash grounded with J&K School Education data</div>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-stone-700 mb-2">
                Frequently Inquired Topics:
              </div>
              <div className="flex flex-wrap gap-2">
                {promptSuggestions.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiQuery(prompt);
                      handleAiAsk(prompt);
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-stone-200 rounded-lg text-xs text-stone-700 hover:text-emerald-900 transition-colors text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Search / Input Box */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
                placeholder="Ask about JKBOSE Class 10th exams, datesheet, syllabus, or Kashmir school directives..."
                className="flex-1 bg-white border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700 shadow-2xs"
              />
              <button
                onClick={() => handleAiAsk()}
                disabled={aiLoading || !aiQuery.trim()}
                className="px-6 py-3 bg-emerald-900 text-white rounded-xl font-semibold text-xs sm:text-sm hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 shadow-xs"
              >
                {aiLoading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Ask Desk of Kashmir</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Generated Answer Card */}
            {aiAnswer && (
              <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs animate-in fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold font-mono">
                    <Bot className="w-4 h-4" />
                    <span>Official Educational Intelligence Summary</span>
                  </div>
                  <span className="text-stone-400 font-mono text-[11px]">{aiTime}</span>
                </div>

                <div className="prose max-w-none text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-3 font-sans">
                  {aiAnswer}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Source: {aiSource}</span>
                  </div>
                  <span className="font-mono text-[11px]">Supervised by Headmaster Desk · PM SHRI GHS Chowgam</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notice Full Screen Modal */}
        {selectedNoticeModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col animate-in fade-in">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase mb-1 font-bold">
                    <span>{selectedNoticeModal.refNo}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedNoticeModal.date}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                    {selectedNoticeModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNoticeModal(null)}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto py-4 flex-1 text-xs sm:text-sm font-mono whitespace-pre-wrap bg-stone-50 p-4 rounded-xl border border-stone-200 text-stone-800 leading-relaxed">
                {selectedNoticeModal.fullText}
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 border border-stone-200 text-stone-700 hover:bg-stone-100 rounded-lg font-medium flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Board Circular</span>
                </button>

                <button
                  onClick={() => {
                    const blob = new Blob([selectedNoticeModal.fullText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${selectedNoticeModal.refNo.replace(/[/\\?%*:|"<>]/g, '_')}.txt`;
                    a.click();
                  }}
                  className="px-4 py-2 bg-emerald-900 text-white rounded-lg font-semibold hover:bg-emerald-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Circular Text</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
