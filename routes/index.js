var express = require('express');
const upload = require('./multer');
var router = express.Router();
const fs = require('fs');
const uuid = require('uuid').v4;
const path = require('path');

const galleryDetail = require("../model/database")

/* GET home page. */

router.get('/', function(req, res, next) {
  galleryDetail.find()
  .then((cards) =>{
    res.render('home',{cards});
  })
  .catch((err) => res.send(err));
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add', function(req, res, next) {

  upload(req,res,function(err){
    if(err) return res.send(err);
    if(req.file){

      const {title , author } = req.body;

      const image = req.file.filename;
      galleryDetail.create({title , author ,image})
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => res.send(err));
    }
    else{
      res.send(
        "<h1>Please provide an image then only we can add it to gallery</h1>"
      );
    }
  })
});

router.get('/update/:id',function(req,res,next){

  const id = req.params.id;
  galleryDetail.findById(id)
  .then((det) => {
    res.render('update',{card:det});

  })
  .catch((err) => res.send(err));

})

router.get('/delete/:id', function(req, res, next) {

  const id = req.params.id;


  galleryDetail.findByIdAndDelete(id)
  .then((det) =>{
    fs.unlinkSync(
        path.join(__dirname,"..","public","uploads",det.image)
      )
    res.redirect('/');
  })
  .catch((err) => res.send(err));

});

router.post('/update/:id',function(req,res,next){

  upload(req, res, function (err) {
    if (err) return res.send(err);
    const updatedData = {
        title: req.body.title,
        author: req.body.author,
    };
    if (req.file) {
        fs.unlinkSync(
            path.join(
                __dirname,
                "..",
                "public",
                "uploads",
                req.body.oldgallery
            )
        );
        updatedData.image = req.file.filename;
    }

    galleryDetail.findByIdAndUpdate(req.params.id,updatedData)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => res.send(err));
  });
})


module.exports = router;
