// Set up MySQL connection.

const sequelize = require("sequelize");


if (process.env.JAWSDB_URL) {
	var connection = sequelize.createConnection(process.env.JAWSDB_URL);
} else {
  var connection = sequelize.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "userInfo"
});
}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
