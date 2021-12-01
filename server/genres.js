module.exports = function (app, db, time) {
    // Select everything from the genres table
    app.get("/genresSelect", (req, res) => {
        db.query("SELECT * FROM genres", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`${time} Succesful SELECT from genres table!`);
                res.send(result);
            }
        });
    });

    // Update genre
    app.put("/genresUpdate", (req, res) => {
        db.query(
            "UPDATE genres SET genre = ? WHERE id = ?",
            [req.body.value.genre, req.body.value.id],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`${time} Succesful UPDATE in genres table!`);
                    res.send();
                }
            }
        );
    });

    // Insert new genre
    app.post("/genresUpload", (req, res) => {
        db.query(
            `INSERT INTO genres (genre) VALUES (?)`,
            [req.body.data.genre],
            (err, result) => {
                if (err) {
                    console.log(error);
                } else {
                    console.log(`${time} Succesful INSERT in genres table!`);
                    res.send(result);
                }
            }
        );
    });

    // Delete genre
    app.delete("/genresDelete", (req, res) => {
        db.query(
            "DELETE FROM genres WHERE id = ?",
            [req.body.row],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        `${time} Succesful DELETE in genres table, ID: ${req.body.row}`
                    );
                    res.send();
                }
            }
        );
    });
};
