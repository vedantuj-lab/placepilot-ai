/**
 * PlacePilot AI - Authentication & Registration Validation Utilities
 * Deterministic validation logic with unit tests.
 */

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Too Short' | 'Weak' | 'Medium' | 'Strong';
  color: string;
  feedback: string[];
  isValid: boolean;
}

export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }
  const trimmed = email.trim();
  // Standard RFC 5322 compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g., name@example.com).' };
  }
  return { isValid: true };
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return {
      score: 0,
      label: 'Too Short',
      color: 'bg-zinc-600',
      feedback: ['Password must be at least 8 characters.'],
      isValid: false
    };
  }

  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Must be at least 8 characters.');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add an uppercase letter (A-Z).');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add a lowercase letter (a-z).');
  }

  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add a number or special symbol.');
  }

  let label: PasswordStrengthResult['label'] = 'Weak';
  let color = 'bg-red-500';

  if (password.length < 8) {
    label = 'Too Short';
    color = 'bg-zinc-600';
  } else if (score <= 2) {
    label = 'Weak';
    color = 'bg-red-500';
  } else if (score === 3) {
    label = 'Medium';
    color = 'bg-amber-500';
  } else if (score >= 4) {
    label = 'Strong';
    color = 'bg-emerald-500';
  }

  return {
    score,
    label,
    color,
    feedback,
    isValid: password.length >= 8 && score >= 2
  };
}

export interface RegistrationPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  state: string;
  district?: string;
  language: string;
  termsAccepted: boolean;
}

export function validateRegistration(data: Partial<RegistrationPayload>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full legal name is required (at least 2 characters).';
  }

  const emailCheck = validateEmail(data.email || '');
  if (!emailCheck.isValid) {
    errors.email = emailCheck.error!;
  }

  const strength = checkPasswordStrength(data.password || '');
  if (!strength.isValid) {
    errors.password = strength.feedback[0] || 'Password does not meet minimum security requirements.';
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!data.state || !data.state.trim()) {
    errors.state = 'State / UT of residence is required for welfare scheme matching.';
  }

  if (!data.termsAccepted) {
    errors.termsAccepted = 'You must accept the Terms of Service & Citizen Privacy Charter.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function validateLogin(data: Partial<LoginPayload>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  const emailCheck = validateEmail(data.email || '');
  if (!emailCheck.isValid) {
    errors.email = emailCheck.error!;
  }

  if (!data.password || data.password.length === 0) {
    errors.password = 'Password is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
