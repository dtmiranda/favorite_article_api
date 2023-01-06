const mongoose = require("mongoose");
const { Schema } = mongoose;


const ArticleSchema = new Schema({
  url: String,
  lable: String,
}, {
  timestamps: true
})



module.exports = mongoose.model('ArticleSchema', ArticleSchema)
