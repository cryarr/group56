var express = require('express');
var mysql = require('./dbCon.js');
const path = require('path');
var bodyparser = require('body-parser');

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

//landing and viewing the updates

app.get('/addPerson', function(req, res, next){
	var context= {};
	var viewstring = "SELECT * FROM people";
	mysql.pool.query(viewstring, function(err, rows, fields){
		if (err) {
			console.log("error: " + err);
		}

		context.people = rows;
		res.render('addPerson', context);
	});
});

app.get('/addRegion', function(req, res, next){
	var context = {};
	var viewstring = "SELECT * FROM region";
	mysql.pool.query(viewstring, function(err, rows, fields){
		if (err) {
			console.log("error : " + err);
		}

		context.region = rows;
		res.render('addRegion', context);
	});
});

app.get('/addEvent', function(req, res, next){
	var context = {};
	var viewstring = "SELECT * FROM event";
	mysql.pool.query(viewstring, function(err, rows, fields) {
		if (err) {
			console.log("error : " + err);
		}
		
		context.event = rows;
		res.render('addEvent', context);
	
	});
});

app.get('/addCity', function(req, res, next){
	var context = {};
	var viewstring = "SELECT * FROM cities";
	mysql.pool.query(viewstring, function(err, rows, fields){
		if (err) {
			console.log("error : " + err);
		}

		context.city = rows;
		res.render('addCity', context);
	
	});
});



app.get('/search', function(req, res, next){
	res.render('search');
});







