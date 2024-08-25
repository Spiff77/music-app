import cors from 'cors';
import express from 'express';
import artistRoutes from './routes/artistRoutes.js';

const app = express();
app.use(cors());
app.use(express.json()); // More modern approach than using the body-parser library. it is now not required.
app.use('/artists', artistRoutes);

export default app;