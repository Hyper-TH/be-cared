import express, { query } from 'express';
import cors from 'cors';
import https from 'https';
import admin from 'firebase-admin';
import serviceAccount from './creds.json' assert { type: "json" };
import dotenv from 'dotenv';

dotenv.config();

const database_id = process.env.ID;

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${database_id}.firebaseio.com/`
});

const firestore = admin.firestore();

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

// TODO: Have an appropriate response if there is no medicine results
// end point to get list of medicines
app.get('/getMeds', async (req, res) => {
    try {
        const { medQuery } = req.query;
        console.log(`Got ${medQuery}`);

        if (!medQuery) {
            return res.status(400).json({ error: 'Medicine is required' });
        } else {
            const token = await requestToken(tokenOptions);
            const medsData = await requestList(token, medQuery);

            // Assuming requestList returns an array of medicines
            res.json({ medicines: medsData });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// TODO: Appropriate handling for medicines with NO SPC
// end point to get cached SPC / cache SPC
app.get('/grabCacheSPC', async (req, res) => {
    const { uploadPath } = req.query    // Initally passed ass text/text2/text3
    const documentID = uploadPath.replace(/\//g, '-');  // Regexed uploadPath to remove '/'
    const collectionName = "SPC"; 
    
    console.log(uploadPath);

    try {
        const documentSnapshot = await firestore.collection(collectionName).doc(documentID).get();
        
        if (documentSnapshot.exists) {
            console.log(`Found cached document`);
            const documentData = documentSnapshot.data();
            
            // console.log(documentData);
            
            res.type('text/html').send(documentData);
        } 
        // If it does not, cache this to the server!
        else {
            console.log(`Caching to server with new documentID: ${documentID}`);

            const token = await requestToken(tokenOptions);
            const document = await requestSPC(token, uploadPath);
 
            const data = {
                doc: document
            }

            await firestore.collection(collectionName).doc(documentID).set(data);

            console.log("Cached to server!");

            res.type('text/html').send(document);
        }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
});

// TODO: Appropriate handling for medicines with no PIL
app.get('/grabCachePIL', async (req, res) => {
    const { pil } = req.query   
    const documentID = pil;
    const collectionName = "PIL"; 
    
    console.log(pil);

    try {
        const documentSnapshot = await firestore.collection(collectionName).doc(documentID).get();
        
        if (documentSnapshot.exists) {
            console.log(`Found cached document`);
            const documentData = documentSnapshot.data();
            
            console.log(documentData);
            
            res.send(documentData);
        } 
        // If it does not, cache this to the server!
        else {
            console.log(`Caching to server with new documentID: ${documentID}`);

            const token = await requestToken(tokenOptions);
            const document = await requestPIL(token, pil);
 
            const data = {
                doc: document
            }

            await firestore.collection(collectionName).doc(documentID).set(data);

            console.log("Cached to server!");

            res.type('application/pdf').send(document);
        }

    } catch (error) {
      console.error("Error fetching data:", error);
    }
});

// Method to get token
async function requestToken(options) {
    return new Promise((resolve, reject) => {
        https.get(options, (response) => {
            let result = '';

            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
                try {
                    const token = result.match(/access_token&q;:&q;(\w+)/)[1];
                    console.log(`Token: ${token}`);
                    resolve(token);
                } catch (error) {
                    console.error('Error:', error);
                    reject(error);
                }
            });

            response.on('error', function (error) {
                console.error('Error:', error);
                reject(error);
            });
        });
    });
}

// Function to get list of medicines in JSON format
async function requestList(token, search) {
    const option2 = {
        host: "backend-prod.medicines.ie",
        path: `/api/v1/medicines?published=true&expand=company%2Cingredients%2CactiveSPC%2Cpils.activePil%2CotherDocs.activeDoc%2CadditionalComs.activeCom&page=1&per-page=25&query=${search}`,
        headers: {
            accept: "application/json",
            authorization: `Bearer ${token}`,
            sec_ch_ua: "\"Chromium\";v=\"118\", \"Opera GX\";v=\"104\", \"Not=A?Brand\";v=\"99\"",
            sec_ch_ua_mobile: "?0",
            sec_ch_ua_platform: "\"Windows\"",
            Referer: "https://www.medicines.ie/",
            Referrer_Policy: "strict-origin-when-cross-origin"
        }
    };

    return new Promise((resolve, reject) => {
        https.get(option2, (response) => {
            let result = '';

            response.on('data', function (chunk) {
                result += chunk;
            });

            response.on('end', function () {
                try {
                    const parsed = JSON.parse(result);
                    console.log(parsed);

                    resolve(parsed);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            });

            response.on('error', function (error) {
                console.error('Error:', error);
            });
        });
    });
};


// Function to request Patient Leaflet PDF/HTML
// TODO: Get uploads/files/medID.pdf when requesting for list of medicines
// TODO: Cache PDF to firestore
async function requestPIL(token, uploadPath) {
    const options3WithToken = {
        host: "backend-prod.medicines.ie",
        path: `uploads/files/${uploadPath}`,
        headers: {
            accept: "application/pdf",
            authorization: `Bearer ${token}`,
            Referer: "https://www.medicines.ie/",
            Referrer_Policy: "strict-origin-when-cross-origin"
        }
    };

    return new Promise((resolve, reject) => { 
        // TODO: Resolves prematurely
        https.get(options3WithToken, (response) => {
            const pdfChunks = [];
            
            response.on('data', (chunk) => { 
                console.log("Pushed", chunk)
                pdfChunks.push(chunk);
            });

            response.on('end', () => {
                // Check if the connection was closed prematurely
                if (!response.complete) {
                  reject(new Error('Incomplete response'));
                  return;
                }
        
                // This event indicates that the response has been completely received.
                const pdfBuffer = Buffer.concat(pdfChunks);
                resolve(pdfBuffer);
                console.log('PDF file sent');
            });
            
            response.on('error', (error) => {
                console.error(`Error retrieving PDF: `, error);
                reject(error);
            });
    
            response.on('close', () => {
                // The connection was closed prematurely
                reject(new Error('Connection closed prematurely'));
            });
        });
    });
};

// Function to get the SPC document
async function requestSPC(token, uploadPath) {
    const option3 = {
        hostname: "backend-prod.medicines.ie",
        path: `/${uploadPath}`,
        headers: {
            accept: "text/plain",
            accept_language: "en-GB,en-US;q=0.9,en;q=0.8",
            authorization: `Bearer ${token}`,
            sec_ch_ua: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Opera GX\";v=\"102\"",
            sec_ch_ua_mobile: "?0",
            sec_ch_ua_platform: "\"Windows\"",
            sec_fetch_dest: "empty",
            sec_fetch_mode: "cors",
            sec_fetch_site: "same-site",
            Referer: "https://www.medicines.ie/",
            Referrer_Policy: "strict-origin-when-cross-origin"
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.get(option3, (response) => {
            let result = '';
      
            response.on('data', function (chunk) {
              result += chunk;
            });
      
            response.on('end', function () {
              try {
                const doc = result;
      
                resolve(doc);
              } catch (error) {
                console.error('Error getting document:', error);
              }
            });
      
            response.on('error', function (error) {
              console.error('Error:', error);
              reject(error);
            });
        });
      
        // Avoid infinite loop by only calling resolve/reject once
        req.on('error', (error) => reject(error));
    });
}; 

// First request to get token
const tokenOptions = {
    hostname: "www.medicines.ie",
    headers: {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        accept_language: "en-GB,en-US;q=0.9,en;q=0.8",
        sec_ch_ua: "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Opera GX\";v=\"102\"",
        sec_ch_ua_mobile: "?0",
        sec_ch_ua_platform: "\"Windows\"",
        sec_fetch_dest: "document",
        sec_fetch_mode: "navigate",
        sec_fetch_site: "none",
        sec_fetch_: "?1",
        Referrer_Policy: "strict-origin-when-cross-origin",
        upgrade_insecure_requests: "1"
    }
};