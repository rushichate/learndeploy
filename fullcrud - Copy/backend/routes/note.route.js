const express = require("express")
const { NoteModel } = require("../module/note.model")
const noteRouter = express.Router()

noteRouter.get("/",async(req,res)=>{
    try{
        const notes = await NoteModel.find()
        res.status(200).send(notes)
    }catch(err){
        res.status(400).send({"msg":err.message})
    }

})

noteRouter.post("/add",async(req,res)=>{
    try{
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new Note added"})
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
  
})

noteRouter.patch("/update/:noteId",(req,res)=>{

})

noteRouter.delete("/delete/:noteId",(req,res)=>{

})

module.exports={
    noteRouter
}