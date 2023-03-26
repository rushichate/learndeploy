const express = require("express")
const { UserModel } = require("../module/user.model")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


userRouter.post("/register",async(req,res)=>{
    const {email,pass,location,age}=req.body
    try{
        bcrypt.hash(pass, 5,async (err, hash)=> {
            const user = new UserModel({email,pass:hash,location,age})
            await user.save()
            res.status(200).send({"msg":"Registration done"})
        });
        // const user = new UserModel(req.body)
        // await user.save()
        // res.status(200).send({"msg":"Registration done"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
 
})

userRouter.post("/login",async(req,res)=>{
    // const email = req.body.email
    // const pass = req.body.pass
    const {email,pass} = req.body
    try{
        const user =await UserModel.findOne({email})
      
        if(user){
            bcrypt.compare(pass,user.pass, (err, result) =>{
                if(result){
                    res.status(200).send({"msg":"Login sucsess","token":jwt.sign({userID:user._id},"rushi")})
                }else{
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            });
        }
        // user.length>0?  res.status(200).send({"msg":"Login Sucsess","token":jwt.sign({ foo: 'superman' }, 'rushi')}):
        // res.status(400).send({"msg":"Login Faild"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
 
})

userRouter.get("/details",(req,res)=>{
    // const {token} = req.query
    const token = req.headers.authorization
    jwt.verify(token, 'rushi', (err, decoded)=> {
        decoded? res.status(200).send("User Details"):
        res.status(400).send({"msg":err.message})
    })
    // if(token =="abc@123"){
    //     res.status(200).send("User Details")
    // }else{
    //     res.status(400).send({"msg":"Acsess denied"})
    // }
})

module.exports={
    userRouter
}
