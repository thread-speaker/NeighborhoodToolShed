var connect = require('connect');

var serveStatic = require('serve-static');

connect().use(serveStatic('web/')).listen(3000);
