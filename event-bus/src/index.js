const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = 4005

app.use(express.json())
app.use(cors())

const events = []

app.post('/events', (req, res) => {
    try {
        const event = req.body
        events.push(event)
        axios.post('http://posts-clusterip-srv:4000/events', event)
        axios.post('http://comments-clusterip-srv:4001/events', event)
        axios.post('http://query-clusterip-srv:4002/events', event)
        axios.post('http://moderation-clusterip-srv:4003/events', event)
        res.send({ status: 'ok' })
    } catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

app.get('/events', (req, res) => {
    res.send(events)
})


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))