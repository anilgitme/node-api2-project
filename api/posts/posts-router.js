// implement your posts router here
const express = require('express');
const router = express.Router();
const Post = require('./posts-model');

//get post
router.get('/', (req, res) => {
    Post.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})

//retrieve posts by id

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404)
                    .json({ message: 'The post with the specified ID does not exist' })
            } else {
                res.status(200).json(post); //found post!
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'The posts information could not be retrieved'
            })
        })
})