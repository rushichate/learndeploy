const mongoose = require("mongoose")
require("dotenv").config()
const collection = mongoose.connect(process.env.mongoURL)
 
module.exports={
    collection
}