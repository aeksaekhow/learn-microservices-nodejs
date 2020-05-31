import express, {Request, Response, NextFunction} from 'express'
import {body} from 'express-validator'
import { validateRequestHandler } from '../middlewares/validate-request-handler'

const signInRouter = express.Router()

signInRouter.post('/api/users/signin',
[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
    validateRequestHandler
], (req: Request, res: Response, next: NextFunction) => {
    
    try {

    }
    catch (error) {
        next(error)
    }

})

export { signInRouter }