var express = require('express'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    routes = require('./routes');


var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static Routing (Not yet in use):
app.use(express.static(__dirname + '/public'));


app.use("/bootstrap", express.static(__dirname + '/node_modules/bootstrap/dist'));


app.use("/jquery", express.static(__dirname + '/node_modules/jquery/dist'));



//**************SWIG******************************
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});
//**************SWIG******************************



//Routing:
app.use("/", routes);




app.listen(3000, function(err){
  console.log('Listening to port 3000');
});





//ERROR HANDLING MIDDLEWARE***********************************************
// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    // res.render(
    //     // ... fill in this part
    //     //error
    // );
	res.send("ya fucked up...")
});
//ERROR HANDLING MIDDLEWARE***********************************************