import express from 'express'

const currentUserRouter = express.Router()

currentUserRouter.get('/api/users/currentuser', (req, res) => {
    
    res.send('Hello')
})

export { currentUserRouter }