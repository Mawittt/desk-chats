/***************************************************
 *import all the libraries and constants i reaquire*
 ***************************************************/

const PORT = process.env.PORT || 8000
const express = require('express')
const app = express()
var bodyParser = require("body-parser")
const {mongodb, MongoClient} = require('mongodb')
const uri = "mongodb+srv://mawit-the-great:mawit-the-great@cluster0.b3mx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)
const rclient = new MongoClient(uri)


 /********************************
  * declare the global variables**
  * *******************************/

 var profiles = [1,2,3,4]
 var contacts =[]
 var ind = 0
 var coockie
 var message = []
 var m = 0
 var begin = false

  /*******************
   * use body-parser **
   * ******************/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
   
  /*************
   * set ejs  *
   ************/

app.set("view engine", "ejs")
//css path
app.use(express.static("public"))


/**************************
 * code for the home page ****************************************************************************
 * ************************/


    app.get('/',(req,res)=>{
     res.render("pages/chat_connect")
    })


/*********************
 *code for login page******************************************************************************
 * ********************/

app.get('/login',(req,res)=>{
  res.render("pages/chat_login")
})



 /**************************
  * code for chat page*     **********************************************************************
  * ************************/


 app.post('/chat',(req,res)=>{

/*****************************
 * function that runs mongodb*
 * ***************************/

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


         
         
         
            //treat the data from the connect form
          if (doc.name)
          {

              //fill the contacts array
              cursor = profile.find()
              profiles = cursor 
              ind = 0
              await profiles.forEach((get)=>{
                contacts[ind]=get
                ind++
               })


              //get the messages
              message = []
              m = 0
              messages = msgs.find()
              await messages.forEach((get)=>{
                message[m] = get
                m++ })

                //check if the name has an account
              await contacts.forEach((obj)=>{
                if ((obj.name == doc.name) && (obj.password == doc.password)){
                  coockie = obj._id
                  console.log(obj.lname)
                  begin = true
                  res.render("pages/chat",{ profiles:contacts,coockie:coockie,message:message,begin:begin})
                  begin = false
                }
              })

              //if user does not have/missed an account go back to connect page
              res.render("pages/chat_connect")
           }


             //treat the data from the message form
           else if(doc.message) {

              //fill the contacts array
              cursor = profile.find()
              profiles = cursor 
              ind = 0
              contacts= []
              await profiles.forEach((get)=>{
                contacts[ind]=get
                ind++
               })
             
            
            //set the variables for the date
             var h
             var p
             var d = new Date()

             //set up the date and time
             if(d.getHours()>12){
               h = d.getHours()-12
               p = "pm"
              }
              else if(d.getHours()==12){
                h= d.getHours()
                p= "pm"
              }else{
                h= d.getHours()
                p= "am"
              }

              //append the date and time to the doc.date object
            doc.date = d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getUTCFullYear()+" "+h+":"+d.getMinutes()+p

            //save the new message to the data base 
            const savemsg = await msgs.insertOne(doc)

            //refresh the message array
            message = []
            m = 0
            messages = await msgs.find()
            await messages.forEach((get)=>{
              message[m] = get
              m++
            })
             
            //render the whole page with the new message array
            res.render("pages/chat",{ profiles:contacts,coockie:coockie,message:message,begin:begin})
            }

            //treat data from the login page
            else if(doc.lname){

              //set the user profile to save to the data base
              document = {
                          name : doc.lname,
                          password: doc.lpassword,
                          comment:doc.lcomment
                         }

              //save the user profile to the data base
              var saveProfile= await profile.insertOne(document)

              //fill up the message array
              messages = msgs.find()
              await messages.forEach((get)=>{
                message[m] = get
                m++
              })

              //fill the contacts array
              cursor = profile.find()
              profiles = cursor 
              ind = 0
              await profiles.forEach((get)=>{
                contacts[ind]=get
                ind++
               })

              // check for the user's profile to login
              await contacts.forEach((obj)=>{
                if ((obj.name == doc.lname) && (obj.password == doc.lpassword)){
                  coockie = obj._id
                  begin = true
                  res.render("pages/chat",{ profiles:contacts,coockie:coockie,message:message,begin:begin})
                  begin = false
                }
              })

              //if for some reason couldnt find your profile go to connect page
              res.render("pages/chat_connect")
            }
            
            
            else{

              //treat request from empty message form
              if(doc.recieverid){

                //get the message array
                messages = msgs.find()
                await messages.forEach((get)=>{
                  message[m] = get
                  m++ 
                })

                //render the page
                res.render("pages/chat",{ profiles:contacts,coockie:coockie,message:message,begin:begin})
              }
            }  
            
            
          // print a message if no profile is fount 
          if ((await cursor.count()) === 0) {
            console.log("No profile found!");
          }


          //reinitialise the arrays
          contacts= []
          message = []       
      
        } finally {
          await client.close();
        }
      }
      run().catch(console.dir);
      
    })



    /**************************
     * code for refresh page ************************************************************************************
     * ***********************/

    app.post('/refresh',(req,res)=>{
      var refresh = true

      if (refresh){
        refresh = false

      async function run(){
        try{

          await rclient.connect();
          const database = rclient.db("mychat");
          const msgs = database.collection("msgs")
          var messages = await msgs.find()
          var rmessage = []
          var num = 0  
         await messages.forEach((obj)=>{
            rmessage[num] = obj
            num++
          })

          console.log(rmessage)
         
           res.json({name : rmessage})


        }finally {
          await rclient.close();
          refresh = true
        }

      }
      run().catch(()=>{console.dir })
    
    }

    })

 

            //app litstening to port
app.listen(PORT,()=>{console.log("running through port "+ PORT)})