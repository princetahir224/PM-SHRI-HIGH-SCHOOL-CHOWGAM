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
  parentName: string;
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
    id: "res-1001",
    rollNo: "1001",
    regNo: "JK-GHS-CHW-10-2026-01",
    studentName: "Danish Ahmad Dar",
    parentName: "Bashir Ahmad Dar",
    studentClass: "Class 10",
    academicYear: "2025–26",
    examTerm: "Golden Test (Board Prep)",
    datePublished: "October 18, 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 88, grade: "A2" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 94, grade: "A1" },
      { subject: "Science & Technology", maxMarks: 100, marksObtained: 91, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 85, grade: "A2" },
      { subject: "Urdu / Regional Language", maxMarks: 100, marksObtained: 87, grade: "A2" }
    ],
    totalMarks: 445,
    maxMarks: 500,
    percentage: 89.0,
    overallGrade: "A1",
    status: "PASS",
    remarks: "Outstanding conceptual clarity in Mathematics and Science laboratory practicals. High potential for JKBOSE board excellence.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge) & Mr. Shareef Ahmad Khan (HOI)"
  },
  {
    id: "res-1002",
    rollNo: "1002",
    regNo: "JK-GHS-CHW-10-2026-02",
    studentName: "Iqra Jan",
    parentName: "Ghulam Nabi Rather",
    studentClass: "Class 10",
    academicYear: "2025–26",
    examTerm: "Golden Test (Board Prep)",
    datePublished: "October 18, 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 92, grade: "A1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 86, grade: "A2" },
      { subject: "Science & Technology", maxMarks: 100, marksObtained: 89, grade: "A2" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 90, grade: "A1" },
      { subject: "Urdu / Regional Language", maxMarks: 100, marksObtained: 91, grade: "A1" }
    ],
    totalMarks: 448,
    maxMarks: 500,
    percentage: 89.6,
    overallGrade: "A1",
    status: "PASS",
    remarks: "Exceptional language command, neat analytical presentations, and consistent academic leadership.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge) & Mr. Shareef Ahmad Khan (HOI)"
  },
  {
    id: "res-901",
    rollNo: "901",
    regNo: "JK-GHS-CHW-09-2026-01",
    studentName: "Sahil Ahmad Lone",
    parentName: "Mohammad Ashraf Lone",
    studentClass: "Class 9",
    academicYear: "2025–26",
    examTerm: "Term 2 (T2)",
    datePublished: "October 15, 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 82, grade: "A2" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 88, grade: "A2" },
      { subject: "Science & Technology", maxMarks: 100, marksObtained: 84, grade: "A2" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 80, grade: "B1" },
      { subject: "Urdu / Regional Language", maxMarks: 100, marksObtained: 86, grade: "A2" }
    ],
    totalMarks: 420,
    maxMarks: 500,
    percentage: 84.0,
    overallGrade: "A2",
    status: "PASS",
    remarks: "Active participant in Smart Classroom ICT modules and composite science laboratory sessions.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  },
  {
    id: "res-902",
    rollNo: "902",
    regNo: "JK-GHS-CHW-09-2026-02",
    studentName: "Mehak Farooq",
    parentName: "Farooq Ahmad Khan",
    studentClass: "Class 9",
    academicYear: "2025–26",
    examTerm: "Term 2 (T2)",
    datePublished: "October 15, 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 89, grade: "A2" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 91, grade: "A1" },
      { subject: "Science & Technology", maxMarks: 100, marksObtained: 90, grade: "A1" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 87, grade: "A2" },
      { subject: "Urdu / Regional Language", maxMarks: 100, marksObtained: 88, grade: "A2" }
    ],
    totalMarks: 445,
    maxMarks: 500,
    percentage: 89.0,
    overallGrade: "A1",
    status: "PASS",
    remarks: "Exemplary performance across STEM disciplines and regular attendance.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  },
  {
    id: "res-801",
    rollNo: "801",
    regNo: "JK-GHS-CHW-08-2026-01",
    studentName: "Aasif Gulzar",
    parentName: "Gulzar Ahmad Bhat",
    studentClass: "Class 8",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 10, 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 79, grade: "B1" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 85, grade: "A2" },
      { subject: "General Science", maxMarks: 100, marksObtained: 82, grade: "A2" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 78, grade: "B1" },
      { subject: "Urdu / Regional Language", maxMarks: 100, marksObtained: 80, grade: "B1" }
    ],
    totalMarks: 404,
    maxMarks: 500,
    percentage: 80.8,
    overallGrade: "A2",
    status: "PROMOTED",
    remarks: "Successfully promoted to Class 9. Recommended for advanced mathematics problem solving circles.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  },
  {
    id: "res-701",
    rollNo: "701",
    regNo: "JK-GHS-CHW-07-2026-01",
    studentName: "Muzamil Shafi",
    parentName: "Mohd Shafi Wani",
    studentClass: "Class 7",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 10, 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 83, grade: "A2" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 80, grade: "B1" },
      { subject: "General Science", maxMarks: 100, marksObtained: 85, grade: "A2" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 81, grade: "A2" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 84, grade: "A2" }
    ],
    totalMarks: 413,
    maxMarks: 500,
    percentage: 82.6,
    overallGrade: "A2",
    status: "PROMOTED",
    remarks: "Promoted to Class 8 with commendable grades in science and environment projects.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  },
  {
    id: "res-601",
    rollNo: "601",
    regNo: "JK-GHS-CHW-06-2026-01",
    studentName: "Zahid Manzoor",
    parentName: "Manzoor Ahmad Shah",
    studentClass: "Class 6",
    academicYear: "2025–26",
    examTerm: "Annual Examination",
    datePublished: "October 10, 2026",
    subjects: [
      { subject: "General English", maxMarks: 100, marksObtained: 86, grade: "A2" },
      { subject: "Mathematics", maxMarks: 100, marksObtained: 89, grade: "A2" },
      { subject: "General Science", maxMarks: 100, marksObtained: 87, grade: "A2" },
      { subject: "Social Science", maxMarks: 100, marksObtained: 84, grade: "A2" },
      { subject: "Urdu / Kashmiri", maxMarks: 100, marksObtained: 88, grade: "A2" }
    ],
    totalMarks: 434,
    maxMarks: 500,
    percentage: 86.8,
    overallGrade: "A1",
    status: "PROMOTED",
    remarks: "First-year high school student excelling in foundational learning and library reading.",
    inchargeTeacher: "Mr. Tahir Ahmad Kumar (Examination In-charge)"
  }
];

