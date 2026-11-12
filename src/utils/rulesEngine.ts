import { CitizenProfile, EligibilityOutcome, EligibilityRule, ConditionEvaluationResult, EligibilityEvaluation } from '../types';

/**
 * Deterministic Eligibility Engine for PlacePilot AI
 * Core Principle: RULES DECIDE. AI ASSISTS. HUMANS APPROVE.
 * 
 * Never lets AI guess or hallucinate eligibility. Evaluates citizen profile
 * strictly against structured, published scheme conditions.
 */
export function evaluateCondition(
  ruleCondition: {
    field: string;
    operator: 'equals' | 'not_equals' | 'less_than_or_equal' | 'greater_than_or_equal' | 'in' | 'contains' | 'between';
    value: any;
    label: string;
    description: string;
    reference: string;
  },
  profile: Partial<CitizenProfile>
): ConditionEvaluationResult {
  const citizenVal = (profile as any)[ruleCondition.field];

  // If value is missing / undefined / null
  if (citizenVal === undefined || citizenVal === null || citizenVal === '') {
    return {
      field: ruleCondition.field,
      requirementText: ruleCondition.description,
      citizenValue: 'Not Provided in Profile',
      result: 'MISSING',
      comparisonNote: `Field "${ruleCondition.field}" is required to evaluate eligibility for this scheme.`,
      reference: ruleCondition.reference
    };
  }

  let passed = false;
  let note = '';

  switch (ruleCondition.operator) {
    case 'equals': {
      if (typeof citizenVal === 'string' && typeof ruleCondition.value === 'string') {
        passed = citizenVal.trim().toLowerCase() === ruleCondition.value.trim().toLowerCase();
      } else {
        passed = citizenVal === ruleCondition.value;
      }
      note = passed
        ? `Matches requirement (${citizenVal} == ${ruleCondition.value})`
        : `Does not match (Required: ${ruleCondition.value}, Profile has: ${citizenVal})`;
      break;
    }

    case 'not_equals': {
      passed = citizenVal !== ruleCondition.value;
      note = passed ? `Satisfies condition` : `Disqualifying value: ${citizenVal}`;
      break;
    }

    case 'less_than_or_equal': {
      const numCitizen = Number(citizenVal);
      const numTarget = Number(ruleCondition.value);
      if (isNaN(numCitizen)) {
        return {
          field: ruleCondition.field,
          requirementText: ruleCondition.description,
          citizenValue: citizenVal,
          result: 'MISSING',
          comparisonNote: `Value "${citizenVal}" is not a valid number.`,
          reference: ruleCondition.reference
        };
      }
      passed = numCitizen <= numTarget;
      note = passed
        ? `₹${numCitizen.toLocaleString('en-IN')} is within maximum ceiling of ₹${numTarget.toLocaleString('en-IN')}`
        : `₹${numCitizen.toLocaleString('en-IN')} exceeds allowable threshold of ₹${numTarget.toLocaleString('en-IN')}`;
      break;
    }

    case 'greater_than_or_equal': {
      const numCitizen = Number(citizenVal);
      const numTarget = Number(ruleCondition.value);
      passed = numCitizen >= numTarget;
      note = passed
        ? `${numCitizen} meets minimum requirement of ${numTarget}`
        : `${numCitizen} is below minimum requirement of ${numTarget}`;
      break;
    }

    case 'in': {
      const targetArray = Array.isArray(ruleCondition.value) ? ruleCondition.value : [ruleCondition.value];
      const normalizedTarget = targetArray.map(item => String(item).toLowerCase().trim());
      const normalizedCitizen = String(citizenVal).toLowerCase().trim();
      passed = normalizedTarget.includes(normalizedCitizen);
      note = passed
        ? `Profile "${citizenVal}" matches permitted category: [${targetArray.join(', ')}]`
        : `Profile "${citizenVal}" not in permitted list: [${targetArray.join(', ')}]`;
      break;
    }

    case 'contains': {
      const strCitizen = String(citizenVal).toLowerCase();
      const strTarget = String(ruleCondition.value).toLowerCase();
      passed = strCitizen.includes(strTarget);
      note = passed ? `Contains required substring "${ruleCondition.value}"` : `Missing "${ruleCondition.value}"`;
      break;
    }

    case 'between': {
      const numCitizen = Number(citizenVal);
      const [min, max] = Array.isArray(ruleCondition.value) ? ruleCondition.value : [0, 0];
      passed = numCitizen >= min && numCitizen <= max;
      note = passed
        ? `${numCitizen} falls in range [${min} to ${max}]`
        : `${numCitizen} is outside permitted range [${min} to ${max}]`;
      break;
    }

    default:
      passed = false;
      note = 'Unsupported operator';
  }

  return {
    field: ruleCondition.field,
    requirementText: ruleCondition.description,
    citizenValue: citizenVal,
    result: passed ? 'PASS' : 'FAIL',
    comparisonNote: note,
    reference: ruleCondition.reference
  };
}

export function evaluateSchemeEligibility(
  rule: EligibilityRule,
  profile: Partial<CitizenProfile>
): EligibilityEvaluation {
  if (!rule || !rule.conditions || rule.conditions.length === 0) {
    return {
      schemeId: rule ? rule.scheme_id : 'UNKNOWN',
      outcome: 'NEEDS_OFFICIAL_VERIFICATION',
      summary: 'No specific deterministic rules on file. Requires verification on official government portal.',
      conditionResults: [],
      missingFields: [],
      recommendedAction: 'Visit official department portal for specific guidelines.',
      evaluatedAt: new Date().toISOString()
    };
  }

  const conditionResults: ConditionEvaluationResult[] = [];
  const missingFields: string[] = [];
  let hasFail = false;
  let hasMissing = false;

  for (const condition of rule.conditions) {
    const res = evaluateCondition(condition, profile);
    conditionResults.push(res);

    if (res.result === 'FAIL') {
      hasFail = true;
    } else if (res.result === 'MISSING') {
      hasMissing = true;
      if (!missingFields.includes(res.field)) {
        missingFields.push(res.field);
      }
    }
  }

  let outcome: EligibilityOutcome;
  let summary: string;
  let recommendedAction: string;

  if (hasFail) {
    outcome = 'NOT_ELIGIBLE';
    const failedCount = conditionResults.filter(c => c.result === 'FAIL').length;
    summary = `Citizen does not meet ${failedCount} mandatory eligibility criterion based on published guidelines.`;
    recommendedAction = 'Review disqualifying conditions or explore alternative schemes that fit your criteria.';
  } else if (hasMissing) {
    outcome = 'ADDITIONAL_INFO_REQUIRED';
    summary = `Missing ${missingFields.length} profile attribute(s) required to determine eligibility.`;
    recommendedAction = `Please update your profile with: ${missingFields.join(', ')} to finish assessment.`;
  } else {
    outcome = 'ELIGIBLE';
    summary = `All ${conditionResults.length} published eligibility criteria are satisfied by citizen profile.`;
    recommendedAction = 'Proceed to prepare document checklist and generate prefilled application form.';
  }

  return {
    schemeId: rule.scheme_id,
    outcome,
    summary,
    conditionResults,
    missingFields,
    recommendedAction,
    evaluatedAt: new Date().toISOString()
  };
}
