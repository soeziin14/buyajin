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
var upload = multer({storage: storage}).single("image");
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
            res.send("error loading file");
        } else {
            var title = req.body.title;
            var exp = req.body.exp;
            var img;
            if (req.file) {
                img = req.file.path.substring("public".length);//BAD, but temporary...
            }
            var comment = req.body.comment;
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
router.get('/:id', function(req,res) {
    Post.findByIdAndUpdate(req.params.id, req.body.post, function (err, foundPost) {
        if (err) {
            console.log(err);
            res.redirect("/blog");
        } else {
            console.log(foundPost);
            //render show template with that campground
            res.redirect("blog/" + req.params.id);
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
            res.redirect("/blog");
        }
    });
});

module.exports = router;
