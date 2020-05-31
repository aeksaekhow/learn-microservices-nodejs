import express, {Request, Response, NextFunction} from 'express'
import {body} from 'express-validator'
import { validateRequestHandler } from '../middlewares/validate-request-handler'
import { User } from '../models/User'
import { BadRequestError } from '../errors/bad-request-error'
import { PasswordService } from '../services/password.service'
import jwt from 'jsonwebtoken'

const signInRouter = express.Router()

signInRouter.post('/api/users/signin',
[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
    validateRequestHandler
], async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const {email,password} = req.body
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials')
        }
        if (!await PasswordService.compare(existingUser.password, password)) {
            throw new BadRequestError('Invalid credentials')
        }

        const jwtToken = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!)

        if (req.session) req.session.jwt = jwtToken

        res.status(200).send(existingUser)
    }
    catch (error) {
        next(error)
    }

})

export { signInRouter }