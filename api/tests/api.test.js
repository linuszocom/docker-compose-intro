const request = require('supertest');
const server = require('../server');

describe('API Endpoints', () => {
  it('should return "Hello from the API!" on GET /api', async () => {
    // Gör ett GET-anrop till vår /api-endpoint
    const response = await request(server).get('/api');

    // Kontrollerar att svaret har status 200 (OK)
    expect(response.statusCode).toBe(200);

    // Kontrollerar att meddelandet stämmer
    expect(response.body.message).toBe('Hello from the API!');
  });
});

afterAll(async () => {
  await server.pool.end();
  server.close();
});