var jwt = require('jsonwebtoken');
var express = require('express');
    // It is used to create new instances of Object IDs that are used as unique identifiers for documents in a MongoDB database.
    /*  allows you to connect to a MongoDB database and perform operations such as inserting, updating, deleting, and querying
    documents in the database.is used to establish a connection to a MongoDB database hosted on MongoDB Atlas. */
    const { MongoClient, ObjectId } = require('mongodb');

    var app = express();
    app.use(express.json());
    app.use((req,res,next)=>{
        let{token}= req.headers;
        if(token == "" || token == undefined){
            res.json({"msg":"pls send the token"})
        }else{
            next();
        }
    });

    /* The code const cors = require('cors'); app.use(cors()); is implementing Cross-Origin Resource
    Sharing (CORS) in the Express application. */
    const cors = require('cors');
    app.use(cors());

    // main database
    const ex = "job_portal"

    // url of the database
    const url = 'mongodb+srv://anuj123:jangiranuj2000@cluster0.qq2p4.mongodb.net/';
    const client = new MongoClient(url);

    // creating employee data using req.body
    app.post("/createjob", async (req, res) => {
        let { name, email, password, mobile_no } = req.body;
        let data = {
            "name": name,
            "email": email,
            "password": password,
            "mobile_no": mobile_no,
        }
        console.log(data);
        console.log(req.body);

        // use to connect to the server        
        try {
            await client.connect();
            let db = client.db(ex);
            await db.collection('jobs').insertOne(data);
            res.status(200).json({ "message": "Job Created" })
        } catch (e) {
            console.log(e)
        }
    })

    // checking for login details of employee from database (2 condition) using req.body() for secure information
    // postman => body => raw
    // Type the email and password in postman(json format) in post method then send
    // so it check both condition if it matches the information to the database it fetch the data from database and list in postman
    app.post("/joblogin", async (req, res) => {
        await client.connect();
        let { email, password } = req.body; // postman url
        let db = client.db(ex);
        let list = await db.collection('jobs').find({ "email": email, "password": password }).toArray();

        if (list.length > 0) {
            //res.json({"msg":"You are correct"})
            //res.status(200).json(list)
            res.status(200).json({
                "msg": "Login successful,correct details",
                "data": list
            });
        } else {
            res.json({ "msg": "Email or password is incorrect" })
        }

    })

    // Using post method
    app.post('/updatejob', async (req, res) => {
        let { name, password } = req.body;
        await client.connect();
        let db = client.db(ex);
        await db.collection("jobs").updateOne({ "name": name }, {
            $set: { "password": password }
        });
        res.json({ "message": "Password updated successfully" });
    })

    // for listing all Job details from mongoDB(Database)
    app.get("/api/list_job", async (req, res) => {
        await client.connect();
        let db = client.db(ex);
        let list = await db.collection('jobs').find({}).toArray();
        res.status(200).json(list)
    });

    // for getting specific employee details from mongoDB(Database)
    app.get("/listjobbyname/:name", async (req, res) => {   // "/listempbyname/:name" => path variable
        await client.connect();
        let { name } = req.params; // postman url
        let db = client.db(ex);
        let list = await db.collection('jobs').find({ name: name }).toArray(); //find({name:name}) => mongodb 
        res.status(200).json(list)
    })

    app.get('/updatejobusingget', async (req, res) => {
        let { id } = req.query;
        await client.connect();
        let db = client.db(ex);
        // we should import Objectid [const { MongoClient, ObjectId } = require('mongodb');] 
        // This code getting data from mongodb using the objectid() new is a keyword
        let data = await db.collection("jobs").find({ "_id": new ObjectId(id) }).toArray();
        res.json(data)
    })

    app.put("/updatejobbyname", async (req, res) => {
        let { name, password } = req.query;
        await client.connect();
        let db = client.db(ex);
        await db.collection("jobs").updateOne({ "name": name }, {
            $set: { "password": password }
        });
        res.json({ "msg": "Data updated successfully" })
    });

    app.delete("/deletejobbyname", async (req, res) => {
        let { name } = req.query;
        await client.connect();
        let db = client.db(ex);
        await db.collection("jobs").deleteOne({ "name": name })
        res.json({ "msg": "user deleted" })
    })
    app.post("/login", async (req,res)=>{
        let{email,password}= req.body;
        //add db connection details
        let db = client.db(ex);
        let loginRes = await db.collection("jobs").find({"email":email,"password":password}).toArray();
        console.log(loginRes);

        if(loginRes.length > 0){
            var token = jwt.sign({'name':loginRes[0]['name']},' SECRET');
            res.json({"msg":"u are correct","token":token});
        }else{
            res.json({"msg":"u are wrong"});
        }
    });

    app.delete('/delete_id', async (req, res) => {
        let { id } = req.body;
        console.log(id);
        await client.connect();
        let db = client.db(ex);
        await db.collection("jobs").deleteOne({ "_id": new ObjectId(id) });
        res.json({ "msg": "Deleted using Id!" });

    });

    // Start the Express server 
    app.listen(8080, () => {
        console.log("Server is running on port 8080");
    });

    // req.body => sending the details to server (secure) (json format)
    // path variable => contain the data in the url so it's not secure (url format)
