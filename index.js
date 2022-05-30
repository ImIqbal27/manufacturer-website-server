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
        const orderCollection = client.db('manufacturer_website').collection('orders');
        const userCollection = client.db('manufacturer_website').collection('users');

        /////////////////// get all product/data from mongodb/ api /////////////////////
        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });
        ///////////  for get single data/product from db on UI ////////////////////////
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);

        });
        ////////////////  order/post data on db by user  ///////////////////////////////////////
        app.post('/order', async (req, res) => {
            const newProduct = req.body;
            const result = await orderCollection.insertOne(newProduct);
            res.send(result);
        });
        ////////////////  order data from db on user/ email based  /////////////////////////////
        app.get('/order', async (req, res) => {
            const userEmail = req.query.userEmail;
            const query = { userEmail: userEmail };
            const orders = await orderCollection.find(query).toArray();
            res.send(orders);
        });
        /////////////////// put user  /////////////////////////////
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })






















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