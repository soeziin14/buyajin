/**
 * Created by JS on 10/1/2016.
 */
var express     = require('express'),
    router      = express.Router(),
    fs          = require('fs'),
    multer      = require('multer'),
    Post        = require("../models/post");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({storage: storage}).array("image", 3);
/* GET users listing. */
router.get('/', function(req, res) {
    Post.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            res.render('blog/index',{posts: allPosts});
        }
    });
});

router.post('/', function(req, res){

    upload(req, res, function(err) {

        if (err) {
            res.send("error loading file: " + err);
        } else {
            var title   = req.body.title;
            var exp     = req.body.exp;
            var img     = [];
            var comment = [];
            console.log("file: ", req.file || req.files);
            if (req.file) {
                img.push(req.file.path.substring("public".length));//BAD, but temporary...
            }

            if (req.files) {
                req.files.forEach(function(e, index){
                    img.push(e.path.substring("public".length));
                    comment.push(req.body.comment[index]);
                })
            }

            var newPost = {title: title, exp:exp, img: img, comment: comment};
            // Create a new Post and save to DB
            Post.create(newPost, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    console.log(newPost);
                    //console.log(newlyCreated);
                    res.redirect("/blog");
                }
            });
        }
    });
});

router.get('/new', function(req, res){
    res.render('blog/new');
});


router.get('/show_default', function(req,res){
    res.render("blog/show_default");
});

//show post
router.get('/:id', function(req,res) {
    Post.findById(req.params.id, function (err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundPost);
            //render show template with that campground
            res.render("blog/show", {post: foundPost});
        }
    });
});

//edit post
router.get('/:id/edit', function(req,res) {
    Post.findById(req.params.id, function (err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundPost);
            //render show template with that campground
            res.render("blog/edit", {post: foundPost});
        }
    });
});

//update post
router.put('/:id',function(req,res) {

    //bodyparser issue with multipart html forms, so for now, we cannot change images.

    Post.findByIdAndUpdate(req.params.id,
        {"$set": {
            "title": req.body.title,
            "exp"  : req.body.exp,
            "comment": req.body.comment
        }},
        function (err, foundPost) {

        if (err) {
            console.log(err);
            res.redirect("/blog");
        } else {
            console.log("update post:", req.body.title);
            //render show template with that campground
            res.redirect("/blog/" + req.params.id);
        }
    });
});

//delete post
router.delete('/:id', function(req,res) {
    Post.findByIdAndRemove(req.params.id, function (err, foundPost) {
        if (err) {
            console.log(err);
            res.redirect("/blog");
        } else {
            if (foundPost && foundPost.img) {
                foundPost.img.forEach(function(img){
                    //console.log("img: ", img);
                    if(fs.existsSync('./public/'+img)) {
                        fs.unlink('./public/'+img);
                    }
                });
            }
            res.redirect("/blog");
        }
    });
});

module.exports = router;
