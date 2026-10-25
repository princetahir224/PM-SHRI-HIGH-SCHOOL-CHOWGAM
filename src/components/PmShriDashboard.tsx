import React, { useState } from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Filter, 
  Search, 
  Calendar,
  FileCheck2,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { QualityIndicator } from '../data/schoolData';

interface PmShriDashboardProps {
  indicators: QualityIndicator[];
  onOpenAdmin: () => void;
  onUpdateIndicator: (indicator: QualityIndicator) => void;
}

export const PmShriDashboard: React.FC<PmShriDashboardProps> = ({
  indicators,
  onOpenAdmin,
  onUpdateIndicator
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingIndicator, setEditingIndicator] = useState<QualityIndicator | null>(null);

  const filteredIndicators = indicators.filter((item) => {
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.domainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.target.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate real tally from actual data (no hallucinated percentages or fake scores)
  const tally = {
    total: indicators.length,
    completed: indicators.filter(i => i.status === 'Completed').length,
    inProgress: indicators.filter(i => i.status === 'In Progress').length,
    needsImprovement: indicators.filter(i => i.status === 'Needs Improvement').length,
    notStarted: indicators.filter(i => i.status === 'Not Started').length,
  };

  const getStatusBadge = (status: QualityIndicator['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>In Progress</span>
          </span>
        );
      case 'Needs Improvement':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Needs Improvement</span>
          </span>
        );
      case 'Not Started':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-md">
            <span>Not Started</span>
          </span>
        );
    }
  };

  return (
    <section id="pmshri" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
              School Quality & NEP 2020 Framework
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              PM SHRI School Development Dashboard
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Transparent, evidence-based institutional monitoring tracking the 16 core domains of school development under the PM SHRI scheme. Authorized staff regularly update verified evidence and targets.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-950 rounded-md font-semibold border border-emerald-300">
                Institutional Head: Headmaster Mr. Shareef Ahmad Khan
              </span>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-950 rounded-md font-semibold border border-amber-300">
                ⭐ PM SHRI In-charge: Mr. Muzzaffer Ahmad Khan (Master)
              </span>
              <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md font-mono border border-stone-200">
                Zone: Shangus
              </span>
            </div>
          </div>

          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Admin Quality Console</span>
          </button>
        </div>

        {/* Real Quantitative Indicator Summary Strip (No fake overall scores, pure verifiable counts) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-xs text-stone-500 font-medium">Total Standards Monitored</div>
            <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
              {tally.total} Domains
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">NEP 2020 Aligned</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-xs text-emerald-800 font-medium">Completed Milestones</div>
            <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
              {tally.completed}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Verified on campus</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-xs text-amber-800 font-medium">Currently In Progress</div>
            <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
              {tally.inProgress}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Active pedagogical goals</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
            <div className="text-xs text-stone-600 font-medium">Needs Improvement / Review</div>
            <div className="text-2xl font-bold text-stone-700 mt-1 tabular-nums">
              {tally.needsImprovement + tally.notStarted}
            </div>
            <div className="text-[11px] text-stone-400 mt-0.5">Action plan mapped</div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 flex-1 max-w-md bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-2xs">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by domain name or target..."
              className="w-full text-xs text-stone-800 focus:outline-none bg-transparent"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-stone-400 hover:text-stone-700 text-xs">
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg overflow-x-auto">
            {['all', 'Completed', 'In Progress', 'Needs Improvement'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  filterStatus === st
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st === 'all' ? 'All Domains' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Indicators Table */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100 text-stone-700 uppercase font-mono text-[11px] tracking-wider border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4 w-64">Development Domain</th>
                  <th className="py-3 px-4">Institutional Target</th>
                  <th className="py-3 px-4 w-36">Status</th>
                  <th className="py-3 px-4 w-72">Verified Evidence / Action Plan</th>
                  <th className="py-3 px-4 w-20 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredIndicators.map((ind) => (
                  <tr key={ind.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-400 text-center tabular-nums">
                      {ind.domainNumber.toString().padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-900">
                      {ind.domainName}
                    </td>
                    <td className="py-3.5 px-4 text-stone-700 leading-relaxed">
                      {ind.target}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(ind.status)}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-stone-600 leading-relaxed">
                      <div>
                        <strong className="text-stone-800">Evidence: </strong>
                        {ind.evidence}
                      </div>
                      <div className="mt-1 text-stone-500">
                        <strong className="text-stone-700">Next Action: </strong>
                        {ind.actionPlan}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setEditingIndicator(ind)}
                        className="text-emerald-800 hover:text-emerald-950 font-semibold text-xs underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Editing Quality Record */}
        {editingIndicator && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-stone-200 max-w-lg w-full p-6 shadow-xl relative animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
                <div>
                  <div className="text-xs uppercase font-mono text-emerald-800">
                    Domain {editingIndicator.domainNumber} Quality Log
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                    {editingIndicator.domainName}
                  </h3>
                </div>
                <button
                  onClick={() => setEditingIndicator(null)}
                  className="p-1 rounded text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status Level</label>
                  <select
                    value={editingIndicator.status}
                    onChange={(e) => setEditingIndicator({ ...editingIndicator, status: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Needs Improvement">Needs Improvement</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Target Description</label>
                  <textarea
                    rows={2}
                    value={editingIndicator.target}
                    onChange={(e) => setEditingIndicator({ ...editingIndicator, target: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Verified Evidence</label>
                  <textarea
                    rows={2}
                    value={editingIndicator.evidence}
                    onChange={(e) => setEditingIndicator({ ...editingIndicator, evidence: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Target Action Plan</label>
                  <textarea
                    rows={2}
                    value={editingIndicator.actionPlan}
                    onChange={(e) => setEditingIndicator({ ...editingIndicator, actionPlan: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setEditingIndicator(null)}
                    className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onUpdateIndicator(editingIndicator);
                      setEditingIndicator(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-emerald-900 text-white rounded-lg hover:bg-emerald-800"
                  >
                    Save Verified Record
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
