const db = require('./config/connection');
const Database = require('./util/database');


db.connect(err => {
  // if there is an error with startup then throw err
  if (err) throw err;
  // start new instance of database class
  let database = new Database();

  // return data base init to start the program.
  return database.init();
 
});
