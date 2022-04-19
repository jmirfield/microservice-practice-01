const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')
const app = express()
const PORT = 4001

app.use(express.json())
app.use(cors())

const comments = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(comments[req.params.id])
})

app.post('/posts/:id/comment', async (req, res) => {
    const postId = req.params.id
    const id = randomBytes(4).toString('hex')
    const comment = { comment: req.body.comment, id, status: 'pending' }
    const postComments = comments[postId] || []
    postComments.push(comment)
    comments[postId] = postComments
    await axios.post('http://event-bus-clusterip-srv:4005/events', {
        type: 'CommentCreated',
        data: { ...comment, postId }
    })
    res.status(201).send(comment)
})

app.post('/events', async (req, res) => {
    console.log(req.body)
    if (req.body.type === 'CommentModerated') {
        const { postId, id, status } = req.body.data
        const comment = comments[postId].find(comment => comment.id === id)
        comment.status = status
        await axios.post('http://event-bus-clusterip-srv:4005/events', {
            type: 'CommentUpdated',
            data: { comment, postId }
        })
    }
    res.send()
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))