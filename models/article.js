const mongoose = require('mongoose');
const marked = require('marked'); // To create markdown and turn it into html
const slugify = require('slugify'); // To convert something like a title into a url friendly slug
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Article', articleSchema)