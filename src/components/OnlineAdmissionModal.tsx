import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  CheckCircle2, 
  Printer, 
  Phone, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Search, 
  Send, 
  Building2, 
  ShieldCheck, 
  HelpCircle,
  Mail,
  Copy,
  ExternalLink,
  MessageCircle,
  Check
} from 'lucide-react';
import { AdmissionApplication } from '../data/resultsAndAdmissionsData';
import { INITIAL_SCHOOL_INFO } from '../data/schoolData';
import { 
  SCHOOL_RECEIVER_EMAIL, 
  SECONDARY_RECEIVER_EMAIL, 
  OFFICE_CLERK_PHONE,
  formatAdmissionEmailText,
  generateGmailWebLink,
  generateMailtoLink,
  generateWhatsAppLink
} from '../utils/admissionMailSender';

interface OnlineAdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: AdmissionApplication[];
  onAddApplication: (application: AdmissionApplication) => void;
}

export const OnlineAdmissionModal: React.FC<OnlineAdmissionModalProps> = ({
  isOpen,
  onClose,
  applications,
  onAddApplication
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'track'>('form');
  const [formSubmitted, setFormSubmitted] = useState<AdmissionApplication | null>(null);
  const [copiedAppId, setCopiedAppId] = useState<string | null>(null);

  // Search/Tracker state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedApplication, setSearchedApplication] = useState<AdmissionApplication | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Form input state
  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    dob: '',
    aadhaarNo: '',
    applyingForClass: 'Class 6' as AdmissionApplication['applyingForClass'],
    academicSession: '2026–27',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    whatsappPhone: '',
    category: 'General' as AdmissionApplication['category'],
    isCWSN: false,
    cwsnDetails: '',
    bloodGroup: 'B+',
    address: 'Chowgam, Zone Shangus',
    village: 'Chowgam',
    zone: 'Shangus',
    district: 'Anantnag',
    pinCode: '192201',
    previousSchool: '',
    previousClassPassed: 'Class 5',
    previousPercentage: '',
    documentsSubmitted: [
      'Date of Birth Certificate',
      'Previous Class Marks Card',
      'Aadhaar Card Copy',
      'Passport Photographs'
    ]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.fatherName || !formData.guardianPhone) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppNo = `CHOWGAM-ADM-2026-${randomNum}`;

    const newApplication: AdmissionApplication = {
      id: `adm-${Date.now()}`,
      applicationNo: newAppNo,
      submissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      studentName: formData.studentName,
      gender: formData.gender,
      dob: formData.dob || '2014-03-15',
      aadhaarNo: formData.aadhaarNo || '4829-XXXX-XXXX',
      applyingForClass: formData.applyingForClass,
      academicSession: formData.academicSession,
      fatherName: formData.fatherName,
      motherName: formData.motherName,
      guardianPhone: formData.guardianPhone,
      whatsappPhone: formData.whatsappPhone || formData.guardianPhone,
      category: formData.category,
      isCWSN: formData.isCWSN,
      cwsnDetails: formData.cwsnDetails,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      village: formData.village,
      zone: formData.zone,
      district: formData.district,
      pinCode: formData.pinCode,
      previousSchool: formData.previousSchool || 'Local Feeder Primary / Middle School',
      previousClassPassed: formData.previousClassPassed,
      previousPercentage: formData.previousPercentage || 'N/A',
      documentsSubmitted: formData.documentsSubmitted,
      status: 'Submitted',
      verifiedBy: 'Office Clerk Mr. Altaf Ahmad (Teacher, Phone: 7889635278)',
      officeRemarks: 'Application submitted online. Original document verification scheduled at School Office Desk.'
    };

    onAddApplication(newApplication);
    setFormSubmitted(newApplication);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const found = applications.find(
      app => app.applicationNo.toLowerCase() === searchQuery.trim().toLowerCase() ||
             app.guardianPhone.includes(searchQuery.trim()) ||
             app.studentName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
    setSearchedApplication(found || null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 border border-stone-300 shadow-2xl relative my-6 print:p-0 print:border-none print:shadow-none print:m-0">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
                PM SHRI GHS Chowgam · Zone Shangus
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                Online Admission Portal (Session 2026–27)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Office Clerk & School Gmail Receiver Notice */}
        <div className="mb-6 p-4 bg-emerald-950 text-white rounded-xl border border-emerald-900 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                Admission Assistance & Office Desk
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-800 text-emerald-100 border border-emerald-700">
                <Mail className="w-3 h-3 text-amber-300" />
                Receiver: {SCHOOL_RECEIVER_EMAIL}
              </span>
            </div>
            <div className="text-stone-200 mt-1">
              Managed by <strong className="text-white">Mr. Altaf Ahmad (Mohd Altaf)</strong> (Teacher & Office Clerk / In-charge) · All submissions forwarded to school inbox.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={`mailto:${SCHOOL_RECEIVER_EMAIL}?subject=Online%20Admission%20Inquiry%20PM%20SHRI%20GHS%20Chowgam`}
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-stone-100 font-semibold rounded-lg flex items-center gap-1.5 border border-emerald-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>{SCHOOL_RECEIVER_EMAIL}</span>
            </a>
            <a
              href="tel:7889635278"
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-stone-900" />
              <span>Clerk: 7889635278</span>
            </a>
          </div>
        </div>

        {/* Tab Switcher: Form vs. Tracker (Hidden on Print) */}
        {!formSubmitted && (
          <div className="flex items-center gap-3 border-b border-stone-200 pb-3 mb-6 text-xs font-bold print:hidden">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'form'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              New Admission Form (Classes 6th to 10th)
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'track'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              Track Application Status ({applications.length})
            </button>
          </div>
        )}

        {/* TAB 1: Online Admission Form */}
        {activeTab === 'form' && !formSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Step 1: Student Particulars */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1 text-emerald-900">
                1. Student Particulars
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate's official name"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Applying for Class *</label>
                  <select
                    value={formData.applyingForClass}
                    onChange={(e) => setFormData({ ...formData, applyingForClass: e.target.value as AdmissionApplication['applyingForClass'] })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Class 6">Class 6 (Fresh Entry / Feeder Middle School)</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9 (Secondary High School Wing)</option>
                    <option value="Class 10">Class 10 (Secondary High School Wing)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' | 'Other' })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Date of Birth (As per DOB certificate) *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Social Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as AdmissionApplication['category'] })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  >
                    <option value="General">General</option>
                    <option value="RBA">RBA (Resident of Backward Area)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="OBC">OBC / OSC</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Aadhaar Card Number (12 Digits)</label>
                  <input
                    type="text"
                    placeholder="XXXX-XXXX-XXXX"
                    value={formData.aadhaarNo}
                    onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="cwsn"
                    checked={formData.isCWSN}
                    onChange={(e) => setFormData({ ...formData, isCWSN: e.target.checked })}
                    className="w-4 h-4 text-emerald-800 rounded"
                  />
                  <label htmlFor="cwsn" className="text-stone-700 font-semibold cursor-pointer">
                    Child With Special Needs (CWSN / Barrier-Free Assistance Required)
                  </label>
                </div>
              </div>
            </div>

            {/* Step 2: Parent / Guardian Particulars */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1 text-emerald-900">
                2. Parent / Guardian Particulars
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Father's Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Father's name"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mother's Full Name</label>
                  <input
                    type="text"
                    placeholder="Mother's name"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mobile Contact Number (For SMS / Call) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="Optional WhatsApp number"
                    value={formData.whatsappPhone}
                    onChange={(e) => setFormData({ ...formData, whatsappPhone: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Permanent Address (Village / Locality)</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Village, Mohalla, Post Office"
                  className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            {/* Step 3: Academic History */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="font-bold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1 text-emerald-900">
                3. Previous Academic Records
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Previous School Attended</label>
                  <input
                    type="text"
                    placeholder="e.g. Govt Middle School Chowgam"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Previous Class Passed</label>
                  <input
                    type="text"
                    value={formData.previousClassPassed}
                    onChange={(e) => setFormData({ ...formData, previousClassPassed: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Percentage / Grade Obtained</label>
                  <input
                    type="text"
                    placeholder="e.g. 85%"
                    value={formData.previousPercentage}
                    onChange={(e) => setFormData({ ...formData, previousPercentage: e.target.value })}
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>
            </div>

            {/* Government Mandated Zero-Fee & RTE Assurance */}
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950 text-xs">
              <strong>Free Public Education Notice:</strong> As per Government of Jammu & Kashmir policy, admissions to PM SHRI Govt High School Chowgam entail free textbooks, zero tuition fee, free uniforms under Samagra Shiksha, and mid-day nourishment for eligible elementary grades.
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-md flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Online Admission Form</span>
              </button>
            </div>
          </form>
        )}

        {/* SUBMITTED SUCCESS & PRINTABLE ACKNOWLEDGMENT SLIP */}
        {formSubmitted && (
          <div className="space-y-6">
            <div className="p-5 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-center space-y-4 print:hidden shadow-md">
              <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-emerald-950">
                  Application Successfully Registered!
                </h3>
                <p className="text-xs text-emerald-800 mt-1">
                  Application Ref No: <strong className="font-mono text-sm bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-950">{formSubmitted.applicationNo}</strong>
                </p>
              </div>

              {/* School Gmail Receiver Connect Card */}
              <div className="p-4 bg-white rounded-xl border border-emerald-200 text-left space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-emerald-800" />
                    <span className="font-bold text-stone-900 text-xs">School Gmail Receiver:</span>
                    <code className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {SCHOOL_RECEIVER_EMAIL}
                    </code>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    CC: {SECONDARY_RECEIVER_EMAIL}
                  </span>
                </div>
                
                <p className="text-xs text-stone-600">
                  Connect and dispatch this full admission dossier directly to the official PM SHRI GHS Chowgam Gmail receiver with 1 click:
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={generateGmailWebLink(formSubmitted)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-300" />
                    <span>Send to School Gmail (Web)</span>
                    <ExternalLink className="w-3 h-3 text-emerald-300" />
                  </a>

                  <a
                    href={generateMailtoLink(formSubmitted)}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-xs flex items-center gap-2 border border-stone-300 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-stone-600" />
                    <span>Open in Mail App</span>
                  </a>

                  <a
                    href={generateWhatsAppLink(formSubmitted)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg text-xs flex items-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                    <span>WhatsApp Clerk (7889635278)</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(formatAdmissionEmailText(formSubmitted));
                      setCopiedAppId(formSubmitted.id);
                      setTimeout(() => setCopiedAppId(null), 3000);
                    }}
                    className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {copiedAppId === formSubmitted.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold text-emerald-700">Dossier Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-800" />
                        <span>Copy Admission Dossier</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Print Official Acknowledgment Slip</span>
                </button>
                <button
                  onClick={() => setFormSubmitted(null)}
                  className="px-4 py-2 bg-stone-200 text-stone-800 font-semibold rounded-lg text-xs hover:bg-stone-300 transition-colors"
                >
                  Submit Another Admission
                </button>
              </div>
            </div>

            {/* Official Printable Slip Layout */}
            <div className="border-2 border-stone-800 p-6 rounded-xl bg-white space-y-4">
              <div className="text-center pb-4 border-b-2 border-stone-800">
                <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-900 font-bold">
                  School Education Department · UT of Jammu & Kashmir
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-1">
                  PM SHRI GOVT HIGH SCHOOL CHOWGAM
                </h2>
                <div className="text-xs text-stone-600">
                  Zone: Shangus · District: Anantnag (PIN: 192201) · Official Gmail: {SCHOOL_RECEIVER_EMAIL}
                </div>
                <div className="inline-block mt-2 px-3 py-1 bg-stone-900 text-white text-xs font-bold rounded">
                  ONLINE ADMISSION ACKNOWLEDGMENT SLIP · SESSION {formSubmitted.academicSession}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs py-2 border-b border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Application Reference</span>
                  <span className="font-mono font-bold text-stone-900 text-sm">{formSubmitted.applicationNo}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Date of Submission</span>
                  <span className="font-bold text-stone-800">{formSubmitted.submissionDate}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Student Name</span>
                  <span className="font-bold text-stone-900 text-sm">{formSubmitted.studentName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Admitted Class</span>
                  <span className="font-bold text-emerald-900">{formSubmitted.applyingForClass}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Father's Name</span>
                  <span className="font-semibold text-stone-800">{formSubmitted.fatherName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Registered Mobile</span>
                  <span className="font-mono font-bold text-stone-800">{formSubmitted.guardianPhone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Village / Zone</span>
                  <span className="font-semibold text-stone-700">{formSubmitted.village}, Zone {formSubmitted.zone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Category / Status</span>
                  <span className="font-semibold text-stone-700">{formSubmitted.category} · {formSubmitted.status}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">School Gmail Receiver</span>
                  <span className="font-mono font-bold text-emerald-950 text-xs">{SCHOOL_RECEIVER_EMAIL}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-mono">Office Clerk In-charge</span>
                  <span className="font-bold text-stone-800">Mr. Altaf Ahmad (Ph: {OFFICE_CLERK_PHONE})</span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
                <strong className="text-stone-900 block">Instructions for Parent / Guardian:</strong>
                <p>1. Please bring original Date of Birth Certificate, Aadhaar Card, Previous Class Marks Certificate, and two passport-sized photographs to the school office for physical verification.</p>
                <p>2. Verification Desk: Contact <strong>Mr. Altaf Ahmad (Mohd Altaf)</strong>, Teacher & Office Clerk / In-charge, Phone: <strong className="text-emerald-900 font-mono">7889635278</strong>.</p>
                <p>3. Office Timings: Monday to Saturday, 10:00 AM – 04:00 PM.</p>
              </div>

              <div className="pt-8 border-t border-stone-300 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="font-bold text-stone-900">Mr. Altaf Ahmad (Mohd Altaf)</div>
                  <div className="text-stone-500 text-[11px]">Teacher & Office Clerk / In-charge</div>
                  <div className="text-[10px] font-mono text-emerald-900 mt-0.5">Phone: 7889635278</div>
                </div>
                <div>
                  <div className="font-bold text-stone-900">Mr. Shareef Ahmad Khan</div>
                  <div className="text-stone-500 text-[11px]">Headmaster / Head of Institution (HOI)</div>
                  <div className="text-[10px] font-mono text-stone-500 mt-0.5">PM SHRI GHS Chowgam · 7889725799</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Track Application Status */}
        {activeTab === 'track' && !formSubmitted && (
          <div className="space-y-6 text-xs">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Enter Application Ref No (e.g. CHOWGAM-ADM-2026-1042) or Guardian Phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-stone-900 focus:outline-none focus:border-emerald-700"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-xs"
              >
                Track Status
              </button>
            </form>

            {searchedApplication && (
              <div className="p-5 bg-white rounded-xl border border-stone-300 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">Application Reference</span>
                    <h3 className="text-base font-bold text-stone-900">{searchedApplication.applicationNo}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded font-bold uppercase tracking-wider text-xs ${
                    searchedApplication.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : searchedApplication.status === 'Verified'
                      ? 'bg-blue-100 text-blue-950 border border-blue-300'
                      : 'bg-amber-100 text-amber-950 border border-amber-300'
                  }`}>
                    {searchedApplication.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Student Name</span>
                    <span className="font-bold text-stone-900">{searchedApplication.studentName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Applying For</span>
                    <span className="font-bold text-emerald-900">{searchedApplication.applyingForClass}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Submission Date</span>
                    <span className="font-semibold text-stone-800">{searchedApplication.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Father's Name</span>
                    <span className="font-semibold text-stone-800">{searchedApplication.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Guardian Phone</span>
                    <span className="font-mono text-stone-800">{searchedApplication.guardianPhone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Verified By</span>
                    <span className="font-medium text-stone-700">{searchedApplication.verifiedBy || 'Office Clerk Desk'}</span>
                  </div>
                </div>

                {searchedApplication.officeRemarks && (
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <strong className="text-stone-800">Office Notes: </strong>
                    <span className="text-stone-600">{searchedApplication.officeRemarks}</span>
                  </div>
                )}

                {/* Quick Dispatch Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-stone-200">
                  <a
                    href={generateGmailWebLink(searchedApplication)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-300" />
                    <span>Forward to School Gmail ({SCHOOL_RECEIVER_EMAIL})</span>
                    <ExternalLink className="w-3 h-3 text-emerald-300" />
                  </a>

                  <a
                    href={generateWhatsAppLink(searchedApplication)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Clerk</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setFormSubmitted(searchedApplication)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-stone-600" />
                    <span>View & Print Slip</span>
                  </button>
                </div>
              </div>
            )}

            {searchAttempted && !searchedApplication && (
              <div className="p-8 bg-stone-50 rounded-xl border border-stone-200 text-center">
                <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <h4 className="font-bold text-stone-800 text-sm">No Application Found</h4>
                <p className="text-stone-500 text-xs mt-1">
                  No registered record matched "{searchQuery}". Please check your application reference or contact Office Clerk Mr. Altaf Ahmad at <strong>7889635278</strong>.
                </p>
              </div>
            )}

            {/* List of recent submissions */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-bold text-stone-800">Recent School Applications Register:</div>
                <div className="text-[11px] text-emerald-900 font-semibold flex items-center gap-1">
                  <Mail className="w-3 h-3 text-emerald-700" />
                  <span>Receiver: {SCHOOL_RECEIVER_EMAIL}</span>
                </div>
              </div>

              <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                {applications.map((app) => (
                  <div key={app.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50 transition-colors">
                    <div>
                      <div className="font-bold text-stone-900 flex items-center gap-2">
                        <span>{app.studentName}</span>
                        <span className="text-emerald-900 font-semibold text-[11px]">({app.applyingForClass})</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-100 text-stone-800 border border-stone-200">
                          {app.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                        Ref: {app.applicationNo} · Submitted: {app.submissionDate} · Parent: {app.fatherName} ({app.guardianPhone})
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={generateGmailWebLink(app)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Forward ${app.studentName}'s admission to ${SCHOOL_RECEIVER_EMAIL}`}
                        className="px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Mail className="w-3 h-3 text-amber-300" />
                        <span>Send to Gmail</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setFormSubmitted(app)}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors border border-stone-200"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Slip</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
