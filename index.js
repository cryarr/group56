var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit  : 10,
	host			 : 'classmysql.engr.oregonstate.edu',
	user 		     : 'cs340_cryarr',
	password 		 : '3448',
	database 		 : 'cs340_cryarr'

});

module.exports.pool = pool;
