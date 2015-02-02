var unpack   = require('browser-unpack')
var pack     = require('browser-pack')
var through2 = require('through2')
var intreq   = require('intreq')
var from2    = require('from2')

module.exports = createStream

function createStream() {
  var stream = through2(write, flush)
  var buffer = []

  return stream

  function write(data, _, next) {
    buffer.push(data)
    next()
  }

  function flush() {
    try {
      var modules = unpack(buffer.join(''))
    } catch(e) {
      return this.emit('error', e)
    }

    from2.obj(modules)
      .pipe(intreq())
      .pipe(pack({ raw: true }))
      .on('data', function(ck) { stream.push(ck) })
      .once('end', function(_) { stream.push(null) })
  }
}
