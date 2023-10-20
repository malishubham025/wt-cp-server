// const express=require("express");
// const app=express();
// const mongoose=require('mongoose');
// const cors=require('cors');
// const bodyParser=require('body-parser');

// app.use(cors());
// app.use(bodyParser.json());
// mongoose.connect("mongodb://127.0.0.1:27017/wt_cp")
// const Schema=new mongoose.Schema({
//     _id:Number,
//     info:String
// })
// const project=mongoose.model("project",Schema);

// // const entry=new project({
// // _id:7,
// // info:"lorem"
// // })
// // // entry.save();
// function Numbers(x){
//     return new Promise((resolve,reject)=>{
//         var numbers=[];
//         while(numbers.length<6){
//             var rn=Math.floor(Math.random()*(x+1));
//             if(numbers.indexOf(rn)<0){
//                 numbers.push(rn);
//             }
//             console.log(numbers);
//         }
//         resolve(numbers);
//     })
// }
// app.get("/",function(req,res){
//     // var a=Math.floor(Math.random()*10);
//     // console.log(a);
//     var numbers=[];
//     project.find().then((res1)=>{
//         // console.log(res1.length);
//         // console.log(res1);
//         console.log("hello");
//         Numbers(10).then((numbers)=>{
                
//             console.log(numbers);
//         })
//         res.json(res1);
//     }).catch((err)=>{
//         console.log(err);
//     })
    

// })
// app.post("/",function(req,res){
//     console.log(req.body);
    
// })

// app.listen(4500,function(){
//     console.log("running");
// })
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
mongoose.connect("mongodb://127.0.0.1:27017/wt_cp");
app.use(cors());
app.use(bodyParser.json());
const Schema=new mongoose.Schema({
    _id:Number,
    info:String
})
const model=mongoose.model("project",Schema);
const SignUPSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const model2=mongoose.model("signup",SignUPSchema);
app.get("/",(req,res)=>{
    var result;
    model.find().then((data)=>{
        result=data;
        res.send(result);
    }).catch((err)=>{
        result=err;
    })
    
    // console.log(result);

})
app.post("/",(req,res)=>{
    var email1=req.body.email;
    model2.find({email:email1}).then((data)=>{
        if(data.length>0){
            res.status(409).send("Email Exist !");
        }
        else{
            // model2.insertOne({
            //     username:req.username,
            //     email:req.email,
            //     password:req.password
            // }).then(()=>{
            //     res.send("SignUp has done Successfully !");
            // },()=>{
            //     res.send("error occured !");
            // })
            const user= new model2({
                username:req.body.username,
                email:req.body.email,
                password:req.body.pass
            })
            user.save().then(()=>{
                res.send("Success!");
            }).catch(()=>{
                res.send("error occured!");
            })

        }
    })
    // if()
})

app.post("/login",(req,res)=>{
    var email1=req.body.email;
    var password1=req.body.password;
    // console.log(email1,password1);
    model2.find({email:email1,password:password1}).then((data)=>{
        if(data.length>0){
           res.send("success");
        }
        else{
           res.status(409).send("no");
        }
    })
    // res.send("hello");
    // console.log("hello");
})
app.listen(4000,function(){
    console.log("running");
})