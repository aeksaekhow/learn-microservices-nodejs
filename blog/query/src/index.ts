import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const postTable: any = {}
const commentTable: any = {}

const handleEvent = (type: string, data: any) => {
    if (type === 'PostCreated') {
        const {id, title} = data
        postTable[id] = {id, title, comments: []}
    }

    if (type === 'CommentCreated') {
        const {id, content, status, postId} = data

        const post = postTable[postId]
        if (post) {

            let comment = commentTable[id]
            if (!comment) {
                comment = {id, content, status}
                commentTable[id] = comment
            }

            post.comments.push(comment)
        }
    }

    if (type === 'CommentUpdated') {
        const {id, content, status} = data
        const comment = commentTable[id]
        if (comment) {
            comment.content = content
            comment.status = status
        }
    }
}

app.get('/posts', (req, res) => {
    res.send(postTable)
})

app.post('/events', ((req, res) => {

    const {type, data} = req.body

    handleEvent(type, data)

    res.status(200).send()
}))

const port = 5002
app.listen(port, async () => {
    console.log('Query version 0.0.2 starts listening on port ' + port)

    const response = await axios.get(`http://event-bus-clusterip-service:5005/events`)

    for (const event of response.data) {
        handleEvent(event.type, event.data)
    }
})