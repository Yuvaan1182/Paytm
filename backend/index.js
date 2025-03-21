const express = require("express");
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const mainRouter = require('./routes/index.js');

app.use('/api/v1', mainRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
        console.log('Server started on PORT: ${3000}');
});