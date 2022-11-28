const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
},
{collection: 'Diary'})

const Post = mongoose.model('Diary', postSchema)

module.exports = { Post }