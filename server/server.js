import express from 'express';
import cors from 'cors';

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