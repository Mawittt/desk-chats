 
/*function refresh(){                
                var reqq = new XMLHttpRequest()
                reqq.responseType = "json"
                reqq.onload = function() {
                  var ress = reqq.response.name
                       //wipe out the chat area
             button.innerHTML = " " 
                    
             ress.forEach(element => {
                if (((getCookie("recieverid") == element.recieverid) && (getCookie("userID") ==  element.senderid))  || ((element.senderid==sid) && (element.recieverid== getCookie("userID"))) )
                {
                    //creat the message elements             
                     var elle = document.createElement("div");
                    var msg = document.createElement("div");
                    var date = document.createElement("div");
                    //setting the infos
                    msg.innerHTML =  element.message ;
                    date.innerHTML =  element.date ;
                    contact.innerHTML = getCookie("name")
                    //settting the attributes
                    msg.setAttribute("class","msg")
                    date.setAttribute("class","date")
                    elle.setAttribute("class","elle")
                    //appending the elements
                    elle.appendChild(msg);
                    elle.appendChild(date); 
                    button.appendChild(elle);
                      // alert("checked")
                }
                
               
            });
                   alert(ress)
                }
                reqq.open("POST", "/refresh")
                reqq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                   reqq.send()
            }
*/
              
           



var disable = document.getElementById("disable")
disable.disabled = false
disable.addEventListener("click",()=>{
  setTimeout(()=>{
    disable.disabled = true
  },3)
  
})
if(<%= begin %>)
{
document.getElementById("mydiv").style.display = "none";
}
var shrink = document.getElementById("shrink")
shrink.addEventListener('click',()=>{
document.getElementById("mydiv").style.display = "none";
})
var disable = document.getElementById("disable")
disable.disabled = false
//set the coockie%
setCookie("userID","<%= coockie%>",2)
//js funtioning check


if(getCookie("recieverid"))
{
      alert("is suppose to chat")
    //declare meta infos
    var contact = document.getElementById("contact")
    var sid = getCookie("recieverid")
    var button = document.getElementById("compose")  
    var user = document.getElementById("data2")
    var friendid = document.getElementById("data")
    friendid.setAttribute("value",sid)
    user.setAttribute("value",getCookie("userID"))
    user.dataset.state = 'valid' 
    friendid.dataset.state = 'valid'
   //alert("name :"+name+" comment:"+comment+"secondary id:"+sid+" user id:"+getCookie("userID"))
     //wipe out the chat area
     button.innerHTML = " " 
    //loop through all messages in the data base and selecting the right ones
    
    <% message.forEach(element => { %>
        if (((getCookie("recieverid") == '<%=element.recieverid %>') && (getCookie("userID") == '<%= element.senderid%>'))  || (('<%=element.senderid%>'==sid) && ('<%=element.recieverid%>'== getCookie("userID"))) )
        {
            //creat the message elements             
             var elle = document.createElement("div");
            var msg = document.createElement("div");
            var date = document.createElement("div");
            //setting the infos
            msg.innerHTML = "<%= element.message %>";
            date.innerHTML = "<%= element.date %>";
            contact.innerHTML = getCookie("name")
            //settting the attributes
            msg.setAttribute("class","msg")
            date.setAttribute("class","date")
            elle.setAttribute("class","elle")
            //appending the elements
            elle.appendChild(msg);
            elle.appendChild(date); 
            button.appendChild(elle);
              // alert("checked")
        }
        
       
    <% }); %>
  

}

//function to disable msg send 


//fuction for adding message to chat box
function func(name,comment,sid)
{
  document.getElementById("mydiv").style.display = "block";
  setCookie("recieverid",sid,2)
  setCookie("name",name,2)
    //declare meta 
    var disable = document.getElementById("disable")
    var contact = document.getElementById("contact")
    var button = document.getElementById("compose")  
    var user = document.getElementById("data2")
    var friendid = document.getElementById("data")
    friendid.setAttribute("value",sid)
    user.setAttribute("value",getCookie("userID"))
    user.dataset.state = 'valid' 
    friendid.dataset.state = 'valid'
    contact.innerHTML = name
  // alert("name :"+name+" comment:"+comment+"secondary id:"+sid+" user id:"+getCookie("userID"))
     //wipe out the chat area
     button.innerHTML = " " 
    //loop through all messages in the data base and selecting the right ones
    <% message.forEach(element => { %>
        if (((sid == '<%=element.recieverid %>') && (getCookie("userID") == '<%= element.senderid%>')) || (('<%=element.senderid%>'==sid) && ('<%=element.recieverid%>'== getCookie("userID"))) )
        {
            //creat the message elements             
             var elle = document.createElement("div");
            var msg = document.createElement("div");
            var date = document.createElement("div");
            //setting the infos
            msg.innerHTML = "<%= element.message %>";
            date.innerHTML = "<%=element.date %>";
            //settting the attributes
            msg.setAttribute("class","msg")
            date.setAttribute("class","date")
            elle.setAttribute("class","elle")
            //appending the elements
            elle.appendChild(msg);
            elle.appendChild(date); 
            button.appendChild(elle);
              // alert("checked")
        }

    <% }); %>
}

    //setting coockies
function setCookie(cname, cvalue, exdays) {
const d = new Date();
d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
let expires = "expires="+d.toUTCString();
document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//get coockies function
function getCookie(cname) {
let name = cname + "=";
let ca = document.cookie.split(';');
for(let i = 0; i < ca.length; i++) {
let c = ca[i];
while (c.charAt(0) == ' ') {
c = c.substring(1);
}
if (c.indexOf(name) == 0) {
return c.substring(name.length, c.length);
}
}
return "";
}
//checking cookie function

function checkCookie() {
let user = getCookie("username");
let use
if (user = "") {
alert("Welcome again " + user);
} else {
user = prompt("Please enter your name:"+"<%= coockie%>ttt", "");
if (user != "" && user != null) {
setCookie("username", user, 365);
}
}
}

//dragable mouse pop up functions

// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
if (document.getElementById("move")) {
// if present, the header is where you move the DIV from:
document.getElementById("move").onmousedown = dragMouseDown;
} else {
// otherwise, move the DIV from anywhere inside the DIV:
elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
e = e || window.event;
e.preventDefault();
// get the mouse cursor position at startup:
pos3 = e.clientX;
pos4 = e.clientY;
document.onmouseup = closeDragElement;
// call a function whenever the cursor moves:
document.onmousemove = elementDrag;
}

function elementDrag(e) {
e = e || window.event;
e.preventDefault();
// calculate the new cursor position:
pos1 = pos3 - e.clientX;
pos2 = pos4 - e.clientY;
pos3 = e.clientX;
pos4 = e.clientY;
// set the element's new position:
elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
// stop moving when mouse button is released:
document.onmouseup = null;
document.onmousemove = null;
}
}

