export type Language = 'en' | 'hi' | 'mr';

export type GovernmentLevel = 'Central' | 'State';

export type VerificationStatus = 'VERIFIED' | 'PENDING' | 'BROKEN';

export type EligibilityOutcome = 
  | 'ELIGIBLE' 
  | 'NOT_ELIGIBLE' 
  | 'ADDITIONAL_INFO_REQUIRED' 
  | 'NEEDS_OFFICIAL_VERIFICATION';

export type DocumentStatus = 
  | 'Missing' 
  | 'Uploaded' 
  | 'Processing' 
  | 'Extracted' 
  | 'Needs Review' 
  | 'Verified by Citizen' 
  | 'Officially Verified';

export type ApplicationStatus = 
  | 'Saved'
  | 'Eligibility Checking'
  | 'Documents Pending'
  | 'Draft In Progress'
  | 'Ready for Review'
  | 'Awaiting Approval'
  | 'Ready for Official Portal'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Rejected'
  | 'Additional Information Required';

export type StatusAttribution = 
  | 'Citizen-entered'
  | 'PlacePilot-generated'
  | 'Officially verified'
  | 'Simulated demo data';

export interface CitizenProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  phone?: string;
  age?: number;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  state: string;
  district?: string;
  pinCode?: string;
  category?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority';
  religion?: string;
  isDisability?: boolean;
  disabilityPercentage?: number;
  
  // Education
  educationLevel?: '10th' | '12th' | 'Diploma' | 'Undergraduate' | 'Postgraduate' | 'Doctoral' | 'Other';
  courseName?: string;
  institutionName?: string;
  passingYear?: number;
  previousMarksPercentage?: number;
  currentAcademicYear?: string;

  // Financial & Household
  annualFamilyIncome: number;
  occupation?: string;
  parentOccupation?: string;
  landHoldingAcres?: number;
  rationCardType?: 'APL' | 'BPL' | 'Antyodaya' | 'None';
  areaType?: 'Rural' | 'Urban';
  maritalStatus?: 'Single' | 'Married' | 'Widowed' | 'Divorced';

  // App settings
  language: Language;
  consentGiven: boolean;
  role: 'citizen' | 'admin';
}

export interface SchemeCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'less_than_or_equal' | 'greater_than_or_equal' | 'in' | 'contains' | 'between';
  value: any;
  label: string;
  description: string;
  reference: string;
}

export interface EligibilityRule {
  scheme_id: string;
  conditions: SchemeCondition[];
}

export interface ConditionEvaluationResult {
  field: string;
  requirementText: string;
  citizenValue: any;
  result: 'PASS' | 'FAIL' | 'MISSING' | 'VERIFY';
  comparisonNote: string;
  reference: string;
}

export interface EligibilityEvaluation {
  schemeId: string;
  outcome: EligibilityOutcome;
  summary: string;
  conditionResults: ConditionEvaluationResult[];
  missingFields: string[];
  recommendedAction: string;
  evaluatedAt: string;
}

export interface Scheme {
  id: string;
  title: string;
  titleHi: string;
  titleMr: string;
  slug: string;
  department: string;
  ministry?: string;
  level: GovernmentLevel;
  state: string;
  category: string;
  description: string;
  descriptionHi: string;
  descriptionMr: string;
  benefits: string[];
  eligibilitySummary: string;
  eligibilitySummaryHi?: string;
  eligibilitySummaryMr?: string;
  applicationDeadline?: string;
  acceptingApplications: boolean;
  isScholarship: boolean;
  academicYear?: string;
  officialSourceUrl: string;
  officialApplicationUrl: string;
  guidelinesUrl?: string;
  sourceVerificationStatus: VerificationStatus;
  lastVerifiedDate: string;
  requiredDocuments: string[];
  tags: string[];
  commonPortalName?: string; // e.g. "MahaDBT", "National Scholarship Portal", "myScheme"
}

export interface DocumentItem {
  id: string;
  citizenId: string;
  schemeId?: string;
  documentType: string;
  name: string;
  fileName: string;
  fileType: string;
  fileSize?: string;
  fileDataUrl?: string; // base64 preview or dummy URL
  uploadDate: string;
  status: DocumentStatus;
  extractedData?: Record<string, any>;
  verifiedByCitizen: boolean;
  consentGranted: boolean;
  notes?: string;
}

export interface ApplicationFormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'email' | 'tel' | 'textarea' | 'checkbox';
  required: boolean;
  profileMapping?: keyof CitizenProfile;
  documentExtractionMapping?: { documentType: string; field: string };
  options?: string[];
  placeholder?: string;
  description?: string;
  validationRegex?: string;
  validationErrorMessage?: string;
}

export interface ApplicationFormTemplate {
  schemeId: string;
  sections: Array<{
    id: string;
    title: string;
    fields: ApplicationFormField[];
  }>;
}

export interface ApplicationDraft {
  id: string;
  citizenId: string;
  schemeId: string;
  schemeTitle: string;
  schemeCategory: string;
  status: ApplicationStatus;
  statusAttribution: StatusAttribution;
  formData: Record<string, any>;
  validationErrors: Array<{ field: string; message: string }>;
  isApprovedByHuman: boolean;
  approvalAudit?: {
    approvedAt: string;
    approvedBy: string;
    ipHash: string;
    auditChecksum: string;
    statement: string;
  };
  notes: string[];
  timeline: Array<{
    status: ApplicationStatus;
    timestamp: string;
    note: string;
    source: StatusAttribution;
  }>;
  officialPortalUrl: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface ReminderTask {
  id: string;
  citizenId: string;
  applicationId?: string;
  schemeTitle?: string;
  title: string;
  description: string;
  dueDateTime: string;
  isCompleted: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}

export interface AgentChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  language?: Language;
  toolInvocations?: Array<{
    toolName: string;
    args: Record<string, any>;
    result?: Record<string, any>;
    status: 'calling' | 'success' | 'error';
  }>;
  actionSuggestions?: Array<{
    label: string;
    actionType: 'check_eligibility' | 'view_documents' | 'open_scheme' | 'start_application' | 'search';
    payload?: any;
  }>;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  level: 'INFO' | 'WARN' | 'SECURITY';
}
