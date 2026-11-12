import { EligibilityRule } from '../types';

export const SCHEME_RULES: Record<string, EligibilityRule> = {
  MAHA_OBC_SCHOLARSHIP: {
    scheme_id: 'MAHA_OBC_SCHOLARSHIP',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'State Domicile',
        description: 'Candidate must be a permanent resident / domicile of Maharashtra.',
        reference: 'MahaDBT OBC Rules (Govt. Resolution No. 2024/BCW-34)'
      },
      {
        field: 'category',
        operator: 'equals',
        value: 'OBC',
        label: 'Caste Category',
        description: 'Applicant must belong to Other Backward Classes (OBC) category.',
        reference: 'MahaDBT Bahujan Welfare Directive'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 150000,
        label: 'Annual Family Income Limit',
        description: 'Total annual family income must be less than or equal to ₹1,50,000.',
        reference: 'Revenue Dept. Tahsildar Income Norms 2025'
      },
      {
        field: 'educationLevel',
        operator: 'in',
        value: ['Undergraduate', 'Postgraduate', 'Diploma', 'Doctoral'],
        label: 'Eligible Education Level',
        description: 'Enrolled in post-matric recognized degree or diploma course.',
        reference: 'Post-Matric Course Schedule 2025-26'
      }
    ]
  },
  MAHA_EBC_SCHOLARSHIP: {
    scheme_id: 'MAHA_EBC_SCHOLARSHIP',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'Maharashtra Domicile',
        description: 'Must hold a valid Domicile Certificate of Maharashtra.',
        reference: 'DTE Maharashtra GR No. 2024/EBC/112'
      },
      {
        field: 'category',
        operator: 'in',
        value: ['General', 'EWS'],
        label: 'Social Category',
        description: 'Applicable to General category and EWS students not claiming other caste scholarships.',
        reference: 'RCSM Guideline Clause 4'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 800000,
        label: 'Annual Family Income Ceiling',
        description: 'Annual family income must not exceed ₹8,00,000.',
        reference: 'Govt. of Maharashtra Gazette income limit'
      },
      {
        field: 'educationLevel',
        operator: 'in',
        value: ['Undergraduate', 'Postgraduate', 'Diploma'],
        label: 'Course Level',
        description: 'Enrolled in professional or higher education technical courses.',
        reference: 'DTE Approved Course Matrix'
      }
    ]
  },
  MAHA_PANJABRAO_HOSTEL: {
    scheme_id: 'MAHA_PANJABRAO_HOSTEL',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'Domicile Status',
        description: 'Must be a permanent resident of Maharashtra.',
        reference: 'Panjabrao Scheme Guidelines Section 2'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 800000,
        label: 'Income Ceiling',
        description: 'Annual family income must not exceed ₹8,00,000.',
        reference: 'Directorate of Higher Education Notification'
      },
      {
        field: 'educationLevel',
        operator: 'in',
        value: ['Undergraduate', 'Postgraduate', 'Diploma'],
        label: 'Professional Enrollment',
        description: 'Enrolled in recognized technical or professional courses.',
        reference: 'Panjabrao Deshmukh Eligibility Norms'
      }
    ]
  },
  CENTRAL_NSP_CSSS: {
    scheme_id: 'CENTRAL_NSP_CSSS',
    conditions: [
      {
        field: 'educationLevel',
        operator: 'in',
        value: ['Undergraduate', 'Postgraduate'],
        label: 'Higher Education Enrolment',
        description: 'Enrolled in regular full-time graduation or post-graduation degree.',
        reference: 'Ministry of Education CSSS Scheme Norms'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 450000,
        label: 'Family Income Ceiling',
        description: 'Gross annual family income must be less than or equal to ₹4,50,000.',
        reference: 'NSP Income Verification Guideline'
      },
      {
        field: 'previousMarksPercentage',
        operator: 'greater_than_or_equal',
        value: 80,
        label: 'Class 12th Percentile / Marks',
        description: 'Above 80th percentile / 80% marks in Class 12 board examination.',
        reference: 'CSSS Merit Quota Matrix'
      }
    ]
  },
  MAHA_LADKI_BAHIN: {
    scheme_id: 'MAHA_LADKI_BAHIN',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'State Residence',
        description: 'Applicant must be a permanent resident woman of Maharashtra.',
        reference: 'Mukhyamantri Majhi Ladki Bahin GR No. 1024/76'
      },
      {
        field: 'gender',
        operator: 'equals',
        value: 'Female',
        label: 'Gender',
        description: 'Scheme is exclusively for women citizens.',
        reference: 'WCD Maharashtra Rules'
      },
      {
        field: 'age',
        operator: 'between',
        value: [21, 65],
        label: 'Age Eligibility',
        description: 'Age must be between 21 and 65 years at time of application.',
        reference: 'Ladki Bahin Age Schedule'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 250000,
        label: 'Income Ceiling',
        description: 'Annual family income must not exceed ₹2,50,000.',
        reference: 'Revenue Income Threshold Rule'
      }
    ]
  },
  CENTRAL_PM_KISAN: {
    scheme_id: 'CENTRAL_PM_KISAN',
    conditions: [
      {
        field: 'occupation',
        operator: 'contains',
        value: 'Farmer',
        label: 'Occupation',
        description: 'Must be an active landholding farmer family.',
        reference: 'PM-KISAN Operational Guidelines para 3'
      },
      {
        field: 'landHoldingAcres',
        operator: 'greater_than_or_equal',
        value: 0.1,
        label: 'Cultivable Land Holding',
        description: 'Must own registered agricultural cultivable land.',
        reference: 'Kisan RoR Verification Rules'
      }
    ]
  },
  CENTRAL_AYUSHMAN_BHARAT: {
    scheme_id: 'CENTRAL_AYUSHMAN_BHARAT',
    conditions: [
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 250000,
        label: 'Deprivation / Income Limit',
        description: 'Income within priority household threshold (or senior citizen 70+).',
        reference: 'NHA Empanelment and Eligibility Guidelines'
      }
    ]
  },
  CENTRAL_PMAY_HOUSING: {
    scheme_id: 'CENTRAL_PMAY_HOUSING',
    conditions: [
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 600000,
        label: 'Income Ceiling for EWS / LIG',
        description: 'Family annual income must be within ₹3,00,000 (EWS) or ₹6,00,000 (LIG).',
        reference: 'PMAY Urban 2.0 Notification'
      }
    ]
  },
  CENTRAL_PM_MUDRA: {
    scheme_id: 'CENTRAL_PM_MUDRA',
    conditions: [
      {
        field: 'age',
        operator: 'greater_than_or_equal',
        value: 18,
        label: 'Minimum Age',
        description: 'Applicant must be an adult Indian citizen (18+ years).',
        reference: 'MUDRA Loan Regulations'
      }
    ]
  },
  CENTRAL_PM_VISHWAKARMA: {
    scheme_id: 'CENTRAL_PM_VISHWAKARMA',
    conditions: [
      {
        field: 'age',
        operator: 'greater_than_or_equal',
        value: 18,
        label: 'Age Eligibility',
        description: 'Minimum 18 years of age at time of registration.',
        reference: 'PM Vishwakarma Guidelines 2024'
      }
    ]
  },
  CENTRAL_AICTE_PRAGATI: {
    scheme_id: 'CENTRAL_AICTE_PRAGATI',
    conditions: [
      {
        field: 'gender',
        operator: 'equals',
        value: 'Female',
        label: 'Female Candidate',
        description: 'Scheme is exclusively for meritorious girl students.',
        reference: 'AICTE Pragati Mandate'
      },
      {
        field: 'educationLevel',
        operator: 'in',
        value: ['Undergraduate', 'Diploma'],
        label: 'Technical Course',
        description: 'Admitted to 1st year Degree or Diploma technical programme.',
        reference: 'AICTE Scheme Regulations'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 800000,
        label: 'Family Income Ceiling',
        description: 'Annual family income must not exceed ₹8,00,000.',
        reference: 'AICTE Income Norms'
      }
    ]
  },
  CENTRAL_BEGUM_HAZRAT_MAHAL: {
    scheme_id: 'CENTRAL_BEGUM_HAZRAT_MAHAL',
    conditions: [
      {
        field: 'gender',
        operator: 'equals',
        value: 'Female',
        label: 'Girl Student',
        description: 'Exclusively for female students.',
        reference: 'MAEF Begum Hazrat Mahal Norms'
      },
      {
        field: 'category',
        operator: 'equals',
        value: 'Minority',
        label: 'Minority Status',
        description: 'Must belong to notified minority community (Muslim, Christian, Sikh, Buddhist, Jain, Parsi).',
        reference: 'Ministry of Minority Affairs Notification'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 200000,
        label: 'Income Limit',
        description: 'Parental annual income must be less than or equal to ₹2,00,000.',
        reference: 'MAEF Income Ceiling'
      }
    ]
  },
  CENTRAL_PM_SVANIDHI: {
    scheme_id: 'CENTRAL_PM_SVANIDHI',
    conditions: [
      {
        field: 'age',
        operator: 'greater_than_or_equal',
        value: 18,
        label: 'Age',
        description: 'Must be 18 years or older.',
        reference: 'MoHUA SVANidhi Rules'
      }
    ]
  },
  CENTRAL_IGNOAPS_SENIOR: {
    scheme_id: 'CENTRAL_IGNOAPS_SENIOR',
    conditions: [
      {
        field: 'age',
        operator: 'greater_than_or_equal',
        value: 60,
        label: 'Senior Citizen Age',
        description: 'Must be 60 years or above.',
        reference: 'NSAP Central Rules para 2'
      },
      {
        field: 'rationCardType',
        operator: 'in',
        value: ['BPL', 'Antyodaya'],
        label: 'BPL Household',
        description: 'Family must belong to verified Below Poverty Line (BPL) or Antyodaya category.',
        reference: 'National Social Assistance Guidelines'
      }
    ]
  },
  CENTRAL_ADIP_DISABILITY: {
    scheme_id: 'CENTRAL_ADIP_DISABILITY',
    conditions: [
      {
        field: 'isDisability',
        operator: 'equals',
        value: true,
        label: 'Disability Status',
        description: 'Candidate must have certified disability.',
        reference: 'ALIMCO ADIP Guidelines'
      },
      {
        field: 'disabilityPercentage',
        operator: 'greater_than_or_equal',
        value: 40,
        label: 'Minimum Disability Benchmark',
        description: 'Certified benchmark disability of at least 40% (UDID card).',
        reference: 'Rights of Persons with Disabilities Act 2016'
      }
    ]
  },
  CENTRAL_NMMSS_SCHOLARSHIP: {
    scheme_id: 'CENTRAL_NMMSS_SCHOLARSHIP',
    conditions: [
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 350000,
        label: 'Parental Income Ceiling',
        description: 'Parental annual income from all sources must not exceed ₹3,50,000.',
        reference: 'NMMSS Guidelines Department of School Education'
      },
      {
        field: 'previousMarksPercentage',
        operator: 'greater_than_or_equal',
        value: 55,
        label: 'Academic Performance',
        description: 'Minimum 55% marks in Class 7 examination (50% for SC/ST).',
        reference: 'NMMSS Selection Criteria'
      }
    ]
  },
  MAHA_SC_POST_MATRIC: {
    scheme_id: 'MAHA_SC_POST_MATRIC',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'Maharashtra Domicile',
        description: 'Permanent domicile of Maharashtra.',
        reference: 'Social Justice Dept GR 2024'
      },
      {
        field: 'category',
        operator: 'equals',
        value: 'SC',
        label: 'Scheduled Caste',
        description: 'Belongs to Scheduled Caste (SC) category with valid certificate.',
        reference: 'Govt of India SC Scheme'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 250000,
        label: 'Annual Income Limit',
        description: 'Family annual income must not exceed ₹2,50,000.',
        reference: 'Central Sponsor Income Norm'
      },
      {
        field: 'educationLevel',
        operator: 'in',
        value: ['Undergraduate', 'Postgraduate', 'Diploma', 'Doctoral'],
        label: 'Post-Matric Course',
        description: 'Enrolled in post-matric recognized degree or diploma.',
        reference: 'MahaDBT SC Post-Matric Matrix'
      }
    ]
  }
};
