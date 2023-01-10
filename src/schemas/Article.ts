const mongoose = require("mongoose");
const { Schema } = mongoose;


const ArticleSchema = new Schema({
  lable: String,
  summary: String,
  url: String,
  author: String,

}, {
  timestamps: true
})



module.exports = mongoose.model('ArticleSchema', ArticleSchema)
