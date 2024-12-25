import { validateForm } from '../lib/validateForm';

describe('validateForm', () => {
  test('returns null for valid form data', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, this is a test message.'
    };
    const result = validateForm(formData);
    expect(result).toBeNull();
  });

  test('returns error for missing name', () => {
    const formData = {
      name: '',
      email: 'john@example.com',
      message: 'Hello, this is a test message.'
    };
    const result = validateForm(formData);
    expect(result).toBe('Name is required');
  });

  test('returns error for missing email', () => {
    const formData = {
      name: 'John Doe',
      email: '',
      message: 'Hello, this is a test message.'
    };
    const result = validateForm(formData);
    expect(result).toBe('Email is required');
  });

  test('returns error for invalid email', () => {
    const formData = {
      name: 'John Doe',
      email: 'invalid-email',
      message: 'Hello, this is a test message.'
    };
    const result = validateForm(formData);
    expect(result).toBe('Invalid email address');
  });

  test('returns error for missing message', () => {
    const formData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: ''
    };
    const result = validateForm(formData);
    expect(result).toBe('Message is required');
  });
});