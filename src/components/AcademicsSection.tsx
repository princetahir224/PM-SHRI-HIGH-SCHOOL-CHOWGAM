import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Calendar, 
  Award, 
  CheckCircle, 
  Download, 
  Search, 
  HelpCircle,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { ACADEMIC_CLASSES_DATA, AcademicClass } from '../data/schoolData';

export const AcademicsSection: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<AcademicClass>(ACADEMIC_CLASSES_DATA[4]); // Class 10 by default
  const [activeTab, setActiveTab] = useState<'curriculum' | 'resources' | 'assessment' | 'remedial'>('curriculum');
  const [resourceModal, setResourceModal] = useState<{ title: string; type: string; content: string } | null>(null);

  const sampleResources = [
    {
      title: "Science Practical Demonstration Guide: Photosynthesis & Plant Cells",
      subject: "Science",
      grade: "Class 9 & 10",
      type: "Practical Lab Manual",
      desc: "Step-by-step experiment instructions for microscopic observation of plant stomata and chlorophyll extraction.",
      content: "EXPERIMENT MANUAL: Observation of Plant Cells under Light Microscope.\n\nOBJECTIVE: Mount onion peel and leaf epidermis to identify cell walls, nucleus, and chloroplasts.\n\nMATERIALS PROVIDED IN SCIENCE ROOM: Compound microscope, glass slides, coverslips, iodine stain, fresh leaves.\n\nPROCEDURE:\n1. Peel a thin transparent membrane from the inner surface of an onion bulb leaf.\n2. Place gently in a watch glass containing water.\n3. Add 1 drop of dilute iodine solution to stain cellular boundaries.\n4. Transfer to slide, cover with coverslip without trapping air bubbles.\n5. Focus under low power (10x), then switch to high power (40x).\n\nOBSERVATIONS & CONCLUSION:\nNotice rectangular cells with distinct cell walls and centrally placed nuclei, characteristic of eukaryotic plant anatomy."
    },
    {
      title: "Mathematics Reasoning: Quadratic Equations & Real-life Applications",
      subject: "Mathematics",
      grade: "Class 10",
      type: "Concept & Problem Sheet",
      desc: "Conceptual breakdown of factoring, quadratic formula derivation, and valley terrain geometry problems.",
      content: "MATHEMATICS WORKSHEET: Quadratic Equations in Everyday Architecture.\n\nSTANDARD FORM: ax² + bx + c = 0 (where a ≠ 0).\n\nDISCRIMINANT (D) = b² - 4ac:\n- If D > 0: Two distinct real roots.\n- If D = 0: Two equal real roots.\n- If D < 0: No real roots.\n\nPRACTICE PROBLEM (CHOWGAM VALLEY APPLICATION):\nA rectangular school playground in Chowgam has an area of 600 square meters. Its length is 10 meters more than its width. Find the dimensions.\n\nSolution Guide:\nLet width = w meters. Then length = (w + 10).\nArea = w(w + 10) = 600 => w² + 10w - 600 = 0.\nFactoring: (w + 30)(w - 20) = 0 => w = 20 m (since width > 0). Length = 30 m."
    },
    {
      title: "English Writing & Declamation: Environmental Conservation in Kashmir",
      subject: "English",
      grade: "Class 8, 9 & 10",
      type: "Worksheet & Speech Model",
      desc: "Format for formal editorial letters, speech writing for morning assembly, and vocabulary enhancement.",
      content: "DECLAMATION SCRIPT & ESSAY TEMPLATE:\nTopic: Guarding Our Mountain Valleys: A Student's Sacred Duty.\n\nSTRUCTURE:\n1. Salutation: Respected Head of Institution, worthy teachers, and dear fellow students.\n2. Introduction: Introduce the Himalayan ecosystem of Chowgam and the threats of non-biodegradable waste.\n3. Body Paragraphs: Mention local water sources, pine forests, and simple student habits (reusable cloth bags, waste segregation).\n4. Conclusion: Reiterate that true knowledge reflects in our reverence for the earth."
    },
    {
      title: "Urdu Language Foundation: Classical Poetry & Grammatical Accuracy",
      subject: "Urdu",
      grade: "Class 6 to 10",
      type: "Language Notes",
      desc: "Rules of Urdu grammar (Qawaid), comprehension passages, and moral stories of Allama Iqbal.",
      content: "اردو قواعد اور فصاحت:\nقواعدِ اردو کے اہم اصول (اسم، فعل، اور صفت کی شناخت)۔\n\nنظم: علامہ اقبال کی بچوں کے لیے دعائیں اور اخلاقی پیغامات۔\n\nمشقی سوالات:\n۱۔ اسمِ معرفہ اور اسمِ نکرہ میں فرق واضح کریں۔\n۲۔ اپنی زبان میں ماحولیاتی صفائی کی اہمیت پر چند جملے تحریر کریں۔"
    }
  ];

  return (
    <section id="academics" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2">
            Curriculum, Pedagogy & Learning
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Academics & Learning Excellence
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Following the curriculum set by the Jammu & Kashmir Board of School Education (JKBOSE) and aligned with the National Education Policy (NEP) 2020, our academic program emphasizes conceptual understanding, experiential science, digital literacy, and holistic child development.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-3 border-b border-stone-200">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'curriculum'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Classes & Subject Schemes (6th–10th)
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'resources'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Digital Worksheets & Learning Notes
          </button>
          <button
            onClick={() => setActiveTab('assessment')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'assessment'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Assessment & Examination System
          </button>
          <button
            onClick={() => setActiveTab('remedial')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'remedial'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Remedial & Gifted Learner Support
          </button>
        </div>

        {/* Tab 1: Classes & Subjects Offered */}
        {activeTab === 'curriculum' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Class Selector buttons */}
            <div className="lg:col-span-4 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                Select Class / Grade:
              </div>
              {ACADEMIC_CLASSES_DATA.map((cls) => (
                <button
                  key={cls.grade}
                  onClick={() => setSelectedClass(cls)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    selectedClass.grade === cls.grade
                      ? 'bg-white border-emerald-800 shadow-sm ring-1 ring-emerald-800'
                      : 'bg-stone-100/70 border-stone-200 hover:bg-white text-stone-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-stone-900">{cls.grade}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{cls.section}</div>
                  </div>
                  <span className="text-xs font-mono text-emerald-800">
                    {cls.subjects.length} Subjects
                  </span>
                </button>
              ))}
            </div>

            {/* Class Detail Display */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200 mb-6">
                <div>
                  <span className="text-xs uppercase font-mono text-emerald-800">
                    {selectedClass.section} · Board Curriculum
                  </span>
                  <h3 className="text-2xl font-bold text-stone-900 mt-1">
                    {selectedClass.grade} Academic Blueprint
                  </h3>
                </div>
                <div className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg">
                  Medium: <strong className="text-stone-800">{selectedClass.medium}</strong>
                </div>
              </div>

              {/* Syllabus summary */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-stone-500 tracking-wider mb-2">
                  Pedagogical Focus & Learning Outcomes
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-lg border border-stone-100">
                  {selectedClass.syllabusOverview}
                </p>
              </div>

              {/* Subjects Grid */}
              <div>
                <h4 className="text-xs uppercase font-bold text-stone-500 tracking-wider mb-3">
                  Subjects Taught by Faculty
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedClass.subjects.map((sub, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-stone-50 rounded-lg border border-stone-200/70 flex items-center gap-3 text-xs sm:text-sm font-medium text-stone-800"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
                <span>Aligned with JKBOSE Syllabi & NCERT Framework</span>
                <span className="text-emerald-800 font-semibold">100% Free Textbooks Provided by Govt</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Digital Notes & Worksheets */}
        {activeTab === 'resources' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {sampleResources.map((res, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                      <span className="font-mono text-emerald-800 uppercase font-semibold">{res.subject}</span>
                      <span>{res.grade}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-2 leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                      {res.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-medium bg-stone-100 px-2.5 py-1 rounded">
                      {res.type}
                    </span>
                    <button
                      onClick={() => setResourceModal(res)}
                      className="px-3 py-1.5 bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Worksheet</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Note about government portal integration */}
            <div className="bg-emerald-900/5 border border-emerald-900/20 p-5 rounded-xl flex items-start gap-4">
              <Sparkles className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-stone-700">
                <strong className="text-emerald-950 font-bold block mb-1">
                  National Digital Portals (DIKSHA & SWAYAM PRABHA):
                </strong>
                Our smart classroom and ICT lab are configured with curated access to DIKSHA digital textbooks, video animations, and practice quizzes for all classes.
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Assessment System */}
        {activeTab === 'assessment' && (
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-stone-200 shadow-xs">
            <h3 className="text-xl font-bold text-stone-900 mb-4">
              Assessment Structure & Examination Calendar
            </h3>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              Assessment at PM SHRI GHS Chowgam adheres to continuous and comprehensive evaluation principles, avoiding high-stakes stress and focusing on diagnosing learning gaps and conceptual progress.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="font-bold text-stone-900 text-sm mb-1">Diagnostic & Formative Tests</div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  Regular unit check-ins, oral discussions, class presentations, and lab notebook assessments to monitor day-to-day understanding.
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="font-bold text-stone-900 text-sm mb-1">Term-End Periodic Evaluations</div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  Scheduled mid-term and golden test series designed strictly following the JKBOSE examination pattern for Class 9 and 10.
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-lg">
                <div className="font-bold text-stone-900 text-sm mb-1">Holistic Progress Reporting</div>
                <div className="text-xs text-stone-600 leading-relaxed">
                  360-degree feedback combining academic scores with sports participation, assembly conduct, eco-club initiatives, and values.
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
              <strong>Official Notice:</strong> Final matriculation examinations for Class 10 are conducted by the Jammu & Kashmir Board of School Education (JKBOSE). Official datesheets and admit cards are issued directly through administrative circulars.
            </div>
          </div>
        )}

        {/* Tab 4: Remedial & Gifted Support */}
        {activeTab === 'remedial' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Remedial Teaching & Learning Recovery</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                No child is left behind. For students needing reinforcement in foundational arithmetic, reading fluency, or science concepts, teachers provide dedicated afternoon remedial sessions.
              </p>
              <ul className="text-xs text-stone-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Small-group individualized attention in science and mathematics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Peer tutoring pairing senior students with younger learners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Step-by-step diagnostic problem sheets without fear or punitive grading.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Gifted & Advanced Learner Mentorship</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                High-achieving students are challenged through higher-order thinking skill (HOTS) problems, science club leadership, and regional competition preparation.
              </p>
              <ul className="text-xs text-stone-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                  <span>Mentorship for National Talent Search (NMMS / NTSE) exams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                  <span>Kala Utsav, debate, and science exhibition guidance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                  <span>Independent library reading and science experiment design.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Digital Resource Modal */}
        {resourceModal && (
          <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-stone-200 max-w-2xl w-full p-6 shadow-xl relative max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <div className="text-xs uppercase font-mono text-emerald-800">
                    Curriculum Resource · {resourceModal.type}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mt-1">
                    {resourceModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setResourceModal(null)}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  ✕
                </button>
              </div>

              <div className="overflow-y-auto py-4 flex-1 text-xs sm:text-sm font-mono whitespace-pre-wrap bg-stone-50 p-4 rounded-lg border border-stone-200 text-stone-800 leading-relaxed">
                {resourceModal.content}
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-500">PM SHRI GHS Chowgam Learning Resource</span>
                <button
                  onClick={() => {
                    const blob = new Blob([resourceModal.content], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${resourceModal.title.replace(/\s+/g, '_')}.txt`;
                    a.click();
                  }}
                  className="px-4 py-2 bg-emerald-900 text-white rounded-lg font-semibold hover:bg-emerald-800 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource Text</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
