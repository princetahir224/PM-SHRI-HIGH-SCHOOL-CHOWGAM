import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  BookCheck, 
  MessageSquare, 
  CheckCircle2, 
  FileCheck, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const StudentParentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'admissions' | 'calendar' | 'timetable' | 'feedback'>('admissions');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [parentName, setParentName] = useState('');
  const [studentClass, setStudentClass] = useState('Class 9');
  const [feedbackCategory, setFeedbackCategory] = useState('Academic Progress');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !feedbackMessage) return;
    setFeedbackSent(true);
  };

  const dailyBellSchedule = [
    { time: "10:00 AM – 10:25 AM", period: "Morning Assembly, National Anthem & Daily Reflection", note: "Physical drill, prayer & speech" },
    { time: "10:25 AM – 11:05 AM", period: "Period 1: Mathematics / Science", note: "Conceptual foundation" },
    { time: "11:05 AM – 11:45 AM", period: "Period 2: English Language", note: "Grammar & comprehension" },
    { time: "11:45 AM – 12:25 PM", period: "Period 3: Urdu / Kashmiri Language", note: "Literature & writing" },
    { time: "12:25 PM – 01:05 PM", period: "Period 4: Social Science", note: "History, Civics, Geography" },
    { time: "01:05 PM – 01:45 PM", period: "Lunch Recess & Mid-Day Refreshment", note: "Cleanliness & handwash" },
    { time: "01:45 PM – 02:25 PM", period: "Period 5: Smart Room / ICT Lab / Science Practical", note: "Hands-on activity" },
    { time: "02:25 PM – 03:05 PM", period: "Period 6: Library / Reading Period", note: "Silent reading & book reviews" },
    { time: "03:05 PM – 03:35 PM", period: "Period 7: Sports / Yoga / Eco-Club", note: "Outdoor physical activity" },
    { time: "03:35 PM – 04:00 PM", period: "Period 8: Remedial Learning & Homework Guidance", note: "Doubt clearing with teachers" }
  ];

  return (
    <section id="portal" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Student & Family Resources
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Students & Parents Information Portal
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Transparent information for students and families: admission guidelines, daily school schedule, homework guidelines, and a direct channel for parent feedback and queries.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-3 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('admissions')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'admissions'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Admission Procedures & Documents
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'timetable'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Daily Timetable & Bell Schedule
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            School Calendar & PTM Guidelines
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'feedback'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Parent Feedback & Suggestions
          </button>
        </div>

        {/* Tab 1: Admissions */}
        {activeTab === 'admissions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-800" />
                Admission Guidelines (Classes 6 to 10)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
                As a premier government institution under PM SHRI, admission is accessible, equitable, and completely free of tuition charges under the Right to Education (RTE) mandate.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-stone-200/60 text-xs">
                  <strong className="block text-stone-900 mb-1">Eligibility Criteria</strong>
                  Completion of the preceding academic class from any recognized school or education zone.
                </div>
                <div className="p-3 bg-white rounded-lg border border-stone-200/60 text-xs">
                  <strong className="block text-stone-900 mb-1">Age Norms</strong>
                  As per the official Jammu & Kashmir School Education Department guidelines.
                </div>
                <div className="p-3 bg-white rounded-lg border border-stone-200/60 text-xs">
                  <strong className="block text-stone-900 mb-1">Inclusive Admissions</strong>
                  No child is denied admission on grounds of gender, caste, creed, or special needs.
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200">
              <h3 className="text-xl font-bold text-stone-900 mb-4">
                Required Verification Documents
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-4">
                Parents are requested to bring the following originals and one set of photocopies to the school office:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Previous class marks card / progress report.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Official School Leaving / Transfer Certificate (TC), if transferring from another school.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Date of Birth (DOB) Certificate issued by Municipal / Village Panchayat authority.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Aadhaar Card copy of the student and parent/guardian.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Recent passport-size photographs of the student (4 copies).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Category or Disability certificate for CWSN support, where applicable.</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-stone-500 flex flex-wrap items-center justify-between gap-2">
                <span>School Office Hours: Monday to Saturday, 10:00 AM – 4:00 PM</span>
                <span className="font-semibold text-emerald-900">Office Clerk: Mr. Altaf Ahmad (Master) · Zone: Shangus</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Timetable */}
        {activeTab === 'timetable' && (
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-6 shadow-xs">
            <div className="max-w-2xl mb-6">
              <h3 className="text-xl font-bold text-stone-900 mb-1">Daily Bell Timetable</h3>
              <p className="text-xs sm:text-sm text-stone-600">
                A structured daily routine balancing core academic subjects, smart classroom modules, physical training, and remedial mentoring.
              </p>
            </div>

            <div className="divide-y divide-stone-200 bg-white rounded-lg border border-stone-200 overflow-hidden text-xs sm:text-sm">
              {dailyBellSchedule.map((item, idx) => (
                <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50 transition-colors">
                  <div className="font-mono text-emerald-900 font-semibold w-48 shrink-0">
                    {item.time}
                  </div>
                  <div className="font-medium text-stone-900 flex-1">
                    {item.period}
                  </div>
                  <div className="text-stone-500 text-xs sm:text-right w-56 shrink-0">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Calendar & PTM */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-800" />
                Parent-Teacher Consultation Meetings (PTM)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Education is a collaborative partnership between the school and families. Regular PTMs are organized at the conclusion of each unit test cycle.
              </p>
              <div className="space-y-2 text-xs text-stone-700">
                <div className="p-3 bg-white rounded-lg border border-stone-200/60">
                  <strong className="block text-stone-900 mb-0.5">Individual Consultation:</strong>
                  Constructive dialogue regarding child’s academic strengths, attendance, and homework habits.
                </div>
                <div className="p-3 bg-white rounded-lg border border-stone-200/60">
                  <strong className="block text-stone-900 mb-0.5">SMC Engagement:</strong>
                  School Management Committee reviews campus facilities, sanitation, and safety together.
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
              <h3 className="text-lg font-bold text-stone-900 mb-3">
                Homework & Study Recommendations
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                Under NEP 2020 guidelines, homework is designed to be meaningful and reflective rather than overburdening rote tasks.
              </p>
              <ul className="space-y-2 text-xs text-stone-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">·</span>
                  <span><strong>Classes 6 to 8:</strong> Activity-based tasks, reading 20 minutes daily, nature observations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">·</span>
                  <span><strong>Classes 9 & 10:</strong> Focused practice in mathematics problem-solving and science practical logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">·</span>
                  <span><strong>No Overload:</strong> Teachers coordinate across subjects to ensure healthy recreation and sleep.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Parent Feedback Form */}
        {activeTab === 'feedback' && (
          <div className="max-w-2xl mx-auto bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200">
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              Parent Feedback & Suggestion Box
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              Your insights help us continuously elevate our school. Please share your suggestions or inquiries with the Head of Institution and faculty.
            </p>

            {feedbackSent ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">Thank You, Respected Parent!</h4>
                <p className="text-xs sm:text-sm text-emerald-900">
                  Your feedback has been recorded in the institutional suggestions log. The Head of Institution reviews all community inputs.
                </p>
                <button
                  onClick={() => {
                    setFeedbackSent(false);
                    setFeedbackMessage('');
                  }}
                  className="px-4 py-1.5 text-xs font-semibold bg-emerald-800 text-white rounded-lg hover:bg-emerald-700"
                >
                  Submit Another Feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Mohd. Farooq"
                      className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Student's Class
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                    >
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Feedback Category
                  </label>
                  <select
                    value={feedbackCategory}
                    onChange={(e) => setFeedbackCategory(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Academic Progress">Academic Progress & Teaching</option>
                    <option value="Smart Classroom & ICT">Smart Classroom & ICT Lab Usage</option>
                    <option value="Campus Facilities & Cleanliness">Campus Facilities & Cleanliness</option>
                    <option value="Sports & Co-curricular">Sports & Co-curricular Activities</option>
                    <option value="CWSN & Student Support">CWSN & Special Needs Support</option>
                    <option value="General Suggestion">General Suggestion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message / Suggestion *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Please write your detailed feedback or constructive suggestion..."
                    className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
                  >
                    Submit Feedback to School Administration
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
