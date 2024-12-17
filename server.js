const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection URI (replace with your MongoDB Atlas URI)
const MONGODB_URI = process.env.MONGODB_URI || 'your_mongodb_uri_here';
const DB_NAME = 'emo-grid';
const COLLECTION_NAME = 'grid-state';

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db(DB_NAME);
    cachedDb = db;
    return db;
}

// Get grid state
app.get('/getGridState', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);
        
        // Get grid state from database
        const gridState = await collection.findOne({ _id: 'gridState' });
        
        if (!gridState) {
            res.json({ litCells: {} });
        } else {
            // Remove MongoDB _id field
            delete gridState._id;
            res.json(gridState);
        }
    } catch (error) {
        console.error('Error reading grid state:', error);
        res.status(500).json({ error: 'Failed to read grid state' });
    }
});

// Update grid state
app.post('/updateGridState', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);
        
        // Update or insert grid state
        await collection.updateOne(
            { _id: 'gridState' },
            { $set: req.body },
            { upsert: true }
        );
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating grid state:', error);
        res.status(500).json({ error: 'Failed to update grid state' });
    }
});

// Reset grid state - only call via API when needed
app.post('/resetGridState', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(COLLECTION_NAME);
        
        // Reset to empty state
        await collection.updateOne(
            { _id: 'gridState' },
            { $set: { litCells: {}, lastUpdate: new Date().toISOString() } },
            { upsert: true }
        );
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error resetting grid state:', error);
        res.status(500).json({ error: 'Failed to reset grid state' });
    }
});

// Serve static files
app.use(express.static('.'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
