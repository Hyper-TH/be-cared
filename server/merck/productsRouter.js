import admin from 'firebase-admin';
import serviceAccount from '../config/creds.json' assert { type: "json" };
import express from 'express';
import { requestCookie, requestProductDetails, requestList, productListParser } from './methods.js'

const router = express.Router();

// Initialize Firebase Admin SDK 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://be-cared.firebaseio.com/`
});

const firestore = admin.firestore();

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

router.get('/getProduct', async (req, res) => {
    const { uploadPath } = req.query;

    console.log(`Got ${uploadPath}`);
    // TODO: change '/' to '_'
    const documentID = uploadPath;
    const collectionName = "products";

    try {
        let documentSnapshot = await firestore.collection(collectionName).doc(documentID).get();

        if (documentSnapshot.exists) {
            console.log(`Found cached product`);
            const productData = documentSnapshot.data();

            res.type('json').send(productData);

        } else {
            console.log(`Caching to server with new documentID: ${documentID}`);

            console.log(`Sending ${uploadPath}`);
            const productDetails = await requestProductDetails(uploadPath);

            // TEMP
            console.log(productDetails);
            // const data = {
            //     doc: productDetails
            // }

            // try {
            //     await firestore.collection(collectionName).doc(documentID).set(data);

            //     console.log("Cached to server!");

            //     let documentSnapshot = await firestore.collection(collectionName).doc(documentID).get();
            //     const productData = documentSnapshot.data();

            //     res.type('json').send(productData);

            // } catch (error) {
            //     console.error('an error occured:', error);

            //     res.send({ error: 'Failed' });
            // }
        }

    } catch {
        console.error(`Error fetching data: ${error}`);
    }
})

export default router;