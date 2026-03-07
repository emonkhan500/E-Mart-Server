const connectDB= require('../config/db')

exports.getCategories = async(req,res)=>{
    const db =await connectDB()
    const result = await db.collection('category').find().toArray()
    res.send(result)
}