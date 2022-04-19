const express = require('express')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')
const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = title
    await axios.post('http://event-bus-clusterip-srv:4005/events', {
        type: 'PostCreated',
        data: { id, post: posts[id] }
    })
    res.status(201).send({ id, post: posts[id] })
})

app.post('/events', (req, res) => {
    console.log(req.body)
    res.send()
})


app.listen(PORT, () => console.log(`Listening on port: ${PORT} --- Hello world v2`))