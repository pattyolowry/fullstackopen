import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const handleNewBlog = async event => {
    event.preventDefault()
    console.log(`creating blog`)
    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      //console.log(returnedBlog)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (error) {
      console.error(`Failed to create blog: ${error.response.data.error}`)
    }
  }

  return (
    <div>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <BlogForm
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            handleNewBlog={handleNewBlog}
            setBlogTitle={setBlogTitle}
            setBlogAuthor={setBlogAuthor}
            setBlogUrl={setBlogUrl}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  )
}

export default App