const express = require('express'); // me require kr rhs hu matlab express file ko apnin index vali file me la rha hu
const app = express();
//console.dir(app); //.log bhi kr sakta  hu or express ke andr kya h dekh sakta hu

//port matlab ek server banane ke liye connection jese samudr or land ke bich port hote h ship ke liye vese
let port =3000 ; //8080 

app.listen(port, () =>{ //listen matlab ye iss 3000 server pe sun rha h ye mne arrow function bnaya

console.log(`sun rha hu na me is server pe ${port}`)
}
);
//agar me isse run krtahu toh it means mera 3000 pr server start ho gya h terminsl pr ctr+c krega toh bhar a jayega
//  check krne ke liye chrome pe ja or likh
// localhost:3000 ab ye listen se vo bas sunega kuch krega nahi kuch recieve ke liye muje 

app.use(  (req,res) =>{ //use me 2 parameter pass hote h request or response
console.log("ha tune search  kra signal recieved")

//response bhejnle ke liye 
res.send("kya haal mr lullilal"); //iske andr me kuch bhi response bhej sakta hu jese ek object banake bhi bhai m html bhi bhejsakta
// res.send("<h1>badhiheading</h1> <ul>apple</ul>")
});

//ROUTING ek kisi path pe perticular response bhejna jese me chrome pe localhost:3000/mob

app.get("/mob", (req, res) => {

    res.send("ji aap direct mobile ki duniya me a gye bc")
});
app.get("/toy", (req, res) => {

    res.send("ji aap  adult toy dikhaata hu")
});
app.get("/car", (req, res) => {

    res.send("gtr rstatatatatatat")
});

//agar me localhost:3000/toy krunga toh ye toy vala message print hoga but remeber jab app.get use kra h toh app.use hatana hoga
//ye app.get or use same hi h agar muje specific route pe message reply dena h toh me get use krunga bas  

//ye jo baar baar server restart krna padhta h uss ke solution ke iye ham package nodemom ko install kr rhe h -g matlab global pe
//ab terminal [pe likhna nodemon index.js]