const figlet = require("figlet"); // require ke andr package ka name 

figlet("Hello World!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
//ye package mene down kra h ye code bhi mene net se nikala h isse run krne ke liye nodejs use krunga ya fir 
//termonal pe node index.js run krunga

//ye jo package.json vali  file h ye important hotob h kyuki agar mera node module dlt ho jaye toh me isski help
//se vapis sew new module install kr sakta hu 

//khudki package.json file banane ke liye npm init -y 