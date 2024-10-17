const express = require('express')
 const morgan = require('morgan');
 const mongoose = require('mongoose');
 const Blog = require('./models/bolg');
 const multer = require('multer');

 
 const app = express()

//  CONNECT TO MONGODB 
const dbURL = 'mongodb+srv://Abyalew:Abyalew12@abyalew.rp0tl.mongodb.net/node-tut?retryWrites=true&w=majority';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => console.log(err));







//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use((req,res,next)=>{
   next();
});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(morgan('dev'));


 app.get('/',(req,res)=>{
   
  res.redirect('/blogs');
 })
 app.get('/about',(req,res)=>{
   res.render('about',{title : 'home'});
 })

 //blog routs
 app.get('/blogs',(req,res)=>{
   Blog.find().sort({createdAt: -1})
      .then((result)=>{
         res.render('index', {title: 'all blogs', blogs: result})
      })
      .catch((err)=>{
         console.log(err);
      })
 });

 app.post('/craete',(req,res)=>{
   const blog = new Blog(req.body);

   blog.save()
      .then((result)=>{
         res.redirect('/blogs');
      })
      .catch((err)=>{
         console.log(err);
      })
 });

 app.get('/blogs/:id', (req, res) => {
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
});


 app.get('/contact',(req,res)=>{
    res.render('contact',{title : 'contact'});
 })
 app.get('/catagories',(req,res)=>{
    res.render('catagories',{title : 'catagories'});
 })

 app.get('/craete',(req,res)=>{
    res.render('craete',{title : 'create'});
 })
 app.get('/explore',(req,res)=>{
    res.render('explore',{title : 'explore'});
 })
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.ejs',{root:__dirname});
})