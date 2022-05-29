const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors());
app.use(express.json());
////////////////////////////////////////////////////////////////////////////////////
const uri = "mongodb+srv://manufacturer_admin:<password>@cluster0.v8tde.mongodb.net/?retryWrites=true&w=majority";


/////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Hello Manufacturer Website!');
})

app.listen(port, () => {
    console.log(`Manufacturer Website listening on port ${port}`);
})