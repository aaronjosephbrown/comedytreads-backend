import supertest from 'supertest'
import app from '../../../index.js'
import { faker } from '@faker-js/faker'

const request = supertest(app)

describe('This is a get request for a list of test users.', () => {
  it(`return an array of ['aaron', 'brian', 'cathy'] and status 200`, async () => {
    const response = await request.get('/users')
    expect(response.statusCode).toBe(200)
    expect(response.body.users).toEqual(['aaron', 'brian', 'cathy'])
  })
})

describe('This is a post request to create a new user.', () => {
  it(`return an test user object with a status 201`, async () => {
    const testUserName = faker.internet.userName()
    const testFirstName = faker.person.firstName()
    const testLastName = faker.person.lastName()
    const testDOB = `08-11-1967`
    const testEmail = faker.internet.email()
    const testPassword = faker.internet.password()

    const response = await request.post('/users').send({
      username: testUserName,
      firstname: testFirstName,
      lastname: testLastName,
      DOB: testDOB,
      email: testEmail,
      password: testPassword,
      confirmPassword: testPassword,
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      username: testUserName,
      firstname: testFirstName,
      lastname: testLastName,
      DOB: testDOB,
      email: testEmail.toLowerCase(),
      password: testPassword,
      confirmPassword: testPassword,
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

describe('This is a post request to create a new user without password.', () => {
  it(`return an error message with a status 400`, async () => {
    const response = await request.post('/users').send({
      username: 'joerogan',
      firstname: 'Joe',
      lastname: 'Rogan',
      DOB: '08-11-1967',
      email: 'joerogan@gmail.com',
      password: '',
      passwordConfirm: '',
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors[0].msg).toBe(
      'Password must be at least 8 characters.'
    )
  })
})
