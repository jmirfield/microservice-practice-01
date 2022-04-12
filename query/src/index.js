const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = 4002

app.use(express.json())
app.use(cors())

const posts = {}

const handleEvents = (type, data) => {
    switch (type) {
        case ('PostCreated'):
            posts[data.id] = { post: data.post, comments: [] }
            break;
        case ('CommentCreated'):
            posts[data.postId].comments.push({ id: data.id, comment: data.comment, status: data.status })
            break;
        case ('CommentUpdated'):
            const comment = posts[data.postId].comments.find(comment => comment.id === data.comment.id)
            comment.status = data.comment.status
            comment.comment = data.comment.comment
            break;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    handleEvents(type, data)
    res.send()
})

 

app.listen(PORT, async () => {
    console.log(`Listening on port: ${PORT}`)
    try {
        const response = await axios.get('http://localhost:4005/events')
        for (let e of response.data) {
            console.log('Processing event: ' + e.type)
            handleEvents(e.type, e.data)
        }
    } catch(e) {
        console.log('Error with connecting to event bus')
    }
})