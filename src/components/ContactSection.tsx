import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Navigation, 
  Building2,
  HelpCircle,
  Compass
} from 'lucide-react';
import { INITIAL_SCHOOL_INFO } from '../data/schoolData';
import { SCHOOL_IMAGES } from '../data/assets';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    purpose: 'Admission Enquiry (Class 6-10)',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Reach Out & Visit Campus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Contact & Location Information
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            We welcome parents, prospective students, and community members. Whether you have admission inquiries, academic questions, or wish to schedule a campus visit, our office is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Institutional Contact Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Postal Address & Setting */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">
                    Official Postal Location
                  </h3>
                  <div className="text-xs sm:text-sm text-stone-600 mt-2 space-y-1">
                    <p className="font-semibold text-stone-800">{INITIAL_SCHOOL_INFO.name}</p>
                    <p>Village & Post: Chowgam · Zone: Shangas</p>
                    <p>District: Anantnag, UT of Jammu & Kashmir, India</p>
                    <p className="text-emerald-800 font-medium pt-1">
                      Distance: Approximately 27 km from Anantnag District Headquarters
                    </p>
                  </div>
                </div>
              </div>

              {/* Headmaster Contact & Desk Card */}
              <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-stone-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-emerald-800 shrink-0 bg-stone-900">
                    <img
                      src={SCHOOL_IMAGES.headmaster}
                      alt="Headmaster Mr. Shareef Ahmad Khan"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-800 uppercase font-semibold">Head of Institution</div>
                    <div className="font-bold text-stone-900 text-sm">Mr. Shareef Ahmad Khan</div>
                    <div className="text-xs text-stone-500">Qualifications: M.A., B.Ed.</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:7889725799"
                    className="px-3 py-1.5 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-amber-300" />
                    <span>Call 7889725799</span>
                  </a>
                </div>
              </div>

              {/* Travel & Route Directions */}
              <div className="mt-6 pt-6 border-t border-stone-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                  Travel Directions & Route:
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  From Anantnag town, commute via the standard district road network toward the Chowgam mini-valley (~27 km). The school is located at the foot of the green mountains, surrounded by rolling pine slopes and apple orchards. Local shared transport and bus services operate between Anantnag and Chowgam.
                </p>
              </div>
            </div>

            {/* Official Contact Points (Phone, Email, Timings) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <Phone className="w-4 h-4 text-emerald-800" />
                  <h4 className="font-bold text-stone-900 text-sm">Phone Number</h4>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <a href="tel:7889725799" className="font-bold text-emerald-900 text-sm hover:underline block">
                    7889725799
                  </a>
                  <div className="text-[11px] text-stone-400">Headmaster / HOI Desk</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <Mail className="w-4 h-4 text-emerald-800" />
                  <h4 className="font-bold text-stone-900 text-sm">Official Email</h4>
                </div>
                <div className="text-xs text-stone-600 space-y-1 truncate">
                  <a href="mailto:hschowgam@gmail.com" className="font-bold text-emerald-900 text-xs sm:text-xs hover:underline block truncate">
                    hschowgam@gmail.com
                  </a>
                  <div className="text-[11px] text-stone-400">Official Correspondence</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <h4 className="font-bold text-stone-900 text-sm">Office Hours</h4>
                </div>
                <div className="text-xs text-stone-600 space-y-1">
                  <div className="font-semibold text-stone-800">10:00 AM – 04:00 PM</div>
                  <div className="text-[11px] text-stone-400">Monday to Saturday</div>
                </div>
              </div>
            </div>

            {/* Visual Mountain Valley Map Locator */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
              <h4 className="font-bold text-stone-900 text-sm mb-3 flex items-center justify-between">
                <span>Chowgam Mini-Valley Geographical Context</span>
                <span className="text-xs font-mono text-emerald-800 font-semibold">Anantnag District · J&K</span>
              </h4>
              <div className="bg-stone-100 rounded-lg p-5 border border-stone-200/80 text-xs text-stone-700 space-y-2">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-stone-500">Topography:</span>
                  <span className="font-semibold text-stone-900">Mini-valley at foothill of green mountains</span>
                </div>
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-stone-500">Elevation / Climate:</span>
                  <span className="font-semibold text-stone-900">Temperate Kashmir Valley mountain climate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Nearest Main Town:</span>
                  <span className="font-semibold text-stone-900">Anantnag (approx. 27 km)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Admission & General Enquiry Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs">
            <div className="mb-6">
              <div className="text-xs uppercase font-mono text-emerald-800 font-semibold">
                Official Enquiry Channel
              </div>
              <h3 className="text-xl font-bold text-stone-900 mt-1">
                Admissions & Community Enquiry
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Submit an inquiry for Class 6–10 admissions, transfers, or school programs.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Enquiry Successfully Recorded</h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your enquiry has been received by the PM SHRI GHS Chowgam administrative desk.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', contact: '', purpose: 'Admission Enquiry (Class 6-10)', message: '' });
                  }}
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-900 text-white rounded-lg hover:bg-emerald-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Ahmad"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / Email / Contact *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Phone number or email address"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Enquiry Subject / Purpose
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Admission Enquiry (Class 6-10)">Admission Enquiry (Classes 6 to 10)</option>
                    <option value="Transfer Certificate / Verification">Transfer Certificate & Verification</option>
                    <option value="CWSN Inclusive Facilities">CWSN & Special Needs Support</option>
                    <option value="Smart Room & Digital Learning">Smart Room & ICT Curriculum</option>
                    <option value="SMC & Community Consultation">SMC & Community Consultation</option>
                    <option value="General Information">General School Information</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Enquiry Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your questions or admission request here..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enquiry to School Desk</span>
                  </button>
                </div>

                <div className="text-[11px] text-stone-400 text-center leading-tight">
                  Enquiries are reviewed by the school office during working days.
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
