/*===============================================================================

                    MYSQL VARIABLE CONNECTION REQUIRE
                            
================================================================================*/
const util = require("util");
const mysql = require("mysql");

/*===============================================================================

                      REQUEST CONNECTION TO MYSQL
                            
================================================================================*/
// Connection Properties w/in an object to easily communicate a to promise mysql
let connection = mysql.createConnection({
  //you can execute queries with multiple statements by 
  //separating each statement with a semi- colon ;
  //Result will be an array for each statement.
  multipleStatements: true,
  // HOST
  host: "localhost",
  // PORT
  port: 3306,
  // USERNAME
  user: "root",
  // PASSWORD
  password: "root",
  // MYSQL DATABASE
  database: "employee"
});

/*===============================================================================

                    Establish Connection with MySQL
                            
================================================================================*/
  // connect to the mysql
  connection.connect(function (err) {
    if (err) throw err;
    // Run a function that connection establishment is made to prompt
    start();
  });

/*===============================================================================

//        Setting up connection.query to use promises instead of callbacks
//              This allows us to use the async/await syntax
                            
================================================================================*/
connection.query = util.promisify(connection.query);


module.exports = connection;