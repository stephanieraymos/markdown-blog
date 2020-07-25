const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs') //writing all views with ejs

app.use(express.urlencoded({ extended: false })) //Access all parameters from article form in our article route by accessing req.body.parameterName

app.get('/', (req, res) => {
  const articles = [{
    title: 'Test article',
    createdAt: new Date(),
    description: 'Test description'
  },
  {
    title: 'Test article 2',
    createdAt: new Date(),
    description: 'Test description 2'
  }]
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter) //Moved to bottom to make sure it comes after everything else 

app.listen(5000)
