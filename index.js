const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send('Hello Manufacturer Website!');
})

app.listen(port, () => {
    console.log(`Manufacturer Website listening on port ${port}`);
})