const express = require('express')
const app = express()
const path = require('path')
module.exports = app

// boilerplate middleware
app.use(require('./middleware'))

// direct users to index.html
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

// error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message || 'Internal server error')
})
