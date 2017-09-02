var express = require('express');
var router = express.Router();

router.get('/hello', function(req, res){
   res.send('GET route on things- Hello from get.js.');
});

//export this router to use in our index.js
module.exports = router;