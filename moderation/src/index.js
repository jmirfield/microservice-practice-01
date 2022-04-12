const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 4003

app.use(express.json())

app.post('/events', async (req, res) => {
    switch (req.body.type) {
        case 'CommentCreated':
            const comment = req.body.data
            const status = comment.comment.includes('orange') ? 'rejected' : 'approved'
            await axios.post('http://localhost:4005/events', {
                type: 'CommentModerated',
                data: {
                    ...comment,
                    status
                }
            })
            break
    }
    res.send()
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))