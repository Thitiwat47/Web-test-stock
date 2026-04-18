const express = require("express")
const app = express()
const path = require("path")
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "stock"

})




app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/data", (req, res) => {
    connection.query("SELECT * FROM stock", (err, results) => {
        if (err) {
            console.error("Error fetching data from database:", err);
            res.status(500).json({ error: "Error fetching data from database" });
        } else {
            res.json(results);
        }
    });
});

app.listen(3000, () => {
    console.log("server is running on port 3000")
})