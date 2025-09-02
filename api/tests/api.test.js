// tests/api.test.js
const request = require('supertest');
const { app, pool } = require('../server');

afterAll(async () => {
  // Stäng DB-connection så att Jest kan avsluta snyggt
  await pool.end();
});

describe('API Tests', () => {
  test('should return 200 OK for the /api endpoint', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Hello from the API!');
  });
});
