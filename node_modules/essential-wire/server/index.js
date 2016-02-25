var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
app.set('port', port);

// static pages
app.use(express.static('./public'));

/* 404 */
app.use(function(req, res, next) {
    var err = new Error('Url is not found! ::: ' + req.url);
    err.status = 404;
    next(err);
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

module.exports = app;