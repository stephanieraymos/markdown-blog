// This page renders out a list of our articles

const express = require('express');
const mongoose = require('mongoose');
const Article = require('./../models/article');
const router = express.Router();

mongoose.connect('mongodb://localhost/blog', { 
  useUnifiedTopology: true, useNewUrlParser: true 
})

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() }) 
})

router.get('/:id', (req, res) => {

})

router.post('/', async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })
  try {
    article = await article.save(); //saving new article + giving article id
    res.redirect(`/articles/${article.id}`)
  } catch (err){
    res.render('articles/new', { article: article })
  }
})

module.exports = router