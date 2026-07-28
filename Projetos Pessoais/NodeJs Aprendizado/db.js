const sqlite = require('sqlite3');

const db = new sqlite.Database('./databases/local_db.db', (err) => {
    if (err) {
        console.log(err);
        return
    }

    console.log('Connected to database');
});

db.exec(`DROP TABLE IF EXISTS users`);

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    )`);

db.exec(`INSERT INTO users (name) VALUES ('Corno'),('VAPO')`);

async function query(query) {
    await db.exec(query, (err) => {
        if (err) {
            return console.log('Query error : ',err);
        }
    });
}

async function fetch(query) {
    db.all(query, (err, row) => {
        if (err) {
            return console.log('Fetch error : ', err);
        }

        console.log(row);
    })
}

module.exports = [
    db,
    query,
    ];