require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Schema and Model
const visitorSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

// Routes
app.get('/api/visits', async (req, res) => {
    try {
        let visitor = await Visitor.findOne();

        if (!visitor) {
            visitor = new Visitor({ count: 1 });
        } else {
            visitor.count++;
        }

        await visitor.save();
        res.json({ count: visitor.count });
    } catch (err) {
        console.error('Error fetching/updating visitor count:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
