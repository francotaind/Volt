const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/message.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Routes
app.use('/api/messages', messageRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

