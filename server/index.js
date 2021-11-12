const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
    console.log("Your server is running on port 3001...");
});
