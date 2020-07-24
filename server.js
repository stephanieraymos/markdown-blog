const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();

app.set('view engine', 'ejs') //writing all views with ejs

app.use('/articles', articleRouter)

app.get('/', (req, res) => {
  res.render('index', { text: 'Hello!' })
})

app.listen(5000)
