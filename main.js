var express= require("express");
var app=express()
app.get("/myname",(req,res)=>{
    res.json({"name":"Anuj"})
})

app.post("/myname",(req,res)=>{
    res.json({"name":"Anuj"})
})
app.post("/login",(req,res)=>{
    let {email,password} = req['query'];
   
    if(email =='jangiranuj8@gmail.com' && password =='admin'){
        res.json({"msg":"you are correct"})
    }else{
    }
    console.log(email,pwd);
    res.json({"msg":"you are wrong"})
})
app.listen(8080,()=>{
    console.log("server started")
});