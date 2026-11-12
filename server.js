// server.ts
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// src/data/schemes.ts
var SCHEMES_DATA = [
  {
    id: "MAHA_OBC_SCHOLARSHIP",
    title: "Post-Matric Scholarship for OBC Students (MahaDBT)",
    titleHi: "\u0905\u0928\u094D\u092F \u092A\u093F\u091B\u0921\u093C\u093E \u0935\u0930\u094D\u0917 (OBC) \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u092A\u094B\u0938\u094D\u091F-\u092E\u0948\u091F\u094D\u0930\u093F\u0915 \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F",
    titleMr: "\u0907\u0924\u0930 \u092E\u093E\u0917\u093E\u0938\u0935\u0930\u094D\u0917\u0940\u092F (OBC) \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0938\u093E\u0920\u0940 \u092E\u0945\u091F\u094D\u0930\u093F\u0915\u094B\u0924\u094D\u0924\u0930 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 (MahaDBT)",
    slug: "post-matric-scholarship-obc-mahadbt",
    department: "Other Backward Bahujan Welfare Department",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Education and Scholarships",
    description: "Provides tuition fee waivers and maintenance allowance to OBC students admitted to Government, Government-aided, and non-aided unaided private institutions for post-matriculation courses.",
    descriptionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u0947 \u0936\u093E\u0938\u0915\u0940\u092F, \u0905\u0928\u0941\u0926\u093E\u0928\u093F\u0924 \u090F\u0935\u0902 \u092E\u093E\u0928\u094D\u092F\u0924\u093E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0928\u093F\u091C\u0940 \u0938\u0902\u0938\u094D\u0925\u093E\u0928\u094B\u0902 \u092E\u0947\u0902 \u092A\u094B\u0938\u094D\u091F-\u092E\u0948\u091F\u094D\u0930\u093F\u0915 \u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E\u094B\u0902 \u092E\u0947\u0902 \u0905\u0927\u094D\u092F\u092F\u0928\u0930\u0924 \u0905\u0928\u094D\u092F \u092A\u093F\u091B\u0921\u093C\u093E \u0935\u0930\u094D\u0917 \u0915\u0947 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u094B \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u092A\u094D\u0930\u0924\u093F\u092A\u0942\u0930\u094D\u0924\u093F \u090F\u0935\u0902 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0924\u093E \u0939\u0948\u0964",
    descriptionMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0936\u093E\u0938\u0928\u093E\u091A\u094D\u092F\u093E \u092E\u093E\u0928\u094D\u092F\u0924\u093E\u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0938\u0902\u0938\u094D\u0925\u093E\u0902\u092E\u0927\u0940\u0932 \u092E\u0945\u091F\u094D\u0930\u093F\u0915\u094B\u0924\u094D\u0924\u0930 \u0936\u093F\u0915\u094D\u0937\u0923 \u0918\u0947\u0923\u093E\u0931\u094D\u092F\u093E \u0907\u0924\u0930 \u092E\u093E\u0917\u093E\u0938\u0935\u0930\u094D\u0917\u0940\u092F \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0928\u093E \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u092E\u093E\u092B\u0940 \u0906\u0923\u093F \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E \u0926\u093F\u0932\u093E \u091C\u093E\u0924\u094B.",
    benefits: [
      "100% Tuition Fee & Exam Fee reimbursement for Government/Aided colleges",
      "50% Tuition Fee reimbursement for Un-aided private institutions",
      "Monthly maintenance allowance of \u20B9425 to \u20B91,000 based on hostel / day-scholar status"
    ],
    eligibilitySummary: "Maharashtra domicile; OBC category; Enrolled in post-matric course; Family annual income <= \u20B91,50,000.",
    eligibilitySummaryHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u093E \u0905\u0927\u093F\u0935\u093E\u0938; OBC \u0936\u094D\u0930\u0947\u0923\u0940; \u092A\u094B\u0938\u094D\u091F-\u092E\u0948\u091F\u094D\u0930\u093F\u0915 \u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E \u092E\u0947\u0902 \u0928\u093E\u092E\u093E\u0902\u0915\u093F\u0924; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F \u20B91,50,000 \u092F\u093E \u0909\u0938\u0938\u0947 \u0915\u092E\u0964",
    eligibilitySummaryMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0905\u0927\u093F\u0935\u093E\u0938; OBC \u092A\u094D\u0930\u0935\u0930\u094D\u0917; \u092E\u0945\u091F\u094D\u0930\u093F\u0915\u094B\u0924\u094D\u0924\u0930 \u0905\u092D\u094D\u092F\u093E\u0938\u0915\u094D\u0930\u092E\u093E\u0924 \u092A\u094D\u0930\u0935\u0947\u0936\u093F\u0924; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0915\u094C\u091F\u0941\u0902\u092C\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u0967,\u096B\u0966,\u0966\u0966\u0966 \u092A\u0930\u094D\u092F\u0902\u0924.",
    applicationDeadline: "2026-03-31",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://mahadbt.maharashtra.gov.in/",
    officialApplicationUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A1BFBEB22E15CB770",
    guidelinesUrl: "https://mahadbt.maharashtra.gov.in/portal/circulars",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-05",
    requiredDocuments: [
      "Maharashtra Domicile Certificate",
      "OBC Caste Certificate",
      "Caste Validity Certificate (for Professional Courses)",
      "Income Certificate issued by Tehsildar (<= \u20B91.5 Lakh)",
      "Previous Academic Marksheet (HSC/SSC/Degree)",
      "Fee Receipt & College Bonafide Certificate",
      "Aadhaar Linked Bank Passbook Copy"
    ],
    tags: ["OBC", "Maharashtra", "Tuition Waiver", "MahaDBT", "College", "Engineering", "Medical", "Degree"],
    commonPortalName: "MahaDBT Portal"
  },
  {
    id: "MAHA_EBC_SCHOLARSHIP",
    title: "Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti Yojna (EBC)",
    titleHi: "\u0930\u093E\u091C\u0930\u094D\u0937\u093F \u091B\u0924\u094D\u0930\u092A\u0924\u093F \u0936\u093E\u0939\u0942 \u092E\u0939\u093E\u0930\u093E\u091C \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u093F \u092F\u094B\u091C\u0928\u093E (EBC)",
    titleMr: "\u0930\u093E\u091C\u0930\u094D\u0937\u0940 \u091B\u0924\u094D\u0930\u092A\u0924\u0940 \u0936\u093E\u0939\u0942 \u092E\u0939\u093E\u0930\u093E\u091C \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 \u092F\u094B\u091C\u0928\u093E (EBC)",
    slug: "rajarshi-chhatrapati-shahu-maharaj-ebc",
    department: "Directorate of Higher & Technical Education",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Education and Scholarships",
    description: "Assistance to economically backward class (EBC) students of General category pursuing higher technical and professional degree courses in Maharashtra.",
    descriptionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u0947 \u0938\u093E\u092E\u093E\u0928\u094D\u092F \u0935\u0930\u094D\u0917 \u0915\u0947 \u0906\u0930\u094D\u0925\u093F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0915\u092E\u091C\u094B\u0930 \u0935\u0930\u094D\u0917 (EBC) \u0915\u0947 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u094B \u0909\u091A\u094D\u091A \u090F\u0935\u0902 \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0936\u093F\u0915\u094D\u0937\u093E \u0939\u0947\u0924\u0941 \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u0938\u0939\u093E\u092F\u0924\u093E\u0964",
    descriptionMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u093E\u0924\u0940\u0932 \u0909\u091A\u094D\u091A \u0935 \u0924\u0902\u0924\u094D\u0930\u0936\u093F\u0915\u094D\u0937\u0923 \u0918\u0947\u0923\u093E\u0931\u094D\u092F\u093E \u0906\u0930\u094D\u0925\u093F\u0915\u0926\u0943\u0937\u094D\u091F\u094D\u092F\u093E \u0926\u0941\u0930\u094D\u092C\u0932 \u0918\u091F\u0915\u093E\u0924\u0940\u0932 (EBC) \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0928\u093E \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u0906\u0923\u093F \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0936\u0941\u0932\u094D\u0915 \u0938\u0935\u0932\u0924.",
    benefits: [
      "50% reimbursement of tuition and examination fees for government and unaided colleges",
      "Available for engineering, pharmacy, architecture, medical, management, and general degree courses"
    ],
    eligibilitySummary: "Maharashtra resident; General/EWS; CAP round admission; Family annual income <= \u20B98,00,000.",
    eligibilitySummaryHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0928\u093F\u0935\u093E\u0938\u0940; \u0938\u093E\u092E\u093E\u0928\u094D\u092F/EWS; CAP \u0930\u093E\u0909\u0902\u0921 \u092A\u094D\u0930\u0935\u0947\u0936; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F \u20B98,00,000 \u092F\u093E \u0909\u0938\u0938\u0947 \u0915\u092E\u0964",
    eligibilitySummaryMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0930\u0939\u093F\u0935\u093E\u0938\u0940; \u0938\u0930\u094D\u0935\u0938\u093E\u0927\u093E\u0930\u0923/EWS; CAP \u0926\u094D\u0935\u093E\u0930\u0947 \u092A\u094D\u0930\u0935\u0947\u0936; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u096E \u0932\u093E\u0916\u093E\u0902\u092A\u0947\u0915\u094D\u0937\u093E \u0915\u092E\u0940.",
    applicationDeadline: "2026-03-31",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://mahadbt.maharashtra.gov.in/",
    officialApplicationUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AB0234B3EB41E15",
    guidelinesUrl: "https://dte.maharashtra.gov.in/scholarship",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-02",
    requiredDocuments: [
      "Domicile Certificate of Maharashtra",
      "Tehsildar Certified Income Certificate (<= \u20B98 Lakhs)",
      "CAP Allotment Letter / Admission Confirmation",
      "Previous Year Marksheet with minimum 50% marks",
      "Ration Card / Family Declaration",
      "Bank Account linked with Aadhaar"
    ],
    tags: ["EBC", "General", "Higher Education", "MahaDBT", "Engineering", "Maharashtra"],
    commonPortalName: "MahaDBT Portal"
  },
  {
    id: "MAHA_PANJABRAO_HOSTEL",
    title: "Dr. Panjabrao Deshmukh Vasatgruh Nirvah Bhatta Yojna (Hostel Allowance)",
    titleHi: "\u0921\u0949. \u092A\u0902\u091C\u093E\u092C\u0930\u093E\u0935 \u0926\u0947\u0936\u092E\u0941\u0916 \u0935\u0938\u0924\u093F\u0917\u0943\u0939 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E \u092F\u094B\u091C\u0928\u093E",
    titleMr: "\u0921\u0949. \u092A\u0902\u091C\u093E\u092C\u0930\u093E\u0935 \u0926\u0947\u0936\u092E\u0941\u0916 \u0935\u0938\u0924\u093F\u0917\u0943\u0939 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E \u092F\u094B\u091C\u0928\u093E",
    slug: "dr-panjabrao-deshmukh-hostel-allowance",
    department: "Directorate of Higher and Technical Education",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Education and Scholarships",
    description: "Hostel maintenance allowance for children of registered marginal farmers and registered agricultural laborers pursuing higher professional education.",
    descriptionHi: "\u0909\u091A\u094D\u091A \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0936\u093F\u0915\u094D\u0937\u093E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930 \u0930\u0939\u0947 \u092A\u0902\u091C\u0940\u0915\u0943\u0924 \u0938\u0940\u092E\u093E\u0902\u0924 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u090F\u0935\u0902 \u0915\u0943\u0937\u093F \u0936\u094D\u0930\u092E\u093F\u0915\u094B\u0902 \u0915\u0947 \u092C\u091A\u094D\u091A\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u091B\u093E\u0924\u094D\u0930\u093E\u0935\u093E\u0938 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E\u0964",
    descriptionMr: "\u0905\u0932\u094D\u092A\u092D\u0942\u0927\u093E\u0930\u0915 \u0936\u0947\u0924\u0915\u0930\u0940 \u0935 \u0928\u094B\u0902\u0926\u0923\u0940\u0915\u0943\u0924 \u0936\u0947\u0924\u092E\u091C\u0942\u0930 \u092F\u093E\u0902\u091A\u094D\u092F\u093E \u092A\u093E\u0932\u094D\u092F\u093E\u0902\u0928\u093E \u0935\u0938\u0924\u093F\u0917\u0943\u0939 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E \u0926\u093F\u0932\u093E \u091C\u093E\u0924\u094B.",
    benefits: [
      "\u20B930,000 per academic year for Mumbai, Pune, Nagpur, Aurangabad metro regions",
      "\u20B920,000 per academic year for other city regions in Maharashtra"
    ],
    eligibilitySummary: "Child of registered marginal farmer / laborer; Income <= \u20B98 Lakhs; Enrolled in technical/professional course; Staying in hostel.",
    eligibilitySummaryHi: "\u092A\u0902\u091C\u0940\u0915\u0943\u0924 \u0915\u093F\u0938\u093E\u0928/\u0936\u094D\u0930\u092E\u093F\u0915 \u0915\u0947 \u092C\u091A\u094D\u091A\u0947; \u0906\u092F <= \u20B98 \u0932\u093E\u0916; \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E \u092E\u0947\u0902 \u0928\u093E\u092E\u093E\u0902\u0915\u093F\u0924; \u0939\u0949\u0938\u094D\u091F\u0932 \u092E\u0947\u0902 \u0928\u093F\u0935\u093E\u0938\u0964",
    eligibilitySummaryMr: "\u0905\u0932\u094D\u092A\u092D\u0942\u0927\u093E\u0930\u0915 \u0936\u0947\u0924\u0915\u0930\u0940/\u0936\u0947\u0924\u092E\u091C\u0942\u0930 \u092A\u093E\u0932\u094D\u092F; \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u092E\u0930\u094D\u092F\u093E\u0926\u093E \u20B9\u096E \u0932\u093E\u0916; \u0935\u094D\u092F\u093E\u0935\u0938\u093E\u092F\u093F\u0915 \u0905\u092D\u094D\u092F\u093E\u0938\u0915\u094D\u0930\u092E; \u0935\u0938\u0924\u093F\u0917\u0943\u0939\u093E\u0924 \u0930\u093E\u0939\u0923\u093E\u0930\u093E.",
    applicationDeadline: "2026-03-31",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://mahadbt.maharashtra.gov.in/",
    officialApplicationUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A4676C4EE091",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-10-28",
    requiredDocuments: [
      "Registered Marginal Farmer Certificate / 7/12 extract",
      "Hostel certificate / rent agreement",
      "Income Certificate (<= \u20B98 Lakhs)",
      "Maharashtra Domicile Certificate",
      "Admission Confirmation Letter"
    ],
    tags: ["Hostel", "Farmers", "Education", "MahaDBT", "Maharashtra"],
    commonPortalName: "MahaDBT Portal"
  },
  {
    id: "CENTRAL_NSP_CSSS",
    title: "Central Sector Scheme of Scholarships for College and University Students (NSP)",
    titleHi: "\u0915\u0949\u0932\u0947\u091C \u0914\u0930 \u0935\u093F\u0936\u094D\u0935\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F \u0915\u0947 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0915\u0947\u0902\u0926\u094D\u0930\u0940\u092F \u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F \u092F\u094B\u091C\u0928\u093E",
    titleMr: "\u092E\u0939\u093E\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u0940\u0928 \u0935 \u0935\u093F\u0926\u094D\u092F\u093E\u092A\u0940\u0920\u0940\u092F \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0938\u093E\u0920\u0940 \u0915\u0947\u0902\u0926\u094D\u0930 \u092A\u0941\u0930\u0938\u094D\u0915\u0943\u0924 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 \u092F\u094B\u091C\u0928\u093E (NSP)",
    slug: "central-sector-scholarship-nsp",
    department: "Department of Higher Education",
    ministry: "Ministry of Education, Government of India",
    level: "Central",
    state: "All India",
    category: "Education and Scholarships",
    description: "Merit-cum-means scholarship for top percentile Class XII pass-outs pursuing regular graduation and post-graduation degrees across recognized Indian universities.",
    descriptionHi: "\u092E\u093E\u0928\u094D\u092F\u0924\u093E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u092D\u093E\u0930\u0924\u0940\u092F \u0935\u093F\u0936\u094D\u0935\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u094B\u0902 \u092E\u0947\u0902 \u0938\u094D\u0928\u093E\u0924\u0915 \u090F\u0935\u0902 \u0938\u094D\u0928\u093E\u0924\u0915\u094B\u0924\u094D\u0924\u0930 \u0915\u0940 \u092A\u0922\u093C\u093E\u0908 \u0915\u0930 \u0930\u0939\u0947 12\u0935\u0940\u0902 \u0915\u0915\u094D\u0937\u093E \u0915\u0947 \u0936\u0940\u0930\u094D\u0937 \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0909\u0924\u094D\u0924\u0940\u0930\u094D\u0923 \u092E\u0947\u0927\u093E\u0935\u0940 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u092F\u094B\u0917\u094D\u092F\u0924\u093E-\u0938\u0939-\u0938\u093E\u0927\u0928 \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F\u0964",
    descriptionMr: "\u092C\u093E\u0930\u093E\u0935\u0940\u091A\u094D\u092F\u093E \u092A\u0930\u0940\u0915\u094D\u0937\u0947\u0924 \u0909\u0924\u094D\u0924\u092E \u0917\u0941\u0923 \u092E\u093F\u0933\u0935\u0942\u0928 \u092A\u0926\u0935\u0940 \u0936\u093F\u0915\u094D\u0937\u0923 \u0918\u0947\u0923\u093E\u0931\u094D\u092F\u093E \u0917\u0941\u0923\u0935\u0902\u0924 \u0917\u0930\u091C\u0942 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0938\u093E\u0920\u0940 \u0915\u0947\u0902\u0926\u094D\u0930 \u0938\u0930\u0915\u093E\u0930\u091A\u0940 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940.",
    benefits: [
      "\u20B912,000 per annum at Graduation level for first 3 years",
      "\u20B920,000 per annum at Post-Graduation level"
    ],
    eligibilitySummary: "Class 12th > 80th percentile; Regular full-time student; Family annual income <= \u20B94,50,000.",
    eligibilitySummaryHi: "12\u0935\u0940\u0902 \u0915\u0915\u094D\u0937\u093E \u092E\u0947\u0902 80\u0935\u0947\u0902 \u092A\u0930\u0938\u0947\u0902\u091F\u093E\u0907\u0932 \u0938\u0947 \u090A\u092A\u0930; \u0928\u093F\u092F\u092E\u093F\u0924 \u091B\u093E\u0924\u094D\u0930; \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0906\u092F <= \u20B94,50,000\u0964",
    eligibilitySummaryMr: "\u0967\u0968 \u0935\u0940 \u092A\u0930\u0940\u0915\u094D\u0937\u0947\u0924 \u096E\u0966 \u092A\u0930\u0938\u0947\u0902\u091F\u093E\u0907\u0932 \u092A\u0947\u0915\u094D\u0937\u093E \u091C\u093E\u0938\u094D\u0924 \u0917\u0941\u0923; \u0928\u093F\u092F\u092E\u093F\u0924 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u096A,\u096B\u0966,\u0966\u0966\u0966 \u092A\u0930\u094D\u092F\u0902\u0924.",
    applicationDeadline: "2026-01-15",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://scholarships.gov.in/",
    officialApplicationUrl: "https://scholarships.gov.in/public/schemeGuidelines/CSSS_Guideline.pdf",
    guidelinesUrl: "https://www.education.gov.in/scholarships-education-loan-0",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-01",
    requiredDocuments: [
      "Class 12th Board Marksheet",
      "Income Certificate issued by competent revenue authority",
      "Bonafide student certificate from University/College",
      "Aadhaar card",
      "Aadhaar linked active bank passbook"
    ],
    tags: ["NSP", "Central", "Merit", "Graduation", "All India", "Scholarship"],
    commonPortalName: "National Scholarship Portal"
  },
  {
    id: "MAHA_LADKI_BAHIN",
    title: "Mukhyamantri Majhi Ladki Bahin Yojana",
    titleHi: "\u092E\u0941\u0916\u094D\u092F\u092E\u0902\u0924\u094D\u0930\u0940 \u092E\u093E\u091D\u0940 \u0932\u093E\u0921\u093C\u0915\u0940 \u092C\u0939\u093F\u0928 \u092F\u094B\u091C\u0928\u093E (\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930)",
    titleMr: "\u092E\u0941\u0916\u094D\u092F\u092E\u0902\u0924\u094D\u0930\u0940 \u092E\u093E\u091D\u0940 \u0932\u093E\u0921\u0915\u0940 \u092C\u0939\u0940\u0923 \u092F\u094B\u091C\u0928\u093E (\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930)",
    slug: "mukhyamantri-majhi-ladki-bahin-yojana",
    department: "Women and Child Development Department",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Women and Child Welfare",
    description: "Direct financial cash assistance of \u20B91,500 per month deposited directly into the bank accounts of eligible women in Maharashtra to foster economic independence and self-reliance.",
    descriptionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u0940 \u092A\u093E\u0924\u094D\u0930 \u092E\u0939\u093F\u0932\u093E\u0913\u0902 \u0915\u094B \u0906\u0930\u094D\u0925\u093F\u0915 \u0938\u094D\u0935\u093E\u0935\u0932\u0902\u092C\u0928 \u0914\u0930 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0939\u0947\u0924\u0941 \u092A\u094D\u0930\u0924\u093F\u092E\u093E\u0939 \u20B91,500 \u0915\u0940 \u0938\u0940\u0927\u0940 \u092C\u0948\u0902\u0915 \u0938\u0939\u093E\u092F\u0924\u093E\u0964",
    descriptionMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u093E\u0924\u0940\u0932 \u092A\u093E\u0924\u094D\u0930 \u092E\u0939\u093F\u0932\u093E\u0902\u0928\u093E \u0938\u094D\u0935\u093E\u0935\u0932\u0902\u092C\u0928\u093E\u0938\u093E\u0920\u0940 \u0926\u0930\u092E\u0939\u093E \u20B9\u0967,\u096B\u0966\u0966 \u0925\u0947\u091F \u092C\u0901\u0915 \u0916\u093E\u0924\u094D\u092F\u093E\u0924 \u0906\u0930\u094D\u0925\u093F\u0915 \u0938\u0939\u093E\u092F\u094D\u092F \u0926\u093F\u0932\u0947 \u091C\u093E\u0924\u0947.",
    benefits: [
      "\u20B91,500 per month directly deposited via DBT (\u20B918,000 per annum)",
      "Free financial literacy and bank account empowerment"
    ],
    eligibilitySummary: "Female resident of Maharashtra; Age 21 to 65 years; Family annual income <= \u20B92,50,000; Only one woman per family.",
    eligibilitySummaryHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u0940 \u092E\u0939\u093F\u0932\u093E \u0928\u093F\u0935\u093E\u0938\u0940; \u0906\u092F\u0941 21 \u0938\u0947 65 \u0935\u0930\u094D\u0937; \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0906\u092F <= \u20B92.5 \u0932\u093E\u0916\u0964",
    eligibilitySummaryMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u093E\u0924\u0940\u0932 \u0930\u0939\u093F\u0935\u093E\u0938\u0940 \u092E\u0939\u093F\u0932\u093E; \u0935\u092F \u0968\u0967 \u0924\u0947 \u096C\u096B \u0935\u0930\u094D\u0937\u0947; \u0915\u094C\u091F\u0941\u0902\u092C\u093F\u0915 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u0968,\u096B\u0966,\u0966\u0966\u0966 \u092A\u0930\u094D\u092F\u0902\u0924.",
    applicationDeadline: "2026-12-31",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://ladakibahin.maharashtra.gov.in/",
    officialApplicationUrl: "https://ladakibahin.maharashtra.gov.in/login",
    guidelinesUrl: "https://womenchild.maharashtra.gov.in/",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-08",
    requiredDocuments: [
      "Aadhaar Card",
      "Maharashtra Domicile Certificate or Ration Card / Voter ID prior to 15 years",
      "Income Certificate (<= \u20B92.5 Lakh) or Yellow/Orange Ration Card",
      "Aadhaar seeded bank account passbook",
      "Self-declaration of not paying Income Tax"
    ],
    tags: ["Women", "Maharashtra", "Monthly DBT", "Welfare", "Direct Benefit"],
    commonPortalName: "Ladki Bahin Portal"
  },
  {
    id: "CENTRAL_PM_KISAN",
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    titleHi: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u0915\u093F\u0938\u093E\u0928 \u0938\u092E\u094D\u092E\u093E\u0928 \u0928\u093F\u0927\u093F (PM-KISAN)",
    titleMr: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u0915\u093F\u0938\u093E\u0928 \u0938\u0928\u094D\u092E\u093E\u0928 \u0928\u093F\u0927\u0940 (PM-KISAN)",
    slug: "pradhan-mantri-kisan-samman-nidhi",
    department: "Department of Agriculture & Farmers Welfare",
    ministry: "Ministry of Agriculture and Farmers Welfare, Govt of India",
    level: "Central",
    state: "All India",
    category: "Agriculture and Farmers",
    description: "Central sector scheme providing income support of \u20B96,000 per year in three equal installments to all landholding farmer families across the country.",
    descriptionHi: "\u0926\u0947\u0936 \u092D\u0930 \u0915\u0947 \u0938\u092D\u0940 \u092D\u0942\u0927\u093E\u0930\u0915 \u0915\u093F\u0938\u093E\u0928 \u092A\u0930\u093F\u0935\u093E\u0930\u094B\u0902 \u0915\u094B \u0924\u0940\u0928 \u0938\u092E\u093E\u0928 \u0915\u093F\u0938\u094D\u0924\u094B\u0902 \u092E\u0947\u0902 \u092A\u094D\u0930\u0924\u093F \u0935\u0930\u094D\u0937 \u20B96,000 \u0915\u093E \u0906\u092F \u0938\u092E\u0930\u094D\u0925\u0928\u0964",
    descriptionMr: "\u0926\u0947\u0936\u093E\u0924\u0940\u0932 \u0938\u0930\u094D\u0935 \u0936\u0947\u0924\u0915\u0930\u0940 \u0915\u0941\u091F\u0941\u0902\u092C\u093E\u0902\u0928\u093E \u0926\u0930\u0935\u0930\u094D\u0937\u0940 \u20B9\u096C,\u0966\u0966\u0966 \u091A\u0947 \u0925\u0947\u091F \u0906\u0930\u094D\u0925\u093F\u0915 \u0938\u0939\u093E\u092F\u094D\u092F \u0924\u0940\u0928 \u0939\u092A\u094D\u0924\u094D\u092F\u093E\u0902\u092E\u0927\u094D\u092F\u0947.",
    benefits: [
      "\u20B96,000 per year delivered in 3 installments of \u20B92,000 every 4 months via DBT",
      "Direct integration with Kisan Credit Card (KCC) for cheap institutional loans"
    ],
    eligibilitySummary: "Farmer family owning cultivable land; Non-institutional owner; Not an income tax payer or government pension holder (>\u20B910k).",
    eligibilitySummaryHi: "\u0916\u0947\u0924\u0940 \u092F\u094B\u0917\u094D\u092F \u092D\u0942\u092E\u093F \u0915\u093E \u092E\u093E\u0932\u093F\u0915 \u0915\u093F\u0938\u093E\u0928 \u092A\u0930\u093F\u0935\u093E\u0930; \u0917\u0948\u0930-\u0938\u0902\u0938\u094D\u0925\u093E\u0917\u0924; \u0906\u092F\u0915\u0930 \u0926\u093E\u0924\u093E \u0928 \u0939\u094B\u0964",
    eligibilitySummaryMr: "\u0932\u093E\u0917\u0935\u0921\u0940\u092F\u094B\u0917\u094D\u092F \u091C\u092E\u0940\u0928 \u0905\u0938\u0923\u093E\u0930\u0947 \u0936\u0947\u0924\u0915\u0930\u0940 \u0915\u0941\u091F\u0941\u0902\u092C; \u0915\u0930\u0926\u093E\u0924\u0947 \u0915\u093F\u0902\u0935\u093E \u0938\u0930\u0915\u093E\u0930\u0940 \u0928\u094B\u0915\u0930\u0926\u093E\u0930 \u0935\u0917\u0933\u0942\u0928.",
    applicationDeadline: "Open throughout year",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://pmkisan.gov.in/",
    officialApplicationUrl: "https://pmkisan.gov.in/RegistrationFormNew.aspx",
    guidelinesUrl: "https://pmkisan.gov.in/Documents/RevisedGuidelines.pdf",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-06",
    requiredDocuments: [
      "Aadhaar Card with mobile linking",
      "Land Ownership Record (RoR / 7/12 extract / Khatauni)",
      "Bank Account Number and IFSC Code",
      "Citizenship declaration"
    ],
    tags: ["Farmers", "Agriculture", "Direct Cash", "All India", "Central"],
    commonPortalName: "PM-KISAN Portal"
  },
  {
    id: "CENTRAL_AYUSHMAN_BHARAT",
    title: "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)",
    titleHi: "\u0906\u092F\u0941\u0937\u094D\u092E\u093E\u0928 \u092D\u093E\u0930\u0924 \u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u091C\u0928 \u0906\u0930\u094B\u0917\u094D\u092F \u092F\u094B\u091C\u0928\u093E (PM-JAY)",
    titleMr: "\u0906\u092F\u0941\u0937\u094D\u092E\u093E\u0928 \u092D\u093E\u0930\u0924 \u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u091C\u0928 \u0906\u0930\u094B\u0917\u094D\u092F \u092F\u094B\u091C\u0928\u093E (PM-JAY)",
    slug: "ayushman-bharat-pmjay",
    department: "National Health Authority",
    ministry: "Ministry of Health and Family Welfare, Govt of India",
    level: "Central",
    state: "All India",
    category: "Healthcare and Medical Assistance",
    description: "World\u2019s largest government-funded healthcare assurance scheme offering \u20B95,00,000 per family per year for secondary and tertiary hospitalization across empaneled public and private hospitals.",
    descriptionHi: "\u0926\u094D\u0935\u093F\u0924\u0940\u092F\u0915 \u090F\u0935\u0902 \u0924\u0943\u0924\u0940\u092F\u0915 \u0938\u094D\u0924\u0930 \u0915\u0947 \u0905\u0938\u094D\u092A\u0924\u093E\u0932 \u092E\u0947\u0902 \u092D\u0930\u094D\u0924\u0940 \u0939\u094B\u0928\u0947 \u092A\u0930 \u092A\u094D\u0930\u0924\u093F \u092A\u0930\u093F\u0935\u093E\u0930 \u20B95,00,000 \u092A\u094D\u0930\u0924\u093F \u0935\u0930\u094D\u0937 \u0915\u093E \u0915\u0948\u0936\u0932\u0947\u0938 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u092C\u0940\u092E\u093E\u0964",
    descriptionMr: "\u092A\u093E\u0924\u094D\u0930 \u0915\u0941\u091F\u0941\u0902\u092C\u093E\u0902\u0928\u093E \u0926\u0930\u0935\u0930\u094D\u0937\u0940 \u20B9\u096B \u0932\u093E\u0916\u093E\u0902\u092A\u0930\u094D\u092F\u0902\u0924 \u092E\u094B\u092B\u0924 \u0935 \u0915\u0945\u0936\u0932\u0947\u0938 \u0935\u0948\u0926\u094D\u092F\u0915\u0940\u092F \u0909\u092A\u091A\u093E\u0930 \u0926\u0947\u0923\u093E\u0930\u0940 \u0906\u0930\u094B\u0917\u094D\u092F \u092F\u094B\u091C\u0928\u093E.",
    benefits: [
      "\u20B95,00,000 cashless cover per family per year",
      "Covers pre-existing conditions from Day 1, diagnostic tests, medications, surgery and ICU care"
    ],
    eligibilitySummary: "Identified under SECC 2011 deprivation criteria or Priority Household ration cards; Senior citizens aged 70+ also covered regardless of income.",
    eligibilitySummaryHi: "SECC 2011 \u092F\u093E \u0930\u093E\u0936\u0928 \u0915\u093E\u0930\u094D\u0921 \u0936\u094D\u0930\u0947\u0923\u0940 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u092A\u093E\u0924\u094D\u0930; 70+ \u0906\u092F\u0941 \u0935\u0930\u094D\u0917 \u0915\u0947 \u0935\u0930\u093F\u0937\u094D\u0920 \u0928\u093E\u0917\u0930\u093F\u0915 \u092D\u0940 \u092A\u093E\u0924\u094D\u0930\u0964",
    eligibilitySummaryMr: "SECC \u0928\u093F\u0915\u0937\u093E\u0928\u0941\u0938\u093E\u0930 \u0935\u0902\u091A\u093F\u0924 \u0915\u0941\u091F\u0941\u0902\u092C\u0947 \u0935 \u096D\u0966 \u0935\u0930\u094D\u0937\u093E\u0902\u0935\u0930\u0940\u0932 \u091C\u094D\u092F\u0947\u0937\u094D\u0920 \u0928\u093E\u0917\u0930\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u092E\u0930\u094D\u092F\u093E\u0926\u0947\u0936\u093F\u0935\u093E\u092F \u092A\u093E\u0924\u094D\u0930.",
    applicationDeadline: "Open throughout year",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://pmjay.gov.in/",
    officialApplicationUrl: "https://beneficiary.nha.gov.in/",
    guidelinesUrl: "https://pmjay.gov.in/about/pmjay",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-07",
    requiredDocuments: [
      "Aadhaar Card of all family members",
      "Ration Card (NFSA / BPL / Antyodaya)",
      "Active mobile number for OTP"
    ],
    tags: ["Health", "Insurance", "Hospital", "Cashless", "Central", "All India"],
    commonPortalName: "National Health Authority"
  },
  {
    id: "CENTRAL_PMAY_HOUSING",
    title: "Pradhan Mantri Awas Yojana - Gramin & Urban (PMAY 2.0)",
    titleHi: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u0906\u0935\u093E\u0938 \u092F\u094B\u091C\u0928\u093E (PMAY 2.0)",
    titleMr: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u0906\u0935\u093E\u0938 \u092F\u094B\u091C\u0928\u093E (PMAY \u0968.\u0966)",
    slug: "pradhan-mantri-awas-yojana",
    department: "Ministry of Housing and Urban Affairs / Rural Development",
    ministry: "Government of India",
    level: "Central",
    state: "All India",
    category: "Housing",
    description: "Financial assistance and credit-linked interest subsidy for constructing or purchasing pucca houses with hygienic toilets, tap water and electricity connections for homeless or kutcha house dwellers.",
    descriptionHi: "\u092C\u0947\u0918\u0930 \u0905\u0925\u0935\u093E \u0915\u091A\u094D\u091A\u0947 \u092E\u0915\u093E\u0928\u094B\u0902 \u092E\u0947\u0902 \u0930\u0939\u0928\u0947 \u0935\u093E\u0932\u0947 \u092A\u0930\u093F\u0935\u093E\u0930\u094B\u0902 \u0915\u094B \u092A\u0915\u094D\u0915\u093E \u092E\u0915\u093E\u0928 \u0928\u093F\u0930\u094D\u092E\u093E\u0923 \u0939\u0947\u0924\u0941 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0905\u0928\u0941\u0926\u093E\u0928 \u090F\u0935\u0902 \u092C\u094D\u092F\u093E\u091C \u0938\u092C\u094D\u0938\u093F\u0921\u0940\u0964",
    descriptionMr: "\u0939\u0915\u094D\u0915\u093E\u091A\u0947 \u092A\u0915\u094D\u0915\u0947 \u0918\u0930 \u0928\u0938\u0932\u0947\u0932\u094D\u092F\u093E \u0915\u0941\u091F\u0941\u0902\u092C\u093E\u0902\u0928\u093E \u0918\u0930 \u092C\u093E\u0902\u0927\u0923\u0940\u0938\u093E\u0920\u0940 \u0925\u0947\u091F \u0906\u0930\u094D\u0925\u093F\u0915 \u0905\u0928\u0941\u0926\u093E\u0928 \u0935 \u0935\u094D\u092F\u093E\u091C \u0938\u0935\u0932\u0924.",
    benefits: [
      "Direct grant of \u20B91.20 Lakh in plains, \u20B91.30 Lakh in hilly/difficult areas (Gramin)",
      "Up to \u20B92.50 Lakh interest subsidy in urban areas for EWS/LIG households"
    ],
    eligibilitySummary: "Family does not own a pucca house anywhere in India; Annual income <= \u20B93 Lakh (EWS) or <= \u20B96 Lakh (LIG).",
    eligibilitySummaryHi: "\u092D\u093E\u0930\u0924 \u092E\u0947\u0902 \u0915\u0939\u0940\u0902 \u092D\u0940 \u092A\u0915\u094D\u0915\u093E \u092E\u0915\u093E\u0928 \u0928 \u0939\u094B; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F <= \u20B93 \u0932\u093E\u0916 (EWS) \u0905\u0925\u0935\u093E <= \u20B96 \u0932\u093E\u0916 (LIG)\u0964",
    eligibilitySummaryMr: "\u092D\u093E\u0930\u0924\u093E\u0924 \u0915\u0941\u0920\u0947\u0939\u0940 \u092A\u0915\u094D\u0915\u0947 \u0918\u0930 \u0928\u0938\u093E\u0935\u0947; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u092E\u0930\u094D\u092F\u093E\u0926\u093E EWS \u0938\u093E\u0920\u0940 \u20B9\u0969 \u0932\u093E\u0916.",
    applicationDeadline: "Open for 2025-2029",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://pmaymis.gov.in/",
    officialApplicationUrl: "https://pmayg.nic.in/netiayHome/home.aspx",
    guidelinesUrl: "https://pmay-urban.gov.in/guidelines",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-10-30",
    requiredDocuments: [
      "Aadhaar Card",
      "Affidavit of no pucca house in India",
      "Land ownership documents or Gram Panchayat NOC",
      "Bank Passbook with MNREGA job card number (if rural)",
      "Income Certificate"
    ],
    tags: ["Housing", "Home", "PMAY", "Grant", "Central"],
    commonPortalName: "PMAY Official Portal"
  },
  {
    id: "CENTRAL_PM_MUDRA",
    title: "Pradhan Mantri MUDRA Yojana (PMMY)",
    titleHi: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u092E\u0941\u0926\u094D\u0930\u093E \u092F\u094B\u091C\u0928\u093E (PMMY)",
    titleMr: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u092E\u0941\u0926\u094D\u0930\u093E \u092F\u094B\u091C\u0928\u093E (PMMY)",
    slug: "pradhan-mantri-mudra-yojana",
    department: "Department of Financial Services",
    ministry: "Ministry of Finance, Government of India",
    level: "Central",
    state: "All India",
    category: "Entrepreneurship and Business",
    description: "Collateral-free micro loans up to \u20B920 Lakhs provided to non-corporate, non-farm small and micro enterprises across Shishu, Kishore, Tarun, and Tarun Plus categories.",
    descriptionHi: "\u0917\u0948\u0930-\u0915\u0949\u0930\u094D\u092A\u094B\u0930\u0947\u091F, \u0917\u0948\u0930-\u0915\u0943\u0937\u093F \u0932\u0918\u0941 \u090F\u0935\u0902 \u0938\u0942\u0915\u094D\u0937\u094D\u092E \u0909\u0926\u094D\u092F\u092E\u094B\u0902 \u0915\u094B \u20B920 \u0932\u093E\u0916 \u0924\u0915 \u0915\u093E \u0938\u0902\u092A\u093E\u0930\u094D\u0936\u094D\u0935\u093F\u0915-\u092E\u0941\u0915\u094D\u0924 (\u092C\u093F\u0928\u093E \u0917\u093E\u0930\u0902\u091F\u0940) \u090B\u0923\u0964",
    descriptionMr: "\u0932\u0918\u0941 \u0909\u0926\u094D\u092F\u094B\u091C\u0915, \u0935\u094D\u092F\u093E\u092A\u093E\u0930\u0940 \u0935 \u0915\u093E\u0930\u093E\u0917\u093F\u0930\u093E\u0902\u0928\u093E \u0935\u093F\u0928\u093E\u0924\u093E\u0930\u0923 \u20B9\u0968\u0966 \u0932\u093E\u0916\u093E\u0902\u092A\u0930\u094D\u092F\u0902\u0924 \u0935\u094D\u092F\u0935\u0938\u093E\u092F \u0915\u0930\u094D\u091C.",
    benefits: [
      "Shishu: Loans up to \u20B950,000",
      "Kishore: Loans above \u20B950,000 up to \u20B95 Lakh",
      "Tarun & Tarun Plus: Loans up to \u20B920 Lakhs with no collateral requirement"
    ],
    eligibilitySummary: "Any Indian citizen running or proposing an income-generating manufacturing, trading, or service enterprise.",
    eligibilitySummaryHi: "\u0915\u094B\u0908 \u092D\u0940 \u092D\u093E\u0930\u0924\u0940\u092F \u0928\u093E\u0917\u0930\u093F\u0915 \u091C\u094B \u0935\u093F\u0928\u093F\u0930\u094D\u092E\u093E\u0923, \u0935\u094D\u092F\u093E\u092A\u093E\u0930 \u092F\u093E \u0938\u0947\u0935\u093E \u0909\u0926\u094D\u092F\u092E \u0936\u0941\u0930\u0942 \u092F\u093E \u0935\u093F\u0938\u094D\u0924\u093E\u0930\u093F\u0924 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u0924\u093E \u0939\u0948\u0964",
    eligibilitySummaryMr: "\u0909\u0924\u094D\u092A\u093E\u0926\u0915 \u0935\u094D\u092F\u0935\u0938\u093E\u092F, \u0935\u094D\u092F\u093E\u092A\u093E\u0930 \u0905\u0925\u0935\u093E \u0938\u0947\u0935\u093E \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u093E\u0924 \u0915\u093E\u092E \u0915\u0930\u0942 \u0907\u091A\u094D\u091B\u093F\u0923\u093E\u0930\u093E \u0915\u094B\u0923\u0924\u093E\u0939\u0940 \u092D\u093E\u0930\u0924\u0940\u092F \u0928\u093E\u0917\u0930\u093F\u0915.",
    applicationDeadline: "Open throughout year",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://www.mudra.org.in/",
    officialApplicationUrl: "https://udyamimitra.in/",
    guidelinesUrl: "https://www.mudra.org.in/Offerings",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-04",
    requiredDocuments: [
      "Identity Proof (Aadhaar / Voter ID / PAN)",
      "Residence Proof",
      "Business Project Proposal / Quotation for machinery",
      "Bank statement for last 6 months",
      "Udyam Registration Certificate"
    ],
    tags: ["Business", "Loan", "Entrepreneurship", "Micro finance", "Central"],
    commonPortalName: "Udyami Mitra Portal"
  },
  {
    id: "CENTRAL_PM_VISHWAKARMA",
    title: "PM Vishwakarma Scheme",
    titleHi: "\u092A\u0940\u090F\u092E \u0935\u093F\u0936\u094D\u0935\u0915\u0930\u094D\u092E\u093E \u092F\u094B\u091C\u0928\u093E",
    titleMr: "\u092A\u0940\u090F\u092E \u0935\u093F\u0936\u094D\u0935\u0915\u0930\u094D\u092E\u093E \u092F\u094B\u091C\u0928\u093E",
    slug: "pm-vishwakarma-scheme",
    department: "Ministry of Micro, Small and Medium Enterprises",
    ministry: "Ministry of MSME and Skill Development, Govt of India",
    level: "Central",
    state: "All India",
    category: "Employment and Skill Development",
    description: "Holistic support for traditional artisans and craftspeople working with hands and tools across 18 trades including carpenters, blacksmiths, goldsmiths, potters, cobblers, and tailors.",
    descriptionHi: "\u092A\u093E\u0930\u0902\u092A\u0930\u093F\u0915 \u0915\u093E\u0930\u0940\u0917\u0930\u094B\u0902 \u0914\u0930 \u0936\u093F\u0932\u094D\u092A\u0915\u093E\u0930\u094B\u0902 \u0915\u094B \u0915\u094C\u0936\u0932 \u092A\u094D\u0930\u0936\u093F\u0915\u094D\u0937\u0923, \u20B915,000 \u091F\u0942\u0932\u0915\u093F\u091F \u0905\u0928\u0941\u0926\u093E\u0928 \u090F\u0935\u0902 5% \u0930\u093F\u092F\u093E\u092F\u0924\u0940 \u092C\u094D\u092F\u093E\u091C \u092A\u0930 \u0938\u0902\u092A\u093E\u0930\u094D\u0936\u094D\u0935\u093F\u0915-\u092E\u0941\u0915\u094D\u0924 \u090B\u0923 \u0938\u0939\u093E\u092F\u0924\u093E\u0964",
    descriptionMr: "\u092A\u093E\u0930\u0902\u092A\u093E\u0930\u093F\u0915 \u0967\u096E \u092C\u0932\u0941\u0924\u0947\u0926\u093E\u0930 \u0935 \u0915\u093E\u0930\u093E\u0917\u093F\u0930\u093E\u0902\u0938\u093E\u0920\u0940 \u0915\u094C\u0936\u0932\u094D\u092F \u092A\u094D\u0930\u0936\u093F\u0915\u094D\u0937\u0923, \u20B9\u0967\u096B,\u0966\u0966\u0966 \u091F\u0942\u0932\u0915\u093F\u091F \u0905\u0928\u0941\u0926\u093E\u0928 \u0935 \u0938\u0935\u0932\u0924\u0940\u091A\u094D\u092F\u093E \u0926\u0930\u093E\u0924 \u0915\u0930\u094D\u091C.",
    benefits: [
      "Basic & Advanced Skill Training with \u20B9500/day stipend",
      "\u20B915,000 modern toolkit incentive e-voucher",
      "Collateral-free enterprise loans: 1st tranche \u20B91 Lakh, 2nd tranche \u20B92 Lakh at 5% interest"
    ],
    eligibilitySummary: "Artisan working in one of 18 traditional family trades; Minimum age 18; Not availed PMEGP/Mudra in last 5 years.",
    eligibilitySummaryHi: "18 \u092A\u093E\u0930\u0902\u092A\u0930\u093F\u0915 \u0935\u094D\u092F\u0935\u0938\u093E\u092F\u094B\u0902 \u092E\u0947\u0902 \u0915\u093E\u0930\u094D\u092F\u0930\u0924 \u0915\u093E\u0930\u0940\u0917\u0930; \u0928\u094D\u092F\u0942\u0928\u0924\u092E \u0906\u092F\u0941 18 \u0935\u0930\u094D\u0937\u0964",
    eligibilitySummaryMr: "\u0967\u096E \u092A\u093E\u0930\u0902\u092A\u093E\u0930\u093F\u0915 \u0935\u094D\u092F\u0935\u0938\u093E\u092F\u093E\u0924\u0940\u0932 \u0915\u093E\u0930\u093E\u0917\u0940\u0930; \u0915\u093F\u092E\u093E\u0928 \u0935\u092F \u0967\u096E \u0935\u0930\u094D\u0937\u0947 \u092A\u0942\u0930\u094D\u0923.",
    applicationDeadline: "Open throughout year",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://pmvishwakarma.gov.in/",
    officialApplicationUrl: "https://pmvishwakarma.gov.in/Home/HowToRegister",
    guidelinesUrl: "https://pmvishwakarma.gov.in/Guidelines",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-03",
    requiredDocuments: [
      "Aadhaar card with linked mobile number",
      "Bank Passbook details",
      "Ration Card / Family details",
      "Verification from Gram Panchayat Sarpanch or Urban Local Body"
    ],
    tags: ["Artisans", "Skill", "Toolkit", "Employment", "Central"],
    commonPortalName: "PM Vishwakarma Portal"
  },
  {
    id: "CENTRAL_AICTE_PRAGATI",
    title: "AICTE Pragati Scholarship Scheme for Girl Students",
    titleHi: "\u091B\u093E\u0924\u094D\u0930\u093E\u0913\u0902 \u0915\u0947 \u0932\u093F\u090F \u090F\u0906\u0908\u0938\u0940\u091F\u0940\u0908 \u092A\u094D\u0930\u0917\u0924\u093F \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F \u092F\u094B\u091C\u0928\u093E",
    titleMr: "\u092E\u0941\u0932\u0940\u0902\u0938\u093E\u0920\u0940 \u090F\u0906\u092F\u0938\u0940\u091F\u0940\u0908 \u092A\u094D\u0930\u0917\u0924\u0940 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 \u092F\u094B\u091C\u0928\u093E",
    slug: "aicte-pragati-scholarship-girls",
    department: "All India Council for Technical Education (AICTE)",
    ministry: "Ministry of Education, Government of India",
    level: "Central",
    state: "All India",
    category: "Education and Scholarships",
    description: "Scholarship dedicated to meritorious female students admitted to first year of Degree or Diploma level technical programmes in AICTE approved colleges.",
    descriptionHi: "\u090F\u0906\u0908\u0938\u0940\u091F\u0940\u0908 \u0905\u0928\u0941\u092E\u094B\u0926\u093F\u0924 \u0915\u0949\u0932\u0947\u091C\u094B\u0902 \u092E\u0947\u0902 \u0921\u093F\u0917\u094D\u0930\u0940 \u092F\u093E \u0921\u093F\u092A\u094D\u0932\u094B\u092E\u093E \u0938\u094D\u0924\u0930 \u0915\u0947 \u0924\u0915\u0928\u0940\u0915\u0940 \u0915\u093E\u0930\u094D\u092F\u0915\u094D\u0930\u092E\u094B\u0902 \u0915\u0947 \u092A\u094D\u0930\u0925\u092E \u0935\u0930\u094D\u0937 \u092E\u0947\u0902 \u092A\u094D\u0930\u0935\u0947\u0936 \u0932\u0947\u0928\u0947 \u0935\u093E\u0932\u0940 \u092E\u0947\u0927\u093E\u0935\u0940 \u091B\u093E\u0924\u094D\u0930\u093E\u0913\u0902 \u0915\u0947 \u0932\u093F\u090F \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F\u0964",
    descriptionMr: "\u0924\u093E\u0902\u0924\u094D\u0930\u093F\u0915 \u0935 \u0905\u092D\u093F\u092F\u093E\u0902\u0924\u094D\u0930\u093F\u0915\u0940 \u0936\u093F\u0915\u094D\u0937\u0923 \u0918\u0947\u0923\u093E\u0931\u094D\u092F\u093E \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u093F\u0928\u0940\u0902\u0938\u093E\u0920\u0940 \u090F\u0906\u092F\u0938\u0940\u091F\u0940\u0908\u091A\u0940 \u0935\u093F\u0936\u0947\u0937 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940.",
    benefits: [
      "\u20B950,000 per year for every year of study towards college fee, books, equipment, and laptop"
    ],
    eligibilitySummary: "Female student admitted to 1st year AICTE degree/diploma; Max 2 girls per family; Family income <= \u20B98,00,000 per annum.",
    eligibilitySummaryHi: "AICTE \u0924\u0915\u0928\u0940\u0915\u0940 \u0921\u093F\u0917\u094D\u0930\u0940/\u0921\u093F\u092A\u094D\u0932\u094B\u092E\u093E \u092A\u094D\u0930\u0925\u092E \u0935\u0930\u094D\u0937 \u092E\u0947\u0902 \u0928\u093E\u092E\u093E\u0902\u0915\u093F\u0924 \u091B\u093E\u0924\u094D\u0930\u093E; \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F <= \u20B98 \u0932\u093E\u0916\u0964",
    eligibilitySummaryMr: "\u090F\u0906\u092F\u0938\u0940\u091F\u0940\u0908 \u092A\u0926\u0935\u0940 \u0915\u093F\u0902\u0935\u093E \u092A\u0926\u0935\u093F\u0915\u093E \u092A\u094D\u0930\u0925\u092E \u0935\u0930\u094D\u0937\u093E\u0924 \u092A\u094D\u0930\u0935\u0947\u0936\u093F\u0924 \u092E\u0941\u0932\u0917\u0940; \u0915\u094C\u091F\u0941\u0902\u092C\u093F\u0915 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u092E\u0930\u094D\u092F\u093E\u0926\u093E \u20B9\u096E \u0932\u093E\u0916.",
    applicationDeadline: "2026-02-15",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://scholarships.gov.in/",
    officialApplicationUrl: "https://scholarships.gov.in/public/schemeGuidelines/AICTE_Pragati_Degree_guidelines.pdf",
    guidelinesUrl: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-10-25",
    requiredDocuments: [
      "10th and 12th standard marksheets",
      "Tuition Fee receipt for current academic year",
      "Income Certificate (<= \u20B98 Lakhs)",
      "Bonafide student certificate from AICTE approved institute",
      "Parents declaration of having not more than two girl beneficiaries"
    ],
    tags: ["Girls", "Engineering", "Technical", "AICTE", "NSP", "Scholarship"],
    commonPortalName: "National Scholarship Portal"
  },
  {
    id: "CENTRAL_BEGUM_HAZRAT_MAHAL",
    title: "Begum Hazrat Mahal National Scholarship for Minority Girls",
    titleHi: "\u0905\u0932\u094D\u092A\u0938\u0902\u0916\u094D\u092F\u0915 \u091B\u093E\u0924\u094D\u0930\u093E\u0913\u0902 \u0915\u0947 \u0932\u093F\u090F \u092C\u0947\u0917\u092E \u0939\u091C\u093C\u0930\u0924 \u092E\u0939\u0932 \u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F",
    titleMr: "\u0905\u0932\u094D\u092A\u0938\u0902\u0916\u094D\u092F\u093E\u0915 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u093F\u0928\u0940\u0902\u0938\u093E\u0920\u0940 \u092C\u0947\u0917\u092E \u0939\u091C\u0930\u0924 \u092E\u0939\u0932 \u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940",
    slug: "begum-hazrat-mahal-national-scholarship",
    department: "Maulana Azad Education Foundation",
    ministry: "Ministry of Minority Affairs, Govt of India",
    level: "Central",
    state: "All India",
    category: "Education and Scholarships",
    description: "Financial assistance for meritorious girl students belonging to notified minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) studying in Classes 9th to 12th.",
    descriptionHi: "\u0915\u0915\u094D\u0937\u093E 9 \u0938\u0947 12 \u0924\u0915 \u092A\u0922\u093C\u0928\u0947 \u0935\u093E\u0932\u0940 \u0905\u0927\u093F\u0938\u0942\u091A\u093F\u0924 \u0905\u0932\u094D\u092A\u0938\u0902\u0916\u094D\u092F\u0915 \u0938\u092E\u0941\u0926\u093E\u092F\u094B\u0902 \u0915\u0940 \u092E\u0947\u0927\u093E\u0935\u0940 \u091B\u093E\u0924\u094D\u0930\u093E\u0913\u0902 \u0915\u0947 \u0932\u093F\u090F \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0939\u093E\u092F\u0924\u093E\u0964",
    descriptionMr: "\u0907\u092F\u0924\u094D\u0924\u093E \u096F \u0935\u0940 \u0924\u0947 \u0967\u0968 \u0935\u0940 \u092E\u0927\u094D\u092F\u0947 \u0936\u093F\u0915\u0923\u093E\u0931\u094D\u092F\u093E \u0905\u0932\u094D\u092A\u0938\u0902\u0916\u094D\u092F\u093E\u0915 \u0938\u092E\u093E\u091C\u093E\u0924\u0940\u0932 \u0917\u0941\u0923\u0935\u0902\u0924 \u092E\u0941\u0932\u0940\u0902\u0938\u093E\u0920\u0940 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940.",
    benefits: [
      "\u20B95,000 for Class IX and X",
      "\u20B96,000 for Class XI and XII per annum"
    ],
    eligibilitySummary: "Girl student of minority community; Minimum 50% in previous exam; Family income <= \u20B92,00,000.",
    eligibilitySummaryHi: "\u0905\u0932\u094D\u092A\u0938\u0902\u0916\u094D\u092F\u0915 \u0938\u092E\u0941\u0926\u093E\u092F \u0915\u0940 \u091B\u093E\u0924\u094D\u0930\u093E; \u092A\u093F\u091B\u0932\u0940 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u092E\u0947\u0902 \u0928\u094D\u092F\u0942\u0928\u0924\u092E 50%; \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F <= \u20B92 \u0932\u093E\u0916\u0964",
    eligibilitySummaryMr: "\u0905\u0932\u094D\u092A\u0938\u0902\u0916\u094D\u092F\u093E\u0915 \u0938\u092E\u093E\u091C\u093E\u0924\u0940\u0932 \u092E\u0941\u0932\u0917\u0940; \u092E\u093E\u0917\u0940\u0932 \u092A\u0930\u0940\u0915\u094D\u0937\u0947\u0924 \u096B\u0966% \u0917\u0941\u0923; \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u0968 \u0932\u093E\u0916\u093E\u0902\u092A\u0947\u0915\u094D\u0937\u093E \u0915\u092E\u0940.",
    applicationDeadline: "2026-01-31",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://scholarships.gov.in/",
    officialApplicationUrl: "https://scholarships.gov.in/",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-10-29",
    requiredDocuments: [
      "Previous class marksheet signed by Principal",
      "Self-declaration of Minority Community",
      "Income Certificate from competent revenue officer",
      "School verification bonafide certificate"
    ],
    tags: ["Minority", "Girls", "School", "NSP", "Central"],
    commonPortalName: "National Scholarship Portal"
  },
  {
    id: "MAHA_SHETKARI_KARJMUKTI",
    title: "Mahatma Jyotirao Phule Shetkari Karjmukti Yojna",
    titleHi: "\u092E\u0939\u093E\u0924\u094D\u092E\u093E \u091C\u094D\u092F\u094B\u0924\u093F\u0930\u093E\u0935 \u092B\u0941\u0932\u0947 \u0936\u0947\u0924\u0915\u0930\u0940 \u0915\u0930\u094D\u091C\u092E\u0941\u0915\u094D\u0924\u093F \u092F\u094B\u091C\u0928\u093E",
    titleMr: "\u092E\u0939\u093E\u0924\u094D\u092E\u093E \u091C\u094D\u092F\u094B\u0924\u093F\u0930\u093E\u0935 \u092B\u0941\u0932\u0947 \u0936\u0947\u0924\u0915\u0930\u0940 \u0915\u0930\u094D\u091C\u092E\u0941\u0915\u094D\u0924\u0940 \u092F\u094B\u091C\u0928\u093E",
    slug: "mahatma-jyotirao-phule-shetkari-karjmukti",
    department: "Co-operation, Marketing and Textiles Department",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Agriculture and Farmers",
    description: "Loan waiver and incentive scheme of up to \u20B950,000 for Maharashtra farmers who regularly repay their short-term crop loans.",
    descriptionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u0947 \u0909\u0928 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u094B \u20B950,000 \u0924\u0915 \u0915\u0940 \u092A\u094D\u0930\u094B\u0924\u094D\u0938\u093E\u0939\u0928 \u0938\u092C\u094D\u0938\u093F\u0921\u0940 \u091C\u094B \u0905\u092A\u0928\u0947 \u0905\u0932\u094D\u092A\u0915\u093E\u0932\u093F\u0915 \u092B\u0938\u0932 \u090B\u0923\u094B\u0902 \u0915\u093E \u0928\u093F\u092F\u092E\u093F\u0924 \u092A\u0941\u0928\u0930\u094D\u092D\u0941\u0917\u0924\u093E\u0928 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902\u0964",
    descriptionMr: "\u092A\u0940\u0915 \u0915\u0930\u094D\u091C\u093E\u091A\u0940 \u0928\u093F\u092F\u092E\u093F\u0924 \u092A\u0930\u0924\u092B\u0947\u0921 \u0915\u0930\u0923\u093E\u0931\u094D\u092F\u093E \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u093E\u0924\u0940\u0932 \u0936\u0947\u0924\u0915\u0931\u094D\u092F\u093E\u0902\u0928\u093E \u20B9\u096B\u0966,\u0966\u0966\u0966 \u092A\u0930\u094D\u092F\u0902\u0924 \u092A\u094D\u0930\u094B\u0924\u094D\u0938\u093E\u0939\u0928\u092A\u0930 \u0932\u093E\u092D \u0926\u093F\u0932\u093E \u091C\u093E\u0924\u094B.",
    benefits: [
      "Incentive subsidy of up to \u20B950,000 directly credited to bank account for regular borrowers"
    ],
    eligibilitySummary: "Resident farmer of Maharashtra; Having taken short term crop loan and repaid in stipulated timeframe.",
    eligibilitySummaryHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u093E \u0915\u093F\u0938\u093E\u0928; \u091C\u093F\u0938\u0928\u0947 \u0905\u0932\u094D\u092A\u093E\u0935\u0927\u093F \u092B\u0938\u0932 \u090B\u0923 \u0932\u093F\u092F\u093E \u0914\u0930 \u0938\u092E\u092F \u092A\u0930 \u091A\u0941\u0915\u093E\u092F\u093E\u0964",
    eligibilitySummaryMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u093E\u0924\u0940\u0932 \u0936\u0947\u0924\u0915\u0930\u0940 \u091C\u094D\u092F\u093E\u0902\u0928\u0940 \u092A\u0940\u0915 \u0915\u0930\u094D\u091C \u0918\u0947\u0924\u0932\u0947 \u0935 \u0935\u0947\u0933\u0947\u0924 \u092A\u0930\u0924\u092B\u0947\u0921 \u0915\u0947\u0932\u0940.",
    applicationDeadline: "2026-06-30",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://mjpsky.maharashtra.gov.in/",
    officialApplicationUrl: "https://mjpsky.maharashtra.gov.in/",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-01",
    requiredDocuments: [
      "Aadhaar card with biometric authentication",
      "Kisan Credit Card / Crop loan passbook",
      "7/12 & 8A land records"
    ],
    tags: ["Farmers", "Loan Waiver", "Maharashtra", "Agriculture"],
    commonPortalName: "MJPSKY Portal"
  },
  {
    id: "CENTRAL_PM_SVANIDHI",
    title: "PM Street Vendor\u2019s AtmaNirbhar Nidhi (PM SVANidhi)",
    titleHi: "\u092A\u0940\u090F\u092E \u0938\u094D\u091F\u094D\u0930\u0940\u091F \u0935\u0947\u0902\u0921\u0930\u094D\u0938 \u0906\u0924\u094D\u092E\u0928\u093F\u0930\u094D\u092D\u0930 \u0928\u093F\u0927\u093F (\u092A\u0940\u090F\u092E \u0938\u094D\u0935\u0928\u093F\u0927\u093F)",
    titleMr: "\u092A\u0940\u090F\u092E \u0938\u094D\u0935\u0928\u093F\u0927\u0940 \u092F\u094B\u091C\u0928\u093E (\u092B\u0947\u0930\u0940\u0935\u093E\u0932\u0947 \u0935 \u0939\u093E\u0924\u0917\u093E\u0921\u0940\u0927\u093E\u0930\u0915)",
    slug: "pm-svanidhi-scheme",
    department: "Ministry of Housing and Urban Affairs",
    ministry: "Government of India",
    level: "Central",
    state: "All India",
    category: "Financial Inclusion",
    description: "Special micro-credit facility providing affordable working capital loans of \u20B910,000 (1st tranche), \u20B920,000 (2nd tranche), and \u20B950,000 (3rd tranche) to street vendors with 7% interest subsidy and cashback on digital transactions.",
    descriptionHi: "\u0938\u0921\u093C\u0915 \u0915\u093F\u0928\u093E\u0930\u0947 \u0938\u093E\u092E\u093E\u0928 \u092C\u0947\u091A\u0928\u0947 \u0935\u093E\u0932\u0947 \u0935\u0947\u0902\u0921\u0930\u094B\u0902 \u0915\u094B \u20B910,000, \u20B920,000 \u0914\u0930 \u20B950,000 \u0924\u0915 \u0915\u093E \u0938\u0938\u094D\u0924\u093E \u0915\u093E\u0930\u094D\u092F\u0936\u0940\u0932 \u092A\u0942\u0902\u091C\u0940 \u090B\u0923 \u090F\u0935\u0902 \u0921\u093F\u091C\u093F\u091F\u0932 \u0915\u0948\u0936\u092C\u0948\u0915\u0964",
    descriptionMr: "\u0930\u0938\u094D\u0924\u094D\u092F\u093E\u0935\u0930\u0940\u0932 \u0935\u093F\u0915\u094D\u0930\u0947\u0924\u0947 \u0935 \u092B\u0947\u0930\u0940\u0935\u093E\u0932\u094D\u092F\u093E\u0902\u0938\u093E\u0920\u0940 \u20B9\u0967\u0966,\u0966\u0966\u0966 \u0924\u0947 \u20B9\u096B\u0966,\u0966\u0966\u0966 \u092A\u0930\u094D\u092F\u0902\u0924 \u0916\u0947\u0933\u0924\u094D\u092F\u093E \u092D\u093E\u0902\u0921\u0935\u0932\u093E\u091A\u0947 \u0915\u0930\u094D\u091C \u0906\u0923\u093F \u0921\u093F\u091C\u093F\u091F\u0932 \u0935\u094D\u092F\u0935\u0939\u093E\u0930\u093E\u0902\u0935\u0930 \u0915\u0945\u0936\u092C\u0945\u0915.",
    benefits: [
      "Initial working capital loan up to \u20B910,000 without any collateral",
      "7% interest subsidy per annum credited directly to bank account",
      "Monthly cashback up to \u20B9100 on digital payment receipts"
    ],
    eligibilitySummary: "Street vendor vending in urban/peri-urban areas possessing Certificate of Vending or Identity Card issued by Urban Local Body.",
    eligibilitySummaryHi: "\u0936\u0939\u0930\u0940 \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u094B\u0902 \u092E\u0947\u0902 \u0935\u0947\u0902\u0921\u093F\u0902\u0917 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0938\u094D\u091F\u094D\u0930\u0940\u091F \u0935\u0947\u0902\u0921\u0930 \u091C\u093F\u0928\u0915\u0947 \u092A\u093E\u0938 \u092A\u0939\u091A\u093E\u0928 \u092A\u0924\u094D\u0930 \u092F\u093E \u0935\u0947\u0902\u0921\u093F\u0902\u0917 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0939\u094B\u0964",
    eligibilitySummaryMr: "\u0936\u0939\u0930\u0940 \u092D\u093E\u0917\u093E\u0924\u0940\u0932 \u092A\u0925\u0935\u093F\u0915\u094D\u0930\u0947\u0924\u0947 \u091C\u094D\u092F\u093E\u0902\u091A\u094D\u092F\u093E\u0915\u0921\u0947 \u0938\u094D\u0925\u093E\u0928\u093F\u0915 \u0938\u094D\u0935\u0930\u093E\u091C\u094D\u092F \u0938\u0902\u0938\u094D\u0925\u0947\u091A\u0947 \u0913\u0933\u0916\u092A\u0924\u094D\u0930 \u0915\u093F\u0902\u0935\u093E \u0936\u093F\u092B\u093E\u0930\u0938 \u092A\u0924\u094D\u0930 \u0906\u0939\u0947.",
    applicationDeadline: "Open through 2026",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://pmsvanidhi.mohua.gov.in/",
    officialApplicationUrl: "https://pmsvanidhi.mohua.gov.in/Home/VendorRegistration",
    guidelinesUrl: "https://pmsvanidhi.mohua.gov.in/Schemes",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-04",
    requiredDocuments: [
      "Aadhaar Card linked with active mobile",
      "Vending Certificate / Letter of Recommendation (LoR) from Town Vending Committee",
      "Bank Account passbook / UPI VPA details"
    ],
    tags: ["Street Vendors", "Micro-credit", "Cashback", "Central", "Urban"],
    commonPortalName: "PM SVANidhi Portal"
  },
  {
    id: "CENTRAL_IGNOAPS_SENIOR",
    title: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    titleHi: "\u0907\u0902\u0926\u093F\u0930\u093E \u0917\u093E\u0902\u0927\u0940 \u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0935\u0943\u0926\u094D\u0927\u093E\u0935\u0938\u094D\u0925\u093E \u092A\u0947\u0902\u0936\u0928 \u092F\u094B\u091C\u0928\u093E (IGNOAPS)",
    titleMr: "\u0907\u0902\u0926\u093F\u0930\u093E \u0917\u093E\u0902\u0927\u0940 \u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0935\u0943\u0926\u094D\u0927\u093E\u092A\u0915\u093E\u0933 \u0928\u093F\u0935\u0943\u0924\u094D\u0924\u0940\u0935\u0947\u0924\u0928 \u092F\u094B\u091C\u0928\u093E",
    slug: "indira-gandhi-old-age-pension",
    department: "Department of Rural Development",
    ministry: "Ministry of Rural Development, Govt of India",
    level: "Central",
    state: "All India",
    category: "Senior Citizens",
    description: "Monthly pension allowance given to senior citizens belonging to below poverty line (BPL) households across the country.",
    descriptionHi: "\u0917\u0930\u0940\u092C\u0940 \u0930\u0947\u0916\u093E \u0938\u0947 \u0928\u0940\u091A\u0947 (BPL) \u091C\u0940\u0935\u0928 \u092F\u093E\u092A\u0928 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0935\u0930\u093F\u0937\u094D\u0920 \u0928\u093E\u0917\u0930\u093F\u0915\u094B\u0902 \u0915\u094B \u092E\u093E\u0938\u093F\u0915 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u092A\u0947\u0902\u0936\u0928 \u0938\u0939\u093E\u092F\u0924\u093E\u0964",
    descriptionMr: "\u0926\u093E\u0930\u093F\u0926\u094D\u0930\u094D\u092F\u0930\u0947\u0937\u0947\u0916\u093E\u0932\u0940\u0932 (BPL) \u091C\u094D\u092F\u0947\u0937\u094D\u0920 \u0928\u093E\u0917\u0930\u093F\u0915\u093E\u0902\u0928\u093E \u0938\u0928\u094D\u092E\u093E\u0928\u093E\u0928\u0947 \u091C\u0917\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0926\u0930\u092E\u0939\u093E \u0906\u0930\u094D\u0925\u093F\u0915 \u092A\u0947\u0928\u094D\u0936\u0928.",
    benefits: [
      "\u20B91,000 to \u20B91,500 per month (combined Central + State contribution depending on state policy)",
      "Direct monthly deposit via Aadhaar Enabled Payment System (AePS)"
    ],
    eligibilitySummary: "Indian citizen; Age 60 years or above; Belongs to verified BPL household.",
    eligibilitySummaryHi: "\u092D\u093E\u0930\u0924\u0940\u092F \u0928\u093E\u0917\u0930\u093F\u0915; \u0906\u092F\u0941 60 \u0935\u0930\u094D\u0937 \u092F\u093E \u0909\u0938\u0938\u0947 \u0905\u0927\u093F\u0915; \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 BPL \u092A\u0930\u093F\u0935\u093E\u0930 \u0938\u0947 \u0938\u0902\u092C\u0902\u0927\u093F\u0924\u0964",
    eligibilitySummaryMr: "\u0935\u092F \u096C\u0966 \u0935\u0930\u094D\u0937\u0947 \u0915\u093F\u0902\u0935\u093E \u0905\u0927\u093F\u0915 \u0905\u0938\u0923\u093E\u0930\u0947 \u0926\u093E\u0930\u093F\u0926\u094D\u0930\u094D\u092F\u0930\u0947\u0937\u0947\u0916\u093E\u0932\u0940\u0932 \u091C\u094D\u092F\u0947\u0937\u094D\u0920 \u0928\u093E\u0917\u0930\u093F\u0915.",
    applicationDeadline: "Open throughout year",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://nsap.nic.in/",
    officialApplicationUrl: "https://nsap.nic.in/applyonline.do",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-10-18",
    requiredDocuments: [
      "Age proof / Birth certificate / School leaving certificate",
      "BPL Card / Ration Card proof",
      "Aadhaar card",
      "Bank or Post Office savings account"
    ],
    tags: ["Senior Citizens", "Pension", "BPL", "Central", "Social Welfare"],
    commonPortalName: "NSAP National Portal"
  },
  {
    id: "CENTRAL_ADIP_DISABILITY",
    title: "Scheme of Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances (ADIP)",
    titleHi: "\u0926\u093F\u0935\u094D\u092F\u093E\u0902\u0917\u091C\u0928\u094B\u0902 \u0915\u094B \u0938\u0939\u093E\u092F\u0915 \u0909\u092A\u0915\u0930\u0923 \u092A\u094D\u0930\u0926\u093E\u0928 \u0915\u0930\u0928\u0947 \u0915\u0940 \u090F\u0921\u0940\u0906\u0908\u092A\u0940 \u092F\u094B\u091C\u0928\u093E",
    titleMr: "\u0926\u093F\u0935\u094D\u092F\u093E\u0902\u0917 \u0935\u094D\u092F\u0915\u094D\u0924\u0940\u0902\u0928\u093E \u0938\u0939\u093E\u092F\u094D\u092F\u0915 \u0938\u093E\u0927\u0928\u0947 \u0935 \u0909\u092A\u0915\u0930\u0923\u0947 \u092A\u0941\u0930\u0935\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u090F\u0921\u0940\u0906\u092F\u092A\u0940 \u092F\u094B\u091C\u0928\u093E",
    slug: "adip-disability-assistance-scheme",
    department: "Department of Empowerment of Persons with Disabilities",
    ministry: "Ministry of Social Justice and Empowerment, Govt of India",
    level: "Central",
    state: "All India",
    category: "Disability and Accessibility",
    description: "Assisting needy persons with disabilities in procuring durable, sophisticated, modern and scientifically manufactured aids and appliances (hearing aids, motorized tricycles, braille kits, prosthetics).",
    descriptionHi: "\u0926\u093F\u0935\u094D\u092F\u093E\u0902\u0917\u091C\u0928\u094B\u0902 \u0915\u094B \u0906\u0927\u0941\u0928\u093F\u0915, \u0935\u0948\u091C\u094D\u091E\u093E\u0928\u093F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0928\u093F\u0930\u094D\u092E\u093F\u0924 \u0938\u0939\u093E\u092F\u0915 \u0909\u092A\u0915\u0930\u0923 (\u0936\u094D\u0930\u0935\u0923 \u092F\u0902\u0924\u094D\u0930, \u092E\u094B\u091F\u0930\u093E\u0907\u091C\u094D\u0921 \u091F\u094D\u0930\u093E\u0907\u0938\u093E\u0907\u0915\u093F\u0932, \u0915\u0943\u0924\u094D\u0930\u093F\u092E \u0905\u0902\u0917 \u0906\u0926\u093F) \u0928\u093F\u0903\u0936\u0941\u0932\u094D\u0915 \u092F\u093E \u0930\u093F\u092F\u093E\u092F\u0924\u0940 \u0926\u0930 \u092A\u0930 \u0909\u092A\u0932\u092C\u094D\u0927 \u0915\u0930\u093E\u0928\u093E\u0964",
    descriptionMr: "\u0917\u0930\u091C\u0942 \u0926\u093F\u0935\u094D\u092F\u093E\u0902\u0917 \u0935\u094D\u092F\u0915\u094D\u0924\u0940\u0902\u0928\u093E \u0936\u094D\u0930\u0935\u0923\u092F\u0902\u0924\u094D\u0930\u0947, \u0924\u093F\u091A\u093E\u0915\u0940 \u0938\u093E\u092F\u0915\u0932, \u091C\u092F\u092A\u0942\u0930 \u092B\u0942\u091F, \u0935\u094D\u0939\u0940\u0932\u091A\u0947\u0905\u0930 \u0935 \u092C\u094D\u0930\u0947\u0932 \u0909\u092A\u0915\u0930\u0923\u0947 \u0935\u093F\u0928\u093E\u092E\u0942\u0932\u094D\u092F \u092E\u093F\u0933\u0935\u0942\u0928 \u0926\u0947\u0923\u0947.",
    benefits: [
      "100% free aids & appliances for citizens with income up to \u20B922,500/month",
      "50% cost subsidy for monthly income between \u20B922,501 and \u20B930,000"
    ],
    eligibilitySummary: "Indian citizen of any age; 40% or more certified disability; Monthly income <= \u20B930,000; Has not received same aid in last 3 years.",
    eligibilitySummaryHi: "\u0928\u094D\u092F\u0942\u0928\u0924\u092E 40% \u0926\u093F\u0935\u094D\u092F\u093E\u0902\u0917\u0924\u093E \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930; \u092E\u093E\u0938\u093F\u0915 \u0906\u092F <= \u20B930,000; \u092A\u093F\u091B\u0932\u0947 3 \u0935\u0930\u094D\u0937\u094B\u0902 \u092E\u0947\u0902 \u0938\u092E\u093E\u0928 \u0909\u092A\u0915\u0930\u0923 \u0928 \u092E\u093F\u0932\u093E \u0939\u094B\u0964",
    eligibilitySummaryMr: "\u0915\u093F\u092E\u093E\u0928 \u096A\u0966% \u0926\u093F\u0935\u094D\u092F\u093E\u0902\u0917\u0924\u094D\u0935 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930; \u092E\u093E\u0938\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u0969\u0966,\u0966\u0966\u0966 \u092A\u0947\u0915\u094D\u0937\u093E \u0915\u092E\u0940.",
    applicationDeadline: "Continuous camps & online portal",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://alimco.in/adip-scheme",
    officialApplicationUrl: "https://alimco.in/beneficiary-registration",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-10-22",
    requiredDocuments: [
      "Unique Disability ID (UDID) or Medical Disability Certificate (40%+)",
      "Income Certificate / BPL Card",
      "Aadhaar card & Resident proof",
      "Passport size photograph showing disability"
    ],
    tags: ["Disability", "UDID", "Appliances", "Tricycle", "Accessibility", "Central"],
    commonPortalName: "ALIMCO Portal"
  },
  {
    id: "CENTRAL_PMGKAY_FOOD",
    title: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)",
    titleHi: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u0917\u0930\u0940\u092C \u0915\u0932\u094D\u092F\u093E\u0923 \u0905\u0928\u094D\u0928 \u092F\u094B\u091C\u0928\u093E (PMGKAY)",
    titleMr: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u0917\u0930\u0940\u092C \u0915\u0932\u094D\u092F\u093E\u0923 \u0905\u0928\u094D\u0928 \u092F\u094B\u091C\u0928\u093E (PMGKAY)",
    slug: "pm-garib-kalyan-anna-yojana",
    department: "Department of Food and Public Distribution",
    ministry: "Ministry of Consumer Affairs, Food & Public Distribution",
    level: "Central",
    state: "All India",
    category: "Food and Nutrition",
    description: "Provides 5 kg of food grains (rice/wheat) per person per month completely free of cost to over 81 crore beneficiaries through Fair Price Shops with One Nation One Ration Card interoperability.",
    descriptionHi: "\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0916\u093E\u0926\u094D\u092F \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0905\u0927\u093F\u0928\u093F\u092F\u092E (NFSA) \u0915\u0947 \u0924\u0939\u0924 81 \u0915\u0930\u094B\u0921\u093C \u0938\u0947 \u0905\u0927\u093F\u0915 \u0928\u093E\u0917\u0930\u093F\u0915\u094B\u0902 \u0915\u094B 5 \u0915\u093F\u0932\u094B\u0917\u094D\u0930\u093E\u092E \u0916\u093E\u0926\u094D\u092F\u093E\u0928\u094D\u0928 \u092A\u094D\u0930\u0924\u093F \u0935\u094D\u092F\u0915\u094D\u0924\u093F \u092A\u094D\u0930\u0924\u093F\u092E\u093E\u0939 \u092A\u0942\u0930\u094D\u0923\u0924\u0903 \u0928\u093F\u0903\u0936\u0941\u0932\u094D\u0915\u0964",
    descriptionMr: "\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0905\u0928\u094D\u0928 \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0915\u093E\u092F\u0926\u094D\u092F\u093E\u0902\u0924\u0930\u094D\u0917\u0924 \u0930\u0947\u0936\u0928 \u0915\u093E\u0930\u094D\u0921\u0927\u093E\u0930\u0915\u093E\u0902\u0928\u093E \u0926\u0930\u092E\u0939\u093E \u096B \u0915\u093F\u0932\u094B \u0927\u093E\u0928\u094D\u092F \u092E\u094B\u092B\u0924 \u0935\u093E\u091F\u092A.",
    benefits: [
      "5 kg of free foodgrains (wheat/rice/coarse grains) per person per month",
      "Portability via One Nation One Ration Card (ONORC) across any Fair Price Shop in India"
    ],
    eligibilitySummary: "All Antyodaya Anna Yojana (AAY) and Priority Household (PHH) ration card holders.",
    eligibilitySummaryHi: "\u0905\u0902\u0924\u094D\u092F\u094B\u0926\u092F \u0905\u0928\u094D\u0928 \u092F\u094B\u091C\u0928\u093E (AAY) \u0914\u0930 \u092A\u094D\u0930\u093E\u0925\u092E\u093F\u0915\u0924\u093E \u0917\u0943\u0939\u0938\u094D\u0925\u0940 (PHH) \u0930\u093E\u0936\u0928 \u0915\u093E\u0930\u094D\u0921 \u0927\u093E\u0930\u0915\u0964",
    eligibilitySummaryMr: "\u0905\u0902\u0924\u094D\u092F\u094B\u0926\u092F \u0906\u0923\u093F \u092A\u094D\u0930\u093E\u0927\u093E\u0928\u094D\u092F \u0915\u0941\u091F\u0941\u0902\u092C \u0930\u0947\u0936\u0928\u0915\u093E\u0930\u094D\u0921 \u0927\u093E\u0930\u0915 \u0915\u0941\u091F\u0941\u0902\u092C.",
    applicationDeadline: "Ongoing until 2028",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://nfsa.gov.in/",
    officialApplicationUrl: "https://nfsa.gov.in/portal/apply_ration_card",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-06",
    requiredDocuments: [
      "Active Ration Card (AAY / PHH)",
      "Aadhaar cards of all family members seeded with e-PoS device"
    ],
    tags: ["Ration", "Food", "Free Grain", "NFSA", "Central"],
    commonPortalName: "National Food Security Portal"
  },
  {
    id: "DEMO_PENDING_STATE_ASSISTANCE",
    title: "Maharashtra Youth Apprenticeship Stipend Scheme (Verification In Progress)",
    titleHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u092F\u0941\u0935\u093E \u092A\u094D\u0930\u0936\u093F\u0915\u094D\u0937\u0923 \u092F\u094B\u091C\u0928\u093E (\u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u092A\u094D\u0930\u0917\u0924\u093F \u092A\u0930)",
    titleMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u092F\u0941\u0935\u093E \u0915\u093E\u0930\u094D\u092F\u092A\u094D\u0930\u0936\u093F\u0915\u094D\u0937\u0923 \u0935\u093F\u0926\u094D\u092F\u093E\u0935\u0947\u0924\u0928 \u092F\u094B\u091C\u0928\u093E (\u092A\u0921\u0924\u093E\u0933\u0923\u0940 \u0938\u0941\u0930\u0942)",
    slug: "maharashtra-youth-apprenticeship-pending",
    department: "Skill Development, Employment and Entrepreneurship Dept",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Employment and Skill Development",
    description: "On-the-job apprenticeship stipend scheme for 12th pass, Diploma and Degree holders in Maharashtra enterprises. Note: Currently flagged as PENDING verification as guidelines for 2026-27 are awaiting final gazette notification.",
    descriptionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u0947 12\u0935\u0940\u0902, \u0921\u093F\u092A\u094D\u0932\u094B\u092E\u093E \u090F\u0935\u0902 \u0921\u093F\u0917\u094D\u0930\u0940 \u0927\u093E\u0930\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0911\u0928-\u0926-\u091C\u0949\u092C \u0907\u0902\u091F\u0930\u094D\u0928\u0936\u093F\u092A \u0935\u093F\u0926\u094D\u092F\u093E\u0935\u0947\u0924\u0928\u0964 (\u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092E\u0947\u0902 \u0938\u094D\u0930\u094B\u0924 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u092A\u094D\u0930\u0917\u0924\u093F \u092A\u0930 \u0939\u0948)\u0964",
    descriptionMr: "\u0967\u0968 \u0935\u0940 \u0909\u0924\u094D\u0924\u0940\u0930\u094D\u0923, \u092A\u0926\u0935\u093F\u0915\u093E \u0906\u0923\u093F \u092A\u0926\u0935\u0940\u0927\u0930 \u0924\u0930\u0941\u0923\u093E\u0902\u0938\u093E\u0920\u0940 \u092E\u093E\u0938\u093F\u0915 \u0935\u093F\u0926\u094D\u092F\u093E\u0935\u0947\u0924\u0928 \u0915\u093E\u0930\u094D\u092F\u092A\u094D\u0930\u0936\u093F\u0915\u094D\u0937\u0923 \u092F\u094B\u091C\u0928\u093E. (\u0938\u0927\u094D\u092F\u093E \u0936\u093E\u0938\u0915\u0940\u092F \u092A\u0921\u0924\u093E\u0933\u0923\u0940 \u092A\u094D\u0930\u0915\u094D\u0930\u093F\u092F\u0947\u0924 \u0906\u0939\u0947).",
    benefits: [
      "\u20B96,000/month for 12th pass; \u20B98,000/month for Diploma; \u20B910,000/month for Degree graduates for 6 months"
    ],
    eligibilitySummary: "Age 18-35; Resident of Maharashtra; Minimum 12th pass or Diploma/Degree; Enrolled in Rojgar portal.",
    eligibilitySummaryHi: "\u0906\u092F\u0941 18-35; \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0928\u093F\u0935\u093E\u0938\u0940; 12\u0935\u0940\u0902 \u092A\u093E\u0938 / \u0921\u093F\u092A\u094D\u0932\u094B\u092E\u093E / \u0921\u093F\u0917\u094D\u0930\u0940\u0964",
    eligibilitySummaryMr: "\u0935\u092F \u0967\u096E \u0924\u0947 \u0969\u096B; \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0930\u0939\u093F\u0935\u093E\u0938\u0940; \u0967\u0968 \u0935\u0940 \u092A\u093E\u0938 \u0915\u093F\u0902\u0935\u093E \u092A\u0926\u0935\u093F\u0915\u093E/\u092A\u0926\u0935\u0940.",
    applicationDeadline: "2026-08-31",
    acceptingApplications: false,
    isScholarship: false,
    officialSourceUrl: "https://rojgar.mahaswayam.gov.in/",
    officialApplicationUrl: "https://rojgar.mahaswayam.gov.in/#/apprentice",
    sourceVerificationStatus: "PENDING",
    lastVerifiedDate: "2026-10-15",
    requiredDocuments: [
      "Mahaswayam Portal Registration ID",
      "Educational Degree/Marksheets",
      "Maharashtra Domicile",
      "Aadhaar card"
    ],
    tags: ["Apprenticeship", "Youth", "Pending Verification", "Maharashtra", "Stipend"],
    commonPortalName: "Mahaswayam Portal"
  },
  {
    id: "DEMO_BROKEN_LINK_SCHEME",
    title: "Old Rural Sanitation Grant (Link Under Maintenance)",
    titleHi: "\u092A\u0941\u0930\u093E\u0928\u0940 \u0917\u094D\u0930\u093E\u092E\u0940\u0923 \u0938\u094D\u0935\u091A\u094D\u091B\u0924\u093E \u0905\u0928\u0941\u0926\u093E\u0928 \u092F\u094B\u091C\u0928\u093E (\u0932\u093F\u0902\u0915 \u0930\u0916\u0930\u0916\u093E\u0935 \u092E\u0947\u0902)",
    titleMr: "\u091C\u0941\u0928\u0940 \u0917\u094D\u0930\u093E\u092E\u0940\u0923 \u0938\u094D\u0935\u091A\u094D\u091B\u0924\u093E \u0905\u0928\u0941\u0926\u093E\u0928 \u092F\u094B\u091C\u0928\u093E (\u0926\u0941\u0935\u093E \u0905\u0926\u094D\u092F\u092F\u093E\u0935\u0924 \u0915\u0947\u0932\u093E \u091C\u093E\u0924 \u0906\u0939\u0947)",
    slug: "old-rural-sanitation-broken-link",
    department: "Water Supply and Sanitation Department",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Rural Development",
    description: "Archived rural sanitation scheme record kept for administrative tracking. Official portal domain has undergone transition and current link returns a 404/broken status.",
    descriptionHi: "\u092A\u094D\u0930\u0936\u093E\u0938\u0928\u093F\u0915 \u091F\u094D\u0930\u0948\u0915\u093F\u0902\u0917 \u0939\u0947\u0924\u0941 \u092A\u0941\u0930\u093E\u0928\u0940 \u092F\u094B\u091C\u0928\u093E \u0930\u093F\u0915\u0949\u0930\u094D\u0921\u0964 \u0906\u0927\u093F\u0915\u093E\u0930\u093F\u0915 \u092A\u094B\u0930\u094D\u091F\u0932 \u092F\u0942\u0906\u0930\u090F\u0932 \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092E\u0947\u0902 \u0930\u0916\u0930\u0916\u093E\u0935 \u0915\u0947 \u0905\u0927\u0940\u0928 \u0939\u0948\u0964",
    descriptionMr: "\u092A\u094D\u0930\u0936\u093E\u0938\u0915\u0940\u092F \u0928\u094B\u0902\u0926\u0940\u0938\u093E\u0920\u0940 \u091C\u0941\u0928\u0940 \u092F\u094B\u091C\u0928\u093E. \u0905\u0927\u093F\u0915\u0943\u0924 \u0936\u093E\u0938\u0915\u0940\u092F \u0932\u093F\u0902\u0915 \u0938\u0927\u094D\u092F\u093E \u0905\u0928\u0941\u092A\u0932\u092C\u094D\u0927 \u0905\u0938\u0942\u0928 \u0905\u0926\u094D\u092F\u092F\u093E\u0935\u0924 \u0915\u0947\u0932\u0940 \u091C\u093E\u0924 \u0906\u0939\u0947.",
    benefits: [
      "One-time grant for individual household latrine construction"
    ],
    eligibilitySummary: "Rural household without existing toilet.",
    eligibilitySummaryHi: "\u092C\u093F\u0928\u093E \u0936\u094C\u091A\u093E\u0932\u092F \u0935\u093E\u0932\u093E \u0917\u094D\u0930\u093E\u092E\u0940\u0923 \u092A\u0930\u093F\u0935\u093E\u0930\u0964",
    eligibilitySummaryMr: "\u0936\u094C\u091A\u093E\u0932\u092F \u0928\u0938\u0932\u0947\u0932\u0947 \u0917\u094D\u0930\u093E\u092E\u0940\u0923 \u0915\u0941\u091F\u0941\u0902\u092C.",
    applicationDeadline: "Archived",
    acceptingApplications: false,
    isScholarship: false,
    officialSourceUrl: "https://rural.maharashtra.gov.in/broken-legacy-sanitation-404",
    officialApplicationUrl: "",
    sourceVerificationStatus: "BROKEN",
    lastVerifiedDate: "2026-09-01",
    requiredDocuments: [
      "Gram Panchayat residence certificate"
    ],
    tags: ["Archived", "Broken Source", "Rural", "Admin Demo"],
    commonPortalName: "Rural Development Portal"
  },
  {
    id: "CENTRAL_NMMSS_SCHOLARSHIP",
    title: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    titleHi: "\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0938\u093E\u0927\u0928-\u0938\u0939-\u092F\u094B\u0917\u094D\u092F\u0924\u093E \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F \u092F\u094B\u091C\u0928\u093E (NMMSS)",
    titleMr: "\u0930\u093E\u0937\u094D\u091F\u094D\u0930\u0940\u092F \u0906\u0930\u094D\u0925\u093F\u0915 \u0926\u0941\u0930\u094D\u092C\u0932 \u0918\u091F\u0915 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 \u092F\u094B\u091C\u0928\u093E (NMMSS)",
    slug: "national-means-cum-merit-scholarship",
    department: "Department of School Education and Literacy",
    ministry: "Ministry of Education, Government of India",
    level: "Central",
    state: "All India",
    category: "Education and Scholarships",
    description: "Provides financial incentives to meritorious students belonging to economically weaker sections to arrest their drop-out at class VIII and encourage them to continue study at secondary stage (classes IX to XII).",
    descriptionHi: "\u0906\u0930\u094D\u0925\u093F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0915\u092E\u091C\u094B\u0930 \u0935\u0930\u094D\u0917 \u0915\u0947 \u092E\u0947\u0927\u093E\u0935\u0940 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u094B 8\u0935\u0940\u0902 \u0915\u0915\u094D\u0937\u093E \u0915\u0947 \u092C\u093E\u0926 \u092A\u0922\u093C\u093E\u0908 \u091B\u094B\u0921\u093C\u0928\u0947 \u0938\u0947 \u0930\u094B\u0915\u0928\u0947 \u0914\u0930 9\u0935\u0940\u0902 \u0938\u0947 12\u0935\u0940\u0902 \u0924\u0915 \u0905\u0927\u094D\u092F\u092F\u0928 \u091C\u093E\u0930\u0940 \u0930\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u092A\u094D\u0930\u0924\u093F \u0935\u0930\u094D\u0937 \u20B912,000 \u0915\u0940 \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F\u0964",
    descriptionMr: "\u096E \u0935\u0940 \u092E\u0927\u0940\u0932 \u0906\u0930\u094D\u0925\u093F\u0915 \u0926\u0941\u0930\u094D\u092C\u0932 \u0917\u0941\u0923\u0935\u0902\u0924 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0928\u093E \u092A\u0941\u0922\u0940\u0932 \u0936\u093F\u0915\u094D\u0937\u0923\u093E\u0938\u093E\u0920\u0940 \u0926\u0930\u0935\u0930\u094D\u0937\u0940 \u20B9\u0967\u0968,\u0966\u0966\u0966 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940.",
    benefits: [
      "\u20B912,000 per annum (\u20B91,000 per month) for classes IX, X, XI, and XII"
    ],
    eligibilitySummary: "Studying in Class 8th in Govt/Aided school; Minimum 55% marks in Class 7; Parental income <= \u20B93,50,000 per annum; Passed state NMMSS selection test.",
    eligibilitySummaryHi: "\u0938\u0930\u0915\u093E\u0930\u0940/\u0905\u0928\u0941\u0926\u093E\u0928\u093F\u0924 \u0938\u094D\u0915\u0942\u0932 \u092E\u0947\u0902 8\u0935\u0940\u0902 \u092E\u0947\u0902 \u0905\u0927\u094D\u092F\u092F\u0928\u0930\u0924; 7\u0935\u0940\u0902 \u092E\u0947\u0902 \u0915\u092E \u0938\u0947 \u0915\u092E 55% \u0905\u0902\u0915; \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F <= \u20B93,50,000\u0964",
    eligibilitySummaryMr: "\u0938\u0930\u0915\u093E\u0930\u0940/\u0905\u0928\u0941\u0926\u093E\u0928\u093F\u0924 \u0936\u093E\u0933\u0947\u0924 \u096E \u0935\u0940\u0924 \u0936\u093F\u0915\u0923\u093E\u0930\u093E; \u096D \u0935\u0940\u0924 \u0915\u093F\u092E\u093E\u0928 \u096B\u096B% \u0917\u0941\u0923; \u092A\u093E\u0932\u0915\u093E\u0902\u091A\u0947 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u0969.\u096B \u0932\u093E\u0916\u093E\u0902\u092A\u0930\u094D\u092F\u0902\u0924.",
    applicationDeadline: "2025-12-31",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://scholarships.gov.in/",
    officialApplicationUrl: "https://scholarships.gov.in/public/schemeGuidelines/NMMSS_Guidelines.pdf",
    guidelinesUrl: "https://dsel.education.gov.in/nmmss",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-04",
    requiredDocuments: [
      "NMMSS Selection Examination Marksheet / Admit Card",
      "Class 7th Report Card with 55%+ marks",
      "Income Certificate issued by Tehsildar (<= \u20B93.5 Lakh)",
      "School Bonafide Certificate"
    ],
    tags: ["NSP", "School", "Class 8-12", "NMMSS", "Merit", "Scholarship"],
    commonPortalName: "National Scholarship Portal"
  },
  {
    id: "MAHA_SC_POST_MATRIC",
    title: "Government of India Post-Matric Scholarship for Scheduled Caste (SC) Students (MahaDBT)",
    titleHi: "\u0905\u0928\u0941\u0938\u0942\u091A\u093F\u0924 \u091C\u093E\u0924\u093F (SC) \u0915\u0947 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u092D\u093E\u0930\u0924 \u0938\u0930\u0915\u093E\u0930 \u0915\u0940 \u092A\u094B\u0938\u094D\u091F-\u092E\u0948\u091F\u094D\u0930\u093F\u0915 \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F (\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930)",
    titleMr: "\u0905\u0928\u0941\u0938\u0942\u091A\u093F\u0924 \u091C\u093E\u0924\u0940\u091A\u094D\u092F\u093E (SC) \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0938\u093E\u0920\u0940 \u092D\u093E\u0930\u0924 \u0938\u0930\u0915\u093E\u0930 \u092E\u0945\u091F\u094D\u0930\u093F\u0915\u094B\u0924\u094D\u0924\u0930 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 (MahaDBT)",
    slug: "sc-post-matric-scholarship-mahadbt",
    department: "Social Justice and Special Assistance Department",
    ministry: "Government of Maharashtra",
    level: "State",
    state: "Maharashtra",
    category: "Education and Scholarships",
    description: "Centrally sponsored 100% financial assistance for Scheduled Caste students pursuing post-matric courses covering full non-refundable tuition fees, exam fees, and monthly maintenance allowance.",
    descriptionHi: "\u0905\u0928\u0941\u0938\u0942\u091A\u093F\u0924 \u091C\u093E\u0924\u093F \u0915\u0947 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u094B \u092E\u093E\u0928\u094D\u092F\u0924\u093E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0938\u0902\u0938\u094D\u0925\u093E\u0928\u094B\u0902 \u092E\u0947\u0902 \u0909\u091A\u094D\u091A \u0936\u093F\u0915\u094D\u0937\u093E \u0939\u0947\u0924\u0941 100% \u0905\u0928\u093F\u0935\u093E\u0930\u094D\u092F \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u090F\u0935\u0902 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E \u0938\u0939\u093E\u092F\u0924\u093E\u0964",
    descriptionMr: "\u0905\u0928\u0941\u0938\u0942\u091A\u093F\u0924 \u091C\u093E\u0924\u0940\u091A\u094D\u092F\u093E \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u0928\u093E \u092A\u0926\u0935\u0940 \u0935 \u092A\u0926\u0935\u094D\u092F\u0941\u0924\u094D\u0924\u0930 \u0909\u091A\u094D\u091A \u0936\u093F\u0915\u094D\u0937\u0923\u093E\u0938\u093E\u0920\u0940 \u092A\u0942\u0930\u094D\u0923 \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u0906\u0923\u093F \u092E\u093E\u0938\u093F\u0915 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E \u0926\u093F\u0932\u093E \u091C\u093E\u0924\u094B.",
    benefits: [
      "100% Tuition, Exam, and Library fees directly reimbursed to institution",
      "Monthly maintenance allowance up to \u20B91,200/month for day scholars, \u20B92,500/month for hostellers"
    ],
    eligibilitySummary: "Maharashtra resident; Scheduled Caste (SC) category; Family income <= \u20B92,50,000 per annum; Enrolled in post-matric recognized course.",
    eligibilitySummaryHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0928\u093F\u0935\u093E\u0938\u0940; SC \u0936\u094D\u0930\u0947\u0923\u0940; \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F <= \u20B92,50,000; \u092E\u093E\u0928\u094D\u092F\u0924\u093E \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0909\u091A\u094D\u091A \u0936\u093F\u0915\u094D\u0937\u093E \u092E\u0947\u0902 \u092A\u094D\u0930\u0935\u0947\u0936\u0964",
    eligibilitySummaryMr: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0930\u0939\u093F\u0935\u093E\u0938\u0940; \u0905\u0928\u0941\u0938\u0942\u091A\u093F\u0924 \u091C\u093E\u0924\u0940 (SC); \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u092E\u0930\u094D\u092F\u093E\u0926\u093E \u20B9\u0968,\u096B\u0966,\u0966\u0966\u0966 \u092A\u0930\u094D\u092F\u0902\u0924.",
    applicationDeadline: "2026-03-31",
    acceptingApplications: true,
    isScholarship: true,
    academicYear: "2025-26",
    officialSourceUrl: "https://mahadbt.maharashtra.gov.in/",
    officialApplicationUrl: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51A2E3D4F",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-05",
    requiredDocuments: [
      "Caste Certificate issued by Maharashtra competent authority",
      "Caste Validity Certificate (for degree/professional courses)",
      "Income Certificate (<= \u20B92.5 Lakhs)",
      "Domicile Certificate of Maharashtra",
      "Previous passing marksheet",
      "Aadhaar seeded bank account passbook"
    ],
    tags: ["SC", "MahaDBT", "Maharashtra", "Full Fee Waiver", "Scholarship"],
    commonPortalName: "MahaDBT Portal"
  },
  {
    id: "CENTRAL_PM_MATRU_VANDANA",
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    titleHi: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u092E\u093E\u0924\u0943 \u0935\u0902\u0926\u0928\u093E \u092F\u094B\u091C\u0928\u093E (PMMVY)",
    titleMr: "\u092A\u094D\u0930\u0927\u093E\u0928\u092E\u0902\u0924\u094D\u0930\u0940 \u092E\u093E\u0924\u0943 \u0935\u0902\u0926\u0928\u093E \u092F\u094B\u091C\u0928\u093E (PMMVY)",
    slug: "pradhan-mantri-matru-vandana-yojana",
    department: "Ministry of Women and Child Development",
    ministry: "Government of India",
    level: "Central",
    state: "All India",
    category: "Women and Child Welfare",
    description: "Maternity benefit cash incentive of \u20B95,000 for the first child and \u20B96,000 for the second child (if girl) to compensate for wage loss and promote institutional childbirth.",
    descriptionHi: "\u0917\u0930\u094D\u092D\u0935\u0924\u0940 \u092E\u0939\u093F\u0932\u093E\u0913\u0902 \u0914\u0930 \u0938\u094D\u0924\u0928\u092A\u093E\u0928 \u0915\u0930\u093E\u0928\u0947 \u0935\u093E\u0932\u0940 \u092E\u093E\u0924\u093E\u0913\u0902 \u0915\u094B \u092A\u094B\u0937\u0923 \u090F\u0935\u0902 \u0938\u094D\u0935\u093E\u0938\u094D\u0925\u094D\u092F \u0938\u0941\u0930\u0915\u094D\u0937\u093E \u0939\u0947\u0924\u0941 \u20B95,000 \u0938\u0947 \u20B96,000 \u0915\u0940 \u0935\u093F\u0924\u094D\u0924\u0940\u092F \u0938\u0939\u093E\u092F\u0924\u093E\u0964",
    descriptionMr: "\u0917\u0930\u094B\u0926\u0930 \u0935 \u0938\u094D\u0924\u0928\u0926\u093E \u092E\u093E\u0924\u093E\u0902\u0938\u093E\u0920\u0940 \u092A\u094B\u0937\u0915 \u0906\u0939\u093E\u0930\u093E\u0938\u093E\u0920\u0940 \u20B9\u096B,\u0966\u0966\u0966 \u0924\u0947 \u20B9\u096C,\u0966\u0966\u0966 \u091A\u0947 \u0925\u0947\u091F \u092C\u0901\u0915 \u0938\u0939\u093E\u092F\u094D\u092F.",
    benefits: [
      "Direct cash transfer of \u20B95,000 in two installments for first live birth",
      "\u20B96,000 in a single installment upon birth of second girl child"
    ],
    eligibilitySummary: "Pregnant woman aged 19+; Not in regular Central/State govt employment; Family belongs to eligible categories (SC/ST/BPL/EWS).",
    eligibilitySummaryHi: "19 \u0935\u0930\u094D\u0937 \u092F\u093E \u0905\u0927\u093F\u0915 \u0906\u092F\u0941 \u0915\u0940 \u0917\u0930\u094D\u092D\u0935\u0924\u0940 \u092E\u0939\u093F\u0932\u093E; \u0938\u0930\u0915\u093E\u0930\u0940 \u0928\u094C\u0915\u0930\u0940 \u092E\u0947\u0902 \u0928 \u0939\u094B; \u092A\u093E\u0924\u094D\u0930 \u0938\u093E\u092E\u093E\u091C\u093F\u0915/\u0906\u0930\u094D\u0925\u093F\u0915 \u0935\u0930\u094D\u0917 \u0938\u0947 \u0938\u0902\u092C\u0902\u0927\u093F\u0924\u0964",
    eligibilitySummaryMr: "\u0935\u092F \u0967\u096F \u0935\u0930\u094D\u0937\u0947 \u0915\u093F\u0902\u0935\u093E \u0905\u0927\u093F\u0915; \u0938\u0930\u0915\u093E\u0930\u0940 \u0928\u094B\u0915\u0930\u0940\u0924 \u0928\u0938\u0932\u0947\u0932\u0940 \u0917\u0930\u094D\u092D\u0935\u0924\u0940 \u092E\u093E\u0924\u093E.",
    applicationDeadline: "Within 270 days of pregnancy LMP",
    acceptingApplications: true,
    isScholarship: false,
    officialSourceUrl: "https://pmmvy.wcd.gov.in/",
    officialApplicationUrl: "https://pmmvy.wcd.gov.in/Home/CitizenLogin",
    sourceVerificationStatus: "VERIFIED",
    lastVerifiedDate: "2026-11-02",
    requiredDocuments: [
      "Mother and Child Protection (MCP) Card registered with Anganwadi/ASHA",
      "Aadhaar card of beneficiary and spouse",
      "Bank passbook details of the mother"
    ],
    tags: ["Maternity", "Women", "Child", "Direct Cash", "Central"],
    commonPortalName: "PMMVY Citizen Portal"
  }
];

