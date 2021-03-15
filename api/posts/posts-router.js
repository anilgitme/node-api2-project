// implement your posts router here
const express = require('express');
const router = express.Router();
const POST = require('./posts-model');

//get post
router.get('/', (req, res) => {
    POST.find()
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
    POST.findById(req.params.id)
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

//post request make a post

router.post('/', async(req, res) => {
    const newPost = await Post.insert(req.body); //can use await since its an async function
    if (!newPost) {
        res.status(400).json({ message: 'Please provide title and contents for the post' })
    } else {
        res.status(201).json(newPost);
    }
})

//put request updating the post by id

router.put('/:id', (req, res) => {
    POST.update(req.params.id, req.body)
        .then((post) => {
            if (!req.body.title || !req.body.contents) {
                res.status(400)
                    .json({ message: 'Please provide title and contents for the post' })
            } else if (post) {
                res.status(200).json(post)
            } else {
                res.status(404)
                    .json({ message: 'The post with the specified ID does not exist' })
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'The post information could not be modified'
            })
        })
})

//delete request remove post by id

router.delete('/:id', async(req, res) => {
    await POST.remove(req.params.id)
        .then((post) => {
            if (!post) {
                res.status(404)
                    .json({ message: 'The post with the specified ID does not exist' })
            } else {
                res.status(200).json(post);
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'The post could not be removed'
            })
        })
})


//get request finding posts with comments

router.get('/:id/comments', (req, res) => {
    POST.findPostComments(req.params.id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment) //success
            } else {
                res.status(404)
                    .json({ message: 'The comment with the specified ID does not exist' })
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: 'The comments information could not be retrieved'
            })
        })
})