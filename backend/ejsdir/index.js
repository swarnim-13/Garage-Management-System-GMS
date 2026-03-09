//ejdir means embedded javascript template me isme bhi npm install express krunga or ek or library hoti h ejs krke vo bhi instal krunga
//install krne ke baad require krna padta h package ko 

const express = require("express");
const app = express();


const port = 8080;

app.listen(port , () =>{ //ye .listen ke ande ek parameter pass hota h isse server start hota h 
console.log(`ha bhai  sun rhya hu ${port}` );

});
//mene install kra package or fir require kra or simple 8080 server start kra ab ejs ko start krne ke liye

app.set("view engine", "ejs");

app.get("/",(req, res) =>{
    // res.send("bhai me root matlab home pe hu abhi"); ye ek message bhejta hhena matlab iske andr me html code vagaera bhej dakta hu
    // but ejs hame ek option deta h puri file hi as a response bhejne ka we had to use 

    res.render("home.ejs")// ye render ek puri ejs file hi bhej dega jab koi 8080 serefver pe jayega toh dekh le jake
});

//saap sidhi y niche code incomplete h kyuki phele muje js me random no genrate vala code likhna hoga

// app.get("/play",(req,res) =>{
//     res.render("saap.ejs");
// });

app.get("/ig/:username",(req, res) =>{
let followers = ["akash" , "jay", "user4325"];
let { username }= req.params; //ye username ke vairable me  vo h jayega jo html catch krega user jo dalega vo
//req.params krne se tune jese dala swarnim to ye name catch ho jata h or tere variable me store ho jaywga
res.render("insta.ejs" ,{username , followers});
});


//jese mere pass bhot sari ejs templates h view ke andr ab agar muje sabke liye kuch common chiz chahiye like hight 200 px color red backgrounf orange h2 hello ese
//toh me esa code ek jagh likh ke uss file ko ha include kra sakta hun kisi bhi file me

// <%- include("includes/head ya fir jo bhi file name.ejs");