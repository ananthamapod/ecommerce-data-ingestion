var es = require('event-stream')
var debug = require('debug')('ecommerce-data-ingestion:dbloader')
var db = require('../models')

module.exports = function() {
  var StreamProcessor = this

  var createCustomer = function(data) {
    const INPUT_FIELDS = {
      "id": "customer_id",
      "first_name": "customer_first_name",
      "last_name": "customer_last_name",
      "street_address": "customer_street_address",
      "state": "customer_state",
      "zip": "customer_zip"
    }

    let customer = {}
    for (field_name in INPUT_FIELDS) {
      customer[field_name] = data[INPUT_FIELDS[field_name]]
    }

    return customer
  }

  var createProduct = function(data) {
    const INPUT_FIELDS = {
      "id": "product_id",
      "name": "product_name",
      "purchase_amount": "product_purchase_amount"
    }

    let product = {}
    for (field_name in INPUT_FIELDS) {
      product[field_name] = data[INPUT_FIELDS[field_name]]
    }

    return product
  }

  var createTransaction = function(data) {
    const INPUT_FIELDS = {
      "customer_id": "customer_id",
      "purchase_status": "purchase_status",
      "product_id": "product_id",
      "date": "date"
    }

    let transaction = {}
    for (field_name in INPUT_FIELDS) {
      transaction[field_name] = data[INPUT_FIELDS[field_name]]
    }

    return transaction
  }

  var processLine = function(line) {
    const INPUT_FIELDS = {
      "customer_id": 0,
      "customer_first_name": 1,
      "customer_last_name": 2,
      "customer_street_address": 3,
      "customer_state": 4,
      "customer_zip": 5,
      "purchase_status": 6,
      "product_id": 7,
      "product_name": 8,
      "product_purchase_amount": 9,
      "date": 10
    }

    let fields = line.split('\t')
    let data = {}
    for (field_name in INPUT_FIELDS) {
      data[field_name] = fields[INPUT_FIELDS[field_name]]
    }
    let customer = createCustomer(data)
    let product = createProduct(data)
    let transaction = createTransaction(data)

    db.Customer.findOrCreate({where: customer})
      .then(() => {
        return db.Product.findOrCreate({where: product})
      }).then(() => {
        return db.Transaction.create(transaction)
      }).then(() => {
        debug(`All entities saved in line \'${line}\', moving to next line`)
        console.log(`All entities saved in line \'${line}\', moving to next line`)
      })
  }

  StreamProcessor.processData = function(stream) {
    stream.pipe(es.split())
      .pipe(es.mapSync(function(line){

        // pause the readstream
        stream.pause()

        // process line here and call s.resume() when ready
        // function below was for logging memory usage
        processLine(line)

        // resume the readstream, possibly from a callback
        stream.resume()
      })
    .on('error', function(err){
        console.log('Error while reading file from stream.', err)
    })
    .on('end', function(){
        console.log('Read entire stream.')
    })
    )
  }
  return StreamProcessor
}
