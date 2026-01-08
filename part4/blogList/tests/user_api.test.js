const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

test('user creation succeeds with fresh username', async () => {
  const usersAtStart = await api.get('/api/users')
  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'foobar'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await api.get('/api/users')
  assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length + 1)

  const usernames = usersAtEnd.body.map(u => u.username)
  assert(usernames.includes(newUser.username))
})

test('user creation fails if username already taken', async () => {
  const usersAtStart = await api.get('/api/users')

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: '123456'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert(response.body.error.includes('expected `username` to be unique'))

  const usersAtEnd = await api.get('/api/users')
  assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
})

test('user creation fails if username is invalid', async () => {
  const usersAtStart = await api.get('/api/users')

  const newUser = {
    username: 'tu',
    name: 'Test User',
    password: 'foobar'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert(response.body.error.includes('User validation failed'))

  const usersAtEnd = await api.get('/api/users')
  assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
})

test('user creation fails if password is missing', async () => {
  const usersAtStart = await api.get('/api/users')

  const newUser = {
    username: 'testuser',
    name: 'Test User'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert(response.body.error.includes('password is missing or invalid'))

  const usersAtEnd = await api.get('/api/users')
  assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
})

test('user creation fails if password is invalid', async () => {
  const usersAtStart = await api.get('/api/users')

  const newUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'no'
  }

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  assert(response.body.error.includes('password is missing or invalid'))

  const usersAtEnd = await api.get('/api/users')
  assert.strictEqual(usersAtEnd.body.length, usersAtStart.body.length)
})

after(async () => {
  await mongoose.connection.close()
})