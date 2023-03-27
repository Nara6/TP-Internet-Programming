const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { router } = require('./routes/router');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api",router);

app.listen(3000)