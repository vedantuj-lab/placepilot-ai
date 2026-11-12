import { CitizenProfile, Scheme, DocumentItem, ApplicationDraft, ReminderTask, AuditLog, AgentChatMessage } from '../types';
import { SCHEMES_DATA } from '../data/schemes';

export const DEMO_CITIZEN: CitizenProfile = {
  id: 'citizen-demo-01',
  fullName: 'Vedant Sharma',
  email: 'citizen.demo@placepilot.local',
  phone: '9876543210',
  age: 20,
  dob: '2005-04-12',
  gender: 'Male',
  state: 'Maharashtra',
  district: 'Thane',
  pinCode: '401107',
  category: 'OBC',
  religion: 'Hindu',
  isDisability: false,
  educationLevel: 'Undergraduate',
  courseName: 'B.Tech Computer Engineering',
  institutionName: 'Shree L.R. Tiwari College of Engineering',
  passingYear: 2027,
  previousMarksPercentage: 84.5,
  currentAcademicYear: '2025-26',
  annualFamilyIncome: 150000,
  occupation: 'Student',
  parentOccupation: 'Farmer / Small Shopkeeper',
  landHoldingAcres: 1.2,
  rationCardType: 'BPL',
  areaType: 'Urban',
  maritalStatus: 'Single',
  language: 'en',
  consentGiven: true,
  role: 'citizen'
};

export const DEMO_ADMIN: CitizenProfile = {
  id: 'admin-demo-01',
  fullName: 'Pooja Kulkarni (Admin)',
  email: 'admin.demo@placepilot.local',
  state: 'Maharashtra',
  annualFamilyIncome: 0,
  language: 'en',
  consentGiven: true,
  role: 'admin'
};

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    citizenId: 'citizen-demo-01',
    schemeId: 'MAHA_OBC_SCHOLARSHIP',
    documentType: 'Maharashtra Domicile Certificate',
    name: 'Maharashtra Domicile Certificate',
    fileName: 'domicile_certificate_maha.pdf',
    fileType: 'application/pdf',
    fileSize: '412 KB',
    uploadDate: '2026-11-01',
    status: 'Verified by Citizen',
    extractedData: {
      certificateNumber: 'DOM/THN/2023/88921',
      candidateName: 'Vedant Sharma',
      district: 'Thane',
      issueDate: '2023-06-15'
    },
    verifiedByCitizen: true,
    consentGranted: true
  },
  {
    id: 'doc-2',
    citizenId: 'citizen-demo-01',
    schemeId: 'MAHA_OBC_SCHOLARSHIP',
    documentType: 'Income Certificate issued by Tehsildar (<= ₹1.5 Lakh)',
    name: 'Tahsildar Income Certificate',
    fileName: 'income_certificate_2025_26.pdf',
    fileType: 'application/pdf',
    fileSize: '320 KB',
    uploadDate: '2026-11-03',
    status: 'Verified by Citizen',
    extractedData: {
      certificateNumber: 'INC/REV/2025/11294',
      candidateName: 'Vedant Sharma',
      annualIncome: '150000',
      issuingAuthority: 'Tahsildar Office, Thane',
      financialYear: '2024-2025'
    },
    verifiedByCitizen: true,
    consentGranted: true
  },
  {
    id: 'doc-3',
    citizenId: 'citizen-demo-01',
    schemeId: 'MAHA_OBC_SCHOLARSHIP',
    documentType: 'OBC Caste Certificate',
    name: 'OBC Caste Certificate',
    fileName: 'obc_caste_certificate.pdf',
    fileType: 'application/pdf',
    fileSize: '290 KB',
    uploadDate: '2026-11-04',
    status: 'Extracted',
    extractedData: {
      certificateNumber: 'OBC/MH/2022/44120',
      caste: 'Kunbi (OBC)',
      candidateName: 'Vedant Sharma'
    },
    verifiedByCitizen: true,
    consentGranted: true
  }
];

