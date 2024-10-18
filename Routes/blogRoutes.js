const express = require('express');
const blogController =  require('../controllers/blogControllers');
const router = express.Router();

router.get('/blogs',blogController.blog_index);
router.post('/craete', blogController.blog_create_post);
router.get('/blogs/:id', blogController.blog_details);
router.get('/craete' , blogController.blog_create_get);
router.delete('/blogs/:id', blogController.blog_delete);

module.exports = router;