
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

require('dotenv').config()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
  () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

const postSchema=mongoose.Schema({
  firstname: String,
    lastname:String,
    company:String,
    email:String,
    phonenumber:Number
})

const Post=mongoose.model("Post",postSchema)

app.get('/', (req, res) => {
    res.send('my profile API')
  })

  app.post('/create',(req,res)=>{
    Post.create({
      firstname: req.body.firstname,
      lastname:req.body.lastname,
      company:req.body.company,
      email:req.body.email,
      phonenumber:req.body.phonenumber
      }).then(doc =>console.log(doc))
      .catch((err)=>console.log(err));
      
  })

  

  app.get('*',(req,res)=>{
    res.send('404')
  })
  


// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT);
})