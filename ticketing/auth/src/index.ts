import mongoose from 'mongoose'
import {app} from './app'

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