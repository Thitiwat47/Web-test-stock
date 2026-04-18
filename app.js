const express = require("express")
const app = express()
const path = require("path")


const stock = [{
    "AAPL": 150.25,
    "GOOGL": 2800.50,
    "AMZN": 3400.75
}];




app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
});


app.listen(3000, () => {
    console.log("server is running on port 3000")
})