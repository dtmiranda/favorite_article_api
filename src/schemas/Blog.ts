const mongoose = require("mongoose");
const { Schema } = mongoose;


const BlogSchema = new Schema({
  lable: String,
  blogUrl: String,
  articles:[{
    cover: String,
    articleURL: String,
    title: String,
    author: String,
  }]
  
}, {
  timestamps: true
})


module.exports = mongoose.model('BlogSchema', BlogSchema)
