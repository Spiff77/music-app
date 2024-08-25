import request from 'supertest';
import app from '../app'


describe('Server', () => {

    // Test the /artists route (assuming GET request to /artists)
    test('GET /artists should return a list of artists', async () => {
        const response = await request(app).get('/artists');

        expect(response.status).toBe(200);
        // Adjust expectations based on your actual data and response
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
    });

    // Test CORS middleware
    test('CORS headers should be present', async () => {
        const response = await request(app).get('/artists');
        expect(response.headers['access-control-allow-origin']).toBe('*');
    });

    // Test 404 Not Found for an undefined route
    test('should return 404 for undefined routes', async () => {
        const response = await request(app).get('/undefined-route');
        expect(response.status).toBe(404);
    });

});

