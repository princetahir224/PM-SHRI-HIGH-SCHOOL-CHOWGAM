import React, { useState } from 'react';
import { 
  Building, 
  Laptop, 
  BookOpen, 
  Droplet, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Accessibility,
  Edit2,
  Filter
} from 'lucide-react';
import { FacilityItem } from '../data/schoolData';
import { SCHOOL_IMAGES } from '../data/assets';

interface FacilitiesSectionProps {
  facilities: FacilityItem[];
  onOpenAdmin: () => void;
  onEditFacility: (facility: FacilityItem) => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  facilities,
  onOpenAdmin,
  onEditFacility
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeFacilityModal, setActiveFacilityModal] = useState<FacilityItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Facilities' },
    { id: 'infrastructure', label: 'Buildings & Campus' },
    { id: 'academic', label: 'Academic & Digital' },
    { id: 'sanitation', label: 'Sanitation & Water' },
    { id: 'green', label: 'Green Campus' },
    { id: 'safety', label: 'Safety & Care' }
  ];

  const filteredFacilities = facilities.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesCat && matchesStatus;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <Laptop className="w-4 h-4 text-emerald-700" />;
      case 'infrastructure': return <Building className="w-4 h-4 text-amber-700" />;
      case 'sanitation': return <Droplet className="w-4 h-4 text-blue-700" />;
      case 'green': return <Sparkles className="w-4 h-4 text-emerald-600" />;
      default: return <Building className="w-4 h-4 text-stone-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Operational':
      case 'Active':
        return (
          <span className="text-[11px] font-medium text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{status}</span>
          </span>
        );
      case 'Under Enhancement':
        return (
          <span className="text-[11px] font-medium text-amber-800 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{status}</span>
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-medium text-stone-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-stone-400" />
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <section id="facilities" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              Campus Infrastructure & Learning Spaces
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              School Facilities & Learning Infrastructure
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Our campus spans approximately 3 acres in the Chowgam mini-valley, featuring two educational buildings, dedicated smart learning spaces, an ICT computer lab, separate sanitation blocks, and inclusive barrier-free facilities.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Update Facilities Status</span>
            </button>
          </div>
        </div>

        {/* Category Filters (Clean Segmented Buttons) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Status Quick Filter */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded px-2 py-1 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
            >
              <option value="all">All Statuses</option>
              <option value="Operational">Operational</option>
              <option value="Active">Active</option>
              <option value="Under Enhancement">Under Enhancement</option>
              <option value="Planned Expansion">Planned Expansion</option>
            </select>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-stone-50 rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-colors shadow-xs"
            >
              <div>
                {/* Header row with icon and status */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shadow-2xs">
                      {getCategoryIcon(facility.category)}
                    </div>
                    <span className="text-xs uppercase tracking-wider font-mono text-stone-500">
                      {facility.category}
                    </span>
                  </div>
                  {getStatusBadge(facility.status)}
                </div>

                {/* Facility Name */}
                <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {facility.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {facility.description}
                </p>

                {/* Key Features List */}
                <div className="space-y-1.5 mb-4">
                  {facility.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <span className="text-emerald-700 font-bold shrink-0">·</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accessibility Footer */}
              <div className="pt-4 border-t border-stone-200/80 mt-2">
                <div className="flex items-start gap-2 text-xs text-stone-500">
                  <Accessibility className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    <strong className="text-stone-700 font-medium">Access: </strong>
                    {facility.accessibility}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-200/40">
                  <button
                    onClick={() => setActiveFacilityModal(facility)}
                    className="text-xs font-semibold text-emerald-900 hover:text-emerald-700 underline"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={() => onEditFacility(facility)}
                    className="text-xs text-stone-400 hover:text-stone-800"
                    title="Edit Facility"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Detail Modal */}
        {activeFacilityModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-stone-200 max-w-lg w-full p-6 shadow-xl relative animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <div>
                  <div className="text-xs uppercase font-mono text-emerald-800">
                    Facility Record · {activeFacilityModal.category}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mt-1">
                    {activeFacilityModal.name}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveFacilityModal(null)}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm text-stone-700">
                {(activeFacilityModal.id === 'fac-1' || activeFacilityModal.id === 'fac-2' || activeFacilityModal.id === 'fac-13') && (
                  <div className="rounded-lg overflow-hidden border border-stone-200 aspect-16/9 bg-stone-900 relative">
                    <img
                      src={SCHOOL_IMAGES.actualCampus}
                      alt="PM SHRI Govt High School Chowgam campus building"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-stone-950/70 p-2 text-[11px] text-amber-200">
                      Verified Campus Photo: PM SHRI Govt High School Chowgam (Zone Shanglus, Dist. Anantnag)
                    </div>
                  </div>
                )}

                <div>
                  <div className="font-semibold text-stone-900 text-xs mb-1">Description</div>
                  <p className="leading-relaxed">{activeFacilityModal.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-lg text-xs">
                  <div>
                    <span className="text-stone-500">Current Status:</span>
                    <div className="font-semibold text-stone-900 mt-0.5">{activeFacilityModal.status}</div>
                  </div>
                  <div>
                    <span className="text-stone-500">Accessibility:</span>
                    <div className="font-semibold text-stone-900 mt-0.5">{activeFacilityModal.accessibility}</div>
                  </div>
                </div>

                <div>
                  <div className="font-semibold text-stone-900 text-xs mb-2">Key Equipment & Inclusions</div>
                  <ul className="space-y-1">
                    {activeFacilityModal.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="text-stone-500">PM SHRI School Standards Compliant</span>
                  <button
                    onClick={() => {
                      const fac = activeFacilityModal;
                      setActiveFacilityModal(null);
                      onEditFacility(fac);
                    }}
                    className="px-3 py-1.5 bg-emerald-900 text-white rounded font-medium hover:bg-emerald-800"
                  >
                    Modify Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
