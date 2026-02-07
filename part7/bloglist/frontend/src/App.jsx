import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Error from "./components/Error";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { setError } from "./reducers/errorReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const dispatch = useDispatch();

  const compareLikes = (a, b) => {
    return b.likes - a.likes;
  };

  const addLike = (blogId) => {
    const updatedBlogs = blogs.map((b) =>
      b.id !== blogId ? b : { ...b, likes: b.likes + 1 },
    );
    setBlogs(updatedBlogs.sort(compareLikes));
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(compareLikes)));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("wrong credentials");
      dispatch(setError(error.response.data.error));
    }
  };

  const handleLogout = () => {
    console.log("logging out");
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    console.log("creating blog");

    try {
      const returnedBlog = await blogService.create(blogObject);
      dispatch(
        setNotification(
          `New blog added: ${returnedBlog.title} by ${returnedBlog.author}`,
          5,
        ),
      );
      setBlogs(blogs.concat(returnedBlog).sort(compareLikes));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.error(`Failed to create blog: ${error.response.data.error}`);
      dispatch(setError(error.response.data.error));
    }
  };

  const removeBlog = async (blogObject) => {
    console.log(`removing blog ${blogObject.title} by ${blogObject.author}`);

    try {
      await blogService.remove(blogObject.id);
      dispatch(
        setNotification(
          `Blog removed: ${blogObject.title} by ${blogObject.author}`,
          5,
        ),
      );
      setBlogs(blogs.filter((b) => b.id !== blogObject.id).sort(compareLikes));
    } catch (error) {
      console.error(`Failed to remove blog: ${error.response.data.error}`);
      dispatch(setError(error.response.data.error));
    }
  };

  return (
    <div>
      <Notification />
      <Error />
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
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
