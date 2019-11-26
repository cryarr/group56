var express = require('express');
var mysql = require('./dbCon.js');
const path = require('path');
var bodyparser = require('body-parser');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'home'});

app.engine('handlebars', handlebars.engine);
app.set('port', process.argv[2]);
app.set('view engine', 'handlebars');
app.use(bodyparser.urlencoded({ extended: true }));
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

app.post('/search', function(req, res, next){
	var lookup = "SELECT * FROM people WHERE name = " + req.body.search;
	mysql.pool.query(lookup, function(err, rows, fields){
		if (err) {
			console.log("error: " + err);
		}
		res.redirect('/search');
	});
});



app.post('/addRegion', function(req, res, next){
	var insert = "INSERT INTO region (region_name) VALUES ('" + req.body.rname + "')";
	console.log(insert);
	mysql.pool.query(insert, function(err, rows, fields){
		if (err) {
			console.log("error: " + err);
		}
		res.redirect('/addRegion');
	});

});


app.post('/addPerson', function(req, res, next){
	var insert = "INSERT INTO people (first_name,last_name,regid,citid,description) VALUES ('" +
	req.body.fname + "','" +  req.body.lname + "','" + req.body.regid + "','" + req.body.citid + "','" + req.body.desc
	+ "')";
	console.log(insert);
	mysql.pool.query(insert, function(err, rows, fields){
		if (err) {
			console.log("error: + " + err);
		}
		res.redirect('/addPerson');
	});

});


app.post('/addEvent', function(req, res, next) {
	var insert = "INSERT INTO event (event_name,description,reid,tpid) VALUES ('" +
	req.body.ename + "','" + req.body.desc + "','" + req.body.reid + "','" + req.body.tpid + "')";
	console.log(insert);
	mysql.pool.query(insert, function(err, rows, fields){
		if (err) {
			console.log("error: + " + err);
		}
		res.redirect('/addEvent');
	});

});


app.post('/addCity', function(req, res, next){
	var insert = "INSERT INTO cities (city_name,population,rid) VALUES ('" + req.body.cname + 
	"','" + req.body.pop + "','" + req.body.rid + "')";
	console.log(insert);

	mysql.pool.query(insert, function(err, rows, fields){
		if (err) {
			console.log("error: + " + err);
		}
		res.redirect('/addCity');
	});

});
