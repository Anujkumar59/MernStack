var express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); 
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());
// main database
const ex = "job_portal"
// url of the database
const url = 'mongodb+srv://anuj123:jangiranuj2000@cluster0.qq2p4.mongodb.net/';
const client = new MongoClient(url);
// creating employee data using req.body
app.post("/createjob",async(req,res)=>{
    let {name,email,password,mobile_no} = req.body;
    let data = {
        "name" : name,
        "email" :  email,
        "password" : password,
        "mobile_no" : mobile_no,
    }
    // use to connect to the server        
    await client.connect();
    let db = client.db(ex);
    await db.collection('job1').insertOne(data);
    res.status(200).json({"message":"Job Created"})
})

// for listing all Job details from mongoDB(Database)
app.get("/getjob",async(req,res)=>{
    await client.connect();
    let db = client.db(ex);
    let list = await db.collection('job1').find({}).toArray();
    res.status(200).json(list)
});

// for getting specific employee details from mongoDB(Database)
// http://localhost:3000/listjobbyname/
app.get("/listjobbyname/:name",async(req,res)=>{   // "/listempbyname/:name" => path variable
    await client.connect();
    let {name} = req.params; // postman url
    let db = client.db(ex);
    let list = await db.collection('job1').find({name:name}).toArray(); //find({name:name}) => mongodb 
    res.status(200).json(list)
})

// checking for login details of employee from database (2 condition) using req.body() for secure information
// postman => body => raw
// Type the email and password in postman(json format) in post method then send
// so it check both condition if it matches the information to the database it fetch the data from database and list in postman
app.post("/joblogin",async(req,res)=>{
    await client.connect();
    let { email, password } = req.body; // postman url
    let db = client.db(ex);
    let list = await db.collection('job1').find({"email":email,"password":password}).toArray();

    if(list.length > 0){
        //res.json({"msg":"You are correct"})
        //res.status(200).json(list)
        res.status(200).json({
            "msg": "Login successful,correct details",
            "data": list
        });
    }else{
        res.json({"msg":"Email or password is incorrect"})
    }
    
})

app.delete("/deletejobbyname",async(req,res)=>{
    let {name} = req.query;
    await client.connect();
    let db = client.db(ex);
    await db.collection("job1").deleteOne({"name":name})
    res.json({"msg":"user deleted"})
})

app.put("/updatejobbyname",async(req,res)=>{
    let {name,password} = req.query;
    await client.connect();
    let db = client.db(ex);
    await db.collection("job1").updateOne({"name":name},{
        $set: {"password":password}
        });
    res.json({"message":"Data updated successfully"})
});

// Using post method
app.post('/updatejob',async(req,res)=>{
    let{name,password} = req.body;
    await client.connect();
    let db = client.db(ex);
    await db.collection("job1").updateOne({"name":name},{
        $set:{"password":password}
    });
    res.json({"message":"Password updated successfully"});
})

app.get('/updatejobusingget',async(req,res)=>{
    let{id} = req.query;
    await client.connect();
    let db = client.db(ex);
    // we should import Objectid [const { MongoClient, ObjectId } = require('mongodb');] 
    // This code getting data from mongodb using the objectid() new is a keyword
    let data = await db.collection("job1").find({"_id":new ObjectId(id)}).toArray();
    res.json(data)
})

// Start the Express server 
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

// req.body => sending the details to server (secure) (json format)
// path variable => contain the data in the url so it's not secure (url format)
