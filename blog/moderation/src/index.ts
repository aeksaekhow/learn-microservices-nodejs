import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())

app.post(`/events`, (async (req, res) => {

    const {type, data} = req.body

    if (type === 'CommentCreated') {

        const comment = {...data}
        if (comment.content && comment.content.toString().includes('orange')) comment.status = 'rejected'
        else comment.status = 'approved'

        await axios.post(`http://event-bus-clusterip-service:5005/events`, {
            type: 'CommentModerated',
            data: comment
        })
    }

    res.status(200).send()
}))

const port = 5003
app.listen(port, () => {
    console.log(`Moderation version 0.0.2 starts listening on port ${port}`)
})