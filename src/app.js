const express = require("express");
const path = require("path");
const app = express();
const hbs=require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const {json} =require("express");

const port = process.env.PORT || 19999;

const static_path = path.join(__dirname,"../public");
const template_path =  path.join(__dirname,"../templates/views");
const partials_path =  path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);

hbs.registerPartials(partials_path);

app.get("/",(req,res)=> {
    //res.send("hello everyone")
    res.render("index")

});
app.get("/contact",(req,res)=> {
    //res.send("hello everyone")
    res.render("contact")

});
app.get("/login",(req,res)=> {
    //res.send("hello everyone")
    res.render("login")

});
app.get("/registration",(req,res)=> {
    //res.send("hello everyone")
    res.render("registration")

});

app.post("/registration",async(req,res) => {
   // res.render("register");
   try{
       //here registration is the name of collection of db
       const password = req.body.password;
       const cpassword=req.body.cpassword;
       if(password===cpassword){
           const customerRegister = new Register({
              name : req.body.name,
              phone : req.body.phone,
              gender : req.body.gender,
              email : req.body.email,
              password : req.body.password,
              room : req.body.room,
              cpassword :req.body.cpassword
     })
     const registered = await customerRegister.save();
     res.status(201).render("index");
    }else{
        res.send("password is not matching")
    }


   } catch(error){
       res.status(400).send(error);
   }
});

//login check with async function always use try catch with asyn
app.post("/login" , async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("index");
        }else{
            res.send("invalid login id or password");
        }
    }catch(error) {
        res.status(400).send("invalid id")
    }
})


app.listen(port,  () => {
    console.log("server is running at port no ${port} ");
})