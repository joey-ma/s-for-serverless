import { createMocks } from 'node-mocks-http';
import handler from './contact';
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('Contact API Endpoint', () => {
  let consoleLogMock: jest.SpyInstance;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    process.env.SITE_URL = 'http://localhost:3000';
    process.env.EMAIL_USER = 'test@example.com';
    process.env.EMAIL_PASS = 'password';
    process.env.INBOX = 'inbox@example.com';

    // Mock nodemailer
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(true)
    });

    // Mock console.log & console.error
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleLogMock.mockRestore();
    consoleErrorMock.mockRestore();
  })
  
  test('handles preflight OPTIONS requests', async () => {
    const { req, res } = createMocks({
      method: 'OPTIONS',
      headers: {
        origin: 'http://localhost:3000'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._isEndCalled()).toBe(true);
  });

  test('returns 200 for valid POST requests', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
      query: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message.'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      success: 'Message sent successfully'
    });
    expect(consoleLogMock).toHaveBeenCalledWith('Message sent successfully');
  });

  test('returns 405 for non-POST requests', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      headers: {
        origin: 'http://localhost:3000'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Method not allowed'
    });
  });

  test('returns 403 for invalid origin', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        origin: 'http://invalid-origin.com'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(403);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Access denied'
    });
  });

  test('returns 500 for missing form fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
      query: {
        name: '',
        email: '',
        message: ''
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Name is required'
    });
  });

  test('returns 500 for invalid email format', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
      query: {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Hello, this is a test message.'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Invalid email address'
    });
  });

  test('returns 500 when email sending fails', async () => {
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: jest.fn().mockRejectedValue(new Error('Failed to send email'))
    });

    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
      query: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message.'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Internal Server Error'
    });
    expect(consoleErrorMock).toHaveBeenCalledWith('Error sending message:', expect.any(Error));
  });
});
