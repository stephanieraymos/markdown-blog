const express = require('express');
const app = express();

app.set('view engine', 'ejs') //writing all views with ejs

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(5000)
