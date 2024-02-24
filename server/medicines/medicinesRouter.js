import admin from 'firebase-admin';
import serviceAccount from '../config/creds.json' assert { type: "json" };
import express from 'express';
import { tokenOptions } from './tokenOptions.js';
import { requestToken, requestList, requestDocument } from './methods.js'
 
const router = express.Router();

// Initialize Firebase Admin SDK 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://be-cared.firebaseio.com/`
});

const firestore = admin.firestore();

// end point to get list of medicines
router.get('/getMeds', async (req, res) => {
    try {
        const { medQuery } = req.query;

        if (!medQuery) {
            return res.status(400).json({ error: 'Medicine is required' });
        } else {
            const token = await requestToken(tokenOptions);
            const medsData = await requestList(token, medQuery);

            console.log(medsData);

            // Assuming requestList returns an array of medicines
            res.json({ medicines: medsData });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/grabCache', async (req, res) => {
    const { uploadPath } = req.query 

    const documentID = uploadPath;
    const collectionName = "files"; 
    
    try {
        let documentSnapshot = await firestore.collection(collectionName).doc(documentID).get();
        
        if (documentSnapshot.exists) {
            console.log(`Found cached document`);
            const documentData = documentSnapshot.data();
            
            res.type('application/pdf').send(documentData);
        } 
        // If it does not, cache this to the server!
        else {
            console.log(`Caching to server with new documentID: ${documentID}`);

            const token = await requestToken(tokenOptions);
            const document = await requestDocument(token, uploadPath);
 
            const data = {
                doc: document
            }

            // TODO: try catch for any files above limit
            await firestore.collection(collectionName).doc(documentID).set(data);
            console.log("Cached to server!");

            // Grab it again
            documentSnapshot = await firestore.collection(collectionName).doc(documentID).get();
            const documentData = documentSnapshot.data();
            
            res.type('application/pdf').send(documentData);
        }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
});


export default router;