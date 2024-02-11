import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { db } from './config.js';
import { getDocs, collection } from 'firebase/firestore';
import dotenv from 'dotenv';
import medicinesRouter from './medicines/medicinesRouter.js';
import drugbankRouter from './drugbank/drugbankRouter.js';

dotenv.config();

// Create Express application
const app = express();
app.use(cors());
app.use(express.json());

// Create a GET route
// /message is an endpoint that returns JSON object with message
app.get('/message', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// Start server
app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
});

// endpoint to get user authentications
app.get('/login', async (req, res) => {
    try {
        const usersCollectionRef = collection(db, "users");
        const { token } = req.headers; 
        const { user, uid } = req.query;

        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
        .filter((users) => users.id === user);
            
        try {
            const authUser = await admin.auth().verifyIdToken(token);

            if (authUser.uid != uid) {
                return res.sendStatus(403);
            }

        } catch (error) {
            console.log("Unverified Token");
            return res.sendStatus(401);
        }
        res.json({ message: filteredData[0]});

    } catch (error) {
        console.error(`Error: ${error}`);
    }
});

app.use(drugbankRouter);
app.use(medicinesRouter);