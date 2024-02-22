import env from 'dotenv';
import express from 'express';
import cors from 'cors';

env.config();

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// testing
app.get('/', (req, res) => {
    res.send('Hello World');
});

// routes
import ownerRoutes from './routes/ownerRoutes.js';
app.use('/api/owner', ownerRoutes);


// set port, listen for requests
const port = process.env.PORT
app.listen(port, () => {    
    console.log('Server is running on port', port);
});