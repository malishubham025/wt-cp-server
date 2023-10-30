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
const schema3=mongoose.Schema({
    username:String,
    password:String
})
const Admin=new mongoose.model("admin",schema3);

app.post("/loginAdmin",(req,res)=>{

    
    let username1=req.body.username;
    let password1=req.body.password;
    console.log(username1,password1);
    Admin.find({username:username1,password:password1}).then((data)=>{
        console.log(data);
        if(data.length>0)
        {
            res.send("admin found");
        }
        else{
            res.status(409).send("error");
        }
    })
    // // console.log(email1,password1);
    // model2.find({email:email1,password:password1}).then((data)=>{
    //     if(data.length>0){
    //        res.send("success");
    //     }
    //     else{
    //        res.status(409).send("no");
    //     }
    // })
    // // res.send("hello");
    // // console.log("hello");
})
const volunteers=new mongoose.Schema({
    _id:Number,
    name:String,
    age:Number,
    mobile:String,
    gmail:String
})
const vmodel=mongoose.model("volunteer",volunteers);
app.get("/volunteers",function(req,res){
//    vmodel.insertMany([
//     {_id:1,name:"shubham mali",age:13,mobile:"9405623051",gmail:"malishubham025@gmail.com"}
//    ,{_id:2,name:"shubham more",age:20,mobile:"8215323051",gmail:"shuhbam.more21@vit.edu"}
//    ,{_id:3,name:"sahil mandhare",age:34,mobile:"834048848",gmail:"sahil.mandhare21@vit.edu"}
//    ,{_id:4,name:"atharv mali ",age:54,mobile:"834048848",gmail:"atharv.mali21@vit.edu"}
//     ])
vmodel.find().then((res1)=>{
    res.send(res1);
}).catch((err)=>{
    console.log(err);
})
})
const organizations = new mongoose.Schema({
    _id: Number,
    name: String,
    delivery_date: Date, // Use a Date type for delivery_date
    Contact: String,
    gmail: String,
    price: Number
});

const omodel = mongoose.model("organization", organizations); // Change the model name to "organization"

app.get("/organizations", function (req, res) {
    // omodel.insertMany([
    //     {
    //         _id: 1,
    //         name: "Humane Society",
    //         delivery_date: new Date("2023-11-10"), // Different delivery date
    //         Contact: "9405623051",
    //         gmail: "Society@gmail.com",
    //         price: 100
    //     },
    //     {
    //         _id: 2,
    //         name: "Global Giving",
    //         delivery_date: new Date("2023-11-15"), // Different delivery date
    //         Contact: "8215323051",
    //         gmail: "Global@gmail.com",
    //         price: 200
    //     },
    //     {
    //         _id: 3,
    //         name: "Show of Empathy",
    //         delivery_date: new Date("2023-11-20"), // Different delivery date
    //         Contact: "834048848",
    //         gmail: "Empathy@gmail.com",
    //         price: 150
    //     },
    //     {
    //         _id: 4,
    //         name: "World Medical Relief",
    //         delivery_date: new Date("2023-11-25"), // Different delivery date
    //         Contact: "834048848",
    //         gmail: "World@gmail.com",
    //         price: 300
    //     }
    // ])
        
            // After inserting the data, find and send the results
            omodel.find().then((res1) => {
                res.send(res1);
            }).catch((err) => {
                console.log(err);
                res.status(500).send("Internal Server Error");
            });
        

});

app.listen(4000,function(){
    console.log("running");
})