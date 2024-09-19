var jwt = require('jsonwebtoken');
var express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); 

var app = express();
app.use(express.json());

// Middleware for token validation for all `/api/` routes
app.use('/api/', (req, res, next) => {
    let { token } = req.headers;
    if (!token) {
        return res.status(401).json({ "msg": "Please send the token" });
    }

    try {
        jwt.verify(token, 'SECRET');
        next();
    } catch (err) {
        return res.status(403).json({ "msg": "Invalid token" });
    }
});

// Enable cross-origin requests (CORS)
var cors = require("cors");
const fileUpload = require('express-fileupload');
app.use(cors());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// Main database
const ex = "job_portal";

// URL of the MongoDB database
const url = 'mongodb+srv://anuj123:jangiranuj2000@cluster0.qq2p4.mongodb.net';
const client = new MongoClient(url);

// Creating job data using req.body
app.post("/createjob", async (req, res) => {
    let { email, password } = req.body;
    let data = { email, password };

    try {
        await client.connect();
        let db = client.db(ex);
        await db.collection('jobs').insertOne(data);
        res.status(200).json({ "message": "Job Created" });
    } catch (err) {
        res.status(500).json({ "message": "Failed to create job", "error": err });
    } finally {
        await client.close();
    }
});

// Listing all job details from MongoDB
app.get("/getjob", async (req, res) => {
    try {
        await client.connect();
        let db = client.db(ex);
        let list = await db.collection('jobs').find({}).toArray();
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ "message": "Failed to retrieve jobs", "error": err });
    } finally {
        await client.close();
    }
});

// Get job by email (within /api/ routes, protected by token middleware)
app.get("/api/list_job", async (req, res) => {
    let { email } = req.query;

    try {
        await client.connect();
        let db = client.db(ex);
        let list = await db.collection('jobs').find({ email }).toArray();
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json({ "message": "Failed to retrieve job by email", "error": err });
    } finally {
        await client.close();
    }
});

// Checking login details of job in the database
app.post("/joblogin", async (req, res) => {
    let { email, password } = req.body;

    try {
        await client.connect();
        let db = client.db(ex);
        let list = await db.collection('jobs').find({ email, password }).toArray();

        if (list.length > 0) {
            var token = jwt.sign({ "name": list[0]['name'] }, 'SECRET');
            res.json({ "msg": "Login successful", "token": token });
        } else {
            res.json({ "msg": "Email or password is incorrect" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Login failed", "error": err });
    } finally {
        await client.close();
    }
});

// Delete job by ID
app.delete("/deletejobbyname", async (req, res) => {
    let { id } = req.query;

    try {
        await client.connect();
        let db = client.db(ex);
        await db.collection("jobs").deleteOne({ "_id": new ObjectId(id) });
        res.json({ "msg": "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ "msg": "Failed to delete job", "error": err });
    } finally {
        await client.close();
    }
});

// Update job by email
app.put("/updatejobbyname", async (req, res) => {
    let { email, password } = req.query;

    try {
        await client.connect();
        let db = client.db(ex);
        await db.collection("jobs").updateOne({ email }, {
            $set: { password }
        });
        res.json({ "message": "Data updated successfully" });
    } catch (err) {
        res.status(500).json({ "msg": "Failed to update job", "error": err });
    } finally {
        await client.close();
    }
});

// Update job by ID using post method
app.post('/updatejob', async (req, res) => {
    let { id, email } = req.body;

    try {
        await client.connect();
        let db = client.db(ex);
        await db.collection("jobs").updateOne({ "_id": new ObjectId(id) }, {
            $set: { email }
        });
        res.json({ "message": "Updated successfully" });
    } catch (err) {
        res.status(500).json({ "msg": "Failed to update job", "error": err });
    } finally {
        await client.close();
    }
});

// Get job by ID using query parameters
app.get('/updatejobusingget', async (req, res) => {
    let { id } = req.query;

    try {
        await client.connect();
        let db = client.db(ex);
        let data = await db.collection("jobs").find({ "_id": new ObjectId(id) }).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).json({ "msg": "Failed to retrieve job", "error": err });
    } finally {
        await client.close();
    }
});

// File upload method
app.post('/upload', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.img;
    let uploadPath = __dirname + '/uploads/' + file.name;

    file.mv(uploadPath, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded successfully.');
    });
});

// Start the Express server 
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
