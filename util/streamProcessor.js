var es = require('event-stream')
var debug = require('debug')('ecommerce-data-ingestion:dbloader')

module.exports = function() {
  var StreamProcessor = this

  var processLine = function(line) {
    debug(line)
    console.log(line)
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
