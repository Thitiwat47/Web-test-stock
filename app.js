const express = require("express")
const app = express()
const path = require("path")
const mysql = require("mysql2")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yaml")
const fs = require("fs")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "stock"

})

const swaggerDocument = YAML.parse(fs.readFileSync(path.join(__dirname, "swagger.yaml"), "utf8"));



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

app.post("/update", (req, res) => {
    const { name, price } = req.query;
    connection.query("INSERT INTO stock (name, price) VALUES (?, ?)", [name, price], (err, results) => {
        if (err) {
            console.error("Error updating data in database:", err);
            res.status(500).json({ error: "Error updating data in database" });
        } else {
            res.json({ message: "Stock updated successfully" });
        }
    });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
    console.log("server is running on port 3000")
})