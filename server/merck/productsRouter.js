import express from 'express';
import { requestCookie, requestList } from './methods.js'

const router = express.Router();

router.get('/getProds', async (req, res) => {
    try {
        const { prodQuery } = req.query;

        if (!prodQuery) {
            return res.status(400).json({ error: 'Product is required '});
        } else {
            const cookie = await requestCookie();
            const prodsData = await requestList(cookie, prodQuery);

            console.log(prodsData);

            res.status(200);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;