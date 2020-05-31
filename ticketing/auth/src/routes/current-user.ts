import express, {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {currentUserHandler} from '../middlewares/current-user-handler'
import { requireAuthHandler } from '../middlewares/require-auth-handler'

const currentUserRouter = express.Router()

currentUserRouter.get('/api/users/currentuser', [currentUserHandler, requireAuthHandler], (req: Request, res: Response) => {
    
    return res.status(200).send({currentUser: req.currentUser || null})
})

export { currentUserRouter }