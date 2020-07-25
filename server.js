const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const app = express();
const { MONGO_URI } = require('./config')

mongoose.connect(MONGO_URI, {   
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true })

app.set('view engine', 'ejs') //writing all views with ejs

app.use(express.urlencoded({ extended: false })) //Access all parameters from article form in our article route by accessing req.body.parameterName

app.get('/', async (req, res) => {
  const articles = await Article.find() //grabbing every single article
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter) //Moved to bottom to make sure it comes after everything else 

app.listen(5000)
