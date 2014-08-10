var express = require('express'),
    app = express(),
    toobusy = require('toobusy'),
    arguments = process.argv.splice(2),
    pi = require('./pi'),
    server;

// Middleware which blocks requests when we're too busy
app.use(function (req, res, next) {
  if (toobusy()) {
    res.send(503, 'I\'m busy right now, sorry.');
  } else {
    next();
  }
});

app.get('/', function (req, res) {
  var n = pi();
  res.send(n + '');
});

server = app.listen(arguments[0] || 3000);

process.on('SIGINT', function () {
  server.close();
  // calling .shutdown allows your process to exit normally
  toobusy.shutdown();
  process.exit();
});
