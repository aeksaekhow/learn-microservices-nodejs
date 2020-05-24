import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
app.use(bodyParser.json())

const events: any[] = []

app.get(`/events`, (req, res) => {
    res.status(200).send(events)
})

app.post('/events', ((req, res) => {

    const event = req.body
    console.log(`Received event`, event)

    events.push(event)

    axios.post(`http://localhost:5000/events`, event)
    axios.post(`http://localhost:5001/events`, event)
    axios.post(`http://localhost:5002/events`, event)
    axios.post(`http://localhost:5003/events`, event)

    res.status(200).send()
}))

app.listen(5005, () => {
    console.log('EventBus start listening on port 5005')
})