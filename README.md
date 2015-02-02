# intreq-stream
![](http://img.shields.io/badge/stability-experimental-orange.svg?style=flat)
![](http://img.shields.io/npm/v/intreq-stream.svg?style=flat)
![](http://img.shields.io/npm/dm/intreq-stream.svg?style=flat)
![](http://img.shields.io/npm/l/intreq-stream.svg?style=flat)

A more direct streaming interface for [intreq](http://github.com/substack/intreq),
which removes any file paths from your bundles.

Generally it's nicer using it directly, but the
[browser-unpack](http://github.com/substack/browser-unpack) module API would
otherwise require you breaking your pipeline. This lets you pipe your JS in
and get JS out the other side :)

## Usage

[![NPM](https://nodei.co/npm/intreq-stream.png)](https://nodei.co/npm/intreq-stream/)

### `intreqStream()`

Creates a transform stream which accepts a browserify bundle as input, and
outputs the same browserify bundle with its paths removed.

``` javascript
// Squish a browserify bundle as much
// as it can be squished:
var intreq     = require('intreq-stream')
var browserify = require('browserify')
var uglifyify  = require('uglifyify')

var src = __dirname + '/index.js'

browserify({
  fullPaths: false,
  debug: false,
  entries: [src]
}).transform(uglifyify, { sourcemap: false })
  .bundle()
  .pipe(intreq())
  .pipe(uglifyify(src, { sourcemap: false }))
  .pipe(fs.createWriteStream(__dirname + '/bundle.js'))
```

## License

MIT. See [LICENSE.md](http://github.com/hughsk/intreq-stream/blob/master/LICENSE.md) for details.
