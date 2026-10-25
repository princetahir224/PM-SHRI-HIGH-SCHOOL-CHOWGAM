import React from 'react';
import { 
  TreePine, 
  Droplet, 
  Sparkles, 
  Trash2, 
  Sun, 
  CheckCircle2, 
  Mountain,
  Leaf
} from 'lucide-react';
import { SCHOOL_IMAGES } from '../data/assets';

export const GreenCampusSection: React.FC = () => {
  const ecoInitiatives = [
    {
      title: "Chowgam Mini-Valley Tree Plantation Drives",
      desc: "Periodic planting of native Himalayan pine, deodar, and chinár saplings around the school perimeter.",
      impact: "Over 150+ saplings maintained by student eco-buddies",
      icon: <TreePine className="w-5 h-5 text-emerald-700" />
    },
    {
      title: "Zero Single-Use Plastic Mandate",
      desc: "Strict school-wide prohibition on disposable plastic bottles, bags, and wrappers. Students use metal water flasks and cloth tiffin pouches.",
      impact: "Clean campus grounds and zero plastic burning",
      icon: <Trash2 className="w-5 h-5 text-emerald-700" />
    },
    {
      title: "Natural Water Source Conservation",
      desc: "Awareness drives educating students on protecting local mountain springs and water runoff that feeds valley agriculture.",
      impact: "Drinking water filtration points regularly tested",
      icon: <Droplet className="w-5 h-5 text-blue-700" />
    },
    {
      title: "Campus Botanical Garden & Composting",
      desc: "Organic waste from fallen leaves and school garden prunings converted to natural soil compost for flower beds.",
      impact: "Chemical-free gardening and hands-on biology learning",
      icon: <Leaf className="w-5 h-5 text-emerald-700" />
    }
  ];

  return (
    <section id="green-campus" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Mission LiFE & PM SHRI Green School
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Green Chowgam Campus & Environmental Sustainability
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Our campus is situated in a breathtaking mini-valley at the foot of forested mountains. We embrace this sacred geography by fostering environmental stewardship, active plantation, and zero-waste discipline.
          </p>
        </div>

        {/* Feature Split with Campus Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-stone-200 shadow-xs relative min-h-[380px]">
            <img
              src={SCHOOL_IMAGES.actualCampus}
              alt="PM SHRI GHS Chowgam green campus flower garden and manicured lawns"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex items-end p-6 text-white">
              <div>
                <div className="font-semibold text-amber-300 text-sm">Official Chowgam Green Campus</div>
                <p className="text-stone-300 text-xs mt-1">
                  Vibrant flower beds, manicured lawns, and pine mountain slopes right behind the school building.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 uppercase mb-2">
                <span>Eco-Club Directive</span>
                <span aria-hidden="true">·</span>
                <span>NEP 2020 Environmental Mandate</span>
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">
                Nature as Our Living Laboratory
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed mb-6">
                Rather than treating ecology as a textbook subject, students at PM SHRI GHS Chowgam walk the surrounding green foothills, identify native flora, measure rainfall patterns, and actively nurture tree saplings. Environmental consciousness is woven into daily morning assemblies and class duties.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div className="p-3 bg-stone-50 rounded-lg">
                  <div className="font-bold text-stone-900 text-xs sm:text-sm">Nature Walks & Field Studies</div>
                  <div className="text-xs text-stone-500 mt-1">Periodic teacher-guided excursions to observe mountain biodiversity and water springs.</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg">
                  <div className="font-bold text-stone-900 text-xs sm:text-sm">Student Eco-Buddies</div>
                  <div className="text-xs text-stone-500 mt-1">Every class is assigned specific garden plots and tree saplings for daily watering.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Aligned with Mission LiFE (Lifestyle for Environment)</span>
              <span className="text-emerald-800 font-semibold">PM SHRI Green Pillar</span>
            </div>
          </div>
        </div>

        {/* 4 Core Eco Initiatives Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecoInitiatives.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-stone-900 mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
