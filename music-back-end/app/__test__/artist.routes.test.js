import express from 'express';
import request from 'supertest';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../services/artist.service.js', () => ({
    getAllArtists: jest.fn(),
    createArtist: jest.fn(),
    getArtistById: jest.fn()
}))

describe('Artist routes', () => {

    let artistRoutes;
    let artistService;

    beforeEach( async() => {
        artistRoutes = await import('../routes/artist.routes.js')
        artistService = await import('../services/artist.service.js')

        app = express()
        app.use(express.json())
        
        app.use('/artists', artistRoutes.default)
    })

    test('GET /artist should return a list of artists', async () => {
         artistService.getAllArtists.mockResolvedValue([])
         const response = await request(app).get('/artists')
         console.log(response.body)
         expect(response.status).toBe(200)
    })

    test('POST /artists should create a new artist', async () => {
        const mockArtist = { name: 'Artist 1' };
        artistService.createArtist.mockResolvedValue({...mockArtist, id:1})

        const response = await request(app).post('/artists').send(mockArtist)

        expect(response.status).toBe(201)
        expect(response.body).toEqual({...mockArtist, id:1})
    })

    test('GET incorrect artist id should return a 404', async () => {
        artistService.getArtistById.mockResolvedValue(undefined)

        const response = await request(app).get('/artists/12')

        expect(response.status).toBe(404)
    })
    test('GET artist from a specific id', async () => {
        artistService.getArtistById.mockResolvedValue([{id: 12}])

        const response = await request(app).get('/artists/12')

        expect(response.status).toBe(200)
    })
})