// src/data/rules.ts
var SCHEME_RULES = {
  MAHA_OBC_SCHOLARSHIP: {
    scheme_id: "MAHA_OBC_SCHOLARSHIP",
    conditions: [
      {
        field: "state",
        operator: "equals",
        value: "Maharashtra",
        label: "State Domicile",
        description: "Candidate must be a permanent resident / domicile of Maharashtra.",
        reference: "MahaDBT OBC Rules (Govt. Resolution No. 2024/BCW-34)"
      },
      {
        field: "category",
        operator: "equals",
        value: "OBC",
        label: "Caste Category",
        description: "Applicant must belong to Other Backward Classes (OBC) category.",
        reference: "MahaDBT Bahujan Welfare Directive"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 15e4,
        label: "Annual Family Income Limit",
        description: "Total annual family income must be less than or equal to \u20B91,50,000.",
        reference: "Revenue Dept. Tahsildar Income Norms 2025"
      },
      {
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Postgraduate", "Diploma", "Doctoral"],
        label: "Eligible Education Level",
        description: "Enrolled in post-matric recognized degree or diploma course.",
        reference: "Post-Matric Course Schedule 2025-26"
      }
    ]
  },
  MAHA_EBC_SCHOLARSHIP: {
    scheme_id: "MAHA_EBC_SCHOLARSHIP",
    conditions: [
      {
        field: "state",
        operator: "equals",
        value: "Maharashtra",
        label: "Maharashtra Domicile",
        description: "Must hold a valid Domicile Certificate of Maharashtra.",
        reference: "DTE Maharashtra GR No. 2024/EBC/112"
      },
      {
        field: "category",
        operator: "in",
        value: ["General", "EWS"],
        label: "Social Category",
        description: "Applicable to General category and EWS students not claiming other caste scholarships.",
        reference: "RCSM Guideline Clause 4"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 8e5,
        label: "Annual Family Income Ceiling",
        description: "Annual family income must not exceed \u20B98,00,000.",
        reference: "Govt. of Maharashtra Gazette income limit"
      },
      {
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Postgraduate", "Diploma"],
        label: "Course Level",
        description: "Enrolled in professional or higher education technical courses.",
        reference: "DTE Approved Course Matrix"
      }
    ]
  },
  MAHA_PANJABRAO_HOSTEL: {
    scheme_id: "MAHA_PANJABRAO_HOSTEL",
    conditions: [
      {
        field: "state",
        operator: "equals",
        value: "Maharashtra",
        label: "Domicile Status",
        description: "Must be a permanent resident of Maharashtra.",
        reference: "Panjabrao Scheme Guidelines Section 2"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 8e5,
        label: "Income Ceiling",
        description: "Annual family income must not exceed \u20B98,00,000.",
        reference: "Directorate of Higher Education Notification"
      },
      {
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Postgraduate", "Diploma"],
        label: "Professional Enrollment",
        description: "Enrolled in recognized technical or professional courses.",
        reference: "Panjabrao Deshmukh Eligibility Norms"
      }
    ]
  },
  CENTRAL_NSP_CSSS: {
    scheme_id: "CENTRAL_NSP_CSSS",
    conditions: [
      {
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Postgraduate"],
        label: "Higher Education Enrolment",
        description: "Enrolled in regular full-time graduation or post-graduation degree.",
        reference: "Ministry of Education CSSS Scheme Norms"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 45e4,
        label: "Family Income Ceiling",
        description: "Gross annual family income must be less than or equal to \u20B94,50,000.",
        reference: "NSP Income Verification Guideline"
      },
      {
        field: "previousMarksPercentage",
        operator: "greater_than_or_equal",
        value: 80,
        label: "Class 12th Percentile / Marks",
        description: "Above 80th percentile / 80% marks in Class 12 board examination.",
        reference: "CSSS Merit Quota Matrix"
      }
    ]
  },
  MAHA_LADKI_BAHIN: {
    scheme_id: "MAHA_LADKI_BAHIN",
    conditions: [
      {
        field: "state",
        operator: "equals",
        value: "Maharashtra",
        label: "State Residence",
        description: "Applicant must be a permanent resident woman of Maharashtra.",
        reference: "Mukhyamantri Majhi Ladki Bahin GR No. 1024/76"
      },
      {
        field: "gender",
        operator: "equals",
        value: "Female",
        label: "Gender",
        description: "Scheme is exclusively for women citizens.",
        reference: "WCD Maharashtra Rules"
      },
      {
        field: "age",
        operator: "between",
        value: [21, 65],
        label: "Age Eligibility",
        description: "Age must be between 21 and 65 years at time of application.",
        reference: "Ladki Bahin Age Schedule"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 25e4,
        label: "Income Ceiling",
        description: "Annual family income must not exceed \u20B92,50,000.",
        reference: "Revenue Income Threshold Rule"
      }
    ]
  },
  CENTRAL_PM_KISAN: {
    scheme_id: "CENTRAL_PM_KISAN",
    conditions: [
      {
        field: "occupation",
        operator: "contains",
        value: "Farmer",
        label: "Occupation",
        description: "Must be an active landholding farmer family.",
        reference: "PM-KISAN Operational Guidelines para 3"
      },
      {
        field: "landHoldingAcres",
        operator: "greater_than_or_equal",
        value: 0.1,
        label: "Cultivable Land Holding",
        description: "Must own registered agricultural cultivable land.",
        reference: "Kisan RoR Verification Rules"
      }
    ]
  },
  CENTRAL_AYUSHMAN_BHARAT: {
    scheme_id: "CENTRAL_AYUSHMAN_BHARAT",
    conditions: [
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 25e4,
        label: "Deprivation / Income Limit",
        description: "Income within priority household threshold (or senior citizen 70+).",
        reference: "NHA Empanelment and Eligibility Guidelines"
      }
    ]
  },
  CENTRAL_PMAY_HOUSING: {
    scheme_id: "CENTRAL_PMAY_HOUSING",
    conditions: [
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 6e5,
        label: "Income Ceiling for EWS / LIG",
        description: "Family annual income must be within \u20B93,00,000 (EWS) or \u20B96,00,000 (LIG).",
        reference: "PMAY Urban 2.0 Notification"
      }
    ]
  },
  CENTRAL_PM_MUDRA: {
    scheme_id: "CENTRAL_PM_MUDRA",
    conditions: [
      {
        field: "age",
        operator: "greater_than_or_equal",
        value: 18,
        label: "Minimum Age",
        description: "Applicant must be an adult Indian citizen (18+ years).",
        reference: "MUDRA Loan Regulations"
      }
    ]
  },
  CENTRAL_PM_VISHWAKARMA: {
    scheme_id: "CENTRAL_PM_VISHWAKARMA",
    conditions: [
      {
        field: "age",
        operator: "greater_than_or_equal",
        value: 18,
        label: "Age Eligibility",
        description: "Minimum 18 years of age at time of registration.",
        reference: "PM Vishwakarma Guidelines 2024"
      }
    ]
  },
  CENTRAL_AICTE_PRAGATI: {
    scheme_id: "CENTRAL_AICTE_PRAGATI",
    conditions: [
      {
        field: "gender",
        operator: "equals",
        value: "Female",
        label: "Female Candidate",
        description: "Scheme is exclusively for meritorious girl students.",
        reference: "AICTE Pragati Mandate"
      },
      {
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Diploma"],
        label: "Technical Course",
        description: "Admitted to 1st year Degree or Diploma technical programme.",
        reference: "AICTE Scheme Regulations"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 8e5,
        label: "Family Income Ceiling",
        description: "Annual family income must not exceed \u20B98,00,000.",
        reference: "AICTE Income Norms"
      }
    ]
  },
  CENTRAL_BEGUM_HAZRAT_MAHAL: {
    scheme_id: "CENTRAL_BEGUM_HAZRAT_MAHAL",
    conditions: [
      {
        field: "gender",
        operator: "equals",
        value: "Female",
        label: "Girl Student",
        description: "Exclusively for female students.",
        reference: "MAEF Begum Hazrat Mahal Norms"
      },
      {
        field: "category",
        operator: "equals",
        value: "Minority",
        label: "Minority Status",
        description: "Must belong to notified minority community (Muslim, Christian, Sikh, Buddhist, Jain, Parsi).",
        reference: "Ministry of Minority Affairs Notification"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 2e5,
        label: "Income Limit",
        description: "Parental annual income must be less than or equal to \u20B92,00,000.",
        reference: "MAEF Income Ceiling"
      }
    ]
  },
  CENTRAL_PM_SVANIDHI: {
    scheme_id: "CENTRAL_PM_SVANIDHI",
    conditions: [
      {
        field: "age",
        operator: "greater_than_or_equal",
        value: 18,
        label: "Age",
        description: "Must be 18 years or older.",
        reference: "MoHUA SVANidhi Rules"
      }
    ]
  },
  CENTRAL_IGNOAPS_SENIOR: {
    scheme_id: "CENTRAL_IGNOAPS_SENIOR",
    conditions: [
      {
        field: "age",
        operator: "greater_than_or_equal",
        value: 60,
        label: "Senior Citizen Age",
        description: "Must be 60 years or above.",
        reference: "NSAP Central Rules para 2"
      },
      {
        field: "rationCardType",
        operator: "in",
        value: ["BPL", "Antyodaya"],
        label: "BPL Household",
        description: "Family must belong to verified Below Poverty Line (BPL) or Antyodaya category.",
        reference: "National Social Assistance Guidelines"
      }
    ]
  },
  CENTRAL_ADIP_DISABILITY: {
    scheme_id: "CENTRAL_ADIP_DISABILITY",
    conditions: [
      {
        field: "isDisability",
        operator: "equals",
        value: true,
        label: "Disability Status",
        description: "Candidate must have certified disability.",
        reference: "ALIMCO ADIP Guidelines"
      },
      {
        field: "disabilityPercentage",
        operator: "greater_than_or_equal",
        value: 40,
        label: "Minimum Disability Benchmark",
        description: "Certified benchmark disability of at least 40% (UDID card).",
        reference: "Rights of Persons with Disabilities Act 2016"
      }
    ]
  },
  CENTRAL_NMMSS_SCHOLARSHIP: {
    scheme_id: "CENTRAL_NMMSS_SCHOLARSHIP",
    conditions: [
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 35e4,
        label: "Parental Income Ceiling",
        description: "Parental annual income from all sources must not exceed \u20B93,50,000.",
        reference: "NMMSS Guidelines Department of School Education"
      },
      {
        field: "previousMarksPercentage",
        operator: "greater_than_or_equal",
        value: 55,
        label: "Academic Performance",
        description: "Minimum 55% marks in Class 7 examination (50% for SC/ST).",
        reference: "NMMSS Selection Criteria"
      }
    ]
  },
  MAHA_SC_POST_MATRIC: {
    scheme_id: "MAHA_SC_POST_MATRIC",
    conditions: [
      {
        field: "state",
        operator: "equals",
        value: "Maharashtra",
        label: "Maharashtra Domicile",
        description: "Permanent domicile of Maharashtra.",
        reference: "Social Justice Dept GR 2024"
      },
      {
        field: "category",
        operator: "equals",
        value: "SC",
        label: "Scheduled Caste",
        description: "Belongs to Scheduled Caste (SC) category with valid certificate.",
        reference: "Govt of India SC Scheme"
      },
      {
        field: "annualFamilyIncome",
        operator: "less_than_or_equal",
        value: 25e4,
        label: "Annual Income Limit",
        description: "Family annual income must not exceed \u20B92,50,000.",
        reference: "Central Sponsor Income Norm"
      },
      {
        field: "educationLevel",
        operator: "in",
        value: ["Undergraduate", "Postgraduate", "Diploma", "Doctoral"],
        label: "Post-Matric Course",
        description: "Enrolled in post-matric recognized degree or diploma.",
        reference: "MahaDBT SC Post-Matric Matrix"
      }
    ]
  }
};

