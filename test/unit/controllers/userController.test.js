import supertest from 'supertest'
import app from '../../../index.js'

const request = supertest(app)

describe('This is a get request for a list of test users.', () => {
  it(`return an array of ['aaron', 'brian', 'cathy'] and status 200`, async () => {
    const response = await request.get('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body.users).toEqual(['aaron', 'brian', 'cathy'])
  })
})

describe('This is a post request to create a new user.', () => {
  it(`return an Joe Rogan object with a status 201`, async () => {
    const response = await request.post('/users').send({
      username: 'joerogan',
      firstname: 'Joe',
      lastname: 'Rogan',
      DOB: '08-11-1967',
      email: 'joerogan@gmail.com',
      password: '123@@troN',
      confirmPassword: '123@@troN',
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      username: 'joerogan',
      firstname: 'Joe',
      lastname: 'Rogan',
      DOB: '08-11-1967',
      email: 'joerogan@gmail.com',
      password: '123@@troN',
      confirmPassword: '123@@troN',
    })
  })
})

describe('This is a post request to create a new user without email.', () => {
  it(`return an error message with a status 400`, async () => {
    const response = await request.post('/users').send({
      username: 'joerogan',
      firstname: 'Joe',
      lastname: 'Rogan',
      DOB: '08-11-1967',
      email: '',
      password: '123@@troN',
      confirmPassword: '123@@troN',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors[0].msg).toBe('Email is invalid.')
  })
})
