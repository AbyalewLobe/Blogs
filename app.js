const express = require('express')
 const morgan = require('morgan');
 const mongoose = require('mongoose');
 const Blog = require('./models/bolg');

 
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



 app.use(morgan('dev'));

 app.use(express.static('public'));

//register view engine
app.set('view engine', 'ejs');



 app.get('/',(req,res)=>{
   
  res.redirect('/blogs');
 })
 app.get('/about',(req,res)=>{
   res.render('about',{title : 'home', blogs});
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
 })

 app.get('/contact',(req,res)=>{
    res.render('contact',{title : 'home', blogs});
 })
 app.get('/catagories',(req,res)=>{
    res.render('catagories',{title : 'home', blogs});
 })

 app.get('/craete',(req,res)=>{
    res.render('craete',{title : 'home', blogs});
 })
 app.get('/explore',(req,res)=>{
    res.render('explore');
 })
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.ejs',{root:__dirname});
})