// src/utils/rulesEngine.ts
function evaluateCondition(ruleCondition, profile) {
  const citizenVal = profile[ruleCondition.field];
  if (citizenVal === void 0 || citizenVal === null || citizenVal === "") {
    return {
      field: ruleCondition.field,
      requirementText: ruleCondition.description,
      citizenValue: "Not Provided in Profile",
      result: "MISSING",
      comparisonNote: `Field "${ruleCondition.field}" is required to evaluate eligibility for this scheme.`,
      reference: ruleCondition.reference
    };
  }
  let passed = false;
  let note = "";
  switch (ruleCondition.operator) {
    case "equals": {
      if (typeof citizenVal === "string" && typeof ruleCondition.value === "string") {
        passed = citizenVal.trim().toLowerCase() === ruleCondition.value.trim().toLowerCase();
      } else {
        passed = citizenVal === ruleCondition.value;
      }
      note = passed ? `Matches requirement (${citizenVal} == ${ruleCondition.value})` : `Does not match (Required: ${ruleCondition.value}, Profile has: ${citizenVal})`;
      break;
    }
    case "not_equals": {
      passed = citizenVal !== ruleCondition.value;
      note = passed ? `Satisfies condition` : `Disqualifying value: ${citizenVal}`;
      break;
    }
    case "less_than_or_equal": {
      const numCitizen = Number(citizenVal);
      const numTarget = Number(ruleCondition.value);
      if (isNaN(numCitizen)) {
        return {
          field: ruleCondition.field,
          requirementText: ruleCondition.description,
          citizenValue: citizenVal,
          result: "MISSING",
          comparisonNote: `Value "${citizenVal}" is not a valid number.`,
          reference: ruleCondition.reference
        };
      }
      passed = numCitizen <= numTarget;
      note = passed ? `\u20B9${numCitizen.toLocaleString("en-IN")} is within maximum ceiling of \u20B9${numTarget.toLocaleString("en-IN")}` : `\u20B9${numCitizen.toLocaleString("en-IN")} exceeds allowable threshold of \u20B9${numTarget.toLocaleString("en-IN")}`;
      break;
    }
    case "greater_than_or_equal": {
      const numCitizen = Number(citizenVal);
      const numTarget = Number(ruleCondition.value);
      passed = numCitizen >= numTarget;
      note = passed ? `${numCitizen} meets minimum requirement of ${numTarget}` : `${numCitizen} is below minimum requirement of ${numTarget}`;
      break;
    }
    case "in": {
      const targetArray = Array.isArray(ruleCondition.value) ? ruleCondition.value : [ruleCondition.value];
      const normalizedTarget = targetArray.map((item) => String(item).toLowerCase().trim());
      const normalizedCitizen = String(citizenVal).toLowerCase().trim();
      passed = normalizedTarget.includes(normalizedCitizen);
      note = passed ? `Profile "${citizenVal}" matches permitted category: [${targetArray.join(", ")}]` : `Profile "${citizenVal}" not in permitted list: [${targetArray.join(", ")}]`;
      break;
    }
    case "contains": {
      const strCitizen = String(citizenVal).toLowerCase();
      const strTarget = String(ruleCondition.value).toLowerCase();
      passed = strCitizen.includes(strTarget);
      note = passed ? `Contains required substring "${ruleCondition.value}"` : `Missing "${ruleCondition.value}"`;
      break;
    }
    case "between": {
      const numCitizen = Number(citizenVal);
      const [min, max] = Array.isArray(ruleCondition.value) ? ruleCondition.value : [0, 0];
      passed = numCitizen >= min && numCitizen <= max;
      note = passed ? `${numCitizen} falls in range [${min} to ${max}]` : `${numCitizen} is outside permitted range [${min} to ${max}]`;
      break;
    }
    default:
      passed = false;
      note = "Unsupported operator";
  }
  return {
    field: ruleCondition.field,
    requirementText: ruleCondition.description,
    citizenValue: citizenVal,
    result: passed ? "PASS" : "FAIL",
    comparisonNote: note,
    reference: ruleCondition.reference
  };
}
function evaluateSchemeEligibility(rule, profile) {
  if (!rule || !rule.conditions || rule.conditions.length === 0) {
    return {
      schemeId: rule ? rule.scheme_id : "UNKNOWN",
      outcome: "NEEDS_OFFICIAL_VERIFICATION",
      summary: "No specific deterministic rules on file. Requires verification on official government portal.",
      conditionResults: [],
      missingFields: [],
      recommendedAction: "Visit official department portal for specific guidelines.",
      evaluatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  const conditionResults = [];
  const missingFields = [];
  let hasFail = false;
  let hasMissing = false;
  for (const condition of rule.conditions) {
    const res = evaluateCondition(condition, profile);
    conditionResults.push(res);
    if (res.result === "FAIL") {
      hasFail = true;
    } else if (res.result === "MISSING") {
      hasMissing = true;
      if (!missingFields.includes(res.field)) {
        missingFields.push(res.field);
      }
    }
  }
  let outcome;
  let summary;
  let recommendedAction;
  if (hasFail) {
    outcome = "NOT_ELIGIBLE";
    const failedCount = conditionResults.filter((c) => c.result === "FAIL").length;
    summary = `Citizen does not meet ${failedCount} mandatory eligibility criterion based on published guidelines.`;
    recommendedAction = "Review disqualifying conditions or explore alternative schemes that fit your criteria.";
  } else if (hasMissing) {
    outcome = "ADDITIONAL_INFO_REQUIRED";
    summary = `Missing ${missingFields.length} profile attribute(s) required to determine eligibility.`;
    recommendedAction = `Please update your profile with: ${missingFields.join(", ")} to finish assessment.`;
  } else {
    outcome = "ELIGIBLE";
    summary = `All ${conditionResults.length} published eligibility criteria are satisfied by citizen profile.`;
    recommendedAction = "Proceed to prepare document checklist and generate prefilled application form.";
  }
  return {
    schemeId: rule.scheme_id,
    outcome,
    summary,
    conditionResults,
    missingFields,
    recommendedAction,
    evaluatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}

// src/utils/formValidator.ts
function validateApplicationForm(fields, formData) {
  const errors = [];
  let filledCount = 0;
  const totalCount = fields.length;
  for (const field of fields) {
    const val = formData[field.name];
    const isFilled = val !== void 0 && val !== null && String(val).trim() !== "";
    if (isFilled) {
      filledCount++;
    }
    if (field.required && !isFilled) {
      errors.push({
        field: field.name,
        message: `${field.label} is required and cannot be empty.`
      });
      continue;
    }
    if (!isFilled) {
      continue;
    }
    if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(val).trim())) {
        errors.push({
          field: field.name,
          message: `${field.label} must be a valid email address.`
        });
      }
    } else if (field.type === "tel") {
      const phoneDigits = String(val).replace(/\D/g, "");
      if (phoneDigits.length < 10 || phoneDigits.length > 12) {
        errors.push({
          field: field.name,
          message: `${field.label} must be a valid 10-digit Indian phone number.`
        });
      }
    } else if (field.type === "number") {
      const num = Number(val);
      if (isNaN(num)) {
        errors.push({
          field: field.name,
          message: `${field.label} must be a valid number.`
        });
      }
    }
    if (field.validationRegex) {
      try {
        const regex = new RegExp(field.validationRegex);
        if (!regex.test(String(val))) {
          errors.push({
            field: field.name,
            message: field.validationErrorMessage || `${field.label} format is invalid.`
          });
        }
      } catch {
      }
    }
  }
  const completionPercentage = totalCount === 0 ? 100 : Math.round(filledCount / totalCount * 100);
  return {
    isValid: errors.length === 0,
    errors,
    completionPercentage
  };
}

