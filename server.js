const express = require('express');
const bodyParser = require('body-parser');

const PORT = require('./config/properties').PORT;

const  db = require('./config/database');

const Routes = require('./api/routes/router');

const app  = express();


//bodyParser init
const bodyParserUrlEncoded = bodyParser.urlencoded({extended: true});

//init express router
var router = express.Router();

//mongoDB connectivity function 
db();

//config of app.use()
app.use(bodyParserUrlEncoded);
app.disable('x-powered-by');

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origine", "*");
    res.setHeader("Access-Control-Allow-Credentials", "*");
    res.setHeader("Access-Control-Allow-Methods","DELETE,GET,POST,PUT");
    next();
});



app.use('/api', router);

Routes(router);
app.listen(PORT, (req, res) =>{
    console.log(" Server running on ", PORT);
})