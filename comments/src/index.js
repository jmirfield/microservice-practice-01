const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const app = express()
const PORT = 4001

app.use(express.json())
app.use(cors())

const comments = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(comments[req.params.id])
})

app.post('/posts/:id/comment', (req, res) => {
    const postId = req.params.id
    const id = randomBytes(4).toString('hex')
    const { comment } = req.body
    if (!comments[postId]) comments[postId] = []
    comments[postId].push({ id, comment })
    res.status(201).send(comments[postId])
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))