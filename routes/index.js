var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var myQueue = mongoose.model('HelpQ');

/* GET home page. Redundant-already assumes this spot*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/comments', function(req, res, next) {
  myQueue.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});


router.post('/comments', function(req, res, next) {
  var comment = new myQueue(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});


router.param('comment', function(req, res, next, id) {
  var query = myQueue.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});


router.delete('/comments/:comment', function(req, res) {
  res.json(req.comment);
});


router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.get('/comments/:comment', function(req, res) {
  console.log("in Delete");
  req.comment.remove();
  res.sendStatus(200);
});


module.exports = router;
