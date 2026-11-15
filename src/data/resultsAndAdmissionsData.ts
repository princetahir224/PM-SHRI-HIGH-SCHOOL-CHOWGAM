export interface SubjectScore {
  subject: string;
  maxMarks: number;
  marksObtained: number;
  grade: string;
}

export interface StudentResult {
  id: string;
  rollNo: string;
  regNo?: string;
  studentName: string;
  parentName?: string;
  meritPosition?: string;
  studentClass: 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
  academicYear: string;
  examTerm: 'Annual Examination' | 'Term 1 (T1)' | 'Term 2 (T2)' | 'Unit Assessment' | 'Golden Test (Board Prep)';
  datePublished: string;
  subjects: SubjectScore[];
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  overallGrade: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'D' | 'E';
  status: 'PASS' | 'PROMOTED' | 'NEEDS IMPROVEMENT';
  remarks: string;
  inchargeTeacher: string;
}

export interface AdmissionApplication {
  id: string;
  applicationNo: string;
  submissionDate: string;
  studentName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  aadhaarNo: string;
  applyingForClass: 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
  academicSession: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  whatsappPhone?: string;
  email?: string;
  category: 'General' | 'RBA' | 'ST' | 'SC' | 'OBC' | 'EWS';
  isCWSN: boolean;
  cwsnDetails?: string;
  bloodGroup?: string;
  address: string;
  village: string;
  zone: string;
  district: string;
  pinCode: string;
  previousSchool: string;
  previousClassPassed: string;
  previousPercentage?: string;
  documentsSubmitted: string[];
  status: 'Submitted' | 'Verified' | 'Approved' | 'Provisional';
  verifiedBy?: string;
  officeRemarks?: string;
}

export const INITIAL_RESULTS: StudentResult[] = [
  {
    id: "topper-801",
    rollNo: "801",
    regNo: "JK-GHS-CHW-08-TOP-01",
    studentName: "Saima Rashid",
    meritPosition: "Class 8th Topper",
    studentClass: "Class 8",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 94, grade: "A1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 96, grade: "A1" },
      { subject: "General Science", maxMarks: 100, marksObtained: 95, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 92, grade: "A1" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 93, grade: "A1" }
    ],
    totalMarks: 470,
    maxMarks: 500,
    percentage: 94.0,
    overallGrade: "A1",
    status: "PROMOTED",
    remarks: "Class 8th Topper — Outstanding academic distinction across Mathematics, Science, and Languages.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge) & Mr. Shareef Ahmad Khan (HOI)"
  },
  {
    id: "topper-802",
    rollNo: "802",
    regNo: "JK-GHS-CHW-08-TOP-02",
    studentName: "Danish Ahmad Khan",
    meritPosition: "Class 8th Topper",
    studentClass: "Class 8",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 91, grade: "A1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 95, grade: "A1" },
      { subject: "General Science", maxMarks: 100, marksObtained: 93, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 90, grade: "A1" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 91, grade: "A1" }
    ],
    totalMarks: 460,
    maxMarks: 500,
    percentage: 92.0,
    overallGrade: "A1",
    status: "PROMOTED",
    remarks: "Class 8th Topper — Exemplary conceptual problem-solving in Mathematics and Science Lab activities.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge) & Mr. Shareef Ahmad Khan (HOI)"
  },
  {
    id: "topper-701",
    rollNo: "701",
    regNo: "JK-GHS-CHW-07-TOP-01",
    studentName: "Rutba",
    meritPosition: "Class 7th Topper",
    studentClass: "Class 7",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 93, grade: "A1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 94, grade: "A1" },
      { subject: "General Science", maxMarks: 100, marksObtained: 95, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 91, grade: "A1" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 92, grade: "A1" }
    ],
    totalMarks: 465,
    maxMarks: 500,
    percentage: 93.0,
    overallGrade: "A1",
    status: "PROMOTED",
    remarks: "Class 7th Topper — Consistent merit holder with excellence in Science and creative writing.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  },
  {
    id: "topper-702",
    rollNo: "702",
    regNo: "JK-GHS-CHW-07-TOP-02",
    studentName: "Arbeena",
    meritPosition: "Class 7th Topper",
    studentClass: "Class 7",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 92, grade: "A1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 91, grade: "A1" },
      { subject: "General Science", maxMarks: 100, marksObtained: 92, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 90, grade: "A1" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 93, grade: "A1" }
    ],
    totalMarks: 458,
    maxMarks: 500,
    percentage: 91.6,
    overallGrade: "A1",
    status: "PROMOTED",
    remarks: "Class 7th Topper — Commendable all-round performance across languages, science, and classroom participation.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  },
  {
    id: "topper-601",
    rollNo: "601",
    regNo: "JK-GHS-CHW-06-TOP-01",
    studentName: "Uzma",
    meritPosition: "Class 6th Topper",
    studentClass: "Class 6",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 94, grade: "A1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 95, grade: "A1" },
      { subject: "General Science", maxMarks: 100, marksObtained: 93, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 91, grade: "A1" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 94, grade: "A1" }
    ],
    totalMarks: 467,
    maxMarks: 500,
    percentage: 93.4,
    overallGrade: "A1",
    status: "PROMOTED",
    remarks: "Class 6th Topper — First-rank achiever demonstrating strong foundational numeracy and reading fluency.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  },
  {
    id: "topper-602",
    rollNo: "602",
    regNo: "JK-GHS-CHW-06-TOP-02",
    studentName: "Sana Jan",
    meritPosition: "Class 6th Topper",
    studentClass: "Class 6",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 92, grade: "A1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 91, grade: "A1" },
      { subject: "General Science", maxMarks: 100, marksObtained: 92, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 90, grade: "A1" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 93, grade: "A1" }
    ],
    totalMarks: 458,
    maxMarks: 500,
    percentage: 91.6,
    overallGrade: "A1",
    status: "PROMOTED",
    remarks: "Class 6th Topper — Meritorious achievement across core NCERT/JKBOSE subjects and morning assembly activities.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  }
];

