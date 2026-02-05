import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleNewBlog = event => {
    event.preventDefault()

    addBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>
                    title: &nbsp;
            <input
              type="text"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
              placeholder='Title'
            />
          </label>
        </div>
        <div>
          <label>
                    author:&nbsp;
            <input
              type="text"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
              placeholder='Author'
            />
          </label>
        </div>
        <div>
          <label>
                    url:&nbsp;
            <input
              type="text"
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
              placeholder='Url'
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm