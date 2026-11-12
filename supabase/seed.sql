-- ==============================================================================
-- PlacePilot AI (PS-01: Scheme Saathi) — PostgreSQL Initial Seed Data
-- Team: Tech Dynamites • Shree L.R. Tiwari College of Engineering
-- ==============================================================================

-- 1. Profiles (Citizen & Admin)
INSERT INTO public.profiles (
    id, auth_user_id, full_name, email, phone, age, dob, gender, state, district, pin_code,
    category, religion, is_disability, education_level, course_name, institution_name, passing_year,
    previous_marks_percentage, annual_family_income, occupation, parent_occupation, land_holding_acres,
    ration_card_type, area_type, marital_status, language, consent_given, role
) VALUES
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', NULL, 'Vedant Sharma', 'citizen.demo@placepilot.local',
    '9876543210', 20, '2005-04-12', 'Male', 'Maharashtra', 'Thane', '401107',
    'OBC', 'Hindu', FALSE, 'Undergraduate', 'B.Tech Computer Engineering',
    'Shree L.R. Tiwari College of Engineering', 2027, 84.50, 150000,
    'Student', 'Farmer / Small Shopkeeper', 1.20, 'BPL', 'Urban', 'Single', 'en', TRUE, 'citizen'
),
(
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', NULL, 'Pooja Kulkarni (Admin)', 'admin.demo@placepilot.local',
    '9876500000', 35, '1990-08-20', 'Female', 'Maharashtra', 'Mumbai City', '400001',
    'General', 'Hindu', FALSE, 'Postgraduate', 'M.Tech Computer Science',
    'Directorate of Technical Education Maharashtra', 2012, 91.00, 0,
    'Government Officer', 'Retired Officer', 0.00, 'APL', 'Urban', 'Married', 'en', TRUE, 'admin'
)
ON CONFLICT (email) DO NOTHING;

-- 2. Scheme Categories
INSERT INTO public.scheme_categories (id, name, name_hi, name_mr, description, icon_name) VALUES
('education', 'Education & Scholarships', 'शिक्षा एवं छात्रवृत्ति', 'शिक्षण व शिष्यवृत्ती', 'Scholarships, fee waivers, hostel allowances and educational grants.', 'GraduationCap'),
('healthcare', 'Healthcare & Health Insurance', 'स्वास्थ्य एवं चिकित्सा', 'आरोग्य व वैद्यकीय', 'Medical assistance, health insurance cards and treatment coverage.', 'HeartPulse'),
('agriculture', 'Agriculture & Farmer Support', 'कृषि एवं किसान सहायता', 'शेती व शेतकरी सहाय्य', 'PM-KISAN, crop insurance, fertilizer subsidies and machinery grants.', 'Tractor'),
('housing', 'Housing & Shelter', 'आवास एवं पुनर्वास', 'गृहनिर्माण व निवारा', 'PMAY urban and rural affordable housing grants.', 'Home'),
('social_welfare', 'Social Welfare & Empowerment', 'सामाजिक कल्याण', 'सामाजिक कल्याण', 'Financial pensions, widow assistance, and targeted welfare schemes.', 'Users'),
('women_child', 'Women & Child Development', 'महिला एवं बाल विकास', 'महिला व बाल विकास', 'Maternity support, girl child welfare, and self-help group aid.', 'Baby')
ON CONFLICT (id) DO NOTHING;

-- 3. Schemes
INSERT INTO public.schemes (
    id, title, title_hi, title_mr, slug, department, ministry, level, state, category_id,
    description, description_hi, description_mr, benefits, eligibility_summary,
    application_deadline, accepting_applications, is_scholarship, academic_year,
    official_source_url, official_application_url, guidelines_url, source_verification_status,
    last_verified_date, required_documents, tags, common_portal_name
) VALUES
(
    'MAHA_OBC_SCHOLARSHIP',
    'Post-Matric Scholarship for OBC Students (MahaDBT)',
    'अन्य पिछड़ा वर्ग (OBC) छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
    'इतर मागासवर्गीय (OBC) विद्यार्थ्यांसाठी मॅट्रिकोत्तर शिष्यवृत्ती (MahaDBT)',
    'post-matric-scholarship-obc-mahadbt',
    'Other Backward Bahujan Welfare Department',
    'Government of Maharashtra',
    'State', 'Maharashtra', 'education',
    'Provides tuition fee waivers and maintenance allowance to OBC students admitted to Government and recognized institutions.',
    'महाराष्ट्र के शासकीय एवं मान्यता प्राप्त संस्थानों में अध्ययनरत OBC छात्रों को शिक्षण शुल्क सहायता।',
    'महाराष्ट्रातील मान्यताप्राप्त संस्थांमध्ये शिकणाऱ्या OBC विद्यार्थ्यांना शिक्षण शुल्क सवलत.',
    '["100% Tuition Fee & Exam Fee reimbursement for Govt/Aided colleges", "50% Tuition Fee reimbursement for Unaided private colleges", "Monthly maintenance allowance ₹425 to ₹1,000"]'::jsonb,
    'Maharashtra domicile; OBC category; Enrolled in post-matric course; Family annual income <= ₹1,50,000.',
    '2026-03-31', TRUE, TRUE, '2025-26',
    'https://mahadbt.maharashtra.gov.in/',
    'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1BFBEB22E15CB770',
    'https://mahadbt.maharashtra.gov.in/portal/circulars',
    'VERIFIED', '2026-11-05',
    '["Maharashtra Domicile Certificate", "OBC Caste Certificate", "Tehsildar Certified Income Certificate (<= ₹1.5 Lakh)", "Previous Academic Marksheet", "Fee Receipt & Bonafide Certificate", "Aadhaar Linked Bank Passbook"]'::jsonb,
    '["OBC", "Maharashtra", "MahaDBT", "Scholarship", "Engineering", "College"]'::jsonb,
    'MahaDBT Portal'
),
(
    'MAHA_EBC_SCHOLARSHIP',
    'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)',
    'राजर्षि छत्रपति शाहू महाराज शिक्षण शुल्क शिष्यवृत्ति योजना (EBC)',
    'राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (EBC)',
    'rajarshi-chhatrapati-shahu-maharaj-ebc',
    'Directorate of Higher & Technical Education',
    'Government of Maharashtra',
    'State', 'Maharashtra', 'education',
    'Assistance to economically backward class (EBC) students of General category pursuing higher technical and professional degree courses.',
    'सामान्य वर्ग के आर्थिक रूप से कमजोर (EBC) छात्रों के लिए शिक्षण शुल्क सहायता।',
    'आर्थिकदृष्ट्या दुर्बल घटकातील (EBC) विद्यार्थ्यांना शिक्षण शुल्क सवलत.',
    '["50% reimbursement of tuition and examination fees for government and unaided colleges", "Available for engineering, pharmacy, medical and general degree courses"]'::jsonb,
    'Maharashtra resident; General/EWS category; CAP round admission; Family annual income <= ₹8,00,000.',
    '2026-03-31', TRUE, TRUE, '2025-26',
    'https://mahadbt.maharashtra.gov.in/',
    'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AB0234B3EB41E15',
    'https://dte.maharashtra.gov.in/scholarship',
    'VERIFIED', '2026-11-02',
    '["Domicile Certificate of Maharashtra", "Tehsildar Certified Income Certificate (<= ₹8 Lakhs)", "CAP Allotment Letter", "Previous Year Marksheet with min 50% marks", "Aadhaar Linked Bank Passbook"]'::jsonb,
    '["EBC", "General", "Maharashtra", "MahaDBT", "Degree"]'::jsonb,
    'MahaDBT Portal'
)
ON CONFLICT (id) DO NOTHING;

-- 4. Eligibility Rules
INSERT INTO public.eligibility_rules (id, scheme_id, conditions, is_active) VALUES
(
    'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    'MAHA_OBC_SCHOLARSHIP',
    '[
        {"field": "state", "operator": "equals", "value": "Maharashtra", "label": "State Domicile"},
        {"field": "category", "operator": "equals", "value": "OBC", "label": "Caste Category"},
        {"field": "annualFamilyIncome", "operator": "less_than_or_equal", "value": 150000, "label": "Annual Family Income Limit"},
        {"field": "educationLevel", "operator": "in", "value": ["Undergraduate", "Postgraduate", "Diploma", "Doctoral"], "label": "Eligible Education Level"}
    ]'::jsonb,
    TRUE
),
(
    'd4e5f6a7-b89c-0d1e-2f3a-4b5c6d7e8f9a',
    'MAHA_EBC_SCHOLARSHIP',
    '[
        {"field": "state", "operator": "equals", "value": "Maharashtra", "label": "Maharashtra Domicile"},
        {"field": "category", "operator": "in", "value": ["General", "EWS"], "label": "Social Category"},
        {"field": "annualFamilyIncome", "operator": "less_than_or_equal", "value": 800000, "label": "Annual Family Income Ceiling"}
    ]'::jsonb,
    TRUE
)
ON CONFLICT (id) DO NOTHING;

-- 5. Saved Schemes
INSERT INTO public.saved_schemes (citizen_id, scheme_id) VALUES
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'MAHA_OBC_SCHOLARSHIP'),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'MAHA_EBC_SCHOLARSHIP')
ON CONFLICT DO NOTHING;

-- 6. Documents
INSERT INTO public.documents (
    id, citizen_id, scheme_id, document_type, name, file_name, file_type, file_size,
    status, extracted_data, verified_by_citizen, consent_granted
) VALUES
(
    'e5f6a7b8-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'MAHA_OBC_SCHOLARSHIP',
    'Maharashtra Domicile Certificate',
    'Maharashtra Domicile Certificate',
    'domicile_certificate_maha.pdf',
    'application/pdf',
    '412 KB',
    'Verified by Citizen',
    '{"certificateNumber": "DOM/THN/2023/88921", "candidateName": "Vedant Sharma", "district": "Thane", "issueDate": "2023-06-15"}'::jsonb,
    TRUE, TRUE
),
(
    'f6a7b89c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'MAHA_OBC_SCHOLARSHIP',
    'Income Certificate issued by Tehsildar (<= ₹1.5 Lakh)',
    'Tahsildar Income Certificate',
    'income_certificate_2025_26.pdf',
    'application/pdf',
    '320 KB',
    'Verified by Citizen',
    '{"certificateNumber": "INC/REV/2025/11294", "candidateName": "Vedant Sharma", "annualIncome": "150000", "issuingAuthority": "Tahsildar Office, Thane", "financialYear": "2024-2025"}'::jsonb,
    TRUE, TRUE
)
ON CONFLICT (id) DO NOTHING;

-- 7. Applications
INSERT INTO public.applications (
    id, citizen_id, scheme_id, scheme_title, status, status_attribution,
    form_data, validation_errors, is_approved_by_human, official_portal_url
) VALUES
(
    '01234567-89ab-cdef-0123-456789abcdef',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'MAHA_OBC_SCHOLARSHIP',
    'Post-Matric Scholarship for OBC Students (MahaDBT)',
    'Ready for Official Portal',
    'Officially verified',
    '{"fullName": "Vedant Sharma", "email": "citizen.demo@placepilot.local", "phone": "9876543210", "state": "Maharashtra", "district": "Thane", "pinCode": "401107", "category": "OBC", "annualFamilyIncome": 150000, "institutionName": "Shree L.R. Tiwari College of Engineering", "courseName": "B.Tech Computer Engineering", "currentAcademicYear": "2025-26", "previousMarksPercentage": 84.5}'::jsonb,
    '[]'::jsonb,
    TRUE,
    'https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1BFBEB22E15CB770'
)
ON CONFLICT (id) DO NOTHING;

-- 8. Reminders
INSERT INTO public.reminders (
    id, citizen_id, application_id, title, description, due_date_time, is_completed, priority
) VALUES
(
    '12345678-9abc-def0-1234-56789abcdef0',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '01234567-89ab-cdef-0123-456789abcdef',
    'Verify college fee receipt with registrar office',
    'Ensure college stamp and sign is clear on latest term receipt for MahaDBT upload.',
    '2026-11-15 10:00:00+00',
    FALSE,
    'HIGH'
)
ON CONFLICT (id) DO NOTHING;

-- 9. Approvals
INSERT INTO public.approvals (
    id, application_id, citizen_id, approved_by, ip_hash, audit_checksum, statement
) VALUES
(
    '23456789-abcd-ef01-2345-6789abcdef01',
    '01234567-89ab-cdef-0123-456789abcdef',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Vedant Sharma (citizen.demo@placepilot.local)',
    'sha256-4f8b2c91a7e2',
    'AUDIT-MH-2026-8819',
    'I have personally verified all prefilled data against my original government certificates and authorized this draft for external MahaDBT portal submission.'
)
ON CONFLICT (id) DO NOTHING;

-- 10. Action Logs
INSERT INTO public.action_logs (actor, action, details, level) VALUES
('citizen.demo@placepilot.local', 'HUMAN_APPROVAL_RECORDED', 'Citizen confirmed accuracy of application draft for MahaDBT OBC Scholarship with audit hash AUDIT-MH-2026-8819.', 'SECURITY'),
('system.rules_engine', 'DETERMINISTIC_RULES_EVALUATION', 'Evaluated rule MAHA_OBC_SCHOLARSHIP against citizen profile. Outcome: ELIGIBLE.', 'INFO'),
('admin.demo@placepilot.local', 'SCHEME_SOURCE_VERIFIED', 'MahaDBT official portal URL verified active and accessible.', 'INFO')
ON CONFLICT DO NOTHING;
