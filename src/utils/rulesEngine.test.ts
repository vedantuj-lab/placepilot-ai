import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCondition, evaluateSchemeEligibility } from './rulesEngine';
import { EligibilityRule, CitizenProfile } from '../types';

test('evaluateCondition properly handles equals operator', () => {
  const condition = {
    field: 'state',
    operator: 'equals' as const,
    value: 'Maharashtra',
    label: 'State of Residence',
    description: 'Must be a permanent resident of Maharashtra',
    reference: 'MahaDBT General Rules Cl. 2'
  };

  const passProfile: Partial<CitizenProfile> = { state: 'Maharashtra' };
  const resPass = evaluateCondition(condition, passProfile);
  assert.equal(resPass.result, 'PASS');

  const failProfile: Partial<CitizenProfile> = { state: 'Gujarat' };
  const resFail = evaluateCondition(condition, failProfile);
  assert.equal(resFail.result, 'FAIL');

  const missingProfile: Partial<CitizenProfile> = {};
  const resMissing = evaluateCondition(condition, missingProfile);
  assert.equal(resMissing.result, 'MISSING');
});

test('evaluateCondition properly handles less_than_or_equal operator for income', () => {
  const condition = {
    field: 'annualFamilyIncome',
    operator: 'less_than_or_equal' as const,
    value: 250000,
    label: 'Annual Family Income',
    description: 'Annual family income must not exceed ₹2,50,000',
    reference: 'Scheme Ceiling 2025'
  };

  const passProfile: Partial<CitizenProfile> = { annualFamilyIncome: 150000 };
  const resPass = evaluateCondition(condition, passProfile);
  assert.equal(resPass.result, 'PASS');

  const exactProfile: Partial<CitizenProfile> = { annualFamilyIncome: 250000 };
  assert.equal(evaluateCondition(condition, exactProfile).result, 'PASS');

  const failProfile: Partial<CitizenProfile> = { annualFamilyIncome: 300000 };
  const resFail = evaluateCondition(condition, failProfile);
  assert.equal(resFail.result, 'FAIL');
});

test('evaluateCondition properly handles in operator for education levels', () => {
  const condition = {
    field: 'educationLevel',
    operator: 'in' as const,
    value: ['Undergraduate', 'Postgraduate'],
    label: 'Course Level',
    description: 'Eligible for Undergraduate or Postgraduate degrees',
    reference: 'Education Board Norms'
  };

  assert.equal(evaluateCondition(condition, { educationLevel: 'Undergraduate' }).result, 'PASS');
  assert.equal(evaluateCondition(condition, { educationLevel: 'Postgraduate' }).result, 'PASS');
  assert.equal(evaluateCondition(condition, { educationLevel: '10th' }).result, 'FAIL');
});

test('evaluateSchemeEligibility returns ELIGIBLE when all conditions pass', () => {
  const rule: EligibilityRule = {
    scheme_id: 'MAHA_OBC_SCHOLARSHIP_01',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'Domicile',
        description: 'Resident of Maharashtra',
        reference: 'MahaDBT Domicile Rule'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 150000,
        label: 'Income Limit',
        description: 'Annual income <= 1.5 Lakhs',
        reference: 'GR 2024-OBC'
      },
      {
        field: 'educationLevel',
        operator: 'in',
        value: ['Undergraduate', 'Postgraduate', 'Diploma'],
        label: 'Higher Education Level',
        description: 'Enrolled in post-secondary education',
        reference: 'Higher Edu Dept'
      }
    ]
  };

  const citizen: Partial<CitizenProfile> = {
    state: 'Maharashtra',
    annualFamilyIncome: 150000,
    educationLevel: 'Undergraduate'
  };

  const evaluation = evaluateSchemeEligibility(rule, citizen);
  assert.equal(evaluation.outcome, 'ELIGIBLE');
  assert.equal(evaluation.conditionResults.length, 3);
  assert.equal(evaluation.missingFields.length, 0);
});

test('evaluateSchemeEligibility returns NOT_ELIGIBLE when income condition fails', () => {
  const rule: EligibilityRule = {
    scheme_id: 'MAHA_OBC_SCHOLARSHIP_01',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'Domicile',
        description: 'Resident of Maharashtra',
        reference: 'MahaDBT Domicile Rule'
      },
      {
        field: 'annualFamilyIncome',
        operator: 'less_than_or_equal',
        value: 150000,
        label: 'Income Limit',
        description: 'Annual income <= 1.5 Lakhs',
        reference: 'GR 2024-OBC'
      }
    ]
  };

  const highIncomeCitizen: Partial<CitizenProfile> = {
    state: 'Maharashtra',
    annualFamilyIncome: 450000
  };

  const evaluation = evaluateSchemeEligibility(rule, highIncomeCitizen);
  assert.equal(evaluation.outcome, 'NOT_ELIGIBLE');
  assert.equal(evaluation.conditionResults[1].result, 'FAIL');
});

test('evaluateSchemeEligibility returns ADDITIONAL_INFO_REQUIRED when field is missing', () => {
  const rule: EligibilityRule = {
    scheme_id: 'TEST_SCHEME',
    conditions: [
      {
        field: 'state',
        operator: 'equals',
        value: 'Maharashtra',
        label: 'Domicile',
        description: 'Resident of Maharashtra',
        reference: 'Rule 1'
      },
      {
        field: 'category',
        operator: 'in',
        value: ['OBC', 'SC', 'ST'],
        label: 'Category',
        description: 'Reserved category',
        reference: 'Rule 2'
      }
    ]
  };

  const incompleteCitizen: Partial<CitizenProfile> = {
    state: 'Maharashtra'
    // category is missing
  };

  const evaluation = evaluateSchemeEligibility(rule, incompleteCitizen);
  assert.equal(evaluation.outcome, 'ADDITIONAL_INFO_REQUIRED');
  assert.deepEqual(evaluation.missingFields, ['category']);
});
