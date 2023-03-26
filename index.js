const express = require("express")
const {collection}=require("./db ")
const { userRouter } = require("./routes/user.route")
const {noteRouter} = require("./routes/note.route")
const { auth } = require("./middleware/auth.middleware")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)


app.listen(process.env.port,async()=>{
    try{
        await collection
        console.log("Connected to DB")
    }catch(err){
        console.log("Cannot connect to DB");
        console.log(err);
    }
    console.log(`Server running at port ${process.env.port}`)
})