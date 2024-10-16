 const express = require('express')
 const morgan = require('morgan');
 const app = express()
 
 
 //listen for request
 app.listen(3000);

 app.use(morgan('dev'));

 app.use(express.static('public'));

//register view engine
app.set('view engine', 'ejs');
const blogs =[
   {title: 'first blog', snippet: 'agfdaghahfgagagdagf'},
   {title: 'second blog', snippet: 'oioioioioioioioioiii'},
   {title: 'third blog', snippet: 'fdfsfsfsdsfsfsfsfsfsf'},
];
 app.get('/',(req,res)=>{
   
  res.render('index',{title : 'home', blogs});
 })
 app.get('/about',(req,res)=>{
   res.render('about',{title : 'home', blogs});
 })

 app.get('/contact',(req,res)=>{
    res.render('contact',{title : 'home', blogs});
 })
 app.get('/catagories',(req,res)=>{
    res.render('catagories',{title : 'home', blogs});
 })

 app.get('/blogs/create',(req,res)=>{
    res.render('craete',{title : 'home', blogs});
 })
 app.get('/explore',(req,res)=>{
    res.render('explore');
 })
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.ejs',{root:__dirname});
})