import https from 'https';
import express from 'express';
import { autoComplete } from './methods.js';

const router = express.Router();

router.get('/autoComplete', async (req, res) => {
    try {
        const { input } = req.query;
        console.log("Input: ", input);
        const drugsData = await autoComplete(input);

        console.log(drugsData);
        // Assuming requestList returns an array of drugs
        res.json({ drugs: drugsData });
        
    } catch (error) {
        console.error('Error:', error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
