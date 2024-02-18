import https from 'https';
import express from 'express';
import { autoComplete, getInteractions, getToken, htmlParser } from './methods.js';
import { getMaxListeners } from 'events';

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

router.get('/interactions', async (req, res) => {
    try {
        // Extract the 'drugs' query parameter from the request URL
        const { drugs } = req.query;

        // Check if the 'drugs' parameter exists
        if (!drugs) {
            return res.status(400).json({ error: "Drugs parameter is missing" });
        }

        // Decode the URL-safe string back to JSON
        const decodedDrugs = decodeURIComponent(drugs);
        
        // Parse the JSON string into an array
        const drugsArray = JSON.parse(decodedDrugs);
        console.log(drugsArray);

        const token = await getToken();
        const interactions = await getInteractions(token, drugsArray);

        const count = await htmlParser(interactions);

        console.log(count);
        // Send a response back with the interactions or any other relevant data
        res.json({ interactions: "Some interaction data based on the drugs array" });
    } catch (error) {
        console.error(`Error processing request: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
