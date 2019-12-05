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

var router = express.Router();

app.listen(app.get('port'), function() {
	console.log('Express started on flip:' + app.get('port'));

});

app.get('/', function(req, res, next){
	var context = {};
	context.jsscripts = ['delete.js'];
	res.render('landing', context);
});

app.get('/add', function(req, res, next){
	res.render('add');
});




/* DISPLAYING, DELETING, UPDATING
 *
 * */

app.get('/addPerson', function(req, res, next){
	var context= {};
	context.jsscripts = ['delete.js'];
	var viewstring = "SELECT * FROM people";
	mysql.pool.query(viewstring, function(err, rows, fields){
		if (err) {
			console.log("error: " + err);
		}

		context.people = rows;
		viewstring = "SELECT * FROM cities";
		mysql.pool.query(viewstring, function(err, rows, fields){
				viewstring = "SELECT * FROM region";
				context.city = rows;
				mysql.pool.query(viewstring, function(err, rows, fields){
				
					context.region = rows;		
					res.render('addPerson', context);
				});

		});
		
	});
});

app.delete('/addPerson/:id', function(req, res){
	var sql = " DELETE FROM people WHERE id = ?";
	var inserts = [req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields){

		if(error){
	        console.log(error)
		    res.write(JSON.stringify(error));
	        res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}


	});
});



app.get('/addRegion', function(req, res, next){
	var context = {};
	var viewstring = "SELECT * FROM region";
	context.jsscripts = ['delete.js'];
	mysql.pool.query(viewstring, function(err, rows, fields){
		if (err) {
			console.log("error : " + err);
		}

		context.region = rows;
		res.render('addRegion', context);
	});
});


app.delete('/addRegion/:id', function(req, res){
	var sql = " DELETE FROM region WHERE id = ?";
	var inserts = [req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields){

		if(error){
	        console.log(error)
		    res.write(JSON.stringify(error));
	        res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}


	});
});


app.get('/region/:id', function(req,res){
	var context = {};
	var sql = "SELECT * FROM region WHERE id=?";
	var inserts = [req.params.id];
	mysql.pool.query(sql, inserts, function(error, rows, fields){

		if(error){
	        console.log(error)
		    res.write(JSON.stringify(error));
	        res.status(400);
			res.end();
		}else{
		
			context.region = rows[0];
			res.render('updateRegion', context);
		}


	});

});


app.post('/region', function(req, res){
	var sql = "UPDATE region SET region_name=? WHERE id=?";
	var inserts = [req.body.rname, req.body.id];
	console.log(inserts);
	mysql.pool.query(sql, inserts, function(error, results, fields){

		if(error){
	        console.log(error)
		    res.write(JSON.stringify(error));
	        res.status(400);
			res.end();
		}else{
			res.redirect('/addRegion');
		}

	});
	

});


app.get('/addEvent', function(req, res, next){
	var context = {};
	var viewstring = "SELECT * FROM event";
	context.jsscripts = ['delete.js'];
	mysql.pool.query(viewstring, function(err, rows, fields) {
		if (err) {
			console.log("error : " + err);
		}
		
		context.event = rows;
		viewstring = "SELECT * FROM region";
		mysql.pool.query(viewstring, function(err, rows, fields) {
		
			context.region = rows;
			viewstring = "SELECT * FROM time_period";
			mysql.pool.query(viewstring, function(err, rows, fields) {
			
				context.time = rows;
				res.render('addEvent', context);
			});
		});
	
	});
});


app.delete('/addEvent/:id', function(req, res){
	var sql = " DELETE FROM event WHERE id = ?";
	var inserts = [req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields){

		if(error){
	        console.log(error)
		    res.write(JSON.stringify(error));
	        res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}


	});
});


app.get('/addCity', function(req, res, next){
	var context = {};
	context.jsscripts = ['delete.js'];
	var viewstring = "SELECT * FROM cities";
	mysql.pool.query(viewstring, function(err, rows, fields){
		if (err) {
			console.log("error : " + err);
		}

		context.city = rows;
		viewstring = "SELECT * FROM region";
		mysql.pool.query(viewstring, function(err, rows, fields){
			context.region = rows;
			res.render('addCity', context);
		});

	
	});
});

app.delete('/addCity/:id', function(req, res){
	var sql = " DELETE FROM cities WHERE id = ?";
	var inserts = [req.params.id];
	mysql.pool.query(sql, inserts, function(error, results, fields){

		if(error){
	        console.log(error)
		    res.write(JSON.stringify(error));
	        res.status(400);
			res.end();
		}else{
			res.status(202).end();
		}


	});
});

/* SEARCH
 *
 *
 *
 * */
app.get('/search', function(req, res, next){
	res.render('search');
});

app.post('/search', function(req, res, next){
	var lookup = "SELECT * FROM people WHERE first_name = '" + req.body.search + "'";
	var context = {};
	mysql.pool.query(lookup, function(err, rows, fields){
		if (err) {
			console.log("error: " + err);
		}
		context.search = rows;
		res.render('search', context);
	});
});

/* INSERTS 
 *
 *
 * */

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
