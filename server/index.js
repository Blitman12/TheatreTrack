const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRoutes = require('./routes')
const cors = require('cors')
dotenv.config();


const PORT = process.env.PORT;
const MongoUri = process.env.MONGOURI || '';

const app = express();
app.use(cors({
    origin: ['http://localhost:4200'],
    optionsSuccessStatus: 200
}))
app.use(express.json());
app.use('/api', apiRoutes)

mongoose.connect(MongoUri, () => {
    console.log('connected to database');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})