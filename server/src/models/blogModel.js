const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    category: String,
    content: String,
    image: String,
    author: String,
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
},{timestamps: true});

module.exports = mongoose.model("Blog", blogSchema);