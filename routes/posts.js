const router = require('express').Router();
const Post = require('../models/post.model');
const multer = require('multer');

const image = require('./image');
// const audio = require('./image');


router.route('/add').post((req, res)=>{
    // console.log(req.body.post_image[0].name);
    console.log(req.file);
    console.log(req.body.post_title);
              
            image(req, res,(error) => {
              if (error instanceof multer.MulterError) {
                  // A Multer error occurred when uploading.
                  console.log('err2: '+error);
                  res.status(400).json('Error: Uploading error');
                }else if(error){
                    res.status(400).json('Error: Invalid File type');
                    // console.log('err1: '+ error);
                }else {
                if(req.file == undefined){
                  // console.log('err3: '+error);
                  res.status(400).json('Error: File size too large');
                }else{

            const imgfullName = req.file.filename;
            console.log(imgfullName);
            
            Post.find()
            .then(posts=>{
                const post_title = req.body.post_title;
                const post_category = req.body.post_category;
                const post_author = req.body.post_author;
                const post_status = req.body.post_status;
                const post_image = imgfullName;
                const post_authormail = req.body.post_authormail;
                // const post_file = audfull
                const post_comment_count = 0;
                if(posts.length > 0){
                    var post_id = posts[posts.length - 1].post_id + 1;
                } else {
                    post_id = 1;
                }
                const post_content = req.body.post_content;
                const post_date = new Date();
                

                const newPost =  new Post({
                    post_title, 
                    post_category, 
                    post_author, 
                    post_status, 
                    post_image,
                    post_authormail, 
                    // post_file 
                    post_comment_count, 
                    post_id, 
                    post_content, 
                    post_date
                });
                console.log(newPost);
                newPost.save()
                .then(()=>res.json('new post added: '+ post_title +', you may now sign in'))
                .catch((err) => {res.status(400).json('Error2: '+ err); console.log(err)})
        
            })
            .catch(err => res.status(400).json('Error: '+ err))
            
        }        
    }
});
});

router.route('/:email').get((req, res)=>{
    Post.find({post_authormail: req.params.email})
    .then(posts=>{
        res.json(posts);
        // console.log(posts);
    })
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/author/:author').get((req, res)=>{
    Post.find({post_author: req.params.author})
    .then(posts=>{
        res.json(posts);
        // console.log(posts);
    })
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/').get((req, res)=>{
    Post.find()
    .then(users=>{
        res.json(users);
        // console.log(users);
    })
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/single/:id').get((req, res)=>{
    Post.findById(req.params.id)
    .then(user=>{
        res.json(user);
    })
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/category/:category').get((req, res)=>{
    Post.find({post_category: req.params.category})
    .then(user=>{
        res.json(user);
    })
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').delete((req, res)=>{
    Post.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Post deleted successfully'))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/update/:id').post((req, res)=>{
    console.log(req.params.id);

    image(req, res,(error) => {
        if(error){
            res.status(400).json('Error: Invalid File type');
            console.log('err1: '+ error);
        }else if (error instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('err2: '+error);
          }else {
          if(req.file == undefined && req.body.image == undefined){
            console.log('err3: '+error);
            res.status(400).json('Error: File size too large');
          }else{
            // console.log('jack');
      
    Post.findById(req.params.id)
    .then(post => {
        console.log(post.post_title);
        post.post_title = req.body.post_title;
        post.post_category = req.body.post_category;
        post.post_author = req.body.post_author;
        post.post_status = req.body.post_status;

        if(post.post_image != req.body.image){
            const imgfullName = req.file.filename;
            console.log(imgfullName);
            post.post_image = imgfullName;
        }
        // post.post_file = req.body.post_file;
        // post.post_comment_count = req.body.post_comment_count;
        // post.post_id = req.body.post_id;
        post.post_content = req.body.post_content;
        post.post_date = Date.parse(req.body.post_date);

        post.save()
        .then(()=>res.json(`post updated`))
        .catch(err => res.status(400).json('Error: '+err))
    })
    .catch(err => res.status(400).json('Error: '+err))
          }
        }
    });
});



module.exports = router;