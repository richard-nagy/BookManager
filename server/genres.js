module.exports = function (app, db, time) {
    // Select everything from the table
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

    // Insert new genre
    app.post("/genresUpload", (req, res) => {
        console.log(req.body.data.genre);
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
};
