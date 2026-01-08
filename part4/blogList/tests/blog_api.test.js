const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }
]

let authToken = null

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testuser', passwordHash })
  await user.save()
  const loginResponse = await api.post('/api/login').send({
    username: 'testuser',
    password: 'sekret'
  })
  authToken = `Bearer ${loginResponse.body.token}`
  await Blog.deleteMany({})
  await Promise.all(initialBlogs.map(async (b) => {
    return api.post('/api/blogs').send(b).set({ Authorization: authToken })
  }))
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog identifier is id not _id', async () => {
  const response = await api.get('/api/blogs')
  const keys = Object.keys(response.body[0])
  assert(keys.includes('id'))
  assert(!keys.includes('_id'))
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: authToken })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('First class tests'))
})

test('blogs default to 0 likes', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: authToken })

  assert.deepStrictEqual(response.body.likes, 0)
})

test('creating blog without token returns 401', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('creating blog without title returns 400 error', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: authToken })
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('creating blog without url returns 400 error', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 10,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({ Authorization: authToken })
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: authToken })
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length - 1)

  const ids = blogsAtEnd.body.map(b => b.id)
  assert(!ids.includes(blogToDelete.id))
})

test('delete with invalid id returns 400', async () => {
  const invalidId = '1234'

  await api
    .delete(`/api/blogs/${invalidId}`)
    .set({ Authorization: authToken })
    .expect(400)
})

test('a blog can be updated', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToUpdate = blogs.body[0]
  const updatedBlog = {
    ...blogToUpdate,
    title: 'Updated Blog Title',
    likes: 4298,
  }
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)

  assert.deepStrictEqual(response.body.title, 'Updated Blog Title')
  assert.deepStrictEqual(response.body.likes, 4298)
  assert.deepStrictEqual(response.body.id, blogToUpdate.id)
})

test('updating a blog with invalid id returns 400', async () => {
  const invalidId = '1234'

  await api
    .put(`/api/blogs/${invalidId}`)
    .expect(400)
})

test('updating a non-existing blog returns 404', async () => {
  const blogInfo = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }
  const blogToBeDeleted = await api
    .post('/api/blogs')
    .send(blogInfo)
    .set({ Authorization: authToken })

  const deletedId = blogToBeDeleted.body.id

  await api.delete(`/api/blogs/${deletedId}`).set({ Authorization: authToken })

  await api
    .put(`/api/blogs/${deletedId}`)
    .send(blogInfo)
    .expect(404)
})

after(async () => {
  await mongoose.connection.close()
})