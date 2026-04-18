const express = require("express")
const app = express()
const path = require("path")
const mysql = require("mysql2")
const swaggerUi = require("swagger-ui-express")
const YAML = require("yaml")
const fs = require("fs")
const cors = require("cors")


app.use(cors())
app.use(express.json())
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
        function(rr,results){
            if(reseults.length > 0){

              res.json(results[0])
        }
            else{
        
                res.status(404).json({message:"data not found"})
            }
            }

        

     )

  
}
)
app.post("/data",(req,res)=>{
    const {id,name, price} = req.body
  connection.query("INSERT INTO stock (id , name, price) VALUES (?, ?, ?)", [id, name, price],  
  (err, results) => {
    if(err){
        res.status(500).json({message:"error inserting data"})
    }
    else{
        res.status(201).json({message:"data inserted successfully", id: results.insertId})
    }

  }
  )
})

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3000, () => {
    console.log("server is running on port 3000")
})