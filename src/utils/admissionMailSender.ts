import { AdmissionApplication } from '../data/resultsAndAdmissionsData';

export const SCHOOL_RECEIVER_EMAIL = 'hschowgam@gmail.com';
export const SECONDARY_RECEIVER_EMAIL = 'princetahir224@gmail.com';
export const OFFICE_CLERK_PHONE = '7889635278';
export const EXAM_INCHARGE_PHONE = '8803497224';
export const PM_SHRI_INCHARGE_PHONE = '9541011971';

export function formatAdmissionEmailText(app: AdmissionApplication): string {
  return `OFFICIAL ONLINE ADMISSION INTIMATION - SESSION ${app.academicSession}
PM SHRI GOVT HIGH SCHOOL CHOWGAM
Zone: Shangus, District: Anantnag, UT of J&K (PIN: 192201)
Official Email Receiver: ${SCHOOL_RECEIVER_EMAIL}
Office Clerk In-charge: Mr. Altaf Ahmad (Phone: ${OFFICE_CLERK_PHONE})
--------------------------------------------------
APPLICATION PARTICULARS:
• Application Ref No : ${app.applicationNo}
• Submission Date    : ${app.submissionDate}
• Applying For Class : ${app.applyingForClass}
• Academic Session   : ${app.academicSession}

STUDENT DETAILS:
• Full Name          : ${app.studentName}
• Gender             : ${app.gender}
• Date of Birth      : ${app.dob}
• Aadhaar Number     : ${app.aadhaarNo || 'Submitted / In-process'}
• Category           : ${app.category}
• CWSN Status        : ${app.isCWSN ? `Yes (${app.cwsnDetails || 'Support Required'})` : 'No'}
• Blood Group        : ${app.bloodGroup || 'N/A'}

FAMILY & CONTACT:
• Father's Name      : ${app.fatherName}
• Mother's Name      : ${app.motherName || 'N/A'}
• Guardian Phone     : ${app.guardianPhone}
• WhatsApp Number    : ${app.whatsappPhone || app.guardianPhone}
• Residential Address: ${app.address}, Village: ${app.village}, Zone: ${app.zone}, Dist: ${app.district} - ${app.pinCode}

PREVIOUS ACADEMIC RECORD:
• Previous School    : ${app.previousSchool || 'Feeder School'}
• Previous Class     : ${app.previousClassPassed}
• Percentage / Marks : ${app.previousPercentage || 'Awaited'}

DOCUMENTS LISTED FOR PHYSICAL VERIFICATION:
${app.documentsSubmitted?.map((d, i) => `${i + 1}. ${d}`).join('\n') || '1. Date of Birth Certificate\n2. Previous Class Marks Card\n3. Aadhaar Card\n4. Photographs'}

--------------------------------------------------
STATUS: ${app.status}
Verification Desk: Mr. Altaf Ahmad (Teacher & Office Clerk / In-charge)
Official Phone: ${OFFICE_CLERK_PHONE}
Email Receiver: ${SCHOOL_RECEIVER_EMAIL}
Head of Institution: Mr. Shareef Ahmad Khan (7889725799)
--------------------------------------------------
Note: Auto-generated from the PM SHRI GHS Chowgam Online Admission Portal.`;
}

export function generateGmailWebLink(app: AdmissionApplication): string {
  const subject = `[ONLINE ADMISSION 2026-27] Ref: ${app.applicationNo} - ${app.studentName} (${app.applyingForClass})`;
  const body = formatAdmissionEmailText(app);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SCHOOL_RECEIVER_EMAIL)}&cc=${encodeURIComponent(SECONDARY_RECEIVER_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function generateMailtoLink(app: AdmissionApplication): string {
  const subject = `[ONLINE ADMISSION 2026-27] Ref: ${app.applicationNo} - ${app.studentName} (${app.applyingForClass})`;
  const body = formatAdmissionEmailText(app);
  return `mailto:${SCHOOL_RECEIVER_EMAIL}?cc=${SECONDARY_RECEIVER_EMAIL}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function generateWhatsAppLink(app: AdmissionApplication): string {
  const text = `*NEW ONLINE ADMISSION SUBMITTED*\n*PM SHRI GHS Chowgam*\n\n• Ref: ${app.applicationNo}\n• Student: *${app.studentName}*\n• Class: *${app.applyingForClass}*\n• Father: ${app.fatherName}\n• Contact: ${app.guardianPhone}\n• Village: ${app.village}, Zone ${app.zone}\n\nPlease verify and record at School Office Desk (Office Clerk: ${OFFICE_CLERK_PHONE}).`;
  return `https://wa.me/91${OFFICE_CLERK_PHONE}?text=${encodeURIComponent(text)}`;
}
