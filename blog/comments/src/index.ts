import express from 'express'
import bodyParser from 'body-parser'
import {randomBytes} from 'crypto'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentTable: any = {}
const commentsByPostId: any = {}

app.get('/posts/:id/comments', (req, res) => {

    const postId = req.params.id
    const comments = commentsByPostId[postId] || []
    res.status(200).send(comments)

})

app.post('/posts/:id/comments', async (req, res) => {

    const commentId = randomBytes(4).toString('hex')

    const postId = req.params.id
    const {content} = req.body

    const comment = {id: commentId, content, status: 'pending', postId}

    commentTable[commentId] = comment

    const comments = commentsByPostId[postId] || []
    comments.push(comment)
    commentsByPostId[postId] = comments

    await axios.post('http://event-bus-clusterip-service:5005/events', {
        type: 'CommentCreated',
        data: comment
    })

    res.status(201).send(comments)

})

app.post('/events', (async (req, res) => {

    const {type, data} = req.body

    if (type === 'CommentModerated') {
        const comment = commentTable[data.id]
        if (comment) {
            comment.status = data.status

            await axios.post(`http://event-bus-clusterip-service:5005/events`, {
                type: 'CommentUpdated',
                data: comment
            })
        }
    }

    return res.status(200).send()
}))

const port = 5001
app.listen(port, async () => {

    console.log('Comments version 0.0.2 starts listening on port ' + port)
})