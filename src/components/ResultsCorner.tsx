import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Download, 
  FileText, 
  Printer, 
  PlusCircle, 
  CheckCircle2, 
  Phone, 
  Calendar, 
  User, 
  GraduationCap, 
  FileCheck, 
  ChevronRight, 
  BookOpen, 
  Filter, 
  Upload, 
  X,
  Eye,
  AlertCircle
} from 'lucide-react';
import { 
  StudentResult, 
  SubjectScore, 
  PdfResultGazette, 
  calculateGrade 
} from '../data/resultsAndAdmissionsData';
import { INITIAL_SCHOOL_INFO } from '../data/schoolData';

interface ResultsCornerProps {
  results: StudentResult[];
  pdfGazettes: PdfResultGazette[];
  onAddResult: (result: StudentResult) => void;
  onAddGazette: (gazette: PdfResultGazette) => void;
}

export const ResultsCorner: React.FC<ResultsCornerProps> = ({
  results,
  pdfGazettes,
  onAddResult,
  onAddGazette
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'gazettes'>('current');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [selectedGazette, setSelectedGazette] = useState<PdfResultGazette | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploadGazetteModalOpen, setIsUploadGazetteModalOpen] = useState(false);

  // Upload Result Form State
  const [uploadFormData, setUploadFormData] = useState({
    rollNo: '',
    regNo: '',
    studentName: '',
    parentName: '',
    studentClass: 'Class 10' as StudentResult['studentClass'],
    academicYear: '2025–26',
    examTerm: 'Annual Examination' as StudentResult['examTerm'],
    remarks: 'Promoted with commendable academic standing.',
    subjects: [
      { subject: 'General English', maxMarks: 100, marksObtained: 85, grade: 'A2' },
      { subject: 'Mathematics', maxMarks: 100, marksObtained: 80, grade: 'B1' },
      { subject: 'Science & Technology', maxMarks: 100, marksObtained: 85, grade: 'A2' },
      { subject: 'Social Science', maxMarks: 100, marksObtained: 80, grade: 'B1' },
      { subject: 'Urdu / Regional Language', maxMarks: 100, marksObtained: 85, grade: 'A2' }
    ]
  });

  // Upload Gazette Form State
  const [gazetteFormData, setGazetteFormData] = useState({
    session: 'Session 2024–25',
    studentClass: 'Class 10',
    title: '',
    examName: 'JKBOSE Secondary School Examination',
    fileSize: '2.5 MB (Official Signed PDF Gazette)',
    fileName: 'GHS_Chowgam_Official_Gazette.pdf',
    totalStudents: 30,
    passedStudents: 29,
    passPercentage: '96.67%',
    description: 'Official signed gazette notification and tabulation sheet.'
  });

  // Filtered Results
  const filteredResults = results.filter(item => {
    const matchesClass = selectedClass === 'all' || item.studentClass === selectedClass;
    const matchesSearch = 
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.regNo && item.regNo.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesClass && matchesSearch;
  });

  // Filtered Gazettes
  const filteredGazettes = pdfGazettes.filter(gaz => {
    if (selectedClass === 'all') return true;
    return gaz.studentClass.includes(selectedClass) || gaz.studentClass.includes('All Classes');
  });

  const handleSubjectMarkChange = (index: number, marks: number) => {
    const updated = [...uploadFormData.subjects];
    const max = updated[index].maxMarks;
    const percentage = (marks / max) * 100;
    updated[index].marksObtained = marks;
    updated[index].grade = calculateGrade(percentage);
    setUploadFormData({ ...uploadFormData, subjects: updated });
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFormData.studentName || !uploadFormData.rollNo) return;

    const totalMarks = uploadFormData.subjects.reduce((sum, s) => sum + Number(s.marksObtained), 0);
    const maxMarks = uploadFormData.subjects.reduce((sum, s) => sum + Number(s.maxMarks), 0);
    const percentage = Number(((totalMarks / maxMarks) * 100).toFixed(1));
    const overallGrade = calculateGrade(percentage);

    const newResult: StudentResult = {
      id: `res-${Date.now()}`,
      rollNo: uploadFormData.rollNo,
      regNo: uploadFormData.regNo || `JK-GHS-CHW-${uploadFormData.studentClass.replace('Class ', '')}-2026-${uploadFormData.rollNo}`,
      studentName: uploadFormData.studentName,
      parentName: uploadFormData.parentName,
      studentClass: uploadFormData.studentClass,
      academicYear: uploadFormData.academicYear,
      examTerm: uploadFormData.examTerm,
      datePublished: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      subjects: uploadFormData.subjects,
      totalMarks,
      maxMarks,
      percentage,
      overallGrade,
      status: percentage >= 33 ? 'PASS' : 'NEEDS IMPROVEMENT',
      remarks: uploadFormData.remarks,
      inchargeTeacher: 'Mr. Tahir Ahmad Kumar (Examination In-charge, Phone: 8803497224)'
    };

    onAddResult(newResult);
    setSelectedResult(newResult);
    setIsUploadModalOpen(false);
  };

  const handleSaveGazette = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gazetteFormData.title) return;

    const newGazette: PdfResultGazette = {
      id: `gaz-${Date.now()}`,
      session: gazetteFormData.session,
      studentClass: gazetteFormData.studentClass,
      title: gazetteFormData.title,
      examName: gazetteFormData.examName,
      datePublished: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fileSize: gazetteFormData.fileSize,
      fileName: gazetteFormData.fileName,
      totalStudents: Number(gazetteFormData.totalStudents),
      passedStudents: Number(gazetteFormData.passedStudents),
      passPercentage: gazetteFormData.passPercentage,
      signedBy: 'Mr. Shareef Ahmad Khan (Headmaster / HOI)',
      verifiedBy: 'Mr. Tahir Ahmad Kumar (Examination In-charge, Phone: 8803497224)',
      verificationCode: `GHS-CHW-PUB-${Date.now().toString().slice(-6)}`,
      description: gazetteFormData.description,
      records: []
    };

    onAddGazette(newGazette);
    setIsUploadGazetteModalOpen(false);
    setActiveTab('gazettes');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="results" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-emerald-800 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Examination Wing & Class Toppers Honor Roll</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Class Toppers & School Results Corner
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Celebrating class toppers across published grades (Class 8th, Class 7th, and Class 6th) alongside certified session PDF gazettes and examination verification under Zone Shangus.
            </p>
          </div>

          {/* Action Buttons: Upload Result & Direct Desk Contact */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-2"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Result at Website</span>
            </button>
            <button
              onClick={() => setIsUploadGazetteModalOpen(true)}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors border border-stone-300 flex items-center gap-2"
            >
              <FileCheck className="w-3.5 h-3.5 text-stone-600" />
              <span>Add Past Session Gazette</span>
            </button>
          </div>
        </div>

        {/* Examination Cell Desk Banner with Phone Numbers */}
        <div className="mb-8 p-4 sm:p-5 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>Examination Cell & Evaluation Desk · Zone Shangus</span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  Official Verification
                </span>
              </div>
              <div className="text-xs text-stone-600 mt-0.5">
                Supervised by <strong className="text-stone-800">Mr. Tahir Ahmad Kumar</strong> (Teacher, Examination In-charge & Math Teacher) & <strong className="text-stone-800">Mr. Shareef Ahmad Khan</strong> (Headmaster / HOI)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs shrink-0">
            <a
              href="tel:8803497224"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 rounded-lg font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-700" />
              <span>Exam In-charge: 8803497224</span>
            </a>
            <a
              href="tel:7889725799"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>HOI: 7889725799</span>
            </a>
          </div>
        </div>

        {/* Primary Corner Tabs: Digital Marksheets vs. Past Session PDF Gazettes */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'current'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Class Toppers & Results ({results.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('gazettes')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'gazettes'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Result Sheets / Gazette (Last Sessions) ({pdfGazettes.length})</span>
            </button>
          </div>

          {/* Class Filters (Classes 6 to 10) */}
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 max-w-full">
            <span className="text-stone-400 font-medium mr-1 text-[11px]">Class:</span>
            {['all', 'Class 10', 'Class 9', 'Class 8', 'Class 7', 'Class 6'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors whitespace-nowrap text-xs ${
                  selectedClass === cls
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cls === 'all' ? 'All Classes' : cls}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: Digital Marksheet Search and Card Listing */}
        {activeTab === 'current' && (
          <div>
            {/* Search Bar */}
            <div className="mb-6 bg-white p-3.5 rounded-xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Topper Name (Saima Rashid, Danish Ahmad Khan, Rutba, Arbeena, Uzma, Sana Jan)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="text-xs text-stone-500 font-medium flex items-center gap-2">
                <span>Showing <strong className="tabular-nums">{filteredResults.length}</strong> class topper records</span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-emerald-900 font-bold hover:underline"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Class & Merit Position */}
                    <div className="flex items-center justify-between gap-2 border-b border-stone-100 pb-2 mb-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="font-mono font-bold text-emerald-900">
                          {result.studentClass}
                        </span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="font-semibold text-amber-800">
                          {result.meritPosition || 'Class Topper'}
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        result.status === 'PASS' 
                          ? 'bg-emerald-100 text-emerald-900' 
                          : result.status === 'PROMOTED'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}>
                        {result.status}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-stone-900">
                      {result.studentName}
                    </h4>
                    <div className="text-xs text-stone-500 mb-3">
                      {result.parentName ? (
                        <>S/o, D/o: <strong className="text-stone-700">{result.parentName}</strong></>
                      ) : (
                        <span>Merit Roll · Roll No. <strong className="font-mono text-stone-700 tabular-nums">{result.rollNo}</strong></span>
                      )}
                    </div>

                    {/* Marks Overview */}
                    <div className="bg-stone-50 rounded-lg p-3 border border-stone-200/80 mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-stone-500">Term / Exam:</span>
                        <span className="font-semibold text-stone-800">{result.examTerm}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-stone-500">Academic Year:</span>
                        <span className="font-mono text-stone-700 tabular-nums">{result.academicYear}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1.5 border-t border-stone-200/70">
                        <span className="font-semibold text-stone-700">Marks:</span>
                        <span className="font-bold text-emerald-950 font-mono tabular-nums">
                          {result.totalMarks} / {result.maxMarks} ({result.percentage}%)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-semibold text-stone-700">Overall Grade:</span>
                        <span className="px-2 py-0.5 bg-emerald-900 text-white rounded font-bold text-xs">
                          Grade {result.overallGrade}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-500 italic line-clamp-2 mb-2">
                      "{result.remarks}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-stone-400 font-mono truncate">
                      {result.regNo}
                    </span>
                    <button
                      onClick={() => setSelectedResult(result)}
                      className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Marksheet</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
                <AlertCircle className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h4 className="text-base font-bold text-stone-800">No Topper Records Listed</h4>
                <p className="text-xs text-stone-500 mt-1 mb-4">
                  No published topper entry matched <strong>{selectedClass === 'all' ? 'your search' : selectedClass}</strong>. Staff can upload additional class toppers using the "Upload Result at Website" button.
                </p>
                <button
                  onClick={() => { setSelectedClass('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg transition-colors"
                >
                  Show Published Class Toppers
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Space for PDF Result Sheet Available for Last Sessions */}
        {activeTab === 'gazettes' && (
          <div>
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-800" />
                  <span>Official Gazette Archive & Tabulation Broad-Sheets</span>
                </div>
                <p className="text-xs text-amber-950 mt-1">
                  Official certified results of last academic sessions (2024–25, 2023–24, 2022–23) across middle wing and JKBOSE Class 10th boards. These gazette sheets are certified by Headmaster Mr. Shareef Ahmad Khan and Examination In-charge Mr. Tahir Ahmad Kumar.
                </p>
              </div>

              <button
                onClick={() => setIsUploadGazetteModalOpen(true)}
                className="px-3.5 py-1.5 bg-amber-900 hover:bg-amber-800 text-white rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Upload Past Session Sheet</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGazettes.map((gaz) => (
                <div
                  key={gaz.id}
                  className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-bold rounded text-xs">
                        {gaz.session}
                      </span>
                      <span className="text-xs font-mono font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {gaz.studentClass}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 mb-1 leading-snug">
                      {gaz.title}
                    </h3>
                    <div className="text-xs text-emerald-800 font-medium mb-3">
                      {gaz.examName}
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {gaz.description}
                    </p>

                    {/* Gazette Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-stone-50 rounded-lg border border-stone-100 text-xs text-center mb-4">
                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-mono">Appeared</div>
                        <div className="text-sm font-bold text-stone-900 mt-0.5">{gaz.totalStudents}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-mono">Passed</div>
                        <div className="text-sm font-bold text-emerald-700 mt-0.5">{gaz.passedStudents}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-stone-400 uppercase font-mono">Pass %</div>
                        <div className="text-sm font-bold text-amber-800 mt-0.5">{gaz.passPercentage}</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 space-y-1 mb-4 font-mono">
                      <div>File: <strong className="text-stone-700">{gaz.fileName}</strong> ({gaz.fileSize})</div>
                      <div>Published: <span>{gaz.datePublished}</span> · Code: <span>{gaz.verificationCode}</span></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedGazette(gaz)}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-300" />
                      <span>View Gazette Sheet</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedGazette(gaz);
                        setTimeout(() => window.print(), 300);
                      }}
                      className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5 text-stone-600" />
                      <span>Print PDF Gazette</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: Printable Digital Marksheet Card View */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-stone-300 shadow-2xl relative my-8 print:p-0 print:border-none print:shadow-none print:m-0">
            
            {/* Close Button (Hidden on Print) */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 print:hidden">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Official Verified Marksheet
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-emerald-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Marksheet</span>
                </button>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Marksheet Header */}
            <div className="text-center pb-6 border-b-2 border-stone-800">
              <div className="text-[11px] font-mono tracking-widest text-emerald-900 uppercase font-bold">
                UT of Jammu and Kashmir · School Education Department
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
                PM SHRI GOVT HIGH SCHOOL CHOWGAM
              </h3>
              <div className="text-xs text-stone-600 mt-0.5">
                Zone: Shangus · District: Anantnag · PIN: 192201
              </div>
              <div className="inline-block mt-3 px-4 py-1 bg-stone-900 text-white rounded-md text-xs font-bold uppercase tracking-wider">
                Student Academic Achievement Report Card · {selectedResult.academicYear}
              </div>
            </div>

            {/* Student Particulars */}
            <div className="py-4 border-b border-stone-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Student Name</span>
                <span className="font-bold text-stone-900 text-sm">{selectedResult.studentName}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">
                  {selectedResult.parentName ? "Father's Name" : "Merit Distinction"}
                </span>
                <span className="font-semibold text-stone-800">
                  {selectedResult.parentName || selectedResult.meritPosition || "Class Topper"}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Class & Section</span>
                <span className="font-bold text-emerald-900">{selectedResult.studentClass}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Roll Number</span>
                <span className="font-mono font-bold text-stone-900">{selectedResult.rollNo}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Registration No.</span>
                <span className="font-mono text-stone-700">{selectedResult.regNo}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase font-mono">Term / Exam</span>
                <span className="font-semibold text-stone-800">{selectedResult.examTerm}</span>
              </div>
            </div>

            {/* Subject Marks Table */}
            <div className="py-4">
              <table className="w-full text-xs border border-stone-200">
                <thead>
                  <tr className="bg-stone-100 text-stone-700 border-b border-stone-200 text-left">
                    <th className="p-2.5 font-bold">#</th>
                    <th className="p-2.5 font-bold">Subject</th>
                    <th className="p-2.5 font-bold text-center">Max Marks</th>
                    <th className="p-2.5 font-bold text-center">Marks Obtained</th>
                    <th className="p-2.5 font-bold text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {selectedResult.subjects.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="p-2.5 text-stone-400 font-mono">{idx + 1}</td>
                      <td className="p-2.5 font-semibold text-stone-900">{sub.subject}</td>
                      <td className="p-2.5 text-center font-mono text-stone-600">{sub.maxMarks}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-stone-900">{sub.marksObtained}</td>
                      <td className="p-2.5 text-center font-bold text-emerald-900">{sub.grade}</td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50 font-bold border-t-2 border-stone-300">
                    <td colSpan={2} className="p-2.5 text-stone-900 uppercase">Grand Total:</td>
                    <td className="p-2.5 text-center font-mono">{selectedResult.maxMarks}</td>
                    <td className="p-2.5 text-center font-mono text-emerald-950 text-sm">{selectedResult.totalMarks}</td>
                    <td className="p-2.5 text-center text-emerald-900">{selectedResult.overallGrade}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Overall Result & Performance Summary */}
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-stone-500 block text-[11px]">Percentage & Award:</span>
                <span className="text-lg font-extrabold text-stone-900">{selectedResult.percentage}% · Grade {selectedResult.overallGrade}</span>
              </div>
              <div className="text-right sm:text-right">
                <span className="text-stone-500 block text-[11px]">Result Classification:</span>
                <span className="px-3 py-1 bg-emerald-900 text-white rounded-md font-bold text-xs">
                  {selectedResult.status}
                </span>
              </div>
            </div>

            <div className="text-xs text-stone-600 mb-8 p-3 bg-white rounded-lg border border-stone-200">
              <strong className="text-stone-800">Teacher Remarks: </strong>
              <span>{selectedResult.remarks}</span>
            </div>

            {/* Official Signatures */}
            <div className="pt-8 border-t border-stone-300 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <div className="font-bold text-stone-900">Mr. Tahir Ahmad Kumar</div>
                <div className="text-stone-500 text-[11px]">Examination In-charge & Math Teacher</div>
                <div className="text-[10px] font-mono text-stone-400 mt-0.5">Phone: 8803497224</div>
              </div>
              <div>
                <div className="font-bold text-stone-900">Mr. Shareef Ahmad Khan</div>
                <div className="text-stone-500 text-[11px]">Headmaster / Head of Institution (HOI)</div>
                <div className="text-[10px] font-mono text-stone-400 mt-0.5">PM SHRI Govt High School Chowgam</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Interactive Official PDF Gazette Viewer */}
      {selectedGazette && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 border border-stone-300 shadow-2xl relative my-8 print:p-0 print:border-none print:shadow-none print:m-0">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 print:hidden">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-700" />
                  Official PDF Result Gazette Sheet · {selectedGazette.session}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-amber-900 text-white rounded-lg text-xs font-semibold hover:bg-amber-800 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Official Sheet</span>
                </button>
                <button
                  onClick={() => setSelectedGazette(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Gazette Broad-Sheet Layout */}
            <div className="text-center pb-6 border-b-2 border-stone-800">
              <div className="text-[11px] font-mono tracking-widest text-emerald-900 uppercase font-bold">
                OFFICE OF THE HEADMASTER · PM SHRI GOVT HIGH SCHOOL CHOWGAM
              </div>
              <div className="text-xs text-stone-600 mt-0.5">
                Zone: Shangus · District Anantnag (J&K) · Affiliated with JKBOSE
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-2">
                {selectedGazette.title}
              </h3>
              <div className="text-xs font-semibold text-amber-900 mt-0.5">
                {selectedGazette.examName} · {selectedGazette.session}
              </div>
            </div>

            {/* Gazette Statistical Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-stone-200 text-xs text-center">
              <div className="p-2.5 bg-stone-50 rounded-lg">
                <div className="text-[10px] text-stone-400 uppercase font-mono">Enrolled</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">{selectedGazette.totalStudents} Candidates</div>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg">
                <div className="text-[10px] text-stone-400 uppercase font-mono">Qualified</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5">{selectedGazette.passedStudents} Passed</div>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg">
                <div className="text-[10px] text-stone-400 uppercase font-mono">Pass Percentage</div>
                <div className="text-sm font-bold text-amber-800 mt-0.5">{selectedGazette.passPercentage}</div>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg">
                <div className="text-[10px] text-stone-400 uppercase font-mono">Status</div>
                <div className="text-sm font-bold text-stone-800 mt-0.5">Official Gazette</div>
              </div>
            </div>

            {/* Tabular Roster Records or Privacy Summary */}
            <div className="py-4">
              <div className="text-xs font-bold text-stone-800 mb-2 flex items-center justify-between">
                <span>Session Gazette Summary & Verification Record:</span>
                <span className="text-[11px] font-mono text-stone-400">Class: {selectedGazette.studentClass}</span>
              </div>
              {selectedGazette.records.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-stone-200">
                    <thead>
                      <tr className="bg-stone-100 text-stone-700 border-b border-stone-200 text-left">
                        <th className="p-2 font-bold">Roll No.</th>
                        <th className="p-2 font-bold">Candidate Name</th>
                        <th className="p-2 font-bold">Father's Name</th>
                        <th className="p-2 font-bold text-center">Marks (500)</th>
                        <th className="p-2 font-bold text-center">%</th>
                        <th className="p-2 font-bold text-center">Grade</th>
                        <th className="p-2 font-bold text-center">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {selectedGazette.records.map((rec, i) => (
                        <tr key={i} className="hover:bg-stone-50">
                          <td className="p-2 font-mono font-bold text-stone-900">{rec.rollNo}</td>
                          <td className="p-2 font-semibold text-stone-800">{rec.studentName}</td>
                          <td className="p-2 text-stone-600">{rec.fatherName}</td>
                          <td className="p-2 text-center font-mono font-semibold text-stone-900">{rec.totalMarks}</td>
                          <td className="p-2 text-center font-mono">{rec.percentage}%</td>
                          <td className="p-2 text-center font-bold text-emerald-800">{rec.grade}</td>
                          <td className="p-2 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                              {rec.result}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 leading-relaxed">
                  <div className="font-semibold text-stone-900 mb-1">
                    Individual Candidate Names Archived Offline
                  </div>
                  <p>
                    Only aggregate pass statistics and class toppers are displayed publicly on the school website. Complete individual roll-number tabulation sheets ({selectedGazette.fileName}) are preserved in the sealed Examination Register with <strong>Mr. Tahir Ahmad Kumar</strong> (Examination In-charge, Phone: <strong>8803497224</strong>).
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 mb-6 leading-relaxed">
              <strong className="text-stone-800">Verification Certificate: </strong>
              Certified that the above result statement has been audited against the official School Tabulation Register & JKBOSE Gazette broad-sheet. All distinctions and awards stand confirmed.
            </div>

            {/* Official Dual Signature Desk */}
            <div className="pt-6 border-t-2 border-stone-800 grid grid-cols-2 gap-8 text-center text-xs">
              <div>
                <div className="font-bold text-stone-900">Mr. Tahir Ahmad Kumar</div>
                <div className="text-stone-500 text-[11px]">Examination In-charge & Math Teacher</div>
                <div className="text-[10px] font-mono text-sky-900 font-semibold mt-0.5">Phone: 8803497224</div>
              </div>
              <div>
                <div className="font-bold text-stone-900">Mr. Shareef Ahmad Khan</div>
                <div className="text-stone-500 text-[11px]">Headmaster / Head of Institution (HOI)</div>
                <div className="text-[10px] font-mono text-emerald-900 font-semibold mt-0.5">PM SHRI GHS Chowgam · 7889725799</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: Upload Result at Website Form */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-stone-300 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-5">
              <div>
                <div className="text-xs uppercase font-mono font-bold text-emerald-800">Staff & Examination Console</div>
                <h3 className="text-lg font-bold text-stone-900">Upload Student Result at Website</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Topper / Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saima Rashid"
                    value={uploadFormData.studentName}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, studentName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Father / Guardian Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    value={uploadFormData.parentName}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, parentName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Class *</label>
                  <select
                    value={uploadFormData.studentClass}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, studentClass: e.target.value as StudentResult['studentClass'] })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 6">Class 6</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Roll Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1003"
                    value={uploadFormData.rollNo}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, rollNo: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Academic Year</label>
                  <input
                    type="text"
                    value={uploadFormData.academicYear}
                    onChange={(e) => setUploadFormData({ ...uploadFormData, academicYear: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              {/* Subject Marks Entry */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div className="font-bold text-stone-900 mb-2">Subject Scores & Components (Out of 100):</div>
                <div className="space-y-2">
                  {uploadFormData.subjects.map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3">
                      <span className="font-medium text-stone-700 truncate w-44">{sub.subject}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={sub.marksObtained}
                          onChange={(e) => handleSubjectMarkChange(idx, Number(e.target.value))}
                          className="w-20 bg-white border border-stone-300 rounded p-1 text-center font-mono font-bold text-stone-900"
                        />
                        <span className="font-bold text-emerald-800 w-8">{sub.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Evaluation Remarks / Feedback</label>
                <input
                  type="text"
                  value={uploadFormData.remarks}
                  onChange={(e) => setUploadFormData({ ...uploadFormData, remarks: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Publish Result Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Upload Past Session Gazette PDF Form */}
      {isUploadGazetteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-stone-300 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-5">
              <div>
                <div className="text-xs uppercase font-mono font-bold text-amber-800">Past Academic Sessions</div>
                <h3 className="text-lg font-bold text-stone-900">Add PDF Result Sheet / Gazette</h3>
              </div>
              <button
                onClick={() => setIsUploadGazetteModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGazette} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Gazette Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Class 10th JKBOSE Annual Regular Gazette 2024–25"
                  value={gazetteFormData.title}
                  onChange={(e) => setGazetteFormData({ ...gazetteFormData, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Academic Session *</label>
                  <select
                    value={gazetteFormData.session}
                    onChange={(e) => setGazetteFormData({ ...gazetteFormData, session: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                  >
                    <option value="Session 2024–25">Session 2024–25</option>
                    <option value="Session 2023–24">Session 2023–24</option>
                    <option value="Session 2022–23">Session 2022–23</option>
                    <option value="Session 2021–22">Session 2021–22</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Class / Wing *</label>
                  <select
                    value={gazetteFormData.studentClass}
                    onChange={(e) => setGazetteFormData({ ...gazetteFormData, studentClass: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                  >
                    <option value="Class 10">Class 10</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Classes 6th to 8th">Classes 6th to 8th</option>
                    <option value="All Classes (6th to 10th)">All Classes (6th to 10th)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Total Candidates</label>
                  <input
                    type="number"
                    value={gazetteFormData.totalStudents}
                    onChange={(e) => setGazetteFormData({ ...gazetteFormData, totalStudents: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Passed Candidates</label>
                  <input
                    type="number"
                    value={gazetteFormData.passedStudents}
                    onChange={(e) => setGazetteFormData({ ...gazetteFormData, passedStudents: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Pass %</label>
                  <input
                    type="text"
                    value={gazetteFormData.passPercentage}
                    onChange={(e) => setGazetteFormData({ ...gazetteFormData, passPercentage: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">PDF File Name & Size</label>
                <input
                  type="text"
                  value={gazetteFormData.fileName}
                  onChange={(e) => setGazetteFormData({ ...gazetteFormData, fileName: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Official Description</label>
                <textarea
                  rows={2}
                  value={gazetteFormData.description}
                  onChange={(e) => setGazetteFormData({ ...gazetteFormData, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-amber-700"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadGazetteModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-900 hover:bg-amber-800 text-white font-bold rounded-lg shadow-xs flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Attach Gazette Sheet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
