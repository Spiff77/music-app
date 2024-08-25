import express from 'express';
import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/artistService.js', () => ({
    getAllArtists: jest.fn(),
    createArtist: jest.fn()
}));

describe('Artist Routes', () => {

    let artistService;
    let artistRoutes;


    beforeEach(async () => {
        artistService = await import('../services/artistService.js');
        artistRoutes = await import('../routes/artistRoutes.js');
        app = express();
        app.use(express.json());
        app.use('/artists', artistRoutes.default);

    });
    afterEach(() => {
        jest.clearAllMocks();
    });


    test('GET /artists should return a list of artists', async () => {
        const mockArtists = [{ id: 1, name: 'Artist 1' }];
        artistService.getAllArtists.mockResolvedValue(mockArtists);

        const response = await request(app).get('/artists');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockArtists);
    });

    test('POST /artists should create a new artist', async () => {
        const mockArtist = { name: 'Artist 1' };
        artistService.createArtist.mockResolvedValue({ id: 1, ...mockArtist });

        const response = await request(app)
            .post('/artists')
            .send(mockArtist);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 1, ...mockArtist });
    });
});