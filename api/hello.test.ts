import { createMocks } from 'node-mocks-http';
import handler from '../api/hello';

describe('Hello API Endpoint', () => {
  beforeEach(() => {
    process.env.SITE_URL = 'http://localhost:3000';
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

  test('returns 200 for valid POST requests', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      },
      query: {
        name: 'John'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Hello John!'
    });
  });

  test('returns 200 for valid POST requests with default name', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000'
      }
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Hello World!'
    });
  });
});