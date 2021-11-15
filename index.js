//import all the libraries i reaquire
const PORT = 8000
const express = require('express')
const app = express()
var bodyParser = require("body-parser")
const {mongodb, MongoClient} = require('mongodb')
const uri = "mongodb+srv://mawit-the-great:mawit-the-great@cluster0.b3mx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
 const client = new MongoClient(uri)
 //declare the global variables
 var profiles = [1,2,3,4]
 var dog =[]
 var ind = 0
 var coockie
 var message = []
 var m = 0
//use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
//use ejs
app.set("view engine", "ejs")
//css path
app.use(express.static("public"))


//home page
 app.get('/',(req,res)=>{
     res.render("pages/chat_connect")
 })
//login page
app.get('/login',(req,res)=>{
  res.render("pages/chat_login")
})
 //chat page
 app.post('/chat',(req,res)=>{

//function that runs mongodb
    async function run() {
        try {
          //set up the database variables
          await client.connect();
          const database = client.db("mychat");
          const profile = database.collection("profile");
          const msgs = database.collection("msgs")
            const doc = req.body
          var cursor = profile.find();
          var messages = msgs.find()
          profiles = cursor
          //putting the profiles and messages in arrays
          await profiles.forEach((get)=>{
           dog[ind]=get
           ind++
          });
         
         
            

         
         
//checking weather the information comes from login or chat
if (doc.name)
{
  
  messages = msgs.find()
  await messages.forEach((get)=>{
  message[m] = get
  m++ })
 await dog.forEach((obj)=>{
    if ((obj.name == doc.name) && (obj.password == doc.password))
   {
     
    coockie = obj._id
    console.log(obj.lname)
    res.render("pages/chat",{ profiles:dog,coockie:coockie,message:message})
   }
    
      console.log("could not find "+doc.name)
    
    
  })
 res.render("pages/chat_connect")
}
else if(doc.message) {
  var h
  var p
  const person = {name : "zack"}
  person.age = 23
  var d = new Date()
  if(d.getHours()>12)
  {
       h = d.getHours()-12
       p = "pm"
  }
  else if(d.getHours()==12)
  {
      h= d.getHours()
      p= "pm"
  }
  else{
      h= d.getHours()
      p= "am"
  }
  doc.date = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getUTCFullYear()+" "+h+":"+d.getMinutes()+p
  
  const savemsg = await msgs.insertOne(doc);
  
  messages = msgs.find()
  await messages.forEach((get)=>{
  message[m] = get
  m++ })

  console.log("document has been added with id :"+ savemsg.insertedId)
  res.render("pages/chat",{ profiles:dog,coockie:coockie,message:message})
}
else if(doc.lname)
{
  document = {
    name : doc.lname,
    password: doc.lpassword,
    comment:doc.lcomment
  }
  var saveProfile= await profile.insertOne(document)
   
  messages = msgs.find()
  await messages.forEach((get)=>{
  message[m] = get
  m++ })
  cursor = profile.find()
  profiles = cursor
  await profiles.forEach((get)=>{
    dog[ind]=get
    ind++
   });
  
 await dog.forEach((obj)=>{
    if ((obj.name == doc.lname) && (obj.password == doc.lpassword))
   {
     
    coockie = obj._id
    console.log(obj.name)
    res.render("pages/chat",{ profiles:dog,coockie:coockie,message:message})
   }
   
      console.log("could not find "+doc.name)
    
  })
  res.render("pages/chat_connect")
}
else{
  if(doc.recieverid)
  {
 res.render("pages/chat",{ profiles:dog,coockie:coockie,message:message})
  }
  console.log("there is nothing")}         
          // print a message if no documents were found
          if ((await cursor.count()) === 0) {
            console.log("No documents found!");
          }
       

//reinitialise the arrays
dog = []
message = []       
      
        } finally {
          await client.close();
        }
      }
      run().catch(console.dir);
     
    
 })

//app litstening to port
app.listen(PORT,()=>{console.log("running through port "+ PORT)})