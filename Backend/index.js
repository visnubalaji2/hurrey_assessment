require('dotenv').config();
const express = require('express');
const dbConnection = require('./config/db');
const app = express();
const cors=require('cors')
// Connect DB

dbConnection();

// Middleware
app.use(express.json());
app.use(cors())
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/saveData',require('./routes/saveData'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
