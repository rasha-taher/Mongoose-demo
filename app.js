
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

const PORT=3000;
app.listen(PORT, ()=>{
    console.log(`Server is runiing on http://localhost:${PORT}`);
})

mongoose.connect('mongodb+srv://rashataher1245:rasha1245@cluster0.xbdfnwr.mongodb.net/Rasha')
const db=mongoose.connection;
db.on('error', console.error.bind(console, " Connection Error"));
db.once('open', ()=>{
    console.log("connected to Mongo DB");
});


const userSchema= new mongoose.Schema({
    name: String,
    lastName: String,
    age:Number
})

const User =mongoose.model("User", userSchema);

app.use(express.static('public'));
app.post('/insert', (req, res)=>{
    const{name , lastName, age}= req.body;
    const user=new User({name, lastName , age})
    user.save();
})


app.get('/delete', async (req, res) => {
    const { deleteName, deleteLastName } = req.query;
  
    try {
      if (deleteName && deleteLastName) {
        await User.deleteMany({ name: deleteName, lastName: deleteLastName });
        res.redirect('/');
      } else {
        res.send('Please provide both name and last name to delete.');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
  