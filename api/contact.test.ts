import handler from './contact';
import nodemailer from 'nodemailer';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

describe('API Endpoint Tests', () => {
  let req, res;

  beforeEach(() => {
    req = { method: '', headers: {}, query: {} };
    res = {
      setHeader: jest.fn(),
      status: jest.fn(() => res),
      json: jest.fn(),
      end: jest.fn(),
    };
  });

  it('should handle preflight OPTIONS requests', async () => {
    req.method = 'OPTIONS';
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalled();
  });

  // Additional tests...
});