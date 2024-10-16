 const express = require('express')
 const app = express()
 
 
 //listen for request
 app.listen(3000);

//register view engine
app.set('view engine', 'ejs');

 app.get('/',(req,res)=>{
  res.render('index');
 })
 app.get('/about',(req,res)=>{
   res.render('about');
 })

 app.get('/contact',(req,res)=>{
    res.render('contact');
 })
 app.get('/catagories',(req,res)=>{
    res.render('catagories');
 })

 app.get('/blogs/create',(req,res)=>{
    res.render('craete');
 })
 app.get('/explore',(req,res)=>{
    res.render('explore');
 })
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
})