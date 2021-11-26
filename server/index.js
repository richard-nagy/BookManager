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
    // db.query("SELECT * FROM books", (err, result) => {
    db.query(
        "SELECT books.id, books.title, books.author, genres.genre, publishers.publisher FROM bookmanager.books " +
            "INNER JOIN genres " +
            "ON books.genreID = genres.id " +
            "INNER JOIN publishers " +
            "ON books.publisherID = publishers.id",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("------------->");
                console.log("Succesful select!");
                res.send(result);
            }
        }
    );
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

// Post new data
app.post("/upload", (req, res) => {
    db.query(
        "INSERT INTO books (title, author, genreID, publisherID) VALUES (?, ?, ?, ?)",
        [
            req.body.data.title,
            req.body.data.author,
            req.body.data.genreID,
            req.body.data.publisherID,
        ],
        (err, result) => {
            if (err) {
                // console.log(err);
                console.log(req.body);
            } else {
                console.log("------------->");
                console.log("Succesful upload!");
                res.send();
            }
        }
    );
});

// Delete selected row
app.delete("/delete", (req, res) => {
    db.query("DELETE FROM books WHERE id = ?", [req.body.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("------------->");
            console.log("Succesful delete!");
            res.send();
        }
    });
});

// Select everything from the books table
app.get("/publishers", (req, res) => {
    db.query("SELECT * FROM publishers", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("------------->");
            console.log("Succesful select from publishers!");
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("------------->");
    console.log("Your server is running on port 3001...");
});
