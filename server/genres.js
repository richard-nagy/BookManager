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
};
