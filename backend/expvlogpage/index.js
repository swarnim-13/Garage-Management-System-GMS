//get req r post req ke barein me dekhenge 
//phele jo mene express ka package down kra h or ejs ka bhi use require kr leta hu or app me store kr deta hu

const express = require("express");
const app = express(); //express me hi ejs ata hn ejs ke liye views folder bana lenge

const port = 3000;

app.listen(port , ()=>{
    console.log(`yes iam hearing  ${port}`);
});


//req get krne ke liye we use ap.get

app.get('/', (req,res)=>{
res.send("get ke through reply server workng well")
});

//post req bhejte h ye na data password ko secure rskhti h url me show noi krti 

app.post('/', (req,res)=>{
res.send("post  ke through reply aya h issme password vagera hide rheteh")
});

//rest api and crud operation

// styling ko apply krne ke liye
const path = require("path"); //ek path diya h
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname , "views"))); //path kiss dir me vo btaya h

let  post =[
{
    id : "a",
    usernames : "apnacollege",
    content : "ham coding sikhateh",
},
{
     id : "aa",
    usernames : "swarnim",
    content : "hey iam forced to be code",
},
    
{
     id : "aaa",
    usernames : "internship",
    content : "sabko nahu milti bete",
},


];

app.set("view engine","ejs");

// ye post vala routing path h or get ek api h jo hame hamare post data tak pahuchati h
 
app.get('/post',(req,res) =>{ 

res.render("index.ejs",{post}); // me chahta hu mene jo array banaya h vo uthke pura vhale jaaye
});
//me ek new path pe api bana rha hu jab user iss path pe jayega toh ek new form bana hua h
app.get('/post/new',(req,res)=>{
    res.render("new.ejs");
});
//ab jese me kuch sumbit krta hu mera pass bhi api me chala jata h kyuki ye get se bana h ab me esa chahta hu ki
// submit krne ke baad ye post api pe chale jaaye uske liye html me change h dekh jake

app.post("/posts",(req,res)=>{
    let {usernames,content} = req.body; // jo user muje uska new naam or content dega vo me mere array me store krwana chahta h
    post.push({usernames ,content}); //post jo mera array h  me sara data agya ab usse array me push krdiya

    res.redirect("/post"); //main post vale page pe a jayega tu submit krke
});
//ab me chahta hu jese user apna naam or jo usse gyan dena h vo deke sumbit kre toh vapis all post pe pahuche toh muje iske liye muje
//page ko connect krna hoga r uske liye we use app.redirect(url);

// sabke pass ek uniqe id hoti h ham chahe toh id se bhi traveling kr sakte h dekh\

app.get("/post/:id",(req,res)=>{ //jab bhi koi id dalega toh hamare  array me jo hamne id di h usse match krwaya jayega
let {id} = req.params;
let sahi =post.find((p)=> id === p.id);
 //ye sahi me hamari id h agar match kregi toh vhi detail print hogi jo uski id h
res.render("show.ejs",{sahi});
//user jab bhi kuch id dale toh usse ek detail vlog khulna chahie show.ejs dekh mene ek html page banay h 
console.log(post);
});

// ye sahi naam ke variable banane se jo prob hui h vo mene webpage pe likhdi h 

//abhi toh me id de rha hu 1a,2aa etc but unique id banane ke liye ek pakage hota h uuid usse npm 
//se install kr require kr or jha jha tune id di h vha id: uuid4(); toh ek unique id create hogi har baar



// patch api req isse i can edit my content mera ya ksi bhi person ke vlog ka content i can edit
app.patch("/post/:id",(req,res)=>{
let {id}= req.params;
let newcontent = req.body.content;
let sahi =post.find((p)=> id === p.id);
sahi.content = newcontent;
console.log(sahi);
res.send("ha bhai working");

});

//ab muje agar mera thoughts edit krna h toh me ek naya path ya api bana rha hu

app.get('/post/:id/edit',(req,res)=>{
let {id} = req.params;
let sahi = post.find((p)=> id == p.id);
res.render("edit.ejs",{sahi});
});
//npm install method-override ye hamari post api ko fetch me ya kisi me bhi badal dega kyuki html sirf post or get hi bhej sakte h hame 
//toh patch delete sab bhejni h isliye ye package install krna padega
 const meth0doverride = require("method-override");
 app.use(meth0doverride("_method"));
 
 //post delete krne ke liye
 app.delete("/post/:id/", (req,res)=>{
let {id} = req.params;
let sahi = post.filter((p)=> id !== p.id);
res.send("yes succefully delete");
 });


 //bas ye itna hi tha apis ka basically tuje api banannti ani chaiye tu ye sab padhlena baki ab sql start kr rha hu 27 june h aj