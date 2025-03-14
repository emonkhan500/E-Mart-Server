const express = require('express');
const cors =require('cors')
const port =process.env.PORT || 5000;
const app = express();



app.use(cors());
app.use(express.json())




app.get('/',(req,res)=>{
    res.send('E-Mart Server is Running')
})
app.listen(port,()=>{
   console.log(`E-Mart Server is Running On Port: ${port}`);
})