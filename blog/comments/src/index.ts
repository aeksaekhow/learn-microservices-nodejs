import express from 'express'
import bodyParser from 'body-parser'
import {randomBytes} from 'crypto'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId: any = {}

app.get('/posts/:id/comments', (req, res) => {

    const postId = req.params.id
    const comments = commentsByPostId[postId] || []
    res.status(200).send(comments)

})

app.post('/posts/:id/comments', (req, res) => {

    const commentId = randomBytes(4).toString('hex')

    const postId = req.params.id
    const {content} = req.body

    const comments = commentsByPostId[postId] || []
    comments.push({id: commentId, content})
    commentsByPostId[postId] = comments

    res.status(201).send(comments)

})

app.listen(5001, () => {
    console.log('Start listening 5001')
})