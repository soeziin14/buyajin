/**
 * Created by JS on 10/1/2016.
 */
var express     = require('express'),
    router      = express.Router(),
    Post        = require("../models/post");

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

    var title = req.body.title;
    var exp = req.body.exp;
    var desc = req.body.desc;
    var code_before = req.body.code_before;
    var code_after = req.body.code_after;
    //var author = {
    //    id: req.user._id,
    //    username: req.user.username
    //};
    var newPost = {title: title, exp:exp, desc:desc, code_before: code_before, code_after:code_after};
    // Create a new Post and save to DB
    Post.create(newPost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newPost);
            console.log(newlyCreated);
            res.redirect("/blog");
        }
    });
});

router.get('/new', function(req, res){
    res.render('blog/new');
});


router.get('/show_default', function(req,res){
    res.render("blog/show_default");
});

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

module.exports = router;
