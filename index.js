
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId; 
const dbConnect = require('./db')
const app = express()
let db;


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use(express.static('./'))

app.use("/data",async(req,res,next)=>{
    const users = db.collection('users')
    await users.insert({...req.body})
    res.sendFile(path.resolve(__dirname,'index.html'))
})

app.use("/users",async(req,res,next)=>{
    const users = db.collection('users')
    await users.find({}).toArray((err,result)=>{
        if(result.length>0){
           return res.render(path.resolve(__dirname,'users.ejs'),{data:result})
        }
        else{
            return res.render(path.resolve(__dirname,'users.ejs'),{data:{}})
        }
    })
})

app.use("/delete/:id",async(req,res,next)=>{
    let mongoId = req.params.id
    console.log(mongoId)
    const users = db.collection('users')
    await users.deleteOne({"_id":ObjectId(mongoId.trim())})
    res.redirect("/users")
})

app.use("/",(req,res,next)=>{
    res.sendFile(path.resolve(__dirname,'index.html'))
})




app.listen(3000,async()=>{
    try{
        const client = await dbConnect()
        await client.db().createCollection('users')
        db = client.db()
        console.log("Connected to Node.js application.....")
    }
    catch(e){
        console.log("failed to connect......")
    }
})