const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "bookmanager",
});

// Select everything from the books table
app.get("/books", (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("------------->");
            console.log("Succesful select!");
            res.send(result);
        }
    });
});

// Update selected row
app.put("/update", (req, res) => {
    const value = req.body.value;
    const title = value.title;
    const author = value.author;
    const genreID = value.genreID;
    const publisherID = value.publisherID;
    const id = value.id;
    db.query(
        "UPDATE books SET title = ?, author = ?, genreID = ?, publisherID = ? WHERE id = ?",
        [title, author, genreID, publisherID, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("------------->");
                console.log("Succesful update!");
                console.log(value);
                res.send();
            }
        }
    );
});

app.listen(3001, () => {
    console.log("------------->");
    console.log("Your server is running on port 3001...");
});
