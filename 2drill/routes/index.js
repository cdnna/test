var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });

  var passedInDb = req.db;

  passedInDb.close();

  passedInDb.open(function(err, theDb){
    if (err){
      res.send('error opening db');
      return;
    }

    theDb.collection('collection1', function(err, theCollection){
      if (err){
        res.send('error opening collection');
        return;
      }

      theCollection.find().toArray(function(err, theDocs){
        if (err){
          res.send('error finding the docs');
          return;
        }

        res.render('index', {model:{
          docs:theDocs,
          title:"2 mean drill"
        }});
      });
    });

  });


});

module.exports = router;
