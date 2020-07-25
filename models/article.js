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
    unique: true //making sure two articles don't have the same title/slug
  }
})

articleSchema.pre('validate', function(next) { //run this function right before we do validation on our article every single time we save, update, delete ect
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true }) //forces slugify to get rid of any characters that don't fit into the url
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)