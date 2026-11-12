import test from 'node:test';
import assert from 'node:assert';
import { 
  validateEmail, 
  checkPasswordStrength, 
  validateRegistration, 
  validateLogin 
} from './authValidator';

test('validateEmail validates RFC 5322 emails correctly', () => {
  assert.strictEqual(validateEmail('').isValid, false);
  assert.strictEqual(validateEmail('notanemail').isValid, false);
  assert.strictEqual(validateEmail('user@').isValid, false);
  assert.strictEqual(validateEmail('citizen.demo@placepilot.local').isValid, true);
  assert.strictEqual(validateEmail('vedant.sharma@example.gov.in').isValid, true);
});

test('checkPasswordStrength detects short, weak, medium, and strong passwords', () => {
  const short = checkPasswordStrength('123');
  assert.strictEqual(short.isValid, false);
  assert.strictEqual(short.label, 'Too Short');

  const weak = checkPasswordStrength('lowercaseonly');
  assert.strictEqual(weak.score <= 2, true);

  const medium = checkPasswordStrength('password123');
  assert.strictEqual(medium.isValid, true);
  assert.strictEqual(medium.label, 'Medium');

  const strong = checkPasswordStrength('PlacePilot@2026Secure!');
  assert.strictEqual(strong.isValid, true);
  assert.strictEqual(strong.label, 'Strong');
  assert.strictEqual(strong.score, 4);
});

test('validateRegistration checks all required fields and confirmation', () => {
  const invalid = validateRegistration({
    fullName: '',
    email: 'bad-email',
    password: 'pass',
    confirmPassword: 'other',
    state: '',
    termsAccepted: false
  });
  assert.strictEqual(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.password);
  assert.ok(invalid.errors.confirmPassword);
  assert.ok(invalid.errors.state);
  assert.ok(invalid.errors.termsAccepted);

  const valid = validateRegistration({
    fullName: 'Aarav Patil',
    email: 'aarav.patil@example.com',
    password: 'SecurePassword123',
    confirmPassword: 'SecurePassword123',
    state: 'Maharashtra',
    district: 'Pune',
    language: 'mr',
    termsAccepted: true
  });
  assert.strictEqual(valid.isValid, true);
  assert.strictEqual(Object.keys(valid.errors).length, 0);
});

test('validateLogin checks required email and password', () => {
  const bad = validateLogin({ email: '', password: '' });
  assert.strictEqual(bad.isValid, false);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.password);

  const good = validateLogin({ email: 'citizen.demo@placepilot.local', password: 'Password123!' });
  assert.strictEqual(good.isValid, true);
});

test('normalizeSupabaseUrl handles missing protocols and trailing slashes', async () => {
  const { normalizeSupabaseUrl, isValidHttpUrl } = await import('./supabaseClient');
  
  assert.strictEqual(normalizeSupabaseUrl(''), '');
  assert.strictEqual(normalizeSupabaseUrl('   '), '');
  assert.strictEqual(normalizeSupabaseUrl('myproject.supabase.co'), 'https://myproject.supabase.co');
  assert.strictEqual(normalizeSupabaseUrl('https://myproject.supabase.co/'), 'https://myproject.supabase.co');
  assert.strictEqual(normalizeSupabaseUrl('http://localhost:54321/'), 'http://localhost:54321');

  assert.strictEqual(isValidHttpUrl(''), false);
  assert.strictEqual(isValidHttpUrl('not-a-url'), false);
  assert.strictEqual(isValidHttpUrl('https://myproject.supabase.co'), true);
  assert.strictEqual(isValidHttpUrl('http://localhost:54321'), true);
});

