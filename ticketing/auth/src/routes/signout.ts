import express from 'express'

const signoutRouter = express.Router()

signoutRouter.post('/api/users/signout', (req, res) => {
    req.session = null
    res.status(200).send()
})

export { signoutRouter }