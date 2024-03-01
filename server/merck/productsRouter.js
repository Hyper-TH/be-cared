import express from 'express';
import { requestCookie, requestList, productListParser } from './methods.js'

const router = express.Router();

router.get('/getProds', async (req, res) => {
    try {
        const { prodQuery, searchType } = req.query;

        if (!prodQuery) {
            return res.status(400).json({ error: 'Product is required '});
        } else {
            const cookie = await requestCookie();
            const prodsList = await requestList(cookie, prodQuery, searchType);
            const prodsData = await productListParser(prodsList, searchType);

            // console.log(prodsData);

            // Assuming requestList returns an array of drugs
            res.json({ products: prodsData });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;