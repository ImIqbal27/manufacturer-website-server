const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, MongoRuntimeError, ObjectId } = require('mongodb');


app.use(cors());
app.use(express.json());
////////////////////////////////////////////////////////////////////////////////////
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v8tde.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('manufacturer_website').collection('products');
        console.log('colle');

        /////////////////// get all product/data from mongodb/ api /////////////////////
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });
        ///////////  for get single data/product from db on UI ////////////
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);

        });
    }
    finally {

    }

}






run().catch(console.dir);








/////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Hello Manufacturer Website!');
})

app.listen(port, () => {
    console.log(`Manufacturer Website listening on port ${port}`);
})