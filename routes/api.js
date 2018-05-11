var express = require('express')
var router = express.Router()
var debug = require('debug')('ecommerce-data-ingestion:server')
var resumable = require('./../util/resumable-node')('./tmp')

/* GET home page. */
router.get('/upload', function(req, res, next) {
  resumable.get(req, function(status, filename, original_filename, identifier) {
      debug('GET', original_filename, status)
      res.status((status == 'found' ? 200 : 404)).send(status)
  })
})

/* POST form upload. */
router.post('/upload', function(req, res, next) {
  resumable.post(req, function(status, filename, original_filename, identifier) {
      debug('POST', status, original_filename, identifier)
      res.send(status)
  })
})

module.exports = router