export const INITIAL_REMINDERS: ReminderTask[] = [
  {
    id: 'rem-1',
    citizenId: 'citizen-demo-01',
    applicationId: 'app-draft-01',
    schemeTitle: 'Post-Matric Scholarship for OBC Students (MahaDBT)',
    title: 'Verify college fee receipt with registrar office',
    description: 'Ensure college stamp and sign is clear on latest term receipt for MahaDBT upload.',
    dueDateTime: '2026-11-15T10:00:00',
    isCompleted: false,
    priority: 'HIGH',
    createdAt: '2026-11-08'
  },
  {
    id: 'rem-2',
    citizenId: 'citizen-demo-01',
    title: 'Check MahaDBT Aadhaar Seeded Bank Account Status',
    description: 'Verify NPCI mapping on official bank mobile app or branch.',
    dueDateTime: '2026-11-20T14:30:00',
    isCompleted: true,
    priority: 'MEDIUM',
    createdAt: '2026-11-05'
  }
];

export const INITIAL_APPLICATIONS: ApplicationDraft[] = [
  {
    id: 'app-draft-01',
    citizenId: 'citizen-demo-01',
    schemeId: 'MAHA_OBC_SCHOLARSHIP',
    schemeTitle: 'Post-Matric Scholarship for OBC Students (MahaDBT)',
    schemeCategory: 'Education and Scholarships',
    status: 'Ready for Official Portal',
    statusAttribution: 'PlacePilot-generated',
    formData: {
      fullName: 'Vedant Sharma',
      email: 'citizen.demo@placepilot.local',
      phone: '9876543210',
      state: 'Maharashtra',
      district: 'Thane',
      pinCode: '401107',
      category: 'OBC',
      annualFamilyIncome: 150000,
      institutionName: 'Shree L.R. Tiwari College of Engineering',
      courseName: 'B.Tech Computer Engineering',
      currentAcademicYear: '2025-26',
      previousMarksPercentage: 84.5,
      domicileCertNo: 'DOM/THN/2023/88921',
      incomeCertNo: 'INC/REV/2025/11294',
      casteCertNo: 'OBC/MH/2022/44120',
      issuingAuthority: 'Tahsildar Office, Thane',
      hostelStatus: 'Day Scholar',
      bankName: 'State Bank of India',
      accountNumber: '33445566778',
      ifscCode: 'SBIN0001234',
      aadhaarSeededConsent: true
    },
    validationErrors: [],
    isApprovedByHuman: true,
    approvalAudit: {
      approvedAt: '2026-11-09T18:42:15Z',
      approvedBy: 'Vedant Sharma (citizen.demo@placepilot.local)',
      ipHash: 'sha256-4f8b2c91a7e2',
      auditChecksum: 'AUDIT-MH-2026-8819',
      statement: 'I have personally verified all prefilled data against my original government certificates and authorized this draft for external MahaDBT portal submission.'
    },
    notes: [
      'Eligibility verified: Domicile Maharashtra, OBC category, income ₹1,50,000 <= ceiling.',
      'All 3 core certificates attached & validated.',
      'Approved by citizen on 09 Nov 2026. Ready for handoff to official MahaDBT portal.'
    ],
    timeline: [
      { status: 'Saved', timestamp: '2026-11-08T10:00:00Z', note: 'Scheme saved from Explorer', source: 'Citizen-entered' },
      { status: 'Eligibility Checking', timestamp: '2026-11-08T10:05:00Z', note: 'Deterministic rules passed (4/4 conditions)', source: 'PlacePilot-generated' },
      { status: 'Documents Pending', timestamp: '2026-11-08T10:10:00Z', note: 'Document checklist initialized', source: 'PlacePilot-generated' },
      { status: 'Draft In Progress', timestamp: '2026-11-08T14:30:00Z', note: 'Application form prefilled from profile & OCR', source: 'PlacePilot-generated' },
      { status: 'Ready for Review', timestamp: '2026-11-09T17:00:00Z', note: 'Form validation passed with 0 errors', source: 'PlacePilot-generated' },
      { status: 'Awaiting Approval', timestamp: '2026-11-09T18:30:00Z', note: 'Presented to citizen in Human Approval Center', source: 'PlacePilot-generated' },
      { status: 'Ready for Official Portal', timestamp: '2026-11-09T18:42:15Z', note: 'Approved by citizen. Official MahaDBT portal link verified.', source: 'Officially verified' }
    ],
    officialPortalUrl: 'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1BFBEB22E15CB770',
    createdAt: '2026-11-08T10:00:00Z',
    updatedAt: '2026-11-09T18:42:15Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-1',
    timestamp: '2026-11-09T18:42:15Z',
    actor: 'citizen.demo@placepilot.local',
    action: 'HUMAN_APPROVAL_RECORDED',
    details: 'Citizen confirmed accuracy of application draft for MahaDBT OBC Scholarship with audit hash AUDIT-MH-2026-8819.',
    level: 'SECURITY'
  },
  {
    id: 'audit-2',
    timestamp: '2026-11-08T10:05:00Z',
    actor: 'system.rules_engine',
    action: 'DETERMINISTIC_RULES_EVALUATION',
    details: 'Evaluated rule MAHA_OBC_SCHOLARSHIP against citizen-demo-01 profile. Outcome: ELIGIBLE.',
    level: 'INFO'
  },
  {
    id: 'audit-3',
    timestamp: '2026-11-05T09:12:00Z',
    actor: 'admin.demo@placepilot.local',
    action: 'SCHEME_SOURCE_VERIFIED',
    details: 'MahaDBT official portal URL verified active and accessible.',
    level: 'INFO'
  }
];

class StorageService {
  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(`placepilot_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`placepilot_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  getProfile(): CitizenProfile {
    const session = this.getAuthSession();
    if (session && session.user) {
      return session.user;
    }
    const saved = localStorage.getItem('placepilot_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      } catch {}
    }
    return {
      id: 'citizen-guest-01',
      fullName: 'Citizen User',
      email: 'citizen@placepilot.local',
      state: 'Maharashtra',
      district: 'Thane',
      pinCode: '401107',
      category: 'General',
      annualFamilyIncome: 150000,
      educationLevel: 'Undergraduate',
      courseName: 'Degree Course',
      institutionName: 'Recognized Institution',
      language: 'en',
      consentGiven: true,
      role: 'citizen'
    };
  }

  saveProfile(profile: CitizenProfile): void {
    this.setItem('profile', profile);
    const session = this.getAuthSession();
    if (session && session.user) {
      session.user = profile;
      this.setItem('auth_session', session);
    }
  }

  resetToDemoProfile(): void {
    this.setItem('profile', DEMO_CITIZEN);
  }

  resetToAdminProfile(): void {
    this.setItem('profile', DEMO_ADMIN);
  }

  getSchemes(): Scheme[] {
    return this.getItem<Scheme[]>('schemes', SCHEMES_DATA);
  }

  saveSchemes(schemes: Scheme[]): void {
    this.setItem('schemes', schemes);
  }

  getSavedSchemeIds(): string[] {
    return this.getItem<string[]>('saved_scheme_ids', ['MAHA_OBC_SCHOLARSHIP', 'MAHA_EBC_SCHOLARSHIP']);
  }

  toggleSaveScheme(schemeId: string): boolean {
    const list = this.getSavedSchemeIds();
    const index = list.indexOf(schemeId);
    let isSaved = false;
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(schemeId);
      isSaved = true;
    }
    this.setItem('saved_scheme_ids', list);
    return isSaved;
  }

  getDocuments(): DocumentItem[] {
    return this.getItem<DocumentItem[]>('documents', INITIAL_DOCUMENTS);
  }

  saveDocument(doc: DocumentItem): void {
    const docs = this.getDocuments();
    const idx = docs.findIndex(d => d.id === doc.id);
    if (idx >= 0) {
      docs[idx] = doc;
    } else {
      docs.unshift(doc);
    }
    this.setItem('documents', docs);
  }

  deleteDocument(docId: string): void {
    const docs = this.getDocuments().filter(d => d.id !== docId);
    this.setItem('documents', docs);
  }

  getApplications(): ApplicationDraft[] {
    return this.getItem<ApplicationDraft[]>('applications', INITIAL_APPLICATIONS);
  }

  saveApplications(apps: ApplicationDraft[]): void {
    this.setItem('applications', apps);
  }

  saveApplication(app: ApplicationDraft): void {
    const apps = this.getApplications();
    const idx = apps.findIndex(a => a.id === app.id);
    if (idx >= 0) {
      apps[idx] = { ...app, updatedAt: new Date().toISOString() };
    } else {
      apps.unshift({ ...app, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    this.setItem('applications', apps);
  }

  getReminders(): ReminderTask[] {
    return this.getItem<ReminderTask[]>('reminders', INITIAL_REMINDERS);
  }

  saveReminder(rem: ReminderTask): void {
    const rems = this.getReminders();
    const idx = rems.findIndex(r => r.id === rem.id);
    if (idx >= 0) {
      rems[idx] = rem;
    } else {
      rems.unshift(rem);
    }
    this.setItem('reminders', rems);
  }

  deleteReminder(remId: string): void {
    const rems = this.getReminders().filter(r => r.id !== remId);
    this.setItem('reminders', rems);
  }

  getAuditLogs(): AuditLog[] {
    return this.getItem<AuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS);
  }

  addAuditLog(actor: string, action: string, details: string, level: 'INFO' | 'WARN' | 'SECURITY' = 'INFO'): void {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor,
      action,
      details,
      level
    });
    this.setItem('audit_logs', logs);
  }

  getChatHistory(): AgentChatMessage[] {
    return this.getItem<AgentChatMessage[]>('chat_history', [
      {
        id: 'msg-welcome',
        sender: 'agent',
        text: 'Namaste! I am Scheme Saathi, your AI welfare and scholarship assistant from PlacePilot AI. I help citizens discover welfare benefits, understand eligibility rules, prepare document checklists, and guide you through official government portals. How can I assist you today?',
        timestamp: new Date().toISOString(),
        actionSuggestions: [
          {
            label: '🎓 Scholarships for Maharashtra College Students (₹1.5L Income)',
            actionType: 'search',
            payload: 'I am a college student from Maharashtra. My family\'s annual income is approximately ₹1,50,000. Find scholarships that I may qualify for.'
          },
          {
            label: '📋 Check My Full Eligibility',
            actionType: 'check_eligibility'
          },
          {
            label: '📄 Document Readiness Studio',
            actionType: 'view_documents'
          }
        ]
      }
    ]);
  }

  saveChatHistory(history: AgentChatMessage[]): void {
    this.setItem('chat_history', history);
  }

  clearChatHistory(): void {
    localStorage.removeItem('placepilot_chat_history');
  }

  calculateProfileCompleteness(profile: CitizenProfile): number {
    const coreFields: (keyof CitizenProfile)[] = [
      'fullName',
      'email',
      'phone',
      'state',
      'district',
      'pinCode',
      'category',
      'educationLevel',
      'courseName',
      'institutionName',
      'annualFamilyIncome'
    ];
    let filled = 0;
    for (const field of coreFields) {
      const val = profile[field];
      if (val !== undefined && val !== null && String(val).trim() !== '') {
        filled++;
      }
    }
    return Math.round((filled / coreFields.length) * 100);
  }

  // --- Authentication & Session Persistence ---
  getAuthSession(): { user: CitizenProfile; token: string; rememberMe: boolean } | null {
    return this.getItem<{ user: CitizenProfile; token: string; rememberMe: boolean } | null>('auth_session', null);
  }

  saveAuthSession(user: CitizenProfile, token: string, rememberMe: boolean = true): void {
    this.setItem('auth_session', { user, token, rememberMe, loggedInAt: new Date().toISOString() });
    this.saveProfile(user);
  }

  clearAuthSession(): void {
    try {
      localStorage.removeItem('placepilot_auth_session');
    } catch (e) {
      console.warn('Failed to clear auth session:', e);
    }
  }

  isAuthenticated(): boolean {
    const session = this.getAuthSession();
    return !!(session && session.user && session.token);
  }

  getRegisteredAccounts(): Record<string, { password: string; profile: CitizenProfile }> {
    return this.getItem<Record<string, { password: string; profile: CitizenProfile }>>('registered_accounts', {
      'citizen.demo@placepilot.local': {
        password: 'Password123!',
        profile: DEMO_CITIZEN
      },
      'admin.demo@placepilot.local': {
        password: 'AdminPassword2026!',
        profile: DEMO_ADMIN
      }
    });
  }

  saveRegisteredAccount(email: string, password: string, profile: CitizenProfile): void {
    const accounts = this.getRegisteredAccounts();
    accounts[email.toLowerCase()] = { password, profile };
    this.setItem('registered_accounts', accounts);
  }
}

export const storage = new StorageService();
