import test from 'node:test';
import assert from 'node:assert/strict';
import { validateApplicationForm } from './formValidator';
import { ApplicationFormField } from '../types';

test('validateApplicationForm catches missing required fields', () => {
  const fields: ApplicationFormField[] = [
    { id: '1', name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { id: '2', name: 'email', label: 'Email Address', type: 'email', required: true },
    { id: '3', name: 'notes', label: 'Optional Notes', type: 'textarea', required: false }
  ];

  const formData = {
    fullName: 'Vedant Sharma',
    email: '' // empty required
  };

  const result = validateApplicationForm(fields, formData);
  assert.equal(result.isValid, false);
  assert.equal(result.errors.length, 1);
  assert.equal(result.errors[0].field, 'email');
});

test('validateApplicationForm flags invalid email and phone numbers', () => {
  const fields: ApplicationFormField[] = [
    { id: '1', name: 'email', label: 'Email', type: 'email', required: true },
    { id: '2', name: 'phone', label: 'Phone', type: 'tel', required: true }
  ];

  const invalidData = {
    email: 'not-an-email',
    phone: '123'
  };

  const result = validateApplicationForm(fields, invalidData);
  assert.equal(result.isValid, false);
  assert.equal(result.errors.length, 2);
});

test('validateApplicationForm returns valid and 100% completion when all required valid', () => {
  const fields: ApplicationFormField[] = [
    { id: '1', name: 'fullName', label: 'Full Name', type: 'text', required: true },
    { id: '2', name: 'email', label: 'Email', type: 'email', required: true },
    { id: '3', name: 'phone', label: 'Phone', type: 'tel', required: true }
  ];

  const validData = {
    fullName: 'Rahul Patil',
    email: 'rahul.patil@example.com',
    phone: '9876543210'
  };

  const result = validateApplicationForm(fields, validData);
  assert.equal(result.isValid, true);
  assert.equal(result.errors.length, 0);
  assert.equal(result.completionPercentage, 100);
});
