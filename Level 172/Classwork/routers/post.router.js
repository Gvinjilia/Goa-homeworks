const express = require('express');
const { getPosts, getPostById, createPost, deletePostById, updatePost } = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter
    .route('/')
    .get(getPosts)
    .post(createPost)

postRouter
    .route('/:id')
    .get(getPostById)
    .delete(deletePostById)
    .patch(updatePost)

// route - იგივე არის ბილიკი (მისამართი) თუ რომელ მისამართზე უნდა მოხდეს method - ების დარეგისტრირება მაგალითად '/posts' ეს არის ბილიკი

// router - მართავს ყველა route - ს router - ი იღებს მოთხოვნას და მის მიხედვით უშვებს ფუნქციას

// controllers - ჩვენ ვიყენებთ მაშინ როდესაც გვინდა რომ შევქმნათ ფუნქციები route - ებისთვის, ეს ჩვენს კოდს უფრო ამარტივებს

module.exports = postRouter;