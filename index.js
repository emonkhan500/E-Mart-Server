const express = require('express');
const cors =require('cors')
const port =process.env.PORT || 5000;
const app = express();
require('dotenv').config()
const jwt =require('jsonwebtoken')

app.use(cors());
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tp2ab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tp2ab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

const userCollection = client.db('eMart').collection('user')



// jwt
app.post('/jwt',async(req,res)=>{
  const user= req.body;
  console.log(user);
  res.send(user)
})

// Users API

app.post('/users',async(req,res)=>{
  const user = req.body
  const query= {email:user.email}
  const existingUser= await userCollection.findOne(query)
  if(existingUser){
    return res.send({message:'user already exist'})
  }
  const result = await userCollection.insertOne(user)
  res.send(result)

})

app.get('/users',async(req,res)=>{
  const result = await userCollection.find().toArray()
  res.send(result)
})




    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('E-Mart Server is Running')
})
app.listen(port,()=>{
   console.log(`E-Mart Server is Running On Port: ${port}`);
})