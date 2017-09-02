const express = require('express')
const app = express()

// home page
app.use(express.static('public')) // use public folder for static file

var get_routes = require('./routes/get.js');
var post_routes = require('./routes/post.js');
var put_routes = require('./routes/put.js');
var delete_routes = require('./routes/delete.js');

app.use('/', get_routes);
app.use('/', post_routes);
app.use('/', put_routes);
app.use('/', delete_routes);

app.listen(process.env.PORT || 8080, () => console.log('All is ok'))