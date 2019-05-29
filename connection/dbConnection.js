var mysql = require('mysql');


var con = mysql.createConnection({
  host: "128.199.179.97",
  user: "carry",
  password: "015320147ton",
  database: "carry_trade"
});



con.connect(function(err) {
  if (err) throw err;
  console.log(con.state)
});

module.exports = con;
