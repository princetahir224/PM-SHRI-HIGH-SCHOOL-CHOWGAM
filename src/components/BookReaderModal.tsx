import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Bookmark,
  CheckCircle2,
  List,
  Columns2,
  FileText,
  Sun,
  Moon,
  Coffee,
  Type,
  StickyNote,
  Trash2,
  Printer,
  HelpCircle,
} from 'lucide-react';
import {
  LibraryBook,
  BookProgress,
  ReaderNote,
} from '../data/digitalLibraryData';

interface BookReaderModalProps {
  book: LibraryBook | null;
  initialChapterIndex?: number;
  isBookmarked: boolean;
  progress?: BookProgress;
  notes: ReaderNote[];
  onClose: () => void;
  onToggleBookmark: (bookId: string) => void;
  onUpdateProgress: (bookId: string, chapterIndex: number, completedChapterId?: string) => void;
  onAddNote: (book: LibraryBook, chapterIndex: number, noteText: string) => void;
  onDeleteNote: (noteId: string) => void;
}

type ReaderTheme = 'paper' | 'light' | 'night';
type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';
type ReaderTypeface = 'serif' | 'sans';
type ReaderLayout = 'spread' | 'single';

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  initialChapterIndex = 0,
  isBookmarked,
  progress,
  notes,
  onClose,
  onToggleBookmark,
  onUpdateProgress,
  onAddNote,
  onDeleteNote,
}) => {
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [theme, setTheme] = useState<ReaderTheme>('paper');
  const [fontSize, setFontSize] = useState<ReaderFontSize>('md');
  const [typeface, setTypeface] = useState<ReaderTypeface>('serif');
  const [layout, setLayout] = useState<ReaderLayout>('spread');
  const [showToc, setShowToc] = useState(false);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [noteDraft, setNoteDraft] = useState('');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  useEffect(() => {
    if (book) {
      const startIdx =
        progress && progress.currentChapterIndex < book.chapters.length
          ? progress.currentChapterIndex
          : initialChapterIndex;
      setChapterIndex(startIdx);
      setSelectedQuizOption(null);
      setShowToc(false);
    }
  }, [book?.id]);

  useEffect(() => {
    if (!book) return;
    onUpdateProgress(book.id, chapterIndex);
    setSelectedQuizOption(null);
  }, [chapterIndex, book?.id]);

  useEffect(() => {
    if (!book) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) {
        return;
      }
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setChapterIndex((prev) => Math.min(book.chapters.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setChapterIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  const chapter = book.chapters[chapterIndex] || book.chapters[0];
  const totalChapters = book.chapters.length;
  const completedIds = progress?.completedChapterIds || [];
  const isChapterDone = completedIds.includes(chapter.id);
  const bookNotes = notes.filter((n) => n.bookId === book.id);
  const chapterNotes = bookNotes.filter((n) => n.chapterIndex === chapterIndex);

  const progressPercent = Math.round(
    ((completedIds.length > 0 ? completedIds.length : chapterIndex + 1) / totalChapters) * 100
  );

  // Theme tokens
  const shellTheme =
    theme === 'night'
      ? 'bg-slate-950 text-slate-100'
      : theme === 'paper'
      ? 'bg-[#EFE9DC] text-stone-900'
      : 'bg-stone-100 text-stone-900';

  const toolbarTheme =
    theme === 'night'
      ? 'bg-slate-900 border-slate-800 text-slate-200'
      : 'bg-white border-stone-200 text-stone-800';

  const pageSurface =
    theme === 'night'
      ? 'bg-slate-900 border-slate-800 text-slate-200'
      : theme === 'paper'
      ? 'bg-[#FAF7F0] border-[#E4DEC9] text-stone-900'
      : 'bg-white border-stone-200 text-stone-900';

  const mutedText = theme === 'night' ? 'text-slate-400' : 'text-stone-500';

  const bodySizeClass =
    fontSize === 'sm'
      ? 'text-[14px] leading-relaxed'
      : fontSize === 'lg'
      ? 'text-[18px] leading-[1.8]'
      : fontSize === 'xl'
      ? 'text-[20px] leading-[1.85]'
      : 'text-[16px] leading-[1.75]';

  const bodyFontClass = typeface === 'serif' ? 'font-serif' : 'font-sans';

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = noteDraft.trim();
    if (!trimmed) return;
    onAddNote(book, chapterIndex, trimmed);
    setNoteDraft('');
  };

  const handleCompleteAndNext = () => {
    onUpdateProgress(book.id, chapterIndex, chapter.id);
    if (chapterIndex < totalChapters - 1) {
      setChapterIndex(chapterIndex + 1);
    }
  };

  // Split paragraphs cleanly for Two-Page Spread on desktop
  const splitIndex = Math.max(1, Math.ceil(chapter.paragraphs.length / 2));
  const leftParagraphs = chapter.paragraphs.slice(0, splitIndex);
  const rightParagraphs = chapter.paragraphs.slice(splitIndex);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col ${shellTheme} transition-colors duration-200`}
      role="dialog"
      aria-modal="true"
      aria-label={`Reading ${book.title}`}
    >
      {/* Top Progress Hairline */}
      <div className="h-1 w-full bg-stone-300/40 shrink-0">
        <div
          className="h-full bg-emerald-700 transition-all duration-300"
          style={{ width: `${Math.min(100, progressPercent)}%` }}
        />
      </div>

      {/* Reader Top Control Bar */}
      <div className={`px-4 sm:px-6 py-3 border-b ${toolbarTheme} flex flex-wrap items-center justify-between gap-3 shrink-0`}>
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-stone-300/60 hover:bg-stone-200/40 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            title="Return to Library Shelves (Esc)"
          >
            <X className="w-4 h-4" />
            <span>Close Reader</span>
          </button>

          <button
            type="button"
            onClick={() => setShowToc(!showToc)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors border ${
              showToc
                ? 'bg-emerald-900 text-white border-emerald-900'
                : 'border-stone-300/60 hover:bg-stone-200/40'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Chapters ({totalChapters})</span>
          </button>

          <div className="hidden md:block min-w-0 pl-2 border-l border-stone-300/40">
            <div className="text-sm font-bold truncate max-w-xs lg:max-w-md">{book.title}</div>
            <div className={`text-[11px] font-mono tabular-nums truncate ${mutedText}`}>
              {book.catalogueCode} · Chapter {chapter.chapterNumber} of {totalChapters} · {completedIds.length}/{totalChapters} completed
            </div>
          </div>
        </div>

        {/* Right: Reading Comfort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layout Spread Toggle (Desktop) */}
          <div className="hidden lg:flex items-center p-0.5 rounded-lg border border-stone-300/50 bg-stone-500/10">
            <button
              type="button"
              onClick={() => setLayout('spread')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap ${
                layout === 'spread' ? 'bg-emerald-900 text-white' : 'opacity-75 hover:opacity-100'
              }`}
              title="Two-Page Open Book View"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span>Book Spread</span>
            </button>
            <button
              type="button"
              onClick={() => setLayout('single')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap ${
                layout === 'single' ? 'bg-emerald-900 text-white' : 'opacity-75 hover:opacity-100'
              }`}
              title="Single Column Focus View"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Single Page</span>
            </button>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center p-0.5 rounded-lg border border-stone-300/50 bg-stone-500/10">
            <button
              type="button"
              onClick={() => setTheme('paper')}
              className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap ${
                theme === 'paper' ? 'bg-amber-800 text-white' : 'opacity-75 hover:opacity-100'
              }`}
              title="Warm Paper Theme"
            >
              <Coffee className="w-3 h-3" />
              <span className="hidden sm:inline">Paper</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap ${
                theme === 'light' ? 'bg-stone-900 text-white' : 'opacity-75 hover:opacity-100'
              }`}
              title="Crisp White Theme"
            >
              <Sun className="w-3 h-3" />
              <span className="hidden sm:inline">Day</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('night')}
              className={`px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 whitespace-nowrap ${
                theme === 'night' ? 'bg-emerald-700 text-white' : 'opacity-75 hover:opacity-100'
              }`}
              title="Night Study Theme"
            >
              <Moon className="w-3 h-3" />
              <span className="hidden sm:inline">Night</span>
            </button>
          </div>

          {/* Font Size & Serif Toggle */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg border border-stone-300/50 bg-stone-500/10">
            {(['sm', 'md', 'lg', 'xl'] as ReaderFontSize[]).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setFontSize(sz)}
                className={`px-2 py-1 rounded text-[11px] font-mono uppercase font-bold ${
                  fontSize === sz ? 'bg-emerald-900 text-white' : 'opacity-75 hover:opacity-100'
                }`}
                title={`Text size ${sz.toUpperCase()}`}
              >
                {sz === 'sm' ? 'A-' : sz === 'md' ? 'A' : sz === 'lg' ? 'A+' : 'A++'}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setTypeface(typeface === 'serif' ? 'sans' : 'serif')}
              className="px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border-l border-stone-300/40 opacity-85 hover:opacity-100 whitespace-nowrap"
              title="Toggle Book Serif / Clean Sans"
            >
              <Type className="w-3 h-3" />
              <span>{typeface === 'serif' ? 'Serif' : 'Sans'}</span>
            </button>
          </div>

          {/* Notes & Bookmark */}
          <button
            type="button"
            onClick={() => setShowNotesPanel(!showNotesPanel)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border whitespace-nowrap ${
              showNotesPanel
                ? 'bg-amber-600 text-white border-amber-600'
                : 'border-stone-300/60 hover:bg-stone-200/40'
            }`}
            title="Study Notes"
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span className="tabular-nums">Notes ({bookNotes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleBookmark(book.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border whitespace-nowrap ${
              isBookmarked
                ? 'bg-amber-400 text-amber-950 border-amber-400'
                : 'border-stone-300/60 hover:bg-stone-200/40'
            }`}
            title="Bookmark this book"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:flex p-1.5 rounded-lg border border-stone-300/60 hover:bg-stone-200/40"
            title="Print reading page"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Body Area with Optional TOC / Notes Sidebars */}
      <div className="flex-1 overflow-hidden flex relative">
        {/* Table of Contents Drawer */}
        {showToc && (
          <aside className={`w-72 sm:w-80 border-r ${toolbarTheme} overflow-y-auto p-5 shrink-0 z-20`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/40">
              <div>
                <div className="text-[11px] font-mono uppercase text-emerald-700 font-semibold">
                  Table of Contents
                </div>
                <div className="text-sm font-bold mt-0.5">{book.title}</div>
              </div>
              <button
                type="button"
                onClick={() => setShowToc(false)}
                className="p-1 rounded hover:bg-stone-500/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className={`text-xs mb-4 leading-relaxed ${mutedText}`}>{book.synopsis}</div>

            <div className="space-y-2">
              {book.chapters.map((ch, idx) => {
                const isActive = idx === chapterIndex;
                const done = completedIds.includes(ch.id);
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      setChapterIndex(idx);
                      if (window.innerWidth < 1024) setShowToc(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      isActive
                        ? 'bg-emerald-900 text-white border-emerald-900'
                        : 'border-stone-300/40 hover:bg-stone-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-mono tabular-nums opacity-80">
                      <span>Chapter {ch.chapterNumber}</span>
                      {done && (
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          Read
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold mt-1">{ch.title}</div>
                    <div className="text-[11px] opacity-75 mt-0.5 line-clamp-1">{ch.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        {/* Center Open Book Stage */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-8">
          <div
            className={`mx-auto ${
              layout === 'spread' ? 'max-w-6xl' : 'max-w-3xl'
            } rounded-xl border shadow-lg overflow-hidden ${pageSurface}`}
          >
            {layout === 'spread' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-300/50">
                {/* LEFT PAGE */}
                <article className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[540px]">
                  <div>
                    {/* Running Page Header */}
                    <div className={`flex items-center justify-between text-[11px] font-mono pb-4 mb-6 border-b border-stone-300/40 ${mutedText}`}>
                      <span className="truncate pr-2">{book.title}</span>
                      <span className="tabular-nums shrink-0">
                        Chapter 0{chapter.chapterNumber}
                      </span>
                    </div>

                    {/* Chapter Title Header */}
                    <div className="mb-6">
                      <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold mb-1.5">
                        {book.category} · {book.classTag}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug text-balance">
                        {chapter.chapterNumber}. {chapter.title}
                      </h2>
                      <p className={`text-sm mt-2 italic ${mutedText}`}>{chapter.subtitle}</p>
                    </div>

                    {/* Left Page Body Paragraphs */}
                    <div className={`space-y-5 ${bodyFontClass} ${bodySizeClass}`}>
                      {leftParagraphs.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className={
                            pIdx === 0
                              ? 'first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:leading-none first-letter:text-emerald-800'
                              : ''
                          }
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Formula or Quote Block if present */}
                    {chapter.formulaOrHighlight && (
                      <div
                        className={`mt-7 p-4 rounded-lg border ${
                          theme === 'night'
                            ? 'bg-slate-800/80 border-slate-700'
                            : 'bg-emerald-950/5 border-emerald-900/20'
                        }`}
                      >
                        <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold mb-1">
                          {chapter.formulaOrHighlight.label}
                        </div>
                        <div className="font-mono text-xs sm:text-sm font-semibold leading-relaxed">
                          {chapter.formulaOrHighlight.content}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Left Page Footer Number */}
                  <div className={`pt-6 mt-8 border-t border-stone-300/40 flex items-center justify-between text-[11px] font-mono tabular-nums ${mutedText}`}>
                    <span>PM SHRI GHS Chowgam Digital Library</span>
                    <span>Page {chapterIndex * 2 + 1}</span>
                  </div>
                </article>

                {/* RIGHT PAGE */}
                <article className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[540px] relative">
                  <div>
                    {/* Running Header */}
                    <div className={`flex items-center justify-between text-[11px] font-mono pb-4 mb-6 border-b border-stone-300/40 ${mutedText}`}>
                      <span>{book.author}</span>
                      <span className="tabular-nums shrink-0">{book.language}</span>
                    </div>

                    {/* Continuation Paragraphs */}
                    {rightParagraphs.length > 0 && (
                      <div className={`space-y-5 mb-7 ${bodyFontClass} ${bodySizeClass}`}>
                        {rightParagraphs.map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    )}

                    {/* Key Takeaway Callout */}
                    <div
                      className={`p-4 rounded-lg border mb-7 ${
                        theme === 'night'
                          ? 'bg-amber-950/30 border-amber-800/60'
                          : 'bg-amber-50 border-amber-200'
                      }`}
                    >
                      <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold mb-1">
                        Key Takeaway to Remember
                      </div>
                      <p className="text-sm font-medium leading-relaxed">{chapter.keyTakeaway}</p>
                    </div>

                    {/* Interactive Chapter Comprehension Quick Check */}
                    <div
                      className={`p-5 rounded-xl border ${
                        theme === 'night'
                          ? 'bg-slate-800/70 border-slate-700'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                        <HelpCircle className="w-4 h-4 shrink-0" />
                        <span>Chapter Quick Check</span>
                      </div>
                      <p className="text-sm font-semibold mb-3">{chapter.quickCheck.question}</p>
                      <div className="space-y-2">
                        {chapter.quickCheck.options.map((opt, optIdx) => {
                          const isPicked = selectedQuizOption === optIdx;
                          const isCorrect = optIdx === chapter.quickCheck.correctIndex;
                          const showFeedback = selectedQuizOption !== null;
                          let optStyle =
                            theme === 'night'
                              ? 'bg-slate-900 border-slate-700 hover:border-emerald-600'
                              : 'bg-white border-stone-200 hover:border-emerald-700';

                          if (showFeedback && isCorrect) {
                            optStyle = 'bg-emerald-900 text-white border-emerald-900';
                          } else if (showFeedback && isPicked && !isCorrect) {
                            optStyle = 'bg-rose-900 text-white border-rose-900';
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => setSelectedQuizOption(optIdx)}
                              className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors ${optStyle}`}
                            >
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>

                      {selectedQuizOption !== null && (
                        <div
                          className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                            selectedQuizOption === chapter.quickCheck.correctIndex
                              ? 'bg-emerald-100 text-emerald-950'
                              : 'bg-amber-100 text-amber-950'
                          }`}
                        >
                          <strong>
                            {selectedQuizOption === chapter.quickCheck.correctIndex
                              ? 'Correct: '
                              : 'Explanation: '}
                          </strong>
                          {chapter.quickCheck.explanation}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Page Footer Number */}
                  <div className={`pt-6 mt-8 border-t border-stone-300/40 flex items-center justify-between text-[11px] font-mono tabular-nums ${mutedText}`}>
                    <span>{isChapterDone ? '✓ Chapter Completed' : 'Active Study Page'}</span>
                    <span>Page {chapterIndex * 2 + 2}</span>
                  </div>
                </article>
              </div>
            ) : (
              /* SINGLE-PAGE FOCUS MODE */
              <article className="p-6 sm:p-10 md:p-14">
                <div className={`flex items-center justify-between text-xs font-mono pb-4 mb-6 border-b border-stone-300/40 ${mutedText}`}>
                  <span>
                    {book.title} · {book.catalogueCode}
                  </span>
                  <span className="tabular-nums">
                    Chapter {chapter.chapterNumber} / {totalChapters}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold mb-1.5">
                    {book.category} · {book.classTag}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                    {chapter.chapterNumber}. {chapter.title}
                  </h2>
                  <p className={`text-sm mt-2 italic ${mutedText}`}>{chapter.subtitle}</p>
                </div>

                <div className={`space-y-5 mb-8 ${bodyFontClass} ${bodySizeClass}`}>
                  {chapter.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {chapter.formulaOrHighlight && (
                  <div
                    className={`mb-6 p-4 rounded-lg border ${
                      theme === 'night'
                        ? 'bg-slate-800/80 border-slate-700'
                        : 'bg-emerald-950/5 border-emerald-900/20'
                    }`}
                  >
                    <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold mb-1">
                      {chapter.formulaOrHighlight.label}
                    </div>
                    <div className="font-mono text-sm font-semibold">
                      {chapter.formulaOrHighlight.content}
                    </div>
                  </div>
                )}

                <div
                  className={`p-4 rounded-lg border mb-6 ${
                    theme === 'night'
                      ? 'bg-amber-950/30 border-amber-800/60'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 font-bold mb-1">
                    Key Takeaway to Remember
                  </div>
                  <p className="text-sm font-medium leading-relaxed">{chapter.keyTakeaway}</p>
                </div>

                <div
                  className={`p-5 rounded-xl border ${
                    theme === 'night'
                      ? 'bg-slate-800/70 border-slate-700'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>Chapter Quick Check</span>
                  </div>
                  <p className="text-sm font-semibold mb-3">{chapter.quickCheck.question}</p>
                  <div className="space-y-2">
                    {chapter.quickCheck.options.map((opt, optIdx) => {
                      const isPicked = selectedQuizOption === optIdx;
                      const isCorrect = optIdx === chapter.quickCheck.correctIndex;
                      const showFeedback = selectedQuizOption !== null;
                      let optStyle =
                        theme === 'night'
                          ? 'bg-slate-900 border-slate-700 hover:border-emerald-600'
                          : 'bg-white border-stone-200 hover:border-emerald-700';

                      if (showFeedback && isCorrect) {
                        optStyle = 'bg-emerald-900 text-white border-emerald-900';
                      } else if (showFeedback && isPicked && !isCorrect) {
                        optStyle = 'bg-rose-900 text-white border-rose-900';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => setSelectedQuizOption(optIdx)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors ${optStyle}`}
                        >
                          {String.fromCharCode(65 + optIdx)}. {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selectedQuizOption !== null && (
                    <div
                      className={`mt-3 p-3 rounded-lg text-xs leading-relaxed ${
                        selectedQuizOption === chapter.quickCheck.correctIndex
                          ? 'bg-emerald-100 text-emerald-950'
                          : 'bg-amber-100 text-amber-950'
                      }`}
                    >
                      <strong>
                        {selectedQuizOption === chapter.quickCheck.correctIndex
                          ? 'Correct: '
                          : 'Explanation: '}
                      </strong>
                      {chapter.quickCheck.explanation}
                    </div>
                  )}
                </div>
              </article>
            )}
          </div>
        </div>

        {/* Margin Study Notes Drawer */}
        {showNotesPanel && (
          <aside className={`w-80 border-l ${toolbarTheme} overflow-y-auto p-5 shrink-0 z-20 flex flex-col`}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200/40">
              <div>
                <div className="text-[11px] font-mono uppercase text-amber-700 font-semibold">
                  My Study Notes
                </div>
                <div className="text-xs font-bold mt-0.5">
                  Chapter {chapter.chapterNumber}: {chapter.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNotesPanel(false)}
                className="p-1 rounded hover:bg-stone-500/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="mb-5 space-y-2.5">
              <textarea
                rows={3}
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Write a key formula, vocabulary word, or revision note for this chapter..."
                className={`w-full rounded-lg border p-2.5 text-xs focus:outline-none focus:border-emerald-700 ${
                  theme === 'night'
                    ? 'bg-slate-800 border-slate-700 text-slate-100'
                    : 'bg-stone-50 border-stone-300 text-stone-900'
                }`}
              />
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
              >
                Save Study Note
              </button>
            </form>

            <div className="space-y-3 flex-1">
              {chapterNotes.length === 0 ? (
                <div className={`text-xs p-4 rounded-lg border border-dashed text-center ${mutedText}`}>
                  No notes saved for Chapter {chapter.chapterNumber} yet. Jot down important ideas as you read.
                </div>
              ) : (
                chapterNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg border text-xs ${
                      theme === 'night'
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-amber-50/70 border-amber-200'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{note.noteText}</p>
                    <div className={`mt-2 pt-2 border-t border-stone-300/30 flex items-center justify-between text-[10px] ${mutedText}`}>
                      <span>{note.createdAt}</span>
                      <button
                        type="button"
                        onClick={() => onDeleteNote(note.id)}
                        className="text-rose-600 hover:text-rose-700 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}

              {bookNotes.length > chapterNotes.length && (
                <div className="pt-4 border-t border-stone-300/40">
                  <div className={`text-[11px] font-semibold mb-2 ${mutedText}`}>
                    Notes in Other Chapters ({bookNotes.length - chapterNotes.length})
                  </div>
                  <div className="space-y-2">
                    {bookNotes
                      .filter((n) => n.chapterIndex !== chapterIndex)
                      .map((n) => (
                        <button
                          key={n.id}
                          type="button"
                          onClick={() => setChapterIndex(n.chapterIndex)}
                          className="w-full text-left p-2.5 rounded border border-stone-300/40 hover:bg-stone-500/10 text-xs"
                        >
                          <div className="text-[10px] font-mono text-emerald-700 font-semibold">
                            Ch. {n.chapterIndex + 1} · {n.chapterTitle}
                          </div>
                          <div className="truncate mt-0.5 opacity-85">{n.noteText}</div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Bottom Page Turner Bar */}
      <div className={`px-4 sm:px-6 py-3 border-t ${toolbarTheme} flex items-center justify-between gap-3 shrink-0`}>
        <button
          type="button"
          onClick={() => setChapterIndex(Math.max(0, chapterIndex - 1))}
          disabled={chapterIndex === 0}
          className="px-4 py-2 rounded-lg border border-stone-300/60 hover:bg-stone-200/40 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Chapter</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono tabular-nums">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>
              Chapter {chapter.chapterNumber} of {totalChapters}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCompleteAndNext}
            className="px-4 py-2 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {chapterIndex < totalChapters - 1
                ? 'Mark Read & Next Chapter'
                : isChapterDone
                ? 'Book Completed'
                : 'Complete Book'}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setChapterIndex(Math.min(totalChapters - 1, chapterIndex + 1))}
          disabled={chapterIndex === totalChapters - 1}
          className="px-4 py-2 rounded-lg border border-stone-300/60 hover:bg-stone-200/40 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-colors"
        >
          <span>Next Chapter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
