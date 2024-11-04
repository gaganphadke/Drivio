const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const carRoutes=require('./routes/carRoutes')
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/user', userRoutes); // Mount the routes
console.log("Registering /api routes..."); 
app.use('/api', carRoutes);

app.listen(5001, () => console.log('Server running on port 5001'));
