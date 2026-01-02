const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0])
  })

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Another Big Article',
      author: 'John Doe',
      url: 'https://dummyscholar/archives/bigarticle.pdf',
      likes: 29,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f10',
      title: 'Great Famous Article',
      author: 'Jane Doe',
      url: 'https://dummyscholar/archives/greatfamousarticle.pdf',
      likes: 184,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f11',
      title: 'Not So Famous Blog',
      author: 'Jason Doe',
      url: 'https://dummyscholar/archives/notsofamousblog.pdf',
      likes: 18,
      __v: 0
    }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.strictEqual(result, listWithMultipleBlogs[2])
  })
})