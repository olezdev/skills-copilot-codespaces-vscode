// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Create web server
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// Create web page
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

// Create web page
app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });
});

// Create web page
app.get(['/topic', '/topic/:id'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      // id값이 있을 때
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, title:id, description:data});
      });
    } else {
      // id값이 없을 때
      res.render('view', {topics:files, title:'Welcome', description:'Hello, JavaScript for server.'});
    }
  });
});

// Create web page
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
});

// Create web page
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});