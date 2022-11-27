const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	todo: String,
  dataNum: Number
},
{collection: 'diary'})

const Post = mongoose.model('Post', postSchema)

module.exports = { Post }