//bas yhi me sare package install krunga or sab ko use krke sql ejs api sabke through ek web page banayega


const { faker } = require('@faker-js/faker'); //faker ko require kra jese har package ko  krte h 

const mysql =require('mysql2'); // mysql ko bhi require kra  jo hamare server or sql ko connect krega 

const connection = mysql.createConnection({ // esa krne se mere server mere sql app me jo file h usse connect ho jayega 

    host: 'localhost',
    user: 'root',
    database: 'cstudent', //ye mene workbench ke andr create kra h dekhler file ka name clubbackend h
    password: "132826" //ye mera sql ka password h 
}); //ab isse chalane ke liye tu powershell me MySQL -u root -p krke database select krlena or vs code me jo sql file h usse
//source krke db ko use krke operation krlena

//ab isse fake data generate hoga
let getRandomUser = ()=>{  
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
    //ye ek fake data h jo random chize generate krta h 
     faker.internet.password(),   
  ];
} 

// //or ye me data insert kr rha hu ye mere db jo mene bnaya h usme add ho jayega table isko Cschema.sql se bani mil jayegi
// let s ="INSERT INTO user (id, username, email, password) VALUES ?";
// let data = [];
// for(let i=1;i<=100;i++){
// data.push(getRandomUser()); //100 fake user ka data banke niche hamare db me add kr rha h 
// }

// //ye connection query se mera jo fake data h vo mere server pe jayega 
// try {
// connection.query(s, [data], (err , result)=>{ // isse connection banta h ye ek tarika h workbench me data banane ka jese hamne likha h q me show table

//     if (err) throw err;
//     console.log(result);
// });
// } catch (err){
//     console.log(err);
// }
// connection.end();

// ab me meri api setup krega 

const express = require('express');
const app = express();

//ab npm ejs instll  hoga
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); //views file banai h jiske andr ejs files h 

//api
app.listen("8080",()=>{
    console.log("oji chalu 8080 hello");

});

app.get("/",(req,res)=>{
    let q= ` SELECT count(*) from user`; // ye ek sql cmmnd h jisse total no of user kitne h dekh paunga

    try {
connection.query(q, (err , result)=>{ // ye jo bhi mene para pass kra h usse sql db tak pahucha deta

    if (err) throw err;
    let count = result [0]["count(*)"]; //jese mere 300 user h toh vo 300 ek count ke andr a jayega
    res.render("home.ejs",{count});
});
} catch (err){
    console.log(err);
    res.send("kuch gadbad h ");
}

});



app.get("/user",(req,res)=>{
let q=`SELECT * FROM USER`; //sql cmmd jisse table ke andr ka data sab bta dega 

   try {
connection.query(q, (err , users)=>{ // ye jo bhi mene para pass kra h usse sql db tak pahucha deta or reply lata h

    if (err) throw err;
   // console.log(result);
    res.render("showuser.ejs" , {users}); // mere q ke andr result jo h uska name mnene users de diya h
});
} catch (err){
    console.log(err);
    res.send("kuch gadbad h ");
}
});  



app.get("/user/:id/edit",(req,res)=>{
let {id}= req.params; //isse mere pertivular user ki id a jayegi 
let q= `SELECT * FROM USER where id='${id}'`; //ye where ek clause h yaad kr ye id compare krega

   try {
connection.query(q, (err , result)=>{ // ye jo bhi mene para pass kra h usse sql db tak pahucha deta or reply lata h

    if (err) throw err;
    let user = result [0];
    res.render("edit.ejs",{user}); // mere q ke andr result jo h uska name mnene users de diya h
});
} catch (err){
    console.log(err);
    res.send("kuch gadbad h ");
}
});  



//actual db me update kr rha hu patch req se possible h uske liye muje pacckage methodoveride ko require krna hoga ye html code me use h dekhle edit.ejs

const method0verride=require("method-override");
app.use(method0verride("_method"));
app.use(express.urlencoded({extended:true}));

//patvh ye use hota h updatew ke liye 
app.patch("/user/:id",(req,res)=>{
  
    let {id}= req.params; //isse mere pertivular user ki id a jayegi
    let{password: formpass, username: newusername }= req.body; 
let q= `SELECT * FROM USER where id='${id}'`; //ye where ek clause h yaad kr ye id compare krega

   try {
connection.query(q, (err , result)=>{ // ye jo bhi mene para pass kra h usse sql db tak pahucha deta or reply lata h

    if (err) throw err;
   if(formpass != user.password){
  res.send("wrong password");
   }
   else{
    let q2= `update set username ${newusername} where id =${id}`;
    connection.query(q2,(err,result)=>{
        if (err) throw err;
        res.redirect("/user");
    });
   }
});
} catch (err){
    console.log(err);
    res.send("kuch gadbad h ");
}
});  


//bas ye complete h yha me dit krke jo bhi changes krunga vo sidhe mere server pe honge db pe honge permannet