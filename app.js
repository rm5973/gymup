
 
const express = require("express");
const path = require("path");
const  bodyparser= require("body-parser");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gymdata', {useNewUrlParser: true});
const port = 80;

const gymSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address:String,
    more:String,
  });
  var gym = mongoose.model('gym', gymSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'gym content', "content": con}
    res.status(200).render('index.pug', params);
})

app.post('/',(req,res)=>{
  
 var mydata= new gym(req.body);
 mydata.save().then(()=>{
     res.send(" client has be admited to gymdata base ")
 }).catch(()=>{
     res.status(400).send("sorry could not add to data base ")
 });
//  const params={"message":" the form is submited pprly "}
//  res.status(200).render('index.pug',params)


})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on  ${port} port`);
});

