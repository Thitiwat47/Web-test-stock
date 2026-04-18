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
    connection.query("SELECT * FROM stock", 
        (err, results) => {
            res.json(results)
        
    });
});

app.get("/data/:id",(req,res)=>{
    id = req.params.id
    connection.query("SELECT * FROM stock WHERE id=?",
        [id],
        function(err,results){
            if(results.length > 0){

              res.json(results[0])
        }
            else{
        
                res.status(404).json({message:"data not found"})
            }
            }

        

     )

  
}
)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
    console.log("server is running on port 3000")
})