export const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: "adm-101",
    applicationNo: "CHOWGAM-ADM-2026-1042",
    submissionDate: "October 22, 2026",
    studentName: "Sample Online Applicant (Demo Entry)",
    gender: "Male",
    dob: "2012-05-14",
    aadhaarNo: "XXXX-XXXX-3847",
    applyingForClass: "Class 9",
    academicSession: "2026–27",
    fatherName: "Guardian Name",
    motherName: "Mother Name",
    guardianPhone: "7889635278",
    whatsappPhone: "7889635278",
    category: "General",
    isCWSN: false,
    bloodGroup: "O+",
    address: "Village Chowgam, Zone Shangus",
    village: "Chowgam",
    zone: "Shangus",
    district: "Anantnag",
    pinCode: "192201",
    previousSchool: "Feeder Middle School Chowgam",
    previousClassPassed: "Class 8",
    previousPercentage: "85.0%",
    documentsSubmitted: ["Date of Birth Certificate", "Previous Class Marks Card", "Aadhaar Card Copy", "Passport Photographs"],
    status: "Approved",
    verifiedBy: "Office Clerk Mr. Altaf Ahmad (Teacher)",
    officeRemarks: "Free government admission under RTE norms. Contact Office Clerk at 7889635278 for physical verification."
  }
];

export interface GazetteStudentRecord {
  rollNo: string;
  studentName: string;
  fatherName: string;
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  grade: string;
  result: 'PASS' | 'PROMOTED' | 'RE-APPEAR';
}

export interface PdfResultGazette {
  id: string;
  session: string;
  studentClass: string;
  title: string;
  examName: string;
  datePublished: string;
  fileSize: string;
  fileName: string;
  totalStudents: number;
  passedStudents: number;
  passPercentage: string;
  signedBy: string;
  verifiedBy: string;
  verificationCode: string;
  description: string;
  records: GazetteStudentRecord[];
}

export const INITIAL_PDF_GAZETTES: PdfResultGazette[] = [
  {
    id: "gaz-2024-25-10",
    session: "Session 2024–25",
    studentClass: "Class 10",
    title: "Class 10th JKBOSE Annual Regular Board Gazette & Broad-Sheet",
    examName: "JKBOSE Secondary School Examination (Class 10th) Annual Regular 2025",
    datePublished: "May 24, 2025",
    fileSize: "2.4 MB (Official Signed PDF Gazette)",
    fileName: "GHS_Chowgam_Class10_AnnualRegular_Gazette_2024-25.pdf",
    totalStudents: 32,
    passedStudents: 31,
    passPercentage: "96.87%",
    signedBy: "Mr. Shareef Ahmad Khan (Headmaster / HOI)",
    verifiedBy: "Mr. Tahir Ahmad Kumar (Examination In-charge, Phone: 8803497224)",
    verificationCode: "JKBOSE-GHS-CHW-10-2025-PUB",
    description: "Official broad-sheet summary certified for Class 10th board examinees of Govt High School Chowgam, Zone Shangus. Complete individual candidate registers are archived at the Examination Cell.",
    records: []
  },
  {
    id: "gaz-2024-25-9",
    session: "Session 2024–25",
    studentClass: "Class 9",
    title: "Class 9th Annual Institutional Promotion Gazette & Summary",
    examName: "Class 9th Annual Institutional Evaluation Session 2024–25",
    datePublished: "March 28, 2025",
    fileSize: "1.8 MB (Official Signed PDF Gazette)",
    fileName: "GHS_Chowgam_Class9_Annual_Evaluation_2024-25.pdf",
    totalStudents: 36,
    passedStudents: 35,
    passPercentage: "97.22%",
    signedBy: "Mr. Shareef Ahmad Khan (Headmaster / HOI)",
    verifiedBy: "Mr. Tahir Ahmad Kumar (Examination In-charge, Phone: 8803497224)",
    verificationCode: "ZEO-SHG-GHS-CHW-09-2025-EVAL",
    description: "Annual promotional gazette summary for Class 9th students transitioning to the Class 10th secondary academic wing.",
    records: []
  },
  {
    id: "gaz-2023-24-10",
    session: "Session 2023–24",
    studentClass: "Class 10",
    title: "Class 10th JKBOSE Annual Regular Result Sheet Summary",
    examName: "JKBOSE Secondary School Examination (Class 10th) Annual Regular 2024",
    datePublished: "June 12, 2024",
    fileSize: "2.1 MB (Official Signed PDF Gazette)",
    fileName: "GHS_Chowgam_Class10_AnnualRegular_Gazette_2023-24.pdf",
    totalStudents: 29,
    passedStudents: 28,
    passPercentage: "96.55%",
    signedBy: "Mr. Shareef Ahmad Khan (Headmaster / HOI)",
    verifiedBy: "Mr. Tahir Ahmad Kumar (Examination In-charge, Phone: 8803497224)",
    verificationCode: "JKBOSE-GHS-CHW-10-2024-PUB",
    description: "Official JKBOSE gazette summary for academic session 2023–24. Individual candidate records are preserved in the school office register.",
    records: []
  },
  {
    id: "gaz-2023-24-mid",
    session: "Session 2023–24",
    studentClass: "Classes 6th to 8th",
    title: "Classes 6th to 8th Consolidated Middle Wing Annual Gazette",
    examName: "Zone Shangus Uniform Middle Standard Evaluation Session 2023–24",
    datePublished: "March 20, 2024",
    fileSize: "3.1 MB (Official Signed PDF Gazette)",
    fileName: "GHS_Chowgam_MiddleWing_Classes6_to_8_Gazette_2023-24.pdf",
    totalStudents: 74,
    passedStudents: 74,
    passPercentage: "100.00%",
    signedBy: "Mr. Shareef Ahmad Khan (Headmaster / HOI)",
    verifiedBy: "Mr. Tahir Ahmad Kumar (Examination In-charge, Phone: 8803497224)",
    verificationCode: "DIET-ANT-SHG-MID-2024",
    description: "Combined Middle Standard annual gazette sheet for Classes 6th, 7th, and 8th under ZEO Shangus jurisdiction achieving 100% promotion.",
    records: []
  },
  {
    id: "gaz-2022-23-all",
    session: "Session 2022–23",
    studentClass: "All Classes (6th to 10th)",
    title: "Session 2022–23 Archive School Gazette & Tabulation Summary",
    examName: "School Annual General Evaluation & JKBOSE Class 10 Session 2022–23",
    datePublished: "April 15, 2023",
    fileSize: "4.2 MB (Official Signed PDF Gazette)",
    fileName: "GHS_Chowgam_AllClasses_Archive_Gazette_2022-23.pdf",
    totalStudents: 118,
    passedStudents: 115,
    passPercentage: "97.45%",
    signedBy: "Mr. Shareef Ahmad Khan (Headmaster / HOI)",
    verifiedBy: "Mr. Tahir Ahmad Kumar (Examination In-charge, Phone: 8803497224)",
    verificationCode: "ZEO-SHG-GHS-CHW-ARCH-2023",
    description: "Historical institutional archive containing aggregate statistics across all five classes (6th, 7th, 8th, 9th, and 10th) for Session 2022–23.",
    records: []
  }
];

export function calculateGrade(percentage: number): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'D' | 'E' {
  if (percentage >= 91) return 'A1';
  if (percentage >= 81) return 'A2';
  if (percentage >= 71) return 'B1';
  if (percentage >= 61) return 'B2';
  if (percentage >= 51) return 'C1';
  if (percentage >= 41) return 'C2';
  if (percentage >= 33) return 'D';
  return 'E';
}
