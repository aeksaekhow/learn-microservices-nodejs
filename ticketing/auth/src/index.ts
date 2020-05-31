import express from 'express'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

const app = express()
app.set('trust proxy', true) // make Express trust proxy from nginx
app.use(json())
app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', () => { throw new NotFoundError() })
app.use(errorHandler) 

const start = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined in environment variable')
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-service:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }
    catch (error) {
        console.error(error)
    }

    app.listen(3000, () => {
        console.log('Auth starts listening on port 3000')
    })
}

start()