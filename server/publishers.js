module.exports = function (app, db, time) {
    // Select everything from the publishers table
    app.get("/publishersSelect", (req, res) => {
        db.query("SELECT * FROM publishers", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`${time} Succesful SELECT from publishers table!`);
                res.send(result);
            }
        });
    });

    // Update publisher
    app.put("/publishersUpdate", (req, res) => {
        db.query(
            "UPDATE publishers SET publisher = ? WHERE id = ?",
            [req.body.value.publisher, req.body.value.id],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        `${time} Succesful UPDATE in publishers table!`
                    );
                    res.send();
                }
            }
        );
    });

    // Insert new publisher
    app.post("/publishersUpload", (req, res) => {
        db.query(
            `INSERT INTO publishers (publisher) VALUES (?)`,
            [req.body.data.publisher],
            (err, result) => {
                if (err) {
                    console.log(error);
                } else {
                    console.log(
                        `${time} Succesful INSERT in publishers table!`
                    );
                    res.send(result);
                }
            }
        );
    });

    // Delete publisher
    app.delete("/publishersDelete", (req, res) => {
        db.query(
            "DELETE FROM publishers WHERE id = ?",
            [req.body.row],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(
                        `${time} Succesful DELETE in publishers table, ID: ${req.body.row}`
                    );
                    res.send();
                }
            }
        );
    });
};
