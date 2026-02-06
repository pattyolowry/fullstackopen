import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [likes, setLikes] = useState(blog.likes)

  const toggleDetails = () => {
    setVisible(!visible)
  }

  const buttonText = () => {
    return visible ? 'Hide' : 'View'
  }

  const handleLike = async () => {
    await blogService.update({
      ...blog,
      likes: likes + 1
    })
    setLikes(likes + 1)
    addLike(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log('remove blog')
      removeBlog(blog)
    } else {
      console.log('cancel remove')
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <span data-testid='blog-title'>{blog.title} by {blog.author}</span> <button onClick={toggleDetails}>{buttonText()}</button>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        Likes <span data-testid='likes-count'>{likes}</span> <button onClick={handleLike}>Like</button><br/>
        Added by {blog.user.name}<br/>
        {loggedUser && loggedUser.username === blog.user.username && (
          <button onClick={handleRemove}>Remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog