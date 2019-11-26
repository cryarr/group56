var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit  : 10,
	host			 : 'classmysql.engr.oregonstate.edu',
	user 		     : 'cs340_cryarr',
	password 		 : '***',
	database 		 : 'cs340_cryarr'

});

module.exports.pool = pool;

function getRegion(res, mysql){
        mysql.pool.query("SELECT * FROM region", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
      }
    )};
