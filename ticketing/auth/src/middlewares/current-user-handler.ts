import {Request, Response, NextFunction} from 'express'
import 'cookie-session'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

interface UserPayload {
    id: string,
    email: string
}

export const currentUserHandler = (req: Request, res: Response, next: NextFunction) => {

    if (!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
    }
    catch (error) {}

    next()

}