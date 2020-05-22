import express from 'express'
import {randomBytes} from 'crypto'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts: any = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const {title} = req.body

    const post = {
        id,
        title
    }
    posts[id] = post

    res.status(201).send(post)
})

app.listen(5000, () => {
    console.log('Listening on 5000')
})