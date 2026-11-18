import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  GraduationCap,
  Layers,
  Grid,
  Compass,
  CheckCircle2,
  X,
  ArrowRight,
  StickyNote,
  Trash2,
  Library,
  ChevronRight,
} from 'lucide-react';
import {
  DIGITAL_LIBRARY_BOOKS,
  BOOK_SHELF_CATEGORIES,
  CURATED_READING_PATHS,
  DIGITAL_LIBRARY_MEDIA,
  LibraryBook,
  BookShelfCategory,
  ClassFilterLevel,
  BookProgress,
  ReaderNote,
} from '../data/digitalLibraryData';
import { BookReaderModal } from './BookReaderModal';

type LibraryViewTab = 'shelves' | 'grid' | 'myshelf' | 'paths';

const CLASS_FILTERS: ClassFilterLevel[] = [
  'All Classes',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'General Reading',
];

export const SmartDigitalLibrary: React.FC = () => {
  const [viewTab, setViewTab] = useState<LibraryViewTab>('shelves');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All Shelves' | BookShelfCategory>('All Shelves');
  const [selectedClass, setSelectedClass] = useState<ClassFilterLevel>('All Classes');

  // Reader & Detail Modals
  const [activeReaderBook, setActiveReaderBook] = useState<LibraryBook | null>(null);
  const [readerStartChapter, setReaderStartChapter] = useState<number>(0);
  const [previewBook, setPreviewBook] = useState<LibraryBook | null>(null);

  // Persisted Student Reading State
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pmshri_library_bookmarks');
      return saved ? JSON.parse(saved) : ['book-agaaz-sky', 'book-kashmir-heritage'];
    } catch {
      return ['book-agaaz-sky', 'book-kashmir-heritage'];
    }
  });

  const [progressMap, setProgressMap] = useState<Record<string, BookProgress>>(() => {
    try {
      const saved = localStorage.getItem('pmshri_library_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [notes, setNotes] = useState<ReaderNote[]>(() => {
    try {
      const saved = localStorage.getItem('pmshri_library_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('pmshri_library_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('pmshri_library_progress', JSON.stringify(progressMap));
  }, [progressMap]);

  useEffect(() => {
    localStorage.setItem('pmshri_library_notes', JSON.stringify(notes));
  }, [notes]);

  const handleToggleBookmark = (bookId: string) => {
    setBookmarks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [bookId, ...prev]
    );
  };

  const handleUpdateProgress = (
    bookId: string,
    chapterIndex: number,
    completedChapterId?: string
  ) => {
    setProgressMap((prev) => {
      const existing = prev[bookId];
      const existingCompleted = existing?.completedChapterIds || [];
      const updatedCompleted =
        completedChapterId && !existingCompleted.includes(completedChapterId)
          ? [...existingCompleted, completedChapterId]
          : existingCompleted;

      return {
        ...prev,
        [bookId]: {
          bookId,
          currentChapterIndex: chapterIndex,
          completedChapterIds: updatedCompleted,
          lastReadAt: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        },
      };
    });
  };

  const handleAddNote = (book: LibraryBook, chapterIndex: number, noteText: string) => {
    const ch = book.chapters[chapterIndex];
    const newNote: ReaderNote = {
      id: `note-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      chapterIndex,
      chapterTitle: ch ? ch.title : `Chapter ${chapterIndex + 1}`,
      noteText,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  const openBookReader = (book: LibraryBook, chapterIdx?: number) => {
    setPreviewBook(null);
    if (typeof chapterIdx === 'number') {
      handleUpdateProgress(book.id, chapterIdx);
      setReaderStartChapter(chapterIdx);
    } else {
      setReaderStartChapter(progressMap[book.id]?.currentChapterIndex || 0);
    }
    setActiveReaderBook(book);
  };

  // Filtered Books
  const filteredBooks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DIGITAL_LIBRARY_BOOKS.filter((book) => {
      const matchesCategory =
        selectedCategory === 'All Shelves' || book.category === selectedCategory;
      const matchesClass =
        selectedClass === 'All Classes' || book.applicableClasses.includes(selectedClass);
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.catalogueCode.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q) ||
        book.keyTopics.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesClass && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedClass]);

  // Group books into shelves
  const groupedShelves = useMemo(() => {
    return BOOK_SHELF_CATEGORIES.map((category, idx) => ({
      shelfNumber: idx + 1,
      category,
      books: filteredBooks.filter((b) => b.category === category),
    })).filter((shelf) => shelf.books.length > 0);
  }, [filteredBooks]);

  // Continue reading & stats
  const startedBookIds = Object.keys(progressMap);
  const lastStartedBook = useMemo(() => {
    if (startedBookIds.length === 0) return DIGITAL_LIBRARY_BOOKS[0];
    const lastId = startedBookIds[startedBookIds.length - 1];
    return DIGITAL_LIBRARY_BOOKS.find((b) => b.id === lastId) || DIGITAL_LIBRARY_BOOKS[0];
  }, [progressMap]);

  const totalChaptersCount = useMemo(
    () => DIGITAL_LIBRARY_BOOKS.reduce((acc, b) => acc + b.chapters.length, 0),
    []
  );

  const completedBooksCount = useMemo(() => {
    return DIGITAL_LIBRARY_BOOKS.filter((b) => {
      const p = progressMap[b.id];
      return p && p.completedChapterIds.length >= b.chapters.length;
    }).length;
  }, [progressMap]);

  const getBookProgressPercent = (book: LibraryBook) => {
    const p = progressMap[book.id];
    if (!p) return 0;
    const completed = p.completedChapterIds.length;
    if (completed > 0) {
      return Math.min(100, Math.round((completed / book.chapters.length) * 100));
    }
    return Math.round(((p.currentChapterIndex + 1) / book.chapters.length) * 25);
  };

  // Reusable Realistic Book Cover Card
  const renderBookJacket = (book: LibraryBook, compact = false) => {
    const pct = getBookProgressPercent(book);
    const isSaved = bookmarks.includes(book.id);

    return (
      <div
        key={book.id}
        className="group flex flex-col justify-between bg-white rounded-xl border border-stone-200 p-3.5 shadow-xs hover:border-emerald-700/60 transition-colors"
      >
        {/* Hardcover Book Jacket */}
        <div>
          <div
            onClick={() => openBookReader(book)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBookReader(book);
              }
            }}
            className={`relative rounded-r-lg rounded-l-xs overflow-hidden cursor-pointer border ${book.coverTheme.borderClass} ${book.coverTheme.bgClass} aspect-3/4 shadow-md transition-transform duration-200 group-hover:-translate-y-1 flex`}
            aria-label={`Read ${book.title}`}
          >
            {/* Left Book Spine Crease */}
            <div
              className={`w-3 sm:w-3.5 shrink-0 ${book.coverTheme.spineClass} border-r border-black/30 shadow-inner flex flex-col justify-between py-3 items-center`}
            >
              <span className="w-1 h-1 rounded-full bg-amber-300/60" />
              <span className="w-0.5 h-8 bg-white/15 rounded-full" />
              <span className="w-1 h-1 rounded-full bg-amber-300/60" />
            </div>

            {/* Cover Front Artwork or Architectural Jacket */}
            <div className="relative flex-1 flex flex-col justify-between p-4 text-white overflow-hidden">
              {book.coverTheme.coverImage ? (
                <>
                  <img
                    src={book.coverTheme.coverImage}
                    alt={`Cover illustration for ${book.title}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/55 to-stone-950/35" />
                </>
              ) : (
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.35), transparent 55%), linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  }}
                />
              )}

              {/* Top Catalogue Code & Class */}
              <div className="relative z-10 flex items-center justify-between gap-2 text-[10px] font-mono tabular-nums text-white/85">
                <span className="tracking-wider">{book.catalogueCode}</span>
                <span className={book.coverTheme.accentTextClass}>{book.classTag}</span>
              </div>

              {/* Center Emblem Border when no image */}
              {!book.coverTheme.coverImage && (
                <div className="relative z-10 my-auto py-3 border-y border-white/15">
                  <div className="text-[10px] uppercase tracking-widest text-white/65 mb-1.5 font-mono">
                    PM SHRI Library
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold leading-snug text-white line-clamp-3">
                    {book.title}
                  </h4>
                </div>
              )}

              {/* Bottom Title Overlay */}
              <div className="relative z-10 mt-auto pt-2">
                {book.coverTheme.coverImage && (
                  <h4 className="font-serif text-base sm:text-lg font-bold leading-snug text-white line-clamp-3 mb-1">
                    {book.title}
                  </h4>
                )}
                <div className="text-[11px] text-white/80 line-clamp-1">{book.author}</div>
              </div>
            </div>
          </div>

          {/* Unboxed Metadata Below Jacket */}
          <div className="mt-3.5">
            <div className="flex items-center justify-between gap-2 text-[11px] text-stone-500 font-mono tabular-nums">
              <span>{book.chapters.length} Chapters</span>
              <span aria-hidden="true">·</span>
              <span>{book.readingMinutes} min</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{book.language}</span>
            </div>

            {!compact && (
              <>
                <h5 className="mt-1.5 text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                  {book.title}
                </h5>
                <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {book.subtitle}
                </p>
              </>
            )}

            {/* Reading Progress Indicator */}
            {pct > 0 && (
              <div className="mt-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono tabular-nums text-emerald-800 font-semibold mb-1">
                  <span>{pct === 100 ? 'Completed' : 'Reading Progress'}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-700 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clean Action Row */}
        <div className="mt-4 pt-3 border-t border-stone-200/70 flex items-center gap-2">
          <button
            type="button"
            onClick={() => openBookReader(book)}
            className="flex-1 py-2 px-3 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>{pct > 0 && pct < 100 ? 'Continue' : 'Read Book'}</span>
          </button>

          <button
            type="button"
            onClick={() => setPreviewBook(book)}
            className="py-2 px-2.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors whitespace-nowrap"
            title="View Synopsis & Chapters"
          >
            Chapters
          </button>

          <button
            type="button"
            onClick={() => handleToggleBookmark(book.id)}
            className={`p-2 rounded-lg border transition-colors shrink-0 ${
              isSaved
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'border-stone-200 text-stone-500 hover:bg-stone-100'
            }`}
            aria-label={isSaved ? `Remove ${book.title} bookmark` : `Bookmark ${book.title}`}
            title={isSaved ? 'Bookmarked' : 'Save Bookmark'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="smart-digital-library"
      className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 1. Digital Library Welcome Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 shadow-sm mb-8">
          <img
            src={DIGITAL_LIBRARY_MEDIA.welcomeBanner}
            alt="Sunlit school library reading room overlooking green Himalayan pine mountains"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/45" />

          <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-white">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-300 mb-3">
                <span>Smart Digital Library</span>
                <span aria-hidden="true">·</span>
                <span>PM SHRI Govt. High School Chowgam</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-balance max-w-3xl">
                Welcome to Your Digital Library – Read, Explore, Learn &amp; Grow.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
                Explore {DIGITAL_LIBRARY_BOOKS.length} curated digital books across Science, Agaaz Astronomy, Mathematics, English, Kashmiri &amp; Urdu Heritage, History, Geography, and ICT—readable directly on this website with interactive open-book pages, study notes, and chapter self-checks.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openBookReader(lastStartedBook)}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 shadow-xs whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>
                    {startedBookIds.length > 0
                      ? `Resume: ${lastStartedBook.title.slice(0, 32)}${lastStartedBook.title.length > 32 ? '…' : ''}`
                      : `Start Reading: ${lastStartedBook.title.slice(0, 32)}…`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewTab('myshelf')}
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap backdrop-blur-xs"
                >
                  <Bookmark className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>My Reading Shelf ({bookmarks.length})</span>
                </button>
              </div>
            </div>

            {/* Featured Reading Room Quick Highlight */}
            <div className="lg:col-span-4 bg-stone-950/75 backdrop-blur-sm border border-white/15 rounded-xl p-5 text-white">
              <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 mb-2">
                Featured Shelf Pick
              </div>
              <div className="flex items-start gap-4">
                <img
                  src={DIGITAL_LIBRARY_MEDIA.astronomyCover}
                  alt="The Agaaz Night Sky & Telescopic Atlas cover"
                  className="w-20 h-28 object-cover rounded border border-white/20 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-snug">
                    The Agaaz Night Sky &amp; Telescopic Atlas
                  </div>
                  <div className="text-xs text-stone-300 mt-1">
                    Mr. Muzaffer Rasool Malik
                  </div>
                  <div className="text-[11px] font-mono text-amber-300 mt-1.5 tabular-nums">
                    4 Chapters · 25 min read
                  </div>
                  <button
                    type="button"
                    onClick={() => openBookReader(DIGITAL_LIBRARY_BOOKS[0])}
                    className="mt-2.5 text-xs font-semibold text-white underline underline-offset-4 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Open Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Tabular KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <div className="text-xs text-stone-500 font-medium">Digital Collection</div>
            <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono tabular-nums">
              {DIGITAL_LIBRARY_BOOKS.length} Books
            </div>
            <div className="text-xs text-emerald-800 mt-1">
              {BOOK_SHELF_CATEGORIES.length} Subject Shelves
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <div className="text-xs text-stone-500 font-medium">Readable Chapters</div>
            <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono tabular-nums">
              {totalChaptersCount} Chapters
            </div>
            <div className="text-xs text-stone-600 mt-1">
              With interactive quick checks
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <div className="text-xs text-stone-500 font-medium">My Bookmarks &amp; Notes</div>
            <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono tabular-nums">
              {bookmarks.length} / {notes.length}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Saved on this device
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200">
            <div className="text-xs text-stone-500 font-medium">Reading Activity</div>
            <div className="text-2xl font-extrabold text-stone-900 mt-1 font-mono tabular-nums">
              {startedBookIds.length} Started
            </div>
            <div className="text-xs text-emerald-800 mt-1 tabular-nums">
              {completedBooksCount} completed in full
            </div>
          </div>
        </div>

        {/* 2. Search, View Mode & Filters Toolbar */}
        <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-6 mb-10 space-y-4">
          {/* Top Row: Search + View Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-2xl">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (viewTab === 'myshelf' || viewTab === 'paths') {
                    setViewTab('shelves');
                  }
                }}
                placeholder="Search digital books by title, subject, author, topic, or code (e.g. CHW-AGA-01)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:bg-white text-sm text-stone-900 focus:outline-none focus:border-emerald-800 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Segmented Library Mode Switcher */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg shrink-0">
              <button
                type="button"
                onClick={() => setViewTab('shelves')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  viewTab === 'shelves'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Bookshelves</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab('grid')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  viewTab === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Books ({filteredBooks.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab('myshelf')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  viewTab === 'myshelf'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>My Shelf</span>
              </button>
              <button
                type="button"
                onClick={() => setViewTab('paths')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  viewTab === 'paths'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Reading Paths</span>
              </button>
            </div>
          </div>

          {/* Filter Row (Shown on Shelves & Grid Views) */}
          {(viewTab === 'shelves' || viewTab === 'grid') && (
            <div className="pt-4 border-t border-stone-200/80 flex flex-col gap-3">
              {/* Subject Shelf Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-stone-500 mr-1">Shelf:</span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All Shelves')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    selectedCategory === 'All Shelves'
                      ? 'bg-emerald-900 text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  All Shelves
                </button>
                {BOOK_SHELF_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-emerald-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Class Filter Row */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Class:</span>
                  </span>
                  {CLASS_FILTERS.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setSelectedClass(cls)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                        selectedClass === cls
                          ? 'bg-amber-400 text-amber-950 font-bold'
                          : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>

                {(searchQuery || selectedCategory !== 'All Shelves' || selectedClass !== 'All Classes') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Shelves');
                      setSelectedClass('All Classes');
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:underline whitespace-nowrap"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3A. VISUAL BOOKSHELVES VIEW */}
        {viewTab === 'shelves' && (
          <div className="space-y-12">
            {groupedShelves.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
                <Library className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-stone-900">No matching books found on this shelf</h3>
                <p className="text-sm text-stone-600 mt-1 max-w-md mx-auto">
                  Try clearing your search keyword or switching to &ldquo;All Shelves&rdquo; and &ldquo;All Classes&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Shelves');
                    setSelectedClass('All Classes');
                  }}
                  className="mt-4 px-4 py-2 rounded-lg bg-emerald-900 text-white text-xs font-semibold"
                >
                  Show Full Library Collection
                </button>
              </div>
            ) : (
              groupedShelves.map((shelf) => (
                <div key={shelf.category} className="space-y-4">
                  {/* Shelf Section Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
                    <div>
                      <span className="text-xs font-mono text-emerald-800 font-semibold">
                        0{shelf.shelfNumber}. Shelf Collection
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                        {shelf.category}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-stone-500 tabular-nums">
                      {shelf.books.length} {shelf.books.length === 1 ? 'volume' : 'volumes'}
                    </span>
                  </div>

                  {/* Shelf Rack + Warm Timber Architectural Ledge */}
                  <div className="bg-stone-100/80 rounded-t-xl border border-stone-200/90 p-5 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {shelf.books.map((book) => renderBookJacket(book))}
                    </div>
                  </div>
                  <div
                    className="h-3.5 -mt-4 rounded-b-lg bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 shadow-md border-t border-amber-700/60"
                    aria-hidden="true"
                  />
                </div>
              ))
            )}
          </div>
        )}

        {/* 3B. ALL BOOKS CATALOGUE GRID VIEW */}
        {viewTab === 'grid' && (
          <div>
            {filteredBooks.length === 0 ? (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
                <p className="text-sm text-stone-600">No books match your current filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book) => renderBookJacket(book))}
              </div>
            )}
          </div>
        )}

        {/* 3C. MY READING SHELF (Continue Reading, Bookmarks & Saved Study Notes) */}
        {viewTab === 'myshelf' && (
          <div className="space-y-10">
            {/* Bookmarked & In-Progress Books */}
            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                Bookmarked &amp; Active Books
              </h3>
              {bookmarks.length === 0 && startedBookIds.length === 0 ? (
                <div className="bg-white p-8 rounded-xl border border-stone-200 text-center text-sm text-stone-600">
                  Your reading shelf is empty. Click the bookmark button on any book or start reading to save it here.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DIGITAL_LIBRARY_BOOKS.filter(
                    (b) => bookmarks.includes(b.id) || startedBookIds.includes(b.id)
                  ).map((book) => renderBookJacket(book))}
                </div>
              )}
            </div>

            {/* Saved Study Notes Notebook */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-stone-200">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-amber-700" />
                    <span>My Saved Study Notes</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Notes written inside the Book Reader are stored automatically for revision.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-500 tabular-nums">
                  {notes.length} {notes.length === 1 ? 'note' : 'notes'}
                </span>
              </div>

              {notes.length === 0 ? (
                <div className="p-6 rounded-lg bg-stone-50 border border-dashed border-stone-300 text-center text-xs text-stone-600">
                  Open any book in the Online Reader and click <strong>Notes</strong> in the toolbar to jot down important formulas, definitions, or questions.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notes.map((note) => {
                    const matchedBook = DIGITAL_LIBRARY_BOOKS.find((b) => b.id === note.bookId);
                    return (
                      <div
                        key={note.id}
                        className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-stone-900">{note.bookTitle}</div>
                          <div className="text-[11px] font-mono text-emerald-800 mt-0.5">
                            Ch. {note.chapterIndex + 1} · {note.chapterTitle}
                          </div>
                          <p className="mt-2.5 text-xs text-stone-800 leading-relaxed whitespace-pre-wrap">
                            {note.noteText}
                          </p>
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-amber-200/70 flex items-center justify-between text-[11px] text-stone-500">
                          <span>{note.createdAt}</span>
                          <div className="flex items-center gap-3">
                            {matchedBook && (
                              <button
                                type="button"
                                onClick={() => openBookReader(matchedBook, note.chapterIndex)}
                                className="font-semibold text-emerald-900 hover:underline"
                              >
                                Jump to Chapter
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteNote(note.id)}
                              className="text-rose-700 hover:underline flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3D. CURATED READING PATHS VIEW */}
        {viewTab === 'paths' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CURATED_READING_PATHS.map((path, idx) => {
              const pathBooks = path.bookIds
                .map((id) => DIGITAL_LIBRARY_BOOKS.find((b) => b.id === id))
                .filter((b): b is LibraryBook => Boolean(b));

              return (
                <div
                  key={path.id}
                  className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono text-emerald-800 font-semibold mb-1.5">
                      0{idx + 1}. Reading Track · {path.targetAudience}
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 leading-snug">
                      {path.title}
                    </h3>
                    <p className="text-xs font-medium text-stone-500 mt-1">{path.subtitle}</p>
                    <p className="text-xs text-stone-600 leading-relaxed mt-3 mb-5">
                      {path.description}
                    </p>

                    <div className="space-y-2.5">
                      {pathBooks.map((b, bIdx) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => openBookReader(b)}
                          className="w-full text-left p-3 rounded-lg bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-700/50 transition-colors flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono text-stone-500 tabular-nums">
                              Book {bIdx + 1} · {b.classTag}
                            </div>
                            <div className="text-xs font-bold text-stone-900 truncate">
                              {b.title}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-emerald-800 shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {pathBooks[0] && (
                    <button
                      type="button"
                      onClick={() => openBookReader(pathBooks[0])}
                      className="mt-6 w-full py-2.5 px-4 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      <span>Begin This Reading Path</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Book Synopsis & Chapter Launcher Modal */}
      {previewBook && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/65 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewBook.title} overview`}
        >
          <div className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-200">
              <div>
                <div className="text-xs font-mono text-emerald-800 font-semibold">
                  {previewBook.catalogueCode} · {previewBook.category} · {previewBook.classTag}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                  {previewBook.title}
                </h3>
                <div className="text-xs text-stone-500 mt-1">
                  {previewBook.author} · {previewBook.edition}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewBook(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100"
                aria-label="Close book details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  About This Book
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{previewBook.synopsis}</p>
              </div>

              <div className="text-xs text-stone-600 flex flex-wrap items-center gap-2">
                <strong className="text-stone-900">Key Topics:</strong>
                {previewBook.keyTopics.map((topic, idx) => (
                  <React.Fragment key={topic}>
                    <span>{topic}</span>
                    {idx < previewBook.keyTopics.length - 1 && (
                      <span aria-hidden="true" className="text-stone-400">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                  Select Any Chapter to Read Online ({previewBook.chapters.length})
                </div>
                <div className="space-y-2">
                  {previewBook.chapters.map((ch, idx) => {
                    const done =
                      progressMap[previewBook.id]?.completedChapterIds.includes(ch.id) || false;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => openBookReader(previewBook, idx)}
                        className="w-full text-left p-3.5 rounded-xl border border-stone-200 hover:border-emerald-700 bg-stone-50 hover:bg-emerald-50/50 transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="text-[11px] font-mono text-emerald-800 font-semibold flex items-center gap-2">
                            <span>Chapter {ch.chapterNumber}</span>
                            {done && (
                              <span className="flex items-center gap-1 text-emerald-700">
                                <CheckCircle2 className="w-3 h-3" />
                                Completed
                              </span>
                            )}
                          </div>
                          <div className="text-sm font-bold text-stone-900 mt-0.5">{ch.title}</div>
                          <div className="text-xs text-stone-500 mt-0.5 truncate">{ch.subtitle}</div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-900 shrink-0 flex items-center gap-1">
                          Read
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleToggleBookmark(previewBook.id)}
                className="px-4 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-semibold text-stone-700 flex items-center gap-1.5"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    bookmarks.includes(previewBook.id) ? 'fill-amber-500 text-amber-600' : ''
                  }`}
                />
                <span>
                  {bookmarks.includes(previewBook.id) ? 'Bookmarked' : 'Bookmark Book'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => openBookReader(previewBook)}
                className="px-5 py-2.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Open Full Book Reader</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Immersive Full-Screen Book Reader Modal */}
      <BookReaderModal
        book={activeReaderBook}
        initialChapterIndex={readerStartChapter}
        isBookmarked={activeReaderBook ? bookmarks.includes(activeReaderBook.id) : false}
        progress={activeReaderBook ? progressMap[activeReaderBook.id] : undefined}
        notes={notes}
        onClose={() => setActiveReaderBook(null)}
        onToggleBookmark={handleToggleBookmark}
        onUpdateProgress={handleUpdateProgress}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />
    </section>
  );
};
