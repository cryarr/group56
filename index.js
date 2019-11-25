var express = require('express');
var mysql = require('./dbCon.js');
const path = require('path');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'home'});

app.engine('handlebars', handlebars.engine);
app.set('port', process.argv[2]);
app.set('view engine', 'handlebars');

app.set('myql', mysql);
const publicPath = path.join(__dirname, '/vendor');
app.use(express.static(publicPath));


app.listen(app.get('port'), function() {
	console.log('Express started on flip:' + app.get('port'));

});

app.get('/', function(req, res, next){
	res.render('landing');
});

app.get('/add', function(req, res, next){
	res.render('add');
});

app.get('/addPerson', function(req, res, next){
	res.render('addPerson');
});

app.get('/addRegion', function(req, res, next){
	res.render('addRegion');
});

app.get('/addEvent', function(req, res, next){
	res.render('addEvent');
});

app.get('/addCity', function(req, res, next){
	res.render('addCity');
});



app.get('/search', function(req, res, next){
	res.render('search');
});
