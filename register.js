var express = require("express")
var app = express();
app.use(express.json());

app.post("/login",(req,res)=>{

    let name = req["query"]["name"]
    let email = req["query"]["email"];
    let pwd = req["query"]["password"]
    let address = req["query"]["address"]
    if(name == "anuj" && email == "jangiranuj8@gmail.com" && pwd == "admin" && address == "chennai"){
        res.json({"msg":"you are correct"})
    }else{
        res.json({"msg":"you are wrong"})
    }
    
})


app.listen(8080,()=>{
    console.log("server strated")
})