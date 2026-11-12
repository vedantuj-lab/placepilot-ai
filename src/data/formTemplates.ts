import { ApplicationFormTemplate } from '../types';

export const SCHEME_FORM_TEMPLATES: Record<string, ApplicationFormTemplate> = {
  MAHA_OBC_SCHOLARSHIP: {
    schemeId: 'MAHA_OBC_SCHOLARSHIP',
    sections: [
      {
        id: 'personal',
        title: 'Applicant & Domicile Details',
        fields: [
          { id: 'f1', name: 'fullName', label: 'Full Name (as per SSC)', type: 'text', required: true, profileMapping: 'fullName' },
          { id: 'f2', name: 'email', label: 'Email Address', type: 'email', required: true, profileMapping: 'email' },
          { id: 'f3', name: 'phone', label: 'Mobile Number', type: 'tel', required: true, profileMapping: 'phone' },
          { id: 'f4', name: 'state', label: 'State of Domicile', type: 'text', required: true, profileMapping: 'state' },
          { id: 'f5', name: 'district', label: 'District', type: 'text', required: true, profileMapping: 'district' },
          { id: 'f6', name: 'pinCode', label: 'PIN Code', type: 'text', required: true, profileMapping: 'pinCode' },
          { id: 'f7', name: 'domicileCertNo', label: 'Domicile Certificate Number', type: 'text', required: true, placeholder: 'e.g. DOM/2024/987123', documentExtractionMapping: { documentType: 'Maharashtra Domicile Certificate', field: 'certificateNumber' } }
        ]
      },
      {
        id: 'caste_income',
        title: 'Caste & Income Verification',
        fields: [
          { id: 'f8', name: 'category', label: 'Caste Category', type: 'select', required: true, profileMapping: 'category', options: ['OBC', 'VJNT', 'SBC'] },
          { id: 'f9', name: 'casteCertNo', label: 'Caste Certificate Number', type: 'text', required: true, placeholder: 'e.g. OBC/2023/5541', documentExtractionMapping: { documentType: 'OBC Caste Certificate', field: 'certificateNumber' } },
          { id: 'f10', name: 'annualFamilyIncome', label: 'Annual Family Income (₹)', type: 'number', required: true, profileMapping: 'annualFamilyIncome' },
          { id: 'f11', name: 'incomeCertNo', label: 'Income Certificate Number (Tahsildar)', type: 'text', required: true, placeholder: 'e.g. INC/2025/1129', documentExtractionMapping: { documentType: 'Income Certificate issued by Tehsildar (<= ₹1.5 Lakh)', field: 'certificateNumber' } },
          { id: 'f12', name: 'issuingAuthority', label: 'Certificate Issuing Authority', type: 'text', required: true, placeholder: 'Tahsildar / Sub-Divisional Officer' }
        ]
      },
      {
        id: 'academic',
        title: 'College & Course Enrollment',
        fields: [
          { id: 'f13', name: 'institutionName', label: 'College / Institute Name', type: 'text', required: true, profileMapping: 'institutionName', placeholder: 'e.g. Shree L.R. Tiwari College of Engineering' },
          { id: 'f14', name: 'courseName', label: 'Course Enrolled', type: 'text', required: true, profileMapping: 'courseName', placeholder: 'e.g. B.Tech Computer Engineering' },
          { id: 'f15', name: 'currentAcademicYear', label: 'Current Academic Year', type: 'select', required: true, options: ['2025-26', '2026-27'] },
          { id: 'f16', name: 'previousMarksPercentage', label: 'Previous Exam Percentage (%)', type: 'number', required: true, profileMapping: 'previousMarksPercentage' },
          { id: 'f17', name: 'hostelStatus', label: 'Hostel / Day Scholar', type: 'select', required: true, options: ['Day Scholar', 'Government Hostel', 'Private Rented / Non-Govt Hostel'] }
        ]
      },
      {
        id: 'bank',
        title: 'DBT Bank Account Details',
        fields: [
          { id: 'f18', name: 'bankName', label: 'Bank Name', type: 'text', required: true, placeholder: 'e.g. State Bank of India' },
          { id: 'f19', name: 'accountNumber', label: 'Savings Account Number', type: 'text', required: true },
          { id: 'f20', name: 'ifscCode', label: 'IFSC Code', type: 'text', required: true, placeholder: 'e.g. SBIN0001234' },
          { id: 'f21', name: 'aadhaarSeededConsent', label: 'I confirm this bank account is seeded with Aadhaar for DBT', type: 'checkbox', required: true }
        ]
      }
    ]
  },
  DEFAULT: {
    schemeId: 'DEFAULT',
    sections: [
      {
        id: 'applicant',
        title: 'Applicant Information',
        fields: [
          { id: 'd1', name: 'fullName', label: 'Full Name', type: 'text', required: true, profileMapping: 'fullName' },
          { id: 'd2', name: 'email', label: 'Email Address', type: 'email', required: true, profileMapping: 'email' },
          { id: 'd3', name: 'phone', label: 'Phone Number', type: 'tel', required: true, profileMapping: 'phone' },
          { id: 'd4', name: 'state', label: 'State', type: 'text', required: true, profileMapping: 'state' },
          { id: 'd5', name: 'district', label: 'District', type: 'text', required: true, profileMapping: 'district' },
          { id: 'd6', name: 'annualFamilyIncome', label: 'Annual Income (₹)', type: 'number', required: true, profileMapping: 'annualFamilyIncome' }
        ]
      },
      {
        id: 'scheme_specific',
        title: 'Eligibility Affirmations',
        fields: [
          { id: 'd7', name: 'purposeStatement', label: 'Purpose & Need Statement', type: 'textarea', required: true, placeholder: 'Explain why you are applying for this assistance...' },
          { id: 'd8', name: 'declarationTruth', label: 'I declare all information provided is accurate and verifiable with official government documents', type: 'checkbox', required: true }
        ]
      }
    ]
  }
};

export function getFormTemplateForScheme(schemeId: string): ApplicationFormTemplate {
  return SCHEME_FORM_TEMPLATES[schemeId] || {
    ...SCHEME_FORM_TEMPLATES.DEFAULT,
    schemeId
  };
}
