import express from 'express'
import {randomBytes} from 'crypto'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const postTable: any = {}

app.get('/posts', (req, res) => {
    res.send(postTable)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')
    const {title} = req.body

    const post = {
        id,
        title
    }
    postTable[id] = post

    await axios.post('http://localhost:5005/events', {
        type: 'PostCreated',
        data: post
    })

    res.status(201).send(post)
})

app.post('/events', ((req, res) => {

    res.status(200).send()
}))

const port = 5000
app.listen(port, async () => {

    console.log('Post starts listening on port ' + port)
})