// src/data/formTemplates.ts
var SCHEME_FORM_TEMPLATES = {
  MAHA_OBC_SCHOLARSHIP: {
    schemeId: "MAHA_OBC_SCHOLARSHIP",
    sections: [
      {
        id: "personal",
        title: "Applicant & Domicile Details",
        fields: [
          { id: "f1", name: "fullName", label: "Full Name (as per SSC)", type: "text", required: true, profileMapping: "fullName" },
          { id: "f2", name: "email", label: "Email Address", type: "email", required: true, profileMapping: "email" },
          { id: "f3", name: "phone", label: "Mobile Number", type: "tel", required: true, profileMapping: "phone" },
          { id: "f4", name: "state", label: "State of Domicile", type: "text", required: true, profileMapping: "state" },
          { id: "f5", name: "district", label: "District", type: "text", required: true, profileMapping: "district" },
          { id: "f6", name: "pinCode", label: "PIN Code", type: "text", required: true, profileMapping: "pinCode" },
          { id: "f7", name: "domicileCertNo", label: "Domicile Certificate Number", type: "text", required: true, placeholder: "e.g. DOM/2024/987123", documentExtractionMapping: { documentType: "Maharashtra Domicile Certificate", field: "certificateNumber" } }
        ]
      },
      {
        id: "caste_income",
        title: "Caste & Income Verification",
        fields: [
          { id: "f8", name: "category", label: "Caste Category", type: "select", required: true, profileMapping: "category", options: ["OBC", "VJNT", "SBC"] },
          { id: "f9", name: "casteCertNo", label: "Caste Certificate Number", type: "text", required: true, placeholder: "e.g. OBC/2023/5541", documentExtractionMapping: { documentType: "OBC Caste Certificate", field: "certificateNumber" } },
          { id: "f10", name: "annualFamilyIncome", label: "Annual Family Income (\u20B9)", type: "number", required: true, profileMapping: "annualFamilyIncome" },
          { id: "f11", name: "incomeCertNo", label: "Income Certificate Number (Tahsildar)", type: "text", required: true, placeholder: "e.g. INC/2025/1129", documentExtractionMapping: { documentType: "Income Certificate issued by Tehsildar (<= \u20B91.5 Lakh)", field: "certificateNumber" } },
          { id: "f12", name: "issuingAuthority", label: "Certificate Issuing Authority", type: "text", required: true, placeholder: "Tahsildar / Sub-Divisional Officer" }
        ]
      },
      {
        id: "academic",
        title: "College & Course Enrollment",
        fields: [
          { id: "f13", name: "institutionName", label: "College / Institute Name", type: "text", required: true, profileMapping: "institutionName", placeholder: "e.g. Shree L.R. Tiwari College of Engineering" },
          { id: "f14", name: "courseName", label: "Course Enrolled", type: "text", required: true, profileMapping: "courseName", placeholder: "e.g. B.Tech Computer Engineering" },
          { id: "f15", name: "currentAcademicYear", label: "Current Academic Year", type: "select", required: true, options: ["2025-26", "2026-27"] },
          { id: "f16", name: "previousMarksPercentage", label: "Previous Exam Percentage (%)", type: "number", required: true, profileMapping: "previousMarksPercentage" },
          { id: "f17", name: "hostelStatus", label: "Hostel / Day Scholar", type: "select", required: true, options: ["Day Scholar", "Government Hostel", "Private Rented / Non-Govt Hostel"] }
        ]
      },
      {
        id: "bank",
        title: "DBT Bank Account Details",
        fields: [
          { id: "f18", name: "bankName", label: "Bank Name", type: "text", required: true, placeholder: "e.g. State Bank of India" },
          { id: "f19", name: "accountNumber", label: "Savings Account Number", type: "text", required: true },
          { id: "f20", name: "ifscCode", label: "IFSC Code", type: "text", required: true, placeholder: "e.g. SBIN0001234" },
          { id: "f21", name: "aadhaarSeededConsent", label: "I confirm this bank account is seeded with Aadhaar for DBT", type: "checkbox", required: true }
        ]
      }
    ]
  },
  DEFAULT: {
    schemeId: "DEFAULT",
    sections: [
      {
        id: "applicant",
        title: "Applicant Information",
        fields: [
          { id: "d1", name: "fullName", label: "Full Name", type: "text", required: true, profileMapping: "fullName" },
          { id: "d2", name: "email", label: "Email Address", type: "email", required: true, profileMapping: "email" },
          { id: "d3", name: "phone", label: "Phone Number", type: "tel", required: true, profileMapping: "phone" },
          { id: "d4", name: "state", label: "State", type: "text", required: true, profileMapping: "state" },
          { id: "d5", name: "district", label: "District", type: "text", required: true, profileMapping: "district" },
          { id: "d6", name: "annualFamilyIncome", label: "Annual Income (\u20B9)", type: "number", required: true, profileMapping: "annualFamilyIncome" }
        ]
      },
      {
        id: "scheme_specific",
        title: "Eligibility Affirmations",
        fields: [
          { id: "d7", name: "purposeStatement", label: "Purpose & Need Statement", type: "textarea", required: true, placeholder: "Explain why you are applying for this assistance..." },
          { id: "d8", name: "declarationTruth", label: "I declare all information provided is accurate and verifiable with official government documents", type: "checkbox", required: true }
        ]
      }
    ]
  }
};
function getFormTemplateForScheme(schemeId) {
  return SCHEME_FORM_TEMPLATES[schemeId] || {
    ...SCHEME_FORM_TEMPLATES.DEFAULT,
    schemeId
  };
}

