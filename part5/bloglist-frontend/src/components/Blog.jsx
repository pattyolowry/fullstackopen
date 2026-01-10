import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike }) => {
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
  console.log(blog)
  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={toggleDetails}>{buttonText()}</button>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        Likes {likes} <button onClick={handleLike}>Like</button><br/>
        Added by {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog