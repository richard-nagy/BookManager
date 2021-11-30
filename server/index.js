const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const minutes = new Date().getMinutes();
const time = `[${new Date().getHours()}:${
    minutes < 10 ? "0" + minutes : minutes
}]`;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "bookmanager",
});

require("./books.js")(app, db, time);
require("./genres.js")(app, db, time);
require("./publishers.js")(app, db, time);

app.listen(3001, () => {
    console.log(`${time} Your server is running on port 3001...`);
});
