const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
require('./src/config/index')()


const hour = 1000*60*60;

app.use(session({
    secret: "S@cretKey",
    saveUninitialized: true,
    cookie: {maxAge: hour},
    resave: false,
    name: "token"
}))

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(require('./src/routes/user'));


app.listen(3001,()=>{
    console.log('Server is running on port 3001');
})