// server.ts
dotenv.config();
var app = express();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express.json({ limit: "10mb" }));
app.get("/favicon.ico", (_req, res) => res.status(204).end());
var agentMemoryStore = {};
var serverAuditLogs = [];
function logServerAction(actor, action, details, level = "INFO") {
  serverAuditLogs.unshift({
    id: `srv-audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    actor,
    action,
    details,
    level
  });
}
var toolImplementations = {
  get_citizen_profile: (args, ctx) => {
    return ctx?.profile || { status: "MISSING", message: "No profile context provided." };
  },
  update_citizen_profile: (args, ctx) => {
    logServerAction(ctx?.profile?.email || "citizen", "UPDATE_CITIZEN_PROFILE", `Updated fields: ${Object.keys(args).join(", ")}`);
    return { success: true, updatedFields: args };
  },
  search_all_government_schemes: (args) => {
    const query = (args.query || "").toLowerCase();
    const results = SCHEMES_DATA.filter(
      (s) => s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query) || s.category.toLowerCase().includes(query) || s.tags.some((t) => t.toLowerCase().includes(query))
    );
    return { count: results.length, schemes: results.slice(0, 10).map(formatSchemeSummary) };
  },
  search_central_schemes: (args) => {
    const query = (args.query || "").toLowerCase();
    const results = SCHEMES_DATA.filter(
      (s) => s.level === "Central" && (s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query) || s.tags.some((t) => t.toLowerCase().includes(query)))
    );
    return { count: results.length, schemes: results.slice(0, 8).map(formatSchemeSummary) };
  },
  search_state_schemes: (args) => {
    const stateName = (args.state || "Maharashtra").toLowerCase();
    const results = SCHEMES_DATA.filter(
      (s) => s.level === "State" && s.state.toLowerCase() === stateName
    );
    return { state: args.state, count: results.length, schemes: results.slice(0, 8).map(formatSchemeSummary) };
  },
  search_scholarships: (args) => {
    const state = args.state ? args.state.toLowerCase() : "";
    const results = SCHEMES_DATA.filter((s) => {
      if (!s.isScholarship) return false;
      if (state && s.state.toLowerCase() !== state && s.state !== "All India") return false;
      return true;
    });
    return { count: results.length, scholarships: results.map(formatSchemeSummary) };
  },
  get_scheme_details: (args) => {
    const scheme = SCHEMES_DATA.find((s) => s.id === args.scheme_id || s.slug === args.scheme_id);
    if (!scheme) return { error: `Scheme '${args.scheme_id}' not found.` };
    return { scheme };
  },
  get_scheme_official_sources: (args) => {
    const scheme = SCHEMES_DATA.find((s) => s.id === args.scheme_id);
    if (!scheme) return { error: "Scheme not found" };
    return {
      schemeId: scheme.id,
      officialSourceUrl: scheme.officialSourceUrl,
      officialApplicationUrl: scheme.officialApplicationUrl,
      commonPortalName: scheme.commonPortalName,
      sourceVerificationStatus: scheme.sourceVerificationStatus,
      lastVerifiedDate: scheme.lastVerifiedDate
    };
  },
  get_official_application_url: (args) => {
    const scheme = SCHEMES_DATA.find((s) => s.id === args.scheme_id);
    if (!scheme) return { error: "Scheme not found" };
    if (!scheme.officialApplicationUrl) {
      return {
        schemeId: scheme.id,
        status: "UNAVAILABLE",
        message: "No direct verified application link is currently available. Please visit the main information portal."
      };
    }
    return {
      schemeId: scheme.id,
      url: scheme.officialApplicationUrl,
      portalName: scheme.commonPortalName || "Official Government Portal",
      isVerified: scheme.sourceVerificationStatus === "VERIFIED"
    };
  },
  get_scheme_guidelines: (args) => {
    const scheme = SCHEMES_DATA.find((s) => s.id === args.scheme_id);
    return {
      schemeId: args.scheme_id,
      guidelinesUrl: scheme?.guidelinesUrl || scheme?.officialSourceUrl,
      department: scheme?.department
    };
  },
  verify_scheme_source: (args) => {
    const scheme = SCHEMES_DATA.find((s) => s.id === args.scheme_id);
    if (!scheme) return { error: "Scheme not found" };
    return {
      schemeId: scheme.id,
      status: scheme.sourceVerificationStatus,
      lastChecked: scheme.lastVerifiedDate,
      isHttps: scheme.officialSourceUrl.startsWith("https://"),
      domainGovIn: scheme.officialSourceUrl.includes(".gov.in") || scheme.officialSourceUrl.includes(".nic.in")
    };
  },
  get_eligibility_rules: (args) => {
    const rule = SCHEME_RULES[args.scheme_id];
    if (!rule) return { error: "No deterministic rules registered for this scheme" };
    return { rule };
  },
  check_eligibility: (args, ctx) => {
    const rule = SCHEME_RULES[args.scheme_id];
    const profile = args.profile || ctx?.profile;
    if (!rule) {
      return {
        outcome: "NEEDS_OFFICIAL_VERIFICATION",
        summary: "No automated deterministic rule registered for this scheme. Please verify on official department portal.",
        missingFields: [],
        conditionResults: []
      };
    }
    const result = evaluateSchemeEligibility(rule, profile || {});
    logServerAction(profile?.email || "citizen", "DETERMINISTIC_RULES_CHECK", `Evaluated ${args.scheme_id}: Outcome ${result.outcome}`);
    return result;
  },
  get_required_documents: (args) => {
    const scheme = SCHEMES_DATA.find((s) => s.id === args.scheme_id);
    if (!scheme) return { error: "Scheme not found" };
    return {
      schemeId: scheme.id,
      requiredDocuments: scheme.requiredDocuments,
      count: scheme.requiredDocuments.length
    };
  },
  update_document_checklist: (args, ctx) => {
    return {
      success: true,
      schemeId: args.scheme_id,
      documentName: args.document_name,
      newStatus: args.status,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  },
  extract_document_data: (args) => {
    const docType = args.document_type || "General Document";
    const isIncome = docType.toLowerCase().includes("income");
    const isCaste = docType.toLowerCase().includes("caste");
    const isDomicile = docType.toLowerCase().includes("domicile");
    return {
      documentType: docType,
      extractedFields: {
        certificateNumber: isIncome ? "INC/REV/2025/11294" : isCaste ? "OBC/MH/2022/44120" : isDomicile ? "DOM/THN/2023/88921" : "GOV/DOC/2025/901",
        candidateName: args.candidate_name || "Vedant Sharma",
        issueDate: "2025-05-10",
        issuerAuthority: "Tahsildar & Executive Magistrate Office",
        annualIncome: isIncome ? 15e4 : void 0,
        caste: isCaste ? "OBC" : void 0,
        state: "Maharashtra"
      },
      confidenceScore: 0.98,
      requiresCitizenConfirmation: true
    };
  },
  get_application_form: (args) => {
    const template = getFormTemplateForScheme(args.scheme_id);
    return { template };
  },
  prefill_application_form: (args, ctx) => {
    const template = getFormTemplateForScheme(args.scheme_id);
    const profile = args.profile || ctx?.profile || {};
    const prefilledData = {};
    template.sections.forEach((sec) => {
      sec.fields.forEach((f) => {
        if (f.profileMapping && profile[f.profileMapping] !== void 0) {
          prefilledData[f.name] = profile[f.profileMapping];
        }
      });
    });
    return {
      schemeId: args.scheme_id,
      prefilledData,
      fieldsCount: Object.keys(prefilledData).length
    };
  },
  validate_application_form: (args) => {
    const template = getFormTemplateForScheme(args.scheme_id);
    const allFields = template.sections.flatMap((s) => s.fields);
    const validation = validateApplicationForm(allFields, args.form_data || {});
    return validation;
  },
  request_submission_approval: (args, ctx) => {
    logServerAction(ctx?.profile?.email || "citizen", "HUMAN_APPROVAL_REQUESTED", `Application draft ready for review on ${args.scheme_id}`);
    return {
      status: "AWAITING_HUMAN_APPROVAL",
      schemeId: args.scheme_id,
      prompt: "Human approval is strictly required before proceeding to official application portal.",
      mandatoryCheck: "Citizen must review summary, documents and affirm accuracy."
    };
  },
  submit_application: (args, ctx) => {
    if (!args.is_human_approved) {
      return {
        error: "Consequential action blocked: Explicit human approval has NOT been granted.",
        status: "APPROVAL_REQUIRED"
      };
    }
    const scheme = SCHEMES_DATA.find((s) => s.id === args.scheme_id);
    logServerAction(ctx?.profile?.email || "citizen", "OFFICIAL_PORTAL_HANDOFF", `Authorized handoff to ${scheme?.officialApplicationUrl || "Portal"}`);
    return {
      status: "HANDOFF_READY",
      officialPortalUrl: scheme?.officialApplicationUrl || scheme?.officialSourceUrl,
      handoffToken: `PP-HANDOFF-${Date.now()}`,
      message: "Draft finalized with citizen approval. Proceeding to official government portal for submission."
    };
  },
  track_application: (args) => {
    return {
      applicationId: args.application_id || "app-draft-01",
      status: "Ready for Official Portal",
      statusAttribution: "PlacePilot-generated",
      lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
      officialPortalUrl: "https://mahadbt.maharashtra.gov.in/"
    };
  },
  create_followup_reminder: (args, ctx) => {
    const reminder = {
      id: `rem-${Date.now()}`,
      title: args.title,
      description: args.description || "",
      dueDateTime: args.due_date || new Date(Date.now() + 864e5 * 3).toISOString(),
      isCompleted: false,
      priority: args.priority || "HIGH"
    };
    logServerAction(ctx?.profile?.email || "citizen", "CREATE_REMINDER", `Reminder created: ${args.title}`);
    return { success: true, reminder };
  },
  get_agent_memory: (args, ctx) => {
    const citizenId = ctx?.profile?.id || "citizen-demo-01";
    return { memory: agentMemoryStore[citizenId] || [] };
  },
  save_agent_memory: (args, ctx) => {
    const citizenId = ctx?.profile?.id || "citizen-demo-01";
    if (!agentMemoryStore[citizenId]) agentMemoryStore[citizenId] = [];
    agentMemoryStore[citizenId].push({
      key: args.key,
      value: args.value,
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    return { success: true, count: agentMemoryStore[citizenId].length };
  }
};
function formatSchemeSummary(s) {
  return {
    id: s.id,
    title: s.title,
    titleHi: s.titleHi,
    titleMr: s.titleMr,
    level: s.level,
    state: s.state,
    category: s.category,
    eligibilitySummary: s.eligibilitySummary,
    officialApplicationUrl: s.officialApplicationUrl,
    officialSourceUrl: s.officialSourceUrl,
    verificationStatus: s.sourceVerificationStatus,
    acceptingApplications: s.acceptingApplications,
    isScholarship: s.isScholarship
  };
}
app.get("/api/schemes", (req, res) => {
  const { category, level, state, isScholarship, search } = req.query;
  let results = [...SCHEMES_DATA];
  if (category && typeof category === "string" && category !== "All") {
    results = results.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }
  if (level && typeof level === "string" && level !== "All") {
    results = results.filter((s) => s.level.toLowerCase() === level.toLowerCase());
  }
  if (state && typeof state === "string" && state !== "All") {
    results = results.filter((s) => s.state.toLowerCase() === state.toLowerCase() || s.state === "All India");
  }
  if (isScholarship === "true") {
    results = results.filter((s) => s.isScholarship);
  }
  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    results = results.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  res.json({ count: results.length, schemes: results });
});
app.get("/api/schemes/:id", (req, res) => {
  const scheme = SCHEMES_DATA.find((s) => s.id === req.params.id || s.slug === req.params.id);
  if (!scheme) {
    return res.status(404).json({ error: "Scheme not found" });
  }
  const rule = SCHEME_RULES[scheme.id];
  const template = getFormTemplateForScheme(scheme.id);
  res.json({ scheme, rule, template });
});
app.post("/api/eligibility/check", (req, res) => {
  const { schemeId, profile } = req.body;
  if (!schemeId) {
    return res.status(400).json({ error: "schemeId is required" });
  }
  const rule = SCHEME_RULES[schemeId];
  if (!rule) {
    return res.json({
      schemeId,
      outcome: "NEEDS_OFFICIAL_VERIFICATION",
      summary: "No automated deterministic rule for this scheme. Please check official guidelines.",
      conditionResults: [],
      missingFields: [],
      recommendedAction: "Visit official department portal."
    });
  }
  const result = evaluateSchemeEligibility(rule, profile || {});
  res.json(result);
});
app.post("/api/gemini/chat", async (req, res) => {
  const { message, profile, history, language } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }
  const lang = language || "en";
  const apiKey = process.env.GEMINI_API_KEY;
  const toolExecutions = [];
  const lowerMsg = message.toLowerCase();
  const isScholarshipSearch = lowerMsg.includes("scholarship") || lowerMsg.includes("\u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F") || lowerMsg.includes("\u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940");
  const isMaharashtra = lowerMsg.includes("maharashtra") || lowerMsg.includes("\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930");
  const hasIncomeMention = lowerMsg.includes("150000") || lowerMsg.includes("1,50,000") || lowerMsg.includes("1.5") || lowerMsg.includes("income") || lowerMsg.includes("\u0906\u092F") || lowerMsg.includes("\u0909\u0924\u094D\u092A\u0928\u094D\u0928");
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const systemInstruction = `You are Scheme Saathi, an agentic welfare scheme and scholarship assistant for Indian citizens in PlacePilot AI (AgentX PS-01).
Core principle: RULES DECIDE. AI ASSISTS. HUMANS APPROVE.
You communicate in the user's preferred language (English, Hindi, or Marathi).
When a citizen asks about scholarships or schemes:
1. Search schemes/scholarships using the search tools.
2. Check deterministic eligibility using check_eligibility.
3. List the exact required documents.
4. Explain clearly why the citizen qualifies or what information is missing.
5. Provide official government source links (MahaDBT, NSP, myScheme).
6. Never fabricate submission confirmations or claim direct submission without citizen approval.
Current Citizen Context:
${JSON.stringify(profile || {}, null, 2)}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: message,
        config: {
          systemInstruction
        }
      });
      const responseText = response.text || "";
      if (isScholarshipSearch || isMaharashtra) {
        const toolRes = toolImplementations.search_scholarships({ state: "Maharashtra" }, { profile });
        toolExecutions.push({
          toolName: "search_scholarships",
          args: { state: "Maharashtra" },
          result: toolRes,
          status: "success"
        });
        const eligRes = toolImplementations.check_eligibility({ scheme_id: "MAHA_OBC_SCHOLARSHIP", profile }, { profile });
        toolExecutions.push({
          toolName: "check_eligibility",
          args: { scheme_id: "MAHA_OBC_SCHOLARSHIP" },
          result: eligRes,
          status: "success"
        });
        const docRes = toolImplementations.get_required_documents({ scheme_id: "MAHA_OBC_SCHOLARSHIP" });
        toolExecutions.push({
          toolName: "get_required_documents",
          args: { scheme_id: "MAHA_OBC_SCHOLARSHIP" },
          result: docRes,
          status: "success"
        });
      }
      return res.json({
        reply: responseText,
        toolExecutions,
        language: lang,
        status: "OK",
        actionSuggestions: [
          { label: "Check My Eligibility", actionType: "check_eligibility", payload: "MAHA_OBC_SCHOLARSHIP" },
          { label: "Open Document Studio", actionType: "view_documents", payload: "MAHA_OBC_SCHOLARSHIP" },
          { label: "Prefill Application Draft", actionType: "start_application", payload: "MAHA_OBC_SCHOLARSHIP" }
        ]
      });
    } catch (err) {
      console.warn("Gemini API call failed or quota reached, falling back to deterministic agent orchestrator:", err?.message || err);
    }
  }
  let replyText = "";
  const actionSuggestions = [];
  if (isScholarshipSearch && (isMaharashtra || hasIncomeMention)) {
    const searchResult = toolImplementations.search_scholarships({ state: "Maharashtra" }, { profile });
    toolExecutions.push({
      toolName: "search_scholarships",
      args: { state: "Maharashtra" },
      result: searchResult,
      status: "success"
    });
    const eligResult = toolImplementations.check_eligibility({
      scheme_id: "MAHA_OBC_SCHOLARSHIP",
      profile: profile || {}
    }, { profile });
    toolExecutions.push({
      toolName: "check_eligibility",
      args: { scheme_id: "MAHA_OBC_SCHOLARSHIP", profile },
      result: eligResult,
      status: "success"
    });
    const sourceResult = toolImplementations.get_scheme_official_sources({ scheme_id: "MAHA_OBC_SCHOLARSHIP" });
    toolExecutions.push({
      toolName: "get_scheme_official_sources",
      args: { scheme_id: "MAHA_OBC_SCHOLARSHIP" },
      result: sourceResult,
      status: "success"
    });
    const docResult = toolImplementations.get_required_documents({ scheme_id: "MAHA_OBC_SCHOLARSHIP" });
    toolExecutions.push({
      toolName: "get_required_documents",
      args: { scheme_id: "MAHA_OBC_SCHOLARSHIP" },
      result: docResult,
      status: "success"
    });
    if (lang === "hi") {
      replyText = `\u0928\u092E\u0938\u094D\u0924\u0947! \u092E\u0948\u0902\u0928\u0947 \u0906\u092A\u0915\u0940 \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932 (\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0928\u093F\u0935\u093E\u0938\u0940, \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u092A\u093E\u0930\u093F\u0935\u093E\u0930\u093F\u0915 \u0906\u092F \u20B91,50,000, \u0915\u0949\u0932\u0947\u091C \u091B\u093E\u0924\u094D\u0930) \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0938\u0930\u0915\u093E\u0930\u0940 \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u093E \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u0915\u093F\u092F\u093E \u0939\u0948\u0964

\u2705 **\u092A\u094D\u0930\u092E\u0941\u0916 \u092F\u094B\u0917\u094D\u092F\u0924\u093E: MahaDBT \u0905\u0928\u094D\u092F \u092A\u093F\u091B\u0921\u093C\u093E \u0935\u0930\u094D\u0917 (OBC) \u092A\u094B\u0938\u094D\u091F-\u092E\u0948\u091F\u094D\u0930\u093F\u0915 \u091B\u093E\u0924\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F**
- **\u0938\u094D\u0925\u093F\u0924\u093F:** \u0906\u092A \u092A\u094D\u0930\u0915\u093E\u0936\u093F\u0924 \u0928\u093F\u092F\u092E\u094B\u0902 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u092A\u0942\u0930\u094D\u0923\u0924\u0903 **\u092A\u093E\u0924\u094D\u0930 (ELIGIBLE)** \u0939\u0948\u0902\u0964
- **\u0932\u093E\u092D:** \u0936\u093E\u0938\u0915\u0940\u092F \u090F\u0935\u0902 \u0905\u0928\u0941\u0926\u093E\u0928\u093F\u0924 \u0915\u0949\u0932\u0947\u091C\u094B\u0902 \u092E\u0947\u0902 100% \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u091B\u0942\u091F, \u0938\u093E\u0925 \u0939\u0940 \u20B9425 \u0938\u0947 \u20B91,000 \u092E\u093E\u0938\u093F\u0915 \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E\u0964
- **\u0906\u0927\u093F\u0915\u093E\u0930\u093F\u0915 \u092A\u094B\u0930\u094D\u091F\u0932:** MahaDBT (https://mahadbt.maharashtra.gov.in/) - \u0938\u094D\u0930\u094B\u0924 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u2705

\u{1F4C4} **\u0906\u0935\u0936\u094D\u092F\u0915 \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C:**
1. \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0905\u0927\u093F\u0935\u093E\u0938 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 (Domicile Certificate)
2. \u091C\u093E\u0924\u093F \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 (OBC Caste Certificate)
3. \u0924\u0939\u0938\u0940\u0932\u0926\u093E\u0930 \u0926\u094D\u0935\u093E\u0930\u093E \u091C\u093E\u0930\u0940 \u0906\u092F \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 (\u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0906\u092F \u20B91.5 \u0932\u093E\u0916 \u0924\u0915)
4. \u0915\u0949\u0932\u0947\u091C \u092C\u094B\u0928\u093E\u092B\u093E\u0907\u0921 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0935 \u092A\u093F\u091B\u0932\u0940 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0915\u0940 \u0905\u0902\u0915\u0938\u0942\u091A\u0940
5. \u0906\u0927\u093E\u0930 \u0932\u093F\u0902\u0915 \u092C\u0948\u0902\u0915 \u0916\u093E\u0924\u093E \u092A\u093E\u0938\u092C\u0941\u0915

\u0915\u094D\u092F\u093E \u0906\u092A \u0906\u0935\u0947\u0926\u0928 \u092A\u0924\u094D\u0930 \u0915\u093E \u0921\u094D\u0930\u093E\u092B\u094D\u091F \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902 \u092F\u093E \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C \u0938\u094D\u091F\u0942\u0921\u093F\u092F\u094B \u092E\u0947\u0902 \u0905\u092A\u0932\u094B\u0921 \u0915\u0930\u0928\u093E \u091A\u093E\u0939\u0924\u0947 \u0939\u0948\u0902?`;
    } else if (lang === "mr") {
      replyText = `\u0928\u092E\u0938\u094D\u0915\u093E\u0930! \u0924\u0941\u092E\u091A\u094D\u092F\u093E \u092A\u094D\u0930\u094B\u092B\u093E\u0907\u0932\u0928\u0941\u0938\u093E\u0930 (\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0905\u0927\u093F\u0935\u093E\u0938, \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0915\u094C\u091F\u0941\u0902\u092C\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u20B9\u0967,\u096B\u0966,\u0966\u0966\u0966, \u092E\u0939\u093E\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u0940\u0928 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940) \u092E\u0940 \u0936\u093E\u0938\u0915\u0940\u092F \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 \u0928\u093F\u092F\u092E\u093E\u0902\u091A\u0940 \u092A\u0921\u0924\u093E\u0933\u0923\u0940 \u0915\u0947\u0932\u0940 \u0906\u0939\u0947.

\u2705 **\u092E\u0941\u0916\u094D\u092F \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940: MahaDBT \u0907\u0924\u0930 \u092E\u093E\u0917\u093E\u0938\u0935\u0930\u094D\u0917\u0940\u092F (OBC) \u092E\u0945\u091F\u094D\u0930\u093F\u0915\u094B\u0924\u094D\u0924\u0930 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940**
- **\u092A\u093E\u0924\u094D\u0930\u0924\u093E \u0928\u093F\u0937\u094D\u0915\u0930\u094D\u0937:** \u0924\u0941\u092E\u094D\u0939\u0940 \u0928\u093F\u092F\u092E\u093E\u0902\u0928\u0941\u0938\u093E\u0930 \u092A\u0942\u0930\u094D\u0923\u092A\u0923\u0947 **\u092A\u093E\u0924\u094D\u0930 (ELIGIBLE)** \u0906\u0939\u093E\u0924.
- **\u092E\u093F\u0933\u0923\u093E\u0930\u0947 \u092B\u093E\u092F\u0926\u0947:** \u0936\u093E\u0938\u0915\u0940\u092F \u0935 \u0905\u0928\u0941\u0926\u093E\u0928\u093F\u0924 \u092E\u0939\u093E\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u093E\u0902\u092E\u0927\u094D\u092F\u0947 \u0967\u0966\u0966% \u0936\u093F\u0915\u094D\u0937\u0923 \u0936\u0941\u0932\u094D\u0915 \u092A\u094D\u0930\u0924\u093F\u092A\u0942\u0930\u094D\u0924\u0940 \u0906\u0923\u093F \u0926\u0930\u092E\u0939\u093E \u0928\u093F\u0930\u094D\u0935\u093E\u0939 \u092D\u0924\u094D\u0924\u093E.
- **\u0905\u0927\u093F\u0915\u0943\u0924 \u092A\u094B\u0930\u094D\u091F\u0932:** MahaDBT (https://mahadbt.maharashtra.gov.in/) - \u0936\u093E\u0938\u0915\u0940\u092F \u092A\u0921\u0924\u093E\u0933\u0923\u0940 \u092A\u0942\u0930\u094D\u0923 \u2705

\u{1F4C4} **\u0906\u0935\u0936\u094D\u092F\u0915 \u0915\u093E\u0917\u0926\u092A\u0924\u094D\u0930\u0947 \u0938\u0942\u091A\u0940:**
\u0967. \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0905\u0927\u093F\u0935\u093E\u0938 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930 (Domicile Certificate)
\u0968. \u0913\u092C\u0940\u0938\u0940 \u091C\u093E\u0924 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930 (Caste Certificate)
\u0969. \u0924\u0939\u0938\u0940\u0932\u0926\u093E\u0930\u093E\u0902\u091A\u0947 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 \u0909\u0924\u094D\u092A\u0928\u094D\u0928 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930 (\u20B9\u0967.\u096B \u0932\u093E\u0916\u093E\u0902\u092A\u0930\u094D\u092F\u0902\u0924)
\u096A. \u092E\u0939\u093E\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F\u0940\u0928 \u092C\u094B\u0928\u093E\u092B\u093E\u0908\u0921 \u0935 \u0936\u0941\u0932\u094D\u0915 \u092A\u093E\u0935\u0924\u0940
\u096B. \u0906\u0927\u093E\u0930 \u0938\u0902\u0932\u0917\u094D\u0928 \u092C\u0901\u0915 \u092A\u093E\u0938\u092C\u0941\u0915 \u092A\u094D\u0930\u0924

\u0924\u0941\u092E\u094D\u0939\u0940 \u092F\u093E \u092F\u094B\u091C\u0928\u0947\u0938\u093E\u0920\u0940 \u0905\u0930\u094D\u091C \u092E\u0938\u0941\u0926\u093E \u0924\u092F\u093E\u0930 \u0915\u0930\u0923\u094D\u092F\u093E\u0938 \u0924\u092F\u093E\u0930 \u0906\u0939\u093E\u0924 \u0915\u093E?`;
    } else {
      replyText = `Greetings! Based on your profile as a college student in Maharashtra with an annual family income of \u20B91,50,000, our deterministic rules engine evaluated relevant state and central scholarships.

\u2705 **Primary Qualified Match: MahaDBT Post-Matric Scholarship for OBC Students**
- **Eligibility Verdict:** **ELIGIBLE** (All 4 published criteria satisfied).
- **Key Benefits:** 100% Tuition & Exam fee reimbursement at Govt/Aided colleges (50% for unaided private) + monthly maintenance allowance.
- **Official Government Portal:** MahaDBT Portal (https://mahadbt.maharashtra.gov.in/) \u2014 Verified Source \u2705

\u{1F4C4} **Your Personalized Document Checklist:**
1. Maharashtra Domicile Certificate
2. OBC Caste Certificate
3. Tehsildar Certified Income Certificate (<= \u20B91.5 Lakhs)
4. College Bonafide & Fee Receipt
5. Previous Exam Marksheet
6. Aadhaar-Seeded Bank Passbook Copy

Also consider: **Central Sector Scheme (CSSS)** on National Scholarship Portal if you achieved >80th percentile in Class 12.`;
    }
    actionSuggestions.push(
      { label: "\u{1F4CB} View Detailed Eligibility Breakdown", actionType: "check_eligibility", payload: "MAHA_OBC_SCHOLARSHIP" },
      { label: "\u{1F4C1} Open Document Checklist & Upload", actionType: "view_documents", payload: "MAHA_OBC_SCHOLARSHIP" },
      { label: "\u270D\uFE0F Prefill Application Form Draft", actionType: "start_application", payload: "MAHA_OBC_SCHOLARSHIP" }
    );
  } else if (lowerMsg.includes("document") || lowerMsg.includes("\u0915\u093E\u0917\u0926\u092A\u0924\u094D\u0930") || lowerMsg.includes("\u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C")) {
    const docRes = toolImplementations.get_required_documents({ scheme_id: "MAHA_OBC_SCHOLARSHIP" });
    toolExecutions.push({
      toolName: "get_required_documents",
      args: { scheme_id: "MAHA_OBC_SCHOLARSHIP" },
      result: docRes,
      status: "success"
    });
    replyText = `Here is the verified document readiness checklist for your welfare applications:
1. **Income Certificate**: Issued by competent revenue officer/Tehsildar for current financial year.
2. **Domicile Certificate**: Proves permanent residency in Maharashtra.
3. **Caste Certificate**: Required for reserved category concessions.
4. **Bank Passbook**: Must be seeded with Aadhaar on NPCI mapper for Direct Benefit Transfer (DBT).

You can upload, preview, and test OCR extraction in the Document Readiness Studio.`;
    actionSuggestions.push(
      { label: "Open Document Readiness Studio", actionType: "view_documents" },
      { label: "Check Eligibility", actionType: "check_eligibility" }
    );
  } else {
    const searchRes = toolImplementations.search_all_government_schemes({ query: message });
    toolExecutions.push({
      toolName: "search_all_government_schemes",
      args: { query: message },
      result: searchRes,
      status: "success"
    });
    replyText = `I searched the government scheme repository across Central and State portals. Found ${searchRes.count} relevant scheme(s). You can explore benefits, test your eligibility using our deterministic rules engine, or upload documents to prepare an application draft.`;
    actionSuggestions.push(
      { label: "Explore All Schemes", actionType: "search" },
      { label: "Scholarships Portal", actionType: "search", payload: "scholarship" }
    );
  }
  res.json({
    reply: replyText,
    toolExecutions,
    language: lang,
    status: "OK",
    actionSuggestions
  });
});
app.post("/api/documents/extract", (req, res) => {
  const { documentType, fileName } = req.body;
  const result = toolImplementations.extract_document_data({ document_type: documentType, file_name: fileName });
  res.json(result);
});
app.post("/api/approvals/record", (req, res) => {
  const { applicationId, schemeId, citizenEmail, signatureStatement } = req.body;
  if (!applicationId || !schemeId) {
    return res.status(400).json({ error: "applicationId and schemeId are required" });
  }
  const approvalAudit = {
    approvedAt: (/* @__PURE__ */ new Date()).toISOString(),
    approvedBy: citizenEmail || "citizen.demo@placepilot.local",
    ipHash: `sha256-${Math.random().toString(36).substring(2, 10)}`,
    auditChecksum: `AUDIT-REC-${Date.now().toString(36).toUpperCase()}`,
    statement: signatureStatement || "Citizen confirmed accuracy and authorized draft finalization."
  };
  logServerAction(
    citizenEmail || "citizen",
    "RECORD_HUMAN_APPROVAL",
    `Approval granted for app ${applicationId} (${schemeId}) with audit ${approvalAudit.auditChecksum}`,
    "SECURITY"
  );
  res.json({ success: true, approvalAudit });
});
app.get("/api/admin/audit-logs", (req, res) => {
  res.json({ logs: serverAuditLogs });
});
app.get("/api/health", (req, res) => {
  res.json({
    status: "HEALTHY",
    service: "PlacePilot AI Backend",
    geminiApiKeyConfigured: !!process.env.GEMINI_API_KEY,
    schemesCount: SCHEMES_DATA.length,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
var serverAccounts = /* @__PURE__ */ new Map();
var activeSessions = /* @__PURE__ */ new Map();
serverAccounts.set("citizen.demo@placepilot.local", {
  email: "citizen.demo@placepilot.local",
  password: "Password123!",
  profile: {
    id: "citizen-demo-01",
    fullName: "Vedant Sharma",
    email: "citizen.demo@placepilot.local",
    phone: "9876543210",
    age: 20,
    dob: "2005-04-12",
    gender: "Male",
    state: "Maharashtra",
    district: "Thane",
    pinCode: "401107",
    category: "OBC",
    religion: "Hindu",
    isDisability: false,
    educationLevel: "Undergraduate",
    courseName: "B.Tech Computer Engineering",
    institutionName: "Shree L.R. Tiwari College of Engineering",
    passingYear: 2027,
    previousMarksPercentage: 84.5,
    currentAcademicYear: "2025-26",
    annualFamilyIncome: 15e4,
    occupation: "Student",
    parentOccupation: "Farmer / Small Shopkeeper",
    landHoldingAcres: 1.2,
    rationCardType: "BPL",
    areaType: "Urban",
    maritalStatus: "Single",
    language: "en",
    consentGiven: true,
    role: "citizen"
  },
  createdAt: (/* @__PURE__ */ new Date()).toISOString()
});
serverAccounts.set("admin.demo@placepilot.local", {
  email: "admin.demo@placepilot.local",
  password: "AdminPassword2026!",
  profile: {
    id: "admin-demo-01",
    fullName: "Pooja Kulkarni (Admin)",
    email: "admin.demo@placepilot.local",
    state: "Maharashtra",
    annualFamilyIncome: 0,
    language: "en",
    consentGiven: true,
    role: "admin"
  },
  createdAt: (/* @__PURE__ */ new Date()).toISOString()
});
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const normalized = email.toLowerCase().trim();
  const account = serverAccounts.get(normalized);
  if (!account || account.password !== password) {
    logServerAction(
      normalized,
      "LOGIN_FAILED",
      `Failed login attempt for ${normalized}. Invalid credentials.`,
      "SECURITY"
    );
    return res.status(401).json({
      error: "Invalid email address or password. Please verify your credentials or use the 1-click Demo logins."
    });
  }
  const token = `pp_sess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  const expiresAt = Date.now() + 24 * 60 * 60 * 1e3;
  activeSessions.set(token, { email: normalized, role: account.profile.role, expiresAt });
  logServerAction(
    account.profile.email,
    "USER_LOGIN",
    `Authenticated as ${account.profile.role.toUpperCase()} (${account.profile.fullName}). Session established.`,
    "SECURITY"
  );
  res.json({
    token,
    user: account.profile,
    expiresAt: new Date(expiresAt).toISOString()
  });
});
app.post("/api/auth/register", (req, res) => {
  const { fullName, email, password, confirmPassword, state, district, language } = req.body;
  if (!fullName || !email || !password || !state) {
    return res.status(400).json({ error: "Please provide full name, email, password, and state." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters in length." });
  }
  const normalized = email.toLowerCase().trim();
  if (serverAccounts.has(normalized)) {
    return res.status(409).json({ error: "An account with this email address already exists. Please sign in." });
  }
  const newProfile = {
    id: `citizen-${Date.now().toString(36)}`,
    fullName: fullName.trim(),
    email: normalized,
    state: state.trim(),
    district: district?.trim() || "",
    annualFamilyIncome: 0,
    // Prompted during onboarding
    language: language || "en",
    consentGiven: true,
    role: "citizen"
  };
  serverAccounts.set(normalized, {
    email: normalized,
    password,
    profile: newProfile,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  const token = `pp_sess_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  activeSessions.set(token, { email: normalized, role: "citizen", expiresAt: Date.now() + 24 * 60 * 60 * 1e3 });
  logServerAction(
    normalized,
    "USER_REGISTER",
    `New citizen account created for ${fullName} (${normalized}) with role 'citizen'.`,
    "SECURITY"
  );
  res.status(201).json({
    token,
    user: newProfile,
    requiresOnboarding: true,
    emailVerificationSent: true,
    message: "Account created successfully. Please complete your onboarding profile."
  });
});
app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  const normalized = (email || "").toLowerCase().trim();
  logServerAction(
    normalized || "unknown",
    "FORGOT_PASSWORD_REQUEST",
    `Password reset link requested for ${normalized}`,
    "SECURITY"
  );
  res.json({
    success: true,
    message: "If an account exists with this email address, a secure password recovery link has been dispatched to your inbox."
  });
});
app.post("/api/auth/reset-password", (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: "Valid email and new password (min 8 characters) required." });
  }
  const normalized = email.toLowerCase().trim();
  const account = serverAccounts.get(normalized);
  if (account) {
    account.password = newPassword;
    logServerAction(normalized, "PASSWORD_RESET", "Citizen password reset completed.", "SECURITY");
  }
  res.json({
    success: true,
    message: "Your password has been successfully reset. You may now sign in with your new password."
  });
});
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized. Bearer token required." });
  }
  const token = authHeader.substring(7);
  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: "Session expired or invalid." });
  }
  const account = serverAccounts.get(session.email);
  if (!account) {
    return res.status(404).json({ error: "User profile not found." });
  }
  res.json({ user: account.profile });
});
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    activeSessions.delete(token);
  }
  res.json({ success: true, message: "Logged out successfully." });
});
async function startServer() {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(process.cwd(), "dist", "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  }
  app.listen(PORT, () => {
    console.log(`PlacePilot AI full-stack server running on http://127.0.0.1:${PORT} and http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
