import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This is a Test Blog',
    author: 'John Doe',
    url: 'https://testblog.com/johndoe',
    likes: 42,
    user: {
      username: 'pedrop',
      name: 'Pedro Pascal'
    }
  }

  const addLike = vi.fn()
  const removeBlog = vi.fn()

  render(<Blog blog={blog} addLike={addLike} removeBlog={removeBlog} />)
  screen.debug()

  const titleByAuthor = screen.getByText('This is a Test Blog by John Doe')
  expect(titleByAuthor).toBeVisible()

  const url = screen.getByText('https://testblog.com/johndoe', { exact: false })
  expect(url).not.toBeVisible()

  const likes = screen.getByText('Likes 42', { exact: false })
  expect(likes).not.toBeVisible()
})