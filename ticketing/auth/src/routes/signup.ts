import express, {Request, Response, NextFunction} from 'express'
import 'cookie-session'
import {body} from 'express-validator'
import { User } from '../models/User'
import { BadRequestError } from '../errors/bad-request-error'
import jwt from 'jsonwebtoken'
import { validateRequestHandler } from '../middlewares/validate-request-handler'

const signupRouter = express.Router()

signupRouter.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 and 20 characters'),
    validateRequestHandler
], async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const {email, password} = req.body ?? {}

        const existingUser = await User.findOne({email})
        if (existingUser) {
            throw new BadRequestError('Email in use')
        }

        const user = User.build({email, password})
        await user.save()

        const jwtToken = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!)

        req.session!.jwt = jwtToken

        return res.status(201).send(user)
    }
    catch (error) {
        next(error)
    }
})

export { signupRouter }