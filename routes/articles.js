// This page renders out a list of our articles

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose.connect('mongodb://localhost/blog', { 
  useUnifiedTopology: true, useNewUrlParser: true 
})

router.get('/new', (req, res) => {
  res.render('articles/new')
})

router.post('/', (req, res) => {

})

module.exports = router