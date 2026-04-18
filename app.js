const express = require("express")
const app = express()
const path = require("path")




app.get("/",(req, res) =>{
    res.sendFile(path.join(__dirname, "index.html"))
});


stock = {
    "AAPL": 150.25,
    "GOOGL": 2800.50,
    "AMZN": 3400.75
}
app.get("/stock",(req, res) =>{
    const stockPrice = Math.random() * 1000;
    res.send(`Stock Price: $${stockPrice.toFixed(2)}`);
});
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})