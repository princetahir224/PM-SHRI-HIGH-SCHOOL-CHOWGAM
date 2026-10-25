import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  Compass
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/assets';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const categories = ['All', 'Campus & Landscape', 'Digital Learning', 'Academics', 'Environment'];

  const filteredItems = GALLERY_ITEMS.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Visual Campus Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Photo Gallery & Campus Life
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Capturing the serenity of our mountain setting, modern digital facilities, dedicated library, and vibrant student learning spaces in Chowgam.
          </p>
        </div>

        {/* Category Filters (Clean Segmented Tabs) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg max-w-fit mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveImageIndex(null);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveImageIndex(index)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-stone-200 bg-stone-50 shadow-2xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-white/90 text-stone-900 shadow-sm">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-emerald-800 uppercase font-semibold mb-1">
                    {item.category}
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 leading-snug mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-3 text-[11px] font-medium text-emerald-900 underline">
                  View High-Res Photo →
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Child Safeguarding & Privacy Note */}
        <div className="mt-10 p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-500 flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Child Protection & Privacy Safeguard:</strong> All campus imagery respects student dignity and follows institutional privacy guidelines. Authentic photographs are verified before publication.
          </span>
        </div>

        {/* Fullscreen Lightbox Modal */}
        {activeImageIndex !== null && filteredItems[activeImageIndex] && (
          <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute -top-10 right-0 p-2 text-white/80 hover:text-white text-lg font-bold"
                aria-label="Close image viewer"
              >
                ✕
              </button>

              {/* Image Frame */}
              <div className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img
                  src={filteredItems[activeImageIndex].image}
                  alt={filteredItems[activeImageIndex].title}
                  className="w-full max-h-[70vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right Navigation */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption Bar */}
              <div className="w-full mt-4 text-center text-white px-4">
                <div className="text-xs font-mono text-amber-300 uppercase">
                  {filteredItems[activeImageIndex].category} · Image {activeImageIndex + 1} of {filteredItems.length}
                </div>
                <h3 className="text-base sm:text-lg font-bold mt-0.5">
                  {filteredItems[activeImageIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto mt-1">
                  {filteredItems[activeImageIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
