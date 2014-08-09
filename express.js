var express = require('express'),
    app = express();

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);
