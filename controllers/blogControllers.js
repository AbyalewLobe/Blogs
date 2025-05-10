const { constant } = require('lodash');
const Blog = require('../models/bolg');


const blog_index = (req,res)=>{
    Blog.find().sort({createdAt: -1})
      .then((result)=>{
         res.render('index', {title: 'all blogs', blogs: result})
      })
      .catch((err)=>{
         console.log(err);
      });
}

// blog details
const blog_details =(req,res)=>{
    const id = req.params.id;
   Blog.findById(id)
       .then(result => {
           if (result) {
               res.render('details', { blog: result, title: 'Blog Details' });
           } else {
               res.status(404).render('404', { title: 'Blog Not Found' });
           }
       })
       .catch(err => {
           console.log(err);
           res.status(500).render('404', { title: 'Server Error' });
       });
}
const blog_create_get = (req, res)=>{
    res.render('craete',{title : 'create'});
}
const blog_create_post = (req,res)=>{
    const blog = new Blog(req.body);

   blog.save()
      .then((result)=>{
         res.redirect('/blogs');
      })
      .catch((err)=>{
         console.log(err);
      })
}

const blog_delete = (req,res)=>{
    const id = req.params.id;
   Blog.findByIdAndDelete(id)
      .then(result => {
         res.json({redirect: '/blogs'});
      })
      .catch(err => {
         console.log(err);
      })
}

module.exports ={
    blog_index,
    blog_details,
    blog_create_post,
    blog_create_get,
    blog_delete
}
