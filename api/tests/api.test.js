// tests/api.test.js
const request = require('supertest');
const { app, pool, port } = require('../server');

let server;

beforeAll(async () => {
  server = app.listen(port, () => {
    console.log(`Test API is running on http://localhost:${port}`);
  });
});

afterAll(async () => {
  await pool.end();
  server.close();
});

describe('API Tests', () => {
  test('should return 200 OK for the /api endpoint', async () => {
    const response = await request(app).get('/api');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Hello from the API!');
  });
});