export const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: "adm-101",
    applicationNo: "CHOWGAM-ADM-2026-1042",
    submissionDate: "October 22, 2026",
    studentName: "Adil Hussain Malik",
    gender: "Male",
    dob: "2012-05-14",
    aadhaarNo: "4829-1092-3847",
    applyingForClass: "Class 9",
    academicSession: "2026–27",
    fatherName: "Mohammad Hussain Malik",
    motherName: "Rubeena Bano",
    guardianPhone: "9858123456",
    whatsappPhone: "9858123456",
    category: "General",
    isCWSN: false,
    bloodGroup: "O+",
    address: "Malik Mohalla, Village Chowgam",
    village: "Chowgam",
    zone: "Shangus",
    district: "Anantnag",
    pinCode: "192201",
    previousSchool: "Govt Middle School Chowgam",
    previousClassPassed: "Class 8",
    previousPercentage: "84.5%",
    documentsSubmitted: ["Date of Birth Certificate", "Previous Class Marks Card", "Aadhaar Card Copy", "Passport Photographs"],
    status: "Approved",
    verifiedBy: "Office Clerk Mr. Altaf Ahmad (Teacher)",
    officeRemarks: "All originals verified. Free government admission confirmed under RTE norms."
  },
  {
    id: "adm-102",
    applicationNo: "CHOWGAM-ADM-2026-1043",
    submissionDate: "October 24, 2026",
    studentName: "Sana Tariq",
    gender: "Female",
    dob: "2014-08-20",
    aadhaarNo: "7721-4901-2184",
    applyingForClass: "Class 6",
    academicSession: "2026–27",
    fatherName: "Tariq Ahmad Rather",
    motherName: "Shaheena Begum",
    guardianPhone: "9797654321",
    whatsappPhone: "9797654321",
    category: "RBA",
    isCWSN: false,
    bloodGroup: "B+",
    address: "Upper Chowgam, Near Spring",
    village: "Chowgam",
    zone: "Shangus",
    district: "Anantnag",
    pinCode: "192201",
    previousSchool: "Govt Primary School Chowgam",
    previousClassPassed: "Class 5",
    previousPercentage: "88.0%",
    documentsSubmitted: ["Date of Birth Certificate", "Previous Class Marks Card", "Aadhaar Card Copy", "RBA Certificate", "Passport Photographs"],
    status: "Verified",
    verifiedBy: "Office Clerk Mr. Altaf Ahmad (Teacher)",
    officeRemarks: "RBA document verified. Provisionally enrolled for upcoming academic session."
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
