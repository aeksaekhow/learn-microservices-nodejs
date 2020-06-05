import request from 'supertest'
import {app} from '../../app'

it('returns a 201 on successful signup and JWT cookie must be sent through header', async() => {
    const response = await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201)
    
    expect(response.get('Set-Cookie')).toBeDefined()
})

it('returns a 400 with an invalid email', async () => {
    return request(app)
            .post('/api/users/signup')
            .send({
                email: 'an invalid email',
                password: 'password'
            })
            .expect(400)
            
})

it('returns a 400 with an invalid password', async () => {
    return request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'p'
            })
            .expect(400)
})

it('returns a 400 with missing email and password', async () => {

    await request(app)
            .post('/api/users/signup')
            .send({
                // missing email
                password: 'password'
            })
            .expect(400)

    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com'
                // missing password
            })
            .expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400)
})