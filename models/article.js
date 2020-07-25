const mongoose = require('mongoose');
const marked = require('marked'); // To create markdown and turn it into html
const slugify = require('slugify'); // To convert something like a title into a url friendly slug
const createDomPurify = require('dompurify') //sanitizes html 
const { JSDOM } = require('jsdom') //way to render html inside node --> JSDOM in brackets bc we only want that portion of jsdom
const dompurify = createDomPurify(new JSDOM().window) //allows our dom purifier to create html and purify it using the jsdom window object

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
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
})

articleSchema.pre('validate', function (next) { //run this function right before we do validation on our article every single time we save, update, delete ect
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true }) //forces slugify to get rid of any characters that don't fit into the url
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown)) //converts markdown to html and purifies it to get rid of any malicious code + to escape all html characters
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)