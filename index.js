const express=require("express");
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/wt_cp")
const Schema=new mongoose.Schema({
    _id:Number,
    info:String
})
const project=mongoose.model("project",Schema);

// const entry=new project({
// _id:7,
// info:"lorem"
// })
// // entry.save();
app.get("/",function(req,res){
    
    project.find().then((res1)=>{
        console.log(res1);
        res.json(res1);
    }).catch((err)=>{
        console.log(err);
    })
})
app.post("/",function(req,res){
    console.log(req.body);
    
})

app.listen(4500,function(){
    console.log("running");
})