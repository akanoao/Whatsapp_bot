const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("files\\msgs.sqlite", (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

let datas = ["daksh","hi"];
// let placeholders = datas.map((data) => '(?)').join(',');
let insert_sql = "INSERT INTO messages(Name,msg) VALUES (?, ?)";

db.serialize(() => {
// Queries scheduled here will be serialized.
    db.run('CREATE TABLE IF NOT EXISTS messages(Name text NOT NULL,msg text)')
    .run(insert_sql, datas, function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          })
});


db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});