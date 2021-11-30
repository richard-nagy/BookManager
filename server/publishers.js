module.exports = function (app, db, time) {
    // Select everything from the table
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
};
