import express from 'express'
import {json} from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
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

export {app}