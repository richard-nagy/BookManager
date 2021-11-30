module.exports = function (app, db, time) {
    // Select everything from the table
    app.get("/booksSelect", (req, res) => {
        db.query(
            "SELECT books.id, books.title, books.author, genres.genre, publishers.publisher FROM bookmanager.books " +
                "INNER JOIN genres ON books.genreID = genres.id " +
                "INNER JOIN publishers ON books.publisherID = publishers.id",
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${time} Succesful SELECT from books table!`);
                    res.send(result);
                }
            }
        );
    });

    // Update row
    app.put("/booksUpdate", (req, res) => {
        db.query(
            "UPDATE books SET title = ?, author = ?, genreID = ?, publisherID = ? WHERE id = ?",
            [
                req.body.value.title,
                req.body.value.author,
                req.body.value.genreID,
                req.body.value.publisherID,
                req.body.value.id,
            ],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${time} Succesful UPDATE in books table!`);
                    res.send();
                }
            }
        );
    });

    // Insert new row
    app.post("/booksUpload", (req, res) => {
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
                    console.log(error);
                } else {
                    console.log(`${time} Succesful INSERT in books table!`);
                    res.send(result);
                }
            }
        );
    });

    // Delete row
    app.delete("/booksDelete", (req, res) => {
        db.query(
            "DELETE FROM books WHERE id = ?",
            [req.body.row],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        `${time} Succesful DELETE in books table, ID: ${req.body.row}`
                    );
                    res.send();
                }
            }
        );
    });
};
