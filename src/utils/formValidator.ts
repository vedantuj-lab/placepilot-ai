import { ApplicationFormField } from '../types';

export interface FormValidationResult {
  isValid: boolean;
  errors: Array<{ field: string; message: string }>;
  completionPercentage: number;
}

export function validateApplicationForm(
  fields: ApplicationFormField[],
  formData: Record<string, any>
): FormValidationResult {
  const errors: Array<{ field: string; message: string }> = [];
  let filledCount = 0;
  const totalCount = fields.length;

  for (const field of fields) {
    const val = formData[field.name];
    const isFilled = val !== undefined && val !== null && String(val).trim() !== '';

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

    // Type specific checks
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(val).trim())) {
        errors.push({
          field: field.name,
          message: `${field.label} must be a valid email address.`
        });
      }
    } else if (field.type === 'tel') {
      const phoneDigits = String(val).replace(/\D/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 12) {
        errors.push({
          field: field.name,
          message: `${field.label} must be a valid 10-digit Indian phone number.`
        });
      }
    } else if (field.type === 'number') {
      const num = Number(val);
      if (isNaN(num)) {
        errors.push({
          field: field.name,
          message: `${field.label} must be a valid number.`
        });
      }
    }

    // Regex check if provided
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
        // Ignore invalid regex config in dev
      }
    }
  }

  const completionPercentage = totalCount === 0 ? 100 : Math.round((filledCount / totalCount) * 100);

  return {
    isValid: errors.length === 0,
    errors,
    completionPercentage
  };
}
