import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleDetails = () => {
    setVisible(!visible)
  }

  const buttonText = () => {
    return visible ? 'Hide' : 'View'
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
        Likes {blog.likes}<br/>
        Added by {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog