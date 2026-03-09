// facker ek npm ka package h jo rough sql data contain krta h ye command mene net se copy kri h npm web se

const { faker } = require('@faker-js/faker');

// isse comment out siliye kyuki niche me ek or bana rha hu or usme array return kr rha hu

// let getRandomUser = ()=>{  
//   return {
//     Id: faker.string.uuid(),
//     username: faker.internet.username(), // before version 9.1.0, use userName()
//     email: faker.internet.email(),
//     //ye ek fake data h jo random chize generate krta h 
//     password: faker.internet.password(),
     
//   };
// }

// me apne facker se fake data create krne ke liye ya bana rha hu isliye upper vale ko //kiya

//console.log(getRandomUser());

//ab ham mysql2 name ka ek package hota h jo hamare sql or server ko apas m connect krta h 
const mysql =require('mysql2');
const connection = mysql.createConnection({
       
    host: 'localhost',
    user: 'root',
    database: 'delta_app', //ye mene workbench ke andr create kra h dekhler
    password: "132826" //ye mera sql ka password h 
});



// try {
//     let q="SHOW TABLES";
// connection.query(q, (err , result)=>{ // isse connection banta h ye ek tarika h workbench me data banane ka jese hamne likha h q me show table

//     if (err) throw err;
//     console.log(result);
// });
// } catch (err){
//     console.log(err);
// }
// connection.end(); //isse connection end hota h 



//muje terminal pe ek command run krni hogi /usr/local/mysql/bin/mysql -u root -p isse me sql wrokbench ke command terminal pe use kr paunga
//windows me user ke andr or teri location pe me powershell me type MySQL -u root -p isse tu direct workbench ke andr ayega


//ham sql command ko terminal me run kr sakte h upper dekh ab ek or tarika hota h we can run it by
//creating schema.sql in vs code use run krne ke liye terminal pe likhna 
//use  jo bhi tere db ka name ho vo fir Source schema.sql file ka name

//ye user name ki table mene workbenmch pe banai h ye ? ek tarika h jese abhi mere pass deta nahi h but vo ayega data kahi se isse placeholder bolte h 


// try {
//     let q="INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)"
//     let user= ["121","adii","abc@gmail","6969"];
//     // mene user or qu dono ko as a parameter pass kr diya h
// connection.query(q, user, (err , result)=>{ // isse connection banta h ye ek tarika h workbench me data banane ka jese hamne likha h q me show table

//     if (err) throw err;
//     console.log(result);
// });
// } catch (err){
//     console.log(err);
// }
// connection.end();

//3 baar try catch nahi chalwngw upper vale ko comment kr dena run se phele

let getRandomUser = ()=>{  
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
    //ye ek fake data h jo random chize generate krta h 
     faker.internet.password(),
     
  ];
  //isse ek fake data create hoga
} 
//inserting new data
let s ="INSERT INTO user (id, username, email, password) VALUES ?";
let data = [];
for(let i=1;i<=100;i++){
data.push(getRandomUser()); //100 fake user ka data banke niche hamare db me add kr rha h 

}

try {
connection.query(s, [data], (err , result)=>{ // isse connection banta h ye ek tarika h workbench me data banane ka jese hamne likha h q me show table

    if (err) throw err;
    console.log(result);
});
} catch (err){
    console.log(err);
}
connection.end();
//mene 100 user ka data js se enter krwaya h mere sql server pe check kr liye tu poweshell me jake command likh show * from user 


//dekh ab me ek alag file bana rha hu jisme ek localhost banake api likhunga home vagera pee or uspe apne db ke data ko bhej ke sh
//show krwaunga isme me ejs bhi use krunga matlab jo phele use kra h usse sabko club krunga file ka name h